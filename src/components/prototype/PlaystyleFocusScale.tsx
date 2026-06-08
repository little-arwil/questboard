"use client";

import { useState } from "react";
import { MessageCircle, Swords } from "lucide-react";
import {
  getPlaystyleFocusOption,
  playstyleFocusScale,
} from "@/lib/playstyleFocus";

type PlaystyleFocusScaleProps = {
  defaultValue?: number;
  name?: string;
  label?: string;
  description?: string;
  readOnly?: boolean;
  compact?: boolean;
  dense?: boolean;
  showExplanation?: boolean;
};

export function PlaystyleFocusScale({
  defaultValue = 5,
  name = "playstyleFocus",
  label = "Table Focus",
  description = "Pilih angka yang paling mendekati energi table kamu.",
  readOnly = false,
  compact = false,
  dense = false,
  showExplanation = true,
}: PlaystyleFocusScaleProps) {
  const [playstyleFocus, setPlaystyleFocus] = useState(defaultValue);
  const selected = getPlaystyleFocusOption(playstyleFocus);
  const idBase = name.replace(/[^a-zA-Z0-9_-]/g, "-");
  const isCompact = compact || dense;

  return (
    <section
      className={
        dense
          ? "rounded-md border border-violet/18 bg-violet/8 p-3"
          : compact
            ? "rounded-md border border-violet/18 bg-violet/8 p-4"
          : "rounded-lg border border-violet/20 bg-violet/8 p-5 shadow-gold-glow"
      }
      aria-labelledby={`${idBase}-label`}
    >
      <div
        className={
          dense
            ? "grid gap-2"
            : "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
        }
      >
        <div>
          <p
            id={`${idBase}-label`}
            className="text-xs font-black uppercase tracking-[0.16em] text-violet/86"
          >
            {label}
          </p>
          {!isCompact && (
            <p className="mt-2 text-sm font-semibold leading-6 text-parchment/64">
              {description}
            </p>
          )}
        </div>
        <div
          className={
            dense
              ? "text-left"
              : "rounded-md border border-gold/20 bg-gold/10 px-3 py-2 text-left sm:text-right"
          }
        >
          <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-gold/80">
            Selected
          </p>
          <p className="mt-1 text-sm font-black text-white">
            {playstyleFocus} - {selected.label}
          </p>
        </div>
      </div>

      <div className={isCompact ? "mt-3" : "mt-5"}>
        <div
          className={
            dense
              ? "mb-2 flex items-center justify-between gap-3 text-[0.68rem] font-black uppercase tracking-[0.1em] text-parchment/52"
              : "mb-3 flex items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.12em] text-parchment/52"
          }
        >
          <span className="inline-flex items-center gap-2">
            <Swords className={dense ? "size-3.5 text-gold" : "size-4 text-gold"} aria-hidden="true" />
            Combat-heavy
          </span>
          <span className="inline-flex items-center gap-2 text-right">
            Roleplay-heavy
            <MessageCircle className={dense ? "size-3.5 text-violet" : "size-4 text-violet"} aria-hidden="true" />
          </span>
        </div>

        <div
          className="grid grid-cols-9 gap-1 rounded-full border border-white/10 bg-charcoal/70 p-1"
          role={readOnly ? "img" : "group"}
          aria-label={`Table focus ${playstyleFocus}: ${selected.label}`}
        >
          {playstyleFocusScale.map((option) => {
            const isSelected = option.value === playstyleFocus;
            const className = [
              dense
                ? "grid aspect-square min-h-7 place-items-center rounded-full text-[0.72rem] font-black transition"
                : "grid aspect-square min-h-8 place-items-center rounded-full text-xs font-black transition sm:min-h-9",
              isSelected
                ? "bg-ember text-charcoal shadow-gold-glow"
                : "bg-white/6 text-parchment/62",
              !readOnly && !isSelected
                ? "hover:bg-white/12 hover:text-white focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
                : "",
            ].join(" ");

            if (readOnly) {
              return (
                <span key={option.value} className={className}>
                  {option.value}
                </span>
              );
            }

            return (
              <button
                key={option.value}
                type="button"
                className={className}
                aria-pressed={isSelected}
                aria-label={`${option.value}: ${option.label}`}
                onClick={() => setPlaystyleFocus(option.value)}
              >
                {option.value}
              </button>
            );
          })}
        </div>
      </div>

      {!readOnly && <input type="hidden" name={name} value={playstyleFocus} />}

      {showExplanation && (
        <p className="mt-4 text-sm font-semibold leading-6 text-parchment/74">
          {selected.explanation}
        </p>
      )}
    </section>
  );
}
