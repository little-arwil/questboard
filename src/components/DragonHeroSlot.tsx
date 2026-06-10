"use client";

import dynamic from "next/dynamic";
import { HeroCharacter } from "@/components/HeroCharacter";

const DragonHeroScene = dynamic(
  () => import("@/components/DragonHeroScene").then((mod) => mod.DragonHeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="hidden aspect-[1.05] w-full max-w-[35rem] lg:block xl:max-w-[40rem]" />
    ),
  },
);

export function DragonHeroSlot() {
  return (
    <>
      <div className="hidden lg:block">
        <DragonHeroScene />
      </div>
      <div className="lg:hidden">
        <HeroCharacter />
      </div>
    </>
  );
}
