import { PropertyDetailsClient } from "@/components/PropertyDetailsClient";
import { getAllProperties, getPropertyById } from "@/lib/properties";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProperties().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return { title: "Property Not Found" };
  return {
    title: property.name,
    description: property.shortDescription,
    openGraph: {
      title: `${property.name} — Aurelia Estates`,
      description: property.shortDescription,
      images: [{ url: property.images[0] }],
    },
  };
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();
  return <PropertyDetailsClient property={property} />;
}
