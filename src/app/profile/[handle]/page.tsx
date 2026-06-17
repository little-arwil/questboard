import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSocialProfile, socialProfiles } from "@/data/socialProfiles";
import { ProfilePageClient } from "./ProfilePageClient";

type Params = Promise<{ handle: string }>;

export async function generateStaticParams(): Promise<{ handle: string }[]> {
  return socialProfiles.map((profile) => ({ handle: profile.handle }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { handle } = await params;
  const profile = getSocialProfile(handle);
  if (!profile) return {};
  return {
    title: `${profile.displayName} (@${profile.handle}) — QuestBoard Profile`,
    description: profile.bio,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { handle } = await params;
  const profile = getSocialProfile(handle);
  if (!profile) notFound();

  return <ProfilePageClient profile={profile} />;
}
