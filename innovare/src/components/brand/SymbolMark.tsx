import { SYMBOL } from "./paths";

/**
 * Símbolo Innovare (inspirado no Jiaozi) — sempre em traço, nunca preenchido.
 * Estático; para a versão que se desenha com o scroll veja `SymbolDraw`.
 */
export function SymbolMark({
  className,
  stroke = "var(--color-gold)",
  strokeWidth = SYMBOL.stroke,
  title,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox={SYMBOL.viewBox}
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      vectorEffect="non-scaling-stroke"
    >
      <circle r={SYMBOL.circleR} />
      {[0, 90, 180, 270].map((a) => (
        <path key={a} d={SYMBOL.lens} transform={`rotate(${a})`} />
      ))}
      <path d={SYMBOL.diamond} />
    </svg>
  );
}
