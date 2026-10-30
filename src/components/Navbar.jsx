import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_DISPLAY, PHONE_HREF } from "../config/contact";

// Inline SVG icon set (24x24, stroke). Keeps the header free of icon-font/image requests.
const ICONS = {
  phone:
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.5c.9.300 1.800.600 2.800.700a2 2 0 0 1 1.700 2z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  chevron: "M6 9l6 6 6-6",
  home: "M3 10.500 12 3l9 7.500V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  flask: "M9 3h6M10 3v6L5 19a1.500 1.500 0 0 0 1.300 2h11.400A1.500 1.500 0 0 0 19 19l-5-10V3M7.500 15h9",
  robot: "M12 3v3M7 8h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM9 13h.01M15 13h.01M9.500 17h5",
  chip: "M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4",
  wifi: "M2 9a15 15 0 0 1 20 0M5.500 12.500a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0M12 19.500h.01",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.500l9 5 9-5",
  cap: "M2 9l10-5 10 5-10 5zM6 11.500V16c0 1.500 2.700 3 6 3s6-1.500 6-3v-4.500",
  handshake: "M3 12l4-4 4 2 3-2 4 3 3-1M3 12l5 5a2 2 0 0 0 3 0l1-1M12 16l2 2a2 2 0 0 0 3 0l4-4",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  box: "M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v9",
  school: "M3 21h18M5 21V10l7-5 7 5v11M10 21v-6h4v6",
  truck: "M2 6h12v10H2zM14 10h4l4 3v3h-8M6.500 19a1.500 1.500 0 1 0 0-3 1.500 1.500 0 0 0 0 3zM17.500 19a1.500 1.500 0 1 0 0-3 1.500 1.500 0 0 0 0 3z",
  store: "M3 9l2-5h14l2 5M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v8h14v-8M10 20v-5h4v5",
  tool: "M14.500 6.500a4 4 0 0 0-5 5L3 18l3 3 6.500-6.500a4 4 0 0 0 5-5l-2.500 2.500-2.500-.500-.500-2.500z",
  pen: "M4 20h4L19 9a2.800 2.800 0 0 0-4-4L4 16z M13.500 6.500l4 4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9.500h.01",
  doc: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v6M12 7.500h.01",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
};

const Icon = ({ name, size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`flex-shrink-0 ${className}`}
  >
    <path d={ICONS[name]} />
  </svg>
);

// Only pages that exist as routes in App.jsx.
const navLinks = [
  { name: "Home", path: "/", icon: "home" },
  {
    name: "Workshops",
    children: [
      { name: "STEM Workshops", path: "/stem-workshops-schools-indore", icon: "flask" },
      { name: "Robotics Workshops", path: "/robotics-workshops-schools-indore", icon: "robot" },
      { name: "AI Workshops", path: "/ai-workshops-schools", icon: "chip" },
      { name: "IoT Workshops", path: "/iot-workshops-schools", icon: "wifi" },
      { name: "Coding Workshops", path: "/coding-workshops-schools", icon: "code" },
    ],
  },
  {
    name: "School Programmes",
    children: [
      { name: "STEM Lab Setup", path: "/stem-lab-setup-schools-indore", icon: "flask" },
      { name: "School STEM Programme", path: "/school-stem-programme-indore", icon: "layers" },
      { name: "College & University Workshops", path: "/college-university-workshops-indore", icon: "cap" },
      { name: "Partnership & MOU", path: "/stem-partnership-mou", icon: "handshake" },
    ],
  },
  { name: "About Us", path: "/about", icon: "info" },
  { name: "Contact", path: "/contact", icon: "mail" },
  {
    name: "More",
    children: [
      { name: "All Products", path: "/products", icon: "box" },
      { name: "For Schools", path: "/for-schools", icon: "school" },
      { name: "Distributor Program", path: "/distributor-program", icon: "truck" },
      { name: "Retailer Program", path: "/retailer-program", icon: "store" },
      { name: "OEM Services", path: "/oem-services", icon: "tool" },
      { name: "ODM Services", path: "/odm-services", icon: "pen" },
      { name: "Case Studies", path: "/case-studies", icon: "image" },
      { name: "Photo Gallery", path: "/gallery", icon: "image" },
      { name: "Blog", path: "/blog", icon: "doc" },
    ],
  },
];

const pill =
  "flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors";
