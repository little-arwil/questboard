import Link from "next/link";
import { ShieldCheck, Star, UsersRound } from "lucide-react";
import { socialProfiles } from "@/data/socialProfiles";

export function ProfileDiscovery() {
  return (
    <section className="section-pad" aria-labelledby="profile-discovery-title">
      <div className="quest-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-gold">Trusted tables start with people</p>
            <h2 id="profile-discovery-title" className="mt-3 text-3xl font-black tracking-normal text-white sm:text-4xl">
              Lihat reputasi player & DM sebelum join.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-parchment/68">
              QuestBoard profile nunjukin riwayat sesi, teman satu table, review, dan character showcase — biar kamu tahu main sama siapa.
            </p>
          </div>
          <Link href="/profile/raka-dm" className="inline-flex items-center justify-center rounded-md border border-gold/35 px-5 py-3 text-sm font-bold text-gold no-underline transition hover:bg-gold/10">
            Lihat contoh profile
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {socialProfiles.map((profile) => (
            <Link key={profile.handle} href={`/profile/${profile.handle}`} className="group rounded-lg border border-white/10 bg-white/[0.045] p-5 no-underline transition hover:-translate-y-1 hover:border-gold/35 hover:bg-gold/[0.04]">
              <div className="flex items-start gap-4">
                <div className="grid size-14 shrink-0 place-items-center rounded-xl border border-gold/20 bg-gold/10 text-lg font-black text-gold">
                  {profile.avatarSeed}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-white group-hover:text-gold">{profile.displayName}</h3>
                      <p className="text-xs font-semibold text-text-muted">@{profile.handle} · {profile.role}</p>
                    </div>
                    <span className="rounded bg-emerald/15 px-2 py-1 text-xs font-black text-emerald">{profile.trustScore}%</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-parchment/68">{profile.headline}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-text-muted">
                    <span className="inline-flex items-center gap-1"><Star className="size-3.5 text-gold" /> {profile.rating}</span>
                    <span className="inline-flex items-center gap-1"><UsersRound className="size-3.5 text-emerald" /> {profile.gamesPlayed + profile.gamesRun} games</span>
                    <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5 text-violet" /> {profile.badges[0]}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
