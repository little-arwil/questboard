import Link from "next/link";
import { Dice5, Search, ShieldCheck, Sparkles } from "lucide-react";
import { appNavLinks } from "@/data/appMockData";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-charcoal text-parchment">
      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-charcoal/88 backdrop-blur-xl">
        <nav className="quest-container flex min-h-16 flex-wrap items-center justify-between gap-3 py-3" aria-label="App navigation">
          <Link href="/app" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md border border-gold/40 bg-gold/10 text-ember shadow-gold-glow transition group-hover:scale-105">
              <Dice5 className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-black tracking-normal text-white">QuestBoard</span>
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-emerald">
                App prototype
              </span>
            </span>
          </Link>

          <div className="flex w-full gap-2 overflow-x-auto pb-1 lg:w-auto lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
            {appNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-md border border-white/10 bg-white/6 px-3 py-2 text-xs font-black text-parchment/74 transition hover:border-gold/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <main className="quest-container pb-16 pt-28 sm:pt-32">{children}</main>

      <aside className="fixed bottom-4 right-4 z-30 hidden max-w-xs rounded-lg border border-emerald/24 bg-charcoal-2/92 p-4 shadow-emerald-glow backdrop-blur-xl xl:block">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 size-5 text-emerald" aria-hidden="true" />
          <div>
            <p className="text-sm font-black text-white">Mock-only MVP</p>
            <p className="mt-1 text-xs leading-5 text-parchment/62">
              No auth, no real database, and all campaign flows use static prototype data.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function AppPageHeader({
  eyebrow,
  title,
  body,
  action,
}: {
  eyebrow: string;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="grid gap-5 py-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-gold">
          <Sparkles className="size-4" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-normal text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-parchment/72">{body}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </section>
  );
}

export function AppSearchButton() {
  return (
    <Link
      href="/app/campaigns"
      className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-ember px-5 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
    >
      <Search className="size-4" aria-hidden="true" />
      Browse Campaigns
    </Link>
  );
}
