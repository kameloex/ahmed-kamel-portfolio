"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
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
    pos: [-1.6, -1.1, 0.3],
  },
  {
    id: "guidelines",
    name: "Documentation Guidelines",
    category: "Resources",
    description: "Curated standards for project books, video pitches, and presentation requirements.",
    pos: [0.1, -1.2, -0.1],
  },
  {
    id: "auth",
    name: "Access Controls",
    category: "System",
    description: "Department login and secure change-password interface modules.",
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

  // Connection line geometries
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
    // Gentle spatial orbit rotation
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.25;
    groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
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
                color: isConnected ? 0x77cfff : 0xf5f7fa,
                transparent: true,
                opacity: isConnected ? 0.8 : 0.15,
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
                <meshBasicMaterial color={0x77cfff} transparent opacity={0.25} wireframe />
              </mesh>
            )}

            {/* Core Node */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.14 : 0.09, 16, 16]} />
              <meshBasicMaterial color={isActive ? 0x77cfff : 0xf5f7fa} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function HubConstellation3D() {
  const { canRun3D } = useAtlasCapabilities();
  const { containerRef, isInView } = useInViewCanvas(0.15);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  // If 3D capabilities are gated, seamlessly render 2D version
  if (!canRun3D) {
    return <HubConstellation />;
  }

  const activeNode = hubNodes[activeNodeIndex];

  return (
    <div
      ref={containerRef}
      className="w-full rounded-sm border border-border bg-surface p-4 sm:p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-mono text-accent">
            STATION C · 3D KNOWLEDGE ARCHIVE
          </span>
          <h3 className="font-display text-lg font-medium text-ink mt-0.5">
            Archive Constellation
          </h3>
        </div>
        <span className="text-xs font-mono text-ink-subtle">
          Front-end showcase platform
        </span>
      </div>

      {/* 3D Canvas / 2D fallback view */}
      <div className="relative h-72 sm:h-80 w-full rounded border border-border/60 bg-bg overflow-hidden flex items-center justify-center">
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
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            className="w-full h-full cursor-pointer"
            aria-hidden="true"
          >
            <Suspense fallback={null}>
              <ConstellationScene
                activeIdx={activeNodeIndex}
                onSelectNode={(idx) => setActiveNodeIndex(idx)}
              />
            </Suspense>
          </Canvas>
        ) : (
          <div className="text-xs font-mono text-ink-subtle">Station paused</div>
        )}
      </div>

      {/* Button-based Node Selector (Accessible Keyboard & Touch Alternative) */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-ink-subtle block">
          Select node to highlight in 3D:
        </label>
        <div className="flex flex-wrap gap-2">
          {hubNodes.map((node, idx) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeIndex(idx)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                idx === activeNodeIndex
                  ? "border-accent text-accent bg-accent-tint12"
                  : "border-border text-ink-muted hover:text-ink hover:border-accent/40 bg-surface/50"
              )}
            >
              {node.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Node Details Card */}
      <div className="p-4 rounded border border-border bg-bg/60 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-accent">Category: {activeNode.category}</span>
          <span className="text-ink-subtle">Node ID: {activeNode.id}</span>
        </div>
        <h4 className="text-sm font-semibold text-ink">{activeNode.name}</h4>
        <p className="text-xs text-ink-muted leading-relaxed">
          {activeNode.description}
        </p>
      </div>
    </div>
  );
}
