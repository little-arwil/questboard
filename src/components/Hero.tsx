import { ArrowRight, Compass } from "lucide-react";
import { HeroCampaignCard } from "@/components/HeroCampaignCard";
import { HeroCharacter } from "@/components/HeroCharacter";
import { TrackedLink } from "@/components/TrackedLink";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-charcoal">
      {/* ── Atmosphere: war-room background + cinematic lighting ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/hero/questboard-war-room.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_32%_56%,rgba(244,197,106,0.16),transparent_44%),linear-gradient(90deg,rgba(8,11,13,0.94)_0%,rgba(8,11,13,0.32)_24%,rgba(8,11,13,0.06)_44%,rgba(8,11,13,0.08)_64%,rgba(8,11,13,0.32)_78%,rgba(8,11,13,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,13,0.22)_0%,transparent_30%,#080b0d_100%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(8,11,13,0.52)]" />
      </div>

      {/* ── Campaign Architect character — large, centre-right ── */}
      <div className="absolute bottom-0 left-[52%] z-[1] hidden -translate-x-1/2 overflow-visible lg:block">
        <div className="flex h-[90vh] min-h-[660px] w-[46vw] min-w-[39rem] max-w-[49rem] items-end xl:w-[50vw] 2xl:max-w-[54rem]">
          <HeroCharacter />
        </div>
      </div>

      {/* ── Foreground content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-8">
        {/* Nav spacer */}
        <div className="h-20 lg:h-24" />

        {/* Main hero row */}
        <div className="relative flex flex-1 flex-col gap-10 lg:flex-row lg:gap-0">
          {/* Left column: headline + CTAs */}
          <div className="relative z-10 flex w-full max-w-xl flex-col justify-center pb-8 lg:w-[39%] lg:pb-0">
            <div className="animate-rise">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ember/24 bg-black/40 px-3.5 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.22em] text-ember/88 shadow-[0_0_28px_rgba(244,197,106,0.1)] backdrop-blur-xl">
                <Compass className="size-3" aria-hidden="true" />
                Matchmaking table RPG
              </div>

              <h1 className="font-display text-[clamp(1.85rem,3.45vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-white">
                <span className="block">Temukan table D&amp;D</span>
                <span className="block">yang cocok sebelum</span>
                <span className="block bg-gradient-to-r from-[#f7da8a] via-ember to-[#fdeab8] bg-clip-text text-transparent">
                  roll pertama.
                </span>
              </h1>

              <p className="mt-5 max-w-[40ch] text-sm leading-7 text-parchment/68 sm:text-base sm:leading-8">
                QuestBoard membantu player dan DM menemukan campaign yang pas berdasarkan gaya main, jadwal, pengalaman, dan ekspektasi party.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <TrackedLink
                  href="#join-beta"
                  eventName="join_beta_click"
                  eventProperties={{ location: "hero" }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-ember px-6 text-sm font-black text-charcoal shadow-[0_0_34px_rgba(244,197,106,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(244,197,106,0.32)] focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
                >
                  Mulai Quest
                </TrackedLink>
                <a
                  href="#campaign-filter"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-ember/28 bg-black/32 px-6 text-sm font-black text-parchment backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-ember/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
                >
                  Lihat Campaign
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Character for mobile (< lg) */}
          <div className="relative z-[1] mx-auto h-[30rem] w-full max-w-[20rem] lg:hidden">
            <HeroCharacter />
          </div>

          {/* Right column: campaign card */}
          <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-4 lg:ml-auto lg:w-auto lg:translate-x-8 lg:self-start lg:pt-[14vh] lg:items-end xl:translate-x-10">
            <HeroCampaignCard />
          </div>
        </div>
      </div>
    </section>
  );
}
