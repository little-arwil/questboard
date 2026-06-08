import { Check, ScrollText } from "lucide-react";
import { sessionZeroChecklist } from "@/data/mockData";

export function SessionZeroPreview() {
  return (
    <section className="section-pad bg-charcoal-2/70" aria-labelledby="session-zero-title">
      <div className="quest-container">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-gold">
              Session Zero
            </p>
            <h2 id="session-zero-title" className="mt-3 text-3xl font-black tracking-normal text-white sm:text-4xl">
              Sepakati ekspektasi sebelum dadu pertama dilempar.
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-parchment/72">
              Checklist membantu table bicara soal rules, boundaries, dan komitmen
              tanpa membuat DM harus menulis semuanya dari nol.
            </p>
          </div>

          <article className="parchment-panel rounded-lg p-6 shadow-quest-card">
            <div className="flex items-center gap-4 border-b border-stone-900/12 pb-5">
              <span className="grid size-12 place-items-center rounded-md bg-stone-950 text-ember">
                <ScrollText className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-stone-600">
                  Preview
                </p>
                <h3 className="text-2xl font-black tracking-normal text-stone-950">
                  Session zero checklist
                </h3>
              </div>
            </div>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {sessionZeroChecklist.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-md bg-white/52 p-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald text-charcoal">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-black text-stone-900">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
