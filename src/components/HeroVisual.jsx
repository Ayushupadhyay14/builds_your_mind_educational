import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaRobot, FaMicrochip, FaWifi, FaCode } from "react-icons/fa";
import useMotionEnabled from "../hooks/useMotionEnabled";

// Hero image: photo in a rounded frame with floating STEM icon cards in front.
// Everything is transform-only (no layout), inside a fixed-aspect box, so
// nothing shifts. Motion is off on phones and for "reduce motion" users.
const cards = [
  { Icon: FaRobot, color: "text-brand-blue", pos: "-left-2 top-6 lg:-left-10 lg:top-12", depth: 18, amp: 10, dur: 5, delay: 0 },
  { Icon: FaMicrochip, color: "text-brand-orange-deep", pos: "-right-2 top-2 lg:-right-8 lg:top-2", depth: 30, amp: 12, dur: 6, delay: 0.6 },
  { Icon: FaWifi, color: "text-brand-orange-deep", pos: "-left-1 bottom-6 lg:-left-8 lg:bottom-20", depth: 26, amp: 9, dur: 5.5, delay: 1.1 },
  { Icon: FaCode, color: "text-brand-blue", pos: "-right-1 bottom-2 lg:-right-10 lg:bottom-6", depth: 38, amp: 11, dur: 6.5, delay: 0.3 },
];

const FloatCard = ({ Icon, color, pos, depth, amp, dur, delay, sx, sy, float, tilt }) => {
  // Cards shift a little against the tilt so they appear to hover in front.
  const x = useTransform(sx, [-0.5, 0.5], [depth, -depth]);
  const y = useTransform(sy, [-0.5, 0.5], [depth * 0.6, -depth * 0.6]);
  return (
    <motion.div
      className={`absolute z-20 ${pos}`}
      style={tilt ? { x, y } : undefined}
    >
      <motion.div
        animate={float ? { y: [0, -amp, 0] } : undefined}
        transition={float ? { duration: dur, delay, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="flex items-center justify-center h-14 w-14 lg:h-20 lg:w-20 rounded-2xl bg-white shadow-[0_22px_40px_-14px_rgba(8,20,60,0.6)] ring-1 ring-white/60"
      >
        <Icon className={`text-2xl lg:text-4xl ${color}`} />
      </motion.div>
    </motion.div>
  );
};

const HeroVisual = () => {
  const ref = useRef(null);
  const float = useMotionEnabled({ minWidth: 768 });
  const tilt = useMotionEnabled({ minWidth: 1024, needsHover: true });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 18 });
  const sy = useSpring(my, { stiffness: 110, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={tilt ? onMove : undefined}
      onMouseLeave={tilt ? onLeave : undefined}
      className="relative mx-auto w-full max-w-md lg:max-w-none px-3 lg:px-0"
      style={{ perspective: 1100 }}
    >
      <motion.div
        className="relative"
        style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      >
        {/* faint circuit pattern + glow behind the photo */}
        <div aria-hidden="true" className="absolute -inset-4 lg:-inset-8 rounded-[2.5rem] circuit-pattern opacity-70" />
        <div aria-hidden="true" className="absolute inset-6 rounded-full bg-brand-orange/20 blur-3xl" />

        {/* photo frame (fixed ratio = no layout shift) */}
        <div className="relative aspect-[16/10] lg:aspect-[5/4] overflow-hidden rounded-[2rem] ring-1 ring-white/25 shadow-[0_30px_60px_-20px_rgba(4,12,40,0.8)]">
          <img
            src="/images/stock/hero-children-building-robots.jpg"
            alt="Three children building a small red robot together at a table"
            width="1000"
            height="800"
            decoding="async"
            fetchpriority="high"
            className="h-full w-full object-cover"
          />
          {/* dark-blue overlay for depth and text-free contrast */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/70 via-brand-blue-dark/10 to-brand-blue/25" />
        </div>

        {cards.map((c) => (
          <FloatCard key={c.pos} {...c} sx={sx} sy={sy} float={float} tilt={tilt} />
        ))}
      </motion.div>
    </div>
  );
};

export default HeroVisual;
