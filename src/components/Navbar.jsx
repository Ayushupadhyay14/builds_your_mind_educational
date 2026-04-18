import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Education Kits & Workshops",
      children: [
        { name: "All Products", path: "/products" },
        { name: "Workshops", path: "/workshops" },
        { name: "OEM Services", path: "/oem-services" },
        { name: "ODM Services", path: "/odm-services" },
      ],
    },
    { name: "Home Tuition", path: "/home-tuition" },
    {
      name: "For Schools / Partners",
      children: [
        { name: "For Schools", path: "/for-schools" },
        { name: "Distributor Program", path: "/distributor-program" },
        { name: "Retailer Program", path: "/retailer-program" },
      ],
    },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isChildActive = (children) =>
    children?.some((child) => location.pathname === child.path);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-brand-blue"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="/logo.svg"
              alt="Builds Your Mind Logo"
              className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <span
                className={`font-display font-bold text-lg lg:text-xl ${scrolled ? "text-brand-blue" : "text-white"}`}
              >
                Builds Your Mind
              </span>
              <p
                className={`text-[10px] -mt-1 ${scrolled ? "text-gray-500" : "text-white/70"}`}
              >
                by Harmono Pvt. Ltd.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.name} className="relative group">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                      isChildActive(link.children)
                        ? scrolled
                          ? "text-brand-blue bg-blue-50"
                          : "text-white bg-white/20"
                        : scrolled
                          ? "text-gray-700 hover:text-brand-blue hover:bg-blue-50"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                    <FiChevronDown
                      className="transition-transform group-hover:rotate-180"
                      size={14}
                    />
                  </button>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-xl py-2 min-w-[200px] border border-gray-100">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            location.pathname === child.path
                              ? "text-brand-blue bg-blue-50"
                              : "text-gray-700 hover:text-brand-blue hover:bg-blue-50"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                    location.pathname === link.path
                      ? scrolled
                        ? "text-brand-blue bg-blue-50"
                        : "text-white bg-white/20"
                      : scrolled
                        ? "text-gray-700 hover:text-brand-blue hover:bg-blue-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              className="ml-3 btn-primary text-sm !px-5 !py-2.5"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`xl:hidden p-2 rounded-lg transition-colors ${scrolled ? "hover:bg-blue-50" : "hover:bg-white/10"}`}
          >
            {isOpen ? (
              <FiX
                size={24}
                className={scrolled ? "text-brand-blue" : "text-white"}
              />
            ) : (
              <FiMenu
                size={24}
                className={scrolled ? "text-brand-blue" : "text-white"}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-t max-h-[80vh] overflow-y-auto"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.name ? null : link.name,
                        )
                      }
                      className="flex items-center justify-between w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50"
                    >
                      {link.name}
                      <FiChevronDown
                        className={`transition-transform ${openDropdown === link.name ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-4 py-2.5 text-sm text-gray-600 hover:text-brand-blue rounded-lg"
                            >
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
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? "text-brand-blue bg-blue-50"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ),
              )}
              <div className="pt-4">
                <Link to="/contact" className="btn-primary w-full text-center">
                  Apply Now
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
