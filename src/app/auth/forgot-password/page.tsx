"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const inputCls =
    "h-12 w-full rounded-md border border-white/10 bg-[#0d0d0d] pl-10 pr-3 text-sm font-semibold text-white outline-none transition focus:border-gold";
  const labelCls =
    "mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-parchment/45";

  async function handleSubmit() {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized)) {
      setError("Isi email yang valid.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Backend belum aktif.");
      return;
    }

    setLoading(true);
    setError("");

    const redirectUrl = `${window.location.origin}/auth/callback?next=/auth/reset-password`;

    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(
      normalized,
      { redirectTo: redirectUrl },
    );

    setLoading(false);

    if (resetErr) {
      setError("Gagal mengirim email. Coba lagi nanti.");
      return;
    }

    setSent(true);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#050505] px-4">
      <div className="w-full max-w-sm">
        <Link
          href="/auth"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-parchment/40 no-underline transition hover:text-gold"
        >
          <ArrowLeft className="size-3.5" />
          QuestBoard
        </Link>

        <div className="rounded-lg border border-white/10 bg-[#141414] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
            Reset Password
          </p>
          <h1 className="mt-2 text-2xl font-black text-white">
            Lupa password?
          </h1>
          <p className="mt-3 text-sm leading-6 text-parchment/45">
            Masukkan email yang terdaftar. Kami akan kirimkan link untuk reset
            password.
          </p>

          {sent ? (
            <div className="mt-6 rounded-md border border-emerald/25 bg-emerald/5 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 size-5 text-emerald" />
                <div>
                  <p className="text-sm font-bold text-emerald">Email terkirim!</p>
                  <p className="mt-1 text-xs text-parchment/50">
                    Cek inbox atau spam kamu. Klik link di email untuk reset
                    password.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-6">
                <label className={labelCls}>Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-parchment/35" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@domain.com"
                    className={inputCls}
                  />
                </div>
              </div>

              {error ? (
                <p className="mt-3 text-sm font-semibold text-rose">{error}</p>
              ) : null}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-5 w-full rounded-md bg-gold px-5 py-3 text-sm font-black text-charcoal transition hover:bg-gold-light disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="mx-auto size-4 animate-spin" />
                ) : (
                  "Kirim Link Reset"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
