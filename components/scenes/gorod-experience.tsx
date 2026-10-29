"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { divisions } from "@/content/site";
import { Flip, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { HeroMarquee } from "@/components/hero-marquee";
import { StudioMotion } from "@/components/studio-motion";
import { useMotionPreferences } from "@/components/motion-provider";
import { GorodPanel } from "@/components/gorod-panel/gorod-panel";
import type { PanelMode } from "@/components/gorod-panel/panel-data";
import { SignatureScene } from "@/components/scenes/signature-scene";

const modeLabels: Record<PanelMode, string> = { web: "Sites & Web", systems: "Sistemas", intelligence: "Dados & BI", ai: "IA & Automação" };

export function GorodExperience() {
  const root = useRef<HTMLDivElement>(null);
  const modesDock = useRef<HTMLDivElement>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const pendingFlip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [mode, setMode] = useState<PanelMode>("systems");
  const { enabled } = useMotionPreferences();
  const router = useRouter();

  useGSAP(context => {
    if (!enabled || !root.current) return;
    const container = root.current;
    let disposed = false;
    const splits: SplitText[] = [];
    context.add("setup", () => {
      if (disposed) return;
      container.querySelectorAll<HTMLElement>(".concept-title-line").forEach((line, index) => {
        const split = SplitText.create(line, { type: "lines", mask: "lines", aria: "hidden", onSplit: self => gsap.from(self.lines, { yPercent: 105, duration: .55, delay: index * .06, ease: "power3.out" }) });
        splits.push(split);
      });
    });
    document.fonts.ready.then(() => { if (!disposed) context.setup(); });
    return () => { disposed = true; splits.forEach(split => split.revert()); };
  }, { scope: root, dependencies: [enabled], revertOnUpdate: true });

  useLayoutEffect(() => {
    if (enabled && pendingFlip.current) {
      const animation = Flip.from(pendingFlip.current, { duration: .55, ease: "power3.inOut", absolute: true, scale: true });
      pendingFlip.current = null;
      return () => { animation.revert(); };
    }
  }, [mode, enabled]);

  function chooseMode(next: PanelMode) {
    if (next === mode) return;
    if (enabled && modesDock.current) pendingFlip.current = Flip.getState(modesDock.current.querySelectorAll(".gp-layer-evolve .gp-module"));
    setMode(next);
  }

  return <div ref={root} className="gorod-experience" data-scene-owned>
    <section className="concept-hero" aria-labelledby="concept-title">
      <div className="shell concept-hero-grid"><div className="concept-hero-copy"><p className="mono concept-location">BELÉM, BRASIL · CONEXÕES SEM FRONTEIRAS</p><h1 id="concept-title" className="concept-title" aria-label="Sistemas, dados e IA para a operação funcionar."><span className="concept-title-line">Sistemas,</span>{" "}<span className="concept-title-line">dados e IA</span>{" "}<span className="concept-title-line">para a operação</span>{" "}<span className="concept-title-line concept-title-outline">funcionar.</span></h1><p className="concept-intro">Do primeiro rascunho ao produto em uso. Conectamos estratégia, design e engenharia ao trabalho que acontece de verdade.</p><div className="concept-hero-actions"><Link href="/#briefing" className="button">Conte o seu desafio <ArrowUpRight size={18} /></Link><Link href="/#processo" className="concept-text-link">Veja o processo <ArrowDown size={16} /></Link></div><div className="concept-hero-bottom"><span className="mono">O PRODUTO COMEÇA ANTES DO CÓDIGO.</span><StudioMotion /></div></div><div className="panel-dock hero-panel-dock"><div className="panel-traveller" data-device="desktop"><GorodPanel phase="sketch" mode="systems" /></div></div></div>
      <span className="hero-editorial-mark" aria-hidden="true">Da ideia.<br />Ao uso.</span>
    </section>

    <HeroMarquee />

    <SignatureScene />

    <section className="service-modes shell" aria-labelledby="modes-title"><div className="service-modes-heading"><p className="mono">UMA VISÃO, DIFERENTES POSSIBILIDADES</p><h2 id="modes-title">Mude o modo.<br />Amplie o alcance.</h2><p>Escolhemos a tecnologia a partir do desafio. E conectamos as peças para construir o que realmente precisa existir.</p></div><div className="service-modes-layout"><div className="service-mode-list" role="group" aria-label="Modos do Painel Gorod" aria-describedby="mode-keyboard-help">{divisions.map((division,index) => <article className={"service-mode-row" + (mode === division.slug ? " is-active" : "")} key={division.slug}><button ref={element => { controls.current[index] = element; }} aria-pressed={mode === division.slug} aria-controls="service-preview" onPointerEnter={event => { if (event.pointerType === "mouse") chooseMode(division.slug); }} onClick={() => chooseMode(division.slug)} onFocus={() => chooseMode(division.slug)} onKeyDown={event => {
          if (["ArrowDown","ArrowUp","Home","End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? divisions.length-1 : (index + (event.key === "ArrowDown" ? 1 : -1) + divisions.length) % divisions.length; controls.current[next]?.focus(); }
          if (event.key === "Enter") { event.preventDefault(); router.push("/servicos/" + division.slug); }
        }}>{modeLabels[division.slug]}<ArrowUpRight size={25} /></button><p>{division.short}</p><Link href={"/servicos/" + division.slug} className="concept-text-link">Explorar solução <ArrowUpRight size={15} /></Link></article>)}<p className="mode-keyboard-help mono" id="mode-keyboard-help">Setas: alternar modos · Enter: abrir solução</p></div><div ref={modesDock} className="panel-dock modes-panel-dock" id="service-preview" aria-label="Prévia do modo selecionado"><GorodPanel phase="evolve" mode={mode} /></div></div></section>
  </div>;
}

