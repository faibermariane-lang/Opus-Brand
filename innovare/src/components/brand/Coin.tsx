"use client";
import { useId } from "react";
import { SYMBOL } from "./paths";
import { Icon } from "@/components/ui/Icon";

/**
 * Face de moeda dourada (gradiente metálico, aro e relevo). O centro é o símbolo
 * Innovare (padrão) ou um ícone. Sempre em traço — o símbolo nunca é preenchido.
 */
export function CoinFace({ icon, className = "", tone = "gold" }: { icon?: string; className?: string; tone?: "gold" | "dark" }) {
  const id = useId().replace(/:/g, "");
  const light = tone === "gold" ? ["#f6e4b0", "#d5b26f", "#a17d3d"] : ["#1b4a37", "#0f3a2a", "#061b13"];
  const ink = tone === "gold" ? "#6b4f1d" : "#d5b26f";
  return (
    <span className={`relative block ${className}`} aria-hidden="true">
      <svg viewBox="-320 -320 640 640" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={`f${id}`} cx="35%" cy="28%" r="85%">
            <stop offset="0" stopColor={light[0]} />
            <stop offset="0.55" stopColor={light[1]} />
            <stop offset="1" stopColor={light[2]} />
          </radialGradient>
          <linearGradient id={`r${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={light[0]} />
            <stop offset="1" stopColor={light[2]} />
          </linearGradient>
        </defs>
        <circle r="318" fill={`url(#r${id})`} />
        <circle r="290" fill={`url(#f${id})`} />
        <circle r="272" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="5" strokeDasharray="2 14" />
        {!icon ? (
          <g fill="none" stroke={ink} strokeOpacity="0.85" strokeWidth="16" transform="scale(0.7)">
            <circle r={SYMBOL.circleR} />
            {[0, 90, 180, 270].map((a) => (
              <path key={a} d={SYMBOL.lens} transform={`rotate(${a})`} />
            ))}
            <path d={SYMBOL.diamond} />
          </g>
        ) : null}
        <ellipse cx="-90" cy="-150" rx="170" ry="70" fill="#fff" opacity="0.18" transform="rotate(-28)" />
      </svg>
      {icon ? (
        <span className="absolute inset-0 flex items-center justify-center" style={{ color: ink }}>
          <Icon name={icon} className="h-[42%] w-[42%]" strokeWidth={1.6} />
        </span>
      ) : null}
    </span>
  );
}
