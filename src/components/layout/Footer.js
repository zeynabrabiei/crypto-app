import Link from "next/link";
import { wrap } from "@/lib/utils";

const nav = [
  ["/", "Dashboard"],
  ["/coins", "Markets"],
  ["/favorites", "Favorites"],
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/zeynabrabiei",
    external: true,
    icon: (
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zeynabrabiei",
    external: true,
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:zeynabrabiei92@gmail.com",
    external: false,
    icon: (
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.6 2 7.4 5.3L19.4 7H4.6ZM4 8.9V17h16V8.9l-8 5.7-8-5.7Z" />
    ),
  },
];

const link = "text-sm text-zinc-400 transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className={`${wrap} py-12`}>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400 text-zinc-950" aria-hidden>◆</span>
              CoinX Market
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Live crypto prices, market data and interactive charts, with favorites saved right in your browser.
            </p>
          </div>

          <div className="flex gap-16 sm:gap-24">
            <nav aria-label="Footer">
              <h2 className="text-xs font-medium uppercase tracking-wider ">Explore</h2>
              <ul className="mt-4 space-y-3">
                {nav.map(([href, label]) => (
                  <li key={href} className=" hover:bg-emerald-400/10 hover:text-emerald-300"><Link href={href} className={link}>{label}</Link></li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Connect</h2>
              <ul className="mt-4 flex gap-2">
                {socials.map(({ label, href, external, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      title={label}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-zinc-400 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300"
                    >
                      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden>{icon}</svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Designed &amp; built by{" "}
            <a
              href="https://github.com/zeynabrabiei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 transition-colors hover:text-emerald-300"
            >
              Zeynab Rabiei
            </a>
          </p>
          <p>Market data by CoinGecko · Not financial advice</p>
        </div>
      </div>
    </footer>
  );
}