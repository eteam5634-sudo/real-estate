import { getCollectionCounts } from "@/lib/properties";
import type { Collection } from "@/types/property";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore curated property collections from Modern Living to Architectural Homes.",
  openGraph: {
    title: "Collections — Aurelia Estates",
    description:
      "Explore curated property collections from Modern Living to Architectural Homes.",
  },
};

const collections: Array<{
  number: string;
  title: Collection;
  description: string;
  image: string;
}> = [
  {
    number: "01",
    title: "Modern Living",
    description: "Contemporary apartments and homes.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80",
  },
  {
    number: "02",
    title: "Private Residences",
    description: "Larger homes designed for comfort and privacy.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  },
  {
    number: "03",
    title: "Urban Spaces",
    description: "Properties located close to major city centers.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  },
  {
    number: "04",
    title: "Architectural Homes",
    description: "Distinctive properties with strong architectural character.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
  },
];

export default function CollectionsPage() {
  const counts = getCollectionCounts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="editorial-label">Collections</p>
      <h1 className="font-display mt-3 text-5xl sm:text-6xl">
        Curated worlds of living.
      </h1>
      <p className="mt-4 max-w-xl text-[var(--fg-muted)]">
        Explore homes grouped by atmosphere, privacy, urban energy, and
        architectural character.
      </p>

      <div className="mt-12 grid gap-8">
        {collections.map((collection) => (
          <article
            key={collection.title}
            className="grid overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--clay-shadow)] lg:grid-cols-2"
          >
            <div className="relative min-h-[16rem] lg:min-h-[22rem]">
              <Image
                src={collection.image}
                alt={`${collection.title} collection imagery`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="editorial-label">{collection.number}</p>
              <h2 className="font-display mt-3 text-4xl uppercase tracking-[0.04em]">
                {collection.title}
              </h2>
              <p className="mt-4 text-[var(--fg-muted)]">
                {collection.description}
              </p>
              <p className="mt-6 text-sm tracking-wide text-[var(--fg-muted)]">
                {counts[collection.title]}{" "}
                {counts[collection.title] === 1 ? "Property" : "Properties"}
              </p>
              <Link
                href={`/properties?collection=${encodeURIComponent(collection.title)}`}
                className="btn btn-primary mt-8 w-fit"
              >
                View Collection
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
