"use client";

import { useEffect, useRef } from "react";
import { storyStages } from "@/components/gorod-panel/panel-data";
import { useMotionPreferences } from "./motion-provider";

const services = ["Sites", "Sistemas", "Dados", "IA & Automação"];
const technologies = ["Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "Cloudflare"];
const details = [...storyStages.map(stage => stage.title), ...technologies];
// Three copies of a group always cover the row while the offset wraps inside one group width.
const COPIES = 3;
const BOOST_LIMIT = 16;
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

type Word = { element: HTMLElement; left: number; width: number; l: number; r: number };
type Separator = { element: HTMLElement; center: number; lit: boolean };
type Row = { track: HTMLElement; speed: number; sign: number; group: number; words: Word[]; separators: Separator[] };

/** Draft → product ticker: outlined words fill letter by letter while they cross the central band. */
export function HeroMarquee() {
  const root = useRef<HTMLElement>(null);
  const offsets = useRef([0, 0]);
  const { enabled } = useMotionPreferences();

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const rows: Row[] = Array.from(section.querySelectorAll<HTMLElement>(".ticker-row"), row => ({
      track: row.querySelector<HTMLElement>(".ticker-track")!, speed: Number(row.dataset.speed), sign: Number(row.dataset.sign), group: 0, words: [], separators: [],
    }));
    const band = { left: 0, right: 0 };
    let frame = 0, last = 0, lastScroll = window.scrollY, boost = 0, direction = 1, hover = 1, hoverTarget = 1;
    let visible = false, disposed = false;

    function measure() {
      const width = section!.clientWidth, bandWidth = Math.max(200, window.innerWidth * .26);
      band.left = (width - bandWidth) / 2; band.right = band.left + bandWidth;
      rows.forEach((row, index) => {
        row.group = (row.track.firstElementChild as HTMLElement).offsetWidth;
        row.words = Array.from(row.track.querySelectorAll<HTMLElement>(".ticker-word"), element => ({ element, left: element.offsetLeft, width: element.offsetWidth, l: -1, r: -1 }));
        row.separators = Array.from(row.track.querySelectorAll<HTMLElement>(".ticker-sep"), element => ({ element, center: element.offsetLeft + element.offsetWidth / 2, lit: element.classList.contains("is-lit") }));
        offsets.current[index] = wrap(offsets.current[index], row.group);
      });
    }
    const wrap = (offset: number, group: number) => group ? ((offset % group) - group) % group : 0;

    function paint() {
      rows.forEach((row, index) => {
        const offset = offsets.current[index];
        row.track.style.transform = `translate3d(${offset.toFixed(2)}px,0,0)`;
        for (const word of row.words) {
          const x = offset + word.left;
          // Fraction hidden on each side = how much of the word lies outside the band.
          const l = Math.round(clamp((band.left - x) / word.width) * 1000) / 1000;
          const r = Math.round(clamp((x + word.width - band.right) / word.width) * 1000) / 1000;
          if (l !== word.l) { word.l = l; word.element.style.setProperty("--l", String(l)); }
          if (r !== word.r) { word.r = r; word.element.style.setProperty("--r", String(r)); }
        }
        for (const separator of row.separators) {
          const center = offset + separator.center;
          const lit = center >= band.left && center <= band.right;
          if (lit !== separator.lit) { separator.lit = lit; separator.element.classList.toggle("is-lit", lit); }
        }
      });
    }

    function tick(now: number) {
      frame = 0;
      const step = last ? Math.min(now - last, 50) / (1000 / 60) : 1;
      last = now;
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      // Scrolling up reverses the drift; the scroll speed adds a decaying boost on top of it.
      if (delta) direction = delta < 0 ? -1 : 1;
      boost = clamp(boost + delta * .06, -BOOST_LIMIT, BOOST_LIMIT) * .92 ** step;
      hover += (hoverTarget - hover) * Math.min(1, .12 * step);
      rows.forEach((row, index) => {
        // The lower row is slower in both its drift and its share of the scroll boost.
        const velocity = row.sign * (row.speed * direction + boost * row.speed / rows[0].speed) * hover;
        offsets.current[index] = wrap(offsets.current[index] + velocity * step, row.group);
      });
      paint();
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      const run = enabled && visible && !document.hidden;
      if (run && !frame) { last = 0; lastScroll = window.scrollY; frame = requestAnimationFrame(tick); }
      if (!run && frame) { cancelAnimationFrame(frame); frame = 0; }
    }
    const refresh = () => { measure(); paint(); };
    const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") hoverTarget = .35; };
    const leave = () => { hoverTarget = 1; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });

    refresh();
    observer.observe(section);
    window.addEventListener("resize", refresh);
    document.addEventListener("visibilitychange", sync);
    section.addEventListener("pointerenter", enter);
    section.addEventListener("pointerleave", leave);
    document.fonts.ready.then(() => { if (!disposed) refresh(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", refresh);
      document.removeEventListener("visibilitychange", sync);
      section.removeEventListener("pointerenter", enter);
      section.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  return <section ref={root} className="ticker" aria-label={"Especialidades: " + services.join(", ")}>
    <div className="ticker-band" aria-hidden="true"><span>rascunho</span><span>produto</span></div>
    <div className="ticker-rows" aria-hidden="true">
      <TickerRow items={services} className="ticker-primary" speed={.7} sign={-1} />
      <TickerRow items={details} className="ticker-secondary" speed={.42} sign={1} />
    </div>
  </section>;
}

function TickerRow({ items, className, speed, sign }: { items: string[]; className: string; speed: number; sign: number }) {
  const sequence = [...items, ...items];
  return <div className={"ticker-row " + className} data-speed={speed} data-sign={sign}>
    <div className="ticker-track">
      {Array.from({ length: COPIES }, (_, copy) => <div className="ticker-group" key={copy}>
        {sequence.map((item, index) => <span className="ticker-item" key={index}><span className="ticker-word" data-t={item}>{item}</span><span className="ticker-sep"><i /></span></span>)}
      </div>)}
    </div>
  </div>;
}
