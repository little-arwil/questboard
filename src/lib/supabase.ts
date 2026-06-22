import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const WAITLIST_TABLE = "waitlist";
export const FEEDBACK_TABLE = "feedback";
export const LFG_CAMPAIGNS_TABLE = "lfg_campaigns";
export const LFG_APPLICATIONS_TABLE = "lfg_applications";
export const CHARACTERS_TABLE = "characters";

export type WaitlistRole = "player" | "dm" | "both";
export type WaitlistExperienceLevel = "new" | "some" | "experienced";
export type WaitlistPreferredFormat = "online" | "offline" | "hybrid";

export type WaitlistInsert = {
  email: string;
  role: WaitlistRole;
  experience_level: WaitlistExperienceLevel;
  preferred_format: WaitlistPreferredFormat;
  availability: string;
};

export type FeedbackRole = "player" | "dm" | "both";

export type FeedbackInsert = {
  role: FeedbackRole;
  rating: number;
  most_useful: string;
  most_confusing: string;
  must_have_feature: string;
  email: string | null;
  source: "feedback-page";
};

export type LfgCampaignRow = {
  id: string;
  title: string;
  dm: string;
  system: string;
  match_score: number;
  day: string;
  time: string;
  timezone: string;
  language: string;
  experience: string;
  playstyle: string;
  playstyle_focus: number;
  format: string;
  tone: string;
  tools: string;
  seats: string;
  seats_open: number;
  party_size: number;
  status: string;
  description: string;
  tags: string[];
  compatibility_reasons: string[];
  expectations: string[];
  dm_rating: number | null;
  dm_games_run: number | null;
  dm_bio: string | null;
  dm_response_time: string | null;
  dm_handle: string | null;
  reviews: Array<{ player: string; quote: string; rating: number; campaignRole: string }>;
  location: string | null;
  commitment: string | null;
  safety_tools: string | null;
  featured: boolean;
  playstyle_mix: Array<{ label: string; value: number; tone: string }>;
};

export type LfgApplicationInsert = {
  campaign_id: string;
  role: string;
  schedule_confirmation: string;
  note: string | null;
  contact_email: string | null;
  source: "lfg-prototype";
};

export function getMissingSupabaseEnvVars(): string[] {
  const requiredEnvVars: Array<[string, string | undefined]> = [
    ["NEXT_PUBLIC_SUPABASE_URL", supabaseUrl],
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY", supabaseAnonKey],
  ];

  return requiredEnvVars.filter(([, value]) => !value).map(([name]) => name);
}

export function createSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

export function createSupabaseServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}
