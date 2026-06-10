import { ArrowDown, LayoutDashboard, MessageCircle, Sparkles } from "lucide-react";
import { LottieLogo } from "@/components/LottieLogo";
import { TrackedLink } from "@/components/TrackedLink";
import { DragonHeroSlot } from "@/components/DragonHeroSlot";
import { HeroCharacter } from "@/components/HeroCharacter";
import { heroCampaign } from "@/data/mockData";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 3D Canvas — full viewport layer (desktop only) */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <DragonHeroSlot />
      </div>

      {/* Background overlays for readability */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-charcoal/95 via-charcoal/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_20%,rgba(8,11,13,0.45)_75%,#080b0d_100%)]" />

      {/* Content overlay */}
      <div className="relative z-20 quest-container flex min-h-screen flex-col justify-center pt-24 pb-20">
        <div className="max-w-2xl animate-rise">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-gold/35 bg-charcoal/55 shadow-gold-glow backdrop-blur sm:size-20">
              <LottieLogo
                className="size-14 sm:size-[4.5rem]"
                ariaLabel="QuestBoard fantasy quest board logo"
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-2 text-xs font-semibold text-emerald sm:px-4 sm:text-sm">
              <Sparkles className="size-4" aria-hidden="true" />
              Matchmaking untuk table RPG yang lebih rapi
            </div>
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-[1.06] tracking-normal text-white sm:text-6xl sm:leading-[1.02] lg:text-7xl">
            Temukan table D&amp;D yang cocok sebelum roll pertama.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-parchment/82 sm:mt-6 sm:text-xl sm:leading-8">
            QuestBoard membantu player dan DM match berdasarkan jadwal, gaya main,
            pengalaman, bahasa, dan ekspektasi campaign.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="#join-beta"
              eventName="join_beta_click"
              eventProperties={{ location: "hero" }}
              className="inline-flex h-11 items-center justify-center rounded-md bg-ember px-6 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal sm:h-12"
            >
              Join Beta
            </TrackedLink>
            <a
              href="/app"
              aria-label="Coba clickable prototype QuestBoard"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald px-6 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-emerald/90 focus:outline-none focus:ring-2 focus:ring-emerald focus:ring-offset-2 focus:ring-offset-charcoal sm:h-12"
            >
              <LayoutDashboard className="size-4" aria-hidden="true" />
              Coba Prototype Clickable
            </a>
            <a
              href="/feedback"
              aria-label="Beri feedback komunitas untuk QuestBoard"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-violet/34 bg-violet/10 px-6 text-sm font-black text-parchment transition hover:-translate-y-0.5 hover:border-violet/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-charcoal sm:h-12"
            >
              <MessageCircle className="size-4 text-violet" aria-hidden="true" />
              Beri Feedback
            </a>
            <TrackedLink
              href="#cara-kerja"
              eventName="hero_secondary_cta_click"
              eventProperties={{ location: "hero" }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-parchment/24 bg-white/7 px-6 text-sm font-bold text-parchment transition hover:-translate-y-0.5 hover:border-ember/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal sm:h-12"
            >
              <ArrowDown className="size-4" aria-hidden="true" />
              Lihat Cara Match
            </TrackedLink>
          </div>
        </div>

        {/* Mobile: 2D character fallback */}
        <div className="mt-10 lg:hidden">
          <HeroCharacter />
        </div>

        {/* Campaign card — subtle floating overlay on desktop, inline on mobile */}
        <div className="relative mt-6 w-full max-w-xs lg:absolute lg:bottom-20 lg:left-8 lg:z-30 lg:mt-0 lg:max-w-[13rem]">
          <div className="glass-panel rounded-lg p-2 opacity-80 shadow-quest-card sm:p-2.5 lg:opacity-70 lg:p-2">
            <div className="parchment-panel rounded-md p-3 shadow-gold-glow sm:p-4 lg:p-2">
              <div className="flex items-start justify-between gap-3 lg:gap-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-stone-700">
                    Campaign
                  </p>
                  <h2 className="mt-1 text-lg font-black tracking-normal text-stone-950 sm:text-xl lg:text-sm">
                    {heroCampaign.campaign}
                  </h2>
                </div>
                <div className="shrink-0 rounded-md bg-charcoal px-2.5 py-1.5 text-center text-white lg:px-2 lg:py-1">
                  <p className="text-[0.6rem] font-bold uppercase text-parchment/64">
                    Match
                  </p>
                  <p className="text-base font-black text-emerald lg:text-sm">
                    {heroCampaign.matchScore}
                  </p>
                </div>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-1.5 text-xs lg:hidden">
                <div className="rounded-md bg-white/55 p-2">
                  <dt className="font-bold text-stone-500">Schedule</dt>
                  <dd className="mt-0.5 font-black text-stone-950">
                    {heroCampaign.schedule}
                  </dd>
                </div>
                <div className="rounded-md bg-white/55 p-2">
                  <dt className="font-bold text-stone-500">Format</dt>
                  <dd className="mt-0.5 font-black text-stone-950">
                    {heroCampaign.format}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
