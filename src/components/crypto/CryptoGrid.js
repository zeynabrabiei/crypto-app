import CryptoCard from "./CryptoCard";

export default function CryptoGrid({ coins }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {coins.map((c) => <CryptoCard key={c.id} coin={c} />)}
    </div>
  );
}