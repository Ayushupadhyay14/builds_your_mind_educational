import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Parallax runs only on screens >= 768px and when the visitor has not asked
// for reduced motion. Otherwise a plain static layer is rendered.
const useParallaxEnabled = () => {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide && !reduce;
};

/**
 * Decorative background layer that drifts slightly slower than the page.
 * Transform only (GPU, no layout, no re-render per frame). The inner layer is
 * oversized by `distance` px top and bottom, so no edge is ever exposed, and
 * the outer box keeps its size, so nothing shifts.
 * Put it inside a `relative overflow-hidden` section.
 */
export const ParallaxLayer = ({ className = "", distance = 24 }) => {
  const ref = useRef(null);
  const enabled = useParallaxEnabled();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        className={`absolute inset-x-0 ${className}`}
        style={{
          top: -distance,
          bottom: -distance,
          y: enabled ? y : 0,
          willChange: enabled ? "transform" : "auto",
        }}
      />
    </div>
  );
};

export default ParallaxLayer;
