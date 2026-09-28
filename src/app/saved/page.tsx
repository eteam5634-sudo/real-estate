"use client";

import { EmptyState } from "@/components/EmptyState";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyGridSkeleton } from "@/components/Skeletons";
import { useFavorites } from "@/context/FavoritesContext";
import { getPropertyById } from "@/lib/properties";

export default function SavedPage() {
  const { favorites, ready, count } = useFavorites();

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <PropertyGridSkeleton count={3} />
      </div>
    );
  }

  const saved = favorites
    .map((id) => getPropertyById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="editorial-label">Saved</p>
      <h1 className="font-display mt-3 text-5xl sm:text-6xl">
        SAVED PROPERTIES
      </h1>
      <p className="mt-4 text-[var(--fg-muted)]">
        {count} {count === 1 ? "property" : "properties"} saved
      </p>

      {saved.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="NO SAVED PROPERTIES"
            description="Save homes you want to revisit later."
            actionHref="/properties"
            actionLabel="Explore Properties"
          >
            <p className="mt-3 text-sm text-[var(--fg-muted)]">
              No saved properties yet.
            </p>
          </EmptyState>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
