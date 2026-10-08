import { NextResponse } from "next/server";
import { getChart, getMarkets, searchCoins } from "@/lib/api";

export async function GET(req) {
  const p = new URL(req.url).searchParams;
  const type = p.get("type");
  try {
    if (type === "search") {
      const { coins } = await searchCoins(p.get("q") || "");
      return NextResponse.json(
        coins.slice(0, 8).map(({ id, name, symbol, thumb, market_cap_rank }) => ({
          id, name, symbol, thumb, market_cap_rank,
        }))
      );
    }
    if (type === "chart") {
      const days = ["1", "7", "30", "90", "365"].includes(p.get("days")) ? p.get("days") : "7";
      const { prices } = await getChart(p.get("id"), days);
      return NextResponse.json(prices.map((x) => x[1]));
    }
    if (type === "markets") {
      return NextResponse.json(await getMarkets({ ids: p.get("ids"), perPage: 100 }));
    }
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Data temporarily unavailable" }, { status: 502 });
  }
}