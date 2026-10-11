import React from "react";
import { cn } from "@/lib/utils";

interface AtlasFallbackProps {
  className?: string;
  interactive?: boolean;
}

export function AtlasFallback({ className }: AtlasFallbackProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-square max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] mx-auto flex items-center justify-center select-none",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background coordinate grid */}
        <defs>
          <pattern
            id="core-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(245, 247, 250, 0.04)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="600" height="600" fill="url(#core-grid)" />

        {/* Outer orbital rings */}
        <circle
          cx="300"
          cy="300"
          r="260"
          stroke="rgba(245, 247, 250, 0.10)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle
          cx="300"
          cy="300"
          r="210"
          stroke="rgba(119, 207, 255, 0.20)"
          strokeWidth="1"
        />
        <circle
          cx="300"
          cy="300"
          r="160"
          stroke="rgba(245, 247, 250, 0.12)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <circle
          cx="300"
          cy="300"
          r="110"
          stroke="rgba(119, 207, 255, 0.35)"
          strokeWidth="1.2"
        />

        {/* Axis markers */}
        <line
          x1="300"
          y1="40"
          x2="300"
          y2="560"
          stroke="rgba(245, 247, 250, 0.08)"
          strokeWidth="1"
        />
        <line
          x1="40"
          y1="300"
          x2="560"
          y2="300"
          stroke="rgba(245, 247, 250, 0.08)"
          strokeWidth="1"
        />

        {/* Diagonal telemetry lines */}
        <line
          x1="120"
          y1="120"
          x2="480"
          y2="480"
          stroke="rgba(119, 207, 255, 0.10)"
          strokeWidth="1"
          strokeDasharray="1 6"
        />
        <line
          x1="120"
          y1="480"
          x2="480"
          y2="120"
          stroke="rgba(119, 207, 255, 0.10)"
          strokeWidth="1"
          strokeDasharray="1 6"
        />

        {/* Radial connector lines to Station Nodes */}
        {/* Node A (Portal) at ~215 deg: (130, 420) */}
        <line
          x1="300"
          y1="300"
          x2="135"
          y2="415"
          stroke="#77CFFF"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />
        {/* Node B (Cart Flow) at ~325 deg: (465, 415) */}
        <line
          x1="300"
          y1="300"
          x2="465"
          y2="415"
          stroke="#77CFFF"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />
        {/* Node C (Projects Hub) at ~90 deg: (300, 90) */}
        <line
          x1="300"
          y1="300"
          x2="300"
          y2="90"
          stroke="#77CFFF"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />

        {/* Station A Marker */}
        <g transform="translate(135, 415)">
          <circle r="18" fill="#111720" stroke="rgba(245, 247, 250, 0.2)" strokeWidth="1" />
          <circle r="6" fill="#77CFFF" fillOpacity="0.8" />
          <text
            x="0"
            y="32"
            fill="rgba(245, 247, 250, 0.6)"
            fontSize="10"
            textAnchor="middle"
            fontFamily="monospace"
          >
            STATION A · PORTAL
          </text>
        </g>

        {/* Station B Marker */}
        <g transform="translate(465, 415)">
          <circle r="18" fill="#111720" stroke="rgba(245, 247, 250, 0.2)" strokeWidth="1" />
          <circle r="6" fill="#77CFFF" fillOpacity="0.8" />
          <text
            x="0"
            y="32"
            fill="rgba(245, 247, 250, 0.6)"
            fontSize="10"
            textAnchor="middle"
            fontFamily="monospace"
          >
            STATION B · CART
          </text>
        </g>

        {/* Station C Marker */}
        <g transform="translate(300, 90)">
          <circle r="18" fill="#111720" stroke="rgba(245, 247, 250, 0.2)" strokeWidth="1" />
          <circle r="6" fill="#77CFFF" fillOpacity="0.8" />
          <text
            x="0"
            y="-24"
            fill="rgba(245, 247, 250, 0.6)"
            fontSize="10"
            textAnchor="middle"
            fontFamily="monospace"
          >
            STATION C · HUB
          </text>
        </g>

        {/* Center System Core: Layered technical panels */}
        {/* Layer 3 (deep) */}
        <rect
          x="235"
          y="235"
          width="130"
          height="130"
          rx="4"
          fill="#15384B"
          fillOpacity="0.3"
          stroke="rgba(119, 207, 255, 0.2)"
          strokeWidth="1"
          transform="rotate(15 300 300)"
        />
        {/* Layer 2 (mid) */}
        <rect
          x="245"
          y="245"
          width="110"
          height="110"
          rx="4"
          fill="#111720"
          stroke="rgba(245, 247, 250, 0.25)"
          strokeWidth="1"
          transform="rotate(-10 300 300)"
        />
        {/* Layer 1 (top core) */}
        <rect
          x="255"
          y="255"
          width="90"
          height="90"
          rx="3"
          fill="#080B10"
          stroke="#77CFFF"
          strokeWidth="1.2"
        />

        {/* Inner concentric core reticle */}
        <circle cx="300" cy="300" r="28" stroke="rgba(119, 207, 255, 0.5)" strokeWidth="1" />
        <circle cx="300" cy="300" r="14" fill="rgba(119, 207, 255, 0.15)" stroke="#77CFFF" strokeWidth="1" />
        <circle cx="300" cy="300" r="4" fill="#F5F7FA" />

        {/* Micro coordinate labels */}
        <text
          x="300"
          y="370"
          fill="rgba(119, 207, 255, 0.8)"
          fontSize="9"
          textAnchor="middle"
          fontFamily="monospace"
          letterSpacing="1"
        >
          SYSTEM ATLAS CORE
        </text>
        <text
          x="300"
          y="384"
          fill="rgba(245, 247, 250, 0.4)"
          fontSize="8"
          textAnchor="middle"
          fontFamily="monospace"
        >
          3 COORDINATED STATIONS
        </text>
      </svg>
    </div>
  );
}
