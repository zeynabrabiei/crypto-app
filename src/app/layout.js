import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FavoritesProvider } from "@/components/crypto/FavoritesProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: { default: "Chainfolio — Crypto Market Dashboard", template: "%s · Chainfolio" },
  description: "Track live crypto prices, explore market data and charts, and save your favorite coins.",
  openGraph: {
    title: "Chainfolio — Crypto Market Dashboard",
    description: "Live prices, charts and favorites powered by CoinGecko.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-zinc-950 text-zinc-100 antialiased`}>
        <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(52,211,153,0.10),transparent)]" />
        <FavoritesProvider>
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}