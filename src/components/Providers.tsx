"use client";

import { CompareProvider } from "@/context/CompareContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CompareProvider>{children}</CompareProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
