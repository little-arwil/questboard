"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import {
  createSupabaseBrowserClient,
  CHARACTERS_TABLE,
} from "@/lib/supabase";
import {
  Character,
  ABILITY_KEYS,
  ABILITY_LABELS,
  abilityModifier,
  formatModifier,
} from "@/lib/dnd-types";

type FormState = {
  name: string;
  species: string;
  class_name: string;
  level: number;
  background: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  armor_class: number;
  max_hp: number;
  current_hp: number;
  speed: number;
  weaponsText: string;
  spellsText: string;
  inventoryText: string;
  backstory: string;
  visibility: "private" | "public" | "friends";
};

function emptyForm(): FormState {
  return {
    name: "",
    species: "",
    class_name: "",
    level: 1,
    background: "",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    armor_class: 10,
    max_hp: 10,
    current_hp: 10,
    speed: 30,
    weaponsText: "",
    spellsText: "",
    inventoryText: "",
    backstory: "",
    visibility: "private",
  };
}

function fromCharacter(c: Character): FormState {
  return {
    name: c.name,
    species: c.species,
    class_name: c.class_name,
    level: c.level,
    background: c.background,
    strength: c.strength,
    dexterity: c.dexterity,
    constitution: c.constitution,
    intelligence: c.intelligence,
    wisdom: c.wisdom,
    charisma: c.charisma,
    armor_class: c.armor_class,
    max_hp: c.max_hp,
    current_hp: c.current_hp,
    speed: c.speed,
    weaponsText: (c.weapons ?? []).map((w) => `${w.name} | ${w.damage} | ${w.type}`).join("\n"),
    spellsText: (c.spells ?? []).map((s) => `${s.name} | ${s.level}`).join("\n"),
    inventoryText: (c.inventory ?? []).join("\n"),
    backstory: c.backstory,
    visibility: c.visibility,
  };
}

