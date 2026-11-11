/**
 * Conjunto próprio de ícones em traço 1.5px, cantos arredondados, geometria
 * coerente com o símbolo (arcos e círculos). Sempre decorativos (aria-hidden).
 */
export type IconName =
  | "phone" | "building" | "seal" | "globe" | "check" | "eye" | "people" | "ledger" | "paper" | "video"
  | "search" | "compass" | "key" | "growth" | "arrow" | "arrowDown" | "plus" | "close" | "whatsapp"
  | "instagram" | "mail" | "pin" | "clock" | "menu";

const P: Record<IconName, React.ReactNode> = {
  phone: (<><rect x="6.5" y="2.75" width="11" height="18.5" rx="2.75" /><path d="M10.5 18.25h3" /><path d="M9 6.5c1.9-1 4.1-1 6 0" /></>),
  building: (<><path d="M4 20.5h16" /><path d="M6 20.5V9.5a6 6 0 0 1 12 0v11" /><path d="M10 20.5v-4.5a2 2 0 0 1 4 0v4.5" /><path d="M12 6.5v1.5" /></>),
  seal: (<><circle cx="12" cy="10" r="6.75" /><path d="M9.25 10a2.75 2.75 0 0 0 5.5 0 2.75 2.75 0 0 0-5.5 0Z" /><path d="m8.5 15.75-1.25 5 4.75-2 4.75 2-1.25-5" /></>),
  globe: (<><circle cx="12" cy="12" r="8.75" /><path d="M3.5 12h17" /><path d="M12 3.25c-4.6 4.9-4.6 12.6 0 17.5 4.6-4.9 4.6-12.6 0-17.5Z" /></>),
  check: (<><circle cx="12" cy="12" r="8.75" /><path d="m8.25 12.25 2.5 2.5 5-5.25" /></>),
  eye: (<><path d="M2.75 12C5 7.5 8.25 5.25 12 5.25S19 7.5 21.25 12C19 16.5 15.75 18.75 12 18.75S5 16.5 2.75 12Z" /><circle cx="12" cy="12" r="3" /></>),
  people: (<><circle cx="9" cy="8.5" r="3.25" /><path d="M3.25 19.5c.6-3.3 2.9-5 5.75-5s5.15 1.7 5.75 5" /><circle cx="16.75" cy="9.5" r="2.5" /><path d="M16.5 14.6c2.3 0 3.9 1.4 4.3 3.9" /></>),
  ledger: (<><rect x="4.75" y="3.25" width="14.5" height="17.5" rx="2.5" /><path d="M8.5 8h7M8.5 12h7M8.5 16h4" /></>),
  paper: (<><path d="M6.75 3.25h7l4.5 4.5v11.5a1.5 1.5 0 0 1-1.5 1.5h-10a1.5 1.5 0 0 1-1.5-1.5v-14.5a1.5 1.5 0 0 1 1.5-1.5Z" /><path d="M13.5 3.5v4.5H18" /><path d="m9 14.25 2 2 4-4" /></>),
  video: (<><rect x="2.75" y="6.25" width="13" height="11.5" rx="2.5" /><path d="m15.75 10.5 5.5-3v9l-5.5-3" /></>),
  search: (<><circle cx="10.75" cy="10.75" r="6.5" /><path d="m15.5 15.5 5 5" /></>),
  compass: (<><circle cx="12" cy="12" r="8.75" /><path d="m14.9 9.1-1.6 4.2-4.2 1.6 1.6-4.2 4.2-1.6Z" /></>),
  key: (<><circle cx="8" cy="12" r="4.25" /><path d="M12.25 12h8.5M17.5 12v3M20.25 12v2" /></>),
  growth: (<><path d="M3.5 20.5h17" /><path d="M5 16.5c3.5 0 4.5-4 7.5-4s3.5-5 7-6.5" /><path d="M16.5 5.75h3.25V9" /></>),
  arrow: (<><path d="M4.5 12h15" /><path d="m13.75 6.25 5.75 5.75-5.75 5.75" /></>),
  arrowDown: (<><path d="M12 4.5v15" /><path d="m6.25 13.75 5.75 5.75 5.75-5.75" /></>),
  plus: (<><path d="M12 5v14M5 12h14" /></>),
  close: (<><path d="m6 6 12 12M18 6 6 18" /></>),
  menu: (<><path d="M4 9h16M4 15h16" /></>),
  whatsapp: (<><path d="M4.1 19.9 5.2 16A8.25 8.25 0 1 1 8.2 19l-4.1.9Z" /><path d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.4 0 .5.6 1.1 1.5 1.9 2.6 2.5.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .9-.6 1.8-1.6 2-.8.2-2-.1-3.6-1.1-1.6-1-2.8-2.5-3.4-3.8-.5-1.2-.4-2.5.3-3.3Z" /></>),
  instagram: (<><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7h.01" /></>),
  mail: (<><rect x="3" y="5.25" width="18" height="13.5" rx="2.5" /><path d="m3.75 7 8.25 6 8.25-6" /></>),
  pin: (<><path d="M12 21s-6.75-5.6-6.75-11a6.75 6.75 0 0 1 13.5 0c0 5.4-6.75 11-6.75 11Z" /><circle cx="12" cy="10" r="2.5" /></>),
  clock: (<><circle cx="12" cy="12" r="8.75" /><path d="M12 7.25V12l3 2" /></>),
};

export function Icon({ name, className = "size-6", strokeWidth = 1.5 }: { name: IconName | string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {P[name as IconName]}
    </svg>
  );
}
