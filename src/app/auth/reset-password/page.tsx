"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  // Verify we arrived here with a valid recovery session
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setHasSession(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
    });
  }, []);

  const inputCls =
    "h-12 w-full rounded-md border border-white/10 bg-[#0d0d0d] pl-10 pr-10 text-sm font-semibold text-white outline-none transition focus:border-gold";
  const labelCls =
    "mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-parchment/45";

  async function handleSubmit() {
    if (!password || password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (password !== confirm) {
      setError("Password dan konfirmasi tidak cocok.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Backend belum aktif.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: updErr } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (updErr) {
      setError("Gagal mengubah password. Link mungkin sudah kadaluarsa.");
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/auth"), 2500);
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
            Buat password baru
          </h1>

          {hasSession === false && !done && (
            <div className="mt-5 rounded-md border border-rose/25 bg-rose/5 p-4">
              <p className="text-sm font-semibold text-rose">
                Link reset tidak valid atau sudah kadaluarsa.
              </p>
              <Link
                href="/auth/forgot-password"
                className="mt-2 inline-block text-xs font-bold text-gold underline"
              >
                Minta link reset baru
              </Link>
            </div>
          )}

          {done ? (
            <div className="mt-6 rounded-md border border-emerald/25 bg-emerald/5 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 size-5 text-emerald" />
                <div>
                  <p className="text-sm font-bold text-emerald">
                    Password berhasil diubah!
                  </p>
                  <p className="mt-1 text-xs text-parchment/50">
                    Mengarahkan ke halaman login...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            hasSession && (
              <>
                <p className="mt-3 text-sm leading-6 text-parchment/45">
                  Masukkan password baru kamu di bawah ini.
                </p>

                <div className="mt-6">
                  <label className={labelCls}>Password Baru</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-parchment/35" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPw ? "text" : "password"}
                      placeholder="Minimal 6 karakter"
                      className={inputCls}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment/35 hover:text-parchment/60"
                    >
                      {showPw ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <label className={labelCls}>Konfirmasi Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-parchment/35" />
                    <input
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      type={showPw ? "text" : "password"}
                      placeholder="Ulangi password"
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
                    "Simpan Password Baru"
                  )}
                </button>
              </>
            )
          )}

          {hasSession === null && !done && (
            <div className="mt-6 grid place-items-center py-6">
              <Loader2 className="size-5 animate-spin text-parchment/40" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
