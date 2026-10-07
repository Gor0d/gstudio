import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Bot, ChartNoAxesCombined, PanelsTopLeft, Workflow } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ProjectVisual } from "@/components/project-visual";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/projects";

const featured = projects.filter((project) => project.featured);

export default function Home() {
  return <main id="conteudo">
    <section className="hero shell">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Estratégia · Design · Engenharia</span>
          <h1>Do site ao sistema que faz sua operação <em>avançar.</em></h1>
          <p>Transformamos processos manuais, dados dispersos e oportunidades digitais em software sob medida para vender, operar e decidir melhor.</p>
          <div className="button-row"><Link href="/contato" className="button">Conversar sobre um projeto <ArrowUpRight size={17} /></Link><Link href="/projetos" className="button button-ghost">Ver projetos <ArrowDown size={17} /></Link></div>
        </div>
        <div className="hero-stage">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-window"><div className="window-head"><span><i /><i /><i /></span><small>GOROD / OPERAÇÃO</small></div><div className="window-body"><div className="window-kicker">VISÃO DO NEGÓCIO</div><div className="window-title"><b>12 fluxos</b><span>conectados em uma única operação</span></div><div className="window-grid"><div><small>Conversão</small><strong>Presença</strong></div><div><small>Rotina</small><strong>Sistemas</strong></div><div><small>Clareza</small><strong>Dados</strong></div><div><small>Escala</small><strong>Automação</strong></div></div></div></div>
          <div className="floating-note note-one"><span>01</span><b>Problema mapeado</b></div><div className="floating-note note-two"><span>04</span><b>Solução em evolução</b></div>
        </div>
      </div>
      <div className="hero-proof"><span>Web</span><i /><span>Sistemas</span><i /><span>Dados</span><i /><span>Automação</span><i /><span>IA</span></div>
    </section>

    <section className="recognition section-dark"><div className="shell">
      <SectionHeading eyebrow="O ponto de partida" title="Tecnologia faz sentido quando resolve o gargalo certo." text="Começamos pelo que precisa funcionar melhor. A tecnologia vem depois." />
      <div className="recognition-grid">{[
        ["01", "Vender", "Sua empresa depende do Instagram ou WhatsApp para transformar interesse em pedido."],
        ["02", "Operar", "A equipe copia informações entre planilhas, mensagens e sistemas isolados."],
        ["03", "Decidir", "Os indicadores chegam tarde, incompletos ou exigem consolidação manual."],
        ["04", "Escalar", "Tarefas repetitivas consomem quem deveria estar atendendo, analisando ou decidindo."],
      ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section className="evolution shell"><SectionHeading eyebrow="Uma base que cresce" title="Comece no ponto de maior retorno. Evolua sem recomeçar." text="Nem todo negócio precisa de um sistema completo no primeiro dia. O importante é construir o próximo passo sobre uma base coerente." />
      <div className="evolution-track">{["Presença", "Conversão", "Operação", "Dados", "Automação", "IA"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b>{index < 5 && <ArrowRight aria-hidden="true" />}</div>)}</div>
    </section>

    <section className="featured-projects"><div className="shell"><div className="section-title-row"><SectionHeading eyebrow="Projetos selecionados" title="Soluções construídas em torno do trabalho real." /><Link href="/projetos" className="text-link">Ver todos os projetos <ArrowUpRight size={16} /></Link></div>
      <div className="featured-stack">
        <article className="feature-lead"><div className="feature-lead-copy"><span className="eyebrow">{featured[0].eyebrow}</span><h3>{featured[0].title}</h3><p>{featured[0].summary}</p><div className="tag-row">{featured[0].capabilities.map(tag => <span key={tag}>{tag}</span>)}</div><Link href={`/projetos/${featured[0].slug}`} className="button button-light">Conhecer o case <ArrowUpRight size={16} /></Link></div><ProjectVisual project={featured[0]} priority /></article>
        <div className="featured-pair">{featured.slice(1,3).map(project => <ProjectCard key={project.slug} project={project} />)}</div>
        <div className="featured-pair">{featured.slice(3,5).map(project => <ProjectCard key={project.slug} project={project} />)}</div>
      </div>
    </div></section>

    <section className="services-preview shell"><SectionHeading eyebrow="Capacidades" title="Uma operação, quatro frentes de evolução." text="A solução certa pode ser uma página simples, um produto completo ou a integração entre o que sua empresa já usa." />
      <div className="service-list">
        <Link href="/servicos#presenca"><span><PanelsTopLeft /></span><small>01</small><h3>Presença & Conversão</h3><p>Sites, landing pages, cardápios, e-commerce e portais.</p><ArrowUpRight /></Link>
        <Link href="/servicos#sistemas"><span><Workflow /></span><small>02</small><h3>Operação & Sistemas</h3><p>Sistemas web, SaaS, CRM, PDV e ferramentas internas.</p><ArrowUpRight /></Link>
        <Link href="/servicos#dados"><span><ChartNoAxesCombined /></span><small>03</small><h3>Dados & Decisão</h3><p>Dashboards, BI, ETL, integração e indicadores.</p><ArrowUpRight /></Link>
        <Link href="/servicos#automacao"><span><Bot /></span><small>04</small><h3>Automação & IA</h3><p>APIs, agentes, LLMs e automação de processos.</p><ArrowUpRight /></Link>
      </div>
    </section>

    <section className="process section-warm" id="processo"><div className="shell"><SectionHeading eyebrow="Como trabalhamos" title="Clareza antes da complexidade." text="Cada etapa reduz incerteza e transforma decisões em uma entrega que pode ser verificada." />
      <div className="process-grid">{[
        ["01", "Descoberta", "Entendemos processo, usuário, restrições e objetivo."],
        ["02", "Planejamento", "Definimos recorte, prioridade, riscos e critérios de sucesso."],
        ["03", "Design", "Desenhamos o fluxo e a interface antes de escalar a construção."],
        ["04", "Desenvolvimento", "Entregamos em incrementos claros, testáveis e observáveis."],
        ["05", "Entrega", "Publicamos, documentamos e preparamos a operação."],
        ["06", "Evolução", "Medimos o uso e priorizamos o próximo ganho."],
      ].map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </div></section>

    <section className="final-cta shell"><span className="eyebrow">O próximo passo</span><h2>Tem uma ideia ou um processo que precisa funcionar melhor?</h2><p>Conte onde está o gargalo. A primeira conversa serve para entender se software é o próximo passo certo.</p><Link href="/contato" className="button">Conversar sobre o projeto <ArrowUpRight size={18} /></Link></section>
  </main>;
}
