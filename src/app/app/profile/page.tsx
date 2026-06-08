import { Check, Languages, ShieldCheck, Swords } from "lucide-react";
import { AppPageHeader } from "@/components/prototype/AppShell";
import { profileChecklist } from "@/data/appMockData";

const availabilityOptions = ["Jumat malam", "Sabtu malam", "Minggu siang", "Weekday"];
const languageOptions = ["Bahasa Indonesia", "English", "Bilingual"];
const safetyOptions = ["Lines and veils", "Fade to black", "No PvP surprise", "Debrief after intense scenes"];

export default function ProfileSetupPage() {
  return (
    <>
      <AppPageHeader
        eyebrow="Player Profile"
        title="Set expectations before you apply."
        body="This mock profile setup shows the data QuestBoard would use to calculate campaign compatibility. Nothing is saved yet."
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_0.65fr]">
        <form className="glass-panel grid gap-5 rounded-lg p-5 sm:p-6 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Display name
            </span>
            <input
              defaultValue="Awan"
              className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-4 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Preferred role
            </span>
            <select className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30">
              <option>Player</option>
              <option>DM</option>
              <option>Both</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Experience
            </span>
            <select className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30">
              <option>Beginner</option>
              <option>Mixed</option>
              <option>Veteran</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Timezone
            </span>
            <input
              defaultValue="Asia/Jakarta (WIB)"
              className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-4 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30"
            />
          </label>

          <fieldset className="md:col-span-2">
            <legend className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              Availability
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {availabilityOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 p-3 text-sm font-semibold text-parchment/78"
                >
                  <input type="checkbox" defaultChecked={option.includes("Sabtu")} className="size-4 accent-emerald" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              <Languages className="size-4 text-gold" aria-hidden="true" />
              Languages
            </legend>
            <div className="grid gap-3">
              {languageOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 p-3 text-sm font-semibold text-parchment/78"
                >
                  <input type="checkbox" defaultChecked={option === "Bahasa Indonesia"} className="size-4 accent-emerald" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              <ShieldCheck className="size-4 text-emerald" aria-hidden="true" />
              Safety preferences
            </legend>
            <div className="grid gap-3">
              {safetyOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 p-3 text-sm font-semibold text-parchment/78"
                >
                  <input type="checkbox" defaultChecked className="size-4 accent-emerald" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <section className="md:col-span-2">
            <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
              <Swords className="size-4 text-violet" aria-hidden="true" />
              Playstyle
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Roleplay", "60%"],
                ["Combat", "30%"],
                ["Exploration", "10%"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 bg-white/6 p-4">
                  <p className="text-sm font-black text-white">{label}</p>
                  <p className="mt-2 text-2xl font-black text-emerald">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-md bg-ember px-6 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal md:col-span-2"
          >
            Save Profile Preview
          </button>
        </form>

        <aside className="glass-panel rounded-lg p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-normal text-white">Profile completeness</h2>
          <ul className="mt-6 grid gap-3">
            {profileChecklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-bold text-parchment/78">
                <span className="grid size-6 place-items-center rounded-full bg-emerald/14 text-emerald">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
