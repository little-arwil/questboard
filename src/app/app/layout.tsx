import type { Metadata } from "next";
import { AppShell } from "@/components/prototype/AppShell";

export const metadata: Metadata = {
  title: "QuestBoard App Prototype",
  description:
    "Clickable mock QuestBoard app prototype for browsing campaigns, profile setup, DM creation, and applications.",
};

export default function PrototypeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}
