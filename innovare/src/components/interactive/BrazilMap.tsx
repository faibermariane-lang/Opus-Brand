"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { brazil, diagnostic, ufs } from "@/content/site";

const NAME: Record<string, string> = Object.fromEntries(ufs.map(([uf, name]) => [uf, name]));

/**
 * Mapa do Brasil (SVG, traço fino). Hover/toque preenche o estado em dourado suave
 * e mostra tooltip; SC tem marcador pulsante. Alternativa acessível: select de UF.
 * Mapa: @svg-maps/brazil (CC BY 4.0).
 */
export function BrazilMap({ shapes, viewBox }: { shapes: React.ReactNode; viewBox: string }) {
  const [, , VB_W, VB_H] = viewBox.split(" ").map(Number);
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("");
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const [visited, setVisited] = useState<Set<string>>(() => new Set());
  const svgRef = useRef<SVGSVGElement>(null);
  const selectId = useId();
  const current = hover ?? (selected || null);

  const label = useMemo(() => {
    if (!current) return "";
    return current === "SC" ? brazil.tooltipHQ : brazil.tooltip.replace("{uf}", NAME[current] ?? current);
  }, [current]);

  // Estados vêm prontos do servidor (BrazilMapShapes); aqui só alternamos classes.
  useEffect(() => {
    svgRef.current?.querySelectorAll<SVGPathElement>("[data-uf]").forEach((el) => {
      const uf = el.dataset.uf ?? "";
      el.classList.toggle("is-on", uf === current);
      el.classList.toggle("is-visited", visited.has(uf));
    });
  }, [current, visited]);

  const ufFrom = (t: EventTarget) => (t as Element).closest?.<SVGElement>("[data-uf]")?.dataset.uf ?? null;

  const placeTip = (uf: string | null) => {
    if (!uf || !svgRef.current) return setTip(null);
    const el = svgRef.current.querySelector<SVGPathElement>(`[data-uf="${uf}"]`);
    if (!el) return;
    const b = el.getBBox();
    setTip({ x: Math.min(68, Math.max(32, ((b.x + b.width / 2) / VB_W) * 100)), y: (b.y / VB_H) * 100 });
  };

  const enter = (uf: string) => {
    setHover(uf);
    setVisited((v) => (v.has(uf) ? v : new Set(v).add(uf)));
    placeTip(uf);
  };
  const leave = () => {
    setHover(null);
    placeTip(selected || null);
  };
  const choose = (uf: string) => {
    setSelected(uf);
    if (uf) setVisited((v) => new Set(v).add(uf));
    setHover(null);
    placeTip(uf || null);
  };

  return (
    <div className="relative">
      <div className="relative mx-auto w-full max-w-[600px]">
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="h-auto w-full overflow-visible"
          aria-label={brazil.a11y.mapLabel}
          role="img"
          onPointerLeave={leave}
          onPointerOver={(e) => {
            const uf = ufFrom(e.target);
            if (e.pointerType === "mouse" && uf && uf !== hover) enter(uf);
          }}
          onClick={(e) => {
            const uf = ufFrom(e.target);
            if (uf) choose(uf);
          }}
        >
          <defs>
            <linearGradient id="rose-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ecc3b8" />
              <stop offset="0.5" stopColor="#c98f8a" />
              <stop offset="1" stopColor="#a8616c" />
            </linearGradient>
          </defs>
          {shapes}
        </svg>

        {tip && label ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-full bg-green-900 px-4 py-2 text-[0.8rem] whitespace-nowrap text-cream shadow-[var(--shadow-lift)] transition-[left,top] duration-500 ease-[var(--ease-out)]"
            style={{ left: `${tip.x}%`, top: `${tip.y}%` }}
          >
            <span className="mr-2 inline-block size-1.5 rounded-full bg-rose-light align-middle" />
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
