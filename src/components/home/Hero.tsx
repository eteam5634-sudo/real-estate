import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="aurora-surface relative min-h-[calc(100vh-4.5rem)] overflow-hidden">
      <div
        className="aurora-blob -left-20 top-10 h-72 w-72 bg-[var(--aurora-1)]"
        aria-hidden="true"
      />
      <div
        className="aurora-blob right-0 top-32 h-80 w-80 bg-[var(--aurora-2)]"
        aria-hidden="true"
      />
      <div
        className="aurora-blob bottom-10 left-1/3 h-64 w-64 bg-[var(--aurora-3)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="animate-fade-up">
          <p className="editorial-label">Curated Real Estate</p>
          <p className="font-display mt-4 text-3xl tracking-[0.12em] sm:text-4xl">
            AURELIA ESTATES
          </p>
          <h1 className="font-display mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            FIND A SPACE
            <br />
            THAT FEELS
            <br />
            LIKE HOME.
          </h1>
          <p className="mt-6 max-w-md text-base text-[var(--fg-muted)] sm:text-lg">
            Explore carefully selected homes, apartments and architectural
            spaces designed for modern living.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/properties" className="btn btn-primary">
              Explore Properties
            </Link>
            <Link href="/collections" className="btn btn-secondary">
              View Collection
            </Link>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--clay-shadow)] sm:aspect-[5/6]">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
              alt="Modern architectural residence with warm exterior lighting"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          <div className="clay absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 p-4 sm:bottom-6 sm:left-6 sm:right-auto sm:w-[22rem]">
            <div>
              <p className="font-display text-2xl sm:text-3xl">12+</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                Curated Properties
              </p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl">08</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                Prime Locations
              </p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl">04</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                Property Types
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
