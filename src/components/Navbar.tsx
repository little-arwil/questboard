import { Search } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { navLinks } from "@/data/mockData";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal/78 backdrop-blur-xl">
      <nav
        className="quest-container flex h-16 items-center justify-between gap-4"
        aria-label="Navigasi utama"
      >
        <a href="#" className="group flex items-center gap-3" aria-label="QuestBoard home">
          <span className="grid size-10 place-items-center rounded-md border border-gold/40 bg-gold/10 text-lg font-black text-ember shadow-gold-glow transition group-hover:scale-105">
            Q
          </span>
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
                className="text-sm font-medium text-parchment/72 transition hover:text-ember"
              >
                {link.label}
              </TrackedLink>
            ) : (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-sm font-medium text-parchment/72 transition hover:text-ember"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        <a
          href="#campaign-filter"
          aria-label="Cari Table"
          className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-ember text-sm font-bold text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal sm:w-auto sm:px-4"
        >
          <Search className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Cari Table</span>
        </a>
      </nav>
    </header>
  );
}
