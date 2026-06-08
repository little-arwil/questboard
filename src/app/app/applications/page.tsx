import Link from "next/link";
import { ArrowRight, FileText, Send, ShieldCheck } from "lucide-react";
import { AppPageHeader } from "@/components/prototype/AppShell";
import { applications } from "@/data/appMockData";

export default function ApplicationsPage() {
  return (
    <>
      <AppPageHeader
        eyebrow="Applications"
        title="Preview applications before sending them to a DM."
        body="This page mocks the applicant dashboard: draft status, compatibility score, and table-readiness notes without storing anything."
      />

      <section className="grid gap-5 lg:grid-cols-3">
        {applications.map((application) => (
          <article key={application.campaign} className="glass-panel rounded-lg p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald">
                  {application.status}
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-normal text-white">
                  {application.campaign}
                </h2>
                <p className="mt-2 text-sm font-semibold text-parchment/58">
                  DM {application.dm}
                </p>
              </div>
              <div className="rounded-md bg-emerald/12 px-3 py-2 text-center text-emerald">
                <p className="text-[0.65rem] font-black uppercase">Match</p>
                <p className="text-xl font-black">{application.matchScore}%</p>
              </div>
            </div>
            <p className="mt-5 rounded-md border border-white/10 bg-white/6 p-4 text-sm font-semibold leading-6 text-parchment/78">
              {application.nextStep}
            </p>
            <button
              type="button"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-ember px-4 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
            >
              <Send className="size-4" aria-hidden="true" />
              Fake Submit
            </button>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <article className="glass-panel rounded-lg p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <FileText className="size-5 text-gold" aria-hidden="true" />
            <h2 className="text-2xl font-black tracking-normal text-white">
              Application preview
            </h2>
          </div>
          <div className="mt-6 grid gap-4">
            {[
              ["Why this table", "I like mystery fantasy, roleplay-heavy scenes, and Saturday evening games."],
              ["Availability", "Sabtu malam WIB, with notice if work schedule changes."],
              ["Table expectations", "Session zero, clear boundaries, and no surprise PvP."],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-white/10 bg-white/6 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-parchment/50">
                  {label}
                </p>
                <p className="mt-2 leading-7 text-parchment/78">{value}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="glass-panel rounded-lg p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-emerald" aria-hidden="true" />
            <h2 className="text-2xl font-black tracking-normal text-white">
              Before applying
            </h2>
          </div>
          <ul className="mt-6 grid gap-3">
            {[
              "Read table expectations",
              "Confirm schedule and timezone",
              "Review safety preferences",
              "Prepare one character concept",
            ].map((item) => (
              <li key={item} className="rounded-md border border-white/10 bg-white/6 p-3 text-sm font-semibold text-parchment/78">
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/app/campaigns"
            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ember transition hover:text-gold"
          >
            Back to campaigns
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>
      </section>
    </>
  );
}
