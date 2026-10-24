import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaFlask,
  FaCogs,
  FaLayerGroup,
  FaHandshake,
  FaRobot,
  FaWifi,
  FaCode,
  FaClipboardCheck,
  FaWhatsapp,
  FaStar,
} from "react-icons/fa";
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiClock,
  FiCheck,
  FiAward
} from "react-icons/fi";
import EnquiryForm from "../components/EnquiryForm";
import HeroVisual from "../components/HeroVisual";
import HeroEffects from "../components/HeroEffects";
import Testimonials from "../components/Testimonials";
import { ParallaxLayer } from '../components/Parallax';
import { WHATSAPP_HREF } from "../config/contact";
import { siteFacts } from "../data/siteFacts";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Content comes from copy already on the site. Preserving all verified details.
const whatWeDo = [
  {
    icon: FaFlask,
    title: "Workshops",
    tag: "Hands-on Sessions",
    desc: "Hands-on STEM education sessions run at your institution, matched to your class groups.",
    to: "/stem-workshops-schools-indore",
  },
  {
    icon: FaCogs,
    title: "STEM Lab Setup",
    tag: "Infrastructure & Training",
    desc: "Planning support before you set up a lab, and guidance for the teachers running sessions.",
    to: "/stem-lab-setup-schools-indore",
  },
  {
    icon: FaLayerGroup,
    title: "School STEM Programme",
    tag: "Annual Curriculum",
    desc: "A programme that grows across the academic year, with activities matched to each class group.",
    to: "/school-stem-programme-indore",
  },
  {
    icon: FaHandshake,
    title: "Partnership & MOU",
    tag: "Institutional MoU",
    desc: "We start with a workshop and plan a programme around your academic goals.",
    to: "/stem-partnership-mou",
  },
];

const workshops = [
  {
    title: "STEM & Science",
    tag: "Physics & Chemistry Builds",
    desc: "Practical science and engineering activities students build themselves.",
    to: "/stem-workshops-schools-indore",
    icon: FaFlask,
  },
  {
    title: "Robotics",
    tag: "Mechanisms & Electronics",
    desc: "Build and test simple robots, then learn how the parts work together.",
    to: "/robotics-workshops-schools-indore",
    icon: FaRobot,
  },
  {
    title: "AI & Coding",
    tag: "Logic & Program Design",
    desc: "Introductory sessions on how AI works and how to write first programs.",
    to: "/ai-workshops-schools",
    icon: FaCode,
  },
  {
    title: "IoT",
    tag: "Sensors & Smart Devices",
    desc: "Sensors and connected devices explained through small, working projects.",
    to: "/iot-workshops-schools",
    icon: FaWifi,
  },
];

const steps = [
  {
    step: "01",
    title: "Send an enquiry",
    desc: "Tell us your institution, the class groups and the dates that suit you.",
  },
  {
    step: "02",
    title: "Plan with an advisor",
    desc: "A programme advisor gets back to you to discuss dates, class groups and what the session would cover.",
  },
  {
    step: "03",
    title: "Run the session",
    desc: "Students build, test and solve real problems at your campus with guided support.",
  },
];

const Eyebrow = ({ children }) => (
  <motion.div
    variants={fadeInUp}
    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50/90 border border-blue-200/60 text-brand-blue text-xs font-bold tracking-wide uppercase rounded-full mb-4 shadow-sm"
  >
    <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
    <span>{children}</span>
  </motion.div>
);

