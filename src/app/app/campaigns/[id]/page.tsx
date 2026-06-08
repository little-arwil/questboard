import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MessageCircle, ShieldCheck, UsersRound } from "lucide-react";
import { MatchReasons, PlaystyleBars } from "@/components/prototype/CampaignCard";
import { PlaystyleFocusScale } from "@/components/prototype/PlaystyleFocusScale";
import { SessionZeroPanel } from "@/components/prototype/SessionZeroPanel";
import { campaigns } from "@/data/appMockData";
import { getPlaystyleFocusMatchNote, getPlaystyleFocusOption } from "@/lib/playstyleFocus";

type CampaignDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ id: campaign.id }));
}

export async function generateMetadata({
  params,
}: CampaignDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const campaign = campaigns.find((item) => item.id === id);

  return {
    title: campaign ? `${campaign.title} | QuestBoard` : "Campaign | QuestBoard",
  };
}

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { id } = await params;
  const campaign = campaigns.find((item) => item.id === id);

  if (!campaign) {
    notFound();
  }

  const playstyleFocus = getPlaystyleFocusOption(campaign.playstyleFocus);

  return (
    <>
      <Link
        href="/app/campaigns"
        className="inline-flex items-center gap-2 text-sm font-black text-ember transition hover:text-gold"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to campaigns
      </Link>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <article className="glass-panel rounded-lg p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-gold">
                {campaign.system}
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-normal text-white sm:text-5xl">
                {campaign.title}
              </h1>
              <p className="mt-4 max-w-3xl leading-8 text-parchment/74">
                {campaign.description}
              </p>
            </div>
            <div className="w-full rounded-lg border border-emerald/24 bg-emerald/12 p-4 text-center sm:w-36">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald/78">
                Match score
              </p>
              <p className="mt-2 text-4xl font-black text-emerald">{campaign.matchScore}%</p>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            <InfoRow icon={<UsersRound className="size-4" aria-hidden="true" />} label="DM" value={campaign.dm} />
            <InfoRow icon={<CalendarDays className="size-4" aria-hidden="true" />} label="Schedule" value={`${campaign.day}, ${campaign.time} ${campaign.timezone}`} />
            <InfoRow icon={<MessageCircle className="size-4" aria-hidden="true" />} label="Language" value={campaign.language} />
            <InfoRow icon={<ShieldCheck className="size-4" aria-hidden="true" />} label="Tone" value={campaign.tone} />
            <InfoRow
              icon={<ShieldCheck className="size-4" aria-hidden="true" />}
              label="Table focus"
              value={`${campaign.playstyleFocus} - ${playstyleFocus.label}`}
            />
          </dl>

          <section className="mt-8">
            <PlaystyleFocusScale
              defaultValue={campaign.playstyleFocus}
              name={`${campaign.id}-detail-focus`}
              label="Table Focus"
              readOnly
            />
            <p className="mt-3 rounded-md border border-emerald/18 bg-emerald/8 px-4 py-3 text-sm font-bold text-parchment/82">
              {getPlaystyleFocusMatchNote(campaign.playstyleFocus)}
            </p>
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section>
              <h2 className="text-xl font-black tracking-normal text-white">
                Why this matches
              </h2>
              <div className="mt-4">
                <MatchReasons reasons={campaign.compatibilityReasons} />
              </div>
            </section>
            <section>
              <h2 className="text-xl font-black tracking-normal text-white">
                Playstyle mix
              </h2>
              <div className="mt-4">
                <PlaystyleBars campaign={campaign} />
              </div>
            </section>
          </div>
        </article>

        <aside className="grid gap-5">
          <section className="glass-panel rounded-lg p-5 sm:p-6">
            <h2 className="text-2xl font-black tracking-normal text-white">Apply preview</h2>
            <p className="mt-3 leading-7 text-parchment/70">
              This button is intentionally fake for the prototype. It routes to the application
              preview so the flow is clickable without auth or a database.
            </p>
            <Link
              href="/app/applications"
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-ember px-5 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal"
            >
              Apply to Campaign
            </Link>
          </section>

          <section className="glass-panel rounded-lg p-5 sm:p-6">
            <h2 className="text-2xl font-black tracking-normal text-white">Table expectations</h2>
            <ul className="mt-5 grid gap-3">
              {campaign.expectations.map((expectation) => (
                <li
                  key={expectation}
                  className="rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-parchment/78"
                >
                  {expectation}
                </li>
              ))}
            </ul>
          </section>

          <SessionZeroPanel />
        </aside>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/6 p-4">
      <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-parchment/50">
        <span className="text-gold">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 font-black text-white">{value}</dd>
    </div>
  );
}
