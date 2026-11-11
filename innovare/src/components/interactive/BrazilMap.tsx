"use client";
import brazilMap from "@svg-maps/brazil";
import { useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { brazil, diagnostic, ufs } from "@/content/site";

type Loc = { id: string; name: string; path: string };
const MAP = brazilMap as unknown as { viewBox: string; locations: Loc[] };
const [, , VB_W, VB_H] = MAP.viewBox.split(" ").map(Number);
/** Chapecó-SC, posicionada sobre o desenho de SC (coordenadas do viewBox). */
const HQ = { x: 334, y: 520 };
const NAME: Record<string, string> = Object.fromEntries(ufs.map(([uf, name]) => [uf, name]));

/**
 * Mapa do Brasil (SVG, traço fino). Hover/toque preenche o estado em dourado suave
 * e mostra tooltip; SC tem marcador pulsante. Alternativa acessível: select de UF.
 * Mapa: @svg-maps/brazil (CC BY 4.0).
 */
export function BrazilMap() {
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("");
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const selectId = useId();
  const current = hover ?? (selected || null);

  const label = useMemo(() => {
    if (!current) return "";
    return current === "SC" ? brazil.tooltipHQ : brazil.tooltip.replace("{uf}", NAME[current] ?? current);
  }, [current]);

  const placeTip = (uf: string | null) => {
    if (!uf || !svgRef.current) return setTip(null);
    const el = svgRef.current.querySelector<SVGPathElement>(`[data-uf="${uf}"]`);
    if (!el) return;
    const b = el.getBBox();
    setTip({ x: ((b.x + b.width / 2) / VB_W) * 100, y: (b.y / VB_H) * 100 });
  };

  const enter = (uf: string) => {
    setHover(uf);
    placeTip(uf);
  };
  const leave = () => {
    setHover(null);
    placeTip(selected || null);
  };
  const choose = (uf: string) => {
    setSelected(uf);
    setHover(null);
    placeTip(uf || null);
  };

  return (
    <div className="relative">
      <div className="relative mx-auto w-full max-w-[600px]">
        <svg
          ref={svgRef}
          viewBox={MAP.viewBox}
          className="h-auto w-full overflow-visible"
          aria-label={brazil.a11y.mapLabel}
          role="img"
          onPointerLeave={leave}
        >
          <g strokeLinejoin="round">
            {MAP.locations.map((l) => {
              const uf = l.id.toUpperCase();
              const on = current === uf;
              const isHQ = uf === "SC";
              return (
                <path
                  key={l.id}
                  d={l.path}
                  data-uf={uf}
                  onPointerEnter={(e) => e.pointerType === "mouse" && enter(uf)}
                  onClick={() => choose(uf)}
                  className="cursor-pointer transition-[fill,stroke] duration-500 ease-[var(--ease-out)]"
                  style={{
                    fill: on ? "rgb(213 178 111 / 0.42)" : isHQ ? "rgb(213 178 111 / 0.16)" : "rgb(240 230 194 / 0.35)",
                    stroke: on ? "var(--color-gold)" : "rgb(9 40 28 / 0.38)",
                    strokeWidth: on ? 1.4 : 0.7,
                  }}
                />
              );
            })}
          </g>
          {/* Sede em Chapecó */}
          <g pointerEvents="none" aria-hidden="true">
            <circle cx={HQ.x} cy={HQ.y} r={6} fill="var(--color-gold)" className="pulse-ring" opacity={0.6} />
            <circle cx={HQ.x} cy={HQ.y} r={4.2} fill="var(--color-green-900)" stroke="var(--color-gold)" strokeWidth={1.6} />
            <line x1={HQ.x} y1={HQ.y} x2={HQ.x + 70} y2={HQ.y + 40} stroke="var(--color-green-900)" strokeWidth={0.6} opacity={0.6} />
            <text x={HQ.x + 74} y={HQ.y + 44} fontSize={13} fill="var(--color-green-900)" fontFamily="var(--font-sans)" letterSpacing="0.06em">
              {brazil.hqMarker}
            </text>
          </g>
        </svg>

        {tip && label ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-full bg-green-900 px-4 py-2 text-[0.8rem] whitespace-nowrap text-cream shadow-[var(--shadow-lift)] transition-[left,top] duration-500 ease-[var(--ease-out)]"
            style={{ left: `${tip.x}%`, top: `${tip.y}%` }}
          >
            <span className="mr-2 inline-block size-1.5 rounded-full bg-gold align-middle" />
            {label}
          </div>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">{label}</p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <p className="eyebrow text-green-900/60">{brazil.instruction}</p>
        <label htmlFor={selectId} className="sr-only">{brazil.a11y.selectLabel}</label>
        <select
          id={selectId}
          value={selected}
          onChange={(e) => choose(e.target.value)}
          className="min-h-11 rounded-full border border-green-900/20 bg-cream-soft px-5 pr-9 text-sm text-green-900 focus:border-gold"
        >
          <option value="">{diagnostic.ufPlaceholder}</option>
          {ufs.map(([uf, name]) => (
            <option key={uf} value={uf}>
              {name} ({uf})
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 flex justify-center">
        <Button href="#diagnostico" uf={selected || undefined} variant="dark" icon="arrow" magnetic>
          {brazil.cta}
        </Button>
      </div>
    </div>
  );
}
