import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, MessageCircle, ShieldCheck, Star, UsersRound, Zap } from "lucide-react";
import { MatchReasons, PlaystyleBars } from "@/components/prototype/CampaignCard";
import { PlaystyleFocusScale } from "@/components/prototype/PlaystyleFocusScale";
import { SessionZeroPanel } from "@/components/prototype/SessionZeroPanel";
import { ApplyWizard } from "@/components/prototype/ApplyWizard";
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

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
  const starSize = size === "sm" ? "size-3.5" : "size-3";
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${
            i < Math.round(rating) ? "fill-gold text-gold" : "fill-none text-white/12"
          }`}
        />
      ))}
    </span>
  );
}

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { id } = await params;
  const campaign = campaigns.find((item) => item.id === id);

  if (!campaign) {
    notFound();
  }

  const playstyleFocus = getPlaystyleFocusOption(campaign.playstyleFocus);
  const reviews = campaign.reviews ?? [];
  const similarCampaigns = campaigns
    .filter((c) => c.id !== campaign.id && Math.abs(c.playstyleFocus - campaign.playstyleFocus) <= 2)
    .slice(0, 3);

  return (
    <>
      <Link
        href="/lfg"
        className="inline-flex items-center gap-2 text-sm font-black text-ember transition hover:text-gold"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to LFG
      </Link>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* LEFT COLUMN — Campaign Details */}
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

          {/* Enhanced Info Grid */}
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            <InfoRow icon={<UsersRound className="size-4" aria-hidden="true" />} label="DM" value={campaign.dm} />
            <InfoRow icon={<CalendarDays className="size-4" aria-hidden="true" />} label="Schedule" value={`${campaign.day}, ${campaign.time} ${campaign.timezone}`} />
            <InfoRow icon={<MessageCircle className="size-4" aria-hidden="true" />} label="Language" value={campaign.language} />
            <InfoRow icon={<ShieldCheck className="size-4" aria-hidden="true" />} label="Safety" value={campaign.safetyTools ?? "Session zero"} />
            <InfoRow icon={<Zap className="size-4" aria-hidden="true" />} label="Format" value={campaign.format} />
            <InfoRow icon={<Clock className="size-4" aria-hidden="true" />} label="Commitment" value={campaign.commitment ?? "Ongoing"} />
            {campaign.location ? (
              <InfoRow icon={<MapPin className="size-4" aria-hidden="true" />} label="Location" value={campaign.location} />
            ) : null}
            <InfoRow
              icon={<Star className="size-4" aria-hidden="true" />}
              label="Table focus"
              value={`${campaign.playstyleFocus} — ${playstyleFocus.label}`}
            />
          </dl>

          {/* Seats info */}
          {campaign.seatsOpen != null && campaign.partySize ? (
            <div className="mt-4 rounded-md border border-emerald/18 bg-emerald/8 px-4 py-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-black text-parchment/80">{campaign.seats}</span>
                <span className="text-xs text-parchment/50">
                  {campaign.seatsOpen} of {campaign.partySize} seats open
                </span>
              </div>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: campaign.partySize }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < campaign.partySize! - campaign.seatsOpen! ? "bg-white/14" : "bg-emerald/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* Roleplay focus */}
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

          {/* Expectations */}
          <section className="mt-8">
            <h2 className="text-xl font-black tracking-normal text-white">Table expectations</h2>
            <ul className="mt-4 grid gap-3">
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

          {/* Session Zero */}
          <div className="mt-8">
            <SessionZeroPanel />
          </div>

          {/* Similar campaigns */}
          {similarCampaigns.length > 0 ? (
            <section className="mt-8 rounded-lg border border-gold/15 bg-gold/5 p-5 sm:p-6">
              <h2 className="text-xl font-black tracking-normal text-white">You might also like</h2>
              <div className="mt-4 grid gap-3">
                {similarCampaigns.map((similar) => (
                  <Link
                    key={similar.id}
                    href={`/app/campaigns/${similar.id}`}
                    className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-4 py-3 transition hover:border-gold/40"
                  >
                    <div>
                      <p className="font-black text-white">{similar.title}</p>
                      <p className="text-xs font-bold text-parchment/55">DM {similar.dm} · {similar.system}</p>
                    </div>
                    <span className="rounded-md bg-emerald/12 px-2 py-1 text-sm font-black text-emerald">
                      {similar.matchScore}% match
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        {/* RIGHT COLUMN — DM Panel + Apply Wizard */}
        <aside className="grid gap-5">
          {/* DM Profile */}
          <section className="glass-panel rounded-lg p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-full border border-gold/35 bg-gradient-to-br from-violet/30 to-charcoal text-3xl font-black text-gold">
                {campaign.dm[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-gold">DM</p>
                {campaign.dmHandle ? (
                  <Link href={`/profile/${campaign.dmHandle}`} className="mt-1 text-xl font-black text-white no-underline transition hover:text-gold sm:text-2xl">
                    {campaign.dm}
                  </Link>
                ) : (
                  <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">{campaign.dm}</h2>
                )}
                {campaign.dmRating ? (
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={campaign.dmRating} />
                    <span className="text-sm font-bold text-gold">{campaign.dmRating.toFixed(1)}</span>
                    {campaign.dmGamesRun ? (
                      <span className="text-xs text-parchment/48">· {campaign.dmGamesRun} games run</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>

            {campaign.dmBio ? (
              <p className="mt-5 leading-7 text-parchment/70">{campaign.dmBio}</p>
            ) : null}

            {campaign.dmResponseTime ? (
              <div className="mt-4 flex items-center gap-2 rounded-md border border-gold/15 bg-gold/8 px-4 py-3 text-sm font-bold text-parchment/72">
                <Zap className="size-4 text-gold" aria-hidden="true" />
                {campaign.dmResponseTime}
              </div>
            ) : null}
          </section>

          {/* Player Reviews */}
          {reviews.length > 0 ? (
            <section className="glass-panel rounded-lg p-5 sm:p-6">
              <h2 className="text-xl font-black tracking-normal text-white">
                Player reviews
              </h2>
              <div className="mt-4 grid gap-4">
                {reviews.map((review, i) => (
                  <div key={i} className="rounded-md border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-white">{review.player}</p>
                      <StarRating rating={review.rating} size="xs" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-parchment/72">&ldquo;{review.quote}&rdquo;</p>
                    <p className="mt-2 text-xs font-bold text-parchment/45">{review.campaignRole}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Apply Wizard */}
          <ApplyWizard campaign={campaign} />
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

