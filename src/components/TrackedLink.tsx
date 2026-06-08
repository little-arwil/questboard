"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  type AnalyticsProperties,
  type QuestBoardAnalyticsEvent,
  trackQuestBoardEvent,
} from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventName: QuestBoardAnalyticsEvent;
  eventProperties?: AnalyticsProperties;
};

export function TrackedLink({
  children,
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackQuestBoardEvent(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
