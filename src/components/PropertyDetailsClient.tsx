"use client";

import { PropertyCard } from "@/components/PropertyCard";
import { PropertyGallery } from "@/components/PropertyGallery";
import { ViewingModal } from "@/components/ViewingModal";
import { formatArea, formatPrice } from "@/lib/format";
import { getSimilarProperties } from "@/lib/properties";
import {
  openWhatsApp,
  propertyInterestMessage,
} from "@/lib/whatsapp";
import type { Property } from "@/types/property";
import { Bath, BedDouble, Calendar, Maximize2 } from "@/components/icons";
import Link from "next/link";
import { useState } from "react";

export function PropertyDetailsClient({ property }: { property: Property }) {
  const [viewingOpen, setViewingOpen] = useState(false);
  const similar = getSimilarProperties(property);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--fg-muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-[var(--fg)]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/properties" className="hover:text-[var(--fg)]">
              Properties
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[var(--fg)]">
            {property.name}
          </li>
        </ol>
      </nav>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="editorial-label">{property.type}</p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl lg:text-6xl">
            {property.name}
          </h1>
          <p className="mt-3 text-[var(--fg-muted)]">
            {property.location}, {property.city}, {property.country}
          </p>
        </div>
        <p className="text-2xl font-semibold tracking-wide sm:text-3xl">
          {formatPrice(property.price, property.currency)}
        </p>
      </div>

      <div className="mt-8">
        <PropertyGallery
          images={property.images}
          name={property.name}
          location={`${property.location}, ${property.city}`}
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Bedrooms",
            value: property.bedrooms || "—",
            icon: BedDouble,
          },
          { label: "Bathrooms", value: property.bathrooms, icon: Bath },
          {
            label: "Area",
            value: formatArea(property.area),
            icon: Maximize2,
          },
          {
            label: "Year Built",
            value: property.yearBuilt,
            icon: Calendar,
          },
        ].map((stat) => (
          <div key={stat.label} className="clay-sm p-4">
            <stat.icon size={16} className="text-[var(--fg-muted)]" />
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              {stat.label}
            </p>
            <p className="mt-1 text-xl font-medium">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-10">
          <section>
            <h2 className="editorial-label">About This Property</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--fg-muted)]">
              {property.description}
            </p>
          </section>

          <section>
            <h2 className="editorial-label">Property Features</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li key={feature} className="clay-inset px-4 py-3 text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="editorial-label">Location</h2>
            <div className="clay relative mt-4 overflow-hidden">
              <div
                className="flex aspect-[16/9] items-end bg-[linear-gradient(135deg,var(--aurora-1),var(--aurora-2)_45%,var(--aurora-3))] p-6"
                role="img"
                aria-label={`Map placeholder for ${property.location}, ${property.city}`}
              >
                <div className="clay-sm bg-[var(--bg-elevated)]/90 px-4 py-3 backdrop-blur">
                  <p className="font-medium">
                    {property.location}, {property.city}
                  </p>
                  <p className="text-sm text-[var(--fg-muted)]">
                    {property.country}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="aurora-surface">
          <div className="clay sticky top-28 p-6">
            <p className="editorial-label">Interested in this property?</p>
            <p className="mt-3 text-sm text-[var(--fg-muted)]">
              Speak with {property.agentName} about availability, viewings, and
              next steps.
            </p>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() =>
                  openWhatsApp(
                    propertyInterestMessage(
                      property.name,
                      `${property.city}`
                    )
                  )
                }
              >
                Contact Agent
              </button>
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={() => setViewingOpen(true)}
              >
                Request Viewing
              </button>
            </div>
            <p className="mt-4 text-xs text-[var(--fg-muted)]">
              {property.agentPhone}
            </p>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="editorial-label">Similar Properties</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {similar.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </section>
      )}

      <ViewingModal
        open={viewingOpen}
        onClose={() => setViewingOpen(false)}
        propertyName={property.name}
      />
    </div>
  );
}
