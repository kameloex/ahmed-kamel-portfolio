"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useMotionValueEvent } from "motion/react";
import { HubConstellation } from "./HubConstellation";
import { useAtlasCapabilities } from "@/components/atlas/useAtlasCapabilities";
import { useInViewCanvas } from "@/components/atlas/useInViewCanvas";
import { cn } from "@/lib/utils";

interface HubNode3D {
  id: string;
  name: string;
  category: string;
  description: string;
  pos: [number, number, number];
}

const hubNodes: HubNode3D[] = [
  {
    id: "gallery",
    name: "Project Gallery",
    category: "Showcase",
    description: "Multi-department showcase indexing student embedded-systems projects.",
    pos: [-1.8, 0.9, 0.2],
  },
  {
    id: "add-project",
    name: "Team-Leader Add Project",
    category: "Submission",
    description: "Structured project registration workflow with metadata fields.",
    pos: [-0.4, 1.3, -0.3],
  },
  {
    id: "team-entry",
    name: "Team Member Entry",
    category: "Roster",
    description: "Student member credentials and collaborative attribution listings.",
    pos: [1.2, 1.0, 0.4],
  },
  {
    id: "asset-fields",
    name: "Asset & Media Fields",
    category: "Submission",
    description: "Input fields for video previews, poster assets, project books, and diagrams.",
    pos: [-1.1, -0.2, 0.1],
  },
  {
    id: "event-reg",
    name: "Event Registration",
    category: "Events",
    description: "Modal registration flows for department exhibitions and attendee feedback.",
    pos: [0.6, 0.1, -0.2],
  },
  {
    id: "knowledge-guides",
    name: "Knowledge & Board Guides",
    category: "Resources",
    description: "Implementation references and technical guides for Arduino, ESP32, and Raspberry Pi.",
    pos: [-1.6, -1.0, 0.3],
  },
  {
    id: "guidelines",
    name: "Documentation Guidelines",
    category: "Standards",
    description: "Format requirements for project reports, technical books, code repositories, and videos.",
    pos: [0.2, -1.1, -0.1],
  },
  {
    id: "access-controls",
    name: "Access Controls",
    category: "Security",
    description: "Role-based views for students, department leaders, and guest attendees.",
    pos: [1.5, -0.8, 0.2],
  },
];

const connectionPairs = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [3, 5],
  [4, 7],
  [5, 6],
  [6, 7],
];

function ConstellationScene({
  activeIdx,
  onSelectNode,
}: {
  activeIdx: number;
  onSelectNode: (idx: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    return connectionPairs.map(([fromIdx, toIdx]) => {
      const from = hubNodes[fromIdx].pos;
      const to = hubNodes[toIdx].pos;
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...from),
        new THREE.Vector3(...to),
      ]);
      return { geo, fromIdx, toIdx };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    groupRef.current.rotation.x = Math.cos(t * 0.15) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} />

      {/* 3D Connecting Lines */}
      {lines.map((line, idx) => {
        const isConnected =
          line.fromIdx === activeIdx || line.toIdx === activeIdx;

        return (
          <primitive
            key={`line-${idx}`}
            object={new THREE.Line(
              line.geo,
              new THREE.LineBasicMaterial({
                color: isConnected ? 0x0e476b : 0x080b10,
                transparent: true,
                opacity: isConnected ? 0.85 : 0.2,
                linewidth: isConnected ? 2 : 1,
              })
            )}
          />
        );
      })}

      {/* 3D Sphere Nodes */}
      {hubNodes.map((node, idx) => {
        const isActive = idx === activeIdx;

        return (
          <group
            key={node.id}
            position={node.pos}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(idx);
            }}
          >
            {/* Active Halo */}
            {isActive && (
              <mesh>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshBasicMaterial
                  color={0x77cfff}
                  transparent
                  opacity={0.35}
                  wireframe
                />
              </mesh>
            )}

            {/* Core Node on White Ground */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.14 : 0.09, 16, 16]} />
              <meshStandardMaterial
                color={isActive ? 0x258ec8 : 0xffffff}
                roughness={0.2}
              />
            </mesh>

            {/* Node Wireframe perimeter */}
            {!isActive && (
              <lineSegments>
                <edgesGeometry
                  args={[new THREE.SphereGeometry(0.09, 12, 12)]}
                />
                <lineBasicMaterial color={0x080b10} transparent opacity={0.6} />
              </lineSegments>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function HubConstellation3D() {
  const { canRun3D, prefersReducedMotion, isSimpleView } = useAtlasCapabilities();
  const { containerRef, isInView } = useInViewCanvas(0.15);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const isManualSelection = useRef(false);

  // Scroll-linked scrub across nodes
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isManualSelection.current || prefersReducedMotion || isSimpleView) return;
    const targetIdx = Math.min(
      Math.floor(latest * hubNodes.length),
      hubNodes.length - 1
    );
    if (targetIdx !== activeNodeIndex) {
      setActiveNodeIndex(targetIdx);
    }
  });

  const handleManualSelect = (idx: number) => {
    isManualSelection.current = true;
    setActiveNodeIndex(idx);
    setTimeout(() => {
      isManualSelection.current = false;
    }, 1500);
  };

  const activeNode = hubNodes[activeNodeIndex];

  if (!canRun3D) {
    return <HubConstellation />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full rounded border border-border-strong bg-white p-4 sm:p-6 lg:p-8 space-y-6 shadow-specimen"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-mono font-semibold text-accent-deep uppercase tracking-wider">
            SPECIMEN 03 // EMBEDDED KNOWLEDGE MATRIX
          </span>
          <h3 className="font-display text-lg font-semibold text-ink mt-0.5">
            Microcontroller &amp; Exhibition Node Web
          </h3>
        </div>
        <span className="text-xs font-mono text-ink-subtle">
          Front-end showcase platform
        </span>
      </div>

      {/* 3D Canvas */}
      <div className="relative h-72 sm:h-80 w-full rounded border border-border bg-surface overflow-hidden bg-blueprint-grid">
        {isInView ? (
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Suspense fallback={null}>
              <ConstellationScene
                activeIdx={activeNodeIndex}
                onSelectNode={handleManualSelect}
              />
            </Suspense>
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-mono text-ink-subtle">
            Canvas suspended (out of view)
          </div>
        )}

        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-ink-subtle bg-white/90 border border-border px-2 py-0.5 rounded pointer-events-none">
          Click nodes or scrub scroll
        </div>
      </div>

      {/* Node selection buttons */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-ink-subtle block uppercase tracking-wider">
          Select node to inspect:
        </label>
        <div className="flex flex-wrap gap-2">
          {hubNodes.map((node, idx) => (
            <button
              key={node.id}
              type="button"
              onClick={() => handleManualSelect(idx)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-deep font-mono",
                idx === activeNodeIndex
                  ? "border-ink bg-ink text-white font-medium"
                  : "border-border text-ink-muted hover:text-ink hover:border-ink/40 bg-white"
              )}
            >
              {node.name}
            </button>
          ))}
        </div>
      </div>

      {/* Details Card */}
      <div className="p-4 rounded border border-border-strong bg-surface space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-accent-deep font-semibold">Category: {activeNode.category}</span>
          <span className="text-ink-subtle">Node ID: {activeNode.id}</span>
        </div>
        <h4 className="text-sm font-semibold text-ink">{activeNode.name}</h4>
        <p className="text-xs text-ink-muted leading-relaxed font-body">
          {activeNode.description}
        </p>
      </div>
    </div>
  );
}
