"use client";
import { useState } from "react";
import { ArrowUpRight, Code2, Mail, MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, mailtoUrl, whatsappUrl } from "@/lib/contact";

function buildMessage(data: FormData) {
  const get = (key: string) => String(data.get(key) ?? "").trim();
  const lines = [
    "Olá! Vim pelo site da Gorod Studio.",
    `Nome: ${get("name")}`,
    get("company") ? `Empresa: ${get("company")}` : null,
    `Contato: ${get("contact")}`,
    get("stage") ? `Momento: ${get("stage")}` : null,
    "",
    get("message"),
  ];
  return lines.filter((line): line is string => line !== null).join("\n");
}

export default function ContactPage() {
  const [message, setMessage] = useState<string | null>(null);

  return <main id="conteudo"><section className="contact-page shell">
    <div className="contact-copy">
      <span className="eyebrow">Contato</span>
      <h1>O que precisa funcionar melhor?</h1>
      <p>Não precisa chegar com o escopo pronto. Conte o contexto, o gargalo e o que você gostaria que mudasse.</p>
      <div className="contact-direct">
        <a href={whatsappUrl("Olá! Vim pelo site da Gorod Studio e quero conversar sobre um projeto.")} target="_blank" rel="noreferrer"><MessageCircle size={18} /><div><b>WhatsApp</b><span>{WHATSAPP_DISPLAY}</span></div><ArrowUpRight size={16} /></a>
        <a href={mailtoUrl("Contato pelo site — Gorod Studio", "")}><Mail size={18} /><div><b>E-mail</b><span>{CONTACT_EMAIL}</span></div><ArrowUpRight size={16} /></a>
      </div>
      <a href="https://github.com/Gor0d" target="_blank" rel="noreferrer" className="contact-external"><Code2 /> Ver trabalho técnico no GitHub <ArrowUpRight /></a>
    </div>
    <form className="contact-form" onSubmit={(event) => { event.preventDefault(); const text = buildMessage(new FormData(event.currentTarget)); setMessage(text); window.open(whatsappUrl(text), "_blank", "noopener,noreferrer"); }}>
      <label>Nome<input required name="name" placeholder="Como podemos chamar você?" /></label>
      <label>Empresa<input name="company" placeholder="Empresa ou projeto" /></label>
      <label>Contato<input required name="contact" placeholder="E-mail ou WhatsApp" /></label>
      <label>O que precisa funcionar melhor?<textarea required name="message" rows={6} placeholder="Conte um pouco sobre o processo, a ideia ou o problema..." /></label>
      <label>Momento<select name="stage" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Quero um site ou landing page</option><option>Tenho uma ideia</option><option>Quero validar um MVP</option><option>Preciso melhorar um processo</option><option>Já tenho um sistema</option></select></label>
      <button className="button" type="submit">Enviar pelo WhatsApp <ArrowUpRight size={17} /></button>
      {message && <p className="form-status" role="status">Abrimos o WhatsApp com a sua mensagem pronta. Prefere e-mail? <a href={mailtoUrl("Contato pelo site — Gorod Studio", message)}>Enviar por e-mail</a>.</p>}
    </form>
  </section></main>;
}
