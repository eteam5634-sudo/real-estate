import { PropertyCard } from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/properties";
import Link from "next/link";

export function HomeCollectionsPreview() {
  const sample = getAllProperties().slice(0, 3);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="editorial-label">Selected Homes</p>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">
              Spaces worth lingering in.
            </h2>
          </div>
          <Link href="/properties" className="btn btn-secondary">
            View All Properties
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sample.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCTA() {
  return (
    <section className="aurora-surface relative py-20">
      <div
        className="aurora-blob left-10 top-10 h-56 w-56 bg-[var(--aurora-1)]"
        aria-hidden="true"
      />
      <div
        className="aurora-blob bottom-0 right-10 h-64 w-64 bg-[var(--aurora-3)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="clay px-8 py-14 text-center sm:px-12">
          <p className="editorial-label">Begin Your Search</p>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            Ready to find your next space?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--fg-muted)]">
            Browse curated collections or speak with our team about a property
            that matches your lifestyle.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/properties" className="btn btn-primary">
              Explore Properties
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
