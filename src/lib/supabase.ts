import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const WAITLIST_TABLE = "waitlist";
export const FEEDBACK_TABLE = "feedback";

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
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
