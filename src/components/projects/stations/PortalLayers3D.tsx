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
    description: "Academic degree structures, faculty curriculum, and department overviews across 40+ pages.",
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
      {/* Slab Plane on White Ground */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <planeGeometry args={[3.2, 0.6]} />
        <meshBasicMaterial
          color={isActive ? 0xebf7ff : 0xffffff}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Edge Wireframe */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 0.6)]} />
        <lineBasicMaterial
          color={isActive ? 0x258ec8 : 0x080b10}
          transparent
          opacity={isActive ? 0.95 : 0.25}
        />
      </lineSegments>

      {/* Indicator Node */}
      <mesh position={[-1.4, 0, 0.02]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial
          color={isActive ? 0x258ec8 : 0x080b10}
          transparent
          opacity={isActive ? 1 : 0.4}
        />
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
    groupRef.current.rotation.x = 0.35 + Math.sin(t * 0.5) * 0.03;
    groupRef.current.rotation.y = -0.45 + Math.cos(t * 0.4) * 0.04;
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
    const targetIdx = Math.min(
      Math.floor(latest * layers.length),
      layers.length - 1
    );
    if (targetIdx !== selectedIndex) {
      setSelectedIndex(targetIdx);
    }
  });

  const handleManualSelect = (index: number) => {
    isManualSelection.current = true;
    setSelectedIndex(index);
    setTimeout(() => {
      isManualSelection.current = false;
    }, 1500);
  };

  const activeLayer = layers[selectedIndex];

  if (!canRun3D) {
    return <PortalLayers />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full rounded border border-border-strong bg-white p-4 sm:p-6 lg:p-8 space-y-6 shadow-specimen"
    >
      {/* Header & Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-mono font-semibold text-accent-deep uppercase tracking-wider">
            SPECIMEN 01 // ARCHITECTURAL MATRIX
          </span>
          <h3 className="font-display text-lg font-semibold text-ink mt-0.5">
            Information Architecture Stack (40+ Pages)
          </h3>
        </div>
        <div className="text-xs text-ink-subtle font-mono">
          Layer {selectedIndex + 1} of {layers.length}
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative h-64 sm:h-72 w-full rounded border border-border bg-surface overflow-hidden bg-blueprint-grid">
        {isInView ? (
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[4, 5, 4]} intensity={1.5} />
            <directionalLight position={[-3, -2, -2]} intensity={0.5} />
            <Suspense fallback={null}>
              <Scene3D
                selectedIndex={selectedIndex}
                onSelectIndex={handleManualSelect}
              />
            </Suspense>
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-mono text-ink-subtle">
            Canvas suspended (out of view)
          </div>
        )}

        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-ink-subtle bg-white/90 border border-border px-2 py-0.5 rounded pointer-events-none">
          Click layer or scrub scroll to inspect
        </div>
      </div>

      {/* Button-based Controls */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-ink-subtle block uppercase tracking-wider">
          Select layer to inspect:
        </label>
        <div className="flex flex-wrap gap-2">
          {layers.map((layer, index) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => handleManualSelect(index)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-deep font-mono",
                index === selectedIndex
                  ? "border-ink bg-ink text-white font-medium"
                  : "border-border text-ink-muted hover:text-ink hover:border-ink/40 bg-white"
              )}
            >
              {layer.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Layer Details Card */}
      <div className="p-4 rounded border border-border-strong bg-surface space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono font-semibold text-accent-deep uppercase">
            Active Layer Specification
          </span>
          {activeLayer.isSimulated && <SimulatedBadge />}
        </div>
        <h4 className="text-sm font-semibold text-ink">{activeLayer.name}</h4>
        <p className="text-xs text-ink-muted leading-relaxed font-body">
          {activeLayer.description}
        </p>
      </div>
    </div>
  );
}
