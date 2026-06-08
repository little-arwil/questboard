export type Campaign = {
  id: string;
  title: string;
  dm: string;
  system: string;
  matchScore: number;
  day: string;
  time: string;
  timezone: string;
  language: string;
  experience: string;
  playstyle: string;
  format: string;
  tone: string;
  tools: string;
  seats: string;
  status: string;
  description: string;
  tags: string[];
  compatibilityReasons: string[];
  expectations: string[];
  playstyleMix: Array<{ label: string; value: number; tone: string }>;
};

export type ApplicationPreview = {
  campaign: string;
  dm: string;
  status: string;
  submittedAt: string;
  matchScore: number;
  nextStep: string;
};

export const appNavLinks = [
  { label: "Dashboard", href: "/app" },
  { label: "Campaigns", href: "/app/campaigns" },
  { label: "Profile", href: "/app/profile" },
  { label: "Create Campaign", href: "/app/dm/create-campaign" },
  { label: "Applications", href: "/app/applications" },
];

export const appFilters = [
  { label: "Hari", options: ["Any", "Jumat", "Sabtu", "Minggu", "Weekday"] },
  { label: "Bahasa", options: ["Any", "Bahasa Indonesia", "English", "Bilingual"] },
  { label: "Experience", options: ["Any", "Beginner", "Mixed", "Veteran"] },
  { label: "Playstyle", options: ["Any", "Roleplay-heavy", "Balanced", "Combat-heavy"] },
  { label: "Format", options: ["Any", "Online", "Offline", "Hybrid"] },
];

