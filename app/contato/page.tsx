import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Code2, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SITE_URL } from "@/content/site";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, mailtoUrl, whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Solicitar orçamento",
  description: "Conte o que precisa funcionar melhor e receba os próximos passos da Gorod Studio.",
  alternates: { canonical: `${SITE_URL}/contato` },
};

export default function ContactPage() {
  return <main id="conteudo"><section className="contact-page shell">
    <div className="contact-copy">
      <span className="eyebrow">Orçamento e diagnóstico</span>
      <h1>O que precisa funcionar melhor?</h1>
      <p>Não precisa chegar com o escopo pronto. Conte o contexto, o gargalo e o que você gostaria que mudasse.</p>
      <div className="contact-direct">
        <a href={whatsappUrl("Olá! Vim pelo site da Gorod Studio e quero conversar sobre um projeto.")} target="_blank" rel="noreferrer"><MessageCircle size={18} /><div><b>WhatsApp</b><span>{WHATSAPP_DISPLAY}</span></div><ArrowUpRight size={16} /></a>
        <a href={mailtoUrl("Contato pelo site — Gorod Studio", "")}><Mail size={18} /><div><b>E-mail</b><span>{CONTACT_EMAIL}</span></div><ArrowUpRight size={16} /></a>
      </div>
      <a href="https://github.com/Gor0d" target="_blank" rel="noreferrer" className="contact-external"><Code2 /> Ver trabalho técnico no GitHub <ArrowUpRight /></a>
    </div>
    <Suspense fallback={<div className="contact-form" aria-busy="true">Carregando formulário…</div>}><ContactForm /></Suspense>
  </section></main>;
}
