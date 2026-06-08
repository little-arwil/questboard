"use client";

import { track } from "@vercel/analytics";

export type QuestBoardAnalyticsEvent =
  | "join_beta_click"
  | "waitlist_submit_success"
  | "role_toggle_change"
  | "campaign_filter_click"
  | "hero_secondary_cta_click";

export type AnalyticsProperties = Record<string, boolean | number | string>;

export function trackQuestBoardEvent(
  eventName: QuestBoardAnalyticsEvent,
  properties?: AnalyticsProperties,
) {
  track(eventName, properties);
}
