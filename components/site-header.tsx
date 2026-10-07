import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

const links = [["Serviços", "/servicos"], ["Projetos", "/projetos"], ["Como trabalhamos", "/#processo"], ["Sobre", "/sobre"]];

export function SiteHeader() {
  return <header className="site-header"><div className="shell header-inner">
    <Link href="/" className="brand" aria-label="Gorod Studio, página inicial"><span className="brand-mark" aria-hidden="true">G</span><span>Gorod <strong>Studio</strong></span></Link>
    <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    <Link href="/contato" className="button button-small header-cta">Conversar <ArrowUpRight size={15} /></Link>
    <details className="mobile-nav"><summary aria-label="Abrir menu"><Menu size={22} /></summary><div className="mobile-nav-panel">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/contato">Conversar sobre um projeto</Link></div></details>
  </div></header>;
}
