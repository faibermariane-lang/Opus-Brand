import { audiences } from '../../content/content';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function AudienceSection() {
  return (
    <section aria-labelledby="publico-title" className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            id="publico-title"
            eyebrow="Para quem é a Lulu?"
            title={
              <>
                Para quem acredita que cada criança <span className="text-magenta">brilha do seu jeito</span>
              </>
            }
          />
          <Reveal>
            <p className="text-lg leading-relaxed text-ink/75">
              Cada criança é única. Os materiais podem fazer sentido de formas diferentes para cada uma — e tudo bem adaptar, pausar e
              recomeçar no tempo dela.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              delay={i * 0.1}
              className={`group relative flex min-h-[290px] flex-col justify-end overflow-hidden rounded-[32px] p-7 transition-transform duration-500 ease-(--ease-soft) hover:-translate-y-1.5 ${
                i % 2 ? 'lg:translate-y-10' : ''
              }`}
              style={{ backgroundColor: a.bg }}
            >
              <Img
                asset={a.decor}
                alt=""
                className="absolute top-6 right-6 h-20 w-auto transition-transform duration-700 ease-(--ease-soft) group-hover:scale-110 group-hover:rotate-6"
              />
              <h3 className="text-[2rem] font-bold" style={{ color: a.ink }}>
                {a.title}
              </h3>
              <p className="mt-2 text-[1.02rem] leading-relaxed text-ink/80">{a.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
