import { PropertyGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="skeleton mb-4 h-4 w-32" />
      <div className="skeleton mb-6 h-12 w-80 max-w-full" />
      <PropertyGridSkeleton />
    </div>
  );
}
