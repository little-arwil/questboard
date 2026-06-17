"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle, Clock, Globe, Heart, MapPin, MessageCircle, ShieldCheck, Star, Sword, UsersRound } from "lucide-react";
import type { SocialProfile, SessionHistory, CharacterShowcase } from "@/data/socialProfiles";

function ProfileHero({ profile }: { profile: SocialProfile }) {
  return (
    <div className="border-b border-white/10 bg-gradient-to-b from-[rgba(139,92,246,0.06)] to-transparent px-6 pb-8 pt-24 sm:px-10 xl:px-12">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted no-underline transition hover:text-gold">
        <ArrowLeft className="size-3.5" /> QuestBoard
      </Link>

      <div className="flex flex-wrap items-start gap-8">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className={`grid size-24 place-items-center rounded-2xl bg-gradient-to-br text-2xl font-black tracking-tight shadow-xl ring-2 ring-white/10 sm:size-32 sm:text-3xl ${
            profile.role === "DM" ? "from-amber-500/50 to-gold/20 text-gold" :
            profile.role === "Player" ? "from-emerald-500/30 to-emerald-900/20 text-emerald" :
            "from-violet-500/40 to-violet-900/20 text-violet"
          }`}>
            {profile.avatarSeed}
          </div>
          <div className={`absolute -bottom-1 -right-1 rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
            profile.role === "DM" ? "bg-amber-500/20 text-amber" :
            profile.role === "Player" ? "bg-emerald-500/20 text-emerald" :
            "bg-violet-500/20 text-violet"
          }`}>
            {profile.role}
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-2xl font-black text-white sm:text-3xl">{profile.displayName}</h1>
            {profile.pronouns && (
              <span className="rounded bg-white/5 px-2.5 py-1 text-xs font-semibold text-text-muted">{profile.pronouns}</span>
            )}
          </div>
          <p className="mt-1 text-sm font-medium text-gold">@{profile.handle}</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-parchment/75">{profile.headline}</p>
          <p className="mt-1 max-w-2xl text-sm leading-7 text-text-muted">{profile.bio}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-[0.8rem] text-text-muted">
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" /> {profile.location}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> {profile.timezone}</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="size-3.5" /> {profile.languages.join(", ")}</span>
          </div>

          {/* Availability tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.availability.map((a) => (
              <span key={a} className="inline-flex items-center gap-1 rounded border border-gold/20 bg-gold/8 px-2.5 py-1 text-[0.7rem] font-semibold text-gold">
                <CalendarDays className="size-3" /> {a}
              </span>
            ))}
          </div>

          {/* Looking for */}
          <div className="mt-4 rounded-md border border-emerald/20 bg-emerald/8 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald">Looking for</p>
            <p className="mt-1 text-sm text-parchment/85">{profile.lookingFor}</p>
          </div>
        </div>

        {/* Stats + Actions */}
        <div className="flex shrink-0 flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className={`size-4 ${i <= Math.round(profile.rating) ? "text-gold" : "text-white/15"}`} />
            ))}
            <span className="ml-1 text-sm font-bold text-white">{profile.rating}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-xs font-bold text-charcoal transition hover:bg-gold-light">
              <MessageCircle className="size-3.5" /> Message
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-bold text-parchment transition hover:border-gold/35">
              <Heart className="size-3.5" /> Add Friend
            </button>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-5 flex flex-wrap gap-2">
        {profile.badges.map((badge) => (
          <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.72rem] font-semibold text-parchment/80">
            <ShieldCheck className="size-3 text-emerald" /> {badge}
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Games Run", value: profile.gamesRun, icon: Sword },
          { label: "Games Played", value: profile.gamesPlayed, icon: UsersRound },
          { label: "Trust Score", value: `${profile.trustScore}%`, icon: ShieldCheck },
          { label: "Response", value: profile.responseTime, icon: Clock },
        ].map((stat) => (
          <div key={stat.label} className="rounded-md border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2 text-text-muted">
              <stat.icon className="size-3.5" aria-hidden="true" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="mt-1 text-lg font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabBar({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (tab: string) => void }) {
  return (
    <div className="flex gap-0 border-b border-white/10 px-6 sm:px-10 xl:px-12">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-5 py-3.5 text-sm font-bold transition ${
            active === tab
              ? "border-b-2 border-gold text-gold"
              : "border-b-2 border-transparent text-text-muted hover:text-parchment"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function CampaignHistorySection({ history }: { history: SessionHistory[] }) {
  if (history.length === 0) return <div className="px-6 py-12 text-center text-sm text-text-muted">Belum ada riwayat campaign.</div>;
  return (
    <div className="grid gap-3 px-6 py-6 sm:grid-cols-2 sm:px-10 xl:px-12">
      {history.map((session) => (
        <div key={session.title + session.role} className="rounded-md border border-white/10 bg-white/[0.04] p-4 transition hover:border-gold/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="font-bold text-white">{session.title}</h4>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] font-semibold text-text-muted">
                <span>{session.system}</span>
                <span>{session.sessions} sesi</span>
                <span className={session.role === "DM" ? "text-amber" : "text-emerald"}>{session.role}</span>
              </div>
            </div>
            {session.completed ? (
              <CheckCircle className="size-5 shrink-0 text-emerald" />
            ) : (
              <div className="animate-pulse rounded bg-gold/20 px-2 py-1 text-[0.65rem] font-bold text-gold">Active</div>
            )}
          </div>
          {session.tablemates.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {session.tablemates.map((mate) => (
                <span key={mate} className="rounded bg-white/5 px-2 py-0.5 text-[0.65rem] font-semibold text-text-muted">{mate}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CharacterShowcaseSection({ characters }: { characters: CharacterShowcase[] }) {
  if (characters.length === 0) return <div className="px-6 py-12 text-center text-sm text-text-muted">Belum ada karakter.</div>;
  return (
    <div className="grid gap-3 px-6 py-6 sm:grid-cols-2 sm:px-10 xl:px-12">
      {characters.map((char) => (
        <div key={char.name} className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.04] p-4 transition hover:border-gold/25">
          <div className="absolute right-0 top-0 h-full w-1.5" style={{ backgroundColor: char.accent }} />
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-white">{char.name}</h4>
              <p className="text-[0.75rem] text-text-muted">{char.ancestry} {char.className} · Level {char.level}</p>
              <p className="mt-1 text-[0.7rem] font-semibold text-gold">{char.campaign}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${
              char.status === "Active" ? "bg-emerald-500/20 text-emerald" :
              char.status === "Legendary" ? "bg-amber-500/20 text-amber" :
              char.status === "Retired" ? "bg-violet-500/20 text-violet" :
              "bg-rose-500/20 text-rose"
            }`}>
              {char.status}
            </span>
          </div>
          <p className="mt-3 text-[0.8rem] italic leading-relaxed text-parchment/65">&ldquo;{char.quote}&rdquo;</p>
        </div>
      ))}
    </div>
  );
}

function PlayedWithSection({ playedWith, friendHandles }: { playedWith: SocialProfile["playedWith"]; friendHandles: string[] }) {
  if (playedWith.length === 0) return null;
  return (
    <div className="border-t border-white/8 px-6 py-6 sm:px-10 xl:px-12">
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Played With</h3>
      <div className="mt-3 flex flex-wrap gap-4">
        {playedWith.map((pw) => (
          <Link
            key={pw.handle}
            href={`/profile/${pw.handle}`}
            className="group flex items-center gap-3 rounded-md border border-white/8 bg-white/[0.03] px-4 py-2.5 no-underline transition hover:border-gold/25 hover:bg-gold/5"
          >
            <div className={`grid size-9 place-items-center rounded-full text-sm font-bold ${
              friendHandles.includes(pw.handle) ? "bg-gold/20 text-gold ring-1 ring-gold/30" : "bg-white/10 text-text-muted"
            }`}>
              {pw.name[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-parchment group-hover:text-gold">{pw.name}</p>
              <p className="text-[0.65rem] text-text-muted">{pw.relation}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ReviewsSection({ reviews }: { reviews: SocialProfile["reviews"] }) {
  if (reviews.length === 0) return <div className="px-6 py-12 text-center text-sm text-text-muted">Belum ada review.</div>;
  return (
    <div className="grid gap-3 px-6 py-6 sm:grid-cols-2 sm:px-10 xl:px-12">
      {reviews.map((review, i) => (
        <div key={i} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2.5">
            <div className="grid size-8 place-items-center rounded-full bg-emerald/15 text-xs font-bold text-emerald">{review.from[0]}</div>
            <div>
              <p className="text-sm font-bold text-white">{review.from}</p>
              <span className="text-[0.65rem] font-semibold text-emerald">{review.badge}</span>
            </div>
          </div>
          <p className="mt-3 text-sm italic leading-relaxed text-parchment/70">&ldquo;{review.quote}&rdquo;</p>
        </div>
      ))}
    </div>
  );
}

export function ProfilePageClient({ profile }: { profile: SocialProfile }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Campaigns", "Characters", "Reviews"];

  return (
    <main className="min-h-screen bg-charcoal">
      <ProfileHero profile={profile} />
      <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Overview" && (
        <>
          <PlayedWithSection playedWith={profile.playedWith} friendHandles={profile.friendHandles} />
          <CampaignHistorySection history={profile.history.slice(0, 3)} />
        </>
      )}

      {activeTab === "Campaigns" && (
        <CampaignHistorySection history={profile.history} />
      )}

      {activeTab === "Characters" && (
        <CharacterShowcaseSection characters={profile.characters} />
      )}

      {activeTab === "Reviews" && (
        <ReviewsSection reviews={profile.reviews} />
      )}
    </main>
  );
}
