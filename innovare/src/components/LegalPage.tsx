import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Footer } from "@/components/sections/Footer";
import { legalPages, type LegalSection } from "@/content/site";

/** Estrutura das páginas legais (texto em site.ts → legalPages). */
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <header className="container-x flex items-center justify-between gap-4 py-6 md:py-8">
        <Link href="/" aria-label="Innovare Contabilidade, início">
          <Logo variant="wordmark" className="h-6 w-auto md:h-7" />
        </Link>
        <Link href="/" className="link-underline text-sm text-green-900/70">← {legalPages.back}</Link>
      </header>
      <main id="conteudo" className="bg-linen">
        <article className="container-x max-w-3xl pt-10 pb-[calc(var(--radius-arc)+64px)] md:pt-16">
          <h1 className="h-section">{title}</h1>
          <div className="gold-hairline mt-8 mb-8 opacity-60" />
          <p className="lead text-green-900/85">{intro}</p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-[1.5rem] leading-tight">{s.heading}</h2>
                <div className="mt-3 space-y-3 text-[1.02rem] leading-relaxed text-green-900/80">
                  {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-12 text-sm text-green-900/55">{legalPages.updated}</p>
        </article>
      </main>
      <Footer homePrefix="/" />
    </>
  );
}
