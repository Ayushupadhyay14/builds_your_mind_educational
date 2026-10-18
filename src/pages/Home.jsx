import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaFlask,
  FaCogs,
  FaLayerGroup,
  FaHandshake,
  FaRobot,
  FaMicrochip,
  FaWifi,
  FaCode,
  FaClipboardCheck,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import EnquiryForm from "../components/EnquiryForm";
import { ParallaxLayer } from '../components/Parallax';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Content comes from copy already on the site. No statistics, names or quotes.
const whatWeDo = [
  {
    icon: FaFlask,
    title: "Workshops",
    desc: "Hands-on STEM education sessions run at your institution, matched to your class groups.",
    to: "/stem-workshops-schools-indore",
  },
  {
    icon: FaCogs,
    title: "STEM Lab Setup",
    desc: "Planning support before you set up a lab, and guidance for the teachers running sessions.",
    to: "/stem-lab-setup-schools-indore",
  },
  {
    icon: FaLayerGroup,
    title: "School STEM Programme",
    desc: "A programme that grows across the academic year, with activities matched to each class group.",
    to: "/school-stem-programme-indore",
  },
  {
    icon: FaHandshake,
    title: "Partnership & MOU",
    desc: "We start with a workshop and plan a programme around your academic goals.",
    to: "/stem-partnership-mou",
  },
];

const workshops = [
  {
    title: "STEM & Science",
    desc: "Practical science and engineering activities students build themselves.",
    to: "/stem-workshops-schools-indore",
    icon: FaFlask,
  },
  {
    title: "Robotics",
    desc: "Build and test simple robots, then learn how the parts work together.",
    to: "/robotics-workshops-schools-indore",
    icon: FaRobot,
  },
  {
    title: "AI & Coding",
    desc: "Introductory sessions on how AI works and how to write first programs.",
    to: "/ai-workshops-schools",
    icon: FaCode,
  },
  {
    title: "IoT",
    desc: "Sensors and connected devices explained through small, working projects.",
    to: "/iot-workshops-schools",
    icon: FaWifi,
  },
];

const steps = [
  {
    title: "Send an enquiry",
    desc: "Tell us your institution, the class groups and the dates that suit you.",
  },
  {
    title: "Plan with an advisor",
    desc: "A programme advisor gets back to you to discuss dates, class groups and what the session would cover.",
  },
  {
    title: "Run the session",
    desc: "Students build, test and solve real problems at your institution.",
  },
];

const Eyebrow = ({ children }) => (
  <motion.span
    variants={fadeInUp}
    className="inline-block px-4 py-1 bg-blue-100 text-brand-blue text-sm font-medium rounded-full mb-4"
  >
    {children}
  </motion.span>
);

// One header pattern for every section: left-aligned, same width and spacing.
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

    {/* Hero */}
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
      <div className="absolute inset-0 gradient-brand"></div>
      <ParallaxLayer className="brand-pattern" />
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-7"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
            >
              STEM Education & Innovation Partner for Schools, Colleges &
              Institutions in <span className="text-brand-orange">Indore</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100/90 mb-8 max-w-xl"
            >
              Builds Your Mind is a STEM education company in Indore. We bring
              hands-on STEM education to schools, colleges and universities, and
              supply eco-friendly educational kits for classrooms and homes.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#enquiry" className="btn-primary">
                Book a Workshop <FiArrowRight className="ml-2" />
              </a>
              <Link
                to="/stem-workshops-schools-indore"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white border-2 border-white/40 rounded-full hover:bg-white/10 transition-colors"
              >
                See Our Workshops
              </Link>
            </motion.div>
          </motion.div>

          {/* Decorative icon panel (no text, no invented content) */}
          <div
            className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-6"
            aria-hidden="true"
          >
            {[FaRobot, FaMicrochip, FaWifi, FaCode].map((Icon, i) => (
              <div
                key={i}
                className="aspect-square rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center"
              >
                <Icon className="text-5xl text-white/90" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* What We Do */}
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <SectionHead eyebrow="For Schools & Colleges" title="What We Do">
          STEM education in Indore, built around doing: students make
          something and test it in every session.
        </SectionHead>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className={cardGrid}
        >
          {whatWeDo.map(({ icon: Icon, title, desc, to }) => (
            <motion.div key={title} variants={fadeInUp} className="h-full">
              <Link
                to={to}
                className="card h-full p-8 flex flex-col group border-2 border-transparent hover:border-brand-blue"
              >
                <span className="w-14 h-14 rounded-2xl bg-blue-100 text-brand-blue flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <Icon className="text-2xl" />
                </span>
                <h3 className="font-display font-bold text-xl text-brand-blue mb-3">
                  {title}
                </h3>
                <p className="text-brand-gray-light mb-6 flex-grow">{desc}</p>
                <FiArrowRight className="text-brand-orange text-xl group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Workshops */}
    <section className="py-20 lg:py-28 bg-brand-cream">
      <div className="container-custom">
        <SectionHead eyebrow="Workshops" title="Workshops">
          Hands-on STEM education sessions run at your institution. Students
          build, test and solve real problems with robotics, AI, IoT and coding.
        </SectionHead>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className={cardGrid}
        >
          {workshops.map(({ icon: Icon, title, desc, to }) => (
            <motion.div key={title} variants={fadeInUp} className="h-full">
              <Link
                to={to}
                className="card h-full p-8 flex flex-col group"
              >
                <Icon className="text-3xl text-brand-orange mb-6" />
                <h3 className="font-display font-bold text-xl text-brand-blue mb-3">
                  {title}
                </h3>
                <p className="text-brand-gray-light mb-6 flex-grow">{desc}</p>
                <FiArrowRight className="text-brand-orange text-xl group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <SectionHead eyebrow="Simple Process" title="How It Works" />
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 md:gap-8 md:grid-cols-3 items-stretch"
        >
          {steps.map((step, i) => (
            <motion.li key={step.title} variants={fadeInUp} className="h-full">
              <div className="card h-full p-8 border-t-4 border-brand-orange">
                <span className="w-12 h-12 rounded-full bg-brand-blue text-white font-display font-bold text-xl flex items-center justify-center mb-6">
                  {i + 1}
                </span>
                <h3 className="font-display font-bold text-xl text-brand-blue mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-gray-light">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>

    {/* Proof */}
    <section className="py-20 lg:py-28 bg-brand-cream">
      <div className="container-custom">
        <SectionHead eyebrow="Real Work Only" title="Case Studies">
          We publish case studies only from real, completed work, with the
          school's or institution's permission. We do not use invented or
          borrowed examples.
        </SectionHead>
        <div className="card p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <span className="w-14 h-14 rounded-2xl bg-blue-100 text-brand-blue flex items-center justify-center flex-shrink-0">
            <FaClipboardCheck className="text-2xl" />
          </span>
          <p className="text-brand-gray-light flex-grow">
            As our workshops and programmes are completed, verified case studies
            will appear here.
          </p>
          <Link to="/case-studies" className="btn-outline flex-shrink-0">
            Case Studies <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>

    {/* Enquiry form */}
    <section id="enquiry" className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <SectionHead title="Invite Us to Your Institution">
          Share your institution details and a programme advisor will get back
          to you. You can also reach us on WhatsApp.
        </SectionHead>
        <div className="max-w-4xl">
          <EnquiryForm source="/" />
        </div>
      </div>
    </section>
  </>
);

export default Home;
