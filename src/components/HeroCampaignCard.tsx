export function HeroCampaignCard() {
  return (
    <aside
      className="relative w-full max-w-[340px] overflow-hidden rounded-[12px] border border-gold/35 bg-[rgba(12,8,6,0.88)] p-6 shadow-[0_0_30px_rgba(201,168,76,0.15),0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-[16px]"
    >
      {/* ── Card Header ── */}
      <div className="mb-4 flex items-center gap-[14px]">
        {/* Campaign thumbnail */}
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gold-dim bg-[linear-gradient(135deg,#2a1a08,#1a0e2e)]">
          <svg width="36" height="36" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" fill="#1a0e06" />
            <path d="M15 45 L30 20 L45 45 Z" fill="#3d1a08" />
            <path d="M22 45 L30 28 L38 45 Z" fill="#5c2a0a" />
            <path d="M27 22 Q30 14 33 22 Q30 20 27 22Z" fill="#ff6b1a" opacity=".9" />
            <ellipse cx="30" cy="21" rx="4" ry="3" fill="#ff8c3a" opacity=".7" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="font-display text-xl font-semibold text-[#F0EAD6]">Emberfall Expedition</h2>
          <div className="mt-[10px] h-px bg-gold/35" />
        </div>
        <div className="flex gap-[6px] self-start">
          <div className="flex size-6 items-center justify-center rounded-full bg-[#6B3FA0]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="4" /></svg>
          </div>
          <div className="flex size-6 items-center justify-center rounded-full border border-gold bg-gold-dim">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><path d="M12 2l2 7h7l-6 4 2 7-5-4-5 4 2-7-6-4h7z" /></svg>
          </div>
        </div>
      </div>

      <p className="mb-4 text-xs leading-[1.6] text-text-muted">
        A perilous journey across ash and stone to reclaim the lost relic before the dusk spreads.
      </p>

      {/* ── Stats Grid ── */}
      <div className="mb-[14px] grid grid-cols-2 gap-[10px]">
        <div className="flex items-center gap-2 rounded-[8px] border border-gold/12 bg-white/[0.04] p-[10px_12px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="shrink-0">
            <circle cx="12" cy="12" r="9" /><path d="M12 3 L12 12 L16 8" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
          <div>
            <span className="block text-[0.68rem] text-text-muted">Active Quests</span>
            <span className="text-lg font-semibold leading-none text-[#F0EAD6]">12</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-[8px] border border-gold/12 bg-white/[0.04] p-[10px_12px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="shrink-0">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <div>
            <span className="block text-[0.68rem] text-text-muted">Party Members</span>
            <span className="text-lg font-semibold leading-none text-[#F0EAD6]">5</span>
          </div>
        </div>
      </div>

      {/* ── Progress ── */}
      <div className="mb-[10px] flex items-center gap-[10px] rounded-[8px] border border-gold/12 bg-white/[0.04] p-[10px_12px]">
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" className="shrink-0">
          <circle cx="20" cy="20" r="16" stroke="#C9A84C" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="10" stroke="#7A6030" strokeWidth="1" strokeDasharray="2 3" />
          <polygon points="20,6 21,17 20,20 19,17" fill="#C9A84C" />
          <polygon points="20,34 21,23 20,20 19,23" fill="#7A6030" />
          <polygon points="6,20 17,19 20,20 17,21" fill="#C9A84C" />
          <polygon points="34,20 23,19 20,20 23,21" fill="#7A6030" />
        </svg>
        <div className="flex-1">
          <div className="mb-[6px] flex items-center justify-between">
            <span className="text-[0.68rem] text-text-muted">Progress</span>
            <span className="text-lg font-semibold text-[#F0EAD6]">68%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-[2px] bg-white/10">
            <div className="h-full w-[68%] rounded-[2px] bg-gradient-to-r from-gold-dim to-gold" />
          </div>
        </div>
      </div>

      {/* ── Featured Quest ── */}
      <div className="mb-[14px] flex items-center gap-[10px] rounded-[8px] border border-gold/12 bg-white/[0.04] p-[10px_12px]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="shrink-0">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <div>
          <span className="block text-[0.68rem] text-text-muted">Featured Quest</span>
          <span className="text-sm font-medium text-[#F0EAD6]">Recover the Sun Relic</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" className="ml-auto">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>

      {/* ── View Campaign Button ── */}
      <a
        href="#campaign-filter"
        className="flex w-full items-center justify-center gap-[8px] rounded-[8px] bg-[#5B21B6] px-[14px] py-[14px] text-sm font-semibold text-white no-underline transition hover:bg-[#6D28D9]"
      >
        View Campaign
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>

      {/* ── Party Footer ── */}
      <div className="mt-[14px] flex items-center gap-[10px] border-t border-gold/35 pt-[12px]">
        <div className="flex">
          <div className="flex size-7 items-center justify-center overflow-hidden rounded-full border-2 border-[#0A0806] bg-[#3d1a2e] -ml-[0px]">👤</div>
          <div className="flex size-7 items-center justify-center overflow-hidden rounded-full border-2 border-[#0A0806] bg-[#1a2a3d] -ml-2">👤</div>
          <div className="flex size-7 items-center justify-center overflow-hidden rounded-full border-2 border-[#0A0806] bg-[#2a3d1a] -ml-2">👤</div>
          <div className="flex size-7 items-center justify-center overflow-hidden rounded-full border-2 border-[#0A0806] bg-[#3d2a1a] -ml-2">👤</div>
          <div className="flex size-7 items-center justify-center overflow-hidden rounded-full border-2 border-[#0A0806] bg-[#6B3FA0]/60 text-[0.65rem] font-semibold text-white -ml-2">+1</div>
        </div>
        <div>
          <span className="block text-sm font-medium text-[#F0EAD6]">5/6 seats filled</span>
          <span className="block text-[0.7rem] text-text-muted">Next session: Sab, 24 Mei · 19:00</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6030" strokeWidth="1.5" className="ml-auto">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
    </aside>
  );
}
