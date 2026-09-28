import { CompareSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <CompareSkeleton />
    </div>
  );
}
