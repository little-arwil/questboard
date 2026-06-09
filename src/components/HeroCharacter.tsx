"use client";

import Image from "next/image";
import { PointerEvent, useEffect, useRef, useState } from "react";

type CursorTarget = {
  x: number;
  y: number;
  active: boolean;
};

const ASSET_BASE = "/characters/quest-mage";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function CharacterLayer({
  src,
  className,
  style,
  priority = false,
}: {
  src: string;
  className: string;
  style?: React.CSSProperties;
  priority?: boolean;
}) {
  return (
    <div className={className} style={style}>
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1280px) 34rem, (min-width: 1024px) 30rem, (min-width: 640px) 26rem, 22rem"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export function HeroCharacter() {
  const prefersReducedMotion = useReducedMotion();
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef<CursorTarget>({ x: 0, y: 0, active: false });
  const currentRef = useRef({ x: 0, y: 0 });
  const [motion, setMotion] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) {
      setMotion({ x: 0, y: 0 });
      return undefined;
    }

    const tick = () => {
      const target = targetRef.current.active ? targetRef.current : { x: 0, y: 0 };
      currentRef.current.x += (target.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (target.y - currentRef.current.y) * 0.08;

      setMotion({ x: currentRef.current.x, y: currentRef.current.y });
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
      y: clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1),
      active: true,
    };
  }

  function handlePointerLeave() {
    targetRef.current.active = false;
  }

  const headTilt = prefersReducedMotion ? 0 : motion.x * 3.2;
  const armRotation = prefersReducedMotion ? 0 : motion.x * 3.8 + motion.y * 1.1;
  const glowX = prefersReducedMotion ? 0 : motion.x * 8;
  const glowY = prefersReducedMotion ? 0 : motion.y * 6;

  return (
    <div
      className="pointer-events-auto relative mx-auto aspect-[0.68] w-full max-w-[22rem] select-none sm:max-w-[25rem] lg:max-w-[29rem] xl:max-w-[32rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_58%_17%,rgba(244,197,106,0.18),transparent_22%),radial-gradient(circle_at_48%_34%,rgba(139,92,246,0.2),transparent_32%),radial-gradient(circle_at_60%_50%,rgba(53,211,154,0.1),transparent_30%)] blur-2xl" />
      <div className="absolute inset-x-[20%] bottom-[2%] h-[9%] rounded-full bg-black/45 blur-2xl" />

      <div className="hero-character-idle absolute inset-0 motion-reduce:animate-none">
        <CharacterLayer
          src={`${ASSET_BASE}/cloak-back.png`}
          className="hero-cloak-sway absolute left-[16%] top-[8%] h-[88%] w-[70%]"
          style={{ transformOrigin: "50% 30%" }}
          priority
        />

        <div className="hero-breathe absolute inset-0 motion-reduce:animate-none">
          <CharacterLayer
            src={`${ASSET_BASE}/body-base.png`}
            className="absolute left-[25%] top-[9%] h-[89%] w-[56%]"
            priority
          />
        </div>

        <CharacterLayer
          src={`${ASSET_BASE}/right-arm-staff.png`}
          className="absolute left-[30%] top-[0%] h-[101%] w-[82%]"
          style={{
            transform: `rotate(${armRotation}deg)`,
            transformOrigin: "41% 62%",
          }}
          priority
        />

        <CharacterLayer
          src={`${ASSET_BASE}/head.png`}
          className="absolute left-[8%] top-[-5%] h-[57%] w-[82%]"
          style={{
            transform: `translate(${motion.x * 3}px, ${motion.y * 2}px) rotate(${headTilt}deg)`,
            transformOrigin: "48% 38%",
          }}
          priority
        />

        <div
          className="hero-orb-pulse absolute left-[70%] top-[4%] z-20 h-[22%] w-[22%] motion-reduce:animate-none"
          style={{ transform: `translate(${glowX}px, ${glowY}px)` }}
        >
          <div className="absolute inset-[-35%] rounded-full bg-[radial-gradient(circle,rgba(244,197,106,0.5)_0%,rgba(139,92,246,0.22)_43%,rgba(139,92,246,0)_76%)] blur-xl" />
          <CharacterLayer
            src={`${ASSET_BASE}/magic-orb.png`}
            className="absolute inset-0"
            priority
          />
        </div>

        <div className="hero-particles motion-reduce:hidden">
          <span className="absolute left-[70%] top-[8%] h-1.5 w-1.5 rounded-full bg-gold/80 blur-[1px]" />
          <span className="absolute left-[80%] top-[14%] h-1 w-1 rounded-full bg-emerald/70 blur-[1px]" />
          <span className="absolute left-[64%] top-[18%] h-1 w-1 rounded-full bg-violet/75 blur-[1px]" />
          <span className="absolute left-[77%] top-[4%] h-1.5 w-1.5 rounded-full bg-parchment/75 blur-[1px]" />
          <span className="absolute left-[86%] top-[9%] h-1 w-1 rounded-full bg-gold/65 blur-[1px]" />
        </div>
      </div>
    </div>
  );
}
