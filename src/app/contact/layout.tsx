import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Aurelia Estates to enquire about homes, schedule viewings, or discuss your next space.",
  openGraph: {
    title: "Contact — Aurelia Estates",
    description:
      "Let's find your next space. Reach Aurelia Estates by email, phone, or WhatsApp.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
