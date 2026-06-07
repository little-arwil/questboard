import { CheckCircle2 } from "lucide-react";
import { howItWorks } from "@/data/mockData";

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="section-pad" aria-labelledby="how-title">
      <div className="quest-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald">
            Cara Kerja
          </p>
          <h2 id="how-title" className="mt-3 text-3xl font-black tracking-normal text-white sm:text-4xl">
            Dari profil ke party, tanpa chaos jadwal.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {howItWorks.map((step, index) => (
            <article
              key={step.title}
              className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-6 transition hover:-translate-y-1 hover:border-emerald/35"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-md bg-emerald/12 text-lg font-black text-emerald">
                  {index + 1}
                </span>
                <CheckCircle2 className="size-6 text-gold" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black tracking-normal text-white">{step.title}</h3>
              <p className="mt-3 leading-7 text-parchment/70">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
