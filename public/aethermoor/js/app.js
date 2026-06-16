"use strict";

/* ============================================================
   DATA
============================================================ */
const RACES = [
  {key:'manusia', name:'Manusia', sub:'Serba bisa', desc:'Ambisius dan mudah beradaptasi, manusia mengukir nama di setiap sudut Aethermoor.', bonus:{STR:1,CHA:1}, traits:'+1 Kekuatan · +1 Karisma'},
  {key:'elf', name:'Elf', sub:'Anggun', desc:'Anak hutan abadi, mata mereka menembus kegelapan dan jari mereka tak pernah goyah.', bonus:{DEX:2,INT:1}, traits:'+2 Ketangkasan · +1 Kecerdasan'},
  {key:'dwarf', name:'Dwarf', sub:'Kokoh', desc:'Ditempa di perut gunung, tubuh mereka sekeras batu dan dendam mereka lebih dalam.', bonus:{CON:2,STR:1}, traits:'+2 Ketahanan · +1 Kekuatan'},
  {key:'halfling', name:'Halfling', sub:'Beruntung', desc:'Kecil namun tak gentar; keberuntungan tampaknya selalu berpihak pada mereka.', bonus:{DEX:2,CHA:1}, traits:'+2 Ketangkasan · +1 Karisma'},
  {key:'tiefling', name:'Tiefling', sub:'Terkutuk', desc:'Darah neraka mengalir di nadi mereka, memberi pesona berbahaya dan tatapan menyala.', bonus:{CHA:2,INT:1}, traits:'+2 Karisma · +1 Kecerdasan'},
  {key:'dragonborn', name:'Dragonborn', sub:'Perkasa', desc:'Keturunan naga purba, nafas mereka menyimpan amukan elemen.', bonus:{STR:2,CHA:1}, traits:'+2 Kekuatan · +1 Karisma'},
];

const CLASSES = [
  {key:'petarung', name:'Petarung', sub:'Garis Depan', hd:10, prime:'STR', desc:'Ahli baja dan perisai yang berdiri tegar di tengah badai pertempuran.', sig:'Aksi Lonjak — pukulan tambahan dalam pertempuran.', items:['Pedang panjang','Perisai baja','Ransum perjalanan'], gold:25},
  {key:'penyihir', name:'Penyihir', sub:'Penjalin Arcana', hd:6, prime:'INT', desc:'Penjaga rahasia kosmik yang membengkokkan realitas dengan kehendak.', sig:'Sihir Arcana — lontarkan mantra dari grimoire kuno.', items:['Tongkat sihir','Grimoire','Kantung komponen'], gold:18},
  {key:'pencuri', name:'Pencuri', sub:'Bayangan', hd:8, prime:'DEX', desc:'Tangan cepat dan kaki sunyi; tak ada kunci atau saku yang aman darinya.', sig:'Serangan Licik — luka tambahan saat menyergap.', items:['Belati kembar','Peralatan maling','Jubah gelap'], gold:30},
  {key:'pendeta', name:'Pendeta', sub:'Tangan Ilahi', hd:8, prime:'WIS', desc:'Saluran kehendak dewa, memberi berkah penyembuhan maupun murka suci.', sig:'Berkah Ilahi — sembuhkan luka dan usir kegelapan.', items:['Gada','Simbol suci','Perisai'], gold:22},
  {key:'pemburu', name:'Pemburu', sub:'Penjejak', hd:10, prime:'DEX', desc:'Mata liar yang membaca jejak dan panah yang tak pernah meleset.', sig:'Penjejak — pelacak ulung dan pemanah mematikan.', items:['Busur panjang','Tabung anak panah','Belati'], gold:20},
  {key:'bard', name:'Bard', sub:'Penutur', hd:8, prime:'CHA', desc:'Lidah berbisa madu yang menenun sihir dari nada dan kata.', sig:'Inspirasi — pikat sekutu dan musuh dengan pesona.', items:['Kecapi','Rapier','Pakaian necis'], gold:28},
];

const ABILITIES = [
  {k:'STR', full:'Kekuatan'},
  {k:'DEX', full:'Ketangkasan'},
  {k:'CON', full:'Ketahanan'},
  {k:'INT', full:'Kecerdasan'},
  {k:'WIS', full:'Kebijaksanaan'},
  {k:'CHA', full:'Karisma'},
];

// SVG emblems per class
function emblem(key,size){
  size=size||40;
  const s='<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">';
  const m={
    petarung:'<path d="M14.5 4 20 4 20 9.5"/><path d="M20 4 8.5 15.5"/><path d="m6 21-3-3 2-2 3 3z"/><path d="m6.5 16.5 1 1M9 19l-4.5 2"/>',
    penyihir:'<path d="M12 2v20"/><circle cx="12" cy="4" r="2.2"/><path d="M9.5 6.5 12 9l2.5-2.5M12 9c-2 3-4 4-4 4M12 9c2 3 4 4 4 4"/>',
    pencuri:'<path d="m4 4 6 6-1.5 1.5L4 7zM20 4l-6 6 1.5 1.5L20 7z"/><path d="M10.5 11.5 8 20l4-3 4 3-2.5-8.5"/>',
    pendeta:'<path d="M12 2v20M6 8h12"/><circle cx="12" cy="14" r="0" /><path d="M9 4h6"/>',
    pemburu:'<path d="M4 20 20 4"/><path d="M14 4h6v6"/><path d="M5 13a7 7 0 0 0 6 6"/><path d="m9 15 2 2"/>',
    bard:'<path d="M8 3v13"/><path d="M16 5v13"/><path d="M8 3c4-1 8 0 8 2M8 7c4-1 8 0 8 2"/><circle cx="6" cy="17" r="2.4"/><circle cx="14" cy="19" r="2.4"/>',
  };
  return s+(m[key]||m.petarung)+'</svg>';
}

// polygon shapes for dice buttons
function diePoly(sides){
  const map={
    4:'<polygon points="12,4 21,19 3,19"/>',
    6:'<rect x="5" y="5" width="14" height="14" rx="1.5"/>',
    8:'<polygon points="12,3 20,12 12,21 4,12"/>',
    10:'<polygon points="12,3 20,10 16,21 8,21 4,10"/>',
    12:'<polygon points="12,3 20,8 18,18 6,18 4,8"/>',
    20:'<polygon points="12,3 21,8.5 21,15.5 12,21 3,15.5 3,8.5"/><path d="M12,3 12,21 M3,8.5 21,15.5 M21,8.5 3,15.5" stroke-width="1"/>',
    100:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18" stroke-width="1"/>',
  };
  return '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">'+(map[sides]||map[20])+'</svg>';
}

// big icosahedron-ish svg for the overlay
function bigDieSVG(){
  return '<polygon points="100,12 174,55 174,145 100,188 26,145 26,55" fill="rgba(157,127,212,0.10)" stroke="#9d7fd4" stroke-width="2"/>'+
    '<polygon points="100,12 174,55 100,100 26,55" fill="rgba(226,178,74,0.06)" stroke="#9c7320" stroke-width="1.2"/>'+
    '<polygon points="174,55 174,145 100,100" fill="rgba(157,127,212,0.04)" stroke="#9c7320" stroke-width="1.2"/>'+
    '<polygon points="26,55 26,145 100,100" fill="rgba(157,127,212,0.04)" stroke="#9c7320" stroke-width="1.2"/>'+
    '<polygon points="100,188 174,145 100,100" fill="rgba(226,178,74,0.05)" stroke="#9c7320" stroke-width="1.2"/>'+
    '<polygon points="100,188 26,145 100,100" fill="rgba(226,178,74,0.05)" stroke="#9c7320" stroke-width="1.2"/>'+
    '<polygon points="100,12 174,55 100,100 26,55" fill="none" stroke="#e2b24a" stroke-width="0.8" opacity="0.5"/>';
}

