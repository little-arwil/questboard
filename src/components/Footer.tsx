import { MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal py-10">
      <div className="quest-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#" className="text-xl font-black tracking-normal text-white">
            QuestBoard
          </a>
          <p className="mt-2 text-sm font-semibold text-parchment/56">
            Not affiliated with Wizards of the Coast.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-sm font-bold text-parchment/62" aria-label="Footer">
          <a
            href="/feedback"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-violet/30 bg-violet/10 px-4 text-sm font-black text-parchment transition hover:-translate-y-0.5 hover:border-violet/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-charcoal"
          >
            <MessageCircle className="size-4 text-violet" aria-hidden="true" />
            Feedback Komunitas
          </a>
          <a href="#" className="px-2 transition hover:text-ember">
            Privacy
          </a>
          <a href="#" className="px-2 transition hover:text-ember">
            Terms
          </a>
          <a href="#" className="px-2 transition hover:text-ember">
            Community Guidelines
          </a>
        </nav>
      </div>
    </footer>
  );
}
