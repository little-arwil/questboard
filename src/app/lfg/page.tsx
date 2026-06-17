"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Filter, Search, ShieldCheck, Sparkles, Star, UsersRound, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CampaignCard } from "@/components/prototype/CampaignCard";
import { appFilters, campaigns } from "@/data/appMockData";
import type { Campaign } from "@/data/appMockData";
import { getPlaystyleFocusOption } from "@/lib/playstyleFocus";

function filterKey(label: string) {
  return label.toLowerCase();
}

function matchScore(campaign: Campaign, filters: Record<string, string>, preferredFocus: number, query: string) {
  let score = 54;

  if (filters.hari && filters.hari !== "Any" && campaign.day === filters.hari) score += 10;
  if (filters.bahasa && filters.bahasa !== "Any" && campaign.language === filters.bahasa) score += 8;
  if (filters.experience && filters.experience !== "Any" && campaign.experience === filters.experience) score += 8;
  if (filters.format && filters.format !== "Any" && campaign.format === filters.format) score += 7;
  if (filters.system && filters.system !== "Any" && campaign.system === filters.system) score += 9;

  const focusDiff = Math.abs(campaign.playstyleFocus - preferredFocus);
  score += focusDiff === 0 ? 14 : focusDiff <= 1 ? 11 : focusDiff <= 2 ? 7 : focusDiff <= 3 ? 3 : 0;

  if (query.trim()) {
    const text = `${campaign.title} ${campaign.dm} ${campaign.system} ${campaign.tags.join(" ")} ${campaign.tone}`.toLowerCase();
    if (text.includes(query.trim().toLowerCase())) score += 6;
  }

  return Math.min(99, score);
}

function passesFilters(campaign: Campaign, filters: Record<string, string>, query: string) {
  if (filters.hari && filters.hari !== "Any" && campaign.day !== filters.hari) return false;
  if (filters.bahasa && filters.bahasa !== "Any" && campaign.language !== filters.bahasa) return false;
  if (filters.experience && filters.experience !== "Any" && campaign.experience !== filters.experience) return false;
  if (filters.format && filters.format !== "Any" && campaign.format !== filters.format) return false;
  if (filters.system && filters.system !== "Any" && campaign.system !== filters.system) return false;

  if (filters.playstyle && filters.playstyle !== "Any") {
    if (filters.playstyle.includes("Combat") && campaign.playstyleFocus > 3) return false;
    if (filters.playstyle === "5 Balanced" && campaign.playstyleFocus !== 5) return false;
    if (filters.playstyle.includes("Roleplay") && campaign.playstyleFocus < 7) return false;
  }

  if (query.trim()) {
    const text = `${campaign.title} ${campaign.dm} ${campaign.system} ${campaign.tags.join(" ")} ${campaign.tone} ${campaign.description}`.toLowerCase();
    if (!text.includes(query.trim().toLowerCase())) return false;
  }

  return true;
}

