import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiCheck, FiArrowRight, FiFileText, FiUsers } from 'react-icons/fi';
import {
  blogPosts,
  RESERVED_OUTLINE_SLOTS,
  blogButton,
  blogLinks,
} from '../data/blogPosts';

// Dev-only scaffolding. Placeholder blocks never ship in the production build.
const showPlaceholders = import.meta.env.DEV;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/** One reserved outline slot (title only, coming from the Content Topic Bank). */
const OutlineSlot = ({ index }) => (
  <div className="border-2 border-dashed border-brand-orange/60 bg-orange-50 rounded-2xl p-6">
    <FiFileText className="text-3xl text-brand-orange mb-3" />
    <p className="font-semibold text-brand-blue mb-2">
      Blog Post {index} — Title To Come
    </p>
    <p className="text-gray-600 text-sm">
      Reserved outline slot {index} of {RESERVED_OUTLINE_SLOTS}. The title is
      taken from the Content Topic Bank and is NOT invented here. Paste it in{' '}
      <code>src/data/blogPosts.js</code>.
    </p>
    <p className="text-sm text-brand-orange-dark font-medium mt-3 uppercase tracking-wide">
      Empty slot — fill from the Content Topic Bank
    </p>
  </div>
);

const Blog = () => {
  const sections = [
    { heading: 'Guides for Principals' },
    { heading: 'Guides for Teachers' },
    { heading: 'Student Project Showcases' },
  ];

  return (
    <>
      <Helmet>
        <title>STEM &amp; Robotics Learning Blog | Builds Your Mind</title>
        <meta
          name="description"
          content="Articles on STEM, robotics, AI and IoT learning for schools. Guides for principals, teachers and institutions planning a STEM programme."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95"></div>
        <div className="absolute inset-0 brand-pattern"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1 bg-white/10 text-blue-100 text-sm font-medium rounded-full mb-6"
            >
              Articles &amp; Guides
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              STEM Education Articles for Schools and Colleges
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100/90 mb-4"
            >
              Articles for principals, teachers and institutions planning a
              STEM programme. The first posts are in preparation — no article
              is published until its title is confirmed from the Content Topic
              Bank.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
            >
              <Link to="/contact" className="btn-primary">
                {blogButton} <FiArrowRight className="ml-2" />
              </Link>
              <a
                href="/school-stem-programme-indore"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
              >
                See the School Programme
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0V120Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="section-title mb-4 text-center"
            >
              Latest Articles
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="section-subtitle mx-auto text-center mb-10"
            >
              Three outline slots are reserved. Titles come from the Content
              Topic Bank.
            </motion.p>

            {blogPosts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {blogPosts.map((post, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="card p-6"
                  >
                    <h3 className="font-display font-semibold text-lg text-brand-blue">
                      {post.title}
                    </h3>
                  </motion.div>
                ))}
              </div>
            ) : showPlaceholders ? (
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: RESERVED_OUTLINE_SLOTS }).map((_, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <OutlineSlot index={i + 1} />
                  </motion.div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </section>

      {/* Sections from the sheet */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-12"
          >
            {sections.map((sec) => (
              <motion.div key={sec.heading} variants={fadeInUp}>
                <h2 className="section-title mb-4 text-center md:text-left">
                  {sec.heading}
                </h2>
                <div className="card p-6 flex items-start gap-3">
                  <FiCheck className="text-brand-orange flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Articles for this section will be listed once their titles
                    are confirmed from the Content Topic Bank.
                  </p>
                </div>
              </motion.div>
            ))}
            <motion.div variants={fadeInUp}>
              <div className="card p-6 flex items-start gap-3">
                <FiUsers className="text-brand-orange flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  Student project showcases appear here once the matching{' '}
                  <Link
                    to="/case-studies"
                    className="inline-block py-3 -my-3 text-brand-blue underline underline-offset-4 hover:text-brand-orange-dark"
                  >
                    case studies
                  </Link>{' '}
                  are published with the institution's permission.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related pages */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="section-title mb-4"
            >
              Related Pages
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="section-subtitle mx-auto mb-10"
            >
              Articles link back to the programmes they describe.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {blogLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-5 py-3 bg-brand-cream rounded-full text-brand-blue font-medium hover:bg-brand-blue hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link to="/contact" className="btn-primary">
                {blogButton} <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blog;
