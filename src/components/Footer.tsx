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
        <nav className="flex flex-wrap gap-5 text-sm font-bold text-parchment/62" aria-label="Footer">
          <a href="/feedback" className="transition hover:text-ember">
            Feedback
          </a>
          <a href="#" className="transition hover:text-ember">
            Privacy
          </a>
          <a href="#" className="transition hover:text-ember">
            Terms
          </a>
          <a href="#" className="transition hover:text-ember">
            Community Guidelines
          </a>
        </nav>
      </div>
    </footer>
  );
}
