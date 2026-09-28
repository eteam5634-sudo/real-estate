import Link from "next/link";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  children?: ReactNode;
}

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  children,
}: EmptyStateProps) {
  return (
    <div className="clay mx-auto max-w-lg px-8 py-14 text-center">
      <h2 className="font-display text-3xl">{title}</h2>
      <p className="mt-3 text-sm text-[var(--fg-muted)]">{description}</p>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="btn btn-primary mt-8">
          {actionLabel}
        </Link>
      )}
      {children}
    </div>
  );
}
