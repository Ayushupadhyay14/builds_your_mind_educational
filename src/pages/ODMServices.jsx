import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaLightbulb, FaPencilRuler, FaGraduationCap, FaCubes, FaPalette, FaBox, FaIndustry } from 'react-icons/fa';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const ODMServices = () => {
  const services = [
    { icon: FaLightbulb, title: 'Product Ideation', desc: 'Innovative concepts tailored to market needs and educational requirements.' },
    { icon: FaPencilRuler, title: 'Curriculum-Based Design', desc: 'Products designed to align with educational standards and learning objectives.' },
    { icon: FaGraduationCap, title: 'Eco-Material Selection', desc: 'Sustainable and eco-friendly materials for all components.' },
    { icon: FaCubes, title: 'Prototyping', desc: 'Rapid prototyping to visualize and test product concepts.' },
    { icon: FaPalette, title: 'Branding & Packaging', desc: 'Custom branding and attractive packaging design.' },
    { icon: FaIndustry, title: 'Mass Production', desc: 'Scalable manufacturing for large volume orders.' },
  ];

  const process = [
    { step: '01', title: 'Ideation', desc: 'Brainstorm and conceptualize product ideas' },
    { step: '02', title: 'Design', desc: 'Curriculum-based product design' },
    { step: '03', title: 'Material Selection', desc: 'Choose eco-friendly materials' },
    { step: '04', title: 'Prototyping', desc: 'Create and test prototypes' },
    { step: '05', title: 'Branding', desc: 'Design packaging and branding' },
    { step: '06', title: 'Production', desc: 'Mass production and delivery' },
  ];

  return (
    <>
      <Helmet>
        <title>ODM Services | Builds Your Mind - Product Design & Development</title>
        <meta name="description" content="End-to-end ODM services including product ideation, curriculum-based design, eco-material selection, prototyping, branding, packaging and mass production." />
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
              ODM Services
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-blue-100/90">
              End-to-end product development from ideation to mass production with our comprehensive ODM services.
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
              Our ODM Services Include
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Complete product development lifecycle support
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

      {/* Process Timeline */}
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
              Development Process
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              From concept to market-ready product
            </motion.p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-blue-100/30 -translate-y-1/2"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-blue text-white flex items-center justify-center font-display font-bold text-xl relative z-10">
                    {item.step}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-brand-blue mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why ODM */}
      <section className="py-20 bg-brand-cream brand-pattern">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600"
                alt="ODM Development"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="section-title mb-6">
                Why Choose ODM?
              </h2>
              <p className="text-gray-600 mb-6">
                ODM (Original Design Manufacturing) is ideal when you want a complete product developed from scratch. 
                We handle everything from concept to delivery, allowing you to focus on marketing and sales.
              </p>
              <ul className="space-y-4">
                {[
                  'Complete product development support',
                  'Expert curriculum-aligned design',
                  'Eco-friendly material expertise',
                  'Rapid prototyping capabilities',
                  'Professional branding services',
                  'Quality-assured mass production',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <FiCheck className="text-brand-blue flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-brand">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Have a Product Idea?
          </h2>
          <p className="text-blue-100/90 text-lg mb-8 max-w-2xl mx-auto">
            Let's bring your educational kit concept to life. Contact us to discuss your ODM requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-blue font-semibold rounded-full hover:bg-blue-100 transition-all">
              Start ODM Project <FiArrowRight />
            </Link>
            <Link to="/oem-services" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
              View OEM Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ODMServices;
