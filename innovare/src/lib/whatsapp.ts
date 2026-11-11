import { contact } from "@/content/site";

export function whatsappUrl(message: string = contact.whatsappDefaultMessage) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Substitui `{chave}` em um texto simples. */
export function interpolate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");
}
