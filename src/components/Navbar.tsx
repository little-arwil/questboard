import { FlaskConical, Search } from "lucide-react";
import { LottieLogo } from "@/components/LottieLogo";
import { TrackedLink } from "@/components/TrackedLink";
import { navLinks } from "@/data/mockData";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ember/12 bg-charcoal/62 backdrop-blur-2xl">
      <nav
        className="quest-container flex h-16 items-center justify-between gap-4"
        aria-label="Navigasi utama"
      >
        <a href="#" className="group flex items-center gap-2" aria-label="QuestBoard home">
          <LottieLogo className="size-9 shrink-0 drop-shadow-[0_0_18px_rgba(244,197,106,0.32)]" />
          <span className="text-lg font-black tracking-normal text-white">QuestBoard</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
            link.href === "#join-beta" ? (
              <TrackedLink
                key={`${link.href}-${link.label}`}
                href={link.href}
                eventName="join_beta_click"
                eventProperties={{ location: "navbar" }}
                className="text-xs font-black uppercase tracking-[0.16em] text-parchment/68 transition hover:text-ember"
              >
                {link.label}
              </TrackedLink>
            ) : (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-xs font-black uppercase tracking-[0.16em] text-parchment/68 transition hover:text-ember"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/app"
            aria-label="Coba clickable prototype QuestBoard"
            className="hidden h-10 items-center justify-center gap-2 rounded-full border border-ember/32 bg-black/28 px-4 text-sm font-black text-ember transition hover:-translate-y-0.5 hover:border-ember/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal xl:inline-flex"
          >
            <FlaskConical className="size-4" aria-hidden="true" />
            Coba Prototype
          </a>
          <a
            href="#campaign-filter"
            aria-label="Cari Table"
            className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-ember/38 bg-black/28 text-sm font-black text-ember transition hover:-translate-y-0.5 hover:border-ember/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal sm:w-auto sm:px-4"
          >
            <Search className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Cari Table</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
