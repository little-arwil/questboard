"use client";

import dynamic from "next/dynamic";
import { HeroCharacter } from "@/components/HeroCharacter";

const DragonHeroScene = dynamic(
  () => import("@/components/DragonHeroScene").then((mod) => mod.DragonHeroScene),
  {
    ssr: false,
    loading: () => null,
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