export const campaigns: Campaign[] = [
  {
    id: "shadows-over-eldervale",
    title: "Shadows Over Eldervale",
    dm: "Raka",
    system: "D&D 5e",
    matchScore: 92,
    day: "Sabtu",
    time: "19:30",
    timezone: "WIB",
    language: "Bahasa Indonesia",
    experience: "Beginner",
    playstyle: "Roleplay-heavy",
    format: "Online",
    tone: "Mystery fantasy",
    tools: "Discord + Roll20",
    seats: "2 seats open",
    status: "Session zero soon",
    description:
      "A misty valley, missing villagers, and an old oath underneath a ruined watchtower. Built for players who enjoy clues, character drama, and careful table expectations.",
    tags: ["Beginner-friendly", "Roleplay-heavy", "Bahasa Indonesia"],
    compatibilityReasons: [
      "Jadwal cocok Sabtu malam",
      "Beginner-friendly",
      "Roleplay-heavy",
      "Bahasa Indonesia",
      "Discord + Roll20",
    ],
    expectations: [
      "Session zero required",
      "No PvP without consent",
      "Character backstory hooks welcome",
      "Attendance notice 24 hours before session",
    ],
    playstyleMix: [
      { label: "Roleplay", value: 60, tone: "bg-violet" },
      { label: "Combat", value: 30, tone: "bg-gold" },
      { label: "Exploration", value: 10, tone: "bg-emerald" },
    ],
  },
  {
    id: "clockwork-isles",
    title: "Clockwork Isles",
    dm: "Mira",
    system: "D&D 5e",
    matchScore: 86,
    day: "Minggu",
    time: "14:00",
    timezone: "WIB",
    language: "Bilingual",
    experience: "Mixed",
    playstyle: "Balanced",
    format: "Online",
    tone: "Swashbuckling arcane tech",
    tools: "Discord + Foundry VTT",
    seats: "1 seat open",
    status: "Applications open",
    description:
      "Sky ports, sea storms, and enchanted machinery. This table balances cinematic combat, travel choices, and character-driven downtime.",
    tags: ["Balanced", "Foundry", "Bilingual"],
    compatibilityReasons: [
      "Format online",
      "Open to mixed experience",
      "Balanced roleplay and combat",
      "Weekend afternoon slot",
      "Clear table safety notes",
    ],
    expectations: [
      "Use shared party goals",
      "Respect spotlight time",
      "Homebrew items reviewed by DM",
      "Lines and veils checked before arc starts",
    ],
    playstyleMix: [
      { label: "Roleplay", value: 40, tone: "bg-violet" },
      { label: "Combat", value: 35, tone: "bg-gold" },
      { label: "Exploration", value: 25, tone: "bg-emerald" },
    ],
  },
  {
    id: "ember-deep",
    title: "Ember Deep",
    dm: "Nadia",
    system: "D&D 5e",
    matchScore: 78,
    day: "Jumat",
    time: "20:00",
    timezone: "WIB",
    language: "Bahasa Indonesia",
    experience: "Veteran",
    playstyle: "Combat-heavy",
    format: "Hybrid",
    tone: "Dungeon survival",
    tools: "Discord + Table maps",
    seats: "3 seats open",
    status: "One-shot recruiting",
    description:
      "A focused dungeon crawl through sealed volcanic tunnels. Designed for players who like tactical decisions, resource pressure, and a compact one-shot structure.",
    tags: ["Combat-heavy", "One-shot", "Hybrid"],
    compatibilityReasons: [
      "Friday night availability",
      "Tactical combat preference",
      "Experienced table",
      "Hybrid-ready",
      "One-shot commitment",
    ],
    expectations: [
      "Bring a level 5 character",
      "Rules references welcome",
      "Low romance, high tension",
      "Clear attendance confirmation",
    ],
    playstyleMix: [
      { label: "Roleplay", value: 20, tone: "bg-violet" },
      { label: "Combat", value: 65, tone: "bg-gold" },
      { label: "Exploration", value: 15, tone: "bg-emerald" },
    ],
  },
  {
    id: "lanterns-of-maritam",
    title: "Lanterns of Maritam",
    dm: "Bima",
    system: "D&D 5e",
    matchScore: 83,
    day: "Weekday",
    time: "19:00",
    timezone: "WIB",
    language: "English",
    experience: "Beginner",
    playstyle: "Roleplay-heavy",
    format: "Offline",
    tone: "Cozy mystery",
    tools: "Physical dice + shared notes",
    seats: "2 seats open",
    status: "Meetup planning",
    description:
      "A local table for slower-paced mystery, soft horror, and character bonds in a coastal city where every lantern marks an old promise.",
    tags: ["Offline", "Cozy mystery", "Beginner-friendly"],
    compatibilityReasons: [
      "Beginner support",
      "Offline preference",
      "Roleplay-heavy tone",
      "English table",
      "Weekday evening slot",
    ],
    expectations: [
      "Respect venue timing",
      "Session recaps shared after game",
      "No graphic horror",
      "Collaborative character ties",
    ],
    playstyleMix: [
      { label: "Roleplay", value: 70, tone: "bg-violet" },
      { label: "Combat", value: 15, tone: "bg-gold" },
      { label: "Exploration", value: 15, tone: "bg-emerald" },
    ],
  },
];

export const dashboardStats = [
  { label: "Best match", value: "92%", detail: "Shadows Over Eldervale" },
  { label: "Open campaigns", value: "12", detail: "4 beginner-friendly" },
  { label: "Applications", value: "3", detail: "1 waiting for DM" },
  { label: "Session zero", value: "5/7", detail: "Checklist preview ready" },
];

export const sessionZeroChecklist = [
  "Tone dan tema campaign",
  "PvP rules",
  "Character creation",
  "Homebrew rules",
  "Attendance policy",
  "Lines and veils",
  "Romance and horror boundaries",
];

export const applications: ApplicationPreview[] = [
  {
    campaign: "Shadows Over Eldervale",
    dm: "Raka",
    status: "Draft preview",
    submittedAt: "Not submitted",
    matchScore: 92,
    nextStep: "Review table expectations before applying",
  },
  {
    campaign: "Clockwork Isles",
    dm: "Mira",
    status: "Ready to send",
    submittedAt: "Not submitted",
    matchScore: 86,
    nextStep: "Confirm Sunday availability",
  },
  {
    campaign: "Lanterns of Maritam",
    dm: "Bima",
    status: "Needs profile",
    submittedAt: "Not submitted",
    matchScore: 83,
    nextStep: "Finish safety preferences",
  },
];

export const profileChecklist = [
  "Availability windows",
  "Preferred role",
  "Experience level",
  "Languages",
  "Playstyle mix",
  "Safety preferences",
];
