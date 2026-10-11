"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export interface AtlasCapabilities {
  canRun3D: boolean;
  isSimpleView: boolean;
  prefersReducedMotion: boolean;
  hasWebGL: boolean;
  isSaveData: boolean;
  reason?: string;
  toggleSimpleView: () => void;
}

// Global state subscription for simple view toggle
let simpleViewListeners: Array<() => void> = [];
let simpleViewState = false;

function emitSimpleViewChange() {
  for (const listener of simpleViewListeners) {
    listener();
  }
}

export function useAtlasCapabilities(): AtlasCapabilities {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSaveData, setIsSaveData] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  // Sync with localStorage on client mount
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem("atlas_simple_view");
      if (stored !== null) {
        simpleViewState = stored === "true";
        emitSimpleViewChange();
      }
    } catch {
      // localStorage may fail in restricted contexts
    }

    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia) {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mql.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    }
  }, []);

  // Check WebGL and hardware capability
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    // Check saveData
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) {
      setIsSaveData(true);
    }

    // Check low-spec CPU concurrency
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      setIsLowPower(true);
    }
  }, []);

  // Listen to simple view toggles across components
  const isSimpleView = useSyncExternalStore(
    (callback) => {
      simpleViewListeners.push(callback);
      return () => {
        simpleViewListeners = simpleViewListeners.filter((l) => l !== callback);
      };
    },
    () => simpleViewState,
    () => false
  );

  const toggleSimpleView = () => {
    const nextState = !simpleViewState;
    simpleViewState = nextState;
    try {
      localStorage.setItem("atlas_simple_view", String(nextState));
    } catch {
      // ignore storage error
    }
    emitSimpleViewChange();
  };

  if (!mounted) {
    return {
      canRun3D: false,
      isSimpleView: false,
      prefersReducedMotion: false,
      hasWebGL: true,
      isSaveData: false,
      reason: "Initializing...",
      toggleSimpleView,
    };
  }

  let reason: string | undefined;
  let canRun = true;

  if (isSimpleView) {
    canRun = false;
    reason = "Simple view manually enabled";
  } else if (!hasWebGL) {
    canRun = false;
    reason = "WebGL context unavailable";
  } else if (prefersReducedMotion) {
    canRun = false;
    reason = "Reduced motion preferred";
  } else if (isSaveData) {
    canRun = false;
    reason = "Data saver enabled";
  } else if (isLowPower) {
    canRun = false;
    reason = "Low concurrency hardware detected";
  }

  return {
    canRun3D: canRun,
    isSimpleView,
    prefersReducedMotion,
    hasWebGL,
    isSaveData,
    reason,
    toggleSimpleView,
  };
}
