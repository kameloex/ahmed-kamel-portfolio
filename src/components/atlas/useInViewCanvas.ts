"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewCanvas(threshold = 0.15) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: "50px",
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { containerRef, isInView };
}
