import { RevealText } from "./RevealText";
import { Reveal } from "./Reveal";

/** Sobretítulo (caixa-alta espaçada) + H2 com revelação + subtítulo opcional. */
export function SectionHeading({
  eyebrow,
  title,
  id,
  subtitle,
  tone = "dark",
  align = "left",
  className = "",
  titleClassName = "",
}: {
  eyebrow?: string;
  title: string;
  id: string;
  subtitle?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  const eyebrowColor = tone === "light" ? "text-gold" : "text-olive";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? (
        <Reveal y={10}>
          <p className={`eyebrow mb-6 flex items-center gap-4 ${eyebrowColor} ${align === "center" ? "justify-center" : ""}`}>
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <RevealText as="h2" id={id} text={title} className={`h-section ${titleClassName}`} />
      {subtitle ? (
        <Reveal delay={0.15}>
          <p className={`lead mt-6 max-w-xl ${align === "center" ? "mx-auto" : ""} ${tone === "light" ? "text-cream/80" : "text-green-900/75"}`}>
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
