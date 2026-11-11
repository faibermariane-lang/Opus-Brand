import { ContactForm } from "@/components/interactive/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Filled, Pending, fillValue } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, contactSection, fillHints } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function Contact() {
  const email = fillValue("email");
  const address = fillValue("address");
  const hours = fillValue("hours");
  const d = contactSection.details;
  const rows = [
    { icon: "whatsapp", label: d.whatsapp, value: <a className="link-underline" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{contact.whatsappDisplay}</a> },
    { icon: "mail", label: d.email, value: email ? <a className="link-underline" href={`mailto:${email}`}>{email}</a> : <><Pending hint={fillHints.email} /></> },
    { icon: "instagram", label: d.instagram, value: <a className="link-underline" href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">{contact.instagramHandle}</a> },
    { icon: "pin", label: d.hq, value: <>{contact.city}, {contact.state}{address ? <><br />{address}</> : <> <Pending hint={fillHints.address} /></>}</> },
    { icon: "clock", label: d.hours, value: hours ?? <Pending hint={fillHints.hours} /> },
  ];

  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-linen arc-top">
      <div className="container-x section-y grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading title={contactSection.title} id="contato-title" titleClassName="max-w-[12ch]" />
          <Reveal delay={0.15}>
            <p className="lead mt-6 text-green-900/75">
              <Filled text={contactSection.text} />
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-12 border-t border-green-900/12">
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
