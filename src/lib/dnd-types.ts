// ============================================================
// D&D Character Types
// ============================================================

export interface Weapon {
  name: string;
  damage: string;
  type: string;
  notes?: string;
}

export interface Spell {
  name: string;
  level: number;
  school?: string;
  notes?: string;
}

export interface Character {
  id: string;
  user_id: string;
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
  weapons: Weapon[];
  spells: Spell[];
  inventory: string[];
  backstory: string;
  visibility: "private" | "public" | "friends";
  created_at: string;
  updated_at: string;
}

// ---- Derived helpers ----

export const ABILITY_KEYS = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

export type AbilityKey = (typeof ABILITY_KEYS)[number];

export const ABILITY_LABELS: Record<AbilityKey, string> = {
  strength: "STR",
  dexterity: "DEX",
  constitution: "CON",
  intelligence: "INT",
  wisdom: "WIS",
  charisma: "CHA",
};

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// ---- Input types for create/update ----

export type CharacterInsert = Omit<Character, "id" | "user_id" | "created_at" | "updated_at">;
export type CharacterUpdate = Partial<CharacterInsert>;
