import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Footer } from "@/components/sections/Footer";
import { Pending, fillValue } from "@/components/ui/Pending";
import { fillHints, legalPages } from "@/content/site";

/** Estrutura das páginas legais. O texto jurídico vem de `fill` em site.ts. */
export function LegalPage({ title, fillKey }: { title: string; fillKey: "privacyPolicy" | "termsOfUse" }) {
  const body = fillValue(fillKey);
  return (
    <>
      <header className="container-x flex items-center justify-between py-8">
        <Link href="/" aria-label="Innovare Contabilidade, início">
          <Logo variant="wordmark" className="h-7 w-auto" />
        </Link>
        <Link href="/" className="link-underline text-sm text-green-900/70">← {legalPages.back}</Link>
      </header>
      <main id="conteudo" className="bg-linen">
        <article className="container-x max-w-3xl pt-16 pb-48 md:pt-24">
          <h1 className="h-section">{title}</h1>
          <div className="gold-hairline mt-10 mb-10 opacity-60" />
          {body ? (
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-green-900/80">
              {body.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ) : (
            <p className="text-lg"><Pending hint={fillHints[fillKey]} /></p>
          )}
        </article>
      </main>
      <Footer homePrefix="/" />
    </>
  );
}
