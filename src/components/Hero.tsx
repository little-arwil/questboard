"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { HeroCampaignCard } from "@/components/HeroCampaignCard";
import { HeroCharacter } from "@/components/HeroCharacter";
import { TrackedLink } from "@/components/TrackedLink";

export function Hero() {
  const charRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = charRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ paddingTop: "68px" }}>
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/hero/questboard-war-room.png')] bg-cover bg-center brightness-[0.45] saturate-[0.7]" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(10,8,6,0.88)_0%,rgba(10,8,6,0.65)_38%,rgba(10,8,6,0.10)_65%,rgba(10,8,6,0.50)_100%)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-[3] mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-6 py-10 lg:h-[calc(100vh-68px)] lg:flex-row lg:gap-0 lg:px-[60px] lg:py-0">
        {/* LEFT: Headline + CTA + Trust */}
        <div className="w-full max-w-[440px] text-center lg:flex-[0_0_440px] lg:text-left">
          <h1 className="font-display text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-[1.15] text-[#F0EAD6]">
            Temukan table D&amp;D<br />
            yang cocok sebelum
            <br />
            <span className="font-bold text-gold">roll pertama.</span>
          </h1>
          <p className="mt-[18px] mb-[34px] max-w-[360px] text-sm leading-[1.65] text-text-muted">
            QuestBoard membantu player dan DM menemukan campaign yang pas berdasarkan gaya main, jadwal, pengalaman, dan ekspektasi party.
          </p>

          <div className="flex flex-wrap justify-center gap-[14px] lg:justify-start">
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
          <div className="mt-[52px] flex flex-wrap justify-center gap-[36px] lg:justify-start">
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

        {/* CENTER: Character */}
        <div
          ref={charRef}
          className="hidden flex-1 items-end justify-center lg:flex"
          style={{ height: "calc(100vh - 68px)", minHeight: "600px", transition: "transform 0.12s ease-out" }}
        >
          <div className="relative flex h-[92%] w-full max-h-[760px] items-end justify-center">
            {/* Purple glow orb behind character */}
            <div className="absolute bottom-[20%] left-1/2 z-0 size-[300px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(107,63,160,0.4),transparent_70%)] pointer-events-none" />
            <HeroCharacter />
          </div>
        </div>

        {/* RIGHT: Campaign Card */}
        <div className="w-full max-w-[380px] lg:w-[340px] lg:max-w-none lg:flex-[0_0_340px]">
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
