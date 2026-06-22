"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

const OAUTH_PROVIDERS = [
  {
    id: "google" as const,
    label: "Google",
    icon: (
      <svg className="size-[18px]" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: "github" as const,
    label: "GitHub",
    icon: (
      <svg className="size-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.1.82-.26.82-.58 0-.28-.01-1.04-.01-2.04-3.33.72-4.04-1.6-4.04-1.6-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49.99.1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.3.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.02-.32 3.3 1.23A11.5 11.5 0 0112 5.8c1.04.01 2.08.14 3.06.42 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18a4.62 4.62 0 011.24 3.22c0 4.6-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.9-.01 3.3 0 .32.22.7.83.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
];

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"masuk" | "daftar">("masuk");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOAuth(provider: "google" | "github") {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Backend Auth belum aktif.");
      return;
    }
    const redirectUrl = `${window.location.origin}/auth/callback?next=/app/profile/edit`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectUrl },
    });
    if (error) setMessage(error.message);
  }

  function isValid(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim().toLowerCase());
  }

  async function handleSubmit() {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !isValid(normalized)) {
      setMessage("Isi email yang valid.");
      return;
    }
    if (!password || password.length < 6) {
      setMessage("Password minimal 6 karakter.");
      return;
    }
    if (tab === "daftar" && password !== confirm) {
      setMessage("Password dan konfirmasi tidak cocok.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Backend Auth belum aktif. Coba lagi nanti.");
      return;
    }

    setLoading(true);
    setMessage("");

    if (tab === "masuk") {
      const { error } = await supabase.auth.signInWithPassword({
        email: normalized,
        password,
      });
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setMessage("Email atau password salah.");
        } else if (error.message.includes("Email not confirmed")) {
          setMessage("Email belum dikonfirmasi. Cek inbox/spam kamu.");
        } else {
          setMessage(error.message);
        }
        setLoading(false);
        return;
      }
      router.replace("/app/profile/edit");
    } else {
      const { error } = await supabase.auth.signUp({
        email: normalized,
        password,
      });
      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }
      setMessage(
        "Akun berhasil dibuat! Kamu bisa langsung login."
      );
      setLoading(false);
      setTab("masuk");
    }
  }

  return (
    <main className="min-h-screen bg-[#080808]">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5 py-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-parchment/40 no-underline transition hover:text-gold"
        >
          <ArrowLeft className="size-3.5" />
          QuestBoard
        </Link>
        <div className="rounded-lg border border-white/10 bg-[#141414] p-6">
          {/* Tabs */}
          <div className="mb-5 flex gap-4 border-b border-white/8">
            <button
              onClick={() => { setTab("masuk"); setMessage(""); }}
              className={`pb-3 text-sm font-black uppercase tracking-widest transition ${
                tab === "masuk"
                  ? "border-b-2 border-gold text-gold"
                  : "text-parchment/35 hover:text-parchment/60"
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => { setTab("daftar"); setMessage(""); }}
              className={`pb-3 text-sm font-black uppercase tracking-widest transition ${
                tab === "daftar"
                  ? "border-b-2 border-gold text-gold"
                  : "text-parchment/35 hover:text-parchment/60"
              }`}
            >
              Daftar
            </button>
          </div>

          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
            {tab === "masuk" ? "Sign in" : "Create account"}
          </p>
          <h1 className="mt-2 text-2xl font-black text-white">
            {tab === "masuk"
              ? "Selamat datang kembali"
              : "Gabung QuestBoard"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-parchment/45">
            {tab === "masuk"
              ? "Setelah login, profile dan character kamu bisa diedit."
              : "Buat akun untuk mulai mencari table atau jadi DM."}
          </p>

          {/* OAuth buttons */}
          <div className="mt-5 flex flex-col gap-2">
            {OAUTH_PROVIDERS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleOAuth(p.id)}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-white/15 bg-[#0d0d0d] text-sm font-bold text-white transition hover:border-white/25 disabled:opacity-60"
              >
                {p.icon}
                Continue with {p.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/8" />
            <span className="text-xs font-semibold uppercase tracking-wider text-parchment/30">atau</span>
            <span className="h-px flex-1 bg-white/8" />
          </div>

          {/* Email */}
          <div className="mt-5">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-parchment/45"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-parchment/35" />
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@domain.com"
                className="h-12 w-full rounded-md border border-white/10 bg-[#0d0d0d] pl-10 pr-3 text-sm font-semibold text-white outline-none transition focus:border-gold"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-parchment/45"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-parchment/35" />
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPw ? "text" : "password"}
                placeholder="Min. 6 karakter"
                className="h-12 w-full rounded-md border border-white/10 bg-[#0d0d0d] pl-10 pr-10 text-sm font-semibold text-white outline-none transition focus:border-gold"
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

          {/* Forgot password (masuk tab only) */}
          {tab === "masuk" && (
            <Link
              href="/auth/forgot-password"
              className="mt-2 block text-right text-xs font-semibold text-parchment/40 transition hover:text-gold"
            >
              Lupa password?
            </Link>
          )}

          {/* Confirm password (daftar only) */}
          {tab === "daftar" && (
            <div className="mt-4">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-parchment/45"
                htmlFor="confirm"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-parchment/35" />
                <input
                  id="confirm"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type={showPw ? "text" : "password"}
                  placeholder="Ulangi password"
                  className="h-12 w-full rounded-md border border-white/10 bg-[#0d0d0d] pl-10 pr-3 text-sm font-semibold text-white outline-none transition focus:border-gold"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-5 w-full rounded-md bg-gold px-5 py-3 text-sm font-black text-charcoal transition hover:bg-gold-light disabled:opacity-60"
          >
            {loading
              ? "Loading..."
              : tab === "masuk"
                ? "Masuk"
                : "Buat Akun"}
          </button>

          {message ? (
            <p className="mt-4 text-sm text-parchment/60">{message}</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
