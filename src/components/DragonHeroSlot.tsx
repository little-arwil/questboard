"use client";

import dynamic from "next/dynamic";

const DragonHeroScene = dynamic(
  () => import("@/components/DragonHeroScene").then((mod) => mod.DragonHeroScene),
  {
    ssr: false,
  },
);

export function DragonHeroSlot() {
  return <DragonHeroScene />;
}
