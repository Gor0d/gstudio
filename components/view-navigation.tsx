"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMotionPreferences } from "./motion-provider";

/** Native View Transitions, with ordinary Next navigation as the fallback. */
export function ViewNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { enabled } = useMotionPreferences();
  const pending = useRef<(() => void) | null>(null);
  useEffect(() => {
    const first = requestAnimationFrame(() => { requestAnimationFrame(() => { pending.current?.(); pending.current = null; }); });
    return () => cancelAnimationFrame(first);
  }, [pathname]);
  useEffect(() => {
    if (!enabled || typeof document.startViewTransition !== "function") return;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.hash || url.pathname === pathname) return;
      event.preventDefault();
      pending.current?.();
      try {
        const transition = document.startViewTransition(() => new Promise<void>(resolve => {
          pending.current = resolve;
          timeout = setTimeout(() => { resolve(); pending.current = null; }, 3500);
          router.push(url.pathname + url.search);
        }));
        transition.finished.catch(() => { /* Browser may skip a transition; navigation still completes. */ }).finally(() => clearTimeout(timeout));
      } catch { router.push(url.pathname + url.search); }
    };
    document.addEventListener("click", click, { capture: true });
    return () => { document.removeEventListener("click", click, { capture: true }); clearTimeout(timeout); pending.current?.(); pending.current = null; };
  }, [enabled, pathname, router]);
  return null;
}
