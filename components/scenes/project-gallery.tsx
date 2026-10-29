"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, stageLabels } from "@/content/projects";
import { ProjectVisual } from "@/components/project-visual";
import { useMotionPreferences } from "@/components/motion-provider";

const selected = ["economia", "visionlol", "honormed", "ponto-digital-pro"].map(slug => projects.find(project => project.slug === slug)!);
const pad = (value: number) => String(value).padStart(2, "0");

export function ProjectGallery() {
  const viewport = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  // Bumped whenever the active slide changes (autoplay, arrows or drag) so the progress bar restarts.
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const { enabled } = useMotionPreferences();
  const autoplay = enabled && inView && visible && !hovered && !focused && !touching;

  const goTo = useCallback((index: number) => {
    const container = viewport.current;
    const slide = slides.current[(index + selected.length) % selected.length];
    if (!container || !slide) return;
    const padding = parseFloat(getComputedStyle(container).scrollPaddingInlineStart) || 0;
    const left = Math.min(slide.offsetLeft - padding, container.scrollWidth - container.clientWidth);
    container.scrollTo({ left, behavior: enabled ? "smooth" : "auto" });
  }, [enabled]);

  useEffect(() => {
    const container = viewport.current;
    if (!container) return;
    let frame = 0;
    const sync = () => {
      frame = 0;
      const padding = parseFloat(getComputedStyle(container).scrollPaddingInlineStart) || 0;
      const atEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 2;
      let nearest = 0;
      slides.current.forEach((slide, index) => {
        if (!slide) return;
        const current = slides.current[nearest]!;
        if (Math.abs(slide.offsetLeft - padding - container.scrollLeft) < Math.abs(current.offsetLeft - padding - container.scrollLeft)) nearest = index;
      });
      const next = atEnd ? selected.length - 1 : nearest;
      if (next === activeRef.current) return;
      activeRef.current = next;
      setActive(next);
      setCycle(value => value + 1);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sync); };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); container.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const container = viewport.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .35 });
    const onVisibility = () => setVisible(!document.hidden);
    observer.observe(container); document.addEventListener("visibilitychange", onVisibility); onVisibility();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return <section className="concept-project-gallery" aria-labelledby="gallery-title" data-scene-owned>
    <header className="shell concept-gallery-header"><div><p className="mono">IDEIAS QUE GANHARAM FORMA</p><h2 id="gallery-title">Construído.<br />Não só imaginado.</h2></div><Link href="/projetos" className="concept-text-link">Todos os projetos <ArrowUpRight size={18} /></Link></header>
    <div className="concept-carousel" role="region" aria-roledescription="carrossel" aria-label="Projetos em destaque" data-autoplay={autoplay}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={event => { if (event.pointerType === "mouse") setHovered(false); }}
      onFocus={event => { if (event.target.matches(":focus-visible")) setFocused(true); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}
      onTouchStart={() => setTouching(true)} onTouchEnd={() => setTouching(false)} onTouchCancel={() => setTouching(false)}>
      <div ref={viewport} className="concept-gallery-viewport">
        <div className="concept-gallery-track" aria-live={autoplay ? "off" : "polite"}>{selected.map((project, index) => <article ref={element => { slides.current[index] = element; }} className={"concept-project" + (index === active ? " is-active" : "")} key={project.slug} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${selected.length}: ${project.title}`}><Link href={"/projetos/" + project.slug} className="concept-project-link" aria-label={`Conhecer o projeto ${project.title}`}><div className="project-device-frame"><ProjectVisual project={project} /></div><div className="concept-project-caption"><span className="mono">{stageLabels[project.stage]} / {project.categories.join(" + ")}</span><h3>{project.title} <ArrowUpRight size={28} /></h3><p>{project.summary}</p></div></Link></article>)}</div>
      </div>
      <div className="shell concept-carousel-controls">
        <div className="concept-carousel-progress">{selected.map((project, index) => <button type="button" key={project.slug} aria-label={`Ir para o projeto ${index + 1}: ${project.title}`} aria-current={index === active ? "true" : undefined} onClick={() => goTo(index)}><span className={index < active ? "is-done" : index === active ? "is-current" : ""}>{index === active && <i key={cycle} onAnimationEnd={() => { if (autoplay) goTo(active + 1); }} />}</span></button>)}</div>
        <span className="concept-carousel-counter mono" aria-hidden="true">{pad(active + 1)} / {pad(selected.length)}</span>
        <div className="concept-carousel-arrows"><button type="button" aria-label="Projeto anterior" onClick={() => goTo(active - 1)}><ArrowLeft size={18} /></button><button type="button" aria-label="Próximo projeto" onClick={() => goTo(active + 1)}><ArrowRight size={18} /></button></div>
      </div>
    </div>
  </section>;
}
