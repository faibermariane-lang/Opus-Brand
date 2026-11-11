import { fill, fillHints } from "@/content/site";

/** Marcador discreto para dados ainda não preenchidos em src/content/site.ts. */
export function Pending({ hint, className = "" }: { hint: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline rounded-full border border-dashed border-current/35 px-2 py-px align-baseline font-sans text-[0.72em] font-normal not-italic tracking-wide opacity-70 ${className}`}
      title="Dado a preencher em src/content/site.ts"
    >
      <span aria-hidden="true">[</span>a preencher: {hint}<span aria-hidden="true">]</span>
    </span>
  );
}

type FillKey = keyof typeof fill;

/** Valor de `fill` como texto ou null. */
export function fillValue(key: string): string | null {
  const v = (fill as Record<string, unknown>)[key];
  return typeof v === "string" && v.trim() ? v : null;
}

/**
 * Renderiza um texto do site.ts trocando `{chave}` pelo valor de `fill[chave]`
 * (ou pelo marcador "a preencher"). `{chave^}` capitaliza a primeira letra.
 */
export function Filled({ text, extra = {} }: { text: string; extra?: Record<string, string> }) {
  const parts = text.split(/(\{\w+\^?\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\{(\w+)(\^?)\}$/);
        if (!m) return part;
        const key = m[1];
        if (key in extra) return extra[key];
        const v = fillValue(key as FillKey);
        if (!v) return <Pending key={i} hint={fillHints[key] ?? key} />;
        return m[2] ? v.charAt(0).toUpperCase() + v.slice(1) : v;
      })}
    </>
  );
}
