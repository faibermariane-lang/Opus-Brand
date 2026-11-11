"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {motion } from "motion/react";
import { EASE } from "@/lib/motion";

/** Linha dourada de 1px que se desenha ao entrar na tela. */
export function GoldLine({
  className = "",
  vertical = false,
  delay = 0,
  opacity = 1,
}: {
  className?: string;
  vertical?: boolean;
  delay?: number;
  opacity?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`block bg-gold ${vertical ? "w-px origin-top" : "h-px origin-left"} ${className}`}
      style={{ opacity }}
      initial={reduce ? { opacity: 0, scaleX: 1, scaleY: 1 } : vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1, opacity } : { scaleX: 1, opacity }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}
