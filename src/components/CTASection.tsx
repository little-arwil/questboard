"use client";

import { FormEvent, useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import {
  createSupabaseBrowserClient,
  type WaitlistInsert,
} from "@/lib/supabase";
import { trackQuestBoardEvent } from "@/lib/analytics";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmissionState = "idle" | "loading" | "success" | "error";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setSubmissionState("error");
      setMessage("Email wajib diisi untuk join beta.");
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setSubmissionState("error");
      setMessage("Format email belum valid. Cek lagi alamat email kamu.");
      return;
    }

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setSubmissionState("error");
      setMessage("Supabase belum dikonfigurasi. Tambahkan environment variables dulu.");
      return;
    }

    setSubmissionState("loading");
    setMessage("Mendaftarkan email kamu...");

    const waitlistEntry: WaitlistInsert = {
      email: trimmedEmail,
      source: "landing-page",
    };

    const { error } = await supabase.from("waitlist").insert(waitlistEntry);

    if (error) {
      setSubmissionState("error");
      setMessage(
        error.code === "23505"
          ? "Email ini sudah ada di waitlist QuestBoard."
          : "Gagal join beta. Coba lagi sebentar lagi.",
      );
      return;
    }

    setEmail("");
    setSubmissionState("success");
    setMessage("Berhasil! Kamu masuk daftar beta QuestBoard.");
    trackQuestBoardEvent("waitlist_submit_success", { source: "landing-page" });
  }

  const isLoading = submissionState === "loading";
  const messageTone =
    submissionState === "success"
      ? "text-emerald"
      : submissionState === "error"
        ? "text-rose-300"
        : "text-parchment/58";

  return (
    <section id="join-beta" className="section-pad" aria-labelledby="cta-title">
      <div className="quest-container">
        <div className="relative overflow-hidden rounded-lg border border-gold/24 bg-[linear-gradient(135deg,rgba(214,169,76,0.18),rgba(139,92,246,0.14)_48%,rgba(53,211,154,0.12))] p-6 shadow-gold-glow sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-charcoal/55 px-4 py-2 text-sm font-black text-ember">
              <Sparkles className="size-4" aria-hidden="true" />
              Beta access
            </div>
            <h2 id="cta-title" className="text-4xl font-black tracking-normal text-white sm:text-5xl">
              Bangun party tanpa chaos jadwal.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-parchment/78">
              Masuk daftar beta QuestBoard dan bantu bentuk cara baru mencari table
              D&amp;D yang lebih cocok sejak awal.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 flex flex-col gap-3 sm:max-w-xl sm:flex-row"
            >
              <label className="sr-only" htmlFor="email">
                Email untuk join beta
              </label>
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-parchment/42" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (submissionState !== "idle") {
                      setSubmissionState("idle");
                      setMessage("");
                    }
                  }}
                  placeholder="email@domain.com"
                  disabled={isLoading}
                  aria-describedby="beta-form-message"
                  aria-invalid={submissionState === "error"}
                  className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 pl-12 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-parchment/35 hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                onClick={() =>
                  trackQuestBoardEvent("join_beta_click", { location: "beta_cta" })
                }
                className="inline-flex h-12 items-center justify-center rounded-md bg-ember px-6 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? "Joining..." : "Join Beta"}
              </button>
            </form>

            <p
              id="beta-form-message"
              className={`mt-4 min-h-6 text-sm font-bold ${messageTone}`}
              aria-live="polite"
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
