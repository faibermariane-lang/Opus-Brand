import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SymbolMark } from "@/components/brand/SymbolMark";
import { Filled } from "@/components/ui/Pending";
import { contact, footer, nav } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function Footer({ homePrefix = "" }: { homePrefix?: string }) {
  return (
    <footer className="bg-deep grain arc-top overflow-hidden">
      <SymbolMark className="pointer-events-none absolute -right-[12%] -bottom-[35%] w-[70vw] max-w-[900px] opacity-[0.06]" strokeWidth={2.5} />
      <div className="container-x pt-24 pb-10 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="gold" className="h-auto w-52 md:w-64" />
            <p className="font-display mt-10 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight text-cream">{footer.phrase}</p>
            <p className="mt-3 text-cream/60">{footer.subphrase}</p>
          </div>
          <nav aria-label={footer.columns.nav} className="lg:col-span-2 lg:col-start-7">
            <p className="eyebrow text-gold">{footer.columns.nav}</p>
            <ul className="mt-6 space-y-3 text-cream/75">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={`${homePrefix}${n.href}`} className="link-underline hover:text-cream">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-2">
            <p className="eyebrow text-gold">{footer.columns.services}</p>
            <ul className="mt-6 space-y-3 text-cream/75">
              {footer.services.map((s) => (
                <li key={s}>
                  <a href={`${homePrefix}#servicos`} className="link-underline hover:text-cream">{s}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="eyebrow text-gold">{footer.columns.contact}</p>
            <ul className="mt-6 space-y-3 text-cream/75">
              <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-cream">WhatsApp {contact.whatsappDisplay}</a></li>
              <li><a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-cream">{contact.instagramHandle}</a></li>
              <li>{footer.hqShort}</li>
            </ul>
          </div>
        </div>

        <div className="gold-hairline mt-20 opacity-30" />
        <div className="mt-8 flex flex-col gap-4 text-sm text-cream/55 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p><Filled text={footer.rights} extra={{ year: String(new Date().getFullYear()) }} /></p>
            <p><Filled text={footer.legal} /></p>
          </div>
          <div className="flex gap-6">
            <Link href="/politica-de-privacidade" className="link-underline hover:text-cream">{footer.privacy}</Link>
            <Link href="/termos-de-uso" className="link-underline hover:text-cream">{footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