/* ============================================================
   CHARACTER PORTRAIT  (race + class -> SVG bust, viewBox 100x116)
============================================================ */
const SKIN = {
  manusia:   {base:'#c98d5e', shade:'#a06d45', light:'#e3ad7c'},
  elf:       {base:'#dcc8ad', shade:'#b8a487', light:'#f1e4cf'},
  dwarf:     {base:'#c67c50', shade:'#9c5b36', light:'#e09c6f'},
  halfling:  {base:'#d09865', shade:'#a8743f', light:'#ecb887'},
  tiefling:  {base:'#b34e63', shade:'#7f3247', light:'#d4748a'},
  dragonborn:{base:'#8f9c5c', shade:'#697440', light:'#b3bf80'},
};
const HAIR = {
  manusia:'#46301f', elf:'#d9b46a', dwarf:'#9a4e28',
  halfling:'#5c3a22', tiefling:'#241d33', dragonborn:null,
};
const GLOW_EYE = { tiefling:'#f7c14a', dragonborn:'#f0b24a' };
const GARB = {
  petarung:  {base:'#5d6775', shade:'#3f4855', trim:'#a6b6c8', metal:true},
  penyihir:  {base:'#4a3a6e', shade:'#332650', trim:'#9d7fd4'},
  pencuri:   {base:'#2d2935', shade:'#1b1822', trim:'#5a5266'},
  pendeta:   {base:'#cdbf9c', shade:'#a3946f', trim:'#e2b24a'},
  pemburu:   {base:'#3f5a3a', shade:'#2a3f27', trim:'#74914f'},
  bard:      {base:'#7a3b52', shade:'#57293b', trim:'#e2b24a'},
};
function prop(cls, g){
  switch(cls){
    case 'petarung':
      return '<g opacity="0.95"><line x1="70" y1="40" x2="40" y2="112" stroke="#c9d2dd" stroke-width="5" stroke-linecap="round"/><line x1="70" y1="40" x2="40" y2="112" stroke="#7e8896" stroke-width="1.6"/><line x1="62" y1="44" x2="80" y2="56" stroke="#9c7320" stroke-width="4" stroke-linecap="round"/><circle cx="71.5" cy="36" r="4" fill="#e2b24a"/></g>';
    case 'penyihir':
      return '<g opacity="0.95"><line x1="74" y1="34" x2="74" y2="112" stroke="#6e4a2c" stroke-width="4.5" stroke-linecap="round"/><path d="M74 22 L80 33 L74 40 L68 33 Z" fill="#b89be6"/><path d="M74 22 L80 33 L74 40 Z" fill="#9d7fd4"/><circle cx="74" cy="31" r="9" fill="#9d7fd4" opacity="0.25"/></g>';
    case 'pencuri':
      return '<g opacity="0.92"><line x1="70" y1="48" x2="84" y2="92" stroke="#b9c2cd" stroke-width="3"/><line x1="70" y1="48" x2="64" y2="40" stroke="#5a5266" stroke-width="4" stroke-linecap="round"/></g>';
    case 'pendeta':
      return '<g opacity="0.95"><line x1="74" y1="42" x2="74" y2="112" stroke="#a3946f" stroke-width="4" stroke-linecap="round"/><circle cx="74" cy="34" r="6.5" fill="none" stroke="#e2b24a" stroke-width="2.4"/><g stroke="#e2b24a" stroke-width="1.6"><line x1="74" y1="23" x2="74" y2="27"/><line x1="74" y1="41" x2="74" y2="45"/><line x1="65" y1="34" x2="69" y2="34"/><line x1="79" y1="34" x2="83" y2="34"/></g></g>';
    case 'pemburu':
      return '<g opacity="0.95" fill="none"><path d="M40 28 Q86 58 40 110" stroke="#6e4a2c" stroke-width="4" stroke-linecap="round"/><line x1="40" y1="28" x2="40" y2="110" stroke="#d8cdb6" stroke-width="1.2"/></g>';
    case 'bard':
      return '<g opacity="0.95"><line x1="66" y1="40" x2="86" y2="100" stroke="#7a4a28" stroke-width="6" stroke-linecap="round"/><ellipse cx="88" cy="104" rx="13" ry="16" fill="#9c6a38" transform="rotate(20 88 104)"/><g stroke="#d8cdb6" stroke-width="0.7"><line x1="68" y1="42" x2="88" y2="100"/><line x1="64" y1="44" x2="84" y2="102"/></g></g>';
  }
  return '';
}
function shoulders(g){
  let s = '<path d="M50 60 C 28 60, 16 72, 12 116 L 88 116 C 84 72, 72 60, 50 60 Z" fill="'+g.base+'"/>';
  s += '<path d="M50 62 C 33 62, 23 72, 18 116 L 12 116 C 16 72, 28 60, 50 60 Z" fill="'+g.shade+'" opacity="0.55"/>';
  if(g.metal){
    s += '<ellipse cx="22" cy="78" rx="14" ry="11" fill="'+g.trim+'"/>';
    s += '<ellipse cx="78" cy="78" rx="14" ry="11" fill="'+g.trim+'"/>';
    s += '<ellipse cx="22" cy="76" rx="14" ry="11" fill="'+g.shade+'" opacity="0.35"/>';
    s += '<ellipse cx="78" cy="76" rx="9" ry="7" fill="#d7e0ea" opacity="0.5"/>';
    s += '<path d="M40 72 L50 86 L60 72" fill="none" stroke="'+g.trim+'" stroke-width="3"/>';
  } else {
    s += '<path d="M50 60 C 41 60, 36 67, 36 72 L 50 84 L 64 72 C 64 67, 59 60, 50 60 Z" fill="'+g.trim+'" opacity="0.92"/>';
    s += '<path d="M50 66 L50 86" stroke="'+g.shade+'" stroke-width="2" opacity="0.6"/>';
  }
  return s;
}
function neck(sk){
  return '<path d="M43 52 L43 66 Q50 72 57 66 L57 52 Z" fill="'+sk.base+'"/>'+
         '<path d="M43 52 L43 66 Q47 70 50 70 L50 52 Z" fill="'+sk.shade+'" opacity="0.4"/>';
}
function head(sk, race){
  let rx = 17.5, ry = 21, cy = 38;
  if(race==='halfling'||race==='dwarf'){ rx = 18.5; ry = 20; }
  if(race==='elf'){ rx = 16; ry = 22; }
  let s = '<ellipse cx="50" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="'+sk.base+'"/>';
  s += '<path d="M'+(50-rx+1)+' '+cy+' Q'+(50-rx)+' '+(cy+12)+' 50 '+(cy+ry-1)+' Q'+(50-7)+' '+(cy+ry-4)+' '+(50-rx+3)+' '+(cy+4)+' Z" fill="'+sk.shade+'" opacity="0.35"/>';
  s += '<ellipse cx="50" cy="'+(cy-9)+'" rx="9" ry="5" fill="'+sk.light+'" opacity="0.35"/>';
  return s;
}
function ears(sk, race){
  if(race==='dragonborn') return '';
  if(race==='elf'){
    return '<path d="M33 36 Q24 26 27 20 Q31 30 36 34 Z" fill="'+sk.base+'" stroke="'+sk.shade+'" stroke-width="0.6"/>'+
           '<path d="M67 36 Q76 26 73 20 Q69 30 64 34 Z" fill="'+sk.base+'" stroke="'+sk.shade+'" stroke-width="0.6"/>';
  }
  return '<ellipse cx="33" cy="40" rx="3.4" ry="5" fill="'+sk.base+'"/><ellipse cx="33" cy="40" rx="1.6" ry="3" fill="'+sk.shade+'" opacity="0.5"/>'+
         '<ellipse cx="67" cy="40" rx="3.4" ry="5" fill="'+sk.base+'"/><ellipse cx="67" cy="40" rx="1.6" ry="3" fill="'+sk.shade+'" opacity="0.5"/>';
}
function snout(sk){
  return '<path d="M48 38 Q70 40 72 50 Q70 58 60 58 Q52 58 49 53 Z" fill="'+sk.base+'"/>'+
         '<path d="M60 58 Q70 57 72 50 Q70 56 62 56 Z" fill="'+sk.shade+'" opacity="0.5"/>'+
         '<ellipse cx="68" cy="48.5" rx="1.4" ry="1.1" fill="'+sk.shade+'"/>'+
         '<path d="M50 54 Q62 57 71 52" stroke="'+sk.shade+'" stroke-width="1.2" fill="none"/>'+
         '<g stroke="'+sk.shade+'" stroke-width="0.9" opacity="0.6" fill="none"><path d="M40 30 Q46 28 52 30"/><path d="M40 34 Q46 32 52 34"/></g>'+
         '<path d="M34 30 Q26 26 22 30 Q28 32 33 36 Z" fill="'+sk.shade+'"/>'+
         '<path d="M34 24 Q24 22 19 27 Q27 27 33 32 Z" fill="'+sk.base+'"/>'+
         '<path d="M40 22 Q34 14 36 8 Q41 16 45 22 Z" fill="'+sk.shade+'"/>'+
         '<path d="M55 22 Q60 15 58 9 Q54 17 51 22 Z" fill="'+sk.shade+'"/>';
}
function face(sk, race){
  const glow = GLOW_EYE[race];
  const eyeY = 38, lx = 43, rx = 57;
  let s = '';
  const browCol = (race==='dragonborn'||race==='tiefling') ? sk.shade : (HAIR[race]||sk.shade);
  if(race!=='dragonborn'){
    s += '<path d="M39 33.5 Q43 31.5 47 33.5" stroke="'+browCol+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    s += '<path d="M53 33.5 Q57 31.5 61 33.5" stroke="'+browCol+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  }
  if(glow){
    [lx,rx].forEach(x=>{
      s += '<ellipse cx="'+x+'" cy="'+eyeY+'" rx="4.6" ry="3" fill="'+glow+'" opacity="0.28"/>';
      s += '<path d="M'+(x-3.6)+' '+eyeY+' Q'+x+' '+(eyeY-3)+' '+(x+3.6)+' '+eyeY+' Q'+x+' '+(eyeY+2.4)+' '+(x-3.6)+' '+eyeY+' Z" fill="'+glow+'"/>';
      s += '<ellipse cx="'+x+'" cy="'+eyeY+'" rx="0.9" ry="2.2" fill="#1a1208"/>';
    });
  } else {
    [lx,rx].forEach(x=>{
      s += '<path d="M'+(x-3.4)+' '+eyeY+' Q'+x+' '+(eyeY-2.6)+' '+(x+3.4)+' '+eyeY+' Q'+x+' '+(eyeY+2.2)+' '+(x-3.4)+' '+eyeY+' Z" fill="#f4ecde"/>';
      s += '<circle cx="'+(x+0.4)+'" cy="'+eyeY+'" r="1.7" fill="#3a2a1a"/>';
      s += '<circle cx="'+(x+1.1)+'" cy="'+(eyeY-0.6)+'" r="0.5" fill="#fff" opacity="0.9"/>';
    });
    s += '<path d="M50 38 L48.4 45 Q50 46.4 51.6 45" stroke="'+sk.shade+'" stroke-width="1.1" fill="none" stroke-linecap="round"/>';
    s += '<path d="M46 50 Q50 52 54 50" stroke="'+sk.shade+'" stroke-width="1.2" fill="none" stroke-linecap="round"/>';
  }
  return s;
}
function beard(){
  const c = HAIR.dwarf;
  return '<path d="M33 42 Q32 70 50 76 Q68 70 67 42 Q63 54 58 56 L58 60 Q50 64 42 60 L42 56 Q37 54 33 42 Z" fill="'+c+'"/>'+
    '<path d="M42 49 Q50 53 58 49 Q54 56 50 55 Q46 56 42 49 Z" fill="'+c+'"/>'+
    '<g stroke="#7a3c1e" stroke-width="1" opacity="0.7" fill="none"><path d="M44 60 Q44 70 47 74"/><path d="M56 60 Q56 70 53 74"/></g>'+
    '<circle cx="46" cy="72" r="1.8" fill="#e2b24a"/><circle cx="54" cy="72" r="1.8" fill="#e2b24a"/>';
}
function hair(race, hidden){
  if(hidden) return '';
  const c = HAIR[race];
  if(!c) return '';
  switch(race){
    case 'manusia':
      return '<path d="M32 36 Q30 16 50 15 Q70 16 68 36 Q66 26 58 23 Q50 21 42 23 Q34 26 32 36 Z" fill="'+c+'"/>';
    case 'elf':
      return '<path d="M33 38 Q30 14 50 13 Q70 14 67 38 Q66 24 58 21 Q50 19 42 21 Q34 24 33 38 Z" fill="'+c+'"/>'+
             '<path d="M33 30 Q27 50 30 72 L35 70 Q33 50 35 32 Z" fill="'+c+'"/>'+
             '<path d="M67 30 Q73 50 70 72 L65 70 Q67 50 65 32 Z" fill="'+c+'"/>';
    case 'dwarf':
      return '<path d="M32 36 Q31 18 50 18 Q69 18 68 36 Q64 28 58 26 Q50 24 42 26 Q36 28 32 36 Z" fill="'+c+'"/>';
    case 'halfling':
      return '<g fill="'+c+'"><circle cx="36" cy="26" r="7"/><circle cx="46" cy="21" r="8"/><circle cx="56" cy="22" r="7.5"/><circle cx="64" cy="28" r="6.5"/><circle cx="32" cy="34" r="6"/><circle cx="68" cy="34" r="5.5"/></g>';
    case 'tiefling':
      return '<path d="M33 36 Q30 14 50 14 Q70 14 67 36 Q64 24 56 22 Q50 20 44 22 Q36 24 33 36 Z" fill="'+c+'"/>'+
             '<path d="M33 30 Q30 44 33 56 L37 52 Q35 42 36 32 Z" fill="'+c+'"/>';
  }
  return '';
}
function horns(race){
  if(race!=='tiefling') return '';
  return '<path d="M39 22 Q31 12 33 3 Q39 12 45 21 Z" fill="#5a3142"/>'+
         '<path d="M39 22 Q33 13 34 5 Q38 13 43 21 Z" fill="#3a1f2c"/>'+
         '<path d="M61 22 Q69 12 67 3 Q61 12 55 21 Z" fill="#5a3142"/>'+
         '<path d="M61 22 Q67 13 66 5 Q62 13 57 21 Z" fill="#3a1f2c"/>';
}
function headgear(cls, g, race){
  switch(cls){
    case 'petarung': {
      const m = g.trim, sh = g.shade;
      let s = '<path d="M30 40 Q29 16 50 15 Q71 16 70 40 L66 40 Q65 25 50 24 Q35 25 34 40 Z" fill="'+m+'"/>';
      s += '<path d="M30 40 Q29 16 50 15 Q56 15 60 17 Q44 19 38 30 Q35 36 34 40 Z" fill="#d9e2ec" opacity="0.4"/>';
      s += '<rect x="48" y="30" width="4" height="15" rx="2" fill="'+m+'"/>';
      s += '<path d="M30 40 L70 40" stroke="'+sh+'" stroke-width="1.5"/>';
      s += '<path d="M50 15 Q50 6 54 2 Q52 9 52 15 Z" fill="#bf4646"/>';
      return {markup:s, hidesHair:true};
    }
    case 'penyihir': {
      const base=g.base, sh=g.shade, band=g.trim;
      let s = '<ellipse cx="50" cy="23" rx="27" ry="6.5" fill="'+sh+'"/>';
      s += '<path d="M37 22 C 41 9, 44 5, 48 3 C 51 9, 55 15, 62 22 Q50 18 37 22 Z" fill="'+base+'"/>';
      s += '<path d="M37 22 C 41 9, 44 5, 48 3 C 49 8, 50 12, 51 16 Q44 18 37 22 Z" fill="'+sh+'" opacity="0.45"/>';
      s += '<path d="M40 21 Q50 17.5 60 21 L59 17 Q50 14 41 17 Z" fill="'+band+'"/>';
      s += '<path d="M50 14.6 L51.3 17.4 L54.3 17.7 L52 19.7 L52.7 22.6 L50 21 L47.3 22.6 L48 19.7 L45.7 17.7 L48.7 17.4 Z" fill="#f6d27a"/>';
      return {markup:s, hidesHair:true};
    }
    case 'pencuri': {
      const base=g.base, sh=g.shade;
      let s = '<path d="M24 46 Q18 12 50 10 Q82 12 76 46 L69 44 Q72 22 50 20 Q28 22 31 44 Z" fill="'+base+'"/>';
      s += '<path d="M24 46 Q18 12 50 10 Q60 10 66 13 Q40 16 33 40 Q31 44 31 44 Z" fill="'+sh+'" opacity="0.6"/>';
      s += '<path d="M34 30 Q33 20 50 19 Q67 20 66 30 Q60 24 50 24 Q40 24 34 30 Z" fill="#0d0a12" opacity="0.3"/>';
      return {markup:s, hidesHair:true};
    }
    case 'pendeta': {
      let s = '<ellipse cx="50" cy="17" rx="19" ry="5" fill="none" stroke="#f6d27a" stroke-width="2.4" opacity="0.9"/>';
      s += '<ellipse cx="50" cy="17" rx="19" ry="5" fill="none" stroke="#fff3cf" stroke-width="0.8" opacity="0.7"/>';
      s += '<path d="M34 28 Q50 23 66 28" fill="none" stroke="#e2b24a" stroke-width="2.4"/>';
      s += '<circle cx="50" cy="26" r="2.2" fill="#f6d27a"/>';
      return {markup:s, hidesHair:false};
    }
    case 'pemburu': {
      const base=g.base, sh=g.shade;
      let s = '<path d="M25 46 Q20 14 50 12 Q80 14 75 46 L68 44 Q71 24 50 22 Q29 24 32 44 Z" fill="'+base+'"/>';
      s += '<path d="M25 46 Q20 14 50 12 Q59 12 65 15 Q40 18 33 42 Z" fill="'+sh+'" opacity="0.55"/>';
      s += '<path d="M70 24 Q82 10 84 0 Q74 8 68 22 Z" fill="#c2543f"/>';
      s += '<path d="M71 22 Q80 12 83 3" stroke="#7a2f24" stroke-width="0.8" fill="none"/>';
      return {markup:s, hidesHair:true};
    }
    case 'bard': {
      const base=g.base, trim=g.trim;
      let s = '<path d="M30 28 Q30 12 52 12 Q72 12 70 26 Q60 20 44 22 Q35 23 30 28 Z" fill="'+base+'"/>';
      s += '<path d="M30 28 Q30 12 52 12 Q58 12 62 14 Q44 16 36 24 Z" fill="#fff" opacity="0.15"/>';
      s += '<path d="M30 28 Q40 24 54 23" stroke="'+trim+'" stroke-width="2" fill="none"/>';
      s += '<path d="M66 22 Q80 8 84 14 Q74 16 68 26 Z" fill="#e2b24a"/>';
      return {markup:s, hidesHair:false};
    }
  }
  return {markup:'', hidesHair:false};
}
function characterInner(raceKey, clsKey){
  const sk = SKIN[raceKey] || SKIN.manusia;
  const g  = GARB[clsKey] || GARB.petarung;
  const hg = headgear(clsKey, g, raceKey);
  let s = '';
  s += '<ellipse cx="50" cy="44" rx="40" ry="46" fill="#e2b24a" opacity="0.05"/>';
  s += prop(clsKey, g);
  s += shoulders(g);
  s += neck(sk);
  s += head(sk, raceKey);
  s += ears(sk, raceKey);
  if(raceKey==='dragonborn') s += snout(sk);
  s += face(sk, raceKey);
  if(raceKey==='dwarf') s += beard();
  s += hair(raceKey, hg.hidesHair);
  s += horns(raceKey);
  s += hg.markup;
  return s;
}
function characterSVG(raceKey, clsKey, size){
  size = size || 96;
  return '<svg width="'+size+'" height="'+(size*1.16)+'" viewBox="0 0 100 116" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">'+characterInner(raceKey,clsKey)+'</svg>';
}

