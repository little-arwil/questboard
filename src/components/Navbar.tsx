"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LottieLogo } from "@/components/LottieLogo";

const navItems = [
  { label: "Cari Table", href: "/lfg" },
  { label: "Untuk DM", href: "/app/dm/create-campaign" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Feedback", href: "/feedback" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3 no-underline" aria-label="QuestBoard home">
          <div className="grid size-10 place-items-center rounded-md border border-gold/25 bg-gold/10">
            <LottieLogo className="size-7" ariaLabel="QuestBoard logo" />
          </div>
          <div>
            <span className="block text-[1.05rem] font-bold tracking-[0.04em] text-[#F0EAD6]">QuestBoard</span>
            <span className="hidden text-[0.65rem] uppercase tracking-[0.18em] text-text-muted sm:block">Find real D&D tables</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-semibold text-text-muted no-underline transition hover:text-gold">
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/app/dm/create-campaign"
            className="inline-flex items-center rounded-[6px] border border-gold/35 px-[18px] py-[9px] text-sm font-semibold text-gold no-underline transition hover:bg-gold/10"
          >
            Buat Campaign
          </a>
          <a
            href="/lfg"
            className="inline-flex items-center rounded-[6px] bg-gold px-[18px] py-[9px] text-sm font-bold text-[#0A0806] no-underline transition hover:-translate-y-[1px] hover:bg-gold-light"
          >
            Cari Table
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-md border border-white/10 bg-white/5 text-parchment lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-charcoal/96 px-5 py-5 lg:hidden">
          <div className="mx-auto grid max-w-[420px] gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-parchment no-underline"
              >
                {item.label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a href="/app/dm/create-campaign" onClick={() => setOpen(false)} className="rounded-md border border-gold/35 px-4 py-3 text-center text-sm font-bold text-gold no-underline">
                Buat Campaign
              </a>
              <a href="/lfg" onClick={() => setOpen(false)} className="rounded-md bg-gold px-4 py-3 text-center text-sm font-bold text-charcoal no-underline">
                Cari Table
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
