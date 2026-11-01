import { Check, CreditCard, Package, Sparkles, Truck } from 'lucide-react';
import type { ReactNode } from 'react';
import { siteConfig } from '../../config/site';
import { kitItems } from '../../content/content';
import { Img } from '../ui/Img';
import { Decor } from '../ui/Decor';
import { Reveal } from '../ui/Reveal';
import { Pending } from '../ui/Pending';
import { PurchaseButton } from '../ui/PurchaseButton';

const INCLUDED = ['Livro infantil “Lulu — a luz que brilha diferente”', ...kitItems.map((k) => k.title)];

function Row({ icon, label, value, fallback }: { icon: ReactNode; label: string; value: string | null; fallback: string }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <span className="mt-0.5 text-magenta-600">{icon}</span>
      <div>
        <dt className="text-xs font-extrabold tracking-wider text-ink/50 uppercase">{label}</dt>
        <dd className="font-bold text-ink/85">
          {value ?? (
            <>
              <span className="text-ink/60">{fallback}</span>
              <Pending />
            </>
          )}
        </dd>
      </div>
    </div>
  );
}

export function OfferSection() {
  const o = siteConfig.offer;
  return (
    <section id="oferta" aria-labelledby="oferta-title" className="relative isolate overflow-hidden bg-magenta-600 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_20%_30%,rgb(219_123_195/0.55),transparent_70%),radial-gradient(50%_50%_at_90%_90%,rgb(110_42_97/0.7),transparent_70%)]" />
      <Decor asset="assets/decorative/heart-pair-a" className="top-[8%] right-[6%] w-14 opacity-80" rotate={10} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-extrabold tracking-wide ring-1 ring-white/20">
            <Sparkles aria-hidden="true" className="size-4" /> Livro + kit completo
          </p>
          <h2 id="oferta-title" className="text-[2.3rem] leading-[1.03] font-extrabold sm:text-5xl lg:text-[4rem]">
            Leve o universo da Lulu para perto de você.
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* composição de produto */}
          <Reveal>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
                <Img
                  asset="assets/products/mockup-capa-e-contracapa"
                  sizes="(min-width:1024px) 680px, 92vw"
                  alt="Mockup do livro aberto mostrando a capa e a contracapa ilustradas com a Lulu."
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
              </div>
              <div className="absolute right-2 bottom-[-10%] w-[46%] rotate-3 overflow-hidden rounded-[22px] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.65)] ring-[6px] ring-white sm:right-[-6%]">
                <Img
                  asset="assets/products/mockup-livro-aberto-rotina"
                  sizes="(min-width:1024px) 320px, 46vw"
                  alt="Mockup do livro aberto na página sobre a rotina da Lulu na escola."
                  className="aspect-[4/3] h-auto w-full scale-125 object-cover"
                />
              </div>
            </div>

            <div className="mt-20 rounded-[28px] bg-white/10 p-6 ring-1 ring-white/20 sm:p-8">
              <h3 className="text-2xl font-bold">O que você recebe</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {INCLUDED.map((i) => (
                  <li key={i} className="flex items-start gap-3 font-semibold text-white/90">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-magenta-600">
                      <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* card de oferta */}
          <Reveal delay={0.15} className="lg:sticky lg:top-28">
            <div className="rounded-[36px] bg-white p-7 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55)] sm:p-9">
              <p className="font-display text-sm font-extrabold tracking-[0.2em] text-magenta-600 uppercase">Oferta</p>
              <h3 className="mt-2 text-3xl leading-tight font-bold text-ink">{o.productName}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{o.description}</p>

              <div className="mt-6 rounded-[24px] bg-blush-100 p-5">
                {o.compareAtPrice && <p className="text-sm font-bold text-ink/50 line-through">{o.compareAtPrice}</p>}
                {o.price ? (
                  <p className="font-display text-5xl font-extrabold text-magenta-600">{o.price}</p>
                ) : (
                  <p className="font-display text-3xl font-extrabold text-magenta-600">
                    Preço em breve
                    <Pending label="preço a definir" />
                  </p>
                )}
                {o.paymentConditions && <p className="mt-1 font-semibold text-ink/70">{o.paymentConditions}</p>}
              </div>

              <dl className="mt-4 divide-y divide-ink/10">
                <Row icon={<Package className="size-5" />} label="Formato" value={o.format} fallback="Será informado em breve" />
                <Row icon={<CreditCard className="size-5" />} label="Pagamento" value={o.paymentConditions} fallback="Condições em definição" />
                <Row icon={<Truck className="size-5" />} label="Frete e entrega" value={o.shipping} fallback="Informações em breve" />
                {o.availability && <Row icon={<Sparkles className="size-5" />} label="Disponibilidade" value={o.availability} fallback="" />}
              </dl>

              <div className="mt-7">
                <PurchaseButton location="offer_card" size="lg" arrow className="w-full">
                  Quero conhecer o kit da Lulu
                </PurchaseButton>
              </div>
              <p className="mt-5 text-xs leading-relaxed font-semibold text-ink/55">
                Material educativo e afetivo. Não substitui acompanhamento profissional.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
