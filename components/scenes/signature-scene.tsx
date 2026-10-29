"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPreferences } from "@/components/motion-provider";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { ScenePanel } from "./scene-panel";
import { createSceneRenderer, FINAL_STAGE, type PanelScale } from "./scene-renderer";
import { signatureStages } from "./signature-data";

const STAGES = signatureStages.length;
const GLYPHS = "<>/{}#*01";
const SCRAMBLE_MS = 480;
const CHROME = 33;
const pad = (value: number) => String(value).padStart(2, "0");
const inOutCubic = (t: number) => t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

export function SignatureScene() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const renderer = useRef<ReturnType<typeof createSceneRenderer> | null>(null);
  const scale = useRef<PanelScale>({ k: .5, base: 1440 });
  const current = useRef(0);
  const [stages, setStages] = useState({ current: 0, previous: -1 });
  const { enabled } = useMotionPreferences();
  const stage = stages.current;

  // The product is laid out at a logical width (1440, or 760 on phones) and scaled to the dock.
  useEffect(() => {
    const scene = root.current;
    const dock = scene?.querySelector<HTMLElement>(".sp-dock");
    if (!scene || !dock) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const base = width < 560 ? 760 : 1440;
      const k = Math.min((width - 2) / base, (height - CHROME) / (base * .55));
      const logicalHeight = Math.min((height - CHROME) / k, base * (base < 1440 ? 1.25 : .7));
      scale.current = { k, base };
      scene.style.setProperty("--k", k.toFixed(5));
      scene.style.setProperty("--sp-base", String(base));
      scene.style.setProperty("--sp-h", logicalHeight.toFixed(1));
      scene.dataset.compact = String(base < 1440);
      renderer.current?.refresh();
    });
    observer.observe(dock);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    const scene = root.current;
    if (!scene) return;
    const panel = createSceneRenderer(scene, () => scale.current);
    renderer.current = panel;
    if (!enabled) {
      panel.render(FINAL_STAGE, false);
      return () => { panel.destroy(); renderer.current = null; };
    }
    const liquid = scene.querySelector<HTMLElement>(".sig-liquid");
    const proxy = { progress: 0 };
    const update = () => {
      const s = proxy.progress * STAGES;
      panel.render(s, true);
      const index = Math.min(STAGES - 1, Math.floor(s));
      const t = s - index;
      // Liquid indicator: in the last 20% the leading edge runs ahead (t^.55) and the trailing edge catches up (t^1.8).
      let top = index, bottom = index + 1;
      if (index < STAGES - 1 && t > .8) { const u = (t - .8) / .2; bottom += u ** .55; top += u ** 1.8; }
      liquid?.style.setProperty("--y0", top.toFixed(4));
      liquid?.style.setProperty("--len", (bottom - top).toFixed(4));
      if (index !== current.current) {
        current.current = index;
        setStages(previous => ({ current: index, previous: previous.current }));
      }
    };
    panel.render(0, false);
    const tween = gsap.to(proxy, {
      progress: 1, ease: "none", onUpdate: update,
      scrollTrigger: { trigger: scene.querySelector(".sig-stage"), start: "top top", end: () => "+=" + innerHeight * 4.5, pin: true, scrub: .35, anticipatePin: 1, invalidateOnRefresh: true },
    });
    trigger.current = tween.scrollTrigger ?? null;
    return () => { trigger.current = null; panel.destroy(); renderer.current = null; };
  }, { scope: root, dependencies: [enabled], revertOnUpdate: true });

  // Decode the active title: glyphs resolve left to right in ~480 ms.
  useEffect(() => {
    if (!enabled) return;
    const targets = Array.from(root.current?.querySelectorAll<HTMLElement>(`.sig-step[data-index="${stage}"] [data-scramble]`) ?? []);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      targets.forEach(element => {
        const text = element.dataset.scramble ?? "";
        element.textContent = Array.from(text, (char, index) => char === " " || elapsed >= SCRAMBLE_MS * (index + 1) / text.length ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");
      });
      if (elapsed < SCRAMBLE_MS) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); targets.forEach(element => { element.textContent = element.dataset.scramble ?? ""; }); };
  }, [stage, enabled]);

  function jump(index: number) {
    const scroll = trigger.current;
    if (!scroll) return;
    const target = scroll.start + (index + (index === STAGES - 1 ? .97 : .6)) / STAGES * (scroll.end - scroll.start);
    const distance = Math.abs(target - window.scrollY);
    const duration = Math.min(1500, Math.max(450, 300 + distance * .35)) / 1000;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration, easing: inOutCubic });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  return <section ref={root} id="processo" className="sig" data-layout={enabled ? "pinned" : "list"} aria-labelledby="signature-title" data-scene-owned>
    <div className="sig-stage shell">
      <header className="sig-heading"><p className="mono">DO RASCUNHO AO PRODUTO</p><h2 id="signature-title">Uma ideia.<br />Cada vez mais real.</h2></header>
      {enabled
        ? <nav className="sig-rail" aria-label="Etapas do processo">
          <div className="sig-odo" aria-hidden="true"><span>0</span><span className="sig-odo-window"><span className="sig-odo-column" style={{ transform: `translateY(${-stage * 100 / STAGES}%)` }}>{signatureStages.map((_, index) => <span key={index}>{index + 1}</span>)}</span></span><small>/ {pad(STAGES)}</small></div>
          <div className="sig-steps">
            <span className="sig-track" aria-hidden="true"><i className="sig-liquid" /></span>
            <ol>{signatureStages.map((item, index) => <li key={item.title}><button type="button" className="sig-step" data-index={index} aria-current={index === stage ? "step" : undefined} onClick={() => jump(index)}>
              <span className="sig-step-number mono" aria-hidden="true">{pad(index + 1)}</span>
              <span className="sig-step-title" data-scramble={item.title} aria-hidden="true">{item.title}</span>
              <span className="sig-step-short" data-scramble={item.short} aria-hidden="true">{item.short}</span>
              <span className="sr-only">Etapa {index + 1}: {item.title}</span>
            </button></li>)}</ol>
          </div>
          <p className="sig-phrase" aria-hidden="true">
            {stages.previous >= 0 && <span key={`out-${stages.previous}-${stage}`} className="is-out">{signatureStages[stages.previous].phrase}</span>}
            <span key={`in-${stage}`} className="is-in">{signatureStages[stage].phrase}</span>
          </p>
        </nav>
        : <ol className="sig-list">{signatureStages.map((item, index) => <li key={item.title}><span className="mono">{pad(index + 1)}</span><h3>{item.title}</h3><p>{item.phrase}</p><small>{item.note}</small></li>)}</ol>}
      <div className="sig-panel"><ScenePanel /></div>
      {enabled && <ol className="sr-only">{signatureStages.map(item => <li key={item.title}>{item.title}: {item.phrase} {item.note}</li>)}</ol>}
    </div>
  </section>;
}
