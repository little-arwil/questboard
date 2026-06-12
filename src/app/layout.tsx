import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

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
    <html lang="id" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="font-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
