import { memo } from "react";
import { agentAnswer, agentQuestion, clientQuote, codeAfter, codeBefore, codeIndent, codePieces, deployToast, kpis, tokenize, weekBars, weekDays } from "./signature-data";

function Code({ line }: { line: string }) {
  return <>{tokenize(line).map((token, index) => <span key={index} className={"tk-" + token.kind}>{token.text}</span>)}</>;
}

function Skeleton({ bars = 3 }: { bars?: number }) {
  return <span className="sp-skel">{Array.from({ length: bars }, (_, index) => <i key={index} />)}</span>;
}

const pointer = <svg viewBox="0 0 16 18" aria-hidden="true"><path d="M1 1l13 7.2-5.9 1.3L5.3 16z" /></svg>;

/**
 * Markup is server-rendered in its final state (evolution, 1440 px). The scene renderer then
 * drives every stage imperatively; memo keeps React from touching the nodes it owns.
 */
export const ScenePanel = memo(function ScenePanel() {
  return <figure className="sp" aria-label="Painel demonstrativo: um sistema de pedidos que nasce de uma conversa com o cliente e chega ao uso em qualquer tela.">
    <div className="sp-dock">
      <div className="sp-frame">
        <div className="sp-chrome" aria-hidden="true"><span className="sp-dots"><i /><i /><i /></span><span className="sp-url">gorod.app/pedidos</span><span className="sp-width" data-sp="width">1440 px</span></div>
        <div className="sp-screen" aria-hidden="true">
          <div className="sp-app">
            <div className="sp-layout">
              <div className="sp-piece sp-nav is-built"><Skeleton bars={5} /><div className="sp-real"><span className="sp-logo"><b>G</b>Pedidos</span><ul className="sp-nav-items">{["Pedidos", "Estoque", "Clientes", "Automações"].map((item, index) => <li key={item} className={index ? undefined : "is-active"}><i /><span>{item}</span></li>)}</ul><span className="sp-nav-user">Mercado Sol</span></div></div>
              <div className="sp-main">
                <div className="sp-piece sp-header is-built"><Skeleton bars={2} /><div className="sp-real"><div><small>QUARTA · 27 OUT</small><strong>Pedidos de hoje</strong></div><span className="sp-badge" data-sp="version">v1.3</span></div></div>
                <div className="sp-kpis">{kpis.map(kpi => <div className="sp-piece sp-kpi is-built" key={kpi.label}><Skeleton bars={2} /><div className="sp-real"><small>{kpi.label}</small><b data-sp="kpi" data-value={kpi.value} data-suffix={kpi.suffix}>{kpi.value}{kpi.suffix}</b></div></div>)}</div>
                <div className="sp-lower">
                  <div className="sp-piece sp-chart is-built"><Skeleton bars={4} /><div className="sp-real"><div className="sp-chart-head"><span>Pedidos na semana</span><small>+18%</small></div><div className="sp-bars">{weekBars.map((height, index) => <i key={index} style={{ "--h": height / 100 } as React.CSSProperties} />)}</div><div className="sp-days">{weekDays.map((day, index) => <span key={index}>{day}</span>)}</div></div></div>
                  <div className="sp-piece sp-agent is-built"><Skeleton bars={4} /><div className="sp-real"><span className="sp-agent-head"><i />Agente IA · WhatsApp</span><p className="sp-bubble-user">{agentQuestion}</p><p className="sp-bubble-ai"><span data-sp="answer">{agentAnswer}</span></p></div></div>
                </div>
              </div>
            </div>
            <div className="sp-brief">
              <div className="sp-card">
                <span className="sp-card-label">ENTREVISTA · CLIENTE</span>
                <blockquote>“{clientQuote.before}<mark>{clientQuote.pain}</mark>{clientQuote.after}”</blockquote>
                <span className="sp-card-cite">Dona de distribuidora, conversa de descoberta</span>
                <svg className="sp-doodles" viewBox="-60 -70 840 440" preserveAspectRatio="none">
                  <path className="sp-doodle is-ink" pathLength={1} d="M60 262 q22 -12 44 0 t44 0 t44 0 t44 0 t44 0 t44 0" />
                  <path className="sp-doodle" pathLength={1} d="M770 -50 C735 -20 712 6 692 42 M676 26 L692 42 L706 22" />
                  <path className="sp-doodle" pathLength={1} d="M-30 150 C-52 112 -12 76 18 98 C40 116 22 156 -6 160" />
                  <path className="sp-doodle" pathLength={1} d="M700 300 l14 30 l12 -48 M748 290 l26 -8" />
                </svg>
                <span className="sp-note sp-note-one">2 h × 22 dias = 44 h/mês</span>
                <span className="sp-note sp-note-two">conferência manual = erro</span>
                <span className="sp-postit">Automatizar a conferência →</span>
              </div>
            </div>
          </div>
          <div className="sp-overlays">
            <span className="sp-ruler sp-ruler-x" /><span className="sp-ruler sp-ruler-y" /><span className="sp-ruler-corner" />
            <span className="sp-band sp-band-x" /><span className="sp-band sp-band-y" />
            <span className="sp-select"><i /><i /><i /><i /><span data-sp="select">1180 × 92</span></span>
            <span className="sp-gap"><span data-sp="gap">24 px</span></span>
            <span className="sp-cursor sp-cursor-ia">{pointer}<span>Gorod IA</span></span>
            <span className="sp-cursor sp-cursor-ana">{pointer}<span>Ana · design</span></span>
          </div>
          <div className="sp-code">
            <span className="sp-code-tab">Pedidos.tsx</span>
            <div className="sp-code-body">
              {codeBefore.map(line => <span className="sp-line" data-static key={line}><Code line={line} /></span>)}
              {codePieces.map(line => <span className="sp-line" data-sp="line" key={line}>{codeIndent}<span className="sp-line-code"><Code line={line} /></span></span>)}
              {codeAfter.map(line => <span className="sp-line" data-static key={line}><Code line={line} /></span>)}
            </div>
            <div className="sp-term"><p data-sp="term">$ npm run dev</p><p className="sp-term-ok" data-sp="term">✓ compilado em 1,8 s · deploy v1.0 no ar</p></div>
          </div>
          <div className="sp-toast"><i />{deployToast}</div>
        </div>
      </div>
    </div>
    <figcaption>Interface demonstrativa · dados fictícios.</figcaption>
  </figure>;
});
