"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useMotionPreferences } from "./motion-provider";

export function PremiumCard({ children, className = "", as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "article" }) {
  const { enabled } = useMotionPreferences();
  const rotateX = useSpring(0, { stiffness: 150, damping: 23 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 23 });
  const x = useMotionValue(0), y = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(182,236,128,.10), transparent 72%)`;
  useEffect(() => { if (!enabled) { rotateX.jump(0); rotateY.jump(0); } }, [enabled, rotateX, rotateY]);
  const Tag = as === "article" ? motion.article : motion.div;
  return <Tag className={"premium-interactive " + className} data-reveal style={{ rotateX, rotateY, transformPerspective: 1000 }}
    onPointerMove={event => {
      if (!enabled || event.pointerType !== "mouse" || !matchMedia("(hover: hover)").matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const px = event.clientX - bounds.left, py = event.clientY - bounds.top;
      x.set(px); y.set(py);
      rotateX.set(Math.max(-5.5, Math.min(5.5, -(py / bounds.height - .5) * 9)));
      rotateY.set(Math.max(-5.5, Math.min(5.5, (px / bounds.width - .5) * 9)));
    }} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }}>
    <motion.span aria-hidden="true" className="premium-spotlight" style={{ background: glow }} />
    {children}
    <span className="premium-border-beam" aria-hidden="true" />
  </Tag>;
}
