"use client";

import { useMemo, useState } from "react";
import { AppPageHeader } from "@/components/prototype/AppShell";
import { CampaignCard } from "@/components/prototype/CampaignCard";
import { appFilters, campaigns } from "@/data/appMockData";
import type { Campaign } from "@/data/appMockData";
import { getPlaystyleFocusOption } from "@/lib/playstyleFocus";

function filterKey(label: string) {
  return label.toLowerCase();
}

function matchScore(campaign: Campaign, filters: Record<string, string>, preferredFocus: number) {
  let score = 54;

  if (filters.hari && filters.hari !== "Any" && campaign.day === filters.hari) score += 10;
  if (filters.bahasa && filters.bahasa !== "Any" && campaign.language === filters.bahasa) score += 8;
  if (filters.experience && filters.experience !== "Any" && campaign.experience === filters.experience) score += 8;
  if (filters.format && filters.format !== "Any" && campaign.format === filters.format) score += 7;
  if (filters.system && filters.system !== "Any" && campaign.system === filters.system) score += 9;

  const focusDiff = Math.abs(campaign.playstyleFocus - preferredFocus);
  score += focusDiff === 0 ? 14 : focusDiff <= 1 ? 11 : focusDiff <= 2 ? 7 : focusDiff <= 3 ? 3 : 0;

  return Math.min(99, score);
}

function passesFilters(campaign: Campaign, filters: Record<string, string>) {
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

  return true;
}

export default function CampaignBrowsePage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [preferredFocus, setPreferredFocus] = useState(7);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const results = useMemo(
    () =>
      campaigns
        .filter((campaign) => passesFilters(campaign, filters))
        .map((campaign) => ({
          ...campaign,
          matchScore: matchScore(campaign, filters, preferredFocus),
        }))
        .sort((a, b) => b.matchScore - a.matchScore),
    [filters, preferredFocus],
  );

  const activeFilterCount = Object.values(filters).filter((value) => value && value !== "Any").length;
  const selectedFocus = getPlaystyleFocusOption(preferredFocus);

  return (
    <>
      <AppPageHeader
        eyebrow="LFG"
        title="Find the table that actually fits."
        body="Campaign nyata, DM nyata, player nyata. Filter berdasarkan sistem, jadwal, bahasa, format, experience, dan gaya main — bukan AI yang pura-pura jadi DM."
      />

      <section className="glass-panel rounded-lg p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet">Your table focus</p>
            <h2 className="mt-2 text-xl font-black text-white">
              {preferredFocus} — {selectedFocus.label}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-parchment/62">
              Geser preferensi kamu. Match score campaign akan berubah otomatis.
            </p>
          </div>
          <div className="min-w-0 flex-1 lg:max-w-xl">
            <div className="mb-2 flex justify-between text-[0.7rem] font-black uppercase tracking-[0.12em] text-parchment/52">
              <span>Combat-heavy</span>
              <span>Roleplay-heavy</span>
            </div>
            <div className="grid grid-cols-9 gap-1 rounded-full border border-white/10 bg-charcoal/70 p-1">
              {Array.from({ length: 9 }, (_, i) => i + 1).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPreferredFocus(value)}
                  aria-pressed={preferredFocus === value}
                  className={`grid aspect-square min-h-8 place-items-center rounded-full text-xs font-black transition ${
                    preferredFocus === value
                      ? "bg-ember text-charcoal shadow-gold-glow"
                      : "bg-white/6 text-parchment/62 hover:bg-white/12 hover:text-white"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setFiltersOpen((value) => !value)}
          className="inline-flex h-11 items-center justify-center rounded-md border border-gold/35 bg-gold/10 px-4 text-sm font-black text-gold transition hover:bg-gold/15"
        >
          {filtersOpen ? "Sembunyikan filter" : "Tampilkan filter"}
          {activeFilterCount > 0 ? ` · ${activeFilterCount}` : ""}
        </button>
        <p className="text-sm font-bold text-parchment/58">
          {results.length} campaign ditemukan · sorted by match
        </p>
      </div>

      {filtersOpen ? (
        <form className="glass-panel mt-4 grid gap-4 rounded-lg p-4 md:grid-cols-2 xl:grid-cols-6">
          {appFilters.map((filter) => (
            <label key={filter.label} className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
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
                className="h-12 w-full rounded-md border border-white/10 bg-charcoal px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/60 focus:border-ember focus:ring-2 focus:ring-ember/30"
              >
                {filter.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </form>
      ) : null}

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {results.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
        {results.length === 0 ? (
          <div className="col-span-full rounded-lg border border-dashed border-white/14 p-10 text-center">
            <p className="text-xl font-black text-white">Belum ada table yang cocok.</p>
            <p className="mt-2 text-sm text-parchment/58">Longgarkan filter atau ubah table focus kamu.</p>
          </div>
        ) : null}
      </section>
    </>
  );
}
