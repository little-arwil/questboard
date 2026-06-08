import { SlidersHorizontal } from "lucide-react";
import { appFilters } from "@/data/appMockData";

export function FilterControls() {
  return (
    <form className="glass-panel grid gap-4 rounded-lg p-4 md:grid-cols-2 xl:grid-cols-[repeat(5,minmax(0,1fr))_auto]">
      {appFilters.map((filter) => (
        <label key={filter.label} className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
            {filter.label}
          </span>
          <select
            aria-label={filter.label}
            defaultValue={filter.options[0]}
            className="h-12 w-full rounded-md border border-white/10 bg-charcoal px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/60 focus:border-ember focus:ring-2 focus:ring-ember/30"
          >
            {filter.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      ))}

      <button
        type="button"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald px-5 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-emerald/90 focus:outline-none focus:ring-2 focus:ring-emerald focus:ring-offset-2 focus:ring-offset-charcoal xl:mt-7"
      >
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Apply Filters
      </button>
    </form>
  );
}
