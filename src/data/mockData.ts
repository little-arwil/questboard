import {
  CalendarDays,
  ClipboardCheck,
  Compass,
  Ghost,
  LayoutDashboard,
  ListChecks,
  MessageSquareWarning,
  ScrollText,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Untuk Player", href: "#role-toggle" },
  { label: "Untuk DM", href: "#role-toggle" },
  { label: "Fitur", href: "#fitur" },
  { label: "Join Beta", href: "#join-beta" },
];

export const heroCampaign = {
  campaign: "Shadows Over Eldervale",
  matchScore: "92%",
  schedule: "Sabtu malam",
  format: "Online",
  tools: "Discord + Roll20",
  tags: ["Beginner-friendly", "Roleplay-heavy", "Bahasa Indonesia"],
};

export const problems = [
  "Discord/forum sering berantakan",
  "Jadwal susah cocok",
  "Player dan DM sering beda ekspektasi",
  "Newbie bingung mulai dari mana",
  "Campaign gampang bubar kalau session zero dilewati",
];

export const howItWorks = [
  {
    title: "Buat profil table kamu",
    body: "Isi jadwal, timezone, bahasa, tools, gaya main, dan batasan table sebelum apply.",
  },
  {
    title: "Dapatkan match berdasarkan kompatibilitas",
    body: "QuestBoard menampilkan campaign dan applicant dengan sinyal kecocokan yang mudah dibaca.",
  },
  {
    title: "Join party yang sudah siap session zero",
    body: "Masuk ke table dengan ekspektasi yang sudah jelas, bukan tebak-tebakan di chat panjang.",
  },
];

export const roleBenefits = {
  player: [
    "Cari campaign beginner-friendly",
    "Filter berdasarkan jadwal, bahasa, timezone, tone, dan playstyle",
    "Lihat ekspektasi campaign sebelum apply",
    "Hindari table yang tidak cocok dengan gaya main kamu",
  ],
  dm: [
    "Buka one-shot atau campaign",
    "Screening applicant berdasarkan match score",
    "Lihat availability dan preferensi player",
    "Gunakan session zero checklist",
  ],
};

export const filters = [
  { label: "Hari", options: ["Sabtu", "Jumat", "Minggu", "Weekday"] },
  { label: "Bahasa", options: ["Bahasa Indonesia", "English", "Bilingual"] },
  { label: "Experience", options: ["Beginner", "Mixed", "Veteran"] },
  { label: "Playstyle", options: ["Roleplay-heavy", "Balanced", "Combat-heavy"] },
  { label: "Format", options: ["Online", "Offline", "Hybrid"] },
];

export const matchingCampaign = {
  campaign: "Shadows Over Eldervale",
  dm: "Raka",
  system: "D&D 5e",
  tone: "Mystery fantasy",
  schedule: "Sabtu, 19:30 WIB",
  matchScore: "92%",
};

export const compatibilityReasons = [
  "Jadwal cocok Sabtu malam",
  "Beginner-friendly",
  "Roleplay-heavy",
  "Bahasa Indonesia",
  "Discord + Roll20",
];

export const playstyleBars = [
  { label: "Roleplay", value: 60, tone: "bg-violet" },
  { label: "Combat", value: 30, tone: "bg-gold" },
  { label: "Exploration", value: 10, tone: "bg-emerald" },
];

export const features = [
  {
    title: "Smart session matching",
    body: "Cocokkan jadwal, timezone, bahasa, dan preferensi table dalam satu score.",
    icon: Sparkles,
  },
  {
    title: "Availability calendar",
    body: "Lihat slot main yang realistis sebelum ngobrol panjang dengan party.",
    icon: CalendarDays,
  },
  {
    title: "Player & DM profiles",
    body: "Profil ringkas untuk gaya main, pengalaman, tools, dan ekspektasi.",
    icon: UsersRound,
  },
  {
    title: "Campaign listings",
    body: "One-shot dan campaign panjang tampil seperti quest yang siap diambil.",
    icon: ScrollText,
  },
  {
    title: "Application dashboard",
    body: "Pantau applicant, status apply, dan sinyal kecocokan tanpa spreadsheet.",
    icon: LayoutDashboard,
  },
  {
    title: "Session zero checklist",
    body: "Bantu table sepakat soal tone, batasan, rules, dan attendance policy.",
    icon: ClipboardCheck,
  },
  {
    title: "Safety preferences",
    body: "Tandai boundaries dan topik sensitif agar ekspektasi table lebih aman.",
    icon: ShieldCheck,
  },
  {
    title: "Anti-ghosting signals",
    body: "Sinyal komitmen dan availability membantu mengurangi campaign yang cepat bubar.",
    icon: Ghost,
  },
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

export const problemIcon = MessageSquareWarning;
export const compassIcon = Compass;
export const checklistIcon = ListChecks;
