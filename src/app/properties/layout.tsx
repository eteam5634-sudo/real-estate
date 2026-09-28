import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Properties",
  description:
    "Discover carefully selected homes and spaces across prime locations with Aurelia Estates.",
  openGraph: {
    title: "Explore Properties — Aurelia Estates",
    description:
      "Discover carefully selected homes and spaces across prime locations.",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
