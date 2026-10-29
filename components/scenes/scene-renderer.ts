import { agentAnswer, codePieces, highlight, tokenize } from "./signature-data";

/** Stage position (0–5) used when the scene is not pinned: evolution complete, full width. */
export const FINAL_STAGE = 4;
export type PanelScale = { k: number; base: number };
type Styled = HTMLElement | SVGElement;
type Box = { x: number; y: number; w: number; h: number };

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const range = (s: number, from: number, to: number) => clamp((s - from) / (to - from));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeInOut = (t: number) => t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: Box, b: Box, t: number): Box => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), w: lerp(a.w, b.w, t), h: lerp(a.h, b.h, t) });
const at = (box: Box, px: number, py: number) => ({ x: box.x + box.w * px, y: box.y + box.h * py });

const lines = codePieces.reduce<{ tokens: ReturnType<typeof tokenize>; length: number; offset: number }[]>((all, line) => {
  const previous = all[all.length - 1];
  all.push({ tokens: tokenize(line), length: line.length, offset: previous ? previous.offset + previous.length : 0 });
  return all;
}, []);
const totalChars = lines.reduce((sum, line) => sum + line.length, 0);

/**
 * Maps a stage position s (0 = Estratégia … 5 = end of Qualquer tela) onto the panel.
 * Only CSS variables, classes and text are written; layout is read only when `measure` is set,
 * which the caller does exclusively from the ScrollTrigger update.
 */
