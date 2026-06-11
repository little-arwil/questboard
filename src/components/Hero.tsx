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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_32%_56%,rgba(244,197,106,0.14),transparent_46%),linear-gradient(90deg,rgba(8,11,13,0.96)_0%,rgba(8,11,13,0.34)_22%,rgba(8,11,13,0.08)_46%,rgba(8,11,13,0.06)_68%,rgba(8,11,13,0.48)_82%,rgba(8,11,13,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,13,0.20)_0%,transparent_32%,#080b0d_100%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(8,11,13,0.48)]" />
      </div>

      {/* ── Desktop: Campaign Architect character — zooms centre ── */}
      <div className="absolute inset-0 z-[1] hidden items-start justify-center overflow-hidden lg:flex">
        <div className="flex h-[140vh] min-h-[1000px] w-[93vh] min-w-[44rem] max-w-[65rem]">
          <HeroCharacter />
        </div>
      </div>

      {/* ── Desktop: Headline far left ── */}
      <div className="absolute left-[4%] top-[30%] z-10 hidden max-w-lg lg:block xl:left-[5%] 2xl:left-[6%]">
        <div className="animate-rise">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ember/24 bg-black/40 px-3.5 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.24em] text-ember/88 shadow-[0_0_28px_rgba(244,197,106,0.1)] backdrop-blur-xl">
            <Compass className="size-3" aria-hidden="true" />
            Matchmaking table RPG
          </div>

          <h1 className="font-display text-[clamp(1.7rem,3.2vw,3rem)] font-semibold leading-[1.1] tracking-tight text-white">
            <span className="block">Temukan table D&amp;D</span>
            <span className="block">yang cocok sebelum</span>
            <span className="block bg-gradient-to-r from-[#f7da8a] via-ember to-[#fdeab8] bg-clip-text text-transparent">
              roll pertama.
            </span>
          </h1>

          <p className="mt-5 max-w-[40ch] text-sm leading-7 text-parchment/66 sm:text-base sm:leading-8">
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

      {/* ── Desktop: Campaign card far right ── */}
      <div className="absolute right-[4%] top-[20%] z-10 hidden lg:block xl:right-[5%] 2xl:right-[6%]">
        <HeroCampaignCard />
      </div>

      {/* ── Mobile content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen flex-col px-6 pt-20 lg:hidden">
        <div className="mx-auto h-[30rem] w-full max-w-[20rem]">
          <HeroCharacter />
        </div>
        <div className="mt-6 flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ember/24 bg-black/40 px-3 py-1 text-[0.55rem] font-black uppercase tracking-[0.22em] text-ember/88 shadow-[0_0_28px_rgba(244,197,106,0.1)] backdrop-blur-xl">
            <Compass className="size-2.5" aria-hidden="true" />
            Matchmaking table RPG
          </div>
          <h1 className="font-display text-[clamp(1.6rem,5vw,2.4rem)] font-semibold leading-[1.1] tracking-tight text-white">
            <span className="block">Temukan table D&amp;D</span>
            <span className="block">yang cocok sebelum</span>
            <span className="block bg-gradient-to-r from-[#f7da8a] via-ember to-[#fdeab8] bg-clip-text text-transparent">
              roll pertama.
            </span>
          </h1>
          <p className="mt-4 max-w-[40ch] text-sm leading-7 text-parchment/66">
            QuestBoard membantu player dan DM menemukan campaign yang pas berdasarkan gaya main, jadwal, pengalaman, dan ekspektasi party.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              href="#join-beta"
              eventName="join_beta_click"
              eventProperties={{ location: "hero" }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-ember px-6 text-sm font-black text-charcoal shadow-[0_0_34px_rgba(244,197,106,0.24)]"
            >
              Mulai Quest
            </TrackedLink>
            <a
              href="#campaign-filter"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-ember/28 bg-black/32 px-6 text-sm font-black text-parchment backdrop-blur-xl"
            >
              Lihat Campaign
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="pb-12">
          <HeroCampaignCard />
        </div>
      </div>
    </section>
  );
}
