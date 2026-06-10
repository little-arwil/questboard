"use client";

import dynamic from "next/dynamic";
import { HeroCharacter } from "@/components/HeroCharacter";

const DragonHeroScene = dynamic(
  () => import("@/components/DragonHeroScene").then((mod) => mod.DragonHeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="hidden aspect-[1.02] w-full max-w-[39rem] lg:block xl:max-w-[42rem]" />
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
