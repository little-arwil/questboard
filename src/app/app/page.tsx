import Link from "next/link";
import { ArrowRight, CalendarDays, ClipboardCheck, Sparkles } from "lucide-react";
import { AppPageHeader, AppSearchButton } from "@/components/prototype/AppShell";
import { CampaignCard } from "@/components/prototype/CampaignCard";
import { SessionZeroPanel } from "@/components/prototype/SessionZeroPanel";
import { applications, campaigns, dashboardStats, profileChecklist } from "@/data/appMockData";

export default function AppDashboardPage() {
  const recommendedCampaigns = campaigns.slice(0, 2);

  return (
    <>
      <AppPageHeader
        eyebrow="Dashboard"
        title="Find the right table before the first roll."
        body="A clickable product mock for matching players and DMs by schedule, language, playstyle, expectations, and campaign format."
        action={<AppSearchButton />}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <article key={stat.label} className="glass-panel rounded-lg p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-parchment/50">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-black text-white">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold text-parchment/62">{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald">
                Recommended
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-white">
                High-match campaigns
              </h2>
            </div>
            <Link
              href="/app/campaigns"
              className="inline-flex items-center gap-2 text-sm font-black text-ember transition hover:text-gold"
            >
              See all
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {recommendedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <section className="glass-panel rounded-lg p-5">
            <div className="flex items-center gap-3">
              <CalendarDays className="size-5 text-gold" aria-hidden="true" />
              <h2 className="text-xl font-black tracking-normal text-white">Next actions</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {applications.map((application) => (
                <Link
                  key={application.campaign}
                  href="/app/applications"
                  className="rounded-md border border-white/10 bg-white/6 p-4 transition hover:border-ember/50"
                >
                  <p className="font-black text-white">{application.campaign}</p>
                  <p className="mt-1 text-sm text-parchment/62">{application.nextStep}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-lg p-5">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-violet" aria-hidden="true" />
              <h2 className="text-xl font-black tracking-normal text-white">Profile progress</h2>
            </div>
            <ul className="mt-5 grid gap-2">
              {profileChecklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-parchment/72">
                  <ClipboardCheck className="size-4 text-emerald" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <div className="mt-10">
        <SessionZeroPanel />
      </div>
    </>
  );
}
