import { formatArea, formatPrice } from "@/lib/format";
import { getFeaturedProperties } from "@/lib/properties";
import { Bath, BedDouble, Maximize2 } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

export function FeaturedProperty() {
  const featured =
    getFeaturedProperties().find((p) => p.slug === "casa-verde") ??
    getFeaturedProperties()[0];

  if (!featured) return null;

  return (
    <section className="aurora-surface relative py-20">
      <div
        className="aurora-blob -right-10 top-20 h-72 w-72 bg-[var(--aurora-2)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="editorial-label">Featured Residence</p>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl">
          A home composed with intention.
        </h2>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] shadow-[var(--clay-shadow)] lg:min-h-[32rem]">
            <Image
              src={featured.images[0]}
              alt={`${featured.name} featured residence in ${featured.city}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="clay flex flex-col justify-between p-7 sm:p-9">
            <div>
              <p className="editorial-label">{featured.type}</p>
              <h3 className="font-display mt-3 text-4xl">{featured.name}</h3>
              <p className="mt-2 text-[var(--fg-muted)]">
                {featured.location}, {featured.city}, {featured.country}
              </p>
              <p className="mt-6 text-2xl font-semibold tracking-wide">
                {formatPrice(featured.price, featured.currency)}
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-3">
                <div className="clay-inset p-3">
                  <dt className="flex items-center gap-1 text-xs text-[var(--fg-muted)]">
                    <BedDouble size={14} /> Beds
                  </dt>
                  <dd className="mt-1 text-lg font-medium">
                    {featured.bedrooms}
                  </dd>
                </div>
                <div className="clay-inset p-3">
                  <dt className="flex items-center gap-1 text-xs text-[var(--fg-muted)]">
                    <Bath size={14} /> Baths
                  </dt>
                  <dd className="mt-1 text-lg font-medium">
                    {featured.bathrooms}
                  </dd>
                </div>
                <div className="clay-inset p-3">
                  <dt className="flex items-center gap-1 text-xs text-[var(--fg-muted)]">
                    <Maximize2 size={14} /> Area
                  </dt>
                  <dd className="mt-1 text-lg font-medium">
                    {formatArea(featured.area)}
                  </dd>
                </div>
              </dl>
            </div>

            <Link
              href={`/properties/${featured.id}`}
              className="btn btn-primary mt-8 w-full sm:w-auto"
            >
              View Property
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
