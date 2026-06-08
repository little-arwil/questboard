"use client";

import { FormEvent, useState } from "react";
import { Mail, Sparkles } from "lucide-react";

export function CTASection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="join-beta" className="section-pad" aria-labelledby="cta-title">
      <div className="quest-container">
        <div className="relative overflow-hidden rounded-lg border border-gold/24 bg-[linear-gradient(135deg,rgba(214,169,76,0.18),rgba(139,92,246,0.14)_48%,rgba(53,211,154,0.12))] p-6 shadow-gold-glow sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-charcoal/55 px-4 py-2 text-sm font-black text-ember">
              <Sparkles className="size-4" aria-hidden="true" />
              Beta access
            </div>
            <h2 id="cta-title" className="text-4xl font-black tracking-normal text-white sm:text-5xl">
              Bangun party tanpa chaos jadwal.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-parchment/78">
              Masuk daftar beta QuestBoard dan bantu bentuk cara baru mencari table
              D&amp;D yang lebih cocok sejak awal.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:max-w-xl sm:flex-row">
              <label className="sr-only" htmlFor="email">
                Email untuk join beta
              </label>
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-parchment/42" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="email@domain.com"
                  className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 pl-12 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-parchment/35 hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-md bg-ember px-6 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
              >
                Join Beta
              </button>
            </form>

            <p className="mt-4 min-h-6 text-sm font-bold text-emerald" aria-live="polite">
              {submitted ? "Berhasil! Kamu masuk daftar beta QuestBoard." : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
