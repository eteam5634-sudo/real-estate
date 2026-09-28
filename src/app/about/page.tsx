import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Aurelia Estates selects spaces with purpose across location, architecture, quality, and experience.",
  openGraph: {
    title: "About — Aurelia Estates",
    description:
      "We select spaces with purpose — location, architecture, quality, and experience.",
  },
};

const approach = [
  {
    number: "01",
    title: "Location",
    text: "We focus on carefully selected locations.",
  },
  {
    number: "02",
    title: "Architecture",
    text: "We value thoughtful design and functional spaces.",
  },
  {
    number: "03",
    title: "Quality",
    text: "We highlight properties with quality materials and finishes.",
  },
  {
    number: "04",
    title: "Experience",
    text: "We make property discovery simple and enjoyable.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="aurora-surface relative overflow-hidden py-24">
        <div
          className="aurora-blob left-0 top-0 h-72 w-72 bg-[var(--aurora-1)]"
          aria-hidden="true"
        />
        <div
          className="aurora-blob right-10 top-20 h-64 w-64 bg-[var(--aurora-3)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="editorial-label">About</p>
          <h1 className="font-display mt-4 max-w-3xl text-6xl leading-[0.95] sm:text-7xl">
            SPACE
            <br />
            SHAPES
            <br />
            EXPERIENCE.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <h2 className="font-display text-4xl sm:text-5xl">
            WE SELECT SPACES
            <br />
            WITH PURPOSE.
          </h2>
          <div className="space-y-5 text-[var(--fg-muted)]">
            <p>
              Aurelia Estates is a curated real-estate showcase dedicated to
              homes that feel considered — not simply listed. We look for
              spaces with atmosphere, proportion, and a clear sense of place.
            </p>
            <p>
              From quiet villas to refined urban apartments, every property is
              chosen for how it lives: light, layout, materials, and the feeling
              it leaves when you step inside.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="editorial-label">Our Approach</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {approach.map((item) => (
              <article key={item.number} className="clay p-7">
                <p className="editorial-label">{item.number}</p>
                <h3 className="font-display mt-3 text-3xl uppercase tracking-[0.04em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[var(--fg-muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aurora-surface relative pb-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="clay grid grid-cols-3 gap-4 px-6 py-10 text-center sm:px-10">
            <div>
              <p className="font-display text-4xl sm:text-5xl">12+</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                Properties
              </p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl">08</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                Locations
              </p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl">05</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                Years
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
