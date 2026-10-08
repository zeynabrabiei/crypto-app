import { card, wrap } from "@/lib/utils";

export const Bar = ({ className = "" }) => <div className={`animate-pulse rounded-md bg-white/10 ${className}`} />;

export const CardSkeleton = () => (
  <div className={`${card} p-5`} aria-hidden>
    <div className="flex items-center gap-3">
      <Bar className="h-10 w-10 rounded-full" />
      <div className="space-y-2"><Bar className="h-4 w-24" /><Bar className="h-3 w-12" /></div>
    </div>
    <Bar className="mt-6 h-7 w-32" />
    <Bar className="mt-4 h-10 w-full" />
    <div className="mt-4 flex justify-between"><Bar className="h-3 w-16" /><Bar className="h-3 w-20" /></div>
  </div>
);

export const GridSkeleton = ({ count = 12 }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="status" aria-label="Loading coins">
    {Array.from({ length: count }, (_, i) => <CardSkeleton key={i} />)}
  </div>
);

export const PageSkeleton = ({ count }) => (
  <div className={`${wrap} py-10`}>
    <Bar className="h-9 w-56" />
    <Bar className="mt-3 mb-8 h-4 w-80 max-w-full" />
    <GridSkeleton count={count} />
  </div>
);

export const DetailsSkeleton = () => (
  <div className={`${wrap} py-10`} role="status" aria-label="Loading coin details">
    <div className="flex items-center gap-4">
      <Bar className="h-16 w-16 rounded-full" />
      <div className="space-y-2"><Bar className="h-7 w-48" /><Bar className="h-4 w-20" /></div>
    </div>
    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, i) => <Bar key={i} className="h-24 rounded-2xl" />)}
    </div>
    <Bar className="mt-6 h-[26rem] rounded-2xl" />
  </div>
);