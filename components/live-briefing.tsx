"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, CheckCheck } from "lucide-react";
import { budgetOptions, deadlineOptions } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";

const needs = ["Sites & Web", "Sistemas", "Dados & BI", "IA & Automação"];

export function LiveBriefing() {
  const [selected, setSelected] = useState<string[]>(["Sistemas"]);
  const [deadline, setDeadline] = useState("Sem urgência");
  const [budget, setBudget] = useState("Prefiro conversar");
  const [context, setContext] = useState("");
  const message = ["Olá! Quero conversar com a Gorod Studio.", "", "Preciso de: " + (selected.length ? selected.join(", ") : "ajuda para definir a solução") + ".", "Prazo: " + deadline + ".", "Investimento previsto: " + budget + ".", context.trim() ? "\nMeu desafio: " + context.trim() : "\nQuero entender qual é o próximo passo para a minha operação."].join("\n");
  return <section id="briefing" className="live-briefing shell" aria-labelledby="briefing-title"><div className="briefing-title"><span className="mono">O SEU PRÓXIMO PASSO</span><h2 id="briefing-title">A próxima boa ideia<br />pode começar aqui.</h2></div><div className="briefing-layout"><div className="briefing-controls"><fieldset><legend>O que precisa funcionar melhor?</legend><div className="briefing-chips">{needs.map(need => <button key={need} type="button" aria-pressed={selected.includes(need)} onClick={() => setSelected(values => values.includes(need) ? values.filter(value => value !== need) : [...values,need])}>{need}<span aria-hidden="true">{selected.includes(need) ? "−" : "+"}</span></button>)}</div></fieldset><div className="briefing-selects"><label>Prazo desejado<select value={deadline} onChange={event => setDeadline(event.target.value)}>{deadlineOptions.map(item => <option key={item}>{item}</option>)}</select></label><label>Faixa de investimento<select value={budget} onChange={event => setBudget(event.target.value)}>{budgetOptions.map(item => <option key={item}>{item}</option>)}</select></label></div><label htmlFor="briefing-context">Em uma frase, qual é o desafio?</label><textarea id="briefing-context" rows={3} maxLength={240} value={context} onChange={event => setContext(event.target.value)} placeholder="Hoje perdemos tempo porque…" /><span className="briefing-context-count mono">{context.length}/240</span><Link href="/contato" className="concept-text-link">Prefere detalhar o projeto? <ArrowUpRight size={15} /></Link></div><div className="briefing-message"><div className="briefing-message-header"><MessageCircle size={20} /><div><strong>Gorod Studio</strong><span>Uma conversa de cada vez.</span></div></div><div className="whatsapp-message"><output aria-live="off" aria-label="Prévia da mensagem de WhatsApp">{message}</output><span className="whatsapp-message-receipt"><span className="mono">PRONTA PARA REVISAR</span><CheckCheck size={15} /></span></div><a className="button" href={whatsappUrl(message)} target="_blank" rel="noreferrer" aria-describedby="briefing-send-help">Enviar no WhatsApp <ArrowUpRight size={19} /></a><p id="briefing-send-help">Abre o WhatsApp com a mensagem pronta. Você revisa e confirma o envio por lá.</p></div></div></section>;
}
