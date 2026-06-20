"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { createSupabaseBrowserClient, getMissingSupabaseEnvVars } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim().toLowerCase());
  }

  async function handleMagicLink() {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !isValidEmail(normalized)) {
      setMessage("Isi email yang valid dulu.");
      return;
    }

    const missing = getMissingSupabaseEnvVars();
    const supabase = createSupabaseBrowserClient();
    if (missing.length || !supabase) {
      setMessage("Auth belum aktif karena Supabase env belum lengkap. UI sudah siap untuk production env.");
      return;
    }

    const siteUrl = window.location.origin || process.env.NEXT_PUBLIC_SITE_URL;

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: normalized,
      options: { emailRedirectTo: `${siteUrl}/auth/callback?next=/app/profile/edit` },
    });
    setLoading(false);
    setMessage(error ? error.message : "Magic link terkirim. Cek email kamu.");
  }

  return (
    <main className="min-h-screen bg-charcoal">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-20">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted no-underline transition hover:text-gold">
          <ArrowLeft className="size-3.5" /> QuestBoard
        </Link>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">Sign in</p>
          <h1 className="mt-2 text-2xl font-black text-white">Own your QuestBoard profile</h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">Masuk pakai magic link. Setelah login, profile dan character kamu bisa diedit sebagai owner.</p>
          <div className="mt-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted" htmlFor="email">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@domain.com" className="h-12 w-full rounded-md border border-white/10 bg-charcoal pl-10 pr-3 text-sm font-semibold text-white outline-none transition focus:border-gold" />
            </div>
          </div>
          <button onClick={handleMagicLink} disabled={loading} className="mt-4 w-full rounded-md bg-gold px-5 py-3 text-sm font-black text-charcoal transition hover:bg-gold-light disabled:opacity-60">
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
          {message ? <p className="mt-4 text-sm text-parchment/70">{message}</p> : null}
        </div>
      </div>
    </main>
  );
}
