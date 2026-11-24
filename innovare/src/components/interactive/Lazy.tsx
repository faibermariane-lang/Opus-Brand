"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Carrega o componente só quando ele se aproxima da tela (≈ 1 tela antes).
 * Tira do carregamento inicial o JavaScript de partes que ficam no fim da página.
 * A altura reservada evita deslocamento de layout.
 */
function WhenNear({ children, reserve }: { children: React.ReactNode; reserve: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "1000px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={near ? undefined : reserve}>
      {near ? children : null}
    </div>
  );
}

const Diagnostic = dynamic(() => import("./Diagnostic").then((m) => m.Diagnostic), { ssr: false });
const ContactForm = dynamic(() => import("./ContactForm").then((m) => m.ContactForm), { ssr: false });

export function LazyDiagnostic() {
  return (
    <WhenNear reserve="min-h-[640px] sm:min-h-[520px]">
      <Diagnostic />
    </WhenNear>
  );
}

export function LazyContactForm() {
  return (
    <WhenNear reserve="min-h-[860px] sm:min-h-[560px]">
      <ContactForm />
    </WhenNear>
  );
}
