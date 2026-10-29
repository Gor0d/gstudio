import type Lenis from "lenis";

// SmoothScroll owns the instance; scenes only borrow it for programmatic scrolls.
let current: Lenis | null = null;
export const setLenis = (instance: Lenis | null) => { current = instance; };
export const getLenis = () => current;
