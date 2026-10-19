import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaGraduationCap,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { subscribeNewsletter } from "../services/api";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "../config/contact";
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
    <footer className="bg-brand-blue text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-body font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-blue-200/80">
                Get updates on new products, workshops and STEM programmes.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-l-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:border-brand-orange min-w-0"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-brand-orange-deep text-white font-semibold rounded-r-full hover:bg-brand-orange-dark transition-colors disabled:opacity-50 flex-shrink-0"
              >
                {loading ? "..." : <FiSend size={20} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              to="/"
              aria-label="Builds Your Mind, go to home page"
              className="flex items-center gap-3 mb-6"
            >
              <span className="flex items-center justify-center h-14 w-14 rounded-full bg-white flex-shrink-0">
                <img src="/logo-mark.png" alt="" width="32" height="38" className="h-9 w-auto" />
              </span>
              <span className="flex flex-col justify-center leading-tight">
                <span className="font-display font-bold text-2xl">Builds Your Mind</span>
                <span className="text-sm text-blue-200/80">by Harmono Pvt. Ltd.</span>
              </span>
            </Link>
            <p className="text-blue-200/80 mb-6 max-w-sm">
              STEM education for schools and colleges — hands-on robotics, AI,
              coding and IoT workshops, and STEM lab setup.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                FaFacebookF,
                FaInstagram,
                FaLinkedinIn,
                FaYoutube,
                FaTwitter,
              ].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-lg mb-6">
              Quick Links
            </h4>
            <ul className="space-y-0">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "STEM Workshops", path: "/stem-workshops-schools-indore" },
                { name: "About Us", path: "/about" },
                {
                  name: "STEM Education in Madhya Pradesh",
                  path: "/stem-education-madhya-pradesh",
                },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blue-200/80 hover:text-brand-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h4 className="font-body font-semibold text-lg mb-6">
              For Business
            </h4>
            <ul className="space-y-0">
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
                    className="text-blue-200/80 hover:text-brand-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-lg mb-6">
              Contact Us
            </h4>
            <ul className="space-y-1">
              <li className="flex items-start gap-3">
                <FiMail className="text-brand-orange mt-1 flex-shrink-0" />
                <a
                  href="mailto:buildsyourmind@gmail.com"
                  className="text-blue-200/80 hover:text-brand-orange transition-colors break-words"
                >
                  buildsyourmind@gmail.com{" "}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-brand-orange mt-1 flex-shrink-0" />
                <a
                  href={PHONE_HREF}
                  className="text-blue-200/80 hover:text-brand-orange transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-brand-orange mt-1 flex-shrink-0" />
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200/80 hover:text-brand-orange transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-brand-orange mt-1 flex-shrink-0" />
                <span className="text-blue-200/80">
                  Harmono Pvt. Ltd., Indore, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-blue-200/80 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Harmono Pvt. Ltd. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-sm text-blue-200/80">
              <Link
                to="/privacy"
                className="hover:text-brand-orange transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-brand-orange transition-colors"
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
