import { CompareBar } from "@/components/CompareBar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aureliaestates.example.com"),
  title: {
    default: "Aurelia Estates — Find Your Space",
    template: "%s — Aurelia Estates",
  },
  description:
    "Explore carefully selected homes, apartments and architectural spaces designed for modern living.",
  openGraph: {
    title: "Aurelia Estates — Find Your Space",
    description:
      "Explore carefully selected homes, apartments and architectural spaces designed for modern living.",
    type: "website",
    locale: "en_NG",
    siteName: "Aurelia Estates",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[var(--bg)] text-[var(--fg)]">
        <Providers>
          <Navbar />
          <main className="flex-1 pb-24">{children}</main>
          <Footer />
          <CompareBar />
        </Providers>
      </body>
    </html>
  );
}
