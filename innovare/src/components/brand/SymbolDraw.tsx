"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { SYMBOL } from "./paths";

/**
 * Símbolo que se desenha em traço dourado com a rolagem. As lentes partem
 * afastadas e "se encaixam" no círculo; o losango gira até assentar.
 */
export function SymbolDraw({ className, title }: { className?: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "center 45%"] });
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.6 });
  const circle = useTransform(p, [0, 0.55], [0, 1]);
  const lenses = useTransform(p, [0.2, 0.85], [0, 1]);
  const diamond = useTransform(p, [0.4, 1], [0, 1]);
  const gap = useTransform(p, [0.35, 1], [46, 0]);
  const neg = useTransform(gap, (v) => -v);
  const rot = useTransform(p, [0.35, 1], [-18, 0]);

  const lensMotion = [
    { y: neg }, // norte
    { x: gap }, // leste
    { y: gap }, // sul
    { x: neg }, // oeste
  ];

  return (
    <div ref={ref} className={className}>
    <svg
      viewBox={SYMBOL.viewBox}
      className="h-auto w-full"
      fill="none"
      stroke="var(--color-gold)"
      strokeWidth={SYMBOL.stroke * 0.7}
      role="img"
      aria-label={title}
    >
      <motion.circle r={SYMBOL.circleR} style={{ pathLength: reduce ? 1 : circle, rotate: -90 }} />
      {lensMotion.map((m, i) => (
        <motion.g key={i} style={reduce ? { x: 0, y: 0 } : m}>
          <motion.path d={SYMBOL.lens} transform={`rotate(${i * 90})`} style={{ pathLength: reduce ? 1 : lenses }} />
        </motion.g>
      ))}
      <motion.g style={{ rotate: reduce ? 0 : rot }}>
        <motion.path d={SYMBOL.diamond} style={{ pathLength: reduce ? 1 : diamond }} />
      </motion.g>
    </svg>
    </div>
  );
}
