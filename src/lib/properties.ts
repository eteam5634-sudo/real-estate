import { properties } from "@/data/properties";
import type {
  Collection,
  Property,
  PropertyFilters,
  PropertyType,
  SortOption,
} from "@/types/property";

export function getAllProperties(): Property[] {
  return properties;
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id || p.slug === id);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getSimilarProperties(
  property: Property,
  limit = 3
): Property[] {
  return properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.collection === property.collection ||
          p.city === property.city ||
          p.type === property.type)
    )
    .slice(0, limit);
}

export function getPropertiesByCollection(
  collection: Collection
): Property[] {
  return properties.filter((p) => p.collection === collection);
}

export function getCollectionCounts(): Record<Collection, number> {
  const counts = {
    "Modern Living": 0,
    "Private Residences": 0,
    "Urban Spaces": 0,
    "Architectural Homes": 0,
  } as Record<Collection, number>;

  for (const p of properties) {
    counts[p.collection] += 1;
  }
  return counts;
}

export function filterProperties(
  list: Property[],
  filters: PropertyFilters
): Property[] {
  const q = filters.search.trim().toLowerCase();

  return list.filter((p) => {
    if (q) {
      const haystack = [
        p.name,
        p.location,
        p.city,
        p.type,
        p.collection,
        p.country,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (filters.type !== "All" && p.type !== filters.type) return false;
    if (filters.location && p.city !== filters.location) return false;
    if (filters.collection !== "All" && p.collection !== filters.collection)
      return false;
    if (filters.featured && !p.featured) return false;
    if (filters.bedrooms !== null && p.bedrooms < filters.bedrooms)
      return false;
    if (filters.bathrooms !== null && p.bathrooms < filters.bathrooms)
      return false;
    if (filters.minPrice !== null && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && p.price > filters.maxPrice) return false;

    return true;
  });
}

export function sortProperties(
  list: Property[],
  sort: SortOption
): Property[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "area-desc":
      return sorted.sort((a, b) => b.area - a.area);
    case "bedrooms-desc":
      return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
    case "newest":
    default:
      return sorted.sort((a, b) => b.yearBuilt - a.yearBuilt);
  }
}

export const PROPERTY_TYPES: Array<PropertyType | "All"> = [
  "All",
  "Apartment",
  "House",
  "Villa",
  "Penthouse",
  "Commercial",
];

export const CITIES = ["Lagos", "Abuja", "Ibadan", "Port Harcourt"] as const;

export const COLLECTIONS: Collection[] = [
  "Modern Living",
  "Private Residences",
  "Urban Spaces",
  "Architectural Homes",
];

export const defaultFilters: PropertyFilters = {
  search: "",
  type: "All",
  location: "",
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  bathrooms: null,
  featured: false,
  collection: "All",
};
