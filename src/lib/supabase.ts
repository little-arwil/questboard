import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const WAITLIST_TABLE = "waitlist";
export const WAITLIST_SOURCE = "landing-page";

export type WaitlistInsert = {
  email: string;
  source?: string;
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
