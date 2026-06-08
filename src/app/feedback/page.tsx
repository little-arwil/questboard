import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, MessageCircle, Sparkles } from "lucide-react";
import { FeedbackForm } from "@/components/FeedbackForm";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Feedback | QuestBoard",
  description:
    "Bagikan feedback untuk landing page dan clickable prototype QuestBoard.",
};

export default function FeedbackPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-charcoal">
      <header className="border-b border-white/10 bg-charcoal/82 backdrop-blur-xl">
        <nav
          className="quest-container flex min-h-16 flex-wrap items-center justify-between gap-3 py-3"
          aria-label="Feedback navigation"
        >
          <Link href="/" className="group flex items-center gap-3" aria-label="QuestBoard home">
            <span className="grid size-10 place-items-center rounded-md border border-gold/40 bg-gold/10 text-lg font-black text-ember shadow-gold-glow transition group-hover:scale-105">
              Q
            </span>
            <span className="text-lg font-black tracking-normal text-white">QuestBoard</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-parchment/18 bg-white/6 px-4 text-sm font-black text-parchment transition hover:border-ember/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Landing
            </Link>
            <Link
              href="/app"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ember px-4 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
            >
              <LayoutDashboard className="size-4" aria-hidden="true" />
              Coba Prototype
            </Link>
          </div>
        </nav>
      </header>

      <section className="section-pad" aria-labelledby="feedback-title">
        <div className="quest-container grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2 text-sm font-black text-emerald">
              <MessageCircle className="size-4" aria-hidden="true" />
              Early community feedback
            </div>
            <h1
              id="feedback-title"
              className="max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl"
            >
              Bantu QuestBoard jadi lebih cocok untuk table kamu.
            </h1>
            <p className="mt-5 max-w-2xl leading-8 text-parchment/76">
              Setelah mencoba landing page dan clickable prototype, bagikan bagian
              yang paling berguna, paling membingungkan, dan fitur yang wajib ada
              sebelum QuestBoard terasa siap dipakai.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "Tidak perlu login.",
                "Feedback disimpan ke Supabase.",
                "Tidak ada public read access untuk jawaban user.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 p-3 text-sm font-bold text-parchment/76"
                >
                  <Sparkles className="size-4 text-gold" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <FeedbackForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
