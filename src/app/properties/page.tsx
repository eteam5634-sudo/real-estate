"use client";

import { EmptyState } from "@/components/EmptyState";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFiltersPanel } from "@/components/PropertyFiltersPanel";
import { PropertyGridSkeleton } from "@/components/Skeletons";
import {
  defaultFilters,
  filterProperties,
  getAllProperties,
  sortProperties,
} from "@/lib/properties";
import type { Collection, PropertyFilters, SortOption } from "@/types/property";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("newest");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const collection = searchParams.get("collection") as Collection | null;
    const type = searchParams.get("type");
    const location = searchParams.get("location");
    const search = searchParams.get("search");

    setFilters((prev) => ({
      ...prev,
      collection: collection ?? "All",
      type:
        type === "Apartment" ||
        type === "House" ||
        type === "Villa" ||
        type === "Penthouse" ||
        type === "Commercial"
          ? type
          : "All",
      location: location ?? "",
      search: search ?? "",
    }));
    setReady(true);
  }, [searchParams]);

  const results = useMemo(() => {
    const filtered = filterProperties(getAllProperties(), filters);
    return sortProperties(filtered, sort);
  }, [filters, sort]);

  if (!ready) return <PropertyGridSkeleton />;

  const hasActiveFilters =
    filters.search ||
    filters.type !== "All" ||
    filters.location ||
    filters.featured ||
    filters.bedrooms !== null ||
    filters.bathrooms !== null ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.collection !== "All";

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="editorial-label">Properties</p>
        <h1 className="font-display mt-3 text-5xl sm:text-6xl">
          EXPLORE PROPERTIES
        </h1>
        <p className="mt-4 text-[var(--fg-muted)]">
          Discover carefully selected homes and spaces across prime locations.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <PropertyFiltersPanel
          filters={filters}
          sort={sort}
          count={results.length}
          onChange={setFilters}
          onSortChange={setSort}
          onClear={() => setFilters(defaultFilters)}
        />

        <div>
          {results.length === 0 ? (
            <EmptyState
              title={
                filters.search
                  ? "NO PROPERTIES FOUND"
                  : "No properties match these filters."
              }
              description={
                filters.search
                  ? "No properties match your search."
                  : "Try adjusting your filters to see more homes."
              }
              actionHref="/properties"
              actionLabel="Clear Filters"
            >
              {hasActiveFilters && (
                <button
                  type="button"
                  className="btn btn-secondary mt-4"
                  onClick={() => setFilters(defaultFilters)}
                >
                  {filters.search ? "Clear Search" : "Reset Filters"}
                </button>
              )}
            </EmptyState>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertyGridSkeleton />}>
      <PropertiesContent />
    </Suspense>
  );
}
