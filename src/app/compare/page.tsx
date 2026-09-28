"use client";

import { EmptyState } from "@/components/EmptyState";
import { CompareSkeleton } from "@/components/Skeletons";
import { useCompare } from "@/context/CompareContext";
import { formatArea, formatPrice } from "@/lib/format";
import { getPropertyById } from "@/lib/properties";
import { X } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

export default function ComparePage() {
  const { compareIds, ready, removeCompare, clearCompare } = useCompare();

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <CompareSkeleton />
      </div>
    );
  }

  const items = compareIds
    .map((id) => getPropertyById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="editorial-label">Compare</p>
          <h1 className="font-display mt-3 text-5xl sm:text-6xl">
            Property Comparison
          </h1>
          <p className="mt-4 text-[var(--fg-muted)]">
            Compare up to 3 properties side by side.
          </p>
        </div>
        {items.length > 0 && (
          <button type="button" onClick={clearCompare} className="btn btn-ghost">
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="Add properties to compare."
            description="Select up to 3 homes from the property listings to compare features."
            actionHref="/properties"
            actionLabel="Explore Properties"
          />
        </div>
      ) : (
        <div className="mt-10 overflow-x-auto">
          <table className="clay min-w-[720px] w-full border-collapse overflow-hidden text-left">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="p-4 text-sm text-[var(--fg-muted)]">Property</th>
                {items.map((p) => (
                  <th key={p.id} className="p-4">
                    <div className="relative mb-3 aspect-[4/3] w-40 overflow-hidden rounded-xl">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/properties/${p.id}`}
                        className="font-display text-xl hover:opacity-70"
                      >
                        {p.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeCompare(p.id)}
                        aria-label={`Remove ${p.name}`}
                        className="clay-sm grid h-8 w-8 place-items-center rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Price", (p) => formatPrice(p.price, p.currency)],
                  ["Location", (p) => `${p.location}, ${p.city}`],
                  ["Type", (p) => p.type],
                  ["Bedrooms", (p) => String(p.bedrooms || "—")],
                  ["Bathrooms", (p) => String(p.bathrooms)],
                  ["Area", (p) => formatArea(p.area)],
                  ["Year Built", (p) => String(p.yearBuilt)],
                  ["Features", (p) => p.features.join(", ")],
                ] as Array<[string, (p: (typeof items)[number]) => string]>
              ).map(([label, getter]) => (
                <tr key={label} className="border-b border-[var(--border)]">
                  <th className="p-4 align-top text-sm text-[var(--fg-muted)]">
                    {label}
                  </th>
                  {items.map((p) => (
                    <td key={`${p.id}-${label}`} className="p-4 align-top text-sm">
                      {getter(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
