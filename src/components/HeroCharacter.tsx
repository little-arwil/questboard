"use client";

import Image from "next/image";
import { PointerEvent, useEffect, useRef, useState } from "react";

type CursorTarget = {
  x: number;
  y: number;
  active: boolean;
};

const LAYERED_ASSET_BASE = "/characters/quest-mage";

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

function Layer({
  src,
  alt,
  className,
  style,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}) {
  return (
    <div className={className} style={style}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 30rem, (min-width: 640px) 27rem, 24rem" className="h-full w-full object-contain" />
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
      currentRef.current.x += (target.x - currentRef.current.x) * 0.09;
      currentRef.current.y += (target.y - currentRef.current.y) * 0.09;

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

  const bodyTilt = prefersReducedMotion ? 0 : motion.x * 1.8;
  const headTilt = prefersReducedMotion ? 0 : motion.x * 3.8;
  const staffRotation = prefersReducedMotion ? -4 : -4 + motion.x * 5.5 + motion.y * 1.4;
  const armRotation = prefersReducedMotion ? -3 : -3 + motion.x * 3.8 + motion.y * 1.2;
  const glowX = prefersReducedMotion ? 0 : motion.x * 10;
  const glowY = prefersReducedMotion ? 0 : motion.y * 7;
  const torsoShiftX = prefersReducedMotion ? 0 : motion.x * 5;
  const torsoShiftY = prefersReducedMotion ? 0 : motion.y * 3;

  return (
    <div
      className="pointer-events-auto relative mx-auto aspect-[0.75] w-full max-w-[24rem] select-none sm:max-w-[27rem] lg:max-w-[30rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_48%_28%,rgba(139,92,246,0.22),transparent_29%),radial-gradient(circle_at_55%_48%,rgba(214,169,76,0.12),transparent_33%),radial-gradient(circle_at_62%_18%,rgba(53,211,154,0.14),transparent_20%)] blur-2xl" />
      <div className="absolute inset-x-10 bottom-2 h-16 rounded-full bg-black/40 blur-2xl" />

      <div
        className="hero-character-idle absolute inset-0 motion-reduce:animate-none"
        style={{
          transform: `translate(${torsoShiftX}px, ${torsoShiftY}px) rotate(${bodyTilt}deg)`,
          transformOrigin: "50% 58%",
        }}
      >
        <Layer
          src={`${LAYERED_ASSET_BASE}/cloak-back.png`}
          alt="Quest mage cloak back"
          className="hero-cloak-sway absolute inset-0"
          style={{ transformOrigin: "48% 38%" }}
          priority
        />

        <Layer
          src={`${LAYERED_ASSET_BASE}/staff.png`}
          alt="Quest mage staff"
          className="absolute inset-0"
          style={{ transform: `translate3d(0, 0, 0) rotate(${staffRotation}deg)`, transformOrigin: "56% 82%" }}
          priority
        />

        <Layer
          src={`${LAYERED_ASSET_BASE}/body-base.png`}
          alt="Quest mage body"
          className="hero-breathe absolute inset-0"
          style={{ transformOrigin: "50% 58%" }}
          priority
        />

        <Layer
          src={`${LAYERED_ASSET_BASE}/lower-body-boots.png`}
          alt="Quest mage lower body"
          className="absolute inset-0"
          priority
        />

        <Layer
          src={`${LAYERED_ASSET_BASE}/front-tabard.png`}
          alt="Quest mage tabard"
          className="absolute inset-0"
          priority
        />

        <Layer
          src={`${LAYERED_ASSET_BASE}/waist-belt.png`}
          alt="Quest mage belt"
          className="absolute inset-0"
          priority
        />

        <Layer
          src={`${LAYERED_ASSET_BASE}/left-arm.png`}
          alt="Quest mage left arm"
          className="absolute inset-0"
          priority
        />

        <Layer
          src={`${LAYERED_ASSET_BASE}/right-arm-staff.png`}
          alt="Quest mage right arm"
          className="absolute inset-0"
          style={{ transform: `rotate(${armRotation}deg)`, transformOrigin: "57% 64%" }}
          priority
        />

        <Layer
          src={`${LAYERED_ASSET_BASE}/head.png`}
          alt="Quest mage head"
          className="absolute inset-0"
          style={{ transform: `translateX(${motion.x * 4}px) translateY(${motion.y * 2}px) rotate(${headTilt}deg)`, transformOrigin: "49% 34%" }}
          priority
        />

        <Layer
          src={`${LAYERED_ASSET_BASE}/upper-cowl.png`}
          alt="Quest mage upper cowl"
          className="absolute inset-0"
          style={{ transform: `translateX(${motion.x * 3}px) rotate(${headTilt * 0.7}deg)`, transformOrigin: "49% 34%" }}
          priority
        />

        <div
          className="hero-orb-pulse absolute left-[58%] top-[10%] z-20 h-[20%] w-[20%] motion-reduce:animate-none"
          style={{ transform: `translate(${glowX}px, ${glowY}px)` }}
        >
          <div className="absolute inset-[-25%] rounded-full bg-[radial-gradient(circle,rgba(244,197,106,0.48)_0%,rgba(139,92,246,0.22)_42%,rgba(139,92,246,0)_76%)] blur-xl" />
          <Layer
            src={`${LAYERED_ASSET_BASE}/magic-orb.png`}
            alt="Quest mage magic orb"
            className="absolute inset-0"
            priority
          />
        </div>

        <div className="hero-particles motion-reduce:hidden">
          <span className="absolute left-[61%] top-[11%] h-1.5 w-1.5 rounded-full bg-gold/80 blur-[1px]" />
          <span className="absolute left-[68%] top-[15%] h-1 w-1 rounded-full bg-emerald/75 blur-[1px]" />
          <span className="absolute left-[54%] top-[16%] h-1 w-1 rounded-full bg-violet/80 blur-[1px]" />
          <span className="absolute left-[65%] top-[7%] h-1.5 w-1.5 rounded-full bg-parchment/80 blur-[1px]" />
          <span className="absolute left-[71%] top-[10%] h-1 w-1 rounded-full bg-gold/70 blur-[1px]" />
        </div>
      </div>
    </div>
  );
}
