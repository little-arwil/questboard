import { Search } from "lucide-react";
import { PlaystyleFocusScale } from "@/components/prototype/PlaystyleFocusScale";
import { TrackedButton } from "@/components/TrackedButton";
import { filters } from "@/data/mockData";

export function CampaignFilter() {
  return (
    <section id="campaign-filter" className="section-pad" aria-labelledby="filter-title">
      <div className="quest-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-gold">
            Campaign Finder
          </p>
          <h2 id="filter-title" className="mt-3 text-3xl font-black tracking-normal text-white sm:text-4xl">
            Filter campaign seperti memilih quest di tavern board.
          </h2>
        </div>

        <form className="glass-panel mt-10 grid gap-4 rounded-lg p-4 md:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))_minmax(18rem,1.45fr)_auto]">
          {filters.map((filter) => (
            <label key={filter.label} className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
                {filter.label}
              </span>
              <select
                className="h-12 w-full rounded-md border border-white/10 bg-charcoal px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/60 focus:border-ember focus:ring-2 focus:ring-ember/30"
                defaultValue={filter.options[0]}
                aria-label={filter.label}
              >
                {filter.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}

          <div className="md:col-span-2 xl:col-span-1">
            <PlaystyleFocusScale
              defaultValue={7}
              name="landingTableFocus"
              label="Table Focus"
              compact
              dense
              showExplanation={false}
            />
          </div>

          <TrackedButton
            type="button"
            eventName="campaign_filter_click"
            eventProperties={{ location: "campaign_filter" }}
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald px-5 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-emerald/90 focus:outline-none focus:ring-2 focus:ring-emerald focus:ring-offset-2 focus:ring-offset-charcoal md:col-span-2 xl:col-span-1 xl:mt-0 xl:self-end"
          >
            <Search className="size-4" aria-hidden="true" />
            Cari Campaign
          </TrackedButton>
        </form>
      </div>
    </section>
  );
}
