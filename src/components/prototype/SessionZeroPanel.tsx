import { Check, ClipboardCheck } from "lucide-react";
import { sessionZeroChecklist } from "@/data/appMockData";

export function SessionZeroPanel() {
  return (
    <section className="glass-panel rounded-lg p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-md bg-gold/12 text-gold">
          <ClipboardCheck className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">
            Session zero
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-normal text-white">
            Checklist preview
          </h2>
        </div>
      </div>

      <ul className="mt-6 grid gap-3">
        {sessionZeroChecklist.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-md border border-white/10 bg-white/6 p-3"
          >
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald/14 text-emerald">
              <Check className="size-4" aria-hidden="true" />
            </span>
            <span className="font-semibold leading-6 text-parchment/82">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