/* ============================================================
   STATE
============================================================ */
const State = {
  char:{name:'',race:null,cls:null,scores:null,hpMax:0,hp:0,gold:0,inventory:[]},
  messages:[],
  pendingRoll:null,
  busy:false,
  audioReady:false,
  ambientOn:false,
};
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SKILL_ABILITY = {
  atletik:'STR', akrobatik:'DEX', menyelinap:'DEX', 'diam-diam':'DEX', sembunyi:'DEX', siasat:'DEX', kelincahan:'DEX',
  arcana:'INT', sejarah:'INT', penyelidikan:'INT', investigasi:'INT', alam:'INT', agama:'INT',
  persepsi:'WIS', wawasan:'WIS', medis:'WIS', 'pengobatan':'WIS', 'menangani hewan':'WIS', 'bertahan hidup':'WIS', survival:'WIS', naluri:'WIS',
  persuasi:'CHA', tipu:'CHA', 'tipu daya':'CHA', menipu:'CHA', intimidasi:'CHA', 'unjuk':'CHA', pertunjukan:'CHA', pesona:'CHA',
};

/* ============================================================
   HELPERS
============================================================ */
const $ = s => document.querySelector(s);
const mod = score => Math.floor((score-10)/2);
const modStr = m => (m>=0?'+'+m:''+m);
function rollDice(n,sides){let t=0;for(let i=0;i<n;i++)t+=1+Math.floor(Math.random()*sides);return t;}
function roll4d6drop(){const r=[0,0,0,0].map(()=>1+Math.floor(Math.random()*6));r.sort((a,b)=>a-b);return r[1]+r[2]+r[3];}

