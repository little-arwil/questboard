"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

type LottieLogoProps = {
  className?: string;
  ariaLabel?: string;
};

export function LottieLogo({
  className = "size-10",
  ariaLabel = "QuestBoard animated logo",
}: LottieLogoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animation: AnimationItem | null = null;
    let cancelled = false;

    async function loadLogo() {
      const lottie = (await import("lottie-web")).default;

      if (!containerRef.current || cancelled) {
        return;
      }

      animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lottie/questboard-logo.json",
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
          progressiveLoad: true,
        },
      });
    }

    loadLogo();

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label={ariaLabel}
    />
  );
}
