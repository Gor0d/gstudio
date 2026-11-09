import Link from "next/link";

/** Símbolo "Slash" (duas barras): lima + verde, geometria do manual v1.0. */
export function SlashMark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 -105 164.47 116" aria-hidden="true" focusable="false">
    <polygon fill="#B8FF67" points="0,11 39.77,11 93.63,-88.43 53.86,-88.43" />
    <polygon fill="#79A84A" points="74.16,-9.71 113.1,-9.71 164.47,-105 125.53,-105" />
  </svg>;
}

export function BrandLogo({ footer = false, onClick }: { footer?: boolean; onClick?: () => void }) {
  return <Link href="/" onClick={onClick} className={footer ? "brand brand-footer" : "brand"} aria-label="Gorod Studio, página inicial">
    <SlashMark className="brand-symbol" /><span className="brand-name">Gorod <strong>Studio</strong></span>
  </Link>;
}