/* ============================================================
   PARTICLE BACKGROUND (embers / dust)
============================================================ */
(function particles(){
  const cv=$('#bg-canvas'), ctx=cv.getContext('2d');
  let w,h,parts=[];
  const COUNT = reduceMotion?0:Math.min(46, Math.floor(window.innerWidth/26));
  function resize(){w=cv.width=window.innerWidth;h=cv.height=window.innerHeight;}
  function make(){return{x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+.5,vy:-(Math.random()*.35+.08),vx:(Math.random()-.5)*.18,life:Math.random(),hue:Math.random()<.7?'g':'a',tw:Math.random()*Math.PI*2};}
  function init(){parts=[];for(let i=0;i<COUNT;i++)parts.push(make());}
  resize();init();
  window.addEventListener('resize',()=>{resize();init();});
  function frame(){
    ctx.clearRect(0,0,w,h);
    for(const p of parts){
      p.x+=p.vx;p.y+=p.vy;p.tw+=.04;
      if(p.y<-10){p.y=h+10;p.x=Math.random()*w;}
      const a=(Math.sin(p.tw)*.5+.5)*.5+.12;
      const col=p.hue==='g'?'226,178,74':'157,127,212';
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba('+col+','+a+')';
      ctx.shadowBlur=6;ctx.shadowColor='rgba('+col+',.6)';
      ctx.fill();
    }
    ctx.shadowBlur=0;
    requestAnimationFrame(frame);
  }
  if(COUNT>0) frame();
})();

/* ============================================================
   AUDIO (Tone.js) — guarded so failures never break play
============================================================ */
const Audio = {
  ok:false, drone:null, bellSynth:null, loop:null, noise:null, pluck:null, arp:null, master:null,
  async ensure(){
    if(this.ok || !window.Tone) return this.ok;
    try{
      await Tone.start();
      this.master = new Tone.Volume(-9).toDestination();
      const reverb = new Tone.Reverb({decay:6,wet:.4}).connect(this.master);

      // ambient drone
      this.drone = new Tone.PolySynth(Tone.Synth,{oscillator:{type:'sine'},envelope:{attack:4,decay:1,sustain:.6,release:6},volume:-22}).connect(reverb);
      // soft bells
      this.bellSynth = new Tone.Synth({oscillator:{type:'triangle'},envelope:{attack:.01,decay:1.4,sustain:0,release:1.2},volume:-20}).connect(reverb);
      // sfx
      this.noise = new Tone.NoiseSynth({noise:{type:'brown'},envelope:{attack:.005,decay:.18,sustain:0}}).connect(this.master);
      this.pluck = new Tone.PluckSynth({attackNoise:1,dampening:2600,resonance:.8}).connect(this.master);
      this.arp = new Tone.Synth({oscillator:{type:'triangle'},envelope:{attack:.01,decay:.2,sustain:.1,release:.3},volume:-6}).connect(reverb);

      const bells=['C5','E5','G5','A5','D5','G4'];
      this.loop = new Tone.Loop(time=>{
        if(Math.random()<.55) this.bellSynth.triggerAttackRelease(bells[Math.floor(Math.random()*bells.length)],'8n',time);
      }, '2n');
      this.ok=true;
    }catch(e){console.warn('audio init failed',e);this.ok=false;}
    return this.ok;
  },
  startAmbient(){
    if(!this.ok) return;
    try{
      this.drone.triggerAttack(['C3','G3','C4']);
      Tone.Transport.start();
      this.loop.start(0);
    }catch(e){console.warn(e);}
  },
  stopAmbient(){
    if(!this.ok) return;
    try{this.drone.releaseAll();this.loop.stop();Tone.Transport.stop();}catch(e){}
  },
  click(){if(this.ok)try{this.pluck.triggerAttackRelease('C5','16n');}catch(e){}},
  diceRattle(){
    if(!this.ok) return;
    try{
      const n=this.noise, now=Tone.now();
      for(let i=0;i<7;i++) n.triggerAttackRelease('16n', now+i*0.07);
    }catch(e){}
  },
  lock(){if(this.ok)try{this.pluck.triggerAttackRelease('G3','8n');}catch(e){}},
  critUp(){
    if(!this.ok) return;
    try{const a=this.arp,t=Tone.now();['C5','E5','G5','C6'].forEach((nn,i)=>a.triggerAttackRelease(nn,'16n',t+i*0.09));}catch(e){}
  },
  critDown(){
    if(!this.ok) return;
    try{const a=this.arp,t=Tone.now();['G3','F3','D3','B2'].forEach((nn,i)=>a.triggerAttackRelease(nn,'8n',t+i*0.11));}catch(e){}
  },
};

