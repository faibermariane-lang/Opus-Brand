"use client";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Serviços. Desktop: accordion horizontal — o card sob o cursor (ou com foco) se
 * expande e revela entregas + CTA. Mobile: accordion vertical.
 */
export function Services() {
  const [active, setActive] = useState<number | null>(0);
  const [desktop, setDesktop] = useState(false);
  const base = useId();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const up = () => setDesktop(mq.matches);
    up();
    mq.addEventListener("change", up);
    return () => mq.removeEventListener("change", up);
  }, []);

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-cream-soft">
      <div className="container-x section-y">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          id="servicos-title"
          subtitle={services.subtitle}
          titleClassName="lg:whitespace-nowrap"
        />

        <Reveal className="mt-10 md:mt-12">
          <ul className="flex flex-col gap-4 lg:h-[560px] lg:flex-row">
            {services.items.map((s, i) => {
              const open = (desktop && active === null ? 0 : active) === i;
              const panelId = `${base}-p${i}`;
              const btnId = `${base}-b${i}`;
              return (
                <li
                  key={s.number}
                  data-service={s.number}
                  className="min-w-0 transition-[flex-grow] duration-[1100ms] ease-[var(--ease-out)] lg:basis-0"
                  style={{ flexGrow: desktop ? (open ? 2.2 : 1) : undefined }}
                  onMouseEnter={() => desktop && setActive(i)}
                  onFocusCapture={() => desktop && setActive(i)}
                >
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border p-7 transition-[background-color,border-color,box-shadow,color,padding] duration-[900ms] ease-[var(--ease-out)] md:p-9 ${desktop && !open ? "lg:!px-6" : ""} ${
                      open
                        ? "bg-deep border-green-900 text-cream shadow-[var(--shadow-lift)]"
                        : "border-green-900/12 bg-cream text-green-900 hover:border-gold/60"
                    }`}
                  >
                    {/* linha dourada que se desenha */}
                    <span aria-hidden="true" className={`absolute top-0 left-9 right-9 h-px origin-left bg-gold transition-transform duration-[1100ms] ease-[var(--ease-out)] ${open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />

                    <div className="flex items-start justify-between gap-4">
                      <span className={`font-display text-[2.6rem] leading-none tracking-[-0.03em] transition-colors duration-700 ${open ? "text-gold" : "text-olive/70"}`}>
                        {s.number}
                      </span>
                      <span className={`flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-700 ${open ? "border-gold/50 text-gold" : "border-green-900/15 text-olive"}`}>
                        <Icon name={s.icon} className="size-[22px]" />
                      </span>
                    </div>

                    <div className="mt-8 lg:mt-auto">
                      <h3 className={`h-card transition-[font-size] duration-700 ${desktop && !open ? "lg:!text-[1.25rem]" : ""}`}>
                        <button
                          id={btnId}
                          type="button"
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => setActive(desktop ? i : open ? null : i)}
                          className="flex w-full items-start justify-between gap-4 text-left after:absolute after:inset-0 after:content-[''] lg:after:hidden"
                          data-cursor={open ? "" : "Ver"}
                        >
                          <span>{s.title}</span>
                          <span aria-hidden="true" className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-700 lg:hidden ${open ? "rotate-45 border-gold text-gold" : "border-green-900/20"}`}>
                            <Icon name="plus" className="size-4" />
                          </span>
                        </button>
                      </h3>
                      <p className={`mt-4 max-w-md text-[0.98rem] leading-relaxed transition-colors duration-700 ${open ? "text-cream/75" : "text-green-900/70"}`}>
                        {s.summary}
                      </p>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        inert={!open}
                        className="grid transition-[grid-template-rows,opacity] duration-[1000ms] ease-[var(--ease-out)]"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
                      >
                        <div className="relative z-[1] overflow-hidden lg:min-w-[440px]">
                          <ul className="mt-7 space-y-3 border-t border-gold/25 pt-7">
                            {s.details.map((d) => (
                              <li key={d} className="flex gap-3 text-[0.97rem] text-cream/85">
                                <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-gold" />
                                {d}
                              </li>
                            ))}
                          </ul>
                          <p className="font-display mt-7 text-[1.3rem] leading-snug text-gold-light italic">{s.closing}</p>
                          <Button href="#contato" subject={s.subject} variant="gold" icon="arrow" className="mt-7">
                            {s.cta}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-start gap-5 border-t border-green-900/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[clamp(1.3rem,2vw,1.7rem)] text-green-900/85">{services.footer.text}</p>
          <Button href={whatsappUrl()} external variant="outline-dark" icon="arrow" magnetic>
            {services.footer.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
