"use client";

import { useEffect } from "react";

/** Opt-in, local QA only (?measure=1). No network requests or analytics storage. */
export function PerformanceProbe() {
  useEffect(() => {
    if (new URLSearchParams(location.search).get("measure") !== "1" || typeof PerformanceObserver === "undefined") return;
    const html = document.documentElement;
    let score = 0, session = 0, first = 0, last = 0;
    const observers: PerformanceObserver[] = [];
    html.dataset.measuredCls = "0";
    if (PerformanceObserver.supportedEntryTypes.includes("largest-contentful-paint")) {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) html.dataset.measuredLcp = String(Math.round(entry.startTime));
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(observer);
    }
    if (PerformanceObserver.supportedEntryTypes.includes("layout-shift")) {
      const observer = new PerformanceObserver(list => {
        for (const raw of list.getEntries()) {
          const entry = raw as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (entry.hadRecentInput) continue;
          if (entry.startTime - last < 1000 && entry.startTime - first < 5000) session += entry.value;
          else { session = entry.value; first = entry.startTime; }
          last = entry.startTime; score = Math.max(score, session);
          html.dataset.measuredCls = score.toFixed(4);
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
      observers.push(observer);
    }
    return () => { observers.forEach(observer => observer.disconnect()); delete html.dataset.measuredCls; delete html.dataset.measuredLcp; };
  }, []);
  return null;
}
