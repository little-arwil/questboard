import type { Metadata } from "next";
import { CharacterForm } from "@/components/characters/CharacterForm";

export const metadata: Metadata = {
  title: "Create Character | QuestBoard",
};

export default function NewCharacterPage() {
  return <CharacterForm />;
}
