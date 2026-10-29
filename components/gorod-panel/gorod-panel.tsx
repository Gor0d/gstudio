import { ArrowUpRight, Command, Layers3, Plus, Sparkles } from "lucide-react";
import { chartData, panelCounts, panelReply, panelRows, type PanelMode, type PanelPhase } from "./panel-data";

function ProductInterface({ mode, evolving = false }: { mode: PanelMode; evolving?: boolean }) {
  const path = chartData.map((item, index) => `${index ? "L" : "M"}${24 + index * 94},${132 - item.count * 12}`).join(" ");
  return <div className="gp-product" data-mode={mode}>
    <aside className="gp-sidebar"><span className="gp-icon-logo">G</span><Layers3 size={17} /><span className="gp-side-line" /><span className="gp-side-line" /><span className="gp-side-line" /><span className="gp-sidebar-end">↗</span></aside>
    <div className="gp-workspace"><header className="gp-workspace-head"><div><span>GOROD / WORKSPACE</span><strong>{mode === "web" ? "Sua próxima presença digital." : mode === "ai" ? "Inteligência com contexto." : mode === "intelligence" ? "Os dados, em perspectiva." : "Tudo em um mesmo fluxo."}</strong></div><span className="gp-avatar">G</span></header>
      <div className="gp-modules">
        <div className="gp-module gp-summary"><span className="gp-module-label">PANORAMA DO ESTÚDIO</span><div className="gp-numbers">{panelCounts.map((count, index) => <div key={index}><b data-panel-number={count}>{count}</b><small>{["projetos", "especialidades", "etapas"][index]}</small></div>)}</div></div>
        <div className="gp-module gp-table"><div className="gp-module-title"><span>Projetos em foco</span><Plus size={13} /></div><div className="gp-table-head"><span>Projeto</span><span>Capacidade</span><span>Estágio</span></div>{panelRows.map(row => <div className="gp-table-row" key={row.name}><strong>{row.name}</strong><span>{row.kind}</span><span><i />{row.stage}</span></div>)}</div>
        <div className="gp-module gp-chart"><div className="gp-module-title"><span>Capacidades no portfólio</span><ArrowUpRight size={13} /></div><svg viewBox="0 0 330 155" preserveAspectRatio="none" aria-hidden="true"><path className="gp-chart-grid" d="M20 35H310 M20 80H310 M20 130H310" /><path className="gp-chart-path" d={path} pathLength="1" />{chartData.map((item,index) => <circle key={item.label} cx={24 + index*94} cy={132-item.count*12} r="3" />)}</svg><div className="gp-chart-labels">{chartData.map(item => <span key={item.label}>{item.label} <b>{item.count}</b></span>)}</div></div>
        <div className="gp-module gp-chat"><div className="gp-module-title"><span><Sparkles size={13} />Assistente de contexto</span><i className="gp-live-dot" /></div><p className="gp-chat-question">Como essas especialidades se conectam?</p><div className="gp-chat-answer"><Sparkles size={13} /><p data-panel-reply>{panelReply}</p></div><span className="gp-demo-label">Resposta demonstrativa · sem chamada a uma IA</span></div>
        <div className="gp-module gp-landing"><span>DESIGN + ENGENHARIA</span><h4>Uma boa ideia merece<br />uma ótima experiência.</h4><p>Clareza no conteúdo. Intenção em cada interação.</p><span className="gp-landing-action">Conheça as possibilidades <ArrowUpRight size={13} /></span><div className="gp-landing-orbit" aria-hidden="true"><i /><i /><i /></div></div>
      </div>
      <footer className="gp-status"><span><i className={evolving ? "is-live" : ""} />{evolving ? "Pronto para evoluir" : "Construção em andamento"}</span><span>Dados do portfólio Gorod</span></footer>
    </div>
  </div>;
}

export function GorodPanel({ phase = "sketch", mode = "systems", className = "" }: { phase?: PanelPhase; mode?: PanelMode; className?: string }) {
  return <figure className={"gorod-panel " + className} data-phase={phase} data-mode={mode} aria-label={`Painel Gorod: ${phase === "sketch" ? "rascunho de estratégia" : phase === "wireframe" ? "wireframe de design" : phase === "build" ? "interface em desenvolvimento" : "produto em evolução"}`}>
    <div className="gp-chrome" aria-hidden="true"><span className="gp-chrome-dots"><i /><i /><i /></span><span><Command size={10} /> gorod.workspace</span><ArrowUpRight size={12} /></div>
    <div className="gp-canvas" aria-hidden="true">
      <div className="gp-layer gp-layer-sketch"><span className="gp-pencil-label">começar pelo que precisa funcionar</span><svg className="gp-sketch-lines" viewBox="0 0 600 360"><path className="gp-drawn" d="M36 83Q131 65 220 86L216 274Q125 287 39 268Z M264 83Q370 63 559 84L555 273Q388 289 266 272Z M225 180Q246 151 263 180 M252 168L264 180L251 191 M54 306Q271 329 544 302" /><path className="gp-drawn gp-loose-line" d="M64 141L189 145 M65 177L171 172 M65 204L185 205 M291 117L529 115 M295 150L511 149 M290 186L524 185 M293 219L475 224" /></svg><div className="gp-postit postit-one">Entender<br /><b>o fluxo.</b><span>antes da ferramenta</span></div><div className="gp-postit postit-two">Uma única<br /><b>fonte de verdade.</b></div><span className="gp-pencil-sign">ideia → processo → produto</span></div>
      <div className="gp-layer gp-layer-wireframe"><div className="gp-wire-side" /><div className="gp-wire-body"><div className="gp-wire-title" /><div className="gp-wire-stats"><i /><i /><i /></div><div className="gp-wire-content"><div><i /><i /><i /><i /></div><div className="gp-wire-chart"><i /><i /><i /><i /></div></div><span>estrutura antes do detalhe</span></div></div>
      <div className="gp-layer gp-layer-build"><ProductInterface mode={mode} /></div>
      <div className="gp-layer gp-layer-evolve"><ProductInterface mode={mode} evolving /></div>
    </div>
    <figcaption>Interface conceitual. Indicadores derivados do portfólio público.</figcaption>
  </figure>;
}
