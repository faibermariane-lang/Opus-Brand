import { HeartHandshake, Quote } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Reveal } from '../ui/Reveal';
import { Img } from '../ui/Img';

/**
 * SEÇÃO 08 — Uma experiência que sai das páginas.
 * Não exibe nome, idade, diagnóstico ou imagem da criança.
 * Fotos e depoimentos só aparecem se forem cadastrados (com autorização) em site.ts.
 */
export function TestimonialSection() {
  const { enabled, partnerName, photos, testimonials } = siteConfig.experience;
  if (!enabled) return null;

  return (
    <section aria-labelledby="aplicacao-title" className="relative isolate overflow-hidden bg-sage py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/60 px-3.5 py-1.5 text-sm font-extrabold tracking-wide text-forest ring-1 ring-forest/10">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" /> Uma experiência que sai das páginas
          </p>
          <h2 id="aplicacao-title" className="text-[2.15rem] leading-[1.05] font-bold text-forest sm:text-5xl lg:text-[3.4rem]">
            Do livro para a vida real
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            Os materiais da Lulu já foram vivenciados em uma primeira experiência
            {partnerName ? (
              <>
                {' '}com a <strong className="text-forest">{partnerName}</strong>
              </>
            ) : null}
            , em atividades compartilhadas entre uma mãe e sua filha.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">
            O retorno foi positivo em relação à <span className="hl font-bold text-forest [--hl:rgb(148_216_148/0.5)]">interação e ao vínculo</span>{' '}
            entre as duas — um momento de estar junto, mediado pela história e pelos recursos visuais.
          </p>
          <p className="mt-6 flex items-start gap-2 rounded-2xl bg-white/50 p-4 text-sm font-semibold text-ink/70">
            <HeartHandshake aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-forest" />
            Relato de uma experiência inicial, sem caráter clínico. Cada criança e cada família vivem a leitura de um jeito.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="grid gap-5">
          {testimonials.length > 0 ? (
            testimonials.map((t) => (
              <figure key={t.quote} className="rounded-[32px] bg-white p-8 shadow-[0_24px_50px_-34px_rgb(33_63_45/0.6)]">
                <Quote aria-hidden="true" className="size-8 text-forest/40" />
                <blockquote className="mt-3 font-display text-2xl leading-snug font-semibold text-forest">“{t.quote}”</blockquote>
                <figcaption className="mt-4 font-bold text-ink/70">
                  {t.author}
                  {t.context && <span className="font-semibold text-ink/50"> · {t.context}</span>}
                </figcaption>
              </figure>
            ))
          ) : (
            <div className="relative overflow-hidden rounded-[36px] bg-white/55 p-8 border-2 border-dashed border-forest/25 sm:p-10">
              <div className="flex items-end gap-6">
                <div className="flex-1">
                  <p className="font-display text-2xl leading-snug font-bold text-forest sm:text-3xl">Em breve, registros dessa experiência.</p>
                  <p className="mt-3 text-ink/70">
                    Este espaço receberá fotografias e depoimentos — somente com autorização das famílias.
                  </p>
                </div>
                <Img asset="assets/lulu/lulu-full-crayon" alt="" sizes="140px" className="hidden h-44 w-auto sm:block" />
              </div>
            </div>
          )}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {photos.map((p) => (
                <img key={p.src} src={p.src} alt={p.alt} loading="lazy" className="aspect-square w-full rounded-[24px] object-cover" />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
