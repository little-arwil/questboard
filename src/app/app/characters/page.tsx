"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppPageHeader } from "@/components/prototype/AppShell";
import {
  createSupabaseBrowserClient,
  CHARACTERS_TABLE,
} from "@/lib/supabase";
import {
  Character,
  ABILITY_LABELS,
  abilityModifier,
  formatModifier,
} from "@/lib/dnd-types";
import {
  ShieldCheck,
  Swords,
  Heart,
  Eye,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

const EMPTY: Character[] = [];

export default function CharacterListPage() {
  const [characters, setCharacters] = useState<Character[]>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setLoading(false);
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from(CHARACTERS_TABLE)
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      setCharacters((data as Character[]) ?? EMPTY);
      setLoading(false);
    }
    load();
  }, []);

  async function handleDelete(id: string) {
    setDeleting(id);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.from(CHARACTERS_TABLE).delete().eq("id", id);
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    setDeleting(null);
  }

  return (
    <>
      <AppPageHeader
        eyebrow="Characters"
        title="Your party, your story."
        body="Build and manage your D&D character sheets. All stats, inventory, and backstory in one place."
        action={
          <Link
            href="/app/characters/new"
            className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-black text-charcoal transition hover:bg-gold-light"
          >
            <Plus className="size-4" aria-hidden="true" />
            Create Character
          </Link>
        }
      />

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-panel h-56 animate-pulse rounded-lg p-5"
            />
          ))}
        </div>
      )}

      {!loading && characters.length === 0 && (
        <div className="glass-panel rounded-lg p-12 text-center">
          <p className="text-2xl font-black text-white">No characters yet.</p>
          <p className="mt-2 text-sm text-parchment/50">
            Create your first character to start your adventure.
          </p>
          <Link
            href="/app/characters/new"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-charcoal transition hover:bg-gold-light"
          >
            <Plus className="size-4" aria-hidden="true" />
            Create Character
          </Link>
        </div>
      )}

      {!loading && characters.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {characters.map((ch) => (
            <Link
              key={ch.id}
              href={`/app/characters/${ch.id}`}
              className="glass-panel group relative rounded-lg p-5 transition hover:border-gold/20"
            >
              {/* Top bar: visibility + level */}
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-black text-parchment/40">
                  <Eye className="size-3" aria-hidden="true" />
                  {ch.visibility}
                </span>
                <span className="rounded bg-gold/15 px-2 py-0.5 text-[10px] font-black text-gold">
                  LVL {ch.level}
                </span>
              </div>

              {/* Name + Class */}
              <h2 className="text-lg font-black text-white group-hover:text-gold transition">
                {ch.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-parchment/62">
                {ch.species} {ch.class_name}
              </p>

              {/* Ability scores row */}
              <div className="mt-4 flex gap-2 text-[10px] font-black">
                {(
                  ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"] as const
                ).map((key) => (
                  <span
                    key={key}
                    className="flex flex-col items-center rounded bg-white/6 px-2 py-1"
                  >
                    <span className="text-parchment/45">{ABILITY_LABELS[key]}</span>
                    <span className="text-white">{ch[key]}</span>
                    <span className="text-emerald">
                      {formatModifier(abilityModifier(ch[key]))}
                    </span>
                  </span>
                ))}
              </div>

              {/* HP + AC row */}
              <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-parchment/60">
                <span className="flex items-center gap-1">
                  <Heart className="size-3 text-rose" aria-hidden="true" />
                  {ch.current_hp}/{ch.max_hp}
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-3 text-sky" aria-hidden="true" />
                  AC {ch.armor_class}
                </span>
                <span className="flex items-center gap-1">
                  <Swords className="size-3 text-ember" aria-hidden="true" />
                  {ch.weapons?.length ?? 0}
                </span>
              </div>

              {/* Actions */}
              <div
                className="absolute right-3 bottom-3 flex gap-1 opacity-0 transition group-hover:opacity-100"
                onClick={(e) => e.preventDefault()}
              >
                <Link
                  href={`/app/characters/${ch.id}/edit`}
                  className="rounded bg-white/10 p-1.5 text-parchment/50 transition hover:bg-gold/20 hover:text-gold"
                  aria-label="Edit"
                >
                  <Pencil className="size-3.5" />
                </Link>
                <button
                  onClick={() => handleDelete(ch.id)}
                  disabled={deleting === ch.id}
                  className="rounded bg-white/10 p-1.5 text-parchment/50 transition hover:bg-rose/20 hover:text-rose disabled:opacity-50"
                  aria-label="Delete"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
