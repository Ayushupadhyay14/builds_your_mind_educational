import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

import {
  FaGraduationCap,
  FaRecycle,
  FaChild,
  FaBox,
  FaCogs,
  FaHandshake,
  FaStore,
  FaArrowRight,
  FaStar,
  FaLightbulb,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaMapMarkerAlt,
  FaBookOpen,
} from "react-icons/fa";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { getTestimonials } from "../services/api";
import { getProducts, getCategories } from "../services/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Home = () => {
  const ecoFeatures = [
    {
      icon: FaRecycle,
      title: "Recyclable Materials",
      desc: "Use of recyclable and sustainable materials",
    },
    {
      icon: FaLightbulb,
      title: "Minimal Plastic",
      desc: "Minimal plastic usage in all products",
    },
    {
      icon: FaChild,
      title: "Safe for Children",
      desc: "Non-toxic and child-safe components",
    },
    {
      icon: FaBox,
      title: "Eco Packaging",
      desc: "Environment-friendly packaging",
    },
  ];

  const products = [
    {
      name: "STEM Learning Kits",
      desc: "Hands-on science, technology, engineering & math kits",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
      color: "from-brand-blue to-primary-500",
    },
    {
      name: "Robotics Kits",
      desc: "Build and program your own robots",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
      color: "from-brand-orange to-amber-500",
    },
    {
      name: "IoT & Electronics Kits",
      desc: "Learn electronics through practical experiments",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Science & Creative Kits",
      desc: "Creative kits for cognitive development",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const services = [
    {
      icon: FaCogs,
      title: "OEM / ODM Services",
      desc: "Launch educational kits under your own brand or get end-to-end product development.",
      link: "/oem-services",
      features: ["Bulk Manufacturing", "Product Design", "Custom Packaging"],
    },
    {
      icon: FaGraduationCap,
      title: "School Workshops",
      desc: "Interactive STEM, Robotics & Science workshops for schools and colleges.",
      link: "/workshops",
      features: ["STEM Workshops", "Robotics Sessions", "IoT Training"],
    },
    {
      icon: FaHandshake,
      title: "Partner Programs",
      desc: "Become a distributor or retailer with area-wise rights and marketing support.",
      link: "/for-schools",
      features: ["Area Rights", "Marketing Support", "Attractive Margins"],
    },
    {
      icon: FaStore,
      title: "Bulk Orders (B2B)",
      desc: "Special pricing for schools, institutions, and businesses for bulk purchases.",
      link: "/contact",
      features: ["School Pricing", "Institutional Orders", "Custom Kits"],
    },
  ];

  const tuitionFeatures = [
    {
      icon: FaChalkboardTeacher,
      title: "Verified Teachers",
      desc: "All teachers are thoroughly verified and trained",
    },
    {
      icon: FaBookOpen,
      title: "Subject-wise Matching",
      desc: "Get matched with the right teacher for every subject",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location Based",
      desc: "Teachers near your area for convenient scheduling",
    },
    {
      icon: FaUserGraduate,
      title: "All Classes",
      desc: "From Nursery to Class 12 - all boards covered",
    },
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials();

        console.log("Testimonials API response:", response.data);

        // ✅ correct array
        setTestimonials(response.data.results || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Builds Your Mind | Eco-Friendly Educational Kits & Home Tuition
          Services
        </title>
        <meta
          name="description"
          content="Builds Your Mind offers eco-friendly educational kits for STEM, Robotics, IoT, Science and home tuition services. By Harmono Pvt. Ltd."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95"></div>
        <div className="absolute inset-0 brand-pattern"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 text-brand-orange/30 hidden md:block"
        >
          <FaGraduationCap size={80} />
        </motion.div>

        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <FaGraduationCap className="text-brand-orange" />
                <span className="text-white/90 text-sm font-medium">
                  Education Kits • Home Tuition • Workshops
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
              >
                Smart, Eco-Friendly Learning Kits and{" "}
                <span className="text-brand-orange">Classroom </span> Solutions
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-blue-100/90 mb-8 max-w-xl"
              >
                Made in India | For Schools, Students & Future-Ready Education
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange-dark transition-all hover:shadow-xl"
                >
                  View Educational Kits <FiArrowRight />
                </Link>
                <Link
                  to="/home-tuition"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Apply for Tuition
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-12 flex items-center gap-6 sm:gap-8 flex-wrap"
              >
                {[
                  { num: "100+", label: "Schools" },
                  { num: "50+", label: "Products" },
                  { num: "50+", label: "Teachers" },
                  { num: "100%", label: "Eco-Friendly" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                      {s.num}
                    </div>
                    <div className="text-blue-200/70 text-sm">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/30 to-white/20 rounded-[3rem] rotate-6"></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-[3rem] -rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600"
                  alt="Educational Kits"
                  className="relative rounded-[2.5rem] w-full h-full object-cover shadow-2xl"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaGraduationCap className="text-brand-blue text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-blue">
                        Eco-Friendly
                      </div>
                      <div className="text-sm text-gray-500">
                        100% Sustainable
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -right-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <FaChalkboardTeacher className="text-brand-orange text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        Home Tuition
                      </div>
                      <div className="text-sm text-gray-500">
                        Verified Teachers
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0V120Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* Two Modes Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1 bg-blue-100 text-brand-blue text-sm font-medium rounded-full mb-4"
            >
              Our Two Modes
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              What We Offer
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Two powerful platforms designed to serve education and learning
              needs
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mode 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8 border-2 border-transparent hover:border-brand-blue transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors">
                <FaGraduationCap className="text-3xl text-brand-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-2xl text-brand-blue mb-3">
                Education Kits & Workshops
              </h3>
              <p className="text-brand-gray-light mb-4">
                B2B + B2C educational products and institutional services
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "STEM, Robotics, IoT, Science kits",
                  "Products for Play Schools to Colleges",
                  "Online store & bulk order system",
                  "Workshop booking for schools",
                  "OEM / ODM manufacturing",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <FiCheck className="text-brand-orange flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-brand-blue font-medium hover:gap-3 transition-all"
              >
                Explore Products <FiArrowRight />
              </Link>
            </motion.div>

            {/* Mode 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8 border-2 border-transparent hover:border-brand-orange transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
                <FaChalkboardTeacher className="text-3xl text-brand-orange group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-2xl text-brand-blue mb-3">
                Home Tuition Services
              </h3>
              <p className="text-brand-gray-light mb-4">
                Complete home tuition management platform
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Parents apply online for tutors",
                  "Verified & trained teacher profiles",
                  "Subject-wise & location matching",
                  "Teacher registration & dashboard",
                  "Schedule & performance tracking",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <FiCheck className="text-brand-orange flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/home-tuition"
                className="inline-flex items-center gap-2 text-brand-blue font-medium hover:gap-3 transition-all"
              >
                Apply for Tuition <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eco-Friendly Section */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1 bg-blue-100 text-brand-blue text-sm font-medium rounded-full mb-4"
            >
              Our Commitment
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              Eco-Friendly by Design
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Sustainable educational products safe for children and kind to our
              planet.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {ecoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card p-6 md:p-8 text-center group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-brand-blue transition-all duration-300">
                  <feature.icon className="text-2xl md:text-3xl text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-base md:text-xl text-brand-blue mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6"
          >
            <div>
              <motion.span
                variants={fadeInUp}
                className="inline-block px-4 py-1 bg-blue-100 text-brand-blue text-sm font-medium rounded-full mb-4"
              >
                Mode 1
              </motion.span>
              <motion.h2 variants={fadeInUp} className="section-title mb-4">
                Educational Kits
              </motion.h2>
              <motion.p variants={fadeInUp} className="section-subtitle">
                For Play Schools, Schools, Colleges & Parents
              </motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Link to="/products" className="btn-secondary whitespace-nowrap">
                View All Products <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-70 group-hover:opacity-80 transition-opacity`}
                ></div>
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end text-white">
                  <h3 className="font-display font-bold text-base md:text-xl mb-1 md:mb-2">
                    {product.name}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">
                    {product.desc}
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Explore <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Home Tuition Section */}
      <section className="py-20 gradient-brand relative overflow-hidden">
        <div className="absolute inset-0 brand-pattern opacity-20"></div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block px-4 py-1 bg-white/10 text-blue-100 text-sm font-medium rounded-full mb-4"
              >
                Mode 2
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6"
              >
                Home Tuition <span className="text-brand-orange">Services</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-blue-100/90 text-lg mb-8"
              >
                Find verified, trained home tutors near you. Simple online
                application, subject-wise matching, and complete teacher
                management.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {tuitionFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  >
                    <f.icon className="text-brand-orange text-xl mb-2" />
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {f.title}
                    </h4>
                    <p className="text-blue-200/70 text-xs">{f.desc}</p>
                  </div>
                ))}
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/home-tuition"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-blue font-semibold rounded-full hover:bg-blue-100 transition-all"
                >
                  Apply for Tuition <FiArrowRight />
                </Link>
                <Link
                  to="/home-tuition"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Register as Teacher
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
                  alt="Home Tuition"
                  className="rounded-3xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FiCheck className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        Verified Teachers
                      </div>
                      <div className="text-sm text-gray-500">
                        Background Checked
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1 bg-brand-blue text-white text-sm font-medium rounded-full mb-4"
            >
              Business Solutions
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              Partner With Us
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              OEM/ODM services, workshops, distribution, and more.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6 md:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card p-6 md:p-8 group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue transition-colors">
                    <service.icon className="text-xl md:text-2xl text-brand-blue group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-lg md:text-xl text-brand-blue mb-2 md:mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-4">
                      {service.desc}
                    </p>
                    <ul className="space-y-2 mb-4 md:mb-6">
                      {service.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <FiCheck className="text-brand-orange flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 text-brand-blue font-medium hover:gap-3 transition-all text-sm md:text-base"
                    >
                      Learn More <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1 bg-blue-100 text-brand-blue text-sm font-medium rounded-full mb-4"
            >
              Testimonials
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              What People Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {Array.isArray(testimonials) &&
              testimonials.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="card p-6 md:p-8"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} className="text-brand-orange" />
                    ))}
                  </div>

                  <p className="text-gray-600 mb-6 italic">"{item.content}"</p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center font-semibold text-brand-blue">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-blue">
                        {item.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {item.role_label || item.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-100 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="section-title mb-4">Ready to Get Started?</h2>
              <p className="section-subtitle mx-auto mb-8">
                Whether you need educational kits, home tuition, or business
                partnership — we're here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Contact Us <FiArrowRight className="ml-2" />
                </Link>
                <Link to="/products" className="btn-secondary">
                  Browse Products
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
