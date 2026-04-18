import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaHandshake, FaMapMarkerAlt, FaBullhorn, FaTruck, FaChartLine, FaUsers } from 'react-icons/fa';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const DistributorProgram = () => {
  const benefits = [
    { icon: FaMapMarkerAlt, title: 'Area-wise Rights', desc: 'Exclusive distribution rights for your designated territory.' },
    { icon: FaBullhorn, title: 'Marketing Support', desc: 'Comprehensive marketing materials and promotional support.' },
    { icon: FaTruck, title: 'Supply Chain', desc: 'Reliable supply chain management and timely deliveries.' },
    { icon: FaChartLine, title: 'Attractive Margins', desc: 'Competitive pricing with healthy profit margins.' },
    { icon: FaUsers, title: 'Training & Support', desc: 'Product training and ongoing sales support.' },
    { icon: FaHandshake, title: 'Long-term Partnership', desc: 'Build a lasting business relationship with us.' },
  ];

  const requirements = [
    'Established distribution network in your region',
    'Experience in educational products (preferred)',
    'Adequate storage and logistics capabilities',
    'Commitment to promoting eco-friendly products',
    'Valid business registration and GST',
    'Minimum investment capacity as per agreement',
  ];

  return (
    <>
      <Helmet>
        <title>Distributor Program | Builds Your Mind - Partner With Us</title>
        <meta name="description" content="Partner with Builds Your Mind for area-wise distribution of eco-friendly educational kits with marketing and supply support." />
      </Helmet>

      {/* Hero Section */}
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
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-white/10 text-blue-100 text-sm font-medium rounded-full mb-6">
              Partner Programs
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Distributor Program
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-blue-100/90">
              Partner with Builds Your Mind for area-wise distribution of eco-friendly educational kits with marketing and supply support.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#F8FDF5"/>
          </svg>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              Distributor Benefits
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Why partner with Builds Your Mind?
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card p-8 text-center group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-100/30 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                  <benefit.icon className="text-3xl text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-xl text-brand-blue mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">How It Works</h2>
              <div className="space-y-6">
                {[
                  { num: '1', title: 'Apply', desc: 'Submit your application with business details' },
                  { num: '2', title: 'Review', desc: 'Our team reviews your application' },
                  { num: '3', title: 'Discussion', desc: 'Discuss terms, territory, and agreement' },
                  { num: '4', title: 'Onboarding', desc: 'Complete onboarding and training' },
                  { num: '5', title: 'Launch', desc: 'Start distributing Builds Your Mind products' },
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold flex-shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-brand-blue">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600"
                alt="Distributor Partnership"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-brand-blue">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-12">
              Requirements
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-blue-100">
                    <FiCheck className="text-brand-orange mt-1 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-12 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="section-title mb-4">Become a Distributor</h2>
              <p className="section-subtitle mx-auto mb-8">
                Join our growing network of distributors and help bring eco-friendly education to every corner.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Apply Now <FiArrowRight className="ml-2" />
                </Link>
                <Link to="/retailer-program" className="btn-secondary">
                  View Retailer Program
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DistributorProgram;
