"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { budgetOptions, deadlineOptions, serviceOptions } from "@/content/site";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";

type Key = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<Key, string>>;
const keys: Key[] = ["name", "email", "phone", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const get = (data: FormData, key: string) => String(data.get(key) ?? "").trim();
function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (get(data, "name").length < 2) errors.name = "Informe seu nome, com pelo menos 2 caracteres.";
  const email = get(data, "email"), phone = get(data, "phone");
  if (!email && !phone) { errors.email = "Informe pelo menos um contato: e-mail ou telefone."; errors.phone = "Você pode preencher o e-mail ou informar seu telefone com DDD."; }
  if (email && !EMAIL_RE.test(email)) errors.email = "Informe um e-mail válido, como voce@empresa.com.";
  if (phone && (phone.replace(/\D/g, "").length < 10 || phone.replace(/\D/g, "").length > 15)) errors.phone = "Informe um telefone válido com DDD (10 a 15 dígitos).";
  if (get(data, "message").length < 10) errors.message = "Descreva a necessidade em pelo menos 10 caracteres.";
  return errors;
}
function buildMessage(data: FormData) {
  const service = serviceOptions.find(([value]) => value === get(data, "service"))?.[1];
  return ["Olá! Vim pelo site da Gorod Studio.", service && get(data, "service") ? "Serviço: " + service : null,
    "Nome: " + get(data, "name"), get(data, "company") ? "Empresa: " + get(data, "company") : null,
    get(data, "email") ? "E-mail: " + get(data, "email") : null, get(data, "phone") ? "Telefone: " + get(data, "phone") : null,
    get(data, "budget") ? "Investimento previsto: " + get(data, "budget") : null, get(data, "deadline") ? "Prazo desejado: " + get(data, "deadline") : null,
    "", get(data, "message")].filter(line => line !== null).join("\n");
}
export function ContactForm() {
  const params = useSearchParams();
  const requested = params.get("servico") ?? "";
  const initialService = serviceOptions.some(([value]) => value === requested) ? requested : "";
  const [errors, setErrors] = useState<Errors>({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  function validateField(event: React.FocusEvent<HTMLFormElement>) {
    const element = event.target;
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) return;
    const key = element.name as Key;
    if (!keys.includes(key)) return;
    const found = validate(new FormData(event.currentTarget));
    setErrors(previous => {
      const next = { ...previous };
      for (const field of key === "email" || key === "phone" ? ["email", "phone"] as const : [key]) {
        if (found[field]) next[field] = found[field]; else delete next[field];
      }
      return next;
    });
  }
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget, data = new FormData(form), found = validate(data);
    setErrors(found);
    const first = keys.find(key => found[key]);
    if (first) { setStatus("Confira os campos indicados antes de continuar."); form.querySelector<HTMLElement>('[name="' + first + '"]')?.focus(); return; }
    const channel = ((event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value ?? "whatsapp";
    const text = buildMessage(data);
    if (channel === "email") {
      setStatus("Seu aplicativo de e-mail será aberto com a mensagem pronta. Revise e confirme o envio por lá.");
      window.location.href = mailtoUrl("Contato pelo site — Gorod Studio", text);
    } else {
      setStatus("O WhatsApp será aberto com a mensagem pronta. Revise e confirme o envio por lá.");
      window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    }
  }
  const field = (key: Key, hint?: string) => ({ id: key, "aria-labelledby": key + "-label", "aria-invalid": Boolean(errors[key]), "aria-describedby": [hint, errors[key] ? key + "-error" : null].filter(Boolean).join(" ") || undefined });
  const error = (key: Key) => errors[key] ? <span className="field-error" id={key + "-error"}>{errors[key]}</span> : null;
  return <form className="contact-form" onSubmit={onSubmit} onBlur={validateField} noValidate>
    <p className="form-intro">Campos com * são obrigatórios. Informe pelo menos um meio de contato.</p>
    <label>Tipo de serviço<select name="service" defaultValue={initialService}>{serviceOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    <label><span id="name-label">Nome *</span><input name="name" autoComplete="name" required aria-required="true" minLength={2} placeholder="Como podemos chamar você?" {...field("name")} />{error("name")}</label>
    <label>Empresa<input name="company" autoComplete="organization" placeholder="Empresa ou projeto" /></label>
    <fieldset className="contact-methods"><legend>Como podemos responder? *</legend><p id="contact-help" className="form-hint">Preencha e-mail ou telefone. Se preferir, informe os dois.</p><div className="form-pair">
      <label><span id="email-label">E-mail</span><input name="email" type="email" autoComplete="email" required={!phone.trim()} aria-required={!phone.trim()} value={email} onChange={event => setEmail(event.target.value)} placeholder="voce@empresa.com" {...field("email", "contact-help")} />{error("email")}</label>
      <label><span id="phone-label">Telefone</span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required={!email.trim()} aria-required={!email.trim()} value={phone} onChange={event => setPhone(event.target.value)} placeholder="(91) 90000-0000" {...field("phone", "contact-help")} />{error("phone")}</label>
    </div></fieldset>
    <label><span id="message-label">Necessidade *</span><textarea name="message" required aria-required="true" minLength={10} rows={6} placeholder="Conte um pouco sobre o processo, a ideia ou o problema..." {...field("message")} />{error("message")}</label>
    <div className="form-pair"><label>Faixa de investimento (opcional)<select name="budget" defaultValue=""><option value="">Não informar</option>{budgetOptions.map(option => <option key={option}>{option}</option>)}</select></label><label>Prazo desejado (opcional)<select name="deadline" defaultValue=""><option value="">Não informar</option>{deadlineOptions.map(option => <option key={option}>{option}</option>)}</select></label></div>
    <div className="form-actions"><button className="button" type="submit" name="channel" value="whatsapp">Enviar pelo WhatsApp <ArrowUpRight size={17} /></button><button className="button button-ghost" type="submit" name="channel" value="email">Enviar por e-mail <Mail size={17} /></button></div>
    <p className="form-hint">Abre o WhatsApp com sua mensagem pronta ou o seu aplicativo de e-mail. O envio é confirmado por você no aplicativo escolhido. Nenhum dado é armazenado neste site.</p>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
