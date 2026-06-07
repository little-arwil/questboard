import { CheckCircle2 } from "lucide-react";
import {
  compatibilityReasons,
  matchingCampaign,
  playstyleBars,
} from "@/data/mockData";

export function MatchingPreview() {
  return (
    <section className="section-pad bg-charcoal-2/70" aria-labelledby="matching-title">
      <div className="quest-container">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald">
              Matching Preview
            </p>
            <h2 id="matching-title" className="mt-3 text-3xl font-black tracking-normal text-white sm:text-4xl">
              Lihat kenapa sebuah table cocok sebelum kamu apply.
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-parchment/72">
              Score bukan cuma angka. QuestBoard menampilkan alasan kompatibilitas agar
              player dan DM bisa mengambil keputusan dengan konteks.
            </p>
          </div>

          <article className="glass-panel rounded-lg p-5 sm:p-6">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
                  Campaign
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-normal text-white">
                  {matchingCampaign.campaign}
                </h3>
                <dl className="mt-4 grid gap-x-5 gap-y-2 text-sm text-parchment/72 sm:grid-cols-2">
                  <div>
                    <dt className="font-bold text-parchment/46">DM</dt>
                    <dd className="font-black text-parchment">{matchingCampaign.dm}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-parchment/46">System</dt>
                    <dd className="font-black text-parchment">{matchingCampaign.system}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-parchment/46">Tone</dt>
                    <dd className="font-black text-parchment">{matchingCampaign.tone}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-parchment/46">Schedule</dt>
                    <dd className="font-black text-parchment">{matchingCampaign.schedule}</dd>
                  </div>
                </dl>
              </div>
              <div className="w-32 rounded-lg border border-emerald/30 bg-emerald/10 p-4 text-center shadow-emerald-glow">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald/70">
                  Match Score
                </p>
                <p className="mt-1 text-4xl font-black text-emerald">
                  {matchingCampaign.matchScore}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.18em] text-parchment/58">
                  Compatibility reasons
                </h4>
                <ul className="mt-4 space-y-3">
                  {compatibilityReasons.map((reason) => (
                    <li key={reason} className="flex items-center gap-3 text-sm font-bold text-parchment/86">
                      <CheckCircle2 className="size-5 shrink-0 text-emerald" aria-hidden="true" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.18em] text-parchment/58">
                  Playstyle
                </h4>
                <div className="mt-4 space-y-4">
                  {playstyleBars.map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-2 flex items-center justify-between text-sm font-bold text-parchment/84">
                        <span>{bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${bar.tone}`}
                          style={{ width: `${bar.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
