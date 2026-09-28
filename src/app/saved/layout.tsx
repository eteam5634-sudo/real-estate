import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Properties",
  description: "Revisit homes you have saved with Aurelia Estates.",
};

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
