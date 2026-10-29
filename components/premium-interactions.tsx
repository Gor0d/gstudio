"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion";
import { useMotionPreferences } from "./motion-provider";

export function PremiumInteractions() {
  const { enabled } = useMotionPreferences();
  const pathname = usePathname();
  useEffect(() => {
    if (!enabled || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const cleanups = Array.from(document.querySelectorAll<HTMLElement>(".button:not(.button-ghost):not(.header-cta)")).map(element => {
      let bounds: DOMRect | null = null;
      let animation: ReturnType<typeof animate> | undefined;
      const enter = () => { bounds = element.getBoundingClientRect(); };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !bounds) return;
        const x = Math.max(-6, Math.min(6, (event.clientX - bounds.left - bounds.width / 2) * .08));
        const y = Math.max(-6, Math.min(6, (event.clientY - bounds.top - bounds.height / 2) * .08));
        animation?.stop(); animation = animate(element, { x, y }, { duration: .2 });
      };
      const leave = () => { bounds = null; animation?.stop(); animation = animate(element, { x: 0, y: 0 }, { duration: .3 }); };
      element.addEventListener("pointerenter", enter); element.addEventListener("pointermove", move); element.addEventListener("pointerleave", leave);
      return () => { element.removeEventListener("pointerenter", enter); element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); animation?.stop(); element.style.removeProperty("transform"); };
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }, [enabled, pathname]);
  return null;
}
