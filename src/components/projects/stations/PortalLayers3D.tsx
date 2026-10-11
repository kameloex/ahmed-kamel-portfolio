"use client";

import React, { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useMotionValueEvent } from "motion/react";
import { PortalLayers } from "./PortalLayers";
import { useAtlasCapabilities } from "@/components/atlas/useAtlasCapabilities";
import { useInViewCanvas } from "@/components/atlas/useInViewCanvas";
import { SimulatedBadge } from "@/components/ui/SimulatedBadge";
import { cn } from "@/lib/utils";

interface LayerData {
  id: string;
  name: string;
  description: string;
  isSimulated?: boolean;
}

const layers: LayerData[] = [
  {
    id: "academics",
    name: "Faculties & Departments",
    description: "Academic degree structures, faculty curriculum, and department overviews.",
  },
  {
    id: "staff",
    name: "Staff Directory",
    description: "Searchable directory of university faculty, department heads, and academic staff.",
  },
  {
    id: "projects",
    name: "Projects & News",
    description: "Filterable student graduation project showcase and data-driven university news.",
  },
  {
    id: "admissions",
    name: "Admissions Guidance",
    description: "Guidance for prospective students, entrance criteria, and application pathways.",
  },
  {
    id: "services",
    name: "Student Services",
    description: "Seven dedicated service portals supporting student requests and campus affairs.",
  },
  {
    id: "children-uni",
    name: "Children's University",
    description: "Multi-program registration system supporting six programs and age groups 7–10 and 11–15.",
  },
  {
    id: "payment",
    name: "Fee Payment (Simulated)",
    description: "Client-side payment flow with card validation (Luhn), preview, and masked transaction logging.",
    isSimulated: true,
  },
];

function LayerMesh({
  index,
  selectedIndex,
  onSelect,
}: {
  index: number;
  selectedIndex: number;
  onSelect: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const isActive = index === selectedIndex;

  // Separation logic along z and y
  const targetZ = isActive ? (index - selectedIndex) * 0.45 + 0.8 : (index - 3) * 0.28;
  const targetY = isActive ? (index - selectedIndex) * 0.15 : (index - 3) * 0.08;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.position.z = THREE.MathUtils.damp(
      meshRef.current.position.z,
      targetZ,
      6,
      delta
    );
    meshRef.current.position.y = THREE.MathUtils.damp(
      meshRef.current.position.y,
      targetY,
      6,
      delta
    );
  });

  return (
    <group ref={meshRef} position={[0, (index - 3) * 0.08, (index - 3) * 0.28]}>
      {/* Translucent Panel Plane */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <planeGeometry args={[3.2, 0.6]} />
        <meshBasicMaterial
          color={isActive ? 0x15384b : 0x111720}
          transparent
          opacity={isActive ? 0.85 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Edge Wireframe */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 0.6)]} />
        <lineBasicMaterial
          color={isActive ? 0x77cfff : 0xf5f7fa}
          transparent
          opacity={isActive ? 0.95 : 0.2}
        />
      </lineSegments>

      {/* Left indicator node */}
      <mesh position={[-1.4, 0, 0.02]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color={isActive ? 0x77cfff : 0xf5f7fa} transparent opacity={isActive ? 1 : 0.4} />
      </mesh>
    </group>
  );
}

function Scene3D({
  selectedIndex,
  onSelectIndex,
}: {
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating isometric tilt
    groupRef.current.rotation.x = 0.35 + Math.sin(t * 0.5) * 0.04;
    groupRef.current.rotation.y = -0.45 + Math.cos(t * 0.4) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {layers.map((layer, index) => (
        <LayerMesh
          key={layer.id}
          index={index}
          selectedIndex={selectedIndex}
          onSelect={() => onSelectIndex(index)}
        />
      ))}
    </group>
  );
}

export function PortalLayers3D() {
  const { canRun3D, prefersReducedMotion, isSimpleView } = useAtlasCapabilities();
  const { containerRef, isInView } = useInViewCanvas(0.15);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isManualSelection = useRef(false);

  // Scroll-linked layer separation scrub
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isManualSelection.current || prefersReducedMotion || isSimpleView) return;
    const nextIdx = Math.min(Math.floor(latest * layers.length), layers.length - 1);
    if (nextIdx >= 0 && nextIdx !== selectedIndex) {
      setSelectedIndex(nextIdx);
    }
  });

  const handleManualSelect = (index: number) => {
    isManualSelection.current = true;
    setSelectedIndex(index);
    setTimeout(() => {
      isManualSelection.current = false;
    }, 4000);
  };

  // If 3D capabilities are gated, seamlessly render the 2D version
  if (!canRun3D) {
    return <PortalLayers />;
  }

  const activeLayer = layers[selectedIndex];

  return (
    <div
      ref={containerRef}
      className="w-full rounded-sm border border-border bg-surface p-4 sm:p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-mono text-accent">
            STATION A · 3D ARCHITECTURAL STACK
          </span>
          <h3 className="font-display text-lg font-medium text-ink mt-0.5">
            Information Architecture Layers
          </h3>
        </div>
        <div className="text-xs text-ink-subtle font-mono">
          Layer {selectedIndex + 1} of {layers.length}
        </div>
      </div>

      {/* 3D Canvas / 2D fallback view */}
      <div className="relative h-64 sm:h-72 w-full rounded border border-border/60 bg-bg overflow-hidden flex items-center justify-center">
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,247,250,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,247,250,0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {isInView ? (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            className="w-full h-full cursor-pointer"
            aria-hidden="true"
          >
            <Suspense fallback={null}>
              <Scene3D
                selectedIndex={selectedIndex}
                onSelectIndex={(idx) => handleManualSelect(idx)}
              />
            </Suspense>
          </Canvas>
        ) : (
          <div className="text-xs font-mono text-ink-subtle">Station paused</div>
        )}
      </div>

      {/* Button-based Layer Controls (Accessible Keyboard & Touch Alternative) */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-ink-subtle block">
          Select layer to separate in 3D:
        </label>
        <div className="flex flex-wrap gap-2">
          {layers.map((layer, index) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => handleManualSelect(index)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                index === selectedIndex
                  ? "border-accent text-accent bg-accent-tint12"
                  : "border-border text-ink-muted hover:text-ink hover:border-accent/40 bg-surface/50"
              )}
            >
              {layer.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Layer Details */}
      <div className="p-4 rounded border border-border bg-bg/60 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-accent">Active Layer Details</span>
          {activeLayer.isSimulated && <SimulatedBadge />}
        </div>
        <h4 className="text-sm font-semibold text-ink">{activeLayer.name}</h4>
        <p className="text-xs text-ink-muted leading-relaxed">
          {activeLayer.description}
        </p>
      </div>
    </div>
  );
}
