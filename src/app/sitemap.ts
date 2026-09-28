import { getAllProperties } from "@/lib/properties";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aureliaestates.example.com";
  const staticRoutes = [
    "",
    "/properties",
    "/collections",
    "/about",
    "/contact",
    "/saved",
    "/compare",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const propertyRoutes = getAllProperties().map((p) => ({
    url: `${base}/properties/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
