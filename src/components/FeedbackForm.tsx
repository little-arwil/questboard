"use client";

import { FormEvent, useState } from "react";
import { Mail, Send, Sparkles, Star } from "lucide-react";
import {
  createSupabaseBrowserClient,
  FEEDBACK_TABLE,
  getMissingSupabaseEnvVars,
  type FeedbackInsert,
  type FeedbackRole,
} from "@/lib/supabase";
import { trackQuestBoardEvent } from "@/lib/analytics";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmissionState = "idle" | "loading" | "success" | "error";

const roleOptions: Array<{ label: string; value: FeedbackRole }> = [
  { label: "Player", value: "player" },
  { label: "DM", value: "dm" },
  { label: "Both", value: "both" },
];

const ratingOptions = [1, 2, 3, 4, 5];

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string) {
  return emailPattern.test(value);
}

type SupabaseInsertError = {
  code?: string;
  details?: string | null;
  hint?: string | null;
  message?: string;
};

function logFeedbackInsertError(error: SupabaseInsertError) {
  console.error("Feedback insert failed", {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
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

function getFeedbackErrorMessage(error: SupabaseInsertError) {
  if (isPolicyError(error)) {
    return "Supabase policy menolak feedback ini.";
  }

  if (error.code === "23514") {
    return "Feedback belum lolos validasi database. Cek lagi isian kamu.";
  }

  if (error.code === "42P01") {
    return "Table feedback belum ditemukan di Supabase. Jalankan SQL setup terlebih dulu.";
  }

  return "Supabase mengembalikan error. Cek browser console untuk detail.";
}

export function FeedbackForm() {
  const [role, setRole] = useState<FeedbackRole>("player");
  const [rating, setRating] = useState(0);
  const [mostUseful, setMostUseful] = useState("");
  const [mostConfusing, setMostConfusing] = useState("");
  const [mustHaveFeature, setMustHaveFeature] = useState("");
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  function clearSubmissionFeedback() {
    if (submissionState !== "idle") {
      setSubmissionState("idle");
      setMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedMostUseful = normalizeText(mostUseful);
    const normalizedMostConfusing = normalizeText(mostConfusing);
    const normalizedMustHaveFeature = normalizeText(mustHaveFeature);
    const normalizedEmail = normalizeEmail(email);

    if (!rating) {
      setSubmissionState("error");
      setMessage("Rating wajib dipilih.");
      return;
    }

    if (!normalizedMostUseful) {
      setSubmissionState("error");
      setMessage("Isi bagian yang paling berguna dulu.");
      return;
    }

    if (!normalizedMostConfusing) {
      setSubmissionState("error");
      setMessage("Isi bagian yang paling membingungkan dulu.");
      return;
    }

    if (!normalizedMustHaveFeature) {
      setSubmissionState("error");
      setMessage("Isi must-have feature yang paling kamu butuhkan.");
      return;
    }

    if (normalizedEmail && !isValidEmail(normalizedEmail)) {
      setSubmissionState("error");
      setMessage("Format email opsional belum valid.");
      return;
    }

    const missingEnvVars = getMissingSupabaseEnvVars();
    const supabase = createSupabaseBrowserClient();

    if (missingEnvVars.length > 0 || !supabase) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Supabase feedback env vars are missing", {
          missing: missingEnvVars,
        });
      }

      setSubmissionState("error");
      setMessage("Supabase belum dikonfigurasi.");
      return;
    }

    setSubmissionState("loading");
    setMessage("Mengirim feedback kamu...");

    const feedbackEntry: FeedbackInsert = {
      role,
      rating,
      most_useful: normalizedMostUseful,
      most_confusing: normalizedMostConfusing,
      must_have_feature: normalizedMustHaveFeature,
      email: normalizedEmail || null,
      source: "feedback-page",
    };

    try {
      const { error } = await supabase.from(FEEDBACK_TABLE).insert(feedbackEntry);

      if (error) {
        logFeedbackInsertError(error);
        setSubmissionState("error");
        setMessage(getFeedbackErrorMessage(error));
        return;
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Unexpected feedback submit failure", error);
      }

      setSubmissionState("error");
      setMessage("Tidak bisa menghubungi Supabase. Cek koneksi lalu coba lagi.");
      return;
    }

    setRating(0);
    setMostUseful("");
    setMostConfusing("");
    setMustHaveFeature("");
    setEmail("");
    setSubmissionState("success");
    setMessage("Terima kasih! Feedback kamu sudah masuk ke QuestBoard.");
    trackQuestBoardEvent("feedback_submit_success", { source: "feedback-page" });
  }

  const isLoading = submissionState === "loading";
  const messageTone =
    submissionState === "success"
      ? "text-emerald"
      : submissionState === "error"
        ? "text-rose-300"
        : "text-parchment/58";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass-panel grid gap-5 rounded-lg p-5 sm:p-6"
    >
      <fieldset>
        <legend className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
          Role
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {roleOptions.map((option) => {
            const isSelected = role === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                disabled={isLoading}
                onClick={() => {
                  setRole(option.value);
                  clearSubmissionFeedback();
                }}
                className={`h-11 rounded-md border px-4 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal disabled:cursor-not-allowed disabled:opacity-70 ${
                  isSelected
                    ? "border-ember bg-ember text-charcoal"
                    : "border-white/10 bg-white/6 text-parchment/74 hover:border-gold/60 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
          <Star className="size-4 text-gold" aria-hidden="true" />
          Rating
        </legend>
        <div className="grid grid-cols-5 gap-2">
          {ratingOptions.map((option) => {
            const isSelected = rating === option;

            return (
              <button
                key={option}
                type="button"
                aria-label={`Rating ${option} dari 5`}
                aria-pressed={isSelected}
                disabled={isLoading}
                onClick={() => {
                  setRating(option);
                  clearSubmissionFeedback();
                }}
                className={`grid aspect-square min-h-11 place-items-center rounded-md border text-base font-black transition focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal disabled:cursor-not-allowed disabled:opacity-70 ${
                  isSelected
                    ? "border-gold bg-gold text-charcoal shadow-gold-glow"
                    : "border-white/10 bg-white/6 text-parchment/70 hover:border-gold/60 hover:text-white"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <FeedbackTextarea
        id="most-useful"
        label="Most useful part"
        value={mostUseful}
        placeholder="Contoh: match score, table focus scale, campaign detail, atau session zero checklist"
        disabled={isLoading}
        onChange={(value) => {
          setMostUseful(value);
          clearSubmissionFeedback();
        }}
      />

      <FeedbackTextarea
        id="most-confusing"
        label="Most confusing part"
        value={mostConfusing}
        placeholder="Bagian mana yang bikin ragu, kurang jelas, atau terasa terlalu ramai?"
        disabled={isLoading}
        onChange={(value) => {
          setMostConfusing(value);
          clearSubmissionFeedback();
        }}
      />

      <FeedbackTextarea
        id="must-have-feature"
        label="Must-have feature"
        value={mustHaveFeature}
        placeholder="Fitur apa yang harus ada sebelum kamu mau pakai QuestBoard beneran?"
        disabled={isLoading}
        onChange={(value) => {
          setMustHaveFeature(value);
          clearSubmissionFeedback();
        }}
      />

      <label className="block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
          Optional email
        </span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-parchment/42" aria-hidden="true" />
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearSubmissionFeedback();
            }}
            placeholder="email@domain.com"
            disabled={isLoading}
            aria-describedby="feedback-form-message"
            aria-invalid={submissionState === "error"}
            className="h-12 w-full rounded-md border border-white/12 bg-charcoal/78 pl-12 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-parchment/35 hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30 disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ember px-6 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-charcoal disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {isLoading ? (
          <>
            <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
            Mengirim...
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Kirim Feedback
          </>
        )}
      </button>

      <p
        id="feedback-form-message"
        className={`min-h-6 text-sm font-bold ${messageTone}`}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}

function FeedbackTextarea({
  id,
  label,
  value,
  placeholder,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-parchment/58">
        {label}
      </span>
      <textarea
        id={id}
        required
        rows={4}
        maxLength={1000}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-md border border-white/12 bg-charcoal/78 px-4 py-3 text-sm font-semibold leading-6 text-white outline-none transition placeholder:text-parchment/35 hover:border-gold/50 focus:border-ember focus:ring-2 focus:ring-ember/30 disabled:cursor-not-allowed disabled:opacity-70"
      />
    </label>
  );
}
