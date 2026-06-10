import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Compass,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { HeroCampaignCard } from "@/components/HeroCampaignCard";
import { HeroCharacter } from "@/components/HeroCharacter";
import { TrackedLink } from "@/components/TrackedLink";

const featureBadges = [
  {
    icon: ShieldCheck,
    title: "Aman & Terpercaya",
    body: "Verifikasi DM & player",
  },
  {
    icon: CalendarDays,
    title: "Filter Cerdas",
    body: "Cocokkan gaya & jadwal",
  },
  {
    icon: UsersRound,
    title: "Komunitas Sehat",
    body: "Rating & review nyata",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-charcoal">
      {/* ── Background image + dynamic lighting ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/hero/questboard-war-room.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_42%,rgba(139,92,246,0.1),transparent_42%),radial-gradient(ellipse_at_16%_54%,rgba(244,197,106,0.2),transparent_48%),linear-gradient(90deg,rgba(8,11,13,0.94)_0%,rgba(8,11,13,0.42)_20%,rgba(8,11,13,0.1)_38%,rgba(8,11,13,0.15)_54%,rgba(8,11,13,0.38)_74%,rgba(8,11,13,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,13,0.28)_0%,transparent_28%,#080b0d_100%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(8,11,13,0.64)]" />
      </div>

      {/* ── Character layer — dominant, full-height, non-interactive ── */}
      <div className="absolute inset-x-0 bottom-0 z-[1] hidden justify-center overflow-visible lg:flex">
        <div className="h-[92vh] min-h-[680px] w-auto 2xl:h-[95vh]">
          <HeroCharacter />
        </div>
      </div>

      {/* ── Foreground content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-8">
        {/* Nav spacer */}
        <div className="h-24 lg:h-28" />

        {/* Main hero row */}
        <div className="relative flex flex-1 flex-col gap-8 lg:flex-row lg:gap-0">
          {/* Left column: headline + CTAs */}
          <div className="relative z-10 flex w-full max-w-lg flex-col justify-end pb-6 sm:pb-10 lg:w-[34%] lg:pb-24">
            <div className="animate-rise">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ember/26 bg-black/40 px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.2em] text-ember/88 shadow-[0_0_34px_rgba(244,197,106,0.1)] backdrop-blur-xl">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Matchmaking table RPG
              </div>

              <h1 className="font-display text-[clamp(2.25rem,6.2vw,5.5rem)] font-semibold leading-[1.03] tracking-tight text-white">
                Temukan table D&amp;D yang cocok sebelum{" "}
                <span className="bg-gradient-to-r from-[#f7da8a] via-ember to-[#fdeab8] bg-clip-text text-transparent">
                  roll pertama.
                </span>
              </h1>

              <p className="mt-6 max-w-[38ch] text-base leading-7 text-parchment/72 sm:text-lg sm:leading-8">
                QuestBoard membantu player dan DM menemukan campaign yang pas berdasarkan gaya main, jadwal, pengalaman, dan ekspektasi party.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  href="#join-beta"
                  eventName="join_beta_click"
                  eventProperties={{ location: "hero" }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-ember px-6 text-sm font-black text-charcoal shadow-[0_0_38px_rgba(244,197,106,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(244,197,106,0.34)] focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
                >
                  <Compass className="size-4" aria-hidden="true" />
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

          <div className="relative z-[1] mx-auto h-[38rem] w-full max-w-[30rem] lg:hidden">
            <HeroCharacter />
          </div>

          {/* Center spacer — character lives here, in the z-1 layer below */}
          <div className="relative z-10 hidden flex-1 lg:block" />

          {/* Right column: campaign card + party widget */}
          <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-4 lg:w-auto lg:items-end lg:pb-24">
            <HeroCampaignCard />

            {/* Party availability widget */}
            <div className="w-full max-w-[22rem] rounded-2xl border border-white/12 bg-black/38 p-3.5 shadow-quest-card backdrop-blur-xl lg:max-w-[24rem] xl:max-w-[25rem]">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {["AR", "NA", "BI", "RA"].map((avatar) => (
                    <span
                      key={avatar}
                      className="grid size-9 place-items-center rounded-full border-[1.5px] border-[#1a1222] bg-gradient-to-br from-ember/85 to-violet/85 text-[0.65rem] font-black leading-none text-white shadow-[0_0_12px_rgba(139,92,246,0.18)]"
                    >
                      {avatar}
                    </span>
                  ))}
                  <span className="grid size-9 place-items-center rounded-full border-[1.5px] border-[#1a1222] bg-white/10 text-[0.68rem] font-black text-parchment">
                    +1
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-white">5/6 seats filled</p>
                  <p className="mt-0.5 text-xs text-parchment/52">Next session: Sab, 24 Mei • 19:00</p>
                </div>
                <CalendarDays className="size-4 shrink-0 text-ember/80" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature badges row */}
        <div className="relative z-10 grid gap-2.5 border-t border-white/10 pb-6 pt-5 sm:grid-cols-3">
          {featureBadges.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/28 px-3.5 py-2.5 backdrop-blur-xl"
              >
                <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-ember/24 bg-ember/10 text-ember">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black leading-tight text-white">{feature.title}</p>
                  <p className="mt-0.5 text-xs leading-tight text-parchment/52">{feature.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll cue */}
        <a
          href="#cara-kerja"
          className="relative z-10 mx-auto mb-6 hidden flex-col items-center gap-2 text-[0.6rem] font-black uppercase tracking-[0.3em] text-parchment/40 transition hover:text-ember lg:flex"
        >
          Scroll untuk menjelajahi
          <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
