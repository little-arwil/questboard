export type PlaystyleFocusOption = {
  value: number;
  label: string;
  explanation: string;
};

export const playstyleFocusScale: PlaystyleFocusOption[] = [
  {
    value: 1,
    label: "Tactical combat-heavy",
    explanation: "Rules tactics, grid choices, and combat pressure lead the table.",
  },
  {
    value: 2,
    label: "Combat-heavy",
    explanation: "Most sessions lean toward fights, builds, and tactical problem solving.",
  },
  {
    value: 3,
    label: "Combat-focused",
    explanation: "Combat is the main engine, with roleplay supporting the action.",
  },
  {
    value: 4,
    label: "Slightly combat-focused",
    explanation: "The table tilts toward combat while leaving room for character scenes.",
  },
  {
    value: 5,
    label: "Balanced",
    explanation: "Combat, roleplay, and exploration share the spotlight evenly.",
  },
  {
    value: 6,
    label: "Slightly roleplay-focused",
    explanation: "Character choices and table drama lead a little more than combat.",
  },
  {
    value: 7,
    label: "Roleplay-focused",
    explanation: "Character scenes, dialogue, and personal stakes drive most sessions.",
  },
  {
    value: 8,
    label: "Roleplay-heavy",
    explanation: "The table prioritizes character drama, relationships, and narrative arcs.",
  },
  {
    value: 9,
    label: "Narrative-heavy",
    explanation: "Story momentum and collaborative fiction are the heart of the table.",
  },
];

export function getPlaystyleFocusOption(value: number) {
  return (
    playstyleFocusScale.find((option) => option.value === value) ??
    playstyleFocusScale[4]
  );
}

export function getPlaystyleFocusMatchNote(
  campaignFocus: number,
  preferredFocus = 7,
) {
  const campaignLabel = getPlaystyleFocusOption(campaignFocus).label.toLowerCase();
  const difference = campaignFocus - preferredFocus;

  if (Math.abs(difference) <= 1) {
    return `Gaya main cocok: sama-sama ${campaignLabel}.`;
  }

  if (difference < 0) {
    return `Campaign ini lebih combat-focused dari preferensi kamu.`;
  }

  return `Campaign ini lebih roleplay-focused dari preferensi kamu.`;
}
