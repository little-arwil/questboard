import Image from "next/image";

export function HeroCharacter() {
  return (
    <div
      className="pointer-events-none relative h-full w-full select-none"
      aria-hidden="true"
    >
      <div className="absolute inset-x-[27%] bottom-[1%] h-[6%] rounded-full bg-black/78 blur-3xl" />
      <div className="absolute left-[13%] top-[8%] h-[24%] w-[26%] rounded-full bg-ember/[0.07] blur-3xl" />
      <div className="absolute right-[20%] top-[26%] h-[30%] w-[24%] rounded-full bg-[#8b5cf6]/[0.08] blur-3xl" />
      <div className="absolute right-[24%] top-[10%] h-[42%] w-[18%] rounded-full bg-[#9fd7ff]/[0.08] blur-3xl" />

      <Image
        src="/hero/questboard-mage.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1536px) 58rem, (min-width: 1280px) 54rem, (min-width: 1024px) 50rem, 90vw"
        className="relative z-10 h-full w-full object-contain object-bottom brightness-[1.08] contrast-[1.06] saturate-[1.05] drop-shadow-[0_48px_76px_rgba(0,0,0,0.76)]"
      />

      {/* Animated glow only: raised spell hand */}
      <div className="hero-hand-glow absolute left-[15%] top-[8%] z-20 h-[20%] w-[23%] motion-reduce:animate-none">
        <div className="absolute inset-[-34%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.68)_0%,rgba(244,197,106,0.24)_25%,rgba(139,92,246,0.28)_52%,transparent_76%)] blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(244,197,106,0.38)_33%,rgba(139,92,246,0.42)_59%,transparent_78%)] blur-md" />
        <div className="hero-magic-particles absolute inset-0 motion-reduce:hidden">
          <span className="absolute left-[18%] top-[14%] size-1.5 rounded-full bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.95)]" />
          <span className="absolute right-[18%] top-[29%] size-1 rounded-full bg-violet/85 shadow-[0_0_15px_rgba(139,92,246,0.82)]" />
          <span className="absolute bottom-[18%] left-[38%] size-1 rounded-full bg-ember/80 shadow-[0_0_14px_rgba(244,197,106,0.82)]" />
          <span className="absolute bottom-[34%] right-[32%] size-1.5 rounded-full bg-[#d8c3ff]/76 shadow-[0_0_18px_rgba(216,195,255,0.8)]" />
        </div>
      </div>

      {/* Animated glow only: arcane book/tablet */}
      <div className="hero-book-glow absolute left-[52%] top-[48%] z-20 h-[15%] w-[21%] rotate-[-8deg] motion-reduce:animate-none">
        <div className="absolute inset-[-30%] rounded-[45%] bg-[radial-gradient(circle,rgba(244,197,106,0.16),rgba(139,92,246,0.28)_44%,transparent_74%)] blur-xl" />
        <div className="absolute inset-x-[18%] top-[30%] h-[14%] rounded-full bg-violet/62 blur-md" />
        <div className="absolute left-[42%] top-[39%] size-2 rounded-full bg-white/82 shadow-[0_0_18px_rgba(255,255,255,0.82)]" />
        <div className="hero-magic-particles absolute inset-0 motion-reduce:hidden">
          <span className="absolute left-[20%] top-[20%] size-1 rounded-full bg-ember/75 shadow-[0_0_12px_rgba(244,197,106,0.75)]" />
          <span className="absolute right-[24%] bottom-[30%] size-1 rounded-full bg-violet/80 shadow-[0_0_12px_rgba(139,92,246,0.78)]" />
        </div>
      </div>
    </div>
  );
}
