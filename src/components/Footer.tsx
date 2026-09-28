import Link from "next/link";

const links = [
  { href: "/properties", label: "Properties" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[var(--border)]">
      <div
        className="aurora-blob left-[-10%] top-0 h-56 w-56 bg-[var(--aurora-1)]"
        aria-hidden="true"
      />
      <div
        className="aurora-blob bottom-0 right-[-5%] h-48 w-48 bg-[var(--aurora-3)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <p className="font-display text-2xl tracking-[0.08em]">
            AURELIA ESTATES
          </p>
          <p className="mt-4 max-w-xs text-sm text-[var(--fg-muted)]">
            Find a space that feels like home.
          </p>
        </div>

        <div>
          <p className="editorial-label mb-4">Navigation</p>
          <ul className="space-y-3 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:opacity-70">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="editorial-label mb-4">Social</p>
          <ul className="space-y-3 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="editorial-label mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-[var(--fg-muted)]">
            <li>
              <a
                href="mailto:hello@aureliaestates.com"
                className="hover:text-[var(--fg)]"
              >
                hello@aureliaestates.com
              </a>
            </li>
            <li>
              <a href="tel:+2348000000000" className="hover:text-[var(--fg)]">
                +234 800 000 0000
              </a>
            </li>
            <li>Lagos, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-[var(--border)] px-4 py-6 text-center text-xs tracking-[0.14em] text-[var(--fg-muted)] sm:px-6">
        © 2026 AURELIA ESTATES
      </div>
    </footer>
  );
}
