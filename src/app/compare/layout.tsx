import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Properties",
  description: "Compare up to three curated properties side by side.",
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
