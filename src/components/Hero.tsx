"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { HeroCampaignCard } from "@/components/HeroCampaignCard";
import { HeroCharacter } from "@/components/HeroCharacter";
import { TrackedLink } from "@/components/TrackedLink";

export function Hero() {
  const charRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<
    { left: number; top: number; size: number; dur: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: 30 + Math.random() * 60,
        size: 1 + Math.random() * 2,
        dur: 3 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    );
  }, []);

  useEffect(() => {
    const el = charRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      el.style.transform = `translate(calc(-50% + ${x}px), ${y}px)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ paddingTop: "68px" }}>
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/hero/questboard-war-room.png')] bg-cover bg-center brightness-[0.45] saturate-[0.7]" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,5,3,0.88)_0%,rgba(8,5,3,0.65)_38%,rgba(8,5,3,0.10)_65%,rgba(8,5,3,0.50)_100%)]" />
      </div>

      {/* ── Ambient floating particles ── */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold opacity-0"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `hero-float-up ${p.dur}s ${p.delay}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* ── Desktop: Character — dominant, zoomed, head safe below navbar ── */}
      <div
        ref={charRef}
        className="absolute left-1/2 top-[68px] z-[1] hidden -translate-x-1/2 lg:block"
        style={{ transition: "transform 0.12s ease-out" }}
      >
        <div className="relative flex h-[150vh] min-h-[1000px] w-[105vh] min-w-[46rem] max-w-[70rem] items-start justify-center">
          {/* Purple glow orb behind character */}
          <div className="pointer-events-none absolute left-1/2 top-[34%] z-0 size-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(107,63,160,0.4),transparent_70%)]" />
          <HeroCharacter />
        </div>
      </div>

      {/* ── Desktop content: left headline + right card, aligned with navbar (48px) ── */}
      <div className="relative z-[3] hidden lg:block">
        {/* LEFT: aligned with navbar logo */}
        <div className="absolute left-[48px] top-1/2 w-[440px] max-w-[34vw] -translate-y-1/2" style={{ top: "calc((100vh - 68px) / 2)" }}>
          <h1 className="font-display text-[clamp(2.4rem,3.6vw,3.4rem)] font-semibold leading-[1.15] text-[#F0EAD6]">
            <span className="block">Temukan Table D&amp;D</span>
            <span className="block">Yang Cocok Sebelum</span>
            <span className="block font-bold text-gold">Roll Pertama.</span>
          </h1>
          <p className="mt-[18px] mb-[34px] max-w-[360px] text-sm leading-[1.65] text-text-muted">
            QuestBoard membantu player dan DM menemukan campaign yang pas berdasarkan gaya main, jadwal, pengalaman, dan ekspektasi party.
          </p>

          <div className="flex flex-wrap gap-[14px]">
            <TrackedLink
              href="#join-beta"
              eventName="join_beta_click"
              eventProperties={{ location: "hero" }}
              className="inline-flex items-center gap-[10px] rounded-[6px] bg-gold px-[26px] py-[14px] text-sm font-semibold text-[#0A0806] transition hover:bg-gold-light hover:-translate-y-[1px]"
            >
              <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
                <polygon points="20,4 22,18 20,22 18,18" fill="currentColor" />
                <polygon points="20,36 22,22 20,18 18,22" fill="currentColor" opacity=".5" />
                <polygon points="4,20 18,18 22,20 18,22" fill="currentColor" />
                <polygon points="36,20 22,18 18,20 22,22" fill="currentColor" opacity=".5" />
                <circle cx="20" cy="20" r="2.5" fill="currentColor" />
              </svg>
              Mulai Quest
            </TrackedLink>
            <a
              href="#campaign-filter"
              className="inline-flex items-center gap-[10px] rounded-[6px] border border-[rgba(240,234,214,0.35)] bg-transparent px-[26px] py-[14px] text-sm font-medium text-[#F0EAD6] transition hover:border-gold hover:bg-[rgba(201,168,76,0.08)]"
            >
              Lihat Campaign
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-[52px] flex flex-wrap gap-x-[36px] gap-y-[20px]">
            <div className="flex items-start gap-[10px]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="shrink-0 opacity-75">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div className="text-xs leading-[1.5] text-text-muted">
                <strong className="block text-sm font-medium text-[#F0EAD6]">Aman &amp; Terpercaya</strong>
                Verifikasi DM &amp; player
              </div>
            </div>
            <div className="flex items-start gap-[10px]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="shrink-0 opacity-75">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <div className="text-xs leading-[1.5] text-text-muted">
                <strong className="block text-sm font-medium text-[#F0EAD6]">Filter Cerdas</strong>
                Cocokkan gaya &amp; jadwal
              </div>
            </div>
            <div className="flex items-start gap-[10px]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="shrink-0 opacity-75">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div className="text-xs leading-[1.5] text-text-muted">
                <strong className="block text-sm font-medium text-[#F0EAD6]">Komunitas Sehat</strong>
                Rating &amp; review nyata
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: campaign card aligned with navbar right edge */}
        <div className="absolute right-[48px] w-[340px] -translate-y-1/2" style={{ top: "calc((100vh - 68px) / 2)" }}>
          <HeroCampaignCard />
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="relative z-[3] mx-auto flex w-full max-w-[440px] flex-col items-center gap-8 px-6 py-10 lg:hidden">
        <div className="w-full text-center">
          <h1 className="font-display text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-[1.15] text-[#F0EAD6]">
            <span className="block">Temukan Table D&amp;D</span>
            <span className="block">Yang Cocok Sebelum</span>
            <span className="block font-bold text-gold">Roll Pertama.</span>
          </h1>
          <p className="mx-auto mt-[18px] mb-[34px] max-w-[360px] text-sm leading-[1.65] text-text-muted">
            QuestBoard membantu player dan DM menemukan campaign yang pas berdasarkan gaya main, jadwal, pengalaman, dan ekspektasi party.
          </p>
          <div className="flex flex-wrap justify-center gap-[14px]">
            <TrackedLink
              href="#join-beta"
              eventName="join_beta_click"
              eventProperties={{ location: "hero" }}
              className="inline-flex items-center gap-[10px] rounded-[6px] bg-gold px-[26px] py-[14px] text-sm font-semibold text-[#0A0806] transition hover:bg-gold-light"
            >
              Mulai Quest
            </TrackedLink>
            <a
              href="#campaign-filter"
              className="inline-flex items-center gap-[10px] rounded-[6px] border border-[rgba(240,234,214,0.35)] bg-transparent px-[26px] py-[14px] text-sm font-medium text-[#F0EAD6] transition hover:border-gold"
            >
              Lihat Campaign
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="w-full max-w-[380px]">
          <HeroCampaignCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[32px] left-1/2 z-10 -translate-x-1/2 text-center">
        <span className="mb-[8px] block text-[0.62rem] uppercase tracking-[0.2em] text-text-muted">Scroll untuk menjelajahi</span>
        <div className="mx-auto size-5 animate-bounce border-r-2 border-b-2 border-gold" style={{ transform: "rotate(45deg)" }} />
      </div>
    </section>
  );
}
