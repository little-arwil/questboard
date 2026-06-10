import Image from "next/image";
import { ArrowDown, LayoutDashboard, MessageCircle, Sparkles } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { DragonHeroSlot } from "@/components/DragonHeroSlot";
import { heroCampaign } from "@/data/mockData";

export function Hero() {
  return (
    <section className="relative min-h-[86vh] overflow-hidden pt-16">
      <Image
        src="/questboard-hero.png"
        alt="Ilustrasi original papan quest fantasy di tavern gelap"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-66"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/30" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,13,0.18)_0%,rgba(8,11,13,0.25)_62%,#080b0d_100%)]" />

      <div className="quest-container relative z-10 grid min-h-[calc(86vh-4rem)] items-center gap-8 py-10 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(560px,0.95fr)] xl:grid-cols-[minmax(0,0.9fr)_minmax(640px,1fr)]">
        <div className="max-w-3xl animate-rise">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-2 text-xs font-semibold text-emerald sm:mb-6 sm:px-4 sm:text-sm">
            <Sparkles className="size-4" aria-hidden="true" />
            Matchmaking untuk table RPG yang lebih rapi
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

        <div className="relative mx-auto w-full max-w-[700px] lg:ml-auto lg:h-[620px]">
          <DragonHeroSlot />

          <div className="relative z-20 mx-auto mt-4 w-full max-w-xs lg:absolute lg:left-0 lg:top-1/2 lg:mx-0 lg:mt-0 lg:max-w-[13.5rem] lg:-translate-y-1/2 xl:left-2 xl:max-w-[14rem]">
            <div className="glass-panel rounded-lg p-2 opacity-85 shadow-quest-card sm:p-2.5 lg:opacity-80">
              <div className="parchment-panel rounded-md p-3 shadow-gold-glow sm:p-4 lg:p-3">
                <div className="flex items-start justify-between gap-4 lg:gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-stone-700">
                      Campaign
                    </p>
                    <h2 className="mt-2 text-xl font-black tracking-normal text-stone-950 sm:text-2xl lg:text-xl">
                      {heroCampaign.campaign}
                    </h2>
                  </div>
                  <div className="rounded-md bg-charcoal px-3 py-2 text-center text-white lg:px-2.5 lg:py-1.5">
                    <p className="text-[0.65rem] font-bold uppercase text-parchment/64">
                      Match
                    </p>
                    <p className="text-xl font-black text-emerald sm:text-2xl lg:text-xl">{heroCampaign.matchScore}</p>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-2 text-xs sm:mt-6 sm:gap-3 sm:text-sm lg:hidden">
                  <div className="rounded-md bg-white/55 p-2.5 sm:p-3">
                    <dt className="font-bold text-stone-500">Schedule</dt>
                    <dd className="mt-1 font-black text-stone-950">{heroCampaign.schedule}</dd>
                  </div>
                  <div className="rounded-md bg-white/55 p-2.5 sm:p-3">
                    <dt className="font-bold text-stone-500">Format</dt>
                    <dd className="mt-1 font-black text-stone-950">{heroCampaign.format}</dd>
                  </div>
                  <div className="col-span-2 rounded-md bg-white/55 p-2.5 sm:p-3">
                    <dt className="font-bold text-stone-500">Tools</dt>
                    <dd className="mt-1 font-black text-stone-950">{heroCampaign.tools}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 lg:hidden">
                  {heroCampaign.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone-900/10 bg-stone-950/8 px-2.5 py-1 text-[0.68rem] font-bold text-stone-800 sm:px-3 sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
