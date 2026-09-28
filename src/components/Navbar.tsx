"use client";

import { useCompare } from "@/context/CompareContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useTheme } from "@/context/ThemeContext";
import { Menu, Moon, Sun, X } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  ...navLinks.slice(0, 2),
  { href: "/saved", label: "Saved" },
  { href: "/compare", label: "Compare" },
  ...navLinks.slice(2),
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { count: favCount } = useFavorites();
  const { count: compareCount } = useCompare();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-[0.08em] sm:text-2xl"
          aria-label="Aurelia Estates home"
        >
          AURELIA ESTATES
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-opacity hover:opacity-70 ${
                pathname.startsWith(link.href) ? "opacity-100" : "opacity-75"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/saved"
            className="text-sm opacity-80 transition-opacity hover:opacity-100"
          >
            Saved{favCount > 0 ? ` (${favCount})` : ""}
          </Link>
          <Link
            href="/compare"
            className="text-sm opacity-80 transition-opacity hover:opacity-100"
          >
            Compare{compareCount > 0 ? ` (${compareCount})` : ""}
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="clay-sm grid h-10 w-10 place-items-center rounded-full"
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <Link href="/properties" className="btn btn-primary">
            Explore Homes
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="clay-sm grid h-10 w-10 place-items-center rounded-full"
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            type="button"
            className="clay-sm grid h-10 w-10 place-items-center rounded-full"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 animate-fade-in lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id={menuId}
        className={`fixed inset-y-0 right-0 z-50 w-[min(100%,20rem)] border-l border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="editorial-label">Menu</p>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="clay-sm grid h-10 w-10 place-items-center rounded-full"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex flex-col gap-4" aria-label="Mobile">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-[var(--border)] py-3 text-lg"
            >
              {link.label}
              {link.href === "/saved" && favCount > 0 ? ` (${favCount})` : ""}
              {link.href === "/compare" && compareCount > 0
                ? ` (${compareCount})`
                : ""}
            </Link>
          ))}
        </nav>
        <Link href="/properties" className="btn btn-primary mt-8 w-full">
          Explore Homes
        </Link>
      </div>
    </header>
  );
}
