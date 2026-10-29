"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

const subscribeReduced = (listener: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
};
const reducedSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverReduced = () => true;
type MotionState = { paused: boolean; reduced: boolean; enabled: boolean; toggle: () => void };
const MotionContext = createContext<MotionState | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, reducedSnapshot, serverReduced);
  const enabled = !paused && !reduced;
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.motion = paused ? "paused" : reduced ? "reduced" : "running";
    html.classList.toggle("motion-paused", !enabled);
    return () => { delete html.dataset.motion; html.classList.remove("motion-paused"); };
  }, [enabled, paused, reduced]);
  return <MotionContext.Provider value={{ paused, reduced, enabled, toggle: () => setPaused(value => !value) }}>{children}</MotionContext.Provider>;
}

export function useMotionPreferences() {
  const state = useContext(MotionContext);
  if (!state) throw new Error("MotionProvider precisa envolver os componentes de movimento.");
  return state;
}
