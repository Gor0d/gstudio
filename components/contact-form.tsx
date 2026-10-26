"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { budgetOptions, deadlineOptions, serviceOptions } from "@/content/site";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";

type Errors = Partial<Record<"name" | "contact" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validContact(value: string) {
  return EMAIL_RE.test(value) || value.replace(/\D/g, "").length >= 10;
}

function validate(data: FormData): Errors {
  const get = (key: string) => String(data.get(key) ?? "").trim();
  const errors: Errors = {};
  if (get("name").length < 2) errors.name = "Informe seu nome.";
  if (!validContact(get("contact"))) errors.contact = "Informe um e-mail válido ou um telefone com DDD.";
  if (get("message").length < 10) errors.message = "Descreva a necessidade em pelo menos 10 caracteres.";
  return errors;
}

function buildMessage(data: FormData) {
  const get = (key: string) => String(data.get(key) ?? "").trim();
  const service = serviceOptions.find(([value]) => value === get("service"))?.[1];
  const lines = [
    "Olá! Vim pelo site da Gorod Studio.",
    service && get("service") ? `Serviço: ${service}` : null,
    `Nome: ${get("name")}`,
    get("company") ? `Empresa: ${get("company")}` : null,
    `Contato: ${get("contact")}`,
    get("budget") ? `Investimento previsto: ${get("budget")}` : null,
    get("deadline") ? `Prazo desejado: ${get("deadline")}` : null,
    "",
    get("message"),
  ];
  return lines.filter((line): line is string => line !== null).join("\n");
}

export function ContactForm() {
  const params = useSearchParams();
  const requested = params.get("servico") ?? "";
  const initialService = serviceOptions.some(([value]) => value === requested) ? requested : "";
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setMessage(null);
      const first = (["name", "contact", "message"] as const).find((key) => found[key]);
      if (first) event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const text = buildMessage(data);
    setMessage(text);
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  }

  const field = (key: keyof Errors) => ({ "aria-invalid": errors[key] ? true : undefined, "aria-describedby": errors[key] ? `${key}-error` : undefined });
  const error = (key: keyof Errors) => errors[key] ? <span className="field-error" id={`${key}-error`} role="alert">{errors[key]}</span> : null;

  return <form className="contact-form" onSubmit={onSubmit} noValidate>
    <label>Tipo de serviço<select name="service" defaultValue={initialService}>{serviceOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    <label>Nome *<input name="name" autoComplete="name" placeholder="Como podemos chamar você?" {...field("name")} />{error("name")}</label>
    <label>Empresa<input name="company" autoComplete="organization" placeholder="Empresa ou projeto" /></label>
    <label>E-mail ou telefone *<input name="contact" autoComplete="email" placeholder="voce@empresa.com ou (91) 90000-0000" {...field("contact")} />{error("contact")}</label>
    <label>Necessidade *<textarea name="message" rows={6} placeholder="Conte um pouco sobre o processo, a ideia ou o problema..." {...field("message")} />{error("message")}</label>
    <div className="form-pair">
      <label>Faixa de investimento (opcional)<select name="budget" defaultValue=""><option value="">Não informar</option>{budgetOptions.map((o) => <option key={o}>{o}</option>)}</select></label>
      <label>Prazo desejado (opcional)<select name="deadline" defaultValue=""><option value="">Não informar</option>{deadlineOptions.map((o) => <option key={o}>{o}</option>)}</select></label>
    </div>
    <button className="button" type="submit">Enviar pelo WhatsApp <ArrowUpRight size={17} /></button>
    <p className="form-hint">Ao enviar, abrimos o WhatsApp com a mensagem pronta. Nenhum dado é armazenado neste site.</p>
    {message && <p className="form-status" role="status">Abrimos o WhatsApp com a sua mensagem pronta; confirme o envio por lá. Prefere e-mail? <a href={mailtoUrl("Contato pelo site — Gorod Studio", message)}>Enviar por e-mail</a>.</p>}
  </form>;
}
