"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cursor customizado (apenas ponteiro fino): ponto dourado + anel que cresce sobre
 * elementos clicáveis e mostra rótulo (atributo data-cursor="Ver").
 * Desligado em touch e com prefers-reduced-motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = (e.target as Element | null)?.closest?.("a, button, [data-cursor], select, label, input, textarea, [role='button']");
      setHover(!!t && !(t instanceof HTMLInputElement && t.type === "text"));
      setLabel(t?.getAttribute("data-cursor") ?? "");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0, transition: "opacity .4s" }}>
      <motion.div className="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" style={{ x, y }} />
      <motion.div
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 text-[10px] font-medium tracking-[0.18em] text-green-900 uppercase backdrop-blur-[1px] transition-[width,height,background-color] duration-500 ease-[var(--ease-out)]"
        style={{
          x: rx,
          y: ry,
          width: label ? 72 : hover ? 46 : 28,
          height: label ? 72 : hover ? 46 : 28,
          backgroundColor: label ? "rgb(213 178 111 / 0.92)" : "transparent",
          mixBlendMode: label ? "normal" : "difference",
        }}
      >
        {label}
      </motion.div>
    </div>
  );
}
