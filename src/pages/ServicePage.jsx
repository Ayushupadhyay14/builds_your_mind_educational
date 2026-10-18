import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import EnquiryForm from '../components/EnquiryForm';
import { FiCheck, FiArrowRight, FiImage, FiMapPin } from 'react-icons/fi';
import {
  servicePages,
  serviceContact,
  serviceCaseStudies,
} from '../data/servicePages';
import { workshopPages } from '../data/workshopPages';

const programmeByPage = {
  P08: 'STEM Lab Setup & Programme',
  P09: 'School STEM Programme',
  P10: 'College / University Workshop',
  P11: 'STEM Partnership / MoU',
  P12: 'School STEM Programme',
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Maps a sheet page ID (P01-P15) to { name, path } so related links can be
// driven by IDs straight from the sheet's "Link To These Pages" column.
const pageRegistry = {
  P01: { name: 'Home', path: '/' },
  P02: { name: 'About Us', path: '/about' },
  P03: { name: workshopPages.P03.h1, path: workshopPages.P03.path },
  P04: { name: workshopPages.P04.h1, path: workshopPages.P04.path },
  P05: { name: workshopPages.P05.h1, path: workshopPages.P05.path },
  P06: { name: workshopPages.P06.h1, path: workshopPages.P06.path },
  P07: { name: workshopPages.P07.h1, path: workshopPages.P07.path },
  P08: { name: servicePages.P08.h1, path: servicePages.P08.path },
  P09: { name: servicePages.P09.h1, path: servicePages.P09.path },
  P10: { name: servicePages.P10.h1, path: servicePages.P10.path },
  P11: { name: servicePages.P11.h1, path: servicePages.P11.path },
  P12: { name: servicePages.P12.h1, path: servicePages.P12.path },
  P13: { name: 'Case Studies', path: '/case-studies' },
  P15: { name: 'Workshop Enquiry & Contact', path: '/contact' },
};

/**
 * Labelled photo spot.
 * Real photographs must be dropped in here before launch.
 * Stock images are deliberately NOT used.
 */
const PhotoSpot = ({ label, detail }) => (
  <div className="border-2 border-dashed border-brand-orange/60 bg-orange-50 rounded-2xl p-6 md:p-8 text-center">
    <FiImage className="mx-auto text-3xl text-brand-orange mb-3" />
    <p className="font-semibold text-brand-blue mb-2">{label}</p>
    <p className="text-gray-600 text-sm max-w-2xl mx-auto">{detail}</p>
    <p className="text-sm text-brand-orange-dark font-medium mt-3 uppercase tracking-wide">
      Placeholder — replace before launch
    </p>
  </div>
);

const ServicePage = ({ pageId }) => {
  const page = servicePages[pageId];

  if (!page) {
    return null;
  }

  const relatedLinks = page.related
    .map((id) => pageRegistry[id])
    .filter(Boolean);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
              {page.badge}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              {page.h1}
            </motion.h1>
            {page.intro.map((text, index) => (
              <motion.p
                key={index}
                variants={fadeInUp}
                className="text-lg md:text-xl text-blue-100/90 mb-4"
              >
                {text}
              </motion.p>
            ))}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
            >
              <a href="#enquiry" className="btn-primary">
                {page.button} <FiArrowRight className="ml-2" />
              </a>
              {page.altAction && (
                <a
                  href={page.altAction.to}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  {page.altAction.label}
                </a>
              )}
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

      {/* Photo spots */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid gap-6">
            {page.photoSpots.map((spot, index) => (
              <PhotoSpot key={index} label={spot.label} detail={spot.detail} />
            ))}
          </div>
        </div>
      </section>

      {/* Content sections */}
      {page.sections.map((section, index) => (
        <section
          key={section.heading}
          className={`py-20 ${index % 2 === 0 ? 'bg-brand-cream' : 'bg-white'}`}
        >
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
                {section.heading}
              </motion.h2>
              {section.body && (
                <motion.p
                  variants={fadeInUp}
                  className="section-subtitle mx-auto text-center mb-10"
                >
                  {section.body}
                </motion.p>
              )}

              {section.cities && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {section.cities.map((city) => (
                    <motion.div
                      key={city.name}
                      variants={fadeInUp}
                      className="card p-6"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FiMapPin className="text-brand-orange" />
                        <h3 className="font-display text-xl font-semibold text-brand-blue">
                          {city.name}
                        </h3>
                      </div>
                      <p className="text-gray-600">{city.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {section.items && (
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {section.items.map((item) => (
                    <motion.div
                      key={item}
                      variants={fadeInUp}
                      className="card p-6 flex items-start gap-3"
                    >
                      <FiCheck className="text-brand-orange flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {section.photoSlots && (
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  {page.photoSpots
                    .slice(0, section.photoSlots)
                    .map((spot, i) => (
                      <PhotoSpot
                        key={i}
                        label={spot.label}
                        detail={spot.detail}
                      />
                    ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      ))}

      {/* FAQs */}
      <section id="faqs" className="py-20 bg-white">
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
              FAQs
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="section-subtitle mx-auto text-center mb-10"
            >
              The questions institutions ask us most often before planning.
            </motion.p>

            <div className="space-y-6">
              {page.faqs.map((faq) => (
                <motion.div key={faq.q} variants={fadeInUp} className="card p-6">
                  <h3 className="font-display font-semibold text-lg text-brand-blue mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related pages */}
      <section id="other-workshops" className="py-20 bg-brand-cream">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              Related Pages
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="section-subtitle mx-auto mb-10"
            >
              These pages fit together if you are planning for an institution.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {relatedLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-5 py-3 bg-white rounded-full text-brand-blue font-medium hover:bg-brand-blue hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#enquiry" className="btn-primary">
                {page.button}
              </a>
              <a
                href={serviceCaseStudies}
                className="btn-secondary"
              >
                Case Studies <FiArrowRight className="ml-2" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Enquiry form (Technical Checklist #20-22) */}
      <section id="enquiry" className="py-20 bg-brand-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title mb-4 text-center">Send an Enquiry</h2>
            <p className="section-subtitle mx-auto text-center mb-10">
              Share your institution details and a programme advisor will get back
              to you. You can also reach us on WhatsApp.
            </p>
            <EnquiryForm defaultProgramme={programmeByPage[pageId]} source={page.path} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-brand">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Talk to Our Programme Team
            </h2>
            <p className="text-blue-100/90 text-lg mb-8 max-w-2xl mx-auto">
              Tell us your institution and the class groups you want to plan
              for. A programme advisor will get back to you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#enquiry" className="btn-primary">
                {page.button} <FiArrowRight className="ml-2" />
              </a>
              <a href={serviceCaseStudies} className="btn-secondary">
                Case Studies
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
