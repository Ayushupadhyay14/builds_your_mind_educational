import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * True only when decorative motion is allowed: the screen is at least
 * `minWidth` px wide (and, if `needsHover`, has a mouse-style pointer) and the
 * visitor has not asked for reduced motion. False on the server and on first
 * render, so pre-rendered HTML and hydration always match.
 */
export default function useMotionEnabled({ minWidth = 768, needsHover = false } = {}) {
  const reduce = useReducedMotion();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const queries = [window.matchMedia(`(min-width: ${minWidth}px)`)];
    if (needsHover) queries.push(window.matchMedia("(hover: hover) and (pointer: fine)"));
    const update = () => setOk(queries.every((q) => q.matches));
    update();
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, [minWidth, needsHover]);
  return ok && !reduce;
}
