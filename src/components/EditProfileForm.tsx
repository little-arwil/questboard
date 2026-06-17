"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { socialProfiles } from "@/data/socialProfiles";

export function EditProfileForm() {
  const defaultProfile = socialProfiles[0];
  const [name, setName] = useState(defaultProfile.displayName);
  const [headline, setHeadline] = useState(defaultProfile.headline);
  const [bio, setBio] = useState(defaultProfile.bio);
  const [role, setRole] = useState(defaultProfile.role);
  const [location, setLocation] = useState(defaultProfile.location);
  const [focus, setFocus] = useState(defaultProfile.tableFocus);
  const [pronouns, setPronouns] = useState(defaultProfile.pronouns ?? "");
  const [lookingFor, setLookingFor] = useState(defaultProfile.lookingFor);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <main className="min-h-screen bg-charcoal">
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-24 sm:px-8">
        <Link href="/profile/raka-dm" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted no-underline transition hover:text-gold">
          <ArrowLeft className="size-3.5" /> Back to profile
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Edit Profile</h1>
            <p className="mt-1 text-sm text-text-muted">Changes are mock-saved (backend coming in auth phase).</p>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-charcoal transition hover:bg-gold-light"
          >
            <Save className="size-4" /> {saved ? "Saved!" : "Save Profile"}
          </button>
        </div>

        <div className="mt-8 grid gap-6 rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted" htmlFor="name">Display Name</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-gold" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted" htmlFor="pronouns">Pronouns</label>
              <input id="pronouns" value={pronouns} onChange={(e) => setPronouns(e.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-gold" placeholder="he/him, she/her, they/them" />
            </div>
          </fieldset>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted" htmlFor="headline">Headline</label>
            <input id="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-gold" />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted" htmlFor="bio">Bio</label>
            <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="w-full rounded-md border border-white/10 bg-charcoal px-3.5 py-3 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-gold" />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted" htmlFor="looking-for">Looking For</label>
            <textarea id="looking-for" value={lookingFor} onChange={(e) => setLookingFor(e.target.value)} rows={2} className="w-full rounded-md border border-white/10 bg-charcoal px-3.5 py-3 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-gold" />
          </div>

          <fieldset className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted" htmlFor="role">Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value as typeof role)} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-gold">
                <option>Player</option><option>DM</option><option>Player & DM</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted" htmlFor="location">Location</label>
              <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-charcoal px-3.5 text-sm font-semibold text-white outline-none transition hover:border-gold/50 focus:border-gold" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Table Focus</label>
              <input type="range" min={1} max={9} value={focus} onChange={(e) => setFocus(Number(e.target.value))} className="w-full accent-gold" />
              <p className="mt-1 text-xs text-text-muted">1=Combat · 9=Roleplay (current: {focus})</p>
            </div>
          </fieldset>
        </div>
      </div>
    </main>
  );
}
