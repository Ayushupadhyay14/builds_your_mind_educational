import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaCogs, FaBox, FaCheckCircle, FaIndustry, FaTruck, FaHeadset } from 'react-icons/fa';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const OEMServices = () => {
  const services = [
    { icon: FaIndustry, title: 'Bulk Manufacturing', desc: 'High-volume production capabilities with consistent quality standards.' },
    { icon: FaCogs, title: 'Assembly Services', desc: 'Complete kit assembly with quality checks at every stage.' },
    { icon: FaCheckCircle, title: 'Quality Testing', desc: 'Rigorous testing protocols to ensure product safety and reliability.' },
    { icon: FaBox, title: 'Custom Packaging', desc: 'Branded packaging solutions tailored to your specifications.' },
    { icon: FaTruck, title: 'Logistics Support', desc: 'Efficient delivery and distribution management.' },
    { icon: FaHeadset, title: 'Dedicated Support', desc: '24/7 support for all your manufacturing queries.' },
  ];

  const process = [
    { step: '01', title: 'Consultation', desc: 'Discuss your requirements and specifications' },
    { step: '02', title: 'Quotation', desc: 'Receive detailed pricing and timeline' },
    { step: '03', title: 'Sample Approval', desc: 'Review and approve product samples' },
    { step: '04', title: 'Production', desc: 'Bulk manufacturing begins' },
    { step: '05', title: 'Quality Check', desc: 'Rigorous testing and QC' },
    { step: '06', title: 'Delivery', desc: 'On-time delivery to your location' },
  ];

  return (
    <>
      <Helmet>
        <title>OEM Services | Builds Your Mind - Educational Kit Manufacturing</title>
        <meta name="description" content="Launch educational kits under your own brand with our OEM manufacturing services. Bulk manufacturing, assembly, testing and packaging by Harmono Pvt. Ltd." />
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
              Business Solutions
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              OEM Services
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-blue-100/90">
              Launch educational kits under your own brand name with our comprehensive OEM manufacturing services.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#F8FDF5"/>
          </svg>
        </div>
      </section>

      {/* What We Offer */}
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
              What We Offer
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Comprehensive OEM manufacturing services under Harmono Pvt. Ltd.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card p-8 text-center group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-100/30 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                  <service.icon className="text-3xl text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-xl text-brand-blue mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              Our Process
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Simple and transparent manufacturing process
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-brand-cream rounded-2xl p-6">
                  <span className="text-5xl font-display font-bold text-blue-100/50">{item.step}</span>
                  <h3 className="font-display font-semibold text-xl text-brand-blue mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-brand-blue">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Why Choose Our OEM Services?
              </h2>
              <ul className="space-y-4">
                {[
                  'Launch products under your own brand',
                  'Eco-friendly manufacturing processes',
                  'Consistent quality assurance',
                  'Competitive pricing for bulk orders',
                  'Flexible customization options',
                  'On-time delivery guarantee',
                  'Dedicated account manager',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-blue-100">
                    <FiCheck className="text-brand-orange flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600"
                alt="OEM Manufacturing"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Ready to Start?</h2>
          <p className="section-subtitle mx-auto mb-8">
            Contact us today to discuss your OEM requirements
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Get OEM Quote <FiArrowRight className="ml-2" />
            </Link>
            <Link to="/odm-services" className="btn-secondary">
              Explore ODM Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default OEMServices;
