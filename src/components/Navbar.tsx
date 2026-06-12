import { FlaskConical, Search } from "lucide-react";
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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-[rgba(8,5,3,0.92)] backdrop-blur-[12px]" style={{ height: "68px" }}>
      <nav
        className="mx-auto flex h-full w-full items-center justify-between px-[48px]"
        aria-label="Navigasi utama"
      >
        <a href="#" className="flex items-center gap-[10px] font-display text-xl font-bold text-[#F0EAD6] no-underline">
          <CompassLogo className="size-[36px]" />
          QuestBoard
        </a>

        <ul className="m-0 flex list-none gap-[36px] p-0">
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

        <div className="flex items-center gap-[12px]">
          <a
            href="/app"
            className="inline-flex items-center gap-[8px] rounded-[4px] border border-gold bg-transparent px-[18px] py-[8px] text-sm font-medium text-gold no-underline transition hover:bg-[rgba(201,168,76,0.12)]"
          >
            <FlaskConical className="size-3.5" aria-hidden="true" />
            Coba Prototype
          </a>
          <a
            href="#campaign-filter"
            className="inline-flex items-center gap-[8px] rounded-[4px] border border-gold bg-transparent px-[18px] py-[8px] text-sm font-medium text-gold no-underline transition hover:bg-[rgba(201,168,76,0.12)]"
          >
            <Search className="size-3.5" aria-hidden="true" />
            Cari Table
          </a>
        </div>
      </nav>
    </header>
  );
}
