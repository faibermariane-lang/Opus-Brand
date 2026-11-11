import { SymbolMark } from "@/components/brand/SymbolMark";
import { HeroParallax } from "@/components/interactive/HeroParallax";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { finalCta } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

/** CTA final: símbolo gigante ao fundo; o vinho aparece num único detalhe (o filete). */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-final-title" className="bg-deep grain relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cream/10" />
      <HeroParallax amount={6} className="pointer-events-none absolute top-1/2 left-1/2 w-[120vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 sm:w-[70vw]">
        <SymbolMark className="h-auto w-full opacity-[0.09]" strokeWidth={2.2} />
      </HeroParallax>
      <div className="container-x relative py-[clamp(72px,8vw,120px)] text-center">
        <span aria-hidden="true" className="mx-auto mb-7 block h-8 w-px bg-wine" />
        <RevealText as="h2" id="cta-final-title" text={finalCta.title} className="mx-auto max-w-[20ch] text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.06] tracking-[-0.022em] text-cream" />
        <Reveal delay={0.2}>
          <p className="font-display mx-auto mt-6 max-w-2xl text-[clamp(1.35rem,2.2vw,1.9rem)] text-gold-light italic">{finalCta.subtitle}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="lead mx-auto mt-5 max-w-xl text-cream/70">{finalCta.text}</p>
        </Reveal>
        <Reveal delay={0.4} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={whatsappUrl()} external variant="gold" icon="arrow" magnetic>
            {finalCta.primary}
          </Button>
          <Button href="#contato" variant="outline-light" magnetic>
            {finalCta.secondary}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
