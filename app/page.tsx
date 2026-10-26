import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, ChartNoAxesCombined, Check, MessageCircle, PanelsTopLeft, Workflow } from "lucide-react";
import { FaqList } from "@/components/faq";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/projects";
import { SITE_URL, centralMessage, differentials, divisions, formatBRL, homeFaq, pricing, problems, processSteps, tagline } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = { alternates: { canonical: SITE_URL } };

const icons = { web: PanelsTopLeft, systems: Workflow, intelligence: ChartNoAxesCombined, ai: Bot };
const featured = ["economia", "honormed", "ponto-digital-pro", "fisiohub"].flatMap((slug) => projects.find((p) => p.slug === slug) ?? []);
const waHome = whatsappUrl("Olá! Vim pelo site da Gorod Studio e quero conversar sobre um projeto.");

export default function Home() {
  return <main id="conteudo">
    <section className="hero shell">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Web · Sistemas · Dados · IA</span>
          <h1>Tecnologia que transforma processos em <em>resultados.</em></h1>
          <p>{centralMessage}</p>
          <div className="button-row">
            <Link href="/contato" className="button">Solicitar orçamento <ArrowUpRight size={17} /></Link>
            <Link href="/servicos" className="button button-ghost">Conhecer soluções</Link>
            <Link href="/projetos" className="button button-ghost">Ver projetos</Link>
          </div>
          <a className="text-link hero-wa" href={waHome} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Conversar pelo WhatsApp</a>
        </div>
        <div className="hero-stage" aria-hidden="true">
          <div className="hero-orbit orbit-one"><i className="orbit-dot" /></div><div className="hero-orbit orbit-two"><i className="orbit-dot" /></div>
          <div className="hero-window"><div className="window-head"><span><i /><i /><i /></span><small>GOROD / DIVISÕES</small></div><div className="window-body"><div className="window-kicker">{tagline.toUpperCase()}</div><div className="window-grid">{divisions.map((d, i) => <div key={d.slug} style={{ "--i": i } as React.CSSProperties}><small>0{i + 1}</small><strong>{d.name.replace("Gorod ", "")}</strong></div>)}</div><div className="window-track"><i /></div></div></div>
        </div>
      </div>
    </section>

    <section className="services-preview shell"><SectionHeading eyebrow="Soluções" title="Quatro divisões, um mesmo método." text="Do site simples ao sistema que conecta a operação: a solução certa é a que o seu negócio precisa agora." />
      <div className="service-list">{divisions.map((d, i) => { const Icon = icons[d.slug]; return <Link key={d.slug} href={`/servicos/${d.slug}`}><span><Icon /></span><small>0{i + 1}</small><h3>{d.name}</h3><p>{d.short}</p><ArrowUpRight /></Link>; })}</div>
    </section>

    <section className="recognition section-dark"><div className="shell">
      <SectionHeading eyebrow="Problemas que resolvemos" title="Tecnologia faz sentido quando resolve o gargalo certo." text="Começamos pelo que precisa funcionar melhor. A tecnologia vem depois." />
      <div className="recognition-grid">{problems.map(([title, text, slug], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p><Link className="text-link" href={`/servicos/${slug}`}>Ver solução <ArrowRight size={14} /></Link></article>)}</div>
    </div></section>

    <section className="featured-projects"><div className="shell"><div className="section-title-row"><SectionHeading eyebrow="Projetos selecionados" title="Demonstrações com o estágio real de cada uma." text="Produtos, pilotos e estudos próprios. Nenhum é apresentado como mais maduro do que é." /><Link href="/projetos" className="text-link">Ver todos os projetos <ArrowUpRight size={16} /></Link></div>
      <div className="featured-stack">
        <div className="featured-pair">{featured.slice(0, 2).map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
        <div className="featured-pair">{featured.slice(2, 4).map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
      </div>
    </div></section>

    <section className="process section-warm" id="processo"><div className="shell"><SectionHeading eyebrow="Como trabalhamos" title="Clareza antes da complexidade." text="Cada etapa reduz incerteza e gera uma entrega que pode ser verificada." />
      <div className="process-grid">{processSteps.map(([t, d], i) => <article key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </div></section>

    <section className="differentials shell"><SectionHeading eyebrow="Diferenciais" title="O que você pode esperar de nós." />
      <ul className="diff-grid">{differentials.map(([t, d]) => <li key={t}><Check size={18} aria-hidden="true" /><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul>
      <p className="price-note"><b>Ofertas indicativas:</b> {pricing.landing.label} a partir de {formatBRL(pricing.landing.from)} · {pricing.institutional.label} a partir de {formatBRL(pricing.institutional.from)}. Sistemas, BI e IA: diagnóstico e orçamento. {pricing.note}</p>
    </section>

    <section className="faq shell"><SectionHeading eyebrow="Perguntas frequentes" title="Antes de conversar." /><FaqList items={homeFaq} /></section>

    <section className="final-cta shell"><span className="eyebrow">O próximo passo</span><h2>Tem um processo que precisa funcionar melhor?</h2><p>Conte onde está o gargalo. A primeira conversa serve para entender se software é o próximo passo certo.</p><div className="button-row cta-center"><Link href="/contato" className="button">Solicitar orçamento <ArrowUpRight size={18} /></Link><a className="button button-ghost" href={waHome} target="_blank" rel="noreferrer">Conversar pelo WhatsApp</a></div></section>
  </main>;
}
