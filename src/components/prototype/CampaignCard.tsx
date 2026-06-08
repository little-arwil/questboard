import Link from "next/link";
import { CalendarDays, MapPin, ScrollText, Sparkles, UsersRound } from "lucide-react";
import type { Campaign } from "@/data/appMockData";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <article className="glass-panel flex h-full flex-col rounded-lg p-5 transition hover:-translate-y-1 hover:border-gold/35">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald">
            {campaign.system}
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-normal text-white">
            {campaign.title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-parchment/58">DM {campaign.dm}</p>
        </div>
        <div className="rounded-md border border-emerald/24 bg-emerald/12 px-3 py-2 text-center">
          <p className="text-[0.65rem] font-black uppercase text-emerald/78">Match</p>
          <p className="text-2xl font-black text-emerald">{campaign.matchScore}%</p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 leading-7 text-parchment/72">{campaign.description}</p>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2 text-parchment/72">
          <CalendarDays className="size-4 text-gold" aria-hidden="true" />
          <span>
            {campaign.day}, {campaign.time} {campaign.timezone}
          </span>
        </div>
        <div className="flex items-center gap-2 text-parchment/72">
          <MapPin className="size-4 text-violet" aria-hidden="true" />
          <span>{campaign.format}</span>
        </div>
        <div className="flex items-center gap-2 text-parchment/72">
          <UsersRound className="size-4 text-emerald" aria-hidden="true" />
          <span>{campaign.experience}</span>
        </div>
        <div className="flex items-center gap-2 text-parchment/72">
          <ScrollText className="size-4 text-ember" aria-hidden="true" />
          <span>{campaign.playstyle}</span>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {campaign.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-bold text-parchment/76"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
        <Link
          href={`/app/campaigns/${campaign.id}`}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-parchment/18 bg-white/7 px-4 text-sm font-black text-parchment transition hover:border-ember/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          View Details
        </Link>
        <Link
          href="/app/applications"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-md bg-ember px-4 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
        >
          Apply
        </Link>
      </div>
    </article>
  );
}

export function MatchReasons({ reasons }: { reasons: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {reasons.map((reason) => (
        <li
          key={reason}
          className="rounded-md border border-emerald/18 bg-emerald/8 px-4 py-3 text-sm font-bold text-parchment/82"
        >
          {reason}
        </li>
      ))}
    </ul>
  );
}

export function PlaystyleBars({ campaign }: { campaign: Campaign }) {
  return (
    <div className="space-y-4">
      {campaign.playstyleMix.map((item) => (
        <div key={item.label}>
          <div className="mb-2 flex items-center justify-between text-sm font-bold text-parchment/72">
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
