import { ContactForm } from "@/components/interactive/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, contactSection } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function Contact() {
  const d = contactSection.details;
  const rows = [
    { icon: "whatsapp", label: d.whatsapp, value: <a className="link-underline" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{contact.whatsappDisplay}</a> },
    { icon: "instagram", label: d.instagram, value: <a className="link-underline" href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">{contact.instagramHandle}</a> },
    { icon: "pin", label: d.hq, value: <>{contact.city}, {contact.state}</> },
  ];

  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-linen arc-top">
      <div className="container-x section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading title={contactSection.title} id="contato-title" titleClassName="max-w-[12ch]" />
          <Reveal delay={0.15}>
            <p className="lead mt-6 text-green-900/75">{contactSection.text}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-10 border-t border-green-900/12">
              {rows.map((r) => (
                <div key={r.label} className="flex items-start gap-5 border-b border-green-900/12 py-5">
                  <Icon name={r.icon} className="mt-0.5 size-5 shrink-0 text-olive" />
                  <dt className="eyebrow w-20 shrink-0 pt-1 text-green-900/55 sm:w-24">{r.label}</dt>
                  <dd className="min-w-0 break-words text-green-900 [overflow-wrap:anywhere]">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="eyebrow mt-8 text-olive">{contactSection.footerLine}</p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
