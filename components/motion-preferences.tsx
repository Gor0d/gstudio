"use client";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { useMotionPreferences } from "./motion-provider";

export function MotionPreferences() {
  const pathname = usePathname();
  const { enabled } = useMotionPreferences();
  useGSAP((context) => {
    if (!enabled) return;
    let disposed = false;
    const splits: SplitText[] = [];
    context.add("setup", () => {
      if (disposed) return;
      const headings = gsap.utils.toArray<HTMLElement>("main h1, main h2").filter(element => !element.closest("a, [data-scene-owned]"));
      headings.forEach(element => {
        ScrollTrigger.create({ trigger: element, start: "top 94%", once: true, onEnter: () => {
          context.add(() => {
            element.setAttribute("aria-label", element.innerText.replace(/\s+/g, " ").trim());
            const split = SplitText.create(element, { type: "words", mask: "words", wordsClass: "gsap-text-word", aria: "none",
              onSplit: self => {
                self.words.forEach(word => word.setAttribute("aria-hidden", "true"));
                return gsap.from(self.words, { yPercent: 102, duration: .44, stagger: Math.min(.025, .27 / Math.max(1,self.words.length)), ease: "power3.out" });
              },
            });
            splits.push(split);
          });
        } });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(element => !element.querySelector("h2") && !element.closest("[data-scene-owned]")).forEach(element => {
        ScrollTrigger.create({ trigger: element, start: "top 96%", once: true, onEnter: () => context.add(() => {
          if (element.classList.contains("premium-interactive")) gsap.fromTo(element, { opacity: .65 }, { opacity: 1, duration: .36, clearProps: "opacity" });
          else gsap.fromTo(element, { opacity: .65, y: 12 }, { opacity: 1, y: 0, duration: .36, ease: "power2.out", clearProps: "opacity,transform" });
        }) });
      });
      gsap.utils.toArray<HTMLElement>(".project-card-visual .project-visual").forEach(element => {
        gsap.fromTo(element, { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: element.closest(".project-card"), start: "top bottom", end: "center center", scrub: .45 } });
      });
      gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach(element => {
        const end = Number(element.dataset.countTo);
        ScrollTrigger.create({ trigger: element, start: "top 92%", once: true, onEnter: () => context.add(() => {
          const value = { count: 0 };
          gsap.to(value, { count: end, duration: .7, ease: "power2.out", onUpdate: () => { element.textContent = String(Math.round(value.count)); }, onComplete: () => { element.textContent = String(end); } });
        }) });
      });
      const media = gsap.matchMedia();
      media.add("(min-width: 981px)", () => {
        const progress = document.querySelector(".process-progress i");
        if (progress) gsap.fromTo(progress, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".studio-process", start: "top 65%", end: "bottom 65%", scrub: .4 } });
      });
      ScrollTrigger.refresh();
      return () => media.revert();
    });
    // Wait for the locally hosted font so line masks don't reflow the first paint.
    document.fonts.ready.then(() => { if (!disposed) context.setup(); });
    return () => {
      disposed = true;
      splits.forEach(split => split.revert());
      document.querySelectorAll<HTMLElement>("[data-count-to]").forEach(element => { element.textContent = element.dataset.countTo ?? ""; });
    };
  }, { dependencies: [pathname, enabled], revertOnUpdate: true });
  return null;
}
