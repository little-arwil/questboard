import { AppPageHeader } from "@/components/prototype/AppShell";
import { SessionZeroPanel } from "@/components/prototype/SessionZeroPanel";

const campaignTypes = ["Campaign panjang", "One-shot", "Mini campaign"];
const tableTools = ["Discord + Roll20", "Discord + Foundry", "Offline table", "Hybrid"];

export default function CreateCampaignPage() {
  return (
    <>
      <AppPageHeader
        eyebrow="DM Tools"
        title="Draft a campaign listing without opening the floodgates."
        body="A static DM creation flow for shaping table expectations before applications arrive. No data is saved in this prototype."
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
        <form className="glass-panel grid gap-5 rounded-lg p-5 sm:p-6 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Campaign title
            </span>
            <input
              defaultValue="Moonlit Vault of Kertala"
              className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-4 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Campaign type
            </span>
            <select className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30">
              {campaignTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Tools
            </span>
            <select className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30">
              {tableTools.map((tool) => (
                <option key={tool}>{tool}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Schedule
            </span>
            <input
              defaultValue="Sabtu, 19:30 WIB"
              className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-4 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Seats
            </span>
            <input
              defaultValue="4 players"
              className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-4 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Campaign pitch
            </span>
            <textarea
              defaultValue="A moonlit heist through a sealed temple where every chamber asks the party what they are willing to risk."
              rows={5}
              className="w-full rounded-md border border-white/12 bg-charcoal/78 px-4 py-3 text-sm font-semibold leading-6 text-white outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30"
            />
          </label>

          <fieldset className="md:col-span-2">
            <legend className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Table expectations
            </legend>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Beginner-friendly",
                "Roleplay-heavy",
                "No surprise PvP",
                "Session recap after every game",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 p-3 text-sm font-semibold text-parchment/78"
                >
                  <input type="checkbox" defaultChecked className="size-4 accent-emerald" />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-md bg-ember px-6 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal md:col-span-2"
          >
            Preview Listing
          </button>
        </form>

        <SessionZeroPanel />
      </section>
    </>
  );
}
