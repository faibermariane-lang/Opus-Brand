import { FounderCaption } from "@/components/sections/About";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

/** Quem cuida da sua empresa (substitui depoimentos — não há depoimentos no site). */
export function Team() {
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="bg-linen arc-top">
      <div className="container-x section-y grid items-center gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-6 lg:col-span-5">
          <figure className="space-y-4">
            <Photo
              src={team.photo.src}
              alt={team.photo.alt}
              width={team.photo.width}
              height={team.photo.height}
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 46vw, 92vw"
              shape="arc"
              objectPosition="50% 25%"
              className="aspect-[4/5]"
            />
            <FounderCaption />
          </figure>
        </Reveal>
        <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <SectionHeading eyebrow={team.eyebrow} title={team.title} id="equipe-title" titleClassName="max-w-[14ch]" />
          <Reveal delay={0.15}>
            <p className="font-display mt-8 max-w-xl text-[clamp(1.3rem,2vw,1.75rem)] leading-[1.35] text-green-900/80">{team.text}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <Button href={whatsappUrl()} external variant="dark" icon="arrow" magnetic className="mt-10">
              {team.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
