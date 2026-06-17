"use client";

import { useState } from "react";
import { Dice5, FlaskConical, Search, Menu, X } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { navLinks } from "@/data/mockData";

function CompassLogo({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="18" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="12" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 3" />
      <polygon points="20,4 22,18 20,22 18,18" fill="#C9A84C" />
      <polygon points="20,36 22,22 20,18 18,22" fill="#7A6030" />
      <polygon points="4,20 18,18 22,20 18,22" fill="#C9A84C" />
      <polygon points="36,20 22,18 18,20 22,22" fill="#7A6030" />
      <circle cx="20" cy="20" r="2.5" fill="#C9A84C" />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-[rgba(8,5,3,0.92)] backdrop-blur-[12px]" style={{ height: "68px" }}>
      <nav
        className="mx-auto flex h-full w-full items-center justify-between px-5 sm:px-8 lg:px-[48px]"
        aria-label="Navigasi utama"
      >
        <a href="#" className="flex items-center gap-[10px] font-display text-lg font-bold text-[#F0EAD6] no-underline sm:text-xl">
          <CompassLogo className="size-[32px] sm:size-[36px]" />
          QuestBoard
        </a>

        {/* Center nav — desktop only */}
        <ul className="m-0 hidden list-none gap-[36px] p-0 lg:flex">
          {navLinks.map((link) =>
            link.href === "#join-beta" ? (
              <TrackedLink
                key={`${link.href}-${link.label}`}
                href={link.href}
                eventName="join_beta_click"
                eventProperties={{ location: "navbar" }}
                className="text-sm text-text-muted no-underline transition hover:text-[#F0EAD6]"
              >
                {link.label}
              </TrackedLink>
            ) : (
              <li key={`${link.href}-${link.label}`}>
                <a
                  href={link.href}
                  className="text-sm text-text-muted no-underline transition hover:text-[#F0EAD6]"
                >
                  {link.label}
                </a>
              </li>
            ),
          )}
        </ul>

        {/* Action buttons — desktop only */}
        <div className="hidden items-center gap-[12px] lg:flex">
          <a
            href="/aethermoor/"
            className="inline-flex items-center gap-[8px] rounded-[4px] border border-violet bg-transparent px-[18px] py-[8px] text-sm font-medium text-violet no-underline transition hover:bg-[rgba(139,92,246,0.14)]"
          >
            <Dice5 className="size-3.5" aria-hidden="true" />
            Mainkan
          </a>
          <a
            href="/app"
            className="inline-flex items-center gap-[8px] rounded-[4px] border border-gold bg-transparent px-[18px] py-[8px] text-sm font-medium text-gold no-underline transition hover:bg-[rgba(201,168,76,0.12)]"
          >
            <FlaskConical className="size-3.5" aria-hidden="true" />
            Coba Prototype
          </a>
          <a
            href="/lfg"
            className="inline-flex items-center gap-[8px] rounded-[4px] border border-gold bg-transparent px-[18px] py-[8px] text-sm font-medium text-gold no-underline transition hover:bg-[rgba(201,168,76,0.12)]"
          >
            <Search className="size-3.5" aria-hidden="true" />
            Cari Table
          </a>
        </div>

        {/* Mobile: quick-play + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="/aethermoor/"
            aria-label="Mainkan Aethermoor"
            className="inline-flex items-center gap-[6px] rounded-[4px] border border-violet bg-transparent px-3 py-2 text-sm font-medium text-violet no-underline transition hover:bg-[rgba(139,92,246,0.14)]"
          >
            <Dice5 className="size-4" aria-hidden="true" />
            Mainkan
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-[4px] border border-gold/40 text-gold transition hover:bg-[rgba(201,168,76,0.12)]"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="border-t border-gold/20 bg-[rgba(8,5,3,0.98)] backdrop-blur-[12px] lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <a
                key={`m-${link.href}-${link.label}`}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[6px] px-3 py-3 text-sm text-text-muted no-underline transition hover:bg-[rgba(201,168,76,0.08)] hover:text-[#F0EAD6]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href="/app"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-gold bg-transparent px-4 py-3 text-sm font-medium text-gold no-underline transition hover:bg-[rgba(201,168,76,0.12)]"
              >
                <FlaskConical className="size-4" aria-hidden="true" />
                Prototype
              </a>
              <a
                href="/lfg"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-gold bg-transparent px-4 py-3 text-sm font-medium text-gold no-underline transition hover:bg-[rgba(201,168,76,0.12)]"
              >
                <Search className="size-4" aria-hidden="true" />
                Cari Table
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
