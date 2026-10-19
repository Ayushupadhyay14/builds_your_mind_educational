// Decorative hero background: glowing dots travelling along circuit traces,
// two soft glows drifting slowly, and the curved bottom edge.
// Pure CSS/SVG (SMIL animateMotion), no JS animation and no layout impact.
// The animated layer is hidden below 768px and for prefers-reduced-motion.
// The curved bottom edge is static and stays on every screen size.

const HeroEffects = () => (
  <>
    {/* Animated layer - off on phones and for reduced-motion (see .hero-fx in index.css) */}
    <div aria-hidden="true" className="hero-fx absolute inset-0 overflow-hidden pointer-events-none">
      {/* soft orange / light-blue glows drifting slowly */}
      <span className="hero-glow hero-glow-orange" />
      <span className="hero-glow hero-glow-blue" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="hero-dot-glow" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* circuit traces */}
        <g
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path id="hero-trace-1" d="M-40 96 H180 L240 156 H470 L520 106 H760 L820 166 H1080 L1140 106 H1300 L1360 166 H1480" />
          <path id="hero-trace-2" d="M-40 560 H150 L215 495 H420 L485 560 H700 L765 495 H980 L1045 560 H1240 L1305 495 H1480" />
          <path id="hero-trace-3" d="M96 -40 V130 L150 184 V300" />
          <path id="hero-trace-4" d="M1330 -40 V210 L1276 264 V420" />
        </g>

        {/* static circuit nodes */}
        <g fill="rgba(255,255,255,0.16)">
          <circle cx="240" cy="156" r="2" />
          <circle cx="820" cy="166" r="2" />
          <circle cx="1360" cy="166" r="2" />
          <circle cx="215" cy="495" r="2" />
          <circle cx="765" cy="495" r="2" />
          <circle cx="1305" cy="495" r="2" />
          <circle cx="150" cy="184" r="2" />
          <circle cx="1276" cy="264" r="2" />
        </g>

        {/* glowing dots travelling along the traces */}
        <g filter="url(#hero-dot-glow)">
          <circle r="2.4" fill="#BFDBFE">
            <animateMotion dur="20s" begin="-2s" repeatCount="indefinite" rotate="auto">
              <mpath href="#hero-trace-1" />
            </animateMotion>
          </circle>
          <circle r="2.2" fill="#FB923C">
            <animateMotion dur="26s" begin="-8s" repeatCount="indefinite" rotate="auto">
              <mpath href="#hero-trace-2" />
            </animateMotion>
          </circle>
          <circle r="2" fill="#BFDBFE">
            <animateMotion dur="16s" begin="-5s" repeatCount="indefinite" rotate="auto">
              <mpath href="#hero-trace-3" />
            </animateMotion>
          </circle>
          <circle r="2.2" fill="#FB923C">
            <animateMotion dur="22s" begin="-12s" repeatCount="indefinite" rotate="auto">
              <mpath href="#hero-trace-4" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>

    {/* curved bottom edge into the white section below */}
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1]">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[40px] w-full md:h-[64px]"
      >
        <path d="M0 90 L0 86 C 360 4 1080 4 1440 86 L1440 90 Z" fill="#FFFFFF" />
      </svg>
    </div>
  </>
);

export default HeroEffects;
