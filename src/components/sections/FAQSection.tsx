import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '../../content/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Pending } from '../ui/Pending';
import { Img } from '../ui/Img';
import { track } from '../../lib/analytics';

function Item({ q, a, pending, defaultOpen }: { q: string; a: string; pending?: boolean; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const id = useId();
  return (
    <li className={`rounded-[26px] transition-colors duration-500 ${open ? 'bg-white shadow-[0_20px_40px_-30px_rgb(63_87_123/0.6)]' : 'bg-white/55'}`}>
      <h3 className="font-sans">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={() => {
            setOpen((v) => !v);
            track('faq_interaction', { question: q, action: open ? 'close' : 'open' });
          }}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-extrabold text-navy sm:px-7 sm:text-xl"
        >
          <span>{q}</span>
          <span
            aria-hidden="true"
            className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
              open ? 'rotate-45 bg-navy text-white' : 'bg-sky-200 text-navy'
            }`}
          >
            <Plus className="size-5" strokeWidth={2.8} />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-soft) ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="px-6 pb-6 text-[1.05rem] leading-relaxed text-ink/80 sm:px-7">
            {a}
            {pending && <Pending label="informação pendente" />}
          </p>
        </div>
      </div>
    </li>
  );
}

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative isolate overflow-hidden bg-sky-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="Perguntas frequentes"
            title="Ficou alguma dúvida?"
            intro="Reunimos aqui as perguntas mais comuns sobre o livro e o kit."
          />
          <Reveal className="mt-10 hidden lg:block">
            <Img asset="assets/lulu/lulu-thinking" alt="" sizes="320px" className="w-[300px]" />
          </Reveal>
        </div>
        <Reveal>
          <ul className="grid gap-3">
            {faqs.map((f, i) => (
              <Item key={f.q} {...f} defaultOpen={i === 0} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
