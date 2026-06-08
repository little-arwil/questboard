"use client";

import { FormEvent, useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import {
  createSupabaseBrowserClient,
  getMissingSupabaseEnvVars,
  WAITLIST_TABLE,
  type WaitlistExperienceLevel,
  type WaitlistInsert,
  type WaitlistPreferredFormat,
  type WaitlistRole,
} from "@/lib/supabase";
import { trackQuestBoardEvent } from "@/lib/analytics";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmissionState = "idle" | "loading" | "success" | "error";

const roleOptions: Array<{ label: string; value: WaitlistRole }> = [
  { label: "Player", value: "player" },
  { label: "DM", value: "dm" },
  { label: "Player & DM", value: "both" },
];

const experienceOptions: Array<{
  label: string;
  value: WaitlistExperienceLevel;
}> = [
  { label: "Baru mulai", value: "new" },
  { label: "Pernah main", value: "some" },
  { label: "Berpengalaman", value: "experienced" },
];

const formatOptions: Array<{ label: string; value: WaitlistPreferredFormat }> = [
  { label: "Online", value: "online" },
  { label: "Offline", value: "offline" },
  { label: "Hybrid", value: "hybrid" },
];

type SupabaseInsertError = {
  code?: string;
  details?: string | null;
  hint?: string | null;
  message?: string;
};

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function normalizeAvailability(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function isValidEmail(value: string) {
  return emailPattern.test(value);
}

function redactSubmittedValues(
  value: string | null | undefined,
  submittedValues: string[],
) {
  return submittedValues.reduce(
    (redactedValue, submittedValue) =>
      submittedValue
        ? redactedValue?.replaceAll(submittedValue, "[redacted]") ?? redactedValue
        : redactedValue,
    value,
  );
}

function logSupabaseInsertError(
  error: SupabaseInsertError,
  submittedValues: string[],
) {
  console.error("Waitlist insert failed", {
    code: error.code,
    message: redactSubmittedValues(error.message, submittedValues),
    details: redactSubmittedValues(error.details, submittedValues),
    hint: redactSubmittedValues(error.hint, submittedValues),
  });
}

function isPolicyError(error: SupabaseInsertError) {
  const message = error.message?.toLowerCase() ?? "";
  const details = error.details?.toLowerCase() ?? "";
  const hint = error.hint?.toLowerCase() ?? "";

  return (
    error.code === "42501" ||
    message.includes("row-level security") ||
    message.includes("policy") ||
    details.includes("row-level security") ||
    details.includes("policy") ||
    hint.includes("row-level security") ||
    hint.includes("policy")
  );
}

function getInsertErrorMessage(error: SupabaseInsertError) {
  if (error.code === "23505") {
    return "Email ini sudah terdaftar.";
  }

  if (isPolicyError(error)) {
    return "Supabase policy menolak request insert.";
  }

  if (error.code === "23514") {
    return "Email tidak lolos validasi database. Cek lagi format email kamu.";
  }

  if (error.code === "42P01") {
    return "Table waitlist belum ditemukan di Supabase. Jalankan SQL setup terlebih dulu.";
  }

  return "Supabase mengembalikan error. Cek browser console untuk detail.";
}

export function CTASection() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WaitlistRole>("player");
  const [experienceLevel, setExperienceLevel] =
    useState<WaitlistExperienceLevel>("new");
  const [preferredFormat, setPreferredFormat] =
    useState<WaitlistPreferredFormat>("online");
  const [availability, setAvailability] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  function clearSubmissionFeedback() {
    if (submissionState !== "idle") {
      setSubmissionState("idle");
      setMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = normalizeEmail(email);
    const normalizedAvailability = normalizeAvailability(availability);

    if (!normalizedEmail) {
      setSubmissionState("error");
      setMessage("Email wajib diisi untuk join beta.");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setSubmissionState("error");
      setMessage("Format email belum valid. Cek lagi alamat email kamu.");
      return;
    }

    if (!normalizedAvailability) {
      setSubmissionState("error");
      setMessage("Availability wajib diisi supaya jadwal bisa dicocokkan.");
      return;
    }

    const missingEnvVars = getMissingSupabaseEnvVars();
    const supabase = createSupabaseBrowserClient();

    if (missingEnvVars.length > 0 || !supabase) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Supabase waitlist env vars are missing", {
          missing: missingEnvVars,
        });
      }

      setSubmissionState("error");
      setMessage("Supabase belum dikonfigurasi.");
      return;
    }

    setSubmissionState("loading");
    setMessage("Mendaftarkan email kamu...");

    const waitlistEntry: WaitlistInsert = {
      email: normalizedEmail,
      role,
      experience_level: experienceLevel,
      preferred_format: preferredFormat,
      availability: normalizedAvailability,
    };

    try {
      const { error } = await supabase.from(WAITLIST_TABLE).insert(waitlistEntry);

      if (error) {
        logSupabaseInsertError(error, [normalizedEmail, normalizedAvailability]);
        setSubmissionState("error");
        setMessage(getInsertErrorMessage(error));
        return;
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Unexpected waitlist submit failure", error);
      }

      setSubmissionState("error");
      setMessage("Tidak bisa menghubungi Supabase. Cek koneksi lalu coba lagi.");
      return;
    }

    setEmail("");
    setAvailability("");
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
              className="mt-8 grid gap-3 sm:max-w-3xl sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="relative sm:col-span-2">
                <label
                  className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58"
                  htmlFor="email"
                >
                  Email
                </label>
                <Mail className="pointer-events-none absolute left-4 top-[2.35rem] size-5 text-parchment/42" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearSubmissionFeedback();
                  }}
                  placeholder="email@domain.com"
                  disabled={isLoading}
                  aria-describedby="beta-form-message"
                  aria-invalid={submissionState === "error"}
                  className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 pl-12 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-parchment/35 hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30"
                />
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
                  Role
                </span>
                <select
                  name="role"
                  value={role}
                  onChange={(event) => {
                    setRole(event.target.value as WaitlistRole);
                    clearSubmissionFeedback();
                  }}
                  disabled={isLoading}
                  className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
                  Experience
                </span>
                <select
                  name="experience_level"
                  value={experienceLevel}
                  onChange={(event) => {
                    setExperienceLevel(
                      event.target.value as WaitlistExperienceLevel,
                    );
                    clearSubmissionFeedback();
                  }}
                  disabled={isLoading}
                  className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {experienceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
                  Format
                </span>
                <select
                  name="preferred_format"
                  value={preferredFormat}
                  onChange={(event) => {
                    setPreferredFormat(
                      event.target.value as WaitlistPreferredFormat,
                    );
                    clearSubmissionFeedback();
                  }}
                  disabled={isLoading}
                  className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-3 text-sm font-bold text-parchment outline-none transition hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2 lg:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
                  Availability
                </span>
                <input
                  name="availability"
                  type="text"
                  required
                  value={availability}
                  onChange={(event) => {
                    setAvailability(event.target.value);
                    clearSubmissionFeedback();
                  }}
                  placeholder="Contoh: Sabtu malam WIB, Minggu siang"
                  maxLength={160}
                  disabled={isLoading}
                  aria-describedby="beta-form-message"
                  className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-parchment/35 hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </label>

              <button
                type="submit"
                disabled={isLoading}
                onClick={() =>
                  trackQuestBoardEvent("join_beta_click", { location: "beta_cta" })
                }
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-ember px-6 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:col-span-2 lg:col-span-1 lg:mt-7"
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
