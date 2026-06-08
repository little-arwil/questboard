"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  type AnalyticsProperties,
  type QuestBoardAnalyticsEvent,
  trackQuestBoardEvent,
} from "@/lib/analytics";

type TrackedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  eventName: QuestBoardAnalyticsEvent;
  eventProperties?: AnalyticsProperties;
};

export function TrackedButton({
  children,
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedButtonProps) {
  return (
    <button
      {...props}
      onClick={(event) => {
        trackQuestBoardEvent(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
