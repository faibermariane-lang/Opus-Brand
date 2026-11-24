import brazilMap from "@svg-maps/brazil";
import { brazil } from "@/content/site";

type Loc = { id: string; name: string; path: string };
const MAP = brazilMap as unknown as { viewBox: string; locations: Loc[] };

export const BRAZIL_VIEWBOX = MAP.viewBox;
/** Chapecó-SC, posicionada sobre o desenho de SC (coordenadas do viewBox). */
const HQ = { x: 334, y: 520 };

/**
 * Desenho dos estados renderizado no servidor (os ~64 KB de caminhos não entram no
 * JavaScript do navegador). Estilos e estados em globals.css (.map-uf).
 * Mapa: @svg-maps/brazil (CC BY 4.0).
 */
export function BrazilMapShapes() {
  return (
    <>
      <g strokeLinejoin="round">
        {MAP.locations.map((l) => (
          <path key={l.id} d={l.path} data-uf={l.id.toUpperCase()} className="map-uf" />
        ))}
      </g>
      <g pointerEvents="none" aria-hidden="true">
        <circle cx={HQ.x} cy={HQ.y} r={6} fill="var(--color-rose)" className="pulse-ring" opacity={0.6} />
        <circle cx={HQ.x} cy={HQ.y} r={4.2} fill="var(--color-green-900)" stroke="var(--color-rose)" strokeWidth={1.6} />
        <line x1={HQ.x} y1={HQ.y} x2={HQ.x + 70} y2={HQ.y + 40} stroke="var(--color-green-900)" strokeWidth={0.6} opacity={0.6} />
        <text x={HQ.x + 74} y={HQ.y + 44} fontSize={13} fill="var(--color-green-900)" fontFamily="var(--font-sans)" letterSpacing="0.06em">
          {brazil.hqMarker}
        </text>
      </g>
    </>
  );
}
