export type ProfileRole = "Player" | "DM" | "Player & DM";

export type CharacterShowcase = {
  name: string;
  ancestry: string;
  className: string;
  level: number;
  campaign: string;
  status: "Active" | "Retired" | "Fallen" | "Legendary";
  quote: string;
  accent: string;
};

export type SessionHistory = {
  title: string;
  role: "Player" | "DM";
  system: string;
  sessions: number;
  tablemates: string[];
  completed: boolean;
};

export type SocialProfile = {
  handle: string;
  displayName: string;
  pronouns?: string;
  role: ProfileRole;
  location: string;
  timezone: string;
  avatarSeed: string;
  headline: string;
  bio: string;
  lookingFor: string;
  tableFocus: number;
  languages: string[];
  availability: string[];
  badges: string[];
  trustScore: number;
  rating: number;
  gamesPlayed: number;
  gamesRun: number;
  responseTime: string;
  friendHandles: string[];
  playedWith: Array<{ handle: string; name: string; relation: string }>;
  characters: CharacterShowcase[];
  history: SessionHistory[];
  reviews: Array<{ from: string; quote: string; badge: string }>;
};

export const socialProfiles: SocialProfile[] = [
  {
    handle: "raka-dm",
    displayName: "Raka Pradipta",
    pronouns: "he/him",
    role: "DM",
    location: "Jakarta",
    timezone: "WIB",
    avatarSeed: "RP",
    headline: "Cinematic DM for roleplay-heavy heroic fantasy.",
    bio: "Raka runs table dengan pacing rapi, recap singkat, dan session zero yang jelas. Cocok buat player yang suka drama karakter tapi tetap mau tactical stakes.",
    lookingFor: "2 reliable players untuk long campaign D&D 5e setiap Sabtu malam.",
    tableFocus: 8,
    languages: ["Bahasa Indonesia", "English"],
    availability: ["Sabtu malam", "Minggu sore"],
    badges: ["Beginner friendly", "Safety tools", "Roleplay heavy", "Reliable scheduler"],
    trustScore: 96,
    rating: 4.9,
    gamesPlayed: 28,
    gamesRun: 42,
    responseTime: "±4 jam",
    friendHandles: ["maya-ranger", "nara-cleric"],
    playedWith: [
      { handle: "maya-ranger", name: "Maya", relation: "12 sessions together" },
      { handle: "nara-cleric", name: "Nara", relation: "6 sessions together" },
      { handle: "dimas-warlock", name: "Dimas", relation: "Current party" },
    ],
    characters: [
      {
        name: "Valen Ashcourt",
        ancestry: "Human",
        className: "Paladin",
        level: 9,
        campaign: "Crown of Cinders",
        status: "Retired",
        quote: "Mercy is not weakness. It is discipline.",
        accent: "#C9A84C",
      },
      {
        name: "Eira Moonwell",
        ancestry: "Elf",
        className: "Wizard",
        level: 6,
        campaign: "Silverline Academy",
        status: "Active",
        quote: "Every locked door is an invitation.",
        accent: "#8B5CF6",
      },
    ],
    history: [
      { title: "Shadows Over Eldervale", role: "DM", system: "D&D 5e", sessions: 18, tablemates: ["Maya", "Nara", "Dimas"], completed: false },
      { title: "Crown of Cinders", role: "Player", system: "D&D 5e", sessions: 24, tablemates: ["Aruna", "Bayu", "Maya"], completed: true },
      { title: "One-Shot: The Glass Wyvern", role: "DM", system: "D&D 5e", sessions: 1, tablemates: ["Nara", "Tio", "Lia"], completed: true },
    ],
    reviews: [
      { from: "Maya", quote: "Raka bikin world terasa hidup tanpa bikin player baru tenggelam rules.", badge: "Beginner friendly DM" },
      { from: "Nara", quote: "Pacing stabil, recap jelas, dan selalu cek comfort table.", badge: "Reliable table host" },
    ],
  },
  {
    handle: "maya-ranger",
    displayName: "Maya Suryani",
    pronouns: "she/her",
    role: "Player",
    location: "Bandung",
    timezone: "WIB",
    avatarSeed: "MS",
    headline: "Tactical ranger player who loves party logistics and maps.",
    bio: "Maya suka campaign yang punya eksplorasi, mystery, dan tactical combat. Selalu hadir tepat waktu, rajin catat quest log, dan nyaman bantu newbie baca character sheet.",
    lookingFor: "Campaign online weekday malam, 60% roleplay / 40% combat.",
    tableFocus: 7,
    languages: ["Bahasa Indonesia"],
    availability: ["Selasa malam", "Kamis malam"],
    badges: ["Reliable player", "Note taker", "Tactical combat", "Party glue"],
    trustScore: 92,
    rating: 4.8,
    gamesPlayed: 36,
    gamesRun: 3,
    responseTime: "±2 jam",
    friendHandles: ["raka-dm", "nara-cleric"],
    playedWith: [
      { handle: "raka-dm", name: "Raka", relation: "12 sessions together" },
      { handle: "nara-cleric", name: "Nara", relation: "9 sessions together" },
      { handle: "rio-bard", name: "Rio", relation: "One-shot party" },
    ],
    characters: [
      {
        name: "Thalia Briarstep",
        ancestry: "Wood Elf",
        className: "Ranger",
        level: 7,
        campaign: "Shadows Over Eldervale",
        status: "Active",
        quote: "If the forest goes quiet, we run.",
        accent: "#35D39A",
      },
      {
        name: "Nyx Valtari",
        ancestry: "Tiefling",
        className: "Rogue",
        level: 5,
        campaign: "Neon Dragon Heist",
        status: "Legendary",
        quote: "I never steal. I redistribute plot hooks.",
        accent: "#F97316",
      },
    ],
    history: [
      { title: "Shadows Over Eldervale", role: "Player", system: "D&D 5e", sessions: 12, tablemates: ["Raka", "Nara", "Dimas"], completed: false },
      { title: "Neon Dragon Heist", role: "Player", system: "D&D 5e", sessions: 8, tablemates: ["Rio", "Ayu", "Tama"], completed: true },
    ],
    reviews: [
      { from: "Raka", quote: "Maya selalu bikin party lebih terorganisir. Catatannya menyelamatkan campaign.", badge: "Reliable player" },
      { from: "Nara", quote: "Enak diajak roleplay dan gak pernah egois di spotlight.", badge: "Great tablemate" },
    ],
  },
  {
    handle: "nara-cleric",
    displayName: "Nara Wicaksono",
    pronouns: "they/them",
    role: "Player & DM",
    location: "Surabaya",
    timezone: "WIB",
    avatarSeed: "NW",
    headline: "Support player, cozy one-shot DM, safety tools advocate.",
    bio: "Nara nyaman jadi healer, face, atau support caster. Sebagai DM, mereka suka cozy mystery dan campaign pendek dengan boundaries jelas.",
    lookingFor: "One-shot bilingual atau mini campaign 4-6 sesi.",
    tableFocus: 8,
    languages: ["Bahasa Indonesia", "English"],
    availability: ["Jumat malam", "Minggu sore"],
    badges: ["Safety first", "Support role", "Cozy DM", "Bilingual"],
    trustScore: 89,
    rating: 4.7,
    gamesPlayed: 24,
    gamesRun: 11,
    responseTime: "±6 jam",
    friendHandles: ["raka-dm", "maya-ranger"],
    playedWith: [
      { handle: "raka-dm", name: "Raka", relation: "6 sessions together" },
      { handle: "maya-ranger", name: "Maya", relation: "9 sessions together" },
      { handle: "lia-druid", name: "Lia", relation: "Current party" },
    ],
    characters: [
      {
        name: "Brother Sable",
        ancestry: "Half-Elf",
        className: "Cleric",
        level: 8,
        campaign: "Lanterns of Maritam",
        status: "Active",
        quote: "We do not leave ghosts unnamed.",
        accent: "#60A5FA",
      },
      {
        name: "Pip of the Blue Kettle",
        ancestry: "Halfling",
        className: "Bard",
        level: 4,
        campaign: "The Honeycake Murders",
        status: "Retired",
        quote: "Tea first. Interrogation second.",
        accent: "#FDE68A",
      },
    ],
    history: [
      { title: "Lanterns of Maritam", role: "Player", system: "D&D 5e", sessions: 10, tablemates: ["Maya", "Lia", "Dimas"], completed: false },
      { title: "The Honeycake Murders", role: "DM", system: "D&D 5e", sessions: 5, tablemates: ["Raka", "Ayu", "Rio"], completed: true },
    ],
    reviews: [
      { from: "Maya", quote: "Nara bikin table aman dan hangat. Support role-nya selalu meaningful.", badge: "Great support player" },
      { from: "Raka", quote: "One-shot Nara rapi, lucu, dan semua player dapet moment.", badge: "Cozy DM" },
    ],
  },
];

export function getSocialProfile(handle: string) {
  return socialProfiles.find((profile) => profile.handle === handle);
}

export function getProfileByDisplayName(displayName: string) {
  const normalized = displayName.toLowerCase();
  return socialProfiles.find((profile) => normalized.includes(profile.displayName.split(" ")[0].toLowerCase()));
}
