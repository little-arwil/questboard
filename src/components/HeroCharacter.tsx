"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

type CursorTarget = {
  x: number;
  y: number;
  active: boolean;
};

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

      setMotion({
        x: currentRef.current.x,
        y: currentRef.current.y,
      });

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
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

  const bodyTilt = prefersReducedMotion ? 0 : motion.x * 2.4;
  const headTilt = prefersReducedMotion ? 0 : motion.x * 4.6;
  const wandRotation = prefersReducedMotion ? -11 : -11 + motion.x * 7 + motion.y * 2;
  const glowX = prefersReducedMotion ? 0 : motion.x * 7;
  const glowY = prefersReducedMotion ? 0 : motion.y * 5;

  return (
    <div
      className="pointer-events-auto relative mx-auto aspect-[0.82] w-full max-w-[25rem] select-none sm:max-w-[27rem] lg:max-w-[30rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_54%_32%,rgba(139,92,246,0.24),transparent_28%),radial-gradient(circle_at_48%_58%,rgba(214,169,76,0.16),transparent_34%)] blur-2xl" />
      <div className="absolute inset-x-6 bottom-1 h-16 rounded-full bg-black/42 blur-2xl" />

      <div className="hero-character-idle absolute inset-0 motion-reduce:animate-none">
        <svg
          viewBox="0 0 420 510"
          role="img"
          className="h-full w-full drop-shadow-[0_28px_60px_rgba(0,0,0,0.46)]"
        >
          <defs>
            <linearGradient id="robe" x1="120" x2="292" y1="160" y2="476" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8b5cf6" stopOpacity="0.98" />
              <stop offset="0.48" stopColor="#3a255f" />
              <stop offset="1" stopColor="#141018" />
            </linearGradient>
            <linearGradient id="goldTrim" x1="145" x2="287" y1="180" y2="455" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f4c56a" />
              <stop offset="1" stopColor="#8d6328" />
            </linearGradient>
            <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#fff7d8" />
              <stop offset="0.35" stopColor="#f4c56a" stopOpacity="0.88" />
              <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
            <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="9" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g opacity="0.42">
            <path d="M70 356c35-57 76-84 126-81 72 4 122 40 156 109" fill="none" stroke="#f4c56a" strokeWidth="1.4" strokeDasharray="5 12" />
            <path d="M88 306c45-35 86-48 125-39 49 12 83 40 103 84" fill="none" stroke="#35d39a" strokeWidth="1" strokeDasharray="4 14" />
          </g>

          <g
            style={{
              transform: `translate(${motion.x * 2}px, ${motion.y * 1.5}px) rotate(${bodyTilt}deg)`,
              transformOrigin: "210px 300px",
            }}
          >
            <path d="M149 201c-21 53-38 139-49 258h220c-13-115-32-201-56-258-29 17-71 19-115 0Z" fill="url(#robe)" />
            <path d="M178 215c-10 69-14 150-12 244h24c-2-99 1-177 10-236l-22-8Z" fill="#f2dfb7" opacity="0.12" />
            <path d="M224 221c17 53 31 130 42 238h22c-11-108-27-190-48-246l-16 8Z" fill="#080b0d" opacity="0.28" />
            <path d="M153 211c16 19 34 29 56 29 23 0 42-10 57-30" fill="none" stroke="url(#goldTrim)" strokeWidth="8" strokeLinecap="round" />
            <path d="M121 279c-34 19-54 54-61 104l47 18c8-43 23-69 46-77l-32-45Z" fill="#231936" />
            <path d="M291 267c34 14 57 43 69 87l-42 24c-12-36-29-57-52-62l25-49Z" fill="#1d1728" />
            <path d="M111 374c42 16 77 25 106 27 36 3 72-6 107-28l20 55c-77 39-161 39-252 1l19-55Z" fill="#080b0d" opacity="0.34" />
          </g>

          <g
            style={{
              transform: `translate(${motion.x * 3}px, ${motion.y * 2}px) rotate(${headTilt}deg)`,
              transformOrigin: "209px 151px",
            }}
          >
            <path d="M156 142c9-45 25-78 48-99 26 22 45 54 57 97l-105 2Z" fill="#1d1629" />
            <path d="M171 87c26 11 51 12 75 1" fill="none" stroke="#f4c56a" strokeWidth="8" strokeLinecap="round" opacity="0.78" />
            <path d="M158 135c9-34 28-51 56-51 26 0 45 17 56 51l-14 71c-30 18-61 18-93 0l-5-71Z" fill="#241832" />
            <path d="M174 126c8-21 21-31 39-31s31 10 39 31c-4 35-17 53-39 53s-35-18-39-53Z" fill="#c99661" />
            <path d="M180 135c22-12 45-13 69-2" fill="none" stroke="#322019" strokeWidth="7" strokeLinecap="round" opacity="0.68" />
            <path d="M195 148c5 4 11 4 17 0" fill="none" stroke="#2b1b16" strokeWidth="3" strokeLinecap="round" />
            <path d="M225 148c5 4 11 4 17 0" fill="none" stroke="#2b1b16" strokeWidth="3" strokeLinecap="round" />
            <path d="M203 170c9 5 19 5 29 0" fill="none" stroke="#5a3327" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
            <path d="M164 130c20-24 52-33 95-28-10-23-28-35-54-36-26 2-40 23-41 64Z" fill="#111717" opacity="0.52" />
          </g>

          <g
            style={{
              transform: `rotate(${wandRotation}deg)`,
              transformOrigin: "315px 257px",
            }}
          >
            <path d="M305 303L354 95" stroke="#8d6328" strokeWidth="8" strokeLinecap="round" />
            <path d="M308 303L357 95" stroke="#f2dfb7" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            <path d="M287 287c13 6 25 12 36 20" stroke="#c99661" strokeWidth="16" strokeLinecap="round" />
            <g
              className="hero-orb-pulse motion-reduce:animate-none"
              filter="url(#softGlow)"
              style={{ transform: `translate(${glowX}px, ${glowY}px)` }}
            >
              <circle cx="357" cy="88" r="42" fill="url(#orbGlow)" />
              <circle cx="357" cy="88" r="10" fill="#fff7d8" />
              <circle cx="357" cy="88" r="18" fill="none" stroke="#f4c56a" strokeWidth="1.5" opacity="0.72" />
            </g>
          </g>

          <g className="hero-particles motion-reduce:hidden" opacity="0.7">
            <circle cx="318" cy="112" r="2" fill="#f4c56a" />
            <circle cx="379" cy="132" r="1.8" fill="#35d39a" />
            <circle cx="335" cy="59" r="1.6" fill="#f2dfb7" />
            <circle cx="284" cy="91" r="1.4" fill="#8b5cf6" />
            <circle cx="389" cy="79" r="1.5" fill="#f4c56a" />
          </g>
        </svg>
      </div>
    </div>
  );
}
