import { wrap } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-8">
      <p className={`${wrap} text-sm text-zinc-500`}>
        Market data by CoinGecko. Built with Next.js and Tailwind CSS. Not financial advice.
      </p>
    </footer>
  );
}