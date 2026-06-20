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

type RouteContext = { params: Promise<{ id: string }> };

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
    dmHandle: row.dm_handle ?? undefined,
    reviews: row.reviews ?? [],
    location: row.location ?? undefined,
    commitment: row.commitment ?? undefined,
    safetyTools: row.safety_tools ?? undefined,
    featured: row.featured,
    playstyleMix: row.playstyle_mix ?? [],
  };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const mockCampaign = mockCampaigns.find((campaign) => campaign.id === id);
  const supabase = createSupabaseServerClient();

  if (getMissingSupabaseEnvVars().length || !supabase) {
    if (!mockCampaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    return NextResponse.json({ campaign: mockCampaign, source: "mock" });
  }

  const { data, error } = await supabase
    .from(LFG_CAMPAIGNS_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[lfg/campaigns/:id] Supabase read failed", error);
    if (!mockCampaign) return NextResponse.json({ error: "Campaign backend unavailable" }, { status: 503 });
    return NextResponse.json({ campaign: mockCampaign, source: "mock", error: "Campaign backend unavailable" });
  }

  if (!data) {
    if (!mockCampaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    return NextResponse.json({ campaign: mockCampaign, source: "mock" });
  }

  return NextResponse.json({ campaign: rowToCampaign(data as LfgCampaignRow), source: "supabase" });
}
