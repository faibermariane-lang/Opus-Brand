"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { CoinFace } from "@/components/brand/Coin";

/**
 * Cursor customizado em forma de moeda Innovare (apenas ponteiro fino).
 * Sobre elementos clicáveis a moeda cresce e gira em 3D; `data-cursor="Ver"` mostra rótulo.
 * Desligado em touch e com prefers-reduced-motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 34, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 520, damping: 34, mass: 0.35 });

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
      const t = (e.target as Element | null)?.closest?.("a, button, [data-cursor], select, label, [role='button']");
      setHover(!!t);
      setLabel(t?.getAttribute("data-cursor") ?? "");
    };
    const leave = () => setVisible(false);
    const pd = () => setDown(true);
    const pu = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointerup", pu);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointerup", pu);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = hover ? 40 : 24;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}>
      <motion.div className="absolute top-0 left-0" style={{ x: sx, y: sy, perspective: 400 }}>
        <div
          className="coin-cursor -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-500 ease-[var(--ease-out)]"
          data-hover={hover ? "" : undefined}
          style={{ width: size, height: size, scale: down ? 0.85 : 1 }}
        >
          <CoinFace className="h-full w-full drop-shadow-[0_4px_8px_rgb(9_40_28/0.35)]" />
        </div>
        {label ? (
          <span className="absolute top-5 left-6 rounded-full bg-green-900 px-3 py-1 text-[10px] font-medium tracking-[0.18em] whitespace-nowrap text-gold uppercase">
            {label}
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
