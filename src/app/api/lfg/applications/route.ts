import { NextRequest, NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  getMissingSupabaseEnvVars,
  LFG_APPLICATIONS_TABLE,
  type LfgApplicationInsert,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

type InsertBody = {
  campaign_id: string;
  role: string;
  schedule_confirmation: string;
  note: string | null;
  contact_email: string | null;
};

const ALLOWED_ROLES = ["Player", "Player (New)", "Veteran player", "Flex role"];

export async function POST(request: NextRequest) {
  const body: InsertBody | null = await request.json().catch(() => null);

  if (!body || !body.campaign_id || !body.role || !body.schedule_confirmation) {
    return NextResponse.json({ error: "Missing required fields (campaign_id, role, schedule_confirmation)" }, { status: 400 });
  }

  if (!ALLOWED_ROLES.includes(body.role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  if (body.schedule_confirmation.length < 2 || body.schedule_confirmation.length > 120) {
    return NextResponse.json({ error: "schedule_confirmation must be 2–120 characters" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  if (getMissingSupabaseEnvVars().length || !supabase) {
    return NextResponse.json({
      success: true,
      source: "mock",
      note: "Backend not configured — application recorded locally only.",
      application: { id: crypto.randomUUID(), ...body, source: "lfg-prototype" },
    }, { status: 200 });
  }

  const application: LfgApplicationInsert = {
    campaign_id: body.campaign_id,
    role: body.role,
    schedule_confirmation: body.schedule_confirmation,
    note: body.note?.trim() || null,
    contact_email: body.contact_email?.trim() || null,
    source: "lfg-prototype",
  };

  const { data, error } = await supabase
    .from(LFG_APPLICATIONS_TABLE)
    .insert(application)
    .select()
    .maybeSingle();

  if (error) {
    console.error("[lfg/applications] Supabase insert failed", error);
    return NextResponse.json({ error: "Failed to submit application", details: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    source: "supabase",
    application: data,
  }, { status: 201 });
}
