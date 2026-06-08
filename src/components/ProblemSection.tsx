import { AlertTriangle } from "lucide-react";
import { problems } from "@/data/mockData";

export function ProblemSection() {
  return (
    <section className="border-y border-white/10 bg-charcoal py-6 sm:py-20 lg:py-24" aria-labelledby="problem-title">
      <div className="quest-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-gold">
              Kenapa butuh QuestBoard
            </p>
            <h2 id="problem-title" className="mt-3 max-w-xl text-3xl font-black tracking-normal text-white sm:text-4xl">
              Mencari table sering terasa seperti campaign tanpa map.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-parchment/72">
              QuestBoard merapikan proses pencarian party agar player dan DM bisa mulai
              dari kompatibilitas, bukan dari chat yang tenggelam.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {problems.map((problem, index) => (
              <article
                key={problem}
                className="glass-panel rounded-md p-5 transition hover:-translate-y-1 hover:border-gold/40"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <AlertTriangle className="mb-4 size-5 text-ember" aria-hidden="true" />
                <h3 className="text-lg font-black tracking-normal text-white">{problem}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
