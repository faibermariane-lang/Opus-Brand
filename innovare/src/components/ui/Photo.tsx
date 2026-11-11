import Image from "next/image";
import { SymbolMark } from "@/components/brand/SymbolMark";

/**
 * Foto das fundadoras com tratamento de marca: cover com foco nos rostos,
 * máscara em arco ou cantos de 32px, gradiente verde-escuro na base/bordas e grão.
 * Sem `src`, mostra um fallback elegante (verde, linho e símbolo).
 */
export function Photo({
  src, alt, width, height, sizes, priority = false, shape = "rounded", className = "", objectPosition = "50% 30%",
}: {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  shape?: "rounded" | "arc";
  className?: string;
  objectPosition?: string;
}) {
  const radius = shape === "arc" ? "rounded-t-[999px] rounded-b-[32px]" : "rounded-[32px]";
  return (
    <figure className={`grain relative overflow-hidden bg-green-700 ${radius} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <div className="bg-deep absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <SymbolMark className="absolute -right-1/4 -bottom-1/4 w-[110%] opacity-[0.12]" strokeWidth={4} />
          <SymbolMark className="w-1/4 opacity-60" strokeWidth={6} />
        </div>
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to top, rgb(9 40 28 / 0.38), rgb(9 40 28 / 0.08) 30%, transparent 55%), radial-gradient(120% 90% at 50% 40%, transparent 60%, rgb(9 40 28 / 0.16))",
        }}
      />
    </figure>
  );
}
