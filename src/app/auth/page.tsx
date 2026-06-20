"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"masuk" | "daftar">("masuk");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
