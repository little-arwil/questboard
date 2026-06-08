"use client";

import { useState } from "react";
import { Check, Swords, WandSparkles } from "lucide-react";
import { roleBenefits } from "@/data/mockData";
import { trackQuestBoardEvent } from "@/lib/analytics";

type Role = "player" | "dm";

const roleCopy: Record<Role, { eyebrow: string; title: string; body: string }> = {
  player: {
    eyebrow: "Untuk Player",
    title: "Cari party yang cocok dengan waktu dan gaya main kamu.",
    body: "Pilih campaign yang jelas tone, bahasa, tools, dan ekspektasinya sebelum kamu apply.",
  },
  dm: {
    eyebrow: "Untuk DM",
    title: "Bangun table dengan applicant yang lebih siap.",
    body: "Buka listing, lihat kecocokan player, dan mulai session zero dengan konteks yang rapi.",
  },
};

export function RoleToggleSection() {
  const [role, setRole] = useState<Role>("player");
  const active = roleCopy[role];
  const benefits = roleBenefits[role];

  function handleRoleChange(nextRole: Role) {
    if (nextRole !== role) {
      trackQuestBoardEvent("role_toggle_change", { selected_role: nextRole });
    }

    setRole(nextRole);
  }

  return (
    <section id="role-toggle" className="section-pad bg-charcoal-2/60" aria-labelledby="role-title">
      <div className="quest-container">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-violet">
              Player atau DM
            </p>
            <h2 id="role-title" className="mt-3 text-3xl font-black tracking-normal text-white sm:text-4xl">
              Pilih sisi table kamu.
            </h2>
            <div className="mt-7 grid grid-cols-2 rounded-lg border border-white/10 bg-white/6 p-1">
              <button
                type="button"
                aria-pressed={role === "player"}
                onClick={() => handleRoleChange("player")}
                className={`flex h-12 items-center justify-center gap-2 rounded-md text-sm font-black transition ${
                  role === "player"
                    ? "bg-ember text-charcoal"
                    : "text-parchment/70 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Swords className="size-4" aria-hidden="true" />
                Saya Player
              </button>
              <button
                type="button"
                aria-pressed={role === "dm"}
                onClick={() => handleRoleChange("dm")}
                className={`flex h-12 items-center justify-center gap-2 rounded-md text-sm font-black transition ${
                  role === "dm"
                    ? "bg-violet text-white"
                    : "text-parchment/70 hover:bg-white/8 hover:text-white"
                }`}
              >
                <WandSparkles className="size-4" aria-hidden="true" />
                Saya DM
              </button>
            </div>
          </div>

          <article className="glass-panel rounded-lg p-6 sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">
              {active.eyebrow}
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-normal text-white sm:text-3xl">
              {active.title}
            </h3>
            <p className="mt-4 max-w-2xl leading-8 text-parchment/72">{active.body}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex min-h-16 items-start gap-3 rounded-md border border-white/10 bg-white/6 p-4"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald/14 text-emerald">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-semibold leading-6 text-parchment/86">{benefit}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
