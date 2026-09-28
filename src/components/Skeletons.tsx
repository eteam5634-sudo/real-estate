export function PropertyCardSkeleton() {
  return (
    <div className="clay overflow-hidden">
      <div className="skeleton aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-7 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-6 w-1/3" />
        <div className="grid grid-cols-3 gap-2">
          <div className="skeleton h-10" />
          <div className="skeleton h-10" />
          <div className="skeleton h-10" />
        </div>
        <div className="skeleton h-10 w-full" />
      </div>
    </div>
  );
}

export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PropertyDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="skeleton mb-6 h-4 w-64" />
      <div className="skeleton mb-4 h-12 w-1/2" />
      <div className="skeleton mb-8 h-5 w-1/3" />
      <div className="skeleton aspect-[16/10] w-full" />
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="skeleton h-40 w-full" />
          <div className="skeleton h-32 w-full" />
        </div>
        <div className="skeleton h-64 w-full" />
      </div>
    </div>
  );
}

export function CompareSkeleton() {
  return (
    <div className="clay overflow-hidden">
      <div className="skeleton h-12 w-full rounded-none" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton mx-4 my-3 h-10" />
      ))}
    </div>
  );
}