/* ============================================================
   BUILD CREATE SCREEN
============================================================ */
function buildCreate(){
  // races
  const rg=$('#race-grid');
  RACES.forEach(r=>{
    const b=document.createElement('button');
    b.className='pick';b.dataset.key=r.key;
    b.innerHTML='<h3>'+r.name+'</h3><div class="sub">'+r.sub+'</div><div class="desc">'+r.desc+'</div><div class="traits">'+r.traits+'</div>';
    b.onclick=()=>{Audio.click();selRace(r,b);};
    rg.appendChild(b);
  });
  // classes
  const cg=$('#class-grid');
  CLASSES.forEach(c=>{
    const b=document.createElement('button');
    b.className='pick';b.dataset.key=c.key;
    b.innerHTML='<span class="ic">'+emblem(c.key,30)+'</span><h3>'+c.name+'</h3><div class="sub">'+c.sub+'</div><div class="desc">'+c.desc+'</div><div class="traits">'+c.sig+'</div>';
    b.onclick=()=>{Audio.click();selClass(c,b);};
    cg.appendChild(b);
  });
  // attr placeholders
  renderAttr(null);
}
function selRace(r,el){
  State.char.race=r;
  document.querySelectorAll('#race-grid .pick').forEach(p=>p.classList.toggle('sel',p===el));
  if(State.char.scores) renderAttr(State.char.scores); // refresh bonuses
  updatePreview();
  refreshBegin();
}
function selClass(c,el){
  State.char.cls=c;
  document.querySelectorAll('#class-grid .pick').forEach(p=>p.classList.toggle('sel',p===el));
  updatePreview();
  refreshBegin();
}
function abilityFull(k){const a=ABILITIES.find(x=>x.k===k);return a?a.full:k;}
function updatePreview(){
  const c=State.char;
  const art=$('#preview-art'), sub=$('#preview-sub'), traits=$('#preview-traits');
  const nm=(($('#name-input')&&$('#name-input').value.trim())||'');
  $('#preview-name').textContent = nm || 'Pahlawan Tanpa Nama';
  if(c.race && c.cls){
    art.innerHTML=characterSVG(c.race.key,c.cls.key,124);
    art.classList.remove('reveal'); void art.offsetWidth; art.classList.add('reveal');
    sub.textContent = c.race.name+' · '+c.cls.name;
    traits.innerHTML='<span class="hp-tag">'+c.race.sub+'</span><span class="hp-tag">'+c.cls.sub+'</span><span class="hp-tag">Prima · '+abilityFull(c.cls.prime)+'</span>';
  } else if(c.race || c.cls){
    const chosen = c.race ? ('Bangsa '+c.race.name) : ('Kelas '+c.cls.name);
    const missing = c.race ? 'kelasmu' : 'bangsamu';
    art.innerHTML='<div class="hp-empty">❖</div>';
    sub.textContent = chosen+' dipilih — kini tentukan '+missing+'.';
    traits.innerHTML='';
  } else {
    art.innerHTML='<div class="hp-empty">❖</div>';
    sub.textContent='Pilih bangsa & kelas untuk menyingkap wujudmu.';
    traits.innerHTML='';
  }
}
function renderAttr(base){
  const g=$('#attr-grid');g.innerHTML='';
  ABILITIES.forEach(a=>{
    const raw = base?base[a.k]:'—';
    const bonus = (State.char.race&&State.char.race.bonus[a.k])||0;
    const total = base?raw+bonus:null;
    const m = total!=null?mod(total):null;
    const d=document.createElement('div');d.className='attr';d.dataset.k=a.k;
    d.innerHTML=
      (bonus?'<div class="ab-bonus">+'+bonus+'</div>':'')+
      '<div class="ab-name">'+a.k+'</div>'+
      '<div class="ab-score">'+(total!=null?total:'—')+'</div>'+
      '<div class="ab-mod">'+(m!=null?modStr(m):'·')+'</div>';
    g.appendChild(d);
  });
}
function rollAttrAnim(){
  const base={};ABILITIES.forEach(a=>base[a.k]=roll4d6drop());
  // animation: cycle numbers
  const cells=document.querySelectorAll('#attr-grid .attr');
  cells.forEach(c=>c.classList.add('rolling'));
  let ticks=0;const max=reduceMotion?1:14;
  const iv=setInterval(()=>{
    ticks++;
    cells.forEach(c=>{
      const k=c.dataset.k;
      const bonus=(State.char.race&&State.char.race.bonus[k])||0;
      if(ticks>=max){
        const tot=base[k]+bonus;
        c.querySelector('.ab-score').textContent=tot;
        c.querySelector('.ab-mod').textContent=modStr(mod(tot));
      }else{
        c.querySelector('.ab-score').textContent=3+Math.floor(Math.random()*16);
      }
    });
    if(ticks>=max){clearInterval(iv);cells.forEach(c=>c.classList.remove('rolling'));State.char.scores=base;renderAttr(base);Audio.lock();refreshBegin();}
  }, reduceMotion?10:55);
  Audio.diceRattle();
}
function refreshBegin(){
  const c=State.char;
  const ready = c.name.trim() && c.race && c.cls && c.scores;
  $('#begin-btn').disabled=!ready;
  $('#begin-hint').style.display=ready?'none':'block';
}

/* ============================================================
   START ADVENTURE
============================================================ */
async function beginAdventure(){
  const c=State.char;
  c.name=$('#name-input').value.trim()||'Sang Petualang';
  // finalize stats with race bonus
  const final={};ABILITIES.forEach(a=>final[a.k]=c.scores[a.k]+((c.race.bonus[a.k])||0));
  c.scores=final;
  c.hpMax=Math.max(1, c.cls.hd + mod(final.CON));
  c.hp=c.hpMax;
  c.gold=c.cls.gold;
  c.inventory=c.cls.items.slice();

  // wake audio (we're inside a user gesture) and begin the ambient soundscape
  await Audio.ensure();
  State.audioReady=Audio.ok;
  if(Audio.ok){State.ambientOn=true;$('#ambient-btn').classList.add('on');Audio.startAmbient();}

  // switch screens
  $('#screen-create').classList.remove('active');
  $('#screen-play').classList.add('active');
  renderSheet();
  buildTray();
  $('#topbar-who').textContent='— '+c.name+', '+c.race.name+' '+c.cls.name;

  // kick off the DM
  const opener = buildOpenerPrompt();
  State.messages=[];
  askDM(opener, 'opener');
}

function buildOpenerPrompt(){
  const c=State.char;
  const sc=c.scores;
  const statLine = ABILITIES.map(a=>a.k+' '+sc[a.k]+' ('+modStr(mod(sc[a.k]))+')').join(', ');
  return 'Mulai petualangan baru untuk pahlawan ini:\n'+
    'Nama: '+c.name+'\n'+
    'Bangsa: '+c.race.name+' — '+c.race.desc+'\n'+
    'Kelas: '+c.cls.name+' — '+c.cls.sig+'\n'+
    'Atribut: '+statLine+'\n'+
    'Perlengkapan awal: '+c.inventory.join(', ')+'\n'+
    'Titik Hidup: '+c.hp+'/'+c.hpMax+'\n\n'+
    'Buka cerita dengan adegan pembuka yang memikat dan spesifik di dunia fantasi Aethermoor — sebuah kail petualangan yang langsung menarik (misalnya bahaya, misteri, atau tugas mendesak). Sesuaikan dengan bangsa dan kelasnya. Akhiri dengan situasi yang jelas dan tanyakan apa yang akan dilakukan sang pahlawan.';
}

/* ============================================================
   DUNGEON MASTER (Anthropic API)
============================================================ */

const DM_OPENERS = {
  petarung: [
    `"Kau \u2026 kau Petarung yang dicari penjaga pos? Ada serigala raksasa di jalan setapak timur\u2014sudah dua kafilah diserang. Penjaga desa tak sanggup menghadapinya sendirian.

Ia menatapmu penuh harap, sebuah pedang tua di pinggangnya jelas lebih cocok untuk upacara daripada pertarungan.

Keputusan ada di tanganmu."`,
    `Seorang veteran berjenggot menghampirimu di lapangan latihan. "Dengar, aku pernah lihat banyak petarung. Tapi cara kau memegang senjata \u2026 ada sesuatu yang berbeda.

Kau mungkin yang kucari. Ada turnamen kecil di kota utara\u2014hadiahnya lima puluh keping emas. Tapi lawan-lawannya bukan anak kemarin."`,
  ],
  penyihir: [
    `"Akhirnya kau datang. Persimpangan ini telah menunggumu selama tiga siklus bulan. Ada gangguan di Menara Timur\u2014resonansi yang tak seharusnya ada. Aku bisa merasakannya, dan kau pasti juga."

Ia mengulurkan sebuah gulungan perkamen yang menyala lembut. "Baca ini di perjalanan. Tapi hati-hati\u2014pengetahuan punya harga."`,
    `"Kau Penyihir, kan? Kami butuh bantuanmu. Aliran mana di kuil bawah tanah kacau\u2014semacam kutukan atau jebakan sihir. Tukang sihir kami sendiri tak berani mendekat."

Raut wajahnya serius. Ini bukan pekerjaan sembarangan.`,
  ],
  pencuri: [
    `"Hei, bayangan. Ada kerjaan buatmu." Dari atap seberang, suara serak berbisik, "Bos Saga ingin menemuimu. Kabarnya, ada peti di ruang bawah tanah Balai Kota yang belum bisa dibuka oleh siapa pun.

Kau tertarik, atau kau lebih suka berkelahi dengan tikus got sepanjang malam?"`,
    `"Barang berharga membutuhkan tangan yang tepat." Seorang perempuan berjubah gelap melempar kantong kecil ke arahmu\u2014terdengar gemerincing logam. "Itu setengah bayaran di muka. Ambil sebuah lionet dari leher patung di pemakaman tua. Jangan bunuh siapa pun, dan jangan ketahuan."`,
  ],
  pendeta: [
    `"Pendeta! Wabah aneh melanda kampung selatan. Bukan penyakit biasa. Tanaman membusuk dalam semalam, dan penduduk bermimpi tentang matahari hitam."

Ia menyerahkan sebuah jimat perak yang berpendar redup. "Kepala desa memohon pertolongan. Aku \u2026 aku tak tahu harus berbuat apa lagi."`,
    `"Ada peziarah yang terluka di jalan utara. Mereka diserang\u2014bukan oleh bandit biasa. Luka mereka \u2026 aneh. Seperti terbakar dari dalam."

Biarawati itu tampak cemas. "Kemampuanmu mungkin satu-satunya harapan mereka."`,
  ],
  pemburu: [
    `Di sebuah lapangan kecil yang diterangi kabut pagi, bangkai seekor rusa besar tergeletak dengan luka yang aneh: sobekan yang rapi seolah dibuat oleh pisau bedah raksasa. Bulu-bulu di sekelilingnya membeku, meski udara tak dingin.

Dari semak, suara dahan patah. Kau bukan satu-satunya yang mengikuti jejak ini.`,
    `"Kau Pemburu, ya? Syukurlah." Seorang penjaga hutan berlari mendekat. "Ada makhluk aneh di hutan barat\u2014bukan serigala, bukan beruang. Jejaknya sebesar perisai dan baunya \u2026 seperti belerang.

Aku sudah kehilangan dua orang anak buahku yang mencoba menyelidiki."`,
  ],
  bard: [
    `"Kau Bard, kan?" Sebuah koin emas mendarat di depanmu, digelindingkan oleh pria bertubuh tambun dengan jubah merah. "Aku punya cerita yang perlu disebar\u2014tapi bukan cerita biasa. Masalahnya, saksi terakhir cerita ini baru saja menghilang di Rawa Timur.

Tertarik? Bayaranku cepat."`,
    `Suasana kedai hening saat kau memasuki panggung. Seorang perempuan tua menatapmu tajam. "Kau si penutur kisah?

Malam ini ada yang perlu kau dengar\u2014bukan untuk diucapkan, tapi untuk kau bawa ke telinga yang tepat."`,
  ],
};

const ADVENTURE_FOLLOWUPS = [
  `Langkahmu menggema di lorong waktu Aethermoor. Udara terasa berat, seakan dunia menahan napas menanti keputusanmu.

Sesuatu bergerak di kejauhan—mungkin kawan, mungkin lawan. Kau belum bisa memastikan.`,
  `Bayangan-bayangan memanjang saat matahari Aethermoor merunduk di balik bukit. Suara langkahmu sendiri terdengar asing di tempat ini.

Sebuah persimpangan terbentang: jalan yang terang namun ramai, atau lorong gelap yang menjanjikan jalan pintas—dan bahaya.`,
  `Angin membawa aroma tanah basah dan sesuatu yang lebih tua, lebih dalam. Naluri petualangmu berbisik bahwa kau tak sendirian di sini.

Di hadapanmu, jejak samar mengarah ke kegelapan. Pilihan ada di tanganmu.`,
  `Keheningan pecah oleh suara gemerisik. Entah hewan, entah seseorang yang mengintai. Jantungmu berdegup, tapi tanganmu tetap mantap.

Apa pun yang menunggu di depan, ia menunggu untukmu.`,
  `Reruntuhan tua menjulang di sekitarmu, batu-batunya berukir simbol yang tak kau kenali. Ada kekuatan lama yang tertidur di tempat ini—kau bisa merasakannya.

Satu langkah keliru bisa membangunkan sesuatu yang lebih baik dibiarkan terlelap.`,
  `Cahaya redup obor menari di dinding, menciptakan bayangan yang seakan hidup. Setiap sudut menyimpan kemungkinan—harta, jebakan, atau rahasia.

Dunia Aethermoor menanti gerakanmu berikutnya.`,
];


async function askDM(userContent, mode){
  if(State.busy) return;
  State.busy = true;
  setComposerEnabled(false);
  State.messages.push({ role: 'user', content: userContent });
  if(mode === 'action') renderMsg(userContent, 'pc');
  showThinking();
  await new Promise(function(r) { return setTimeout(r, reduceMotion ? 300 : 800 + Math.random() * 700); });
  try {
    var text = '';
    if (mode === 'opener') {
      var c = State.char;
      var key = c.cls ? c.cls.key : 'petarung';
      var stories = DM_OPENERS[key] || DM_OPENERS.petarung;
      var story = stories[Math.floor(Math.random() * stories.length)];
      text = "Nama mu " + c.name + ", seorang " + c.race.name + " " + c.cls.name + ".\n\n" + story;
      text += "\n\nApa yang akan kau lakukan? [ROLL:d20:Persepsi:WIS:12]";
    } else if (mode === 'roll') {
      var low = ['Sayangnya, usaha kali ini belum membuahkan hasil yang diharapkan. Tapi takdir masih memberimu kesempatan.', 'Kegagalan adalah guru yang kejam, tapi ia mengajar dengan baik.', 'Rintangan ini lebih sulit dari perkiraanmu. Tapi bukankah itu yang membuat petualangan layak dikenang?'];
      var mid = ['Langkahmu cukup mantap. Tidak spektakuler, tapi cukup untuk melewati rintangan kali ini.', 'Usahamu membuahkan hasil yang lumayan.', 'Cukup baik. Kadang, yang biasa saja sudah cukup untuk bertahan hidup.'];
      var high = ['Luar biasa! Aethermoor seakan berpihak padamu kali ini.', 'Takdir menyambutmu dengan tangan terbuka.', 'Gerakanmu sempurna. Bahkan para petualang senior akan mengangguk hormat.'];
      var isCrit = userContent.indexOf('SUKSES KRITIS') >= 0;
      var isCritFail = userContent.indexOf('GAGAL KRITIS') >= 0;
      var isSuccess = userContent.indexOf('Berhasil') >= 0 || userContent.indexOf('Sukses') >= 0;
      if (isCrit) {
        text = 'Kekuatan kosmik mengalir melalui dirimu! ' + high[Math.floor(Math.random() * high.length)];
      } else if (isCritFail) {
        text = 'Nasib buruk menimpamu! ' + low[Math.floor(Math.random() * low.length)];
      } else if (isSuccess) {
        text = 'Usahamu membuahkan hasil. ' + mid[Math.floor(Math.random() * mid.length)];
      } else {
        text = mid[Math.floor(Math.random() * mid.length)];
      }
      text += "\n\nApa langkahmu selanjutnya?";
    } else {
      text = ADVENTURE_FOLLOWUPS[Math.floor(Math.random() * ADVENTURE_FOLLOWUPS.length)];
      if (Math.random() < 0.45) {
        var rolls = ['[ROLL:d20:Penyelidikan:INT:13]', '[ROLL:d20:Persuasi:CHA:11]', '[ROLL:d20:Atletik:STR:14]', '[ROLL:d20:Kelincahan:DEX:12]', '[ROLL:d20:Persepsi:WIS:10]'];
        text += "\n\n" + rolls[Math.floor(Math.random() * rolls.length)];
      }
    }
    hideThinking();
    handleDMText(text);
  } catch(e) {
    console.error('DM error', e);
    hideThinking();
    renderMsg('Penglihatan meredup\u2026 arus arcana terputus dari Sang Narator. Coba kirim aksimu sekali lagi.', 'sys');
  } finally {
    State.busy = false;
    if(!State.pendingRoll) setComposerEnabled(true);
  }
}


function handleDMText(raw){
  let text=raw;
  // HP
  text=text.replace(/\[HP:\s*([+-]\d+)\s*\]/gi,(_,n)=>{applyHP(parseInt(n,10));return '';});
  // GOLD
  text=text.replace(/\[GOLD:\s*([+-]\d+)\s*\]/gi,(_,n)=>{applyGold(parseInt(n,10));return '';});
  // ITEM
  text=text.replace(/\[ITEM:\s*([+-])\s*([^\]]+?)\s*\]/gi,(_,sign,name)=>{applyItem(sign,name.trim());return '';});
  // ROLL (capture, keep first)
  let pending=null;
  text=text.replace(/\[ROLL:\s*d(\d+)\s*:\s*([^:\]]+?)\s*(?::\s*(STR|DEX|CON|INT|WIS|CHA))?\s*(?::\s*(?:DC\s*)?(\d+))?\s*\]/gi,(m,sides,label,ab,dc)=>{
    if(!pending) pending={sides:parseInt(sides,10),label:label.trim(),ability:ab?ab.toUpperCase():null,dc:dc?parseInt(dc,10):null};
    return '';
  });
  text=text.replace(/\n{3,}/g,'\n\n').trim();
  renderMsg(text,'dm');
  if(pending) setPendingRoll(pending);
}

/* ============================================================
   RENDER MESSAGES
============================================================ */
function renderMsg(text,who){
  const log=$('#log');
  const wrap=document.createElement('div');
  wrap.className='msg '+who;
  if(who==='dm'){
    const paras=text.split(/\n{2,}/).map(p=>'<p>'+escapeHTML(p).replace(/\n/g,'<br>')+'</p>').join('');
    wrap.innerHTML='<div class="dm-frame"><span class="dm-tag">Sang Narator</span>'+paras+'</div>';
  }else if(who==='pc'){
    wrap.innerHTML='<span class="pc-tag">'+escapeHTML(State.char.name||'Kamu')+'</span><span class="pc-bubble">'+escapeHTML(text)+'</span>';
  }else{
    wrap.textContent=text;
  }
  log.appendChild(wrap);
  requestAnimationFrame(()=>{wrap.classList.add('in');log.scrollTop=log.scrollHeight;});
  setTimeout(()=>{log.scrollTop=log.scrollHeight;},120);
}
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

let thinkingEl=null;
function showThinking(){
  thinkingEl=document.createElement('div');
  thinkingEl.className='thinking';
  thinkingEl.innerHTML='Sang Narator merenung<span class="orbs"><i></i><i></i><i></i></span>';
  $('#log').appendChild(thinkingEl);
  $('#log').scrollTop=$('#log').scrollHeight;
}
function hideThinking(){if(thinkingEl){thinkingEl.remove();thinkingEl=null;}}

/* ============================================================
   CHARACTER SHEET STATE UPDATES
============================================================ */
function applyHP(delta){
  const c=State.char;
  c.hp=Math.max(0,Math.min(c.hpMax,c.hp+delta));
  const fill=$('#hp-fill'),bar=$('#hp-bar');
  fill.style.width=(c.hp/c.hpMax*100)+'%';
  $('#hp-val').textContent=c.hp+' / '+c.hpMax;
  if(delta<0){bar.classList.remove('dmg');void bar.offsetWidth;bar.classList.add('dmg');}
}
function applyGold(delta){
  State.char.gold=Math.max(0,State.char.gold+delta);
  $('#gold-val').textContent=State.char.gold;
}
function applyItem(sign,name){
  const inv=State.char.inventory;
  if(sign==='+'){inv.push(name);renderInventory(name);}
  else{
    const i=inv.findIndex(x=>x.toLowerCase()===name.toLowerCase());
    if(i>=0)inv.splice(i,1);
    renderInventory(null);
  }
}
function renderSheet(){
  const c=State.char;
  $('#portrait-emblem').innerHTML=characterSVG(c.race.key,c.cls.key,104);
  $('#sheet-name').textContent=c.name;
  $('#sheet-class').textContent=c.race.name+' · '+c.cls.name;
  $('#hp-val').textContent=c.hp+' / '+c.hpMax;
  $('#hp-fill').style.width='100%';
  $('#gold-val').textContent=c.gold;
  const sg=$('#sheet-stats');sg.innerHTML='';
  ABILITIES.forEach(a=>{
    const v=c.scores[a.k];
    const d=document.createElement('div');d.className='stat';
    d.innerHTML='<div class="sn">'+a.k+'</div><div class="sv">'+v+'</div><div class="sm">'+modStr(mod(v))+'</div>';
    sg.appendChild(d);
  });
  renderInventory(null);
}
function renderInventory(fresh){
  const list=$('#inv-list');list.innerHTML='';
  if(State.char.inventory.length===0){
    list.innerHTML='<div class="inv-empty">Ranselmu kosong.</div>';return;
  }
  State.char.inventory.forEach(it=>{
    const d=document.createElement('div');d.className='inv-item'+(fresh&&it===fresh?' fresh':'');
    d.innerHTML='<span class="dot">◆</span>'+escapeHTML(it);
    list.appendChild(d);
    if(fresh&&it===fresh)setTimeout(()=>d.classList.remove('fresh'),2200);
  });
}

/* ============================================================
   DICE TRAY + ROLLING
============================================================ */
function buildTray(){
  const tray=$('#tray');
  // keep label, append dice
  [4,6,8,10,12,20,100].forEach(sides=>{
    const b=document.createElement('button');
    b.className='die-btn'+(sides===20?' d20':'');
    b.dataset.sides=sides;
    b.innerHTML='<span class="poly">'+diePoly(sides)+'</span><span>d'+sides+'</span>';
    b.onclick=()=>doRoll(sides);
    tray.appendChild(b);
  });
}
function setPendingRoll(p){
  State.pendingRoll=p;
  const rc=$('#roll-call'),txt=$('#rc-txt');
  const dcStr = p.dc?(' <span class="rc-dc">vs DC '+p.dc+'</span>'):'';
  const abStr = p.ability?(' ['+abFull(p.ability)+']'):'';
  txt.innerHTML='Sang Narator meminta pemeriksaan <b>'+escapeHTML(p.label)+'</b>'+abStr+' — lempar <b>d'+p.sides+'</b>'+dcStr;
  rc.classList.add('show');
  setComposerEnabled(false);
  // flag the matching die
  document.querySelectorAll('.die-btn').forEach(b=>b.classList.toggle('flagged', parseInt(b.dataset.sides,10)===p.sides));
}
function clearPendingRoll(){
  State.pendingRoll=null;
  $('#roll-call').classList.remove('show');
  document.querySelectorAll('.die-btn').forEach(b=>b.classList.remove('flagged'));
}
function abFull(k){const a=ABILITIES.find(x=>x.k===k);return a?a.full:k;}

function abilityForCheck(p){
  if(p.ability) return p.ability;
  // try infer from label
  const key=p.label.toLowerCase();
  for(const sk in SKILL_ABILITY){if(key.includes(sk))return SKILL_ABILITY[sk];}
  return null;
}

function doRoll(sides){
  const overlay=$('#dice-overlay');
  if(overlay.classList.contains('show')) return; // prevent double
  const pending = State.pendingRoll && State.pendingRoll.sides===sides ? State.pendingRoll : null;
  const raw = 1+Math.floor(Math.random()*sides);

  // build die graphic
  $('#die-svg').innerHTML = bigDieSVG();
  const ctxLine = pending
    ? 'Pemeriksaan '+pending.label + (pending.ability?' · '+abFull(pending.ability):'')
    : 'Lemparan d'+sides;
  $('#dice-ctx').textContent=ctxLine;
  $('#die-num').textContent='?';
  $('#result-line').textContent='';$('#result-line').className='result-line';
  $('#overlay-foot').innerHTML='';
  $('#burst').innerHTML='';
  const stage=$('#die-stage');
  stage.className='die-stage'+(reduceMotion?'':' spin');
  overlay.classList.add('show');
  Audio.diceRattle();

  // number cycling
  const dur=reduceMotion?250:1100;
  const start=performance.now();
  function cycle(now){
    const t=(now-start)/dur;
    if(t<1){
      $('#die-num').textContent=1+Math.floor(Math.random()*sides);
      requestAnimationFrame(cycle);
    }else{
      $('#die-num').textContent=raw;
      stage.classList.remove('spin');
      Audio.lock();
      finishRoll(sides,raw,pending,stage);
    }
  }
  requestAnimationFrame(cycle);
}

