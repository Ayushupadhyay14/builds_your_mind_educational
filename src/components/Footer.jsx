import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaGraduationCap,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { subscribeNewsletter } from "../services/api";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  EMAIL,
  EMAIL_HREF,
  ADDRESS_DISPLAY,
  SOCIAL_PROFILES,
} from "../config/contact";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribeNewsletter(email);
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.email?.[0] || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Subtle background tech circuit */}
      <div aria-hidden="true" className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />

      {/* Newsletter */}
      <div className="border-b border-white/10 relative z-10">
        <div className="container-custom py-8 sm:py-12">
          <div className="glass-card bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-8">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                Stay Ahead in STEM
              </div>
              <h3 className="text-xl sm:text-3xl font-display font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md">
                Get updates on new robotics products, AI workshops and STEM school curriculum in Madhya Pradesh.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your institutional email"
                className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-l-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 min-w-0 text-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="Subscribe"
                className="px-4 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-brand-orange-deep to-brand-orange text-white font-bold rounded-r-full hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 flex items-center justify-center flex-shrink-0"
              >
                {loading ? "..." : <FiSend size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-10 sm:py-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.5fr] gap-x-4 gap-y-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              to="/"
              aria-label="Builds Your Mind, go to home page"
              className="flex items-center gap-3 mb-4 sm:mb-6 group"
            >
              <span className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                <img src="/logo-mark.png" alt="" width="32" height="38" className="h-9 w-auto" />
              </span>
              <span className="flex flex-col justify-center leading-tight">
                <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Builds Your Mind
                </span>
                <span className="text-xs text-slate-400">by Harmono Pvt. Ltd.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-sm">
              Hands-on STEM innovation partner in Indore for schools, colleges and universities — Robotics, AI, IoT, and DIY Science Kits.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_PROFILES.map(({ label, href }) => {
                const Icon = label === "LinkedIn" ? FaLinkedinIn : FaInstagram;
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Builds Your Mind on ${label}`}
                    className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:scale-110 transition-all text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-wide uppercase mb-3 sm:mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Quick Links
            </h4>
            <ul className="space-y-0.5 sm:space-y-1.5 text-xs sm:text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "STEM Workshops", path: "/stem-workshops-schools-indore" },
                { name: "About Us", path: "/about" },
                {
                  name: "STEM in Madhya Pradesh",
                  path: "/stem-education-madhya-pradesh",
                },
                { name: "Photo Gallery", path: "/gallery" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-amber-400 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Business */}
          <div className="min-w-0">
            <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-wide uppercase mb-3 sm:mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              For Business
            </h4>
            <ul className="space-y-0.5 sm:space-y-1.5 text-xs sm:text-sm">
              {[
                { name: "For Schools", path: "/for-schools" },
                { name: "OEM Services", path: "/oem-services" },
                { name: "ODM Services", path: "/odm-services" },
                { name: "Distributor Program", path: "/distributor-program" },
                { name: "Retailer Program", path: "/retailer-program" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-amber-400 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1 min-w-0">
            <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-wide uppercase mb-3 sm:mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Contact Us
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <a
                  href={EMAIL_HREF}
                  className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange/40 hover:bg-white/10 transition-all group"
                >
                  <span className="w-9 h-9 rounded-xl bg-orange-500/10 text-brand-orange flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <FiMail size={16} />
                  </span>
                  <span className="text-slate-300 group-hover:text-amber-300 transition-colors min-w-0 break-all text-xs sm:text-sm font-medium">
                    {EMAIL}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange/40 hover:bg-white/10 transition-all group"
                >
                  <span className="w-9 h-9 rounded-xl bg-orange-500/10 text-brand-orange flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <FiPhone size={16} />
                  </span>
                  <span className="text-slate-300 group-hover:text-amber-300 transition-colors text-xs sm:text-sm font-medium">
                    {PHONE_DISPLAY}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/20 transition-all group"
                >
                  <span className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <FaWhatsapp size={18} />
                  </span>
                  <span className="text-emerald-300 group-hover:text-white transition-colors text-xs sm:text-sm font-bold">
                    Direct WhatsApp
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <FiMapPin size={16} />
                  </span>
                  <span className="text-slate-400 text-xs min-w-0 break-words">
                    {ADDRESS_DISPLAY}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-custom py-5 sm:py-6 pb-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Harmono Pvt. Ltd. · Builds Your Mind.
              All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs sm:text-sm text-slate-400">
              <Link
                to="/privacy"
                className="hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
