import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiCheck,
  FiArrowRight,
  FiImage,
  FiMapPin,
  FiUsers,
  FiPenTool,
} from 'react-icons/fi';
import {
  caseStudies,
  caseStudyTemplate,
  caseStudyButton,
  caseStudyLinks,
} from '../data/caseStudies';

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

/** Labelled empty field inside the template card. */
const EmptyField = ({ label, icon: Icon = FiPenTool }) => (
  <div className="border-2 border-dashed border-gray-300 rounded-xl p-5">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="text-brand-orange" />
      <p className="font-semibold text-brand-blue">{label}</p>
    </div>
    <p className="text-sm text-gray-500">
      To be filled — no content invented.
    </p>
  </div>
);

/** Labelled photo placeholder, consistent with the rest of the site. */
const PhotoSpot = ({ label, detail }) => (
  <div className="border-2 border-dashed border-brand-orange/60 bg-orange-50 rounded-2xl p-6 text-center">
    <FiImage className="mx-auto text-3xl text-brand-orange mb-3" />
    <p className="font-semibold text-brand-blue mb-2">{label}</p>
    <p className="text-gray-600 text-sm max-w-2xl mx-auto">{detail}</p>
    <p className="text-sm text-brand-orange-dark font-medium mt-3 uppercase tracking-wide">
      Placeholder — replace before launch
    </p>
  </div>
);

const CaseStudies = () => {
  const published = caseStudies.filter((cs) => cs.permissionGranted === true);

  return (
    <>
      <Helmet>
        <title>Case Studies | Builds Your Mind STEM Workshops</title>
        <meta
          name="description"
          content="Real workshops by Builds Your Mind at schools and universities: what students did, what they learned, with photos. Shared with permission."
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
              Real Workshops, Real Institutions
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              Case Studies: Real Workshops at Real Institutions
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100/90 mb-4"
            >
              Each case study below describes a real session: the institution,
              the city, the programme, what students did and what they learned.
              Nothing is published without the institution's written permission.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
            >
              <Link to="/contact" className="btn-primary">
                {caseStudyButton} <FiArrowRight className="ml-2" />
              </Link>
              <a
                href="/stem-workshops-schools-indore"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
              >
                See Our Workshops
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

      {/* Published case studies, or the honest empty state */}
      {published.length === 0 ? (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p className="text-lg text-gray-700">
                No case studies are published yet. A case study appears here
                only after a real, completed workshop and the institution's
                written permission.
              </p>
            </div>
            {/* Template card — dev only */}
            {showPlaceholders && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <div className="border-2 border-dashed border-brand-orange/60 bg-orange-50 rounded-2xl p-6 text-center mb-8">
                <p className="font-semibold text-brand-blue">
                  TEMPLATE ONLY — this card is not a real case study
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  It shows the exact structure to fill in{' '}
                  <code>src/data/caseStudies.js</code>. It will disappear once
                  real entries with permission are added.
                </p>
              </div>

              <div className="card p-6 md:p-10 space-y-10">
                <div>
                  <h2 className="section-subtitle mb-6 text-brand-blue">
                    Institution and City
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <EmptyField
                      icon={FiUsers}
                      label="Institution"
                    />
                    <EmptyField icon={FiMapPin} label="City" />
                  </div>
                </div>

                <div>
                  <h2 className="section-subtitle mb-6 text-brand-blue">
                    Programme Conducted
                  </h2>
                  <EmptyField label="Programme conducted" />
                </div>

                <div>
                  <h2 className="section-subtitle mb-6 text-brand-blue">
                    What Students Did
                  </h2>
                  <EmptyField label="What students did" />
                </div>

                <div>
                  <h2 className="section-subtitle mb-6 text-brand-blue">
                    What Students Learned
                  </h2>
                  <EmptyField label="What students learned" />
                </div>

                <div>
                  <h2 className="section-subtitle mb-6 text-brand-blue">
                    Photos
                  </h2>
                  <PhotoSpot
                    label="Real photo needed"
                    detail="Photos from the real workshop go here, with the school's permission. Do not use a stock image here."
                  />
                </div>

                <div>
                  <h2 className="section-subtitle mb-6 text-brand-blue">
                    Feedback (with permission)
                  </h2>
                  <EmptyField label="Feedback quote" />
                </div>
              </div>
            </motion.div>
            )}
          </div>
        </section>
      ) : (
        <section className="py-20 bg-white">
          <div className="container-custom max-w-4xl mx-auto space-y-8">
            {published.map((cs, idx) => (
              <motion.article
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="card p-6 md:p-10"
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-blue mb-2">
                  {cs.institution}
                </h2>
                <p className="flex items-center gap-2 text-gray-600 mb-6">
                  <FiMapPin className="text-brand-orange" /> {cs.city} ·{' '}
                  {cs.programme}
                </p>
                <div className="space-y-3 text-gray-700">
                  <p className="font-semibold">What students did</p>
                  <p>{cs.whatStudentsDid}</p>
                  <p className="font-semibold">What students learned</p>
                  <p>{cs.whatStudentsLearned}</p>
                </div>
                {cs.photos && cs.photos.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    {cs.photos.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`Workshop at ${cs.institution}`}
                        className="rounded-xl w-full object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  showPlaceholders && (<div className="mt-6">
                    <PhotoSpot
                      label="Real photo needed"
                      detail="Add the real photos from this session in src/data/caseStudies.js. Do not use a stock image here."
                    />
                  </div>)
                )}
                {cs.feedback && (
                  <div className="mt-6 border-l-4 border-brand-orange pl-4 italic text-gray-700">
                    <p>“{cs.feedback}”</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Shared with the institution's permission.
                    </p>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* How a case study gets published */}
      <section className="py-20 bg-brand-cream">
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
              How a Case Study Gets Published
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="section-subtitle mx-auto text-center mb-10"
            >
              The process is simple and applies to every institution.
            </motion.p>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {[
                'A workshop or programme takes place at the institution',
                'Photos are taken during the real session',
                'The institution reviews the case study and gives written permission',
                'It is published here and linked to the programme page',
              ].map((step) => (
                <motion.div
                  key={step}
                  variants={fadeInUp}
                  className="card p-6 flex items-start gap-3"
                >
                  <FiCheck className="text-brand-orange flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{step}</p>
                </motion.div>
              ))}
            </div>
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
              Every case study links back to the programme it came from.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {caseStudyLinks.map((item) => (
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
                {caseStudyButton} <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
