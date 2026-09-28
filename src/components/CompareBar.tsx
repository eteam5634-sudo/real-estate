"use client";

import { useCompare } from "@/context/CompareContext";
import { getPropertyById } from "@/lib/properties";
import { X } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

export function CompareBar() {
  const { compareIds, removeCompare, clearCompare, ready } = useCompare();

  if (!ready || compareIds.length === 0) return null;

  const items = compareIds
    .map((id) => getPropertyById(id))
    .filter(Boolean);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--nav-bg)] p-4 backdrop-blur-xl animate-fade-up">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap gap-3">
          {items.map((p) =>
            p ? (
              <div
                key={p.id}
                className="clay-sm flex items-center gap-3 px-3 py-2"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                  <Image
                    src={p.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <span className="text-sm font-medium">{p.name}</span>
                <button
                  type="button"
                  onClick={() => removeCompare(p.id)}
                  aria-label={`Remove ${p.name} from compare`}
                  className="opacity-60 hover:opacity-100"
                >
                  <X size={14} />
                </button>
              </div>
            ) : null
          )}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={clearCompare} className="btn btn-ghost">
            Clear
          </button>
          <Link href="/compare" className="btn btn-primary">
            Compare ({compareIds.length})
          </Link>
        </div>
      </div>
    </div>
  );
}
