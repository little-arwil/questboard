import { ArrowRight, CalendarDays, Map, ScrollText, Users } from "lucide-react";

function Crest() {
  return (
    <div className="absolute -top-9 left-1/2 z-10 -translate-x-1/2">
      <div className="relative flex size-[72px] items-center justify-center rounded-full border border-[rgba(218,171,91,0.5)] bg-[radial-gradient(circle_at_38%_30%,#241430_0%,#0c0812_70%)] shadow-[0_0_28px_rgba(124,58,237,0.28),inset_0_0_18px_rgba(218,171,91,0.1)]">
        <div className="absolute inset-[5px] rounded-full border border-[rgba(218,171,91,0.22)]" />
        <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="27" fill="#120a06" />
          <path d="M15 45 L30 20 L45 45 Z" fill="#3d1a08" />
          <path d="M22 45 L30 28 L38 45 Z" fill="#5c2a0a" />
          <path d="M27 22 Q30 14 33 22 Q30 20 27 22Z" fill="#ff6b1a" opacity=".9" />
          <ellipse cx="30" cy="21" rx="4" ry="3" fill="#ff8c3a" opacity=".7" />
        </svg>
        <span className="absolute -top-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#f4c76b] shadow-[0_0_10px_rgba(244,199,107,0.9)]" />
      </div>
    </div>
  );
}

function CornerAccents() {
  const base = "pointer-events-none absolute size-5 border-[rgba(218,171,91,0.55)]";
  return (
    <>
      <span className={`${base} left-3 top-3 rounded-tl-[10px] border-l border-t`} aria-hidden="true" />
      <span className={`${base} right-3 top-3 rounded-tr-[10px] border-r border-t`} aria-hidden="true" />
      <span className={`${base} bottom-3 left-3 rounded-bl-[10px] border-b border-l`} aria-hidden="true" />
      <span className={`${base} bottom-3 right-3 rounded-br-[10px] border-b border-r`} aria-hidden="true" />
    </>
  );
}

export function HeroCampaignCard() {
  return (
    <div className="hero-card-float relative w-full motion-reduce:animate-none">
      {/* ── Main quest panel ── */}
      <aside className="relative w-full rounded-[24px] border border-[rgba(218,171,91,0.45)] bg-[rgba(8,10,18,0.72)] px-6 pb-6 pt-12 shadow-[0_0_40px_rgba(139,92,246,0.16),inset_0_0_30px_rgba(218,171,91,0.06)] backdrop-blur-[18px]">
        <Crest />
        <CornerAccents />

        {/* warm gold inner highlight */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(244,199,107,0.55)] to-transparent" aria-hidden="true" />

        {/* ── Header ── */}
        <div className="text-center">
          <h2 className="font-display text-[1.55rem] font-bold leading-tight tracking-wide text-[#F0EAD6]">
            Emberfall Expedition
          </h2>
          <div className="mx-auto mt-3 flex w-[78%] items-center gap-2" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(218,171,91,0.5)]" />
            <span className="size-1 rotate-45 bg-[#d8a84f]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(218,171,91,0.5)]" />
          </div>
          <p className="mx-auto mt-3 max-w-[34ch] text-xs leading-[1.7] text-[#9B8E78]">
            A perilous journey across ash and stone to reclaim the lost relic before the dusk spreads.
          </p>
        </div>

        {/* ── Stats row ── */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-[12px] border border-[rgba(218,171,91,0.18)] bg-[rgba(255,255,255,0.035)] px-3.5 py-3">
            <Map className="size-5 shrink-0 text-[#d8a84f]" aria-hidden="true" />
            <div>
              <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-[#9B8E78]">Active Quests</span>
              <span className="text-xl font-semibold leading-tight text-[#F0EAD6]">12</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[12px] border border-[rgba(218,171,91,0.18)] bg-[rgba(255,255,255,0.035)] px-3.5 py-3">
            <Users className="size-5 shrink-0 text-[#d8a84f]" aria-hidden="true" />
            <div>
              <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-[#9B8E78]">Party Members</span>
              <span className="text-xl font-semibold leading-tight text-[#F0EAD6]">5</span>
            </div>
          </div>
        </div>

        {/* ── Progress ── */}
        <div className="mt-3 rounded-[12px] border border-[rgba(218,171,91,0.18)] bg-[rgba(255,255,255,0.035)] px-3.5 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[0.62rem] uppercase tracking-[0.14em] text-[#9B8E78]">Progress</span>
            <span className="text-lg font-semibold text-[#f4c76b]">68%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-black/45">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#7A6030] via-[#d8a84f] to-[#f4c76b] shadow-[0_0_12px_rgba(244,199,107,0.45)]" />
          </div>
        </div>

        {/* ── Featured quest row ── */}
        <a
          href="#campaign-filter"
          className="group mt-3 flex items-center gap-3 rounded-[12px] border border-[rgba(218,171,91,0.18)] bg-[rgba(255,255,255,0.035)] px-3.5 py-3 no-underline transition hover:border-[rgba(218,171,91,0.45)] hover:bg-[rgba(218,171,91,0.06)]"
        >
          <ScrollText className="size-5 shrink-0 text-[#d8a84f]" aria-hidden="true" />
          <div>
            <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-[#9B8E78]">Featured Quest</span>
            <span className="text-sm font-medium text-[#F0EAD6]">Recover the Sun Relic</span>
          </div>
          <ArrowRight className="ml-auto size-4 text-[#d8a84f] transition group-hover:translate-x-0.5" aria-hidden="true" />
        </a>

        {/* ── CTA ── */}
        <a
          href="#campaign-filter"
          className="hero-card-cta mt-4 flex w-full items-center justify-center gap-2 rounded-[12px] border border-[rgba(218,171,91,0.4)] bg-gradient-to-r from-[#4c1d95]/85 via-[#5b21b6]/80 to-[#4c1d95]/85 px-4 py-3.5 text-sm font-semibold tracking-wide text-[#f5efdf] no-underline shadow-[0_0_18px_rgba(124,58,237,0.22)] transition hover:-translate-y-px hover:border-[rgba(244,199,107,0.65)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] motion-reduce:animate-none"
        >
          View Campaign
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </aside>

      {/* ── Bottom party strip ── */}
      <div className="mx-auto mt-3 flex w-[92%] items-center gap-3 rounded-[16px] border border-[rgba(218,171,91,0.28)] bg-[rgba(8,10,18,0.7)] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-[14px]">
        <div className="flex shrink-0">
          <span className="flex size-7 items-center justify-center rounded-full border-2 border-[#080a12] bg-[#3d1a2e] text-[0.6rem]">👤</span>
          <span className="-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-[#080a12] bg-[#1a2a3d] text-[0.6rem]">👤</span>
          <span className="-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-[#080a12] bg-[#2a3d1a] text-[0.6rem]">👤</span>
          <span className="-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-[#080a12] bg-[#3d2a1a] text-[0.6rem]">👤</span>
          <span className="-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-[#080a12] bg-[#7c3aed]/70 text-[0.62rem] font-semibold text-white">+1</span>
        </div>
        <div className="min-w-0">
          <span className="block truncate text-sm font-medium text-[#F0EAD6]">5/6 seats filled</span>
          <span className="block truncate text-[0.7rem] text-[#9B8E78]">Next session: Sab, 24 Mei · 19:00</span>
        </div>
        <CalendarDays className="ml-auto size-4 shrink-0 text-[#7A6030]" aria-hidden="true" />
      </div>
    </div>
  );
}
