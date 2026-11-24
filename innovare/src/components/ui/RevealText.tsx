"use client";
import { useInView } from "motion/react";
import { useRef } from "react";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Revelação de título por máscara: cada palavra sobe de dentro de uma máscara com
 * stagger curto. Um único observador por título; a animação é CSS (leve no celular).
 */
export function RevealText({
  text,
  as: Comp = "h2",
  className,
  id,
  delay = 0,
}: {
  text: string;
  as?: Tag;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = text.split(" ");
  return (
    <Comp ref={ref} id={id} className={className} data-shown={shown ? "" : undefined} style={{ "--rt-delay": `${delay}s` } as React.CSSProperties}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="rt-mask">
          <span className="rt-word" style={{ "--i": i } as React.CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Comp>
  );
}
