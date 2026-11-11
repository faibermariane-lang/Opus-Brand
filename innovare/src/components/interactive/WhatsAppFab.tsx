import { Icon } from "@/components/ui/Icon";
import { whatsappFab } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

/** Botão flutuante de WhatsApp: pílula dourada discreta com rótulo no hover/foco. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsappFab.label}
      className="group fixed right-4 bottom-4 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full border border-gold/40 bg-green-900/90 pr-[1.05rem] pl-[1.05rem] text-gold shadow-[0_18px_40px_-18px_rgb(9_40_28/0.6)] backdrop-blur-md transition-[gap,padding,background-color] duration-700 ease-[var(--ease-out)] hover:gap-3 hover:bg-green-900 hover:pr-6 focus-visible:gap-3 focus-visible:pr-6 md:right-7 md:bottom-7"
      data-cursor=""
    >
      <Icon name="whatsapp" className="size-6 shrink-0" />
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap text-cream transition-[max-width] duration-700 ease-[var(--ease-out)] group-hover:max-w-48 group-focus-visible:max-w-48">
        {whatsappFab.label}
      </span>
    </a>
  );
}
