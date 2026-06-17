"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import type { Campaign } from "@/data/appMockData";

type Step = "confirm" | "note" | "review" | "done";

export function ApplyWizard({ campaign }: { campaign: Campaign }) {
  const [step, setStep] = useState<Step>("confirm");
  const [role, setRole] = useState("Player");
  const [schedule, setSchedule] = useState("Yes, I'm available");
  const [note, setNote] = useState("");
  const [applied, setApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const reset = () => {
    setStep("confirm");
    setRole("Player");
    setSchedule("Yes, I'm available");
    setNote("");
    setApplied(false);
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/lfg/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: campaign.id,
          role,
          schedule_confirmation: schedule,
          note: note || null,
          contact_email: null,
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Failed to submit");
      setApplied(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (applied) {
    return (
      <div className="rounded-lg border border-emerald/30 bg-emerald/10 p-6 text-center">
        <Check className="mx-auto mb-3 size-10 text-emerald" />
        <h3 className="text-xl font-black text-white">Application Sent!</h3>
        <p className="mt-3 leading-6 text-parchment/70">
          Your application to <strong className="text-white">{campaign.title}</strong> has been received.
          {" DM "}{campaign.dm} will review it and get back to you.
          {campaign.dmResponseTime ? (
            <span className="mt-2 block text-sm text-parchment/55">
              ⏱ {campaign.dmResponseTime}
            </span>
          ) : null}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-black text-parchment transition hover:border-gold/60 hover:text-white"
        >
          Apply to another campaign
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-5 sm:p-6">
      {/* Progress */}
      <div className="mb-6 flex items-center gap-2">
        <span className={`flex size-7 items-center justify-center rounded-full text-xs font-black ${
          step !== "confirm" ? "bg-emerald text-charcoal" : "bg-gold text-charcoal"
        }`}>1</span>
        <span className="h-px flex-1 bg-white/10" />
        <span className={`flex size-7 items-center justify-center rounded-full text-xs font-black ${
          step !== "note" ? (step === "done" ? "bg-emerald text-charcoal" : "bg-white/10 text-parchment/50")
            : "bg-gold text-charcoal"
        }`}>2</span>
        <span className="h-px flex-1 bg-white/10" />
        <span className={`flex size-7 items-center justify-center rounded-full text-xs font-black ${
          step === "review" ? "bg-gold text-charcoal"
            : step === "done" ? "bg-emerald text-charcoal"
            : "bg-white/10 text-parchment/50"
        }`}>3</span>
      </div>

      {step === "confirm" && (
        <div>
          <h3 className="text-xl font-black text-white">Confirm availability</h3>
          <p className="mt-2 mb-5 text-sm leading-6 text-parchment/65">
            Campaign {campaign.day}, {campaign.time} {campaign.timezone}
          </p>

          <label className="block">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-parchment/50">Your role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 h-12 w-full rounded-md border border-white/10 bg-charcoal px-3 text-sm font-bold text-parchment"
            >
              <option>Player</option>
              <option>Player (New)</option>
              <option>Veteran player</option>
              <option>Flex role</option>
            </select>
          </label>

          <label className="mt-4 block">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-parchment/50">Can you make this schedule regularly?</span>
            <select
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="mt-2 h-12 w-full rounded-md border border-white/10 bg-charcoal px-3 text-sm font-bold text-parchment"
            >
              <option value="Yes, I'm available">Yes, I&rsquo;m available</option>
              <option value="Yes, but need flexibility">Yes, but need flexibility</option>
              <option value="I'll confirm session-by-session">I&rsquo;ll confirm session-by-session</option>
            </select>
          </label>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setStep("note")}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-gold px-5 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:shadow-gold-glow"
            >
              Next
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {step === "note" && (
        <div>
          <h3 className="text-xl font-black text-white">Note to {campaign.dm}</h3>
          <p className="mt-2 mb-5 text-sm leading-6 text-parchment/65">
            What kind of character or experience are you looking for in this campaign?
          </p>

          <label className="block">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-parchment/50">Your message</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tell the DM a bit about yourself: playstyle, character ideas, experience level..."
              rows={4}
              className="mt-2 w-full resize-y rounded-md border border-white/10 bg-charcoal p-3 text-sm font-bold text-parchment placeholder:text-parchment/30 outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/25"
            />
          </label>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("confirm")}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-white/15 px-5 text-sm font-black text-parchment/70 transition hover:border-gold/55 hover:text-gold"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep("review")}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-gold px-5 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:shadow-gold-glow"
            >
              Review
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {step === "review" && (
        <div>
          <h3 className="text-xl font-black text-white">Review application</h3>
          <p className="mt-2 mb-5 text-sm leading-6 text-parchment/65">
            Double-check before sending to {campaign.dm}.
          </p>

          <div className="grid gap-3">
            <div className="rounded-md border border-white/10 bg-white/6 p-4">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-parchment/45">Campaign</span>
              <p className="mt-1 font-black text-white">{campaign.title}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/6 p-4">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-parchment/45">Role</span>
              <p className="mt-1 font-black text-white">{role}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/6 p-4">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-parchment/45">Schedule</span>
              <p className="mt-1 font-black text-white">{schedule}</p>
            </div>
            {note ? (
              <div className="rounded-md border border-white/10 bg-white/6 p-4">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-parchment/45">Note</span>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-parchment/78">{note}</p>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("note")}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-white/15 px-5 text-sm font-black text-parchment/70 transition hover:border-gold/55 hover:text-gold"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-ember px-5 text-sm font-black text-charcoal transition hover:-translate-y-0.5 hover:bg-gold hover:shadow-gold-glow disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Send className="size-4" />
              {submitting ? "Sending..." : "Send Application"}
            </button>
            {submitError ? (
              <p className="mt-3 rounded-md border border-ember/25 bg-ember/10 px-4 py-3 text-sm font-bold text-amber">{submitError}</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
