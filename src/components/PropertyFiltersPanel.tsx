"use client";

import { CITIES, PROPERTY_TYPES } from "@/lib/properties";
import type { PropertyFilters, PropertyType, SortOption } from "@/types/property";
import { SlidersHorizontal, X } from "@/components/icons";
import { useEffect, useId, useRef, useState } from "react";

interface PropertyFiltersPanelProps {
  filters: PropertyFilters;
  sort: SortOption;
  count: number;
  onChange: (filters: PropertyFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onClear: () => void;
}

const typeLabels: Record<PropertyType | "All", string> = {
  All: "All",
  Apartment: "Apartments",
  House: "Houses",
  Villa: "Villas",
  Penthouse: "Penthouses",
  Commercial: "Commercial",
};

export function PropertyFiltersPanel({
  filters,
  sort,
  count,
  onChange,
  onSortChange,
  onClear,
}: PropertyFiltersPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [draft, setDraft] = useState(filters);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const update = (partial: Partial<PropertyFilters>) => {
    onChange({ ...filters, ...partial });
  };

  const FilterFields = ({
    value,
    setValue,
  }: {
    value: PropertyFilters;
    setValue: (v: PropertyFilters) => void;
  }) => (
    <div className="space-y-5">
      <div>
        <label htmlFor="search" className="mb-1.5 block text-sm">
          Search
        </label>
        <input
          id="search"
          type="search"
          placeholder="Name, location, city, type..."
          value={value.search}
          onChange={(e) => setValue({ ...value, search: e.target.value })}
          className="clay-inset w-full px-4 py-3 outline-none"
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm">Property Type</legend>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setValue({ ...value, type })}
              className={`rounded-full px-3 py-1.5 text-xs tracking-wide transition ${
                value.type === type
                  ? "bg-[var(--fg)] text-[var(--bg)]"
                  : "clay-sm"
              }`}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="location" className="mb-1.5 block text-sm">
          Location
        </label>
        <select
          id="location"
          value={value.location}
          onChange={(e) => setValue({ ...value, location: e.target.value })}
          className="clay-inset w-full px-4 py-3 outline-none"
        >
          <option value="">All locations</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="minPrice" className="mb-1.5 block text-sm">
            Min Price
          </label>
          <input
            id="minPrice"
            type="number"
            min={0}
            placeholder="0"
            value={value.minPrice ?? ""}
            onChange={(e) =>
              setValue({
                ...value,
                minPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="clay-inset w-full px-3 py-3 outline-none"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mb-1.5 block text-sm">
            Max Price
          </label>
          <input
            id="maxPrice"
            type="number"
            min={0}
            placeholder="Any"
            value={value.maxPrice ?? ""}
            onChange={(e) =>
              setValue({
                ...value,
                maxPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="clay-inset w-full px-3 py-3 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="beds" className="mb-1.5 block text-sm">
            Bedrooms
          </label>
          <select
            id="beds"
            value={value.bedrooms ?? ""}
            onChange={(e) =>
              setValue({
                ...value,
                bedrooms: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="clay-inset w-full px-3 py-3 outline-none"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="baths" className="mb-1.5 block text-sm">
            Bathrooms
          </label>
          <select
            id="baths"
            value={value.bathrooms ?? ""}
            onChange={(e) =>
              setValue({
                ...value,
                bathrooms: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="clay-inset w-full px-3 py-3 outline-none"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={value.featured}
          onChange={(e) => setValue({ ...value, featured: e.target.checked })}
          className="h-4 w-4"
        />
        Featured only
      </label>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="editorial-label">
          {count} {count === 1 ? "Property" : "Properties"}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-[var(--fg-muted)]">Sort</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="clay-sm px-3 py-2 outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price — Low to High</option>
              <option value="price-desc">Price — High to Low</option>
              <option value="area-desc">Largest Area</option>
              <option value="bedrooms-desc">Most Bedrooms</option>
            </select>
          </label>
          <button
            type="button"
            className="btn btn-secondary lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <SlidersHorizontal size={16} />
            Filter
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="clay p-5">
          <FilterFields
            value={filters}
            setValue={(v) => {
              onChange(v);
            }}
          />
          <div className="mt-5 flex gap-2">
            {(filters.search ||
              filters.type !== "All" ||
              filters.location ||
              filters.featured ||
              filters.bedrooms !== null ||
              filters.bathrooms !== null ||
              filters.minPrice !== null ||
              filters.maxPrice !== null ||
              filters.collection !== "All") && (
              <>
                <button type="button" onClick={onClear} className="btn btn-ghost">
                  Clear All
                </button>
                {filters.search && (
                  <button
                    type="button"
                    onClick={() => update({ search: "" })}
                    className="btn btn-ghost"
                  >
                    Clear Search
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 animate-fade-in lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute inset-y-0 right-0 w-full max-w-md overflow-y-auto bg-[var(--bg)] p-6 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id={titleId} className="font-display text-2xl">
                Filter
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                className="clay-sm grid h-10 w-10 place-items-center rounded-full"
                aria-label="Close filters"
              >
                <X size={16} />
              </button>
            </div>
            <FilterFields value={draft} setValue={setDraft} />
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                className="btn btn-ghost flex-1"
                onClick={() => {
                  onClear();
                  setMobileOpen(false);
                }}
              >
                Clear All
              </button>
              <button
                type="button"
                className="btn btn-primary flex-1"
                onClick={() => {
                  onChange(draft);
                  setMobileOpen(false);
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
