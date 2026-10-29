"use client";

import Lenis from "lenis";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";
import { useMotionPreferences } from "./motion-provider";

export function SmoothScroll() {
  const { enabled } = useMotionPreferences();
  const pathname = usePathname();
  const previousRoute = useRef<string | null>(null);
  useGSAP(() => {
    const routeChanged = previousRoute.current !== pathname;
    previousRoute.current = pathname;
    if (!enabled) return;
    const lenis = new Lenis({ autoRaf: false, lerp: .09, smoothWheel: true, syncTouch: false,
      prevent: node => Boolean(node.closest("dialog, [data-lenis-prevent]")) || Boolean(document.querySelector("dialog[open]")),
    });
    setLenis(lenis);
    const update = (seconds: number) => lenis.raf(seconds * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const headerOffset = (target: HTMLElement) => {
      // Lenis also subtracts CSS scroll-margin and scroll-padding; avoid counting them twice.
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      return -(document.querySelector(".site-header")?.getBoundingClientRect().height ?? 82) - 20 + margin + padding;
    };
    const anchor = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      lenis.scrollTo(target, { offset: headerOffset(target), duration: .9, onComplete: () => {
        const hadTabindex = target.hasAttribute("tabindex");
        if (!hadTabindex) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        if (!hadTabindex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      } });
    };
    document.addEventListener("click", anchor, { capture: true });
    const frame = requestAnimationFrame(() => {
      if (routeChanged && location.hash) {
        try { const target = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (target) lenis.scrollTo(target, { offset: headerOffset(target), immediate: true }); } catch { /* Keep the browser's native hash behavior for malformed links. */ }
      }
      ScrollTrigger.refresh();
    });
    return () => { cancelAnimationFrame(frame); document.removeEventListener("click", anchor, { capture: true }); gsap.ticker.remove(update); gsap.ticker.lagSmoothing(500, 33); lenis.off("scroll", ScrollTrigger.update); setLenis(null); lenis.destroy(); };
  }, { dependencies: [enabled, pathname], revertOnUpdate: true });
  return null;
}
