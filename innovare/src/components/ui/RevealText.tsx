"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {motion } from "motion/react";
import { EASE } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Revelação de título por máscara: cada palavra sobe de dentro de uma máscara
 * com stagger curto, o que lê como uma revelação linha a linha em qualquer largura.
 */
export function RevealText({
  text,
  as = "h2",
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
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const words = text.split(" ");
  return (
    <Comp
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: reduce ? { opacity: 0, y: "0%" } : { y: "105%" },
              show: reduce
                ? { opacity: 1, y: "0%", transition: { duration: 0.4 } }
                : { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.045 } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Comp>
  );
}
