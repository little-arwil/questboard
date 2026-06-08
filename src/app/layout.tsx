import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuestBoard | D&D Tabletop RPG Matchmaking",
  description:
    "QuestBoard membantu player dan DM menemukan table D&D yang cocok berdasarkan jadwal, timezone, bahasa, playstyle, dan ekspektasi campaign.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
