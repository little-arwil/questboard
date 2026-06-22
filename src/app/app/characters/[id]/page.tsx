"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  Swords,
  Pencil,
  Trash2,
  Wand2,
  Backpack,
  BookOpen,
} from "lucide-react";
import { createSupabaseBrowserClient, CHARACTERS_TABLE } from "@/lib/supabase";
import {
  Character,
  ABILITY_KEYS,
  ABILITY_LABELS,
  abilityModifier,
  formatModifier,
} from "@/lib/dnd-types";

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [ch, setCh] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    supabase
      .from(CHARACTERS_TABLE)
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setCh(data as Character | null);
        setLoading(false);
      });
  }, [id]);

  async function handleDelete() {
    if (!ch) return;
    if (!confirm(`Delete ${ch.name}? This cannot be undone.`)) return;
    setDeleting(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.from(CHARACTERS_TABLE).delete().eq("id", id);
    router.replace("/app/characters");
  }

  if (loading) {
    return (
      <div className="glass-panel mx-auto max-w-4xl animate-pulse rounded-lg p-8">
        <div className="mb-6 h-8 w-48 rounded bg-white/10" />
        <div className="h-64 rounded bg-white/6" />
      </div>
    );
  }

  if (!ch) {
    return (
      <div className="glass-panel mx-auto max-w-md rounded-lg p-12 text-center">
        <p className="text-2xl font-black text-white">Character not found.</p>
        <Link
          href="/app/characters"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold"
        >
          <ArrowLeft className="size-4" />
          Back to characters
        </Link>
      </div>
    );
  }

  const statBox =
    "flex flex-col items-center rounded border border-white/10 bg-white/5 px-3 py-2";

  return (
    <div className="mx-auto max-w-4xl">
      {/* Top bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/app/characters"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-parchment/40 no-underline transition hover:text-gold"
        >
          <ArrowLeft className="size-3.5" />
          All characters
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/app/characters/${ch.id}/edit`}
            className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-xs font-black text-white transition hover:border-gold/40"
          >
            <Pencil className="size-3.5" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-md border border-rose/30 px-4 py-2 text-xs font-black text-rose transition hover:bg-rose/10 disabled:opacity-50"
          >
            <Trash2 className="size-3.5" />
            Delete
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="glass-panel rounded-lg p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white">{ch.name}</h1>
              <span className="rounded bg-gold/15 px-2.5 py-0.5 text-[10px] font-black text-gold">
                LVL {ch.level}
              </span>
            </div>
            <p className="mt-1 text-lg font-semibold text-parchment/62">
              {ch.species} {ch.class_name}
            </p>
            {ch.background && (
              <p className="mt-0.5 text-sm text-parchment/40">{ch.background}</p>
            )}
          </div>

          {/* HP + AC + Speed */}
          <div className="flex gap-3">
            <div className={statBox}>
              <Heart className="size-4 text-rose" aria-hidden="true" />
              <span className="mt-1 text-sm font-black text-white">
                {ch.current_hp}/{ch.max_hp}
              </span>
              <span className="text-[10px] text-parchment/40">HP</span>
            </div>
            <div className={statBox}>
              <ShieldCheck className="size-4 text-sky" aria-hidden="true" />
              <span className="mt-1 text-sm font-black text-white">
                {ch.armor_class}
              </span>
              <span className="text-[10px] text-parchment/40">AC</span>
            </div>
            <div className={statBox}>
              <Swords className="size-4 text-ember" aria-hidden="true" />
              <span className="mt-1 text-sm font-black text-white">
                {ch.speed}
              </span>
              <span className="text-[10px] text-parchment/40">Speed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ability scores */}
      <section className="glass-panel mt-5 rounded-lg p-5">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-gold">
          Ability Scores
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {ABILITY_KEYS.map((key) => (
            <div key={key} className={statBox}>
              <span className="text-[10px] font-black uppercase tracking-wider text-parchment/45">
                {ABILITY_LABELS[key]}
              </span>
              <span className="mt-1 text-xl font-black text-white">
                {ch[key]}
              </span>
              <span className="text-sm font-bold text-emerald">
                {formatModifier(abilityModifier(ch[key]))}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Weapons */}
      {ch.weapons && ch.weapons.length > 0 && (
        <section className="glass-panel mt-5 rounded-lg p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gold">
            <Swords className="size-4" aria-hidden="true" />
            Weapons
          </h2>
          <div className="grid gap-2">
            {ch.weapons.map((w, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded border border-white/8 bg-white/4 px-4 py-2"
              >
                <span className="font-bold text-white">{w.name}</span>
                <span className="text-xs font-semibold text-parchment/60">
                  {w.damage} {w.type ? `• ${w.type}` : ""}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Spells */}
      {ch.spells && ch.spells.length > 0 && (
        <section className="glass-panel mt-5 rounded-lg p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gold">
            <Wand2 className="size-4" aria-hidden="true" />
            Spells
          </h2>
          <div className="grid gap-2">
            {ch.spells.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded border border-white/8 bg-white/4 px-4 py-2"
              >
                <span className="font-bold text-white">{s.name}</span>
                <span className="rounded bg-violet/15 px-2 py-0.5 text-[10px] font-black text-violet">
                  Lv.{s.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Inventory */}
      {ch.inventory && ch.inventory.length > 0 && (
        <section className="glass-panel mt-5 rounded-lg p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gold">
            <Backpack className="size-4" aria-hidden="true" />
            Inventory
          </h2>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {ch.inventory.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded border border-white/8 bg-white/4 px-4 py-2 text-sm font-semibold text-white"
              >
                <span className="size-1.5 rounded-full bg-parchment/30" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Backstory */}
      {ch.backstory && (
        <section className="glass-panel mt-5 rounded-lg p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gold">
            <BookOpen className="size-4" aria-hidden="true" />
            Backstory
          </h2>
          <p className="whitespace-pre-wrap leading-7 text-parchment/72">
            {ch.backstory}
          </p>
        </section>
      )}
    </div>
  );
}
