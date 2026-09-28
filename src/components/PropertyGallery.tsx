"use client";

import { Expand, X, ChevronLeft, ChevronRight } from "@/components/icons";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface PropertyGalleryProps {
  images: string[];
  name: string;
  location: string;
}

export function PropertyGallery({
  images,
  name,
  location,
}: PropertyGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, prev, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  const alt = (i: number) =>
    `${name} — image ${i + 1} of ${images.length} in ${location}`;

  return (
    <div>
      <div className="clay relative aspect-[16/10] overflow-hidden">
        <Image
          src={images[index]}
          alt={alt(index)}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 70vw"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <p className="text-sm tracking-wide">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur"
            aria-label="Open fullscreen gallery"
          >
            <Expand size={16} />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setIndex(i)}
            className={`relative aspect-[4/3] overflow-hidden rounded-xl border transition ${
              i === index
                ? "border-[var(--fg)]"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
          >
            <Image
              src={img}
              alt={alt(i)}
              fill
              className="object-cover"
              sizes="120px"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen gallery"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
            onClick={() => setLightbox(false)}
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <div
            className="relative h-[70vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={alt(index)}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            type="button"
            className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white md:right-16"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
          <p className="absolute bottom-6 text-sm text-white/80">
            {index + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