// One header pattern for every section: left-aligned, clean rhythm.
const SectionHead = ({ eyebrow, title, children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={stagger}
    className="max-w-3xl mb-12 md:mb-16"
  >
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <motion.h2 variants={fadeInUp} className="section-title mb-4">
      {title}
    </motion.h2>
    {children && (
      <motion.p variants={fadeInUp} className="section-subtitle">
        {children}
      </motion.p>
    )}
  </motion.div>
);

const cardGrid = "grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch";

const Home = () => (
  <>
    <Helmet>
      <title>STEM Education Company in Indore | Builds Your Mind</title>
      <meta
        name="description"
        content="Builds Your Mind is a STEM education and innovation partner in Indore for schools, colleges and universities. Robotics, AI, coding and IoT workshops."
      />
    </Helmet>

    {/* Hero Section */}
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 gradient-brand" />
      {/* Dark overlay + faint circuit traces */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-brand-blue-dark/50 to-brand-blue-dark/70" />
      <div aria-hidden="true" className="absolute inset-0 circuit-pattern opacity-25" />
      <ParallaxLayer className="brand-pattern" />
      <HeroEffects />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-7"
          >
            {/* Tech announcement pill */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-amber-300 font-bold">⚡ Hands-on STEM Innovation</span>
                <span className="text-white/60 hidden sm:inline">•</span>
                <span className="text-blue-100 hidden sm:inline">Schools & Colleges in Indore</span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] text-white mb-6 [text-wrap:balance]"
            >
              Hands-On <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">STEM Learning</span> for Schools & Colleges in <span className="text-brand-orange underline decoration-brand-orange/40 decoration-wavy underline-offset-8">Indore</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-blue-100/90 mb-8 max-w-2xl leading-relaxed [text-wrap:balance]"
            >
              Builds Your Mind partners with schools and universities to turn science concepts into real, working creations. Every student builds, codes, and experiments directly with Robotics, AI, IoT, and DIY Science Kits.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8"
            >
              <a
                href="#enquiry"
                data-track="book_meeting_click"
                className="btn-primary shadow-glow-orange group !px-7 !py-3.5 font-bold"
              >
                Book a School Meeting{" "}
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/stem-workshops-schools-indore"
                data-track="explore_programs_click"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-white/10 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/20 hover:border-white/50 transition-all min-h-[44px]"
              >
                Explore Programs
              </Link>
              <Link
                to="/contact?type=quote"
                data-track="request_quote_click"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors min-h-[44px]"
              >
                Request a Quote <FiArrowRight className="text-xs" />
              </Link>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                className="inline-flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-semibold px-3 py-2 transition-colors"
              >
                <FaWhatsapp className="text-emerald-400 text-lg" />
                <span>Chat with Advisor</span>
              </a>
            </motion.div>

            {/* Trust Pill Bar */}
            <motion.div
              variants={fadeInUp}
              className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-blue-100/80 font-medium"
            >
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400 flex-shrink-0" />
                <span>100% Practical Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="text-amber-400 flex-shrink-0" />
                <span>Customised School Programmes</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <FaStar className="text-brand-orange flex-shrink-0 text-sm" />
                <span>Indore-based Programme Team</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>

    {/* Verified facts strip — no unverified counts */}
    <section className="border-y border-slate-100 bg-white">
      <div className="container-custom py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {siteFacts.map((fact) => (
            <div key={fact.label} className="text-center sm:text-left">
              <div className="text-3xl md:text-4xl font-display font-bold text-brand-blue">
                {fact.value}
              </div>
              <div className="text-sm font-semibold text-slate-700 mt-1">
                {fact.label}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {fact.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* What We Do */}
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="container-custom">
        <SectionHead eyebrow="For Schools & Colleges" title="What We Do">
          STEM education in Indore, built around doing: students make something, test it, and solve problems in every single session.
        </SectionHead>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className={cardGrid}
        >
          {whatWeDo.map(({ icon: Icon, title, tag, desc, to }) => (
            <motion.div key={title} variants={fadeInUp} className="h-full">
              <Link
                to={to}
                className="card h-full p-8 flex flex-col group border border-slate-100 hover:border-brand-blue/30 relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-6">
                  <span className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all shadow-sm">
                    <Icon className="text-2xl" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-brand-blue mb-3 group-hover:text-primary-600 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{desc}</p>
                <div className="flex items-center text-sm font-bold text-brand-orange gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <FiArrowRight />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Workshops */}
    <section className="py-20 lg:py-28 bg-slate-50/70 border-y border-slate-100">
      <div className="container-custom">
        <SectionHead eyebrow="Practical Modules" title="Workshops & Labs">
          Hands-on STEM education sessions run on your campus. Students build, test, and program with robotics, artificial intelligence, internet of things, and practical coding.
        </SectionHead>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className={cardGrid}
        >
          {workshops.map(({ icon: Icon, title, tag, desc, to }) => (
            <motion.div key={title} variants={fadeInUp} className="h-full">
              <Link
                to={to}
                className="card h-full p-8 flex flex-col group hover:border-brand-orange/30 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
                    <Icon className="text-2xl" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange bg-orange-50/80 px-2.5 py-1 rounded-md">
                    Hands-on
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-brand-blue mb-1 group-hover:text-brand-orange transition-colors">
                  {title}
                </h3>
                <span className="text-xs font-semibold text-slate-400 mb-3">{tag}</span>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{desc}</p>
                <div className="flex items-center text-sm font-bold text-brand-blue gap-1 group-hover:text-brand-orange group-hover:translate-x-1 transition-all">
                  <span>Explore module</span>
                  <FiArrowRight />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="container-custom">
        <SectionHead eyebrow="Simple 3-Step Process" title="How It Works">
          From first enquiry to hands-on session on campus, we keep coordination seamless and transparent for educators.
        </SectionHead>
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 md:gap-8 md:grid-cols-3 items-stretch relative"
        >
          {steps.map((step, i) => (
            <motion.li key={step.title} variants={fadeInUp} className="h-full">
              <div className="card h-full p-8 border-t-4 border-brand-orange hover:shadow-xl transition-all relative">
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue to-primary-600 text-white font-display font-bold text-lg flex items-center justify-center shadow-md shadow-brand-blue/20">
                    {step.step}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step {i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-brand-blue mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>

    {/* Real feedback only (renders nothing until verified testimonials exist) */}
    <Testimonials />

    {/* Proof / Real Work Only */}
    <section className="py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container-custom">
        <SectionHead eyebrow="Verified Work Only" title="Case Studies & Real Evidence">
          We publish case studies and pictures only from real, completed institutional work with permission. We do not use invented testimonials or borrowed figures.
        </SectionHead>
        <div className="glass-card bg-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 border border-slate-200 shadow-lg">
          <span className="w-16 h-16 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0 shadow-inner">
            <FaClipboardCheck className="text-3xl text-brand-blue" />
          </span>
          <div className="flex-grow">
            <h4 className="font-display font-bold text-lg text-brand-blue mb-1">
              Verified Documentation of Completed Sessions
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              As our workshops and long-term school programmes are completed in Indore, Ujjain, Dewas, and Dhar, verified documentation and case notes appear here.
            </p>
          </div>
          <Link to="/case-studies" className="btn-outline flex-shrink-0 font-bold">
            View Case Studies <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>

    {/* Enquiry form Section */}
    <section id="enquiry" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 circuit-pattern opacity-20 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-12 text-center mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 text-amber-300 text-xs font-bold tracking-wide uppercase rounded-full mb-4 border border-white/15">
            <FiAward className="text-brand-orange" /> Institutional Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Invite Us to Your Institution
          </h2>
          <p className="text-base sm:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            Share your institution details and our programme director will arrange a customized curriculum session plan for your school or college.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <EnquiryForm source="/" />
        </div>
      </div>
    </section>
  </>
);

export default Home;
