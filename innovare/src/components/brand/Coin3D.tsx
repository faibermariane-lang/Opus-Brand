"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { CoinFace } from "./Coin";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Moeda 3D (CSS 3D): frente com ícone, verso com o símbolo, borda com espessura.
 * Inclina seguindo o ponteiro e vira ao passar o mouse/tocar (`flipped`).
 */
export function Coin3D({ icon, flipped, className = "size-28", depth = 9 }: { icon: string; flipped: boolean; className?: string; depth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const tiltX = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const spin = useSpring(0, { stiffness: 70, damping: 14, mass: 0.9 });
  useEffect(() => {
    spin.set(flipped && !reduce ? 180 : 0);
  }, [flipped, reduce, spin]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 30);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 30);
  };
  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div ref={ref} className={`${className} [perspective:700px]`} onPointerMove={onMove} onPointerLeave={onLeave} aria-hidden="true">
      <motion.div className="relative h-full w-full [transform-style:preserve-3d]" style={{ rotateX: tiltX, rotateY: tiltY }}>
        <motion.div className="relative h-full w-full [transform-style:preserve-3d]" style={{ rotateY: spin }}>
          {Array.from({ length: depth }, (_, i) => (
            <span
              key={i}
              className="absolute inset-0 rounded-full"
              style={{ transform: `translateZ(${-i - 1}px)`, background: i === depth - 1 ? "#6e5221" : i % 2 ? "#a7823f" : "#b8924c" }}
            />
          ))}
          <span className="absolute inset-0 [backface-visibility:hidden]" style={{ transform: "translateZ(0.5px)" }}>
            <CoinFace icon={icon} className="h-full w-full" />
          </span>
          <span className="absolute inset-0 [backface-visibility:hidden]" style={{ transform: `rotateY(180deg) translateZ(${depth + 0.5}px)` }}>
            <CoinFace className="h-full w-full" />
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
