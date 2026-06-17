/* ============================================================
   AETHERMOOR — MULTIPLAYER (Shared Room)
   Supabase Realtime Broadcast + Presence.
   Self-contained. Hooks into app.js via window.AethermoorMP.
   If Supabase isn't configured, everything degrades to solo play.
============================================================ */
(function () {
  'use strict';

  var SUPA_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';

  var MP = {
    enabled: false,      // a room is active
    ready: false,        // supabase client loaded + config fetched
    client: null,
    channel: null,
    room: null,
    isHost: false,
    myId: null,
    myName: 'Petualang',
    peers: {},           // id -> {name, race, cls}
    _loadingPromise: null,
  };

  function $(s) { return document.querySelector(s); }

  function genRoomCode() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var s = '';
    for (var i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }

  function genId() {
    return 'p_' + Math.random().toString(36).slice(2, 10);
  }

  /* ---------- load supabase umd + config ---------- */
  function ensureClient() {
    if (MP._loadingPromise) return MP._loadingPromise;
    MP._loadingPromise = (function () {
      return fetchConfig().then(function (cfg) {
        if (!cfg) throw new Error('no-config');
        return loadScript(SUPA_CDN).then(function () {
          if (!window.supabase || !window.supabase.createClient) {
            throw new Error('supabase-cdn-failed');
          }
          MP.client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
            auth: { persistSession: false, autoRefreshToken: false },
            realtime: { params: { eventsPerSecond: 10 } },
          });
          MP.ready = true;
          return MP.client;
        });
      });
    })();
    return MP._loadingPromise;
  }

  function fetchConfig() {
    return fetch('/api/aethermoor-config', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-supa="1"]');
      if (existing) { resolve(); return; }
      var s = document.createElement('script');
      s.src = src;
      s.setAttribute('data-supa', '1');
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('script-load-failed')); };
      document.head.appendChild(s);
    });
  }

  /* ---------- channel lifecycle ---------- */
  function joinRoom(code, asHost) {
    return ensureClient().then(function () {
      MP.room = code;
      MP.isHost = !!asHost;
      MP.myId = genId();

      var ch = MP.client.channel('aethermoor:' + code, {
        config: { broadcast: { self: false }, presence: { key: MP.myId } },
      });

      ch.on('broadcast', { event: 'msg' }, function (payload) {
        handleRemote(payload.payload || {});
      });

      ch.on('presence', { event: 'sync' }, function () {
        var state = ch.presenceState();
        MP.peers = {};
        Object.keys(state).forEach(function (k) {
          var meta = state[k][0] || {};
          if (k !== MP.myId) MP.peers[k] = meta;
        });
        renderParty();
      });

      return new Promise(function (resolve, reject) {
        ch.subscribe(function (status) {
          if (status === 'SUBSCRIBED') {
            MP.channel = ch;
            MP.enabled = true;
            ch.track({ name: MP.myName, isHost: MP.isHost });
            renderParty();
            resolve(true);
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            reject(new Error('subscribe-failed:' + status));
          }
        });
      });
    });
  }

  function leaveRoom() {
    if (MP.channel) {
      try { MP.client.removeChannel(MP.channel); } catch (e) { /* noop */ }
    }
    MP.channel = null;
    MP.enabled = false;
    MP.room = null;
    MP.peers = {};
    renderParty();
  }

  /* ---------- broadcast / receive ---------- */
  function send(kind, data) {
    if (!MP.enabled || !MP.channel) return;
    MP.channel.send({
      type: 'broadcast',
      event: 'msg',
      payload: { kind: kind, from: MP.myName, fromId: MP.myId, data: data || {} },
    });
  }

  function handleRemote(p) {
    if (!p || !p.kind) return;
    var who = p.from || 'Petualang';
    switch (p.kind) {
      case 'pc':
        renderRemoteAction(who, p.data.text);
        if (MP.isHost && window.askDM) window.askDM(p.data.text, 'remote-action');
        break;
      case 'dm':
        renderRemoteDM(stripDirectives(p.data.text));
        maybeRemotePendingRoll(p.data.text);
        break;
      case 'roll':
        renderRemoteRoll(who, p.data.html);
        break;
      case 'roll-result':
        if (MP.isHost && window.askDM) window.askDM(p.data.text, 'roll');
        break;
      case 'sys':
        renderRemoteSys(p.data.text);
        break;
      case 'identity':
        if (p.fromId) {
          MP.peers[p.fromId] = MP.peers[p.fromId] || {};
          MP.peers[p.fromId].name = who;
          MP.peers[p.fromId].race = p.data.race;
          MP.peers[p.fromId].cls = p.data.cls;
          renderParty();
        }
        break;
    }
  }

  function stripDirectives(text) {
    return String(text)
      .replace(/\[HP:\s*[+-]\d+\s*\]/gi, '')
      .replace(/\[GOLD:\s*[+-]\d+\s*\]/gi, '')
      .replace(/\[ITEM:\s*[+-]\s*[^\]]+?\s*\]/gi, '')
      .replace(/\[ROLL:\s*d\d+\s*:\s*[^\]]+?\]/gi, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function maybeRemotePendingRoll(text) {
    if (!window.setPendingRoll) return;
    var pending = null;
    String(text).replace(/\[ROLL:\s*d(\d+)\s*:\s*([^:\]]+?)\s*(?::\s*(STR|DEX|CON|INT|WIS|CHA))?\s*(?::\s*(?:DC\s*)?(\d+))?\s*\]/gi,
      function (_m, sides, label, ab, dc) {
        if (!pending) pending = { sides: parseInt(sides, 10), label: label.trim(), ability: ab ? ab.toUpperCase() : null, dc: dc ? parseInt(dc, 10) : null };
        return '';
      });
    if (pending) window.setPendingRoll(pending);
  }

  /* ---------- remote render helpers (mirror app.js renderMsg) ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function logEl() { return document.getElementById('log'); }

  function appendWrap(wrap) {
    var log = logEl();
    if (!log) return;
    log.appendChild(wrap);
    requestAnimationFrame(function () {
      wrap.classList.add('in');
      log.scrollTop = log.scrollHeight;
    });
  }

  function renderRemoteAction(name, text) {
    var wrap = document.createElement('div');
    wrap.className = 'msg pc remote';
    wrap.innerHTML = '<span class="pc-tag">' + esc(name) +
      ' <span class="mp-peer-badge">rekan</span></span>' +
      '<span class="pc-bubble">' + esc(text) + '</span>';
    appendWrap(wrap);
  }

  function renderRemoteDM(text) {
    var wrap = document.createElement('div');
    wrap.className = 'msg dm';
    var paras = String(text).split(/\n{2,}/).map(function (p) {
      return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>';
    }).join('');
    wrap.innerHTML = '<div class="dm-frame"><span class="dm-tag">Sang Narator</span>' + paras + '</div>';
    appendWrap(wrap);
  }

  function renderRemoteRoll(name, html) {
    var el = document.createElement('div');
    el.className = 'roll-note remote';
    el.innerHTML = '<span aria-hidden="true">\u2684</span>' +
      '<span class="mp-roll-who">' + esc(name) + '</span> ' + html;
    appendWrap(el);
  }

  function renderRemoteSys(text) {
    var wrap = document.createElement('div');
    wrap.className = 'msg sys';
    wrap.textContent = text;
    appendWrap(wrap);
  }

  /* ---------- party panel ---------- */
  function renderParty() {
    var panel = document.getElementById('mp-party');
    if (!panel) return;
    if (!MP.enabled) { panel.style.display = 'none'; return; }
    panel.style.display = 'flex';

    var codeEl = document.getElementById('mp-room-code');
    if (codeEl) codeEl.textContent = MP.room || '----';

    var list = document.getElementById('mp-party-list');
    if (!list) return;
    var members = [];
    members.push({ name: MP.myName + ' (kamu)', me: true });
    Object.keys(MP.peers).forEach(function (k) {
      members.push({ name: MP.peers[k].name || 'Petualang', me: false });
    });
    list.innerHTML = members.map(function (m) {
      return '<span class="mp-chip' + (m.me ? ' me' : '') + '">' +
        '<span class="mp-dot"></span>' + esc(m.name) + '</span>';
    }).join('');

    var countEl = document.getElementById('mp-count');
    if (countEl) countEl.textContent = members.length;
  }

  /* ============================================================
     PUBLIC API consumed by app.js
  ============================================================ */
  window.AethermoorMP = {
    state: MP,
    isActive: function () { return MP.enabled; },
    isHost: function () { return MP.isHost; },

    // called by lobby UI
    createRoom: function (name) {
      MP.myName = (name || 'Petualang').slice(0, 28);
      var code = genRoomCode();
      return joinRoom(code, true).then(function () { return code; });
    },
    joinRoom: function (code, name) {
      MP.myName = (name || 'Petualang').slice(0, 28);
      return joinRoom(String(code).toUpperCase().trim(), false);
    },
    leave: leaveRoom,
    setName: function (n) {
      MP.myName = (n || 'Petualang').slice(0, 28);
      if (MP.channel) MP.channel.track({ name: MP.myName, isHost: MP.isHost });
      renderParty();
    },

    // broadcast hooks (called from app.js). Safe no-ops when solo.
    onLocalAction: function (text) { send('pc', { text: text }); },
    onLocalDM: function (text) { if (MP.isHost) send('dm', { text: text }); },
    onLocalRoll: function (html) { send('roll', { html: html }); },
    onLocalRollResult: function (text) { send('roll-result', { text: text }); },
    onLocalSys: function (text) { if (MP.isHost) send('sys', { text: text }); },
    announceIdentity: function (race, cls) { send('identity', { race: race, cls: cls }); },
  };
})();
