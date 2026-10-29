"use client";
import { useMotionPreferences } from "./motion-provider";
import { Pause, Play, ArrowUpRight } from "lucide-react";
export function StudioMotion() {
  const { paused, toggle } = useMotionPreferences();
  return <button className="motion-toggle" onClick={toggle} aria-pressed={paused} aria-label={paused ? "Retomar animações da página" : "Pausar animações da página"} title={paused ? "Retomar animações da página" : "Pausar animações da página"}>{paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? "Retomar animações" : "Pausar animações"}</span></button>;
}
export function Marquee({ items, reverse = false, compact = false }: { items: string[]; reverse?: boolean; compact?: boolean }) {
  return <div className={`studio-marquee ${reverse ? "reverse" : ""} ${compact ? "compact" : ""}`}><ul className="sr-only">{items.map(item => <li key={item}>{item}</li>)}</ul><div className="studio-marquee-track" aria-hidden="true">{[0, 1].map(copy => <div className="studio-marquee-group" key={copy}>{items.map((item, index) => <span key={item}><i>{compact ? "·" : `0${index + 1}`}</i>{item}</span>)}</div>)}</div></div>;
}
export function OrbitDisplay() {
  return <div className="studio-orbit" aria-label="Web, sistemas, dados e inteligência artificial conectados"><div className="orbit-grid" /><div className="studio-ring ring-a" /><div className="studio-ring ring-b" /><div className="studio-ring ring-c" /><div className="studio-orbit-core"><span>GOROD</span><b>G<span>↗</span></b><small>CONNECT. CREATE. EVOLVE.</small></div><div className="orbit-label label-web"><i /> Web & Experience <ArrowUpRight size={14} /></div><div className="orbit-label label-data"><i /> Data & Intelligence</div><div className="orbit-label label-ai"><i /> AI & Automation <ArrowUpRight size={14} /></div><div className="orbit-caption"><span>UM ECOSSISTEMA DE POSSIBILIDADES</span><span>4 DIVISÕES / 1 VISÃO</span></div></div>;
}
