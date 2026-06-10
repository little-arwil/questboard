import Image from "next/image";

export function HeroCharacter() {
  return (
    <div
      className="pointer-events-none relative h-full w-full select-none"
      aria-hidden="true"
    >
      <div className="absolute inset-x-[30%] bottom-[1%] h-[7%] rounded-full bg-black/75 blur-3xl" />
      <div className="absolute left-[16%] top-[9%] h-[32%] w-[34%] rounded-full bg-ember/12 blur-3xl" />
      <div className="absolute right-[18%] top-[21%] h-[38%] w-[34%] rounded-full bg-violet/18 blur-3xl" />

      <Image
        src="/hero/questboard-mage.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1536px) 58rem, (min-width: 1280px) 52rem, (min-width: 1024px) 46rem, 90vw"
        className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_42px_70px_rgba(0,0,0,0.72)]"
      />

      {/* Animated glow only: raised spell hand */}
      <div className="hero-hand-glow absolute left-[16%] top-[9%] z-20 h-[19%] w-[24%] motion-reduce:animate-none">
        <div className="absolute inset-[-42%] rounded-full bg-[radial-gradient(circle,rgba(252,247,255,0.72)_0%,rgba(196,181,253,0.45)_28%,rgba(139,92,246,0.26)_54%,transparent_76%)] blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(244,197,106,0.35)_34%,rgba(139,92,246,0.48)_58%,transparent_78%)] blur-md" />
        <div className="hero-magic-particles absolute inset-0 motion-reduce:hidden">
          <span className="absolute left-[18%] top-[14%] size-1.5 rounded-full bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.95)]" />
          <span className="absolute right-[18%] top-[29%] size-1 rounded-full bg-violet/90 shadow-[0_0_15px_rgba(139,92,246,0.9)]" />
          <span className="absolute bottom-[18%] left-[38%] size-1 rounded-full bg-ember/85 shadow-[0_0_14px_rgba(244,197,106,0.86)]" />
          <span className="absolute bottom-[34%] right-[32%] size-1.5 rounded-full bg-[#d8c3ff]/80 shadow-[0_0_18px_rgba(216,195,255,0.85)]" />
        </div>
      </div>

      {/* Animated glow only: arcane book/tablet */}
      <div className="hero-book-glow absolute left-[52%] top-[48%] z-20 h-[16%] w-[22%] rotate-[-8deg] motion-reduce:animate-none">
        <div className="absolute inset-[-34%] rounded-[45%] bg-[radial-gradient(circle,rgba(244,197,106,0.2),rgba(139,92,246,0.32)_44%,transparent_76%)] blur-xl" />
        <div className="absolute inset-x-[18%] top-[30%] h-[16%] rounded-full bg-violet/70 blur-md" />
        <div className="absolute left-[42%] top-[39%] size-2 rounded-full bg-white/85 shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
      </div>
    </div>
  );
}
