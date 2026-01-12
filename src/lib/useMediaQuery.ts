"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Initialize with false for server-side rendering
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(query);

      // Set initial value
      setMatches(mediaQuery.matches);

      // Create event listener
      const handler = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // Add listener for changes
      mediaQuery.addEventListener("change", handler);

      // Clean up
      return () => {
        mediaQuery.removeEventListener("change", handler);
      };
    }
  }, [query]);

  return matches;
}
