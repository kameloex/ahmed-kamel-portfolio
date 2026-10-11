"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SystemCore } from "./SystemCore";
import { AtlasFallback } from "./AtlasFallback";
import { useAtlasCapabilities } from "./useAtlasCapabilities";
import { useInViewCanvas } from "./useInViewCanvas";
import { cn } from "@/lib/utils";

interface AtlasExperienceProps {
  className?: string;
}

export default function AtlasExperience({ className }: AtlasExperienceProps) {
  const { canRun3D } = useAtlasCapabilities();
  const { containerRef, isInView } = useInViewCanvas(0.1);

  // If 3D capabilities are gated (prefers-reduced-motion, simple view, saveData, no WebGL), render static SVG core
  if (!canRun3D) {
    return <AtlasFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-square max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] mx-auto flex items-center justify-center select-none",
        className
      )}
      aria-hidden="true"
    >
      {isInView ? (
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <SystemCore />
          </Suspense>
        </Canvas>
      ) : (
        <AtlasFallback />
      )}
    </div>
  );
}
