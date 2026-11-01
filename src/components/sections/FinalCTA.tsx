import { Img } from '../ui/Img';
import { Decor } from '../ui/Decor';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';

/** Fechamento inspirado na contracapa do livro: Lulu espiando, nuvens e corações. */
export function FinalCTA() {
  return (
    <section aria-labelledby="final-title" className="grain relative isolate overflow-hidden bg-blush-100 pt-24 sm:pt-32">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -z-10 size-[900px] -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.95),rgb(255_244_214/0.5)_35%,transparent_68%)]"
      />
      <Decor asset="assets/decorative/cloud-stroke" motion="float-slow" className="top-[3%] left-[-60px] w-[180px] opacity-90 sm:top-[10%] sm:left-[4%] sm:w-[320px]" />
      <Decor asset="assets/decorative/cloud-stroke" motion="float-slow" delay={2} rotate={-4} className="top-[3%] right-[-70px] w-[170px] opacity-80 sm:top-[22%] sm:right-[-30px] sm:w-[300px]" />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 id="final-title" className="text-[2.4rem] leading-[1.04] font-extrabold text-ink sm:text-6xl lg:text-[4.2rem]">
            Existem muitas maneiras de enxergar o mundo.{' '}
            <span className="text-magenta">Vamos descobrir a da Lulu?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/75 sm:text-xl">
            Uma história sobre acolhimento, descobertas e a beleza de ser quem somos.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="#oferta" size="lg" arrow event="cta_primary_click" eventParams={{ location: 'final_cta' }}>
              Quero entrar no universo da Lulu
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-14 w-[min(92vw,620px)]">
        <Decor asset="assets/decorative/heart-pair-b" className="top-[-8%] left-[64%] w-14 sm:w-16" rotate={6} />
        <Reveal y={60}>
          <Img
            asset="assets/lulu/lulu-peek"
            sizes="(min-width: 640px) 620px, 92vw"
            alt="Lulu espiando, com seus grandes olhos verdes e o laço vermelho, como na contracapa do livro."
            className="block h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
