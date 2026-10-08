import Link from "next/link";
import SearchCrypto from "@/components/crypto/SearchCrypto";
import { wrap } from "@/lib/utils";

const links = [["/", "Dashboard"], ["/coins", "Markets"], ["/favorites", "Favorites"]];
const item = "rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className={`${wrap} flex h-16 items-center gap-4`}>
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400 text-zinc-950" aria-hidden>◆</span>
          Chainfolio
        </Link>
        <nav aria-label="Main" className="ml-4 hidden gap-1 md:flex">
          {links.map(([href, label]) => <Link key={href} href={href} className={item}>{label}</Link>)}
        </nav>
        <div className="ml-auto w-full max-w-[16rem] sm:max-w-sm"><SearchCrypto /></div>
      </div>
      <nav aria-label="Mobile" className="flex gap-1 border-t border-white/5 px-4 py-2 md:hidden">
        {links.map(([href, label]) => <Link key={href} href={href} className={item}>{label}</Link>)}
      </nav>
    </header>
  );
}