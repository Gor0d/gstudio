import Link from "next/link";
import { COMPANY_CNPJ } from "@/lib/site";
import { Code2, ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";

export function SiteFooter() {
  return <footer className="site-footer concept-footer"><div className="footer-wordmark shell" aria-hidden="true">GOROD<span>STUDIO</span></div><div className="shell footer-grid">
    <div><Link href="/" className="brand brand-footer"><span className="brand-mark">G</span><span>Gorod <strong>Studio</strong></span></Link><p>Tecnologia que transforma processos em resultados.</p></div>
    <div className="footer-links"><span>Explorar</span><Link href="/servicos">Soluções</Link><Link href="/servicos/web">Gorod Web</Link><Link href="/servicos/systems">Gorod Systems</Link><Link href="/servicos/intelligence">Gorod Intelligence</Link><Link href="/servicos/ai">Gorod AI &amp; Automation</Link><Link href="/projetos">Projetos</Link><Link href="/sobre">Sobre</Link></div>
    <div className="footer-links"><span>Contato</span><Link href="/contato">Iniciar conversa <ArrowUpRight size={14} /></Link><a href={whatsappUrl("Olá! Vim pelo site da Gorod Studio.")} target="_blank" rel="noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href="https://github.com/Gor0d" target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub</a></div>
  </div><div className="shell footer-bottom"><span>© 2026 Gorod Studio{COMPANY_CNPJ ? ` · CNPJ ${COMPANY_CNPJ}` : ""}</span><span>Belém, Pará · Projetos locais e remotos</span></div></footer>;
}
