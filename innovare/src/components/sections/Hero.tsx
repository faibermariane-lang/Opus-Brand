import { SymbolMark } from "@/components/brand/SymbolMark";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { HeroParallax } from "@/components/interactive/HeroParallax";

/** Hero 100svh. Revelação do H1 em CSS (não depende de JS → LCP rápido). */
export function Hero() {
  const words = hero.title.split(" ");
  return (
    <section id="inicio" aria-labelledby="hero-title" className="bg-deep grain intro-delay relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Símbolo gigante ao fundo, girando uma volta a cada 120s */}
      <HeroParallax className="pointer-events-none absolute top-1/2 -right-[38%] w-[150vw] max-w-none -translate-y-1/2 sm:-right-[28%] sm:w-[110vw] lg:-right-[14%] lg:w-[min(78vw,1180px)]">
        <div className="spin-120 opacity-[0.11]">
          <SymbolMark className="h-auto w-full" strokeWidth={2.4} />
        </div>
      </HeroParallax>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(70% 60% at 15% 85%, rgb(15 58 42 / 0.9), transparent 70%)" }} />

      <div className="container-x relative flex flex-1 flex-col justify-end pt-36 pb-28 md:pb-32 lg:pt-44">
        <p className="eyebrow hero-fade mb-8 text-gold md:mb-10" style={{ "--d": "0.05s" } as React.CSSProperties}>
          {hero.eyebrow}
        </p>
        <h1 id="hero-title" className="h-display max-w-[15ch] text-cream" >
          <span className="sr-only">{hero.title}</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
              <span className="hero-word" style={{ "--i": i } as React.CSSProperties}>
                {i >= 5 ? <em className="text-gold-light italic">{w}</em> : w}
              </span>
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
        <div className="mt-10 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,34rem)_auto] lg:items-end lg:justify-between">
          <p className="lead hero-fade max-w-[34rem] text-cream/78" style={{ "--d": "0.55s" } as React.CSSProperties}>
            {hero.subtitle}
          </p>
          <div className="hero-fade flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.7s" } as React.CSSProperties}>
            <Button href={whatsappUrl()} external variant="gold" magnetic icon="arrow" cursorLabel="">
              {hero.ctaPrimary}
            </Button>
            <Button href="#servicos" variant="outline-light" magnetic>
              {hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      <div className="container-x relative flex items-center justify-between pb-7 md:pb-9">
        <p className="eyebrow hero-fade flex items-center gap-3 text-cream/60" style={{ "--d": "0.9s" } as React.CSSProperties}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
          {hero.seal}
        </p>
        <a href="#pilares" className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-cream/60 transition-colors hover:text-gold lg:flex" style={{ "--d": "1s" } as React.CSSProperties}>
          <span className="eyebrow">{hero.scroll}</span>
          <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-cream/15">
            <span className="scroll-line absolute inset-0 bg-gold" />
          </span>
        </a>
      </div>
    </section>
  );
}
