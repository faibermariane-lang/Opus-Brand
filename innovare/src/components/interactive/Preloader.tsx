import { SYMBOL } from "@/components/brand/paths";
import { Logo } from "@/components/brand/Logo";
import { preloader } from "@/content/site";

/**
 * Preloader curto (≤ 1,2s), só na primeira visita da sessão, 100% CSS
 * (não espera JS e não segura o LCP). Pulável: clique ou Esc (script inline no layout).
 * Some com prefers-reduced-motion.
 */
export function Preloader() {
  return (
    <div
      id="preloader"
      className="preloader bg-deep fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8"
      aria-hidden="true"
    >
      <svg viewBox={SYMBOL.viewBox} className="size-24 md:size-28" fill="none" stroke="var(--color-gold)" strokeWidth={8}>
        <circle className="draw" r={SYMBOL.circleR} pathLength={1} transform="rotate(-90)" />
        {[0, 90, 180, 270].map((a) => (
          <path key={a} className="draw" pathLength={1} d={SYMBOL.lens} transform={`rotate(${a})`} style={{ animationDelay: "0.12s" }} />
        ))}
        <path className="draw" pathLength={1} d={SYMBOL.diamond} style={{ animationDelay: "0.22s" }} />
      </svg>
      <Logo tone="gold" className="appear w-44 md:w-52" />
      <button
        type="button"
        tabIndex={-1}
        data-skip-intro=""
        className="eyebrow absolute right-6 bottom-6 text-cream/50 transition-colors hover:text-gold"
      >
        {preloader.skip}
      </button>
    </div>
  );
}

/** Script inline: marca a sessão e permite pular o preloader. */
export const preloaderScript = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem('innovare-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('no-intro')}else{sessionStorage.setItem('innovare-intro','1')}}catch(e){document.documentElement.classList.add('no-intro')}
function skip(){document.documentElement.classList.add('no-intro')}
document.addEventListener('keydown',function(e){if(e.key==='Escape')skip()},{once:true});
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('#preloader'))skip()});})();`;
