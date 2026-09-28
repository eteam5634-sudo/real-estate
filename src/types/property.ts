export type PropertyType =
  | "Apartment"
  | "House"
  | "Villa"
  | "Penthouse"
  | "Commercial";

export type Collection =
  | "Modern Living"
  | "Private Residences"
  | "Urban Spaces"
  | "Architectural Homes";

export interface Property {
  id: string;
  slug: string;
  name: string;
  type: PropertyType;
  location: string;
  city: string;
  country: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  description: string;
  shortDescription: string;
  features: string[];
  images: string[];
  featured: boolean;
  collection: Collection;
  agentName: string;
  agentPhone: string;
}

export interface PropertyFilters {
  search: string;
  type: PropertyType | "All";
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  featured: boolean;
  collection: Collection | "All";
}

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "area-desc"
  | "bedrooms-desc";