const pillIdle = "text-brand-blue hover:bg-white";
const pillActive = "bg-brand-blue text-white shadow-sm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown
  const [openGroup, setOpenGroup] = useState(null); // mobile accordion
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setOpenMenu(null);
    setOpenGroup(null);
  }, [location]);

  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isChildActive = (children) =>
    children?.some((child) => location.pathname === child.path);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_24px_-4px_rgba(30,58,138,0.06)] transition-all duration-300"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-20">
          {/* Logo: mark + name */}
          <Link
            to="/"
            aria-label="Builds Your Mind, go to home page"
            className="flex items-center gap-2 sm:gap-3 min-w-0 group"
          >
            <div className="relative">
              <img
                src="/logo-mark.png"
                alt=""
                width="39"
                height="48"
                className="h-10 sm:h-12 w-auto flex-shrink-0 transition-transform group-hover:scale-105 duration-300"
              />
            </div>
            <span className="flex flex-col justify-center leading-tight min-w-0">
              <span className="font-display font-bold text-base min-[360px]:text-xl text-brand-blue truncate tracking-tight group-hover:text-primary-600 transition-colors">
                Builds Your Mind
              </span>
              <span className="text-[10px] min-[360px]:text-xs text-slate-500 truncate font-medium">
                by Harmono Pvt. Ltd.
              </span>
            </span>
          </Link>

          {/* Desktop pill menu */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/80 backdrop-blur-md rounded-full border border-slate-200/50 shadow-inner">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.name)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openMenu === link.name}
                    onClick={() => setOpenMenu(openMenu === link.name ? null : link.name)}
                    className={`${pill} ${
                      isChildActive(link.children)
                        ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                        : "text-slate-700 hover:text-brand-blue hover:bg-white/80"
                    }`}
                  >
                    {link.name}
                    <Icon
                      name="chevron"
                      size={14}
                      className={`transition-transform duration-200 ${openMenu === link.name ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openMenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className={`absolute top-full pt-2 z-50 ${
                          link.name === "More" ? "right-0" : "left-0"
                        }`}
                      >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(30,58,138,0.12)] border border-slate-100 p-2.5 min-w-[270px]">
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                location.pathname === child.path
                                  ? "bg-gradient-to-r from-brand-blue to-primary-700 text-white shadow-sm"
                                  : "text-slate-700 hover:bg-blue-50/70 hover:text-brand-blue"
                              }`}
                            >
                              <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                location.pathname === child.path
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-100 text-slate-500 group-hover:bg-blue-100"
                              }`}>
                                <Icon name={child.icon} size={16} />
                              </span>
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={location.pathname === link.path ? "page" : undefined}
                  className={`${pill} ${
                    location.pathname === link.path
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                      : "text-slate-700 hover:text-brand-blue hover:bg-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>

          {/* Phone box + CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-full text-slate-700 font-semibold text-xs hover:border-brand-blue hover:text-brand-blue transition-all"
            >
              <span className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center">
                <Icon name="phone" size={12} className="text-brand-orange" />
              </span>
              {PHONE_DISPLAY}
            </a>
            <Link to="/contact?type=meeting" className="btn-primary text-xs !px-5 !py-2.5 font-bold shadow-md shadow-orange-500/20">
              Book a School Meeting
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="lg:hidden flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-2xl bg-slate-100 text-brand-blue hover:bg-blue-50 transition-colors"
          >
            <Icon name={isOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name}>
                    <button
                      type="button"
                      aria-expanded={openGroup === link.name}
                      onClick={() => setOpenGroup(openGroup === link.name ? null : link.name)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold ${
                        isChildActive(link.children)
                          ? "bg-blue-50 text-brand-blue"
                          : "text-brand-gray hover:bg-blue-50"
                      }`}
                    >
                      {link.name}
                      <Icon
                        name="chevron"
                        size={18}
                        className={`transition-transform ${openGroup === link.name ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openGroup === link.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pl-2"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                                location.pathname === child.path
                                  ? "bg-brand-blue text-white"
                                  : "text-brand-gray hover:bg-blue-50 hover:text-brand-blue"
                              }`}
                            >
                              <Icon name={child.icon} size={18} />
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${
                      location.pathname === link.path
                        ? "bg-brand-blue text-white"
                        : "text-brand-gray hover:bg-blue-50"
                    }`}
                  >
                    <Icon name={link.icon} size={18} />
                    {link.name}
                  </Link>
                ),
              )}
              <div className="pt-4 grid gap-3">
                <a
                  href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-100 rounded-xl text-brand-blue font-semibold"
                >
                  <Icon name="phone" size={18} className="text-brand-orange" />
                  {PHONE_DISPLAY}
                </a>
                <Link to="/contact?type=meeting" className="btn-primary w-full text-center">
                  Book a School Meeting
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
