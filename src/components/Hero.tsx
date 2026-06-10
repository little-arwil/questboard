import { ArrowRight, Compass, LayoutDashboard } from "lucide-react";
import { HeroCampaignCard } from "@/components/HeroCampaignCard";
import { HeroCharacter } from "@/components/HeroCharacter";
import { TrackedLink } from "@/components/TrackedLink";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-charcoal">
      {/* ── Atmosphere: war-room background + cinematic lighting ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/hero/questboard-war-room.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_58%_42%,rgba(139,92,246,0.1),transparent_44%),radial-gradient(ellipse_at_18%_54%,rgba(244,197,106,0.17),transparent_46%),linear-gradient(90deg,rgba(8,11,13,0.92)_0%,rgba(8,11,13,0.34)_20%,rgba(8,11,13,0.08)_40%,rgba(8,11,13,0.12)_60%,rgba(8,11,13,0.34)_76%,rgba(8,11,13,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,13,0.20)_0%,transparent_28%,#080b0d_100%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(8,11,13,0.56)]" />
      </div>

      {/* ── Campaign Architect character — dominant, centre-right ── */}
      <div className="absolute inset-x-0 bottom-0 z-[1] hidden justify-center overflow-visible lg:flex">
        <div className="flex h-[85vh] min-h-[620px] w-full max-w-[40rem] items-end 2xl:h-[88vh] 2xl:max-w-[46rem]">
          <HeroCharacter />
        </div>
      </div>

      {/* ── Foreground content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-8">
        {/* Nav spacer */}
        <div className="h-20 lg:h-24" />

        {/* Main hero row */}
        <div className="relative flex flex-1 flex-col gap-12 lg:flex-row lg:gap-0">
          {/* Left column: headline + CTAs */}
          <div className="relative z-10 flex w-full max-w-lg flex-col justify-center pb-8 lg:w-[38%] lg:pb-0">
            <div className="animate-rise">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ember/24 bg-black/40 px-3.5 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.22em] text-ember/88 shadow-[0_0_28px_rgba(244,197,106,0.1)] backdrop-blur-xl">
                <Compass className="size-3" aria-hidden="true" />
                Matchmaking table RPG
              </div>

              <h1 className="font-display text-[clamp(2.2rem,4.2vw,4rem)] font-semibold leading-[1.08] tracking-tight text-white">
                <span className="block">Temukan table D&amp;D</span>
                <span className="block">yang cocok sebelum</span>
                <span className="block bg-gradient-to-r from-[#f7da8a] via-ember to-[#fdeab8] bg-clip-text text-transparent">
                  roll pertama.
                </span>
              </h1>

              <p className="mt-5 max-w-[40ch] text-sm leading-7 text-parchment/70 sm:text-base sm:leading-8">
                QuestBoard membantu player dan DM menemukan campaign yang pas berdasarkan gaya main, jadwal, pengalaman, dan ekspektasi party.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  href="#join-beta"
                  eventName="join_beta_click"
                  eventProperties={{ location: "hero" }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-ember px-6 text-sm font-black text-charcoal shadow-[0_0_34px_rgba(244,197,106,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(244,197,106,0.32)] focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
                >
                  Mulai Quest
                </TrackedLink>
                <a
                  href="#campaign-filter"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-ember/28 bg-black/32 px-6 text-sm font-black text-parchment backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-ember/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
                >
                  Lihat Campaign
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="/app"
                  aria-label="Coba clickable prototype QuestBoard"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-violet/28 bg-violet/10 px-6 text-sm font-black text-parchment backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-violet/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-charcoal"
                >
                  <LayoutDashboard className="size-4 text-violet/90" aria-hidden="true" />
                  Coba Prototype
                </a>
              </div>
            </div>
          </div>

          {/* Character for mobile (< lg) */}
          <div className="relative z-[1] mx-auto h-[32rem] w-full max-w-[22rem] lg:hidden">
            <HeroCharacter />
          </div>

          {/* Right column: campaign card + party widget */}
          <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-4 lg:ml-auto lg:w-auto lg:items-end lg:self-center lg:pb-4">
            <HeroCampaignCard />
          </div>
        </div>

        {/* Subtle scroll cue */}
        <div className="relative z-10 mt-auto mb-6 hidden justify-center lg:flex">
          <a
            href="#cara-kerja"
            className="flex flex-col items-center gap-1.5 text-[0.55rem] font-black uppercase tracking-[0.3em] text-parchment/35 transition hover:text-ember"
          >
            <span>Scroll untuk menjelajahi</span>
            <svg className="h-4 w-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