export default function LfgPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [preferredFocus, setPreferredFocus] = useState(7);
  const [query, setQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const results = useMemo(
    () =>
      campaigns
        .filter((campaign) => passesFilters(campaign, filters, query))
        .map((campaign) => ({
          ...campaign,
          matchScore: matchScore(campaign, filters, preferredFocus, query),
        }))
        .sort((a, b) => b.matchScore - a.matchScore),
    [filters, preferredFocus, query],
  );

  const featured = results.find((campaign) => campaign.featured) ?? results[0] ?? campaigns[0];
  const activeFilterCount = Object.values(filters).filter((value) => value && value !== "Any").length;
  const selectedFocus = getPlaystyleFocusOption(preferredFocus);

  const filterPanel = (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-violet">Search</p>
        <label className="mt-3 flex h-12 items-center gap-3 rounded-md border border-white/10 bg-charcoal/75 px-3 focus-within:border-ember focus-within:ring-2 focus-within:ring-ember/25">
          <Search className="size-4 text-gold" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="heist, horror, Tara..."
            className="min-w-0 flex-1 bg-transparent text-sm font-bold text-parchment outline-none placeholder:text-parchment/35"
          />
        </label>
      </div>

      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-violet">Table Focus</p>
        <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-sm font-black text-white">
              {preferredFocus} — {selectedFocus.label}
            </span>
            <span className="text-[0.65rem] font-black uppercase tracking-[0.12em] text-parchment/45">
              Combat → RP
            </span>
          </div>
          <div className="grid grid-cols-9 gap-1">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setPreferredFocus(value)}
                aria-pressed={preferredFocus === value}
                className={`grid aspect-square place-items-center rounded-full text-[0.7rem] font-black transition ${
                  preferredFocus === value
                    ? "bg-ember text-charcoal shadow-gold-glow"
                    : "bg-white/7 text-parchment/60 hover:bg-white/12 hover:text-white"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {appFilters.map((filter) => (
          <label key={filter.label} className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/52">
              {filter.label}
            </span>
            <select
              aria-label={filter.label}
              value={filters[filterKey(filter.label)] ?? "Any"}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  [filterKey(filter.label)]: event.target.value,
                }))
              }
              className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/60 focus:border-ember focus:ring-2 focus:ring-ember/25"
            >
              {filter.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setFilters({});
          setQuery("");
          setPreferredFocus(7);
        }}
        className="h-11 w-full rounded-md border border-white/10 text-sm font-black text-parchment/70 transition hover:border-gold/55 hover:text-gold"
      >
        Reset filters
      </button>
    </div>
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#080503] text-parchment">
      <Navbar />

      <section className="relative border-b border-gold/15 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(139,92,246,0.20),transparent_33%),radial-gradient(circle_at_82%_10%,rgba(201,168,76,0.16),transparent_30%),linear-gradient(180deg,rgba(8,5,3,0),#080503)]" />
        <div className="relative mx-auto grid w-full max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-gold">
              Looking For Group
            </p>
            <h1 className="font-display text-[clamp(2.6rem,8vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
              Find a real table. Not an AI DM.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-parchment/68 sm:text-lg">
              QuestBoard matches players with actual DMs and actual parties — by schedule, system, language, safety expectations, and the table focus that makes D&D feel right.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#campaigns" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gold px-6 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:shadow-gold-glow">
                Browse campaigns
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <Link href="/app/profile" className="inline-flex h-12 items-center justify-center rounded-md border border-parchment/20 px-6 text-sm font-black text-parchment transition hover:border-ember/70 hover:text-white">
                Build player profile
              </Link>
            </div>
          </div>

          <aside className="glass-panel relative rounded-xl p-5 shadow-2xl">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-violet/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald">Featured match</p>
                  <h2 className="mt-2 text-2xl font-black text-white">{featured.title}</h2>
                  <p className="mt-1 text-sm font-bold text-parchment/58">DM {featured.dm} · {featured.system}</p>
                </div>
                <div className="rounded-md border border-emerald/25 bg-emerald/12 px-3 py-2 text-center">
                  <p className="text-[0.65rem] font-black uppercase text-emerald/75">Match</p>
                  <p className="text-3xl font-black text-emerald">{featured.matchScore}%</p>
                </div>
              </div>
              <p className="mt-4 leading-7 text-parchment/70">{featured.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <CalendarDays className="mb-2 size-4 text-gold" />
                  <p className="text-sm font-black text-white">{featured.day}</p>
                  <p className="text-xs text-parchment/50">{featured.time} {featured.timezone}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <UsersRound className="mb-2 size-4 text-emerald" />
                  <p className="text-sm font-black text-white">{featured.seats}</p>
                  <p className="text-xs text-parchment/50">{featured.experience}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <Star className="mb-2 size-4 fill-gold text-gold" />
                  <p className="text-sm font-black text-white">{featured.dmRating?.toFixed(1) ?? "4.8"}</p>
                  <p className="text-xs text-parchment/50">DM rating</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-violet/20 bg-violet/10 p-3 text-sm font-bold text-parchment/72">
                <ShieldCheck className="size-4 text-violet" aria-hidden="true" />
                {featured.safetyTools ?? "Session zero + safety tools"}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="campaigns" className="relative mx-auto grid w-full max-w-[1280px] gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-12 lg:py-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-gold/15 bg-[#120D18]/82 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-xl font-bold text-white">Filters</p>
              <span className="rounded-full bg-gold/10 px-2 py-1 text-xs font-black text-gold">{activeFilterCount}</span>
            </div>
            {filterPanel}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-violet">Live board</p>
              <h2 className="mt-1 text-3xl font-black text-white">{results.length} open campaigns</h2>
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-gold/35 bg-gold/10 px-4 text-sm font-black text-gold lg:hidden"
            >
              <Filter className="size-4" aria-hidden="true" />
              Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
            </button>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {results.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
            {results.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/14 p-12 text-center xl:col-span-2">
                <Sparkles className="mx-auto mb-4 size-8 text-gold" aria-hidden="true" />
                <p className="text-xl font-black text-white">No table matches yet.</p>
                <p className="mt-2 text-sm text-parchment/58">Try relaxing filters or moving your table focus.</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm lg:hidden" role="dialog" aria-modal="true" aria-label="LFG filters">
          <button className="absolute inset-0" type="button" aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[86vh] overflow-y-auto rounded-t-2xl border-t border-gold/25 bg-[#120D18] p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-violet">LFG Filters</p>
                <p className="mt-1 text-sm text-parchment/55">Refine your table match</p>
              </div>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} className="grid size-10 place-items-center rounded-full border border-white/10 text-parchment">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            {filterPanel}
          </div>
        </div>
      ) : null}
    </main>
  );
}
