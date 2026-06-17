"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NewCharacterPage() {
  const [name, setName] = useState("Thalia Briarstep");
  const [ancestry, setAncestry] = useState("Wood Elf");
  const [className, setClassName] = useState("Ranger");
  const [level, setLevel] = useState(7);
  const [campaign, setCampaign] = useState("Shadows Over Eldervale");
  const [quote, setQuote] = useState("If the forest goes quiet, we run.");
  const [saved, setSaved] = useState(false);

  return (
    <main className="min-h-screen bg-charcoal">
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-24 sm:px-8">
        <Link href="/profile/raka-dm" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted no-underline transition hover:text-gold">
          <ArrowLeft className="size-3.5" /> Back to profile
        </Link>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">Character Showcase</p>
              <h1 className="mt-2 text-2xl font-black text-white">Create Character Card</h1>
              <p className="mt-1 text-sm text-text-muted">Mock flow sekarang; siap dihubungkan ke Supabase ownership.</p>
            </div>
            <button onClick={() => setSaved(true)} className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-charcoal transition hover:bg-gold-light">
              <Sparkles className="size-4" /> {saved ? "Created" : "Create"}
            </button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Name</span><input value={name} onChange={(e) => setName(e.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none focus:border-gold" /></label>
            <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Ancestry</span><input value={ancestry} onChange={(e) => setAncestry(e.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none focus:border-gold" /></label>
            <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Class</span><input value={className} onChange={(e) => setClassName(e.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none focus:border-gold" /></label>
            <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Level</span><input type="number" min={1} max={30} value={level} onChange={(e) => setLevel(Number(e.target.value))} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none focus:border-gold" /></label>
            <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Campaign</span><input value={campaign} onChange={(e) => setCampaign(e.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none focus:border-gold" /></label>
            <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Character Quote</span><textarea rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} className="w-full rounded-md border border-white/10 bg-charcoal px-3.5 py-3 text-sm font-semibold text-white outline-none focus:border-gold" /></label>
          </div>

          <div className="mt-8 rounded-md border border-gold/20 bg-gold/8 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">Preview</p>
            <h2 className="mt-2 text-xl font-black text-white">{name}</h2>
            <p className="text-sm text-text-muted">{ancestry} {className} · Level {level} · {campaign}</p>
            <p className="mt-3 text-sm italic text-parchment/70">&ldquo;{quote}&rdquo;</p>
          </div>
        </div>
      </div>
    </main>
  );
}
