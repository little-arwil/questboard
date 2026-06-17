import { NextResponse } from "next/server";
import { campaigns as mockCampaigns } from "@/data/appMockData";
import type { Campaign } from "@/data/appMockData";
import {
  createSupabaseServerClient,
  getMissingSupabaseEnvVars,
  LFG_CAMPAIGNS_TABLE,
  type LfgCampaignRow,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

function rowToCampaign(row: LfgCampaignRow): Campaign {
  return {
    id: row.id,
    title: row.title,
    dm: row.dm,
    system: row.system,
    matchScore: row.match_score,
    day: row.day,
    time: row.time,
    timezone: row.timezone,
    language: row.language,
    experience: row.experience,
    playstyle: row.playstyle,
    playstyleFocus: row.playstyle_focus,
    format: row.format,
    tone: row.tone,
    tools: row.tools,
    seats: row.seats,
    seatsOpen: row.seats_open,
    partySize: row.party_size,
    status: row.status,
    description: row.description,
    tags: row.tags ?? [],
    compatibilityReasons: row.compatibility_reasons ?? [],
    expectations: row.expectations ?? [],
    dmRating: row.dm_rating ?? undefined,
    dmGamesRun: row.dm_games_run ?? undefined,
    dmBio: row.dm_bio ?? undefined,
    dmResponseTime: row.dm_response_time ?? undefined,
    reviews: row.reviews ?? [],
    location: row.location ?? undefined,
    commitment: row.commitment ?? undefined,
    safetyTools: row.safety_tools ?? undefined,
    featured: row.featured,
    playstyleMix: row.playstyle_mix ?? [],
  };
}

export async function GET() {
  const missingEnvVars = getMissingSupabaseEnvVars();
  const supabase = createSupabaseServerClient();

  if (missingEnvVars.length || !supabase) {
    return NextResponse.json({ campaigns: mockCampaigns, source: "mock", missingEnvVars }, { status: 200 });
  }

  const { data, error } = await supabase
    .from(LFG_CAMPAIGNS_TABLE)
    .select("*")
    .order("featured", { ascending: false })
    .order("match_score", { ascending: false });

  if (error) {
    console.error("[lfg/campaigns] Supabase read failed", error);
    return NextResponse.json({ campaigns: mockCampaigns, source: "mock", error: "Campaign backend unavailable" }, { status: 200 });
  }

  const campaigns = (data as LfgCampaignRow[] | null)?.map(rowToCampaign) ?? [];

  return NextResponse.json({
    campaigns: campaigns.length ? campaigns : mockCampaigns,
    source: campaigns.length ? "supabase" : "mock",
  });
}
