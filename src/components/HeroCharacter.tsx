import Image from "next/image";

export function HeroCharacter() {
  return (
    <div
      className="pointer-events-none relative h-full w-full select-none"
      aria-hidden="true"
    >
      <div className="absolute inset-x-[27%] bottom-[1%] h-[6%] rounded-full bg-black/78 blur-3xl" />
      <div className="absolute left-[13%] top-[8%] h-[24%] w-[26%] rounded-full bg-gold/[0.07] blur-3xl" />
      <div className="absolute right-[22%] top-[28%] h-[26%] w-[20%] rounded-full bg-[#6B3FA0]/[0.05] blur-3xl" />
      <div className="absolute right-[24%] top-[12%] h-[36%] w-[15%] rounded-full bg-[#9fd7ff]/[0.06] blur-3xl" />

      <Image
        src="/hero/questboard-mage.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1536px) 700px, (min-width: 1280px) 600px, (min-width: 1024px) 500px, 90vw"
        className="relative z-10 h-full w-full object-contain object-bottom [filter:drop-shadow(0_0_40px_rgba(107,63,160,0.5))_drop-shadow(0_0_80px_rgba(107,63,160,0.25))]"
      />

      {/* ── MAGIC: Raised spell hand ── */}
      <div className="hero-hand-glow absolute left-[15%] top-[8%] z-20 h-[20%] w-[23%] motion-reduce:animate-none">
        <div className="absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.74)_0%,rgba(244,197,106,0.28)_25%,rgba(139,92,246,0.32)_52%,transparent_74%)] blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(244,197,106,0.38)_33%,rgba(139,92,246,0.42)_59%,transparent_78%)] blur-md" />
        <div className="hero-magic-particles absolute inset-0 motion-reduce:hidden">
          <span className="absolute left-[18%] top-[14%] size-1.5 rounded-full bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.95)]" />
          <span className="absolute right-[18%] top-[29%] size-1 rounded-full bg-[#8B5CF6]/85 shadow-[0_0_15px_rgba(139,92,246,0.82)]" />
          <span className="absolute bottom-[18%] left-[38%] size-1 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(201,168,76,0.82)]" />
          <span className="absolute bottom-[34%] right-[32%] size-1.5 rounded-full bg-[#d8c3ff]/76 shadow-[0_0_18px_rgba(216,195,255,0.8)]" />
        </div>
      </div>

      {/* ── SPELL CIRCLE: rotating arcane ring around hand ── */}
      <div className="absolute left-[12%] top-[5%] z-30 flex size-[32%] items-center justify-center motion-reduce:hidden">
        <div className="hero-ring-spin absolute inset-[2%] rounded-full border-2 border-[#a78bfa]/28 shadow-[0_0_60px_rgba(139,92,246,0.18)]" />
        <div
          className="hero-ring-counter absolute inset-[16%] rounded-full border border-[#c084fc]/38 shadow-[0_0_40px_rgba(139,92,246,0.2)]"
          style={{ boxShadow: "inset 0 0 30px rgba(139,92,246,0.12)" }}
        />
        <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(216,195,255,0.28),rgba(139,92,246,0.10)_44%,transparent_68%)] blur-lg" />
        <div className="absolute left-1/2 top-1/2 size-[6%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 shadow-[0_0_28px_rgba(255,255,255,0.8)]" />
        <div className="hero-orbital-1 absolute left-[8%] top-[12%] size-1 rounded-full bg-[#d8c3ff]/80 shadow-[0_0_12px_rgba(216,195,255,0.7)]" />
        <div className="hero-orbital-2 absolute right-[14%] top-[28%] size-1 rounded-full bg-gold/70 shadow-[0_0_10px_rgba(201,168,76,0.6)]" />
      </div>

      {/* ── MAGIC: Arcane book/tablet ── */}
      <div className="hero-book-glow absolute left-[52%] top-[48%] z-20 h-[15%] w-[21%] rotate-[-8deg] motion-reduce:animate-none">
        <div className="absolute inset-[-28%] rounded-[45%] bg-[radial-gradient(circle,rgba(244,197,106,0.2),rgba(139,92,246,0.34)_44%,transparent_72%)] blur-xl" />
        <div className="absolute inset-x-[18%] top-[30%] h-[14%] rounded-full bg-[#8B5CF6]/70 blur-md" />
        <div className="absolute left-[42%] top-[39%] size-2 rounded-full bg-white/82 shadow-[0_0_18px_rgba(255,255,255,0.82)]" />
        <div className="hero-magic-particles absolute inset-0 motion-reduce:hidden">
          <span className="absolute left-[20%] top-[20%] size-1 rounded-full bg-gold/75 shadow-[0_0_12px_rgba(201,168,76,0.75)]" />
          <span className="absolute right-[24%] bottom-[30%] size-1 rounded-full bg-[#8B5CF6]/80 shadow-[0_0_12px_rgba(139,92,246,0.78)]" />
          <span className="absolute left-[30%] bottom-[10%] size-0.5 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        </div>
      </div>

      {/* ── RUNIC SIGILS: glowing script on/above the book ── */}
      <div className="absolute left-[49%] top-[44%] z-30 size-[24%] motion-reduce:hidden">
        <div className="hero-sigil-pulse absolute left-[18%] top-[14%] h-[5%] w-[64%] rounded-full bg-gradient-to-r from-transparent via-[#a78bfa]/70 to-transparent blur-[3px]" />
        <div className="absolute left-[22%] top-[28%] h-[5%] w-[56%] rounded-full bg-gradient-to-r from-transparent via-[#c084fc]/60 to-transparent blur-[2px]" />
        <div className="hero-sigil-pulse-delayed absolute left-[20%] top-[42%] h-[5%] w-[60%] rounded-full bg-gradient-to-r from-transparent via-[#e8d5ff]/50 to-transparent blur-[3px]" />
        <div className="absolute left-[26%] top-[56%] h-[5%] w-[48%] rounded-full bg-gradient-to-r from-transparent via-[#a78bfa]/50 to-transparent blur-[2px]" />
        <div className="hero-sigil-gem absolute left-1/2 top-[38%] size-[8%] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[#8B5CF6]/60 shadow-[0_0_24px_rgba(139,92,246,0.5)]" />
      </div>
    </div>
  );
}
