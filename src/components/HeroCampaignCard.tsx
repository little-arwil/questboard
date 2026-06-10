import { ArrowRight, Compass, Map, ShieldCheck, Sparkles, UsersRound } from "lucide-react";

export function HeroCampaignCard() {
  return (
    <aside className="relative w-full max-w-[21rem] overflow-hidden rounded-[1.75rem] border border-ember/28 bg-[#0b0810]/58 p-4 shadow-[0_28px_100px_rgba(0,0,0,0.56),0_0_70px_rgba(139,92,246,0.13)] backdrop-blur-2xl lg:max-w-[23rem] xl:max-w-[24rem]">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.09),transparent_34%),radial-gradient(circle_at_18%_12%,rgba(244,197,106,0.15),transparent_36%),radial-gradient(circle_at_96%_86%,rgba(139,92,246,0.22),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-[10px] rounded-[1.45rem] border border-ember/14" />
      <div className="pointer-events-none absolute left-5 right-5 top-4 h-px bg-gradient-to-r from-transparent via-ember/48 to-transparent" />
      <div className="pointer-events-none absolute bottom-4 left-5 right-5 h-px bg-gradient-to-r from-transparent via-violet/32 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[0.66rem] font-black uppercase tracking-[0.32em] text-ember/68">
              Active Campaign
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-none tracking-tight text-white xl:text-[2.1rem]">
              Emberfall Expedition
            </h2>
          </div>
          <div className="grid size-14 shrink-0 place-items-center rounded-full border border-ember/34 bg-[radial-gradient(circle_at_50%_35%,rgba(244,197,106,0.36),rgba(36,19,10,0.72)_58%,rgba(12,8,16,0.92)_100%)] shadow-[0_0_34px_rgba(244,197,106,0.18)]">
            <Sparkles className="size-6 text-ember" aria-hidden="true" />
          </div>
        </div>

        <p className="mt-4 max-w-[22rem] text-sm leading-6 text-parchment/64">
          A perilous journey across ash and stone to reclaim the lost relic before the dusk spreads.
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3.5">
            <dt className="flex items-center gap-2 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-parchment/45">
              <Map className="size-3.5 text-ember/90" />
              Active Quests
            </dt>
            <dd className="mt-2 text-3xl font-black text-white">12</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3.5">
            <dt className="flex items-center gap-2 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-parchment/45">
              <UsersRound className="size-3.5 text-violet/90" />
              Party Members
            </dt>
            <dd className="mt-2 text-3xl font-black text-white">5</dd>
          </div>
        </dl>

        <div className="mt-3.5 rounded-2xl border border-white/10 bg-white/[0.045] p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-parchment/45">
              <Compass className="size-3.5 text-ember/90" />
              Progress
            </div>
            <span className="font-display text-lg font-semibold text-ember">68%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/46 ring-1 ring-white/8">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-gold via-ember to-[#b78cff] shadow-[0_0_16px_rgba(244,197,106,0.38)]" />
          </div>
        </div>

        <div className="mt-3.5 rounded-2xl border border-ember/16 bg-gradient-to-r from-ember/[0.08] to-violet/[0.07] p-3.5">
          <p className="flex items-center gap-2 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-ember/64">
            <ShieldCheck className="size-3.5" />
            Featured Quest
          </p>
          <p className="mt-1.5 text-sm font-black text-white">Recover the Sun Relic</p>
        </div>

        <a
          href="#campaign-filter"
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-2xl border border-violet/28 bg-gradient-to-r from-violet/[0.14] via-ember/[0.08] to-violet/[0.12] px-5 text-sm font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-violet/50 hover:shadow-[0_0_34px_rgba(139,92,246,0.2)] focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-charcoal"
        >
          View Campaign
          <ArrowRight className="size-4 text-ember/90" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
