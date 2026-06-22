"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CharacterForm } from "@/components/characters/CharacterForm";
import { createSupabaseBrowserClient, CHARACTERS_TABLE } from "@/lib/supabase";
import { Character } from "@/lib/dnd-types";

export default function EditCharacterPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [ch, setCh] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    supabase
      .from(CHARACTERS_TABLE)
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (!data) {
          router.replace("/app/characters");
          return;
        }
        setCh(data as Character);
        setLoading(false);
      });
  }, [id, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="glass-panel h-96 animate-pulse rounded-lg" />
      </div>
    );
  }

  if (!ch) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={`/app/characters/${id}`}
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-parchment/40 no-underline transition hover:text-gold"
      >
        <ArrowLeft className="size-3.5" />
        {ch.name}
      </Link>
      <CharacterForm existing={ch} />
    </div>
  );
}