function finishRoll(sides,raw,pending,stage){
  const isD20=sides===20;
  const nat20=isD20&&raw===20;
  const nat1=isD20&&raw===1;
  let abil = pending?abilityForCheck(pending):null;
  let m = abil?mod(State.char.scores[abil]):0;
  let total = raw + (pending?m:0);

  // crit visuals/audio
  if(nat20){stage.classList.add('crit-up');Audio.critUp();burst('gold');}
  else if(nat1){stage.classList.add('crit-down');Audio.critDown();burst('blood');}

  // result line
  const rl=$('#result-line');
  let html='';
  if(pending){
    const mPart = abil?(' <span style="color:var(--arcane)">'+modStr(m)+' ('+abil+')</span> = <b>'+total+'</b>'):'';
    html='<span style="color:var(--gold-bright)">'+raw+'</span>'+mPart;
    if(pending.dc!=null){
      const success=total>=pending.dc;
      html+=' &nbsp;·&nbsp; ';
      if(nat20) html+='<span class="crit">SUKSES KRITIS!</span>';
      else if(nat1) html+='<span class="critno">GAGAL KRITIS!</span>';
      else html+= success?'<span class="ok">Berhasil</span>':'<span class="no">Gagal</span>';
    }else{
      if(nat20)html+=' &nbsp;·&nbsp; <span class="crit">SUKSES KRITIS!</span>';
      else if(nat1)html+=' &nbsp;·&nbsp; <span class="critno">GAGAL KRITIS!</span>';
    }
  }else{
    html='Hasil: <span style="color:var(--gold-bright);font-weight:700">'+raw+'</span>';
    if(nat20)html+=' &nbsp;·&nbsp; <span class="crit">SUKSES KRITIS!</span>';
    else if(nat1)html+=' &nbsp;·&nbsp; <span class="critno">GAGAL KRITIS!</span>';
  }
  rl.innerHTML=html;
  setTimeout(()=>rl.classList.add('show'),60);

  if(pending){
    // auto-report to DM after a beat
    const foot=$('#overlay-foot');
    foot.innerHTML='<span style="color:var(--gold-deep);font-family:Cinzel,serif;font-size:.8rem;letter-spacing:.1em">Sang Narator menanti hasil…</span>';
    const delay=nat20||nat1?2200:1500;
    setTimeout(()=>{
      closeOverlay();
      reportRollToDM(pending,raw,abil,m,total,nat20,nat1);
    }, reduceMotion?700:delay);
  }else{
    const foot=$('#overlay-foot');
    const btn=document.createElement('button');
    btn.className='ghost-btn';btn.textContent='Tutup';
    btn.onclick=()=>{Audio.click();closeOverlay();};
    foot.appendChild(btn);
  }
}

function reportRollToDM(pending,raw,abil,m,total,nat20,nat1){
  let outcome='';
  let noteOutcome='';
  if(pending.dc!=null){
    const ok=total>=pending.dc;
    if(nat20){outcome='SUKSES KRITIS';noteOutcome='<span class="crit">Sukses Kritis</span>';}
    else if(nat1){outcome='GAGAL KRITIS';noteOutcome='<span class="critno">Gagal Kritis</span>';}
    else{outcome=ok?'Berhasil':'Gagal';noteOutcome=ok?'<span class="ok">Berhasil</span>':'<span class="no">Gagal</span>';}
  }else{
    outcome = nat20?'SUKSES KRITIS':(nat1?'GAGAL KRITIS':'');
    noteOutcome = nat20?'<span class="crit">Sukses Kritis</span>':(nat1?'<span class="critno">Gagal Kritis</span>':'');
  }
  const abilStr = abil?(' '+modStr(m)+' ('+abil+')'):'';
  const dcStr = pending.dc!=null?(' vs DC '+pending.dc):'';
  // log note for the player
  const noteHtml = escapeHTML(pending.label)+': <b style="color:var(--gold-bright)">'+total+'</b>'+dcStr+(noteOutcome?(' — '+noteOutcome):'');
  renderRollNote(noteHtml);
  // message the DM sees
  const msg = '[Hasil pemeriksaan '+pending.label+': dadu '+raw+abilStr+' = total '+total+dcStr+(outcome?' — '+outcome:'')+']';
  clearPendingRoll();
  askDM(msg,'roll');
}

function renderRollNote(html){
  const log=$('#log');
  const el=document.createElement('div');
  el.className='roll-note';
  el.innerHTML='<span aria-hidden="true">⚄</span>'+html;
  log.appendChild(el);
  requestAnimationFrame(()=>{el.classList.add('in');log.scrollTop=log.scrollHeight;});
}

function closeOverlay(){$('#dice-overlay').classList.remove('show');}

function burst(kind){
  if(reduceMotion) return;
  const host=$('#burst');
  const col = kind==='gold'?'246,210,122':'191,70,70';
  for(let i=0;i<18;i++){
    const s=document.createElement('span');
    const ang=Math.random()*Math.PI*2, dist=60+Math.random()*120;
    const x=Math.cos(ang)*dist, y=Math.sin(ang)*dist;
    s.style.cssText='position:absolute;left:50%;top:50%;width:6px;height:6px;border-radius:50%;'+
      'background:rgba('+col+',.95);box-shadow:0 0 10px rgba('+col+',.9);'+
      'transform:translate(-50%,-50%);pointer-events:none;';
    host.appendChild(s);
    s.animate([
      {transform:'translate(-50%,-50%) translate(0,0) scale(1)',opacity:1},
      {transform:'translate(-50%,-50%) translate('+x+'px,'+y+'px) scale(0)',opacity:0}
    ],{duration:800+Math.random()*400,easing:'cubic-bezier(.15,.7,.3,1)'});
    setTimeout(()=>s.remove(),1300);
  }
}

/* ============================================================
   COMPOSER
============================================================ */
function setComposerEnabled(on){
  const ta=$('#action-input'),btn=$('#send-btn');
  ta.disabled=!on;btn.disabled=!on;
  if(on){ta.placeholder='Apa yang kamu lakukan…?';}
  else{ta.placeholder=State.pendingRoll?'Lempar dadu yang diminta untuk melanjutkan…':'Sang Narator sedang berbicara…';}
}
function submitAction(){
  const ta=$('#action-input');
  const v=ta.value.trim();
  if(!v||State.busy) return;
  if(State.pendingRoll){
    // gently remind to roll
    flashRollCall();
    return;
  }
  ta.value='';autosize(ta);
  Audio.click();
  askDM(v,'action');
}
function flashRollCall(){
  const rc=$('#roll-call');
  rc.animate([{transform:'scale(1)'},{transform:'scale(1.03)'},{transform:'scale(1)'}],{duration:400});
}
function autosize(ta){ta.style.height='auto';ta.style.height=Math.min(140,ta.scrollHeight)+'px';}

/* ============================================================
   WIRE UP
============================================================ */
function init(){
  buildCreate();

  $('#name-input').addEventListener('input',e=>{State.char.name=e.target.value;refreshBegin();updatePreview();});
  $('#roll-attr-btn').addEventListener('click',()=>{rollAttrAnim();});
  $('#begin-btn').addEventListener('click',()=>{beginAdventure();});

  const ta=$('#action-input');
  ta.addEventListener('input',()=>autosize(ta));
  ta.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();submitAction();}
  });
  $('#send-btn').addEventListener('click',submitAction);

  // ambient toggle
  $('#ambient-btn').addEventListener('click',async()=>{
    const btn=$('#ambient-btn');
    if(!State.audioReady){await Audio.ensure();State.audioReady=Audio.ok;}
    if(!Audio.ok) return;
    State.ambientOn=!State.ambientOn;
    btn.classList.toggle('on',State.ambientOn);
    if(State.ambientOn)Audio.startAmbient();else Audio.stopAmbient();
  });

  // sheet drawer (mobile)
  const sheet=$('#sheet'),scrim=$('#sheet-scrim');
  $('#sheet-toggle').addEventListener('click',()=>{
    Audio.click();
    sheet.classList.toggle('open');scrim.classList.toggle('show',sheet.classList.contains('open'));
  });
  scrim.addEventListener('click',()=>{sheet.classList.remove('open');scrim.classList.remove('show');});

  // close overlay on escape
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&$('#dice-overlay').classList.contains('show')&&!State.pendingRoll)closeOverlay();
  });
}
document.addEventListener('DOMContentLoaded',init);
