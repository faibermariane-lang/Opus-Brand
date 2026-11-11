import { LOGO_VIEWBOX, SUBMARK_PATHS, WORDMARK_PATHS, WORDMARK_VIEWBOX } from "./paths";

type Tone = "green" | "gold" | "cream" | "current";
const TONE: Record<Tone, string> = {
  green: "var(--color-green-900)",
  gold: "var(--color-gold)",
  cream: "var(--color-cream)",
  current: "currentColor",
};

/**
 * Logotipo vetorizado do arquivo original (nunca recomposto com fonte).
 * `variant="wordmark"` omite a submarca CONTABILIDADE (para tamanhos pequenos).
 */
export function Logo({
  tone = "green",
  variant = "full",
  className,
  title = "Innovare Contabilidade",
}: {
  tone?: Tone;
  variant?: "full" | "wordmark";
  className?: string;
  title?: string;
}) {
  const paths = variant === "full" ? [...WORDMARK_PATHS, ...SUBMARK_PATHS] : WORDMARK_PATHS;
  return (
    <svg
      viewBox={variant === "full" ? LOGO_VIEWBOX : WORDMARK_VIEWBOX}
      className={className}
      role="img"
      aria-label={title}
      fill={TONE[tone]}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
