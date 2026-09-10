import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "FairTick — Protected Trade Ticket for Coinbase Tokenized Stocks on Base",
  description:
    "Don’t overpay for onchain Apple. FairTick guards your execution against stale equity feeds, paused corporate splits, and rich DEX markups for B20 tokens on Base.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  other: {
    "base:app_id": "6a999ca7dd129945bdac11ff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${newsreader.variable} min-h-screen text-zinc-100 flex flex-col antialiased relative`}>
        <Providers>
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
