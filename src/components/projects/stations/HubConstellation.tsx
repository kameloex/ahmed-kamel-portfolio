"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ConstellationNode {
  id: string;
  name: string;
  category: string;
  description: string;
  x: number;
  y: number;
}

const nodes: ConstellationNode[] = [
  {
    id: "gallery",
    name: "Project Gallery",
    category: "Showcase",
    description: "Multi-department showcase indexing student embedded-systems projects.",
    x: 140,
    y: 90,
  },
  {
    id: "add-project",
    name: "Team-Leader Add Project",
    category: "Submission",
    description: "Structured project registration workflow with metadata fields.",
    x: 320,
    y: 70,
  },
  {
    id: "team-entry",
    name: "Team Member Entry",
    category: "Roster",
    description: "Student member credentials and collaborative attribution listings.",
    x: 480,
    y: 110,
  },
  {
    id: "asset-fields",
    name: "Asset & Media Fields",
    category: "Submission",
    description: "Input fields for video previews, poster assets, project books, and diagrams.",
    x: 230,
    y: 180,
  },
  {
    id: "event-reg",
    name: "Event Registration",
    category: "Events",
    description: "Modal registration flows for department exhibitions and attendee feedback.",
    x: 420,
    y: 200,
  },
  {
    id: "knowledge-guides",
    name: "Knowledge & Board Guides",
    category: "Resources",
    description: "Implementation references and technical guides for Arduino, ESP32, and Raspberry Pi.",
    x: 120,
    y: 270,
  },
  {
    id: "guidelines",
    name: "Documentation Guidelines",
    category: "Standards",
    description: "Format requirements for project reports, technical books, code repositories, and videos.",
    x: 310,
    y: 290,
  },
  {
    id: "access-controls",
    name: "Access Controls",
    category: "Security",
    description: "Role-based views for students, department leaders, and guest attendees.",
    x: 490,
    y: 280,
  },
];

const connections = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [3, 5],
  [4, 7],
  [5, 6],
  [6, 7],
];

export function HubConstellation() {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const activeNode = nodes[activeNodeIndex];

  return (
    <div className="w-full rounded-xl border border-border bg-surface p-4 sm:p-6 lg:p-8 space-y-6 framer-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/80">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-wider">
            STATION C // EMBEDDED KNOWLEDGE MATRIX
          </span>
          <h3 className="font-display text-lg font-semibold text-ink mt-0.5">
            Microcontroller &amp; Exhibition Node Web
          </h3>
        </div>
        <span className="text-xs font-mono text-ink-subtle">
          Front-end showcase platform
        </span>
      </div>

      {/* 2D Constellation Vector Graphic */}
      <div className="relative h-72 sm:h-80 w-full rounded-lg border border-border/60 bg-bg overflow-hidden flex items-center justify-center p-2 bg-blueprint-grid">
        <svg
          viewBox="0 0 600 360"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Vector connection traces */}
          {connections.map(([fromIdx, toIdx], i) => {
            const from = nodes[fromIdx];
            const to = nodes[toIdx];
            const isConnected =
              fromIdx === activeNodeIndex || toIdx === activeNodeIndex;

            return (
              <line
                key={`line-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isConnected ? "#77CFFF" : "rgba(245, 247, 250, 0.15)"}
                strokeWidth={isConnected ? 1.5 : 1}
                strokeDasharray={isConnected ? "none" : "3 3"}
                className="transition-colors duration-300"
              />
            );
          })}

          {/* Interactive Node Anchors */}
          {nodes.map((node, idx) => {
            const isActive = idx === activeNodeIndex;

            return (
              <g
                key={node.id}
                onClick={() => setActiveNodeIndex(idx)}
                className="cursor-pointer transition-transform duration-200"
                style={{
                  transformOrigin: `${node.x}px ${node.y}px`,
                  transform: isActive ? "scale(1.2)" : "scale(1)",
                }}
              >
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill="rgba(119, 207, 255, 0.15)"
                    stroke="#77CFFF"
                    strokeWidth={1}
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={10}
                  fill={isActive ? "#111720" : "#080B10"}
                  stroke={isActive ? "#77CFFF" : "rgba(245, 247, 250, 0.3)"}
                  strokeWidth={1.5}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={3.5}
                  fill={isActive ? "#77CFFF" : "rgba(245, 247, 250, 0.6)"}
                />

                <text
                  x={node.x}
                  y={node.y + 22}
                  fill={isActive ? "#77CFFF" : "rgba(245, 247, 250, 0.6)"}
                  fontSize={10}
                  textAnchor="middle"
                  fontFamily="monospace"
                  className="select-none pointer-events-none"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Button Controls */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-ink-subtle block uppercase tracking-wider">
          Select node to inspect:
        </label>
        <div className="flex flex-wrap gap-2">
          {nodes.map((node, idx) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeIndex(idx)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent font-mono",
                idx === activeNodeIndex
                  ? "border-accent text-accent bg-accent-tint12 shadow-[0_0_10px_rgba(119,207,255,0.2)]"
                  : "border-border text-ink-muted hover:text-ink hover:border-accent/40 bg-surface/50"
              )}
            >
              {node.name}
            </button>
          ))}
        </div>
      </div>

      {/* Node Details Card */}
      <div className="p-4 rounded-lg border border-border/80 bg-bg/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-accent font-medium">Category: {activeNode.category}</span>
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
