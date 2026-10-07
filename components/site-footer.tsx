import Link from "next/link";
import { Code2, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-grid">
    <div><Link href="/" className="brand brand-footer"><span className="brand-mark">G</span><span>Gorod <strong>Studio</strong></span></Link><p>Software para operações que precisam avançar.</p></div>
    <div className="footer-links"><span>Explorar</span><Link href="/servicos">Serviços</Link><Link href="/projetos">Projetos</Link><Link href="/sobre">Sobre</Link></div>
    <div className="footer-links"><span>Contato</span><Link href="/contato">Iniciar conversa <ArrowUpRight size={14} /></Link><a href="https://github.com/Gor0d" target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub</a></div>
  </div><div className="shell footer-bottom"><span>© 2026 Gorod Studio</span><span>Belém, Pará · Projetos locais e remotos</span></div></footer>;
}
