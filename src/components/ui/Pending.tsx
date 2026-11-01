import { siteConfig } from '../../config/site';

/** Selo discreto para campos comerciais que ainda serão definidos. */
export function Pending({ label = 'a definir' }: { label?: string }) {
  if (!siteConfig.showPendingMarkers) return null;
  return (
    <span className="ml-2 inline-flex items-center rounded-full border border-dashed border-current/40 px-2 py-0.5 align-middle font-sans text-[0.7rem] font-bold tracking-wide uppercase opacity-70">
      {label}
    </span>
  );
}