export function CharacterForm({ existing }: { existing?: Character }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    existing ? fromCharacter(existing) : emptyForm()
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    if (!form.name.trim()) return "Nama character wajib diisi.";
    if (!form.species.trim()) return "Species wajib diisi.";
    if (!form.class_name.trim()) return "Class wajib diisi.";
    if (form.level < 1 || form.level > 20) return "Level harus 1-20.";
    if (form.current_hp > form.max_hp) return "Current HP tidak boleh lebih dari Max HP.";
    for (const key of ABILITY_KEYS) {
      const v = form[key];
      if (v < 1 || v > 30) return `${ABILITY_LABELS[key]} harus 1-30.`;
    }
    return null;
  }

  function parseWeapons() {
    return form.weaponsText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [name, damage, type] = l.split("|").map((s) => s.trim());
        return { name: name ?? "", damage: damage ?? "", type: type ?? "" };
      });
  }

  function parseSpells() {
    return form.spellsText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [name, level] = l.split("|").map((s) => s.trim());
        return { name: name ?? "", level: Number(level) || 0 };
      });
  }

  async function handleSubmit() {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Backend belum aktif.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Kamu harus login dulu.");
      router.push("/auth");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      user_id: user.id,
      name: form.name.trim(),
      species: form.species.trim(),
      class_name: form.class_name.trim(),
      level: form.level,
      background: form.background.trim(),
      strength: form.strength,
      dexterity: form.dexterity,
      constitution: form.constitution,
      intelligence: form.intelligence,
      wisdom: form.wisdom,
      charisma: form.charisma,
      armor_class: form.armor_class,
      max_hp: form.max_hp,
      current_hp: form.current_hp,
      speed: form.speed,
      weapons: parseWeapons(),
      spells: parseSpells(),
      inventory: form.inventoryText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
      backstory: form.backstory.trim(),
      visibility: form.visibility,
    };

    if (existing) {
      const { error: updErr } = await supabase
        .from(CHARACTERS_TABLE)
        .update(payload)
        .eq("id", existing.id);
      if (updErr) {
        setError("Gagal menyimpan. Coba lagi.");
        setSaving(false);
        return;
      }
      router.push(`/app/characters/${existing.id}`);
    } else {
      const { data, error: insErr } = await supabase
        .from(CHARACTERS_TABLE)
        .insert(payload)
        .select("id")
        .single();
      if (insErr || !data) {
        setError("Gagal membuat character. Coba lagi.");
        setSaving(false);
        return;
      }
      router.push(`/app/characters/${data.id}`);
    }
  }

  const inputCls =
    "h-11 w-full rounded-md border border-white/10 bg-[#0d0d0d] px-3 text-sm font-semibold text-white outline-none transition focus:border-gold";
  const labelCls =
    "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-parchment/45";

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/app/characters"
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-parchment/40 no-underline transition hover:text-gold"
      >
        <ArrowLeft className="size-3.5" />
        Back to characters
      </Link>

      <h1 className="text-3xl font-black text-white">
        {existing ? "Edit Character" : "Create Character"}
      </h1>
      <p className="mt-2 text-sm text-parchment/50">
        Isi sheet karaktermu. Modifier dihitung otomatis dari ability score.
      </p>

      {/* Identity */}
      <section className="glass-panel mt-6 rounded-lg p-5">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-gold">
          Identity
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Name *</label>
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Thalia Brightwood"
            />
          </div>
          <div>
            <label className={labelCls}>Species *</label>
            <input
              className={inputCls}
              value={form.species}
              onChange={(e) => set("species", e.target.value)}
              placeholder="Half-Elf"
            />
          </div>
          <div>
            <label className={labelCls}>Class *</label>
            <input
              className={inputCls}
              value={form.class_name}
              onChange={(e) => set("class_name", e.target.value)}
              placeholder="Ranger"
            />
          </div>
          <div>
            <label className={labelCls}>Level (1-20)</label>
            <input
              type="number"
              min={1}
              max={20}
              className={inputCls}
              value={form.level}
              onChange={(e) => set("level", Number(e.target.value))}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Background</label>
            <input
              className={inputCls}
              value={form.background}
              onChange={(e) => set("background", e.target.value)}
              placeholder="Outlander"
            />
          </div>
        </div>
      </section>

      {/* Ability scores */}
      <section className="glass-panel mt-5 rounded-lg p-5">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-gold">
          Ability Scores
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {ABILITY_KEYS.map((key) => (
            <div key={key}>
              <label className={labelCls}>{ABILITY_LABELS[key]}</label>
              <input
                type="number"
                min={1}
                max={30}
                className={inputCls}
                value={form[key]}
                onChange={(e) => set(key, Number(e.target.value))}
              />
              <p className="mt-1 text-center text-xs font-black text-emerald">
                {formatModifier(abilityModifier(form[key]))}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Combat */}
      <section className="glass-panel mt-5 rounded-lg p-5">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-gold">
          Combat
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <label className={labelCls}>Armor Class</label>
            <input
              type="number"
              className={inputCls}
              value={form.armor_class}
              onChange={(e) => set("armor_class", Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelCls}>Max HP</label>
            <input
              type="number"
              className={inputCls}
              value={form.max_hp}
              onChange={(e) => set("max_hp", Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelCls}>Current HP</label>
            <input
              type="number"
              className={inputCls}
              value={form.current_hp}
              onChange={(e) => set("current_hp", Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelCls}>Speed</label>
            <input
              type="number"
              className={inputCls}
              value={form.speed}
              onChange={(e) => set("speed", Number(e.target.value))}
            />
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="glass-panel mt-5 rounded-lg p-5">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-gold">
          Equipment & Spells
        </h2>
        <div className="grid gap-4">
          <div>
            <label className={labelCls}>
              Weapons (1 per baris: nama | damage | type)
            </label>
            <textarea
              rows={3}
              className={`${inputCls} h-auto py-2`}
              value={form.weaponsText}
              onChange={(e) => set("weaponsText", e.target.value)}
              placeholder="Longbow | 1d8 piercing | ranged"
            />
          </div>
          <div>
            <label className={labelCls}>Spells (1 per baris: nama | level)</label>
            <textarea
              rows={3}
              className={`${inputCls} h-auto py-2`}
              value={form.spellsText}
              onChange={(e) => set("spellsText", e.target.value)}
              placeholder="Hunter's Mark | 1"
            />
          </div>
          <div>
            <label className={labelCls}>Inventory (1 item per baris)</label>
            <textarea
              rows={3}
              className={`${inputCls} h-auto py-2`}
              value={form.inventoryText}
              onChange={(e) => set("inventoryText", e.target.value)}
              placeholder="Rope, 50ft"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="glass-panel mt-5 rounded-lg p-5">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-gold">
          Story & Visibility
        </h2>
        <div className="grid gap-4">
          <div>
            <label className={labelCls}>Backstory</label>
            <textarea
              rows={4}
              className={`${inputCls} h-auto py-2`}
              value={form.backstory}
              onChange={(e) => set("backstory", e.target.value)}
              placeholder="Grew up on the edge of the Whispering Woods..."
            />
          </div>
          <div>
            <label className={labelCls}>Visibility</label>
            <select
              className={inputCls}
              value={form.visibility}
              onChange={(e) =>
                set("visibility", e.target.value as FormState["visibility"])
              }
            >
              <option value="private">Private (cuma kamu)</option>
              <option value="friends">Friends</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>
      </section>

      {error ? (
        <p className="mt-4 text-sm font-semibold text-rose">{error}</p>
      ) : null}

      <button
        onClick={handleSubmit}
        disabled={saving}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-black text-charcoal transition hover:bg-gold-light disabled:opacity-60 sm:w-auto"
      >
        {saving ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Save className="size-4" />
        )}
        {existing ? "Save Changes" : "Create Character"}
      </button>
    </div>
  );
}
