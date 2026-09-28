import Link from "next/link";

export default function NotFound() {
  return (
    <div className="aurora-surface relative flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div
        className="aurora-blob left-10 top-10 h-64 w-64 bg-[var(--aurora-1)]"
        aria-hidden="true"
      />
      <div
        className="aurora-blob bottom-10 right-10 h-56 w-56 bg-[var(--aurora-3)]"
        aria-hidden="true"
      />
      <div className="clay relative z-10 max-w-lg px-8 py-14 text-center">
        <p className="font-display text-7xl">404</p>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl">
          THIS SPACE DOESN&apos;T EXIST.
        </h1>
        <p className="mt-4 text-sm text-[var(--fg-muted)]">
          The page you&apos;re looking for could not be found.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back Home
          </Link>
          <Link href="/properties" className="btn btn-secondary">
            Explore Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
