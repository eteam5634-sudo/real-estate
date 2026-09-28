"use client";

import { useCompare } from "@/context/CompareContext";
import { useFavorites } from "@/context/FavoritesContext";
import { formatArea, formatPrice } from "@/lib/format";
import type { Property } from "@/types/property";
import { Bath, BedDouble, GitCompare, Heart, Maximize2 } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isCompared, toggleCompare } = useCompare();
  const [toast, setToast] = useState<string | null>(null);
  const fav = isFavorite(property.id);
  const compared = isCompared(property.id);

  const onCompare = () => {
    const result = toggleCompare(property.id);
    if (!result.ok && result.message) {
      setToast(result.message);
      window.setTimeout(() => setToast(null), 2200);
    }
  };

  return (
    <article className="property-card clay relative flex flex-col overflow-hidden transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={`${property.name} exterior in ${property.location}, ${property.city}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--bg-elevated)]/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] backdrop-blur">
            {property.type}
          </span>
          {property.featured && (
            <span className="rounded-full bg-[var(--fg)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--bg)]">
              Featured
            </span>
          )}
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(property.id)}
            className="grid h-10 w-10 place-items-center rounded-full bg-[var(--bg-elevated)]/90 backdrop-blur transition-transform hover:scale-105"
            aria-label={fav ? "Remove from saved" : "Save property"}
            aria-pressed={fav}
          >
            <Heart
              size={16}
              className={fav ? "fill-red-500 text-red-500" : ""}
            />
          </button>
          <button
            type="button"
            onClick={onCompare}
            className="grid h-10 w-10 place-items-center rounded-full bg-[var(--bg-elevated)]/90 backdrop-blur transition-transform hover:scale-105"
            aria-label={compared ? "Remove from compare" : "Add to compare"}
            aria-pressed={compared}
          >
            <GitCompare
              size={16}
              className={compared ? "text-[var(--focus)]" : ""}
            />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl">{property.name}</h3>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          {property.location}, {property.city}
        </p>
        <p className="mt-3 text-lg font-semibold tracking-wide">
          {formatPrice(property.price, property.currency)}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-2 text-sm text-[var(--fg-muted)]">
          <div className="clay-inset flex items-center gap-1.5 px-2 py-2">
            <BedDouble size={14} aria-hidden="true" />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{property.bedrooms || "—"}</dd>
          </div>
          <div className="clay-inset flex items-center gap-1.5 px-2 py-2">
            <Bath size={14} aria-hidden="true" />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{property.bathrooms}</dd>
          </div>
          <div className="clay-inset flex items-center gap-1.5 px-2 py-2">
            <Maximize2 size={14} aria-hidden="true" />
            <dt className="sr-only">Area</dt>
            <dd>{formatArea(property.area)}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(property.id)}
            className="btn btn-ghost px-3 py-2 text-xs"
          >
            {fav ? "Saved" : "Favorite"}
          </button>
          <button
            type="button"
            onClick={onCompare}
            className="btn btn-ghost px-3 py-2 text-xs"
          >
            {compared ? "Comparing" : "Compare"}
          </button>
          <Link
            href={`/properties/${property.id}`}
            className="btn btn-primary ml-auto px-4 py-2 text-xs"
          >
            View Property
          </Link>
        </div>
        {toast && (
          <p className="mt-3 text-xs text-[var(--fg-muted)]" role="status">
            {toast}
          </p>
        )}
      </div>
    </article>
  );
}
