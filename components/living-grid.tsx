"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "./motion-provider";

const GAP = 28;
const LENS = 150;
const LENS_FORCE = 11;
const WAVE_SPEED = .55;
const WAVE_LIFE = 1700;
const WAVE_WIDTH = 24;
const WAVE_PUSH = 9;
const MAX_WAVES = 4;
const TRAIL = 6;
const DIM = "rgba(231,236,228,.09)";
const GLOW = "#B6EC80";
const HEAD = "#F0FFE4";
const INTERACTIVE = "a, button, input, textarea, select, label, summary, [role='button'], [contenteditable='true']";

type Pulse = { col: number; row: number; dx: number; dy: number; travelled: number; speed: number; trail: [number, number][] };
type Wave = { x: number; y: number; born: number };

/** Living dot grid behind the page: magnetic lens around the focus, a mesh between lit dots, pulses and click waves. */
export function LivingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { enabled, reduced } = useMotionPreferences();
  const prefs = useRef({ enabled, reduced });
  const wake = useRef<() => void>(() => {});

  useEffect(() => { prefs.current = { enabled, reduced }; wake.current(); }, [enabled, reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let width = 0, height = 0, dpr = 1, cols = 0, rows = 0, originX = 0, originY = 0;
    let glow = new Float32Array(0), shiftX = new Float32Array(0), shiftY = new Float32Array(0);
    let pulses: Pulse[] = [], waves: Wave[] = [];
    let frame = 0, last = 0, time = 0, nextPulse = 0;
    const focus = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0, active: false };

    const index = (col: number, row: number) => row * cols + col;
    const inside = (col: number, row: number) => col >= 0 && col < cols && row >= 0 && row < rows;

    function spawn() {
      // Enter from a random edge, heading inwards along the grid.
      const side = Math.floor(Math.random() * 4);
      const along = (count: number) => Math.floor(Math.random() * count);
      const start = [[along(cols), 0, 0, 1], [cols - 1, along(rows), -1, 0], [along(cols), rows - 1, 0, -1], [0, along(rows), 1, 0]][side];
      pulses.push({ col: start[0], row: start[1], dx: start[2], dy: start[3], travelled: 0, speed: 1.4 + Math.random() * 1.4, trail: [[start[0], start[1]]] });
    }

    function step(dt: number) {
      const frames = dt / (1000 / 60), now = performance.now();
      time += dt / 1000;
      const target = mouse.active ? mouse : { x: width * (.5 + .34 * Math.sin(time * .12)), y: height * (.5 + .3 * Math.sin(time * .08 + 1.2)) };
      const follow = 1 - (1 - .18) ** frames;
      focus.x += (target.x - focus.x) * follow; focus.y += (target.y - focus.y) * follow;

      const decay = .94 ** frames;
      for (let i = 0; i < glow.length; i++) glow[i] *= decay;

      waves = waves.filter(wave => now - wave.born < WAVE_LIFE);
      nextPulse -= dt;
      if (nextPulse <= 0 && pulses.length < (width < 700 ? 3 : 6)) { spawn(); nextPulse = 300 + Math.random() * 900; }
      pulses = pulses.filter(pulse => {
        pulse.travelled += pulse.speed * frames;
        while (pulse.travelled >= GAP) {
          pulse.travelled -= GAP;
          pulse.col += pulse.dx; pulse.row += pulse.dy;
          if (!inside(pulse.col, pulse.row)) return false;
          glow[index(pulse.col, pulse.row)] = 1;
          pulse.trail.push([pulse.col, pulse.row]);
          if (pulse.trail.length > TRAIL) pulse.trail.shift();
          if (Math.random() < .2) { const turn = Math.random() < .5 ? 1 : -1; [pulse.dx, pulse.dy] = [-pulse.dy * turn, pulse.dx * turn]; }
        }
        return true;
      });

      const rings = waves.map(wave => { const age = now - wave.born; return { x: wave.x, y: wave.y, radius: age * WAVE_SPEED, fade: 1 - age / WAVE_LIFE }; });
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = index(col, row), x = originX + col * GAP, y = originY + row * GAP;
          let moveX = 0, moveY = 0;
          const dx = x - focus.x, dy = y - focus.y, squared = dx * dx + dy * dy;
          if (squared < LENS * LENS && squared > .0001) {
            const distance = Math.sqrt(squared), strength = (1 - distance / LENS) ** 2;
            moveX += dx / distance * strength * LENS_FORCE; moveY += dy / distance * strength * LENS_FORCE;
            glow[i] = Math.max(glow[i], strength * 1.15);
          }
          for (const ring of rings) {
            const wx = x - ring.x, wy = y - ring.y, d = Math.sqrt(wx * wx + wy * wy), offset = d - ring.radius;
            // Beyond three ring widths the Gaussian is already below 0.01.
            if (offset > WAVE_WIDTH * 3 || offset < -WAVE_WIDTH * 3 || d < .01) continue;
            const intensity = Math.exp(-((offset / WAVE_WIDTH) ** 2)) * ring.fade;
            glow[i] = Math.max(glow[i], intensity);
            moveX += wx / d * intensity * WAVE_PUSH; moveY += wy / d * intensity * WAVE_PUSH;
          }
          shiftX[i] = moveX; shiftY[i] = moveY;
        }
      }
    }

    function draw(alive: boolean) {
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      context!.clearRect(0, 0, width, height);
      const px = (i: number, col: number) => originX + col * GAP + (alive ? shiftX[i] : 0);
      const py = (i: number, row: number) => originY + row * GAP + (alive ? shiftY[i] : 0);
      // Colors are set once per pass; per-element opacity goes through globalAlpha, which is far cheaper than parsing rgba strings.
      if (alive) {
        // Mesh first, so the dots sit on top of their links.
        context!.lineWidth = .6;
        context!.strokeStyle = GLOW;
        for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
          const i = index(col, row);
          if (glow[i] <= .3) continue;
          for (let link = 0; link < 2; link++) {
            const nc = col + (link ? 0 : 1), nr = row + link;
            if (!inside(nc, nr)) continue;
            const j = index(nc, nr);
            if (glow[j] <= .3) continue;
            context!.globalAlpha = Math.min(1, glow[i], glow[j]) * .32;
            context!.beginPath(); context!.moveTo(px(i, col), py(i, row)); context!.lineTo(px(j, nc), py(j, nr)); context!.stroke();
          }
        }
        context!.globalAlpha = 1;
      }
      context!.fillStyle = DIM;
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        const i = index(col, row);
        if (!alive || glow[i] < .03) context!.fillRect(px(i, col) - .6, py(i, row) - .6, 1.2, 1.2);
      }
      if (!alive) return;
      context!.fillStyle = GLOW;
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        const i = index(col, row), brightness = Math.min(1, glow[i]);
        if (brightness < .03) continue;
        const size = 1.2 + brightness * 2.2;
        context!.globalAlpha = .12 + brightness * .83;
        context!.fillRect(px(i, col) - size / 2, py(i, row) - size / 2, size, size);
      }
      context!.lineWidth = 1.2;
      context!.strokeStyle = GLOW;
      for (const pulse of pulses) {
        // Trail through the last nodes, brighter toward the head, which sits between nodes.
        const headX = originX + (pulse.col + pulse.dx * pulse.travelled / GAP) * GAP, headY = originY + (pulse.row + pulse.dy * pulse.travelled / GAP) * GAP;
        const points = [...pulse.trail.map(([col, row]) => [originX + col * GAP, originY + row * GAP]), [headX, headY]];
        for (let p = 1; p < points.length; p++) {
          context!.globalAlpha = p / (points.length - 1) * .85;
          context!.beginPath(); context!.moveTo(points[p - 1][0], points[p - 1][1]); context!.lineTo(points[p][0], points[p][1]); context!.stroke();
        }
        context!.globalAlpha = .95;
        context!.fillStyle = HEAD;
        context!.beginPath(); context!.arc(headX, headY, 1.8, 0, Math.PI * 2); context!.fill();
        context!.fillStyle = GLOW;
      }
      context!.globalAlpha = 1;
    }

    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      step(last ? Math.min(now - last, 50) : 16.67);
      last = now;
      draw(true);
    }
    function sync() {
      const { enabled: running, reduced: still } = prefs.current;
      if (running && !document.hidden) { if (!frame) { last = 0; frame = requestAnimationFrame(tick); } return; }
      cancelAnimationFrame(frame); frame = 0;
      // Reduced motion: a static grid. Paused: keep the last frame as it is.
      if (still) draw(false);
    }
    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * dpr); canvas!.height = Math.round(height * dpr);
      cols = Math.ceil(width / GAP) + 1; rows = Math.ceil(height / GAP) + 1;
      originX = (width - (cols - 1) * GAP) / 2; originY = (height - (rows - 1) * GAP) / 2;
      glow = new Float32Array(cols * rows); shiftX = new Float32Array(cols * rows); shiftY = new Float32Array(cols * rows);
      pulses = [];
      if (!mouse.active) { focus.x = width / 2; focus.y = height / 2; }
      draw(false);
      sync();
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      mouse.x = event.clientX; mouse.y = event.clientY; mouse.active = true;
    };
    const leave = () => { mouse.active = false; };
    const press = (event: PointerEvent) => {
      if (!prefs.current.enabled || (event.target as Element | null)?.closest?.(INTERACTIVE)) return;
      waves.push({ x: event.clientX, y: event.clientY, born: performance.now() });
      if (waves.length > MAX_WAVES) waves.shift();
    };
    const resizeObserver = new ResizeObserver(resize);
    wake.current = sync;

    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      wake.current = () => {};
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas ref={canvasRef} className="living-grid" aria-hidden="true" />;
}