export function createSceneRenderer(scene: HTMLElement, getScale: () => PanelScale) {
  const one = (selector: string) => scene.querySelector<HTMLElement>(selector)!;
  const all = (selector: string) => Array.from(scene.querySelectorAll<HTMLElement>(selector));
  const screen = one(".sp-screen"), brief = one(".sp-brief"), overlays = one(".sp-overlays"), code = one(".sp-code"), toast = one(".sp-toast");
  const chart = one(".sp-chart"), agent = one(".sp-agent"), answer = one('[data-sp="answer"]'), version = one('[data-sp="version"]');
  const widthLabel = one('[data-sp="width"]'), selectLabel = one('[data-sp="select"]'), gapLabel = one('[data-sp="gap"]');
  const pieces = all(".sp-piece");
  const doodles = Array.from(scene.querySelectorAll<SVGPathElement>(".sp-doodle"));
  const notes = all(".sp-note, .sp-postit");
  const codeLines = all('[data-sp="line"]');
  const codeTargets = codeLines.map(line => line.querySelector<HTMLElement>(".sp-line-code")!);
  const terminal = all('[data-sp="term"]');
  const counters = all('[data-sp="kpi"]');
  const typed = lines.map(line => line.length);
  const built = pieces.map(piece => piece.classList.contains("is-built"));
  const cache = new WeakMap<Styled, Map<string, string>>();
  let last: number | null = null;

  function set(element: Styled, property: string, value: number | string) {
    const text = typeof value === "number" ? String(Math.round(value * 1000) / 1000) : value;
    let entries = cache.get(element);
    if (!entries) cache.set(element, entries = new Map());
    if (entries.get(property) === text) return;
    entries.set(property, text);
    element.style.setProperty(property, text);
  }
  const write = (element: HTMLElement, text: string) => { if (element.textContent !== text) element.textContent = text; };
  const endFlash = (event: AnimationEvent) => { if (event.animationName === "sp-flash") (event.currentTarget as HTMLElement).classList.remove("is-flash"); };
  pieces.forEach(piece => piece.addEventListener("animationend", endFlash));

  function measureDesign(s: number, k: number) {
    // Read every box first, then write, so the frame never interleaves layout and style.
    const origin = screen.getBoundingClientRect();
    const boxes = pieces.map(piece => { const rect = piece.getBoundingClientRect(); return { x: rect.left - origin.left, y: rect.top - origin.top, w: rect.width, h: rect.height }; });
    const ana = clamp((s - 1.06) / (.085 * 6)) * 6;
    const index = Math.min(5, Math.floor(ana)), progress = easeInOut(ana - index);
    const selected = mix(boxes[index], boxes[index + 1], progress);
    const anaPoint = { x: lerp(at(boxes[index], .64, .62).x, at(boxes[index + 1], .64, .62).x, progress), y: lerp(at(boxes[index], .64, .62).y, at(boxes[index + 1], .64, .62).y, progress) };
    const ia = Math.max(0, ana - 1.4), iaIndex = Math.min(5, Math.floor(ia)), iaProgress = easeInOut(ia - iaIndex);
    const iaPoint = { x: lerp(at(boxes[iaIndex], .28, .8).x, at(boxes[iaIndex + 1], .28, .8).x, iaProgress), y: lerp(at(boxes[iaIndex], .28, .8).y, at(boxes[iaIndex + 1], .28, .8).y, iaProgress) };
    const nearest = boxes[Math.round(ana)];
    const left = boxes[2], right = boxes[3], gap = right.x - (left.x + left.w);
    set(overlays, "--sx", selected.x); set(overlays, "--sy", selected.y); set(overlays, "--sw", selected.w); set(overlays, "--sh", selected.h);
    set(overlays, "--ax", anaPoint.x); set(overlays, "--ay", anaPoint.y);
    set(overlays, "--gx", iaPoint.x); set(overlays, "--gy", iaPoint.y);
    set(overlays, "--cx", left.x + left.w); set(overlays, "--cy", left.y + left.h * .5); set(overlays, "--cw", Math.max(0, gap));
    write(selectLabel, `${Math.round(nearest.w / k)} × ${Math.round(nearest.h / k)}`);
    write(gapLabel, `${Math.round(gap / k)} px`);
  }

  function render(s: number, measure: boolean) {
    const forward = last !== null && s > last;
    last = s;
    const { k, base } = getScale();

    // Estratégia: the client's words, the pain highlighted, pencil notes around them.
    set(brief, "--out", easeInOut(range(s, .82, 1)));
    set(brief, "--mark", easeOut(range(s, .06, .36)));
    doodles.forEach((path, index) => set(path, "--draw", 1 - easeOut(range(s, .2 + index * .08, .46 + index * .08))));
    notes.forEach((note, index) => set(note, "--in", easeOut(range(s, .4 + index * .1, .54 + index * .1))));

    // Design: pieces arrive one by one under rulers, selection and two multiplayer cursors.
    pieces.forEach((piece, index) => set(piece, "--in", easeOut(range(s, 1.02 + index * .085, 1.1 + index * .085))));
    const design = easeOut(range(s, .96, 1.08)) * (1 - range(s, 1.86, 2));
    set(overlays, "--in", design);
    set(overlays, "--cin", easeOut(range(s, 1.02 + 3 * .085, 1.1 + 3 * .085)));
    if (design > 0 && measure) measureDesign(s, k);

    // Desenvolvimento: JSX typed in step with the scroll; a finished line builds its piece.
    set(code, "--in", easeOut(range(s, 2, 2.1)) * (1 - easeInOut(range(s, 2.88, 3))));
    const chars = Math.floor(range(s, 2.12, 2.72) * totalChars);
    const caret = s >= 2.08 && chars < totalChars ? lines.findIndex(line => line.offset + line.length > chars) : -1;
    lines.forEach((line, index) => {
      const count = Math.max(0, Math.min(line.length, chars - line.offset));
      if (typed[index] !== count) { typed[index] = count; codeTargets[index].innerHTML = highlight(line.tokens, count); }
      codeLines[index].classList.toggle("has-caret", index === caret);
      const done = s > 2.12 && count === line.length;
      if (done === built[index]) return;
      built[index] = done;
      pieces[index].classList.toggle("is-built", done);
      pieces[index].classList.toggle("is-flash", done && forward);
    });
    terminal[0].classList.toggle("is-on", s >= 2.76);
    terminal[1].classList.toggle("is-on", s >= 2.84);

    // Evolução: numbers count up, bars grow, the agent answers, a new deploy lands.
    const count = easeOut(range(s, 3.05, 3.45));
    counters.forEach(counter => write(counter, Math.round(Number(counter.dataset.value) * count) + (counter.dataset.suffix ?? "")));
    set(chart, "--grow", .14 + .86 * easeOut(range(s, 3.1, 3.5)));
    set(agent, "--q", easeOut(range(s, 3.16, 3.26)));
    const letters = Math.round(range(s, 3.3, 3.75) * agentAnswer.length);
    write(answer, agentAnswer.slice(0, letters));
    answer.classList.toggle("has-caret", s > 3.24 && letters < agentAnswer.length);
    set(toast, "--in", easeOut(range(s, 3.56, 3.66)) * (1 - range(s, 3.9, 3.98)));
    write(version, s >= 3.62 ? "v1.3" : "v1.0");

    // Qualquer tela: the logical viewport narrows and @container queries reflow the layout.
    const width = Math.round(lerp(base, 390, easeInOut(range(s, 4.05, 4.8))));
    set(scene, "--sp-w", width);
    write(widthLabel, `${width} px`);
  }

  return {
    render,
    refresh: () => render(last ?? FINAL_STAGE, false),
    destroy: () => pieces.forEach(piece => piece.removeEventListener("animationend", endFlash)),
  };
}
