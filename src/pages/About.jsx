import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaGraduationCap, FaRecycle, FaChild, FaBox, FaCogs, FaAward, FaUsers, FaGlobe } from 'react-icons/fa';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const About = () => {
  const values = [
    {
      icon: FaGraduationCap,
      title: 'Sustainability',
      desc: 'We prioritize eco-friendly materials and sustainable practices in everything we create.'
    },
    {
      icon: FaAward,
      title: 'Quality',
      desc: 'Every product is rigorously tested to meet the highest quality and safety standards.'
    },
    {
      icon: FaUsers,
      title: 'Education',
      desc: 'We believe in hands-on learning that sparks curiosity and builds practical skills.'
    },
    {
      icon: FaGlobe,
      title: 'Innovation',
      desc: 'Continuously developing new products that make learning engaging and effective.'
    },
  ];

  const ecoCommitments = [
    { icon: FaRecycle, title: 'Recyclable Materials', desc: 'Use of recyclable and sustainable materials in all products' },
    { icon: FaGraduationCap, title: 'Minimal Plastic', desc: 'Minimal plastic usage with eco-friendly alternatives' },
    { icon: FaChild, title: 'Child Safe', desc: 'Non-toxic, safe components suitable for all ages' },
    { icon: FaBox, title: 'Eco Packaging', desc: 'Environment-friendly packaging that can be recycled' },
    { icon: FaCogs, title: 'Long-life Components', desc: 'Durable educational components built to last' },
  ];

  const stats = [
    { number: '500+', label: 'Schools Partner' },
    { number: '50+', label: 'Product Range' },
    { number: '100K+', label: 'Students Reached' },
    { number: '10+', label: 'Years Experience' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Builds Your Mind - Eco-Friendly Educational Kits</title>
        <meta name="description" content="Learn about Builds Your Mind, a purpose-driven educational kit brand by Harmono Pvt. Ltd. focused on eco-friendly, engaging learning solutions." />
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
              About Builds Your Mind
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Building Minds, <br />
              <span className="text-brand-orange">Sustaining Earth</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-blue-100/90">
              Purpose-driven educational kits that inspire learning while protecting our planet.
            </motion.p>
          </motion.div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#F8FDF5"/>
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-100/20 rounded-3xl rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600"
                alt="Our Story"
                className="relative rounded-2xl shadow-xl w-full"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-blue-100/30 text-brand-blue text-sm font-medium rounded-full mb-4">
                Our Story
              </motion.span>
              <motion.h2 variants={fadeInUp} className="section-title mb-6">
                Who We Are
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 mb-6 text-lg">
                Builds Your Mind is a purpose-driven educational kit brand focused on creating 
                eco-friendly, engaging and practical learning solutions for students and learners of all ages.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-600 mb-6">
                All products are designed, manufactured and quality-tested by our parent company 
                <strong className="text-brand-blue"> Harmono Pvt. Ltd.</strong>, ensuring consistent quality, 
                scalability and innovation in every educational kit we produce.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-600">
                We believe that education should not come at the cost of our environment. That's why 
                every product we create is designed with sustainability in mind, using recyclable materials 
                and eco-friendly packaging.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-blue">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-brand-orange mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-blue-100/30 text-brand-blue text-sm font-medium rounded-full mb-4">
              Our Values
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              What Drives Us
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Our core values guide everything we do, from product development to customer service.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card p-8 text-center group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-100/30 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                  <value.icon className="text-3xl text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-xl text-brand-blue mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eco Commitment Section */}
      <section className="py-20 bg-brand-cream brand-pattern">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-brand-blue text-white text-sm font-medium rounded-full mb-4">
              Eco-Friendly
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              Our Eco Commitment
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Sustainability isn't just a feature—it's the foundation of everything we create.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {ecoCommitments.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100/30 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-2xl text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-brand-blue mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Harmono Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-blue-100/30 text-brand-blue text-sm font-medium rounded-full mb-4">
                Parent Company
              </motion.span>
              <motion.h2 variants={fadeInUp} className="section-title mb-6">
                Harmono Pvt. Ltd.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 mb-6 text-lg">
                Builds Your Mind is proudly manufactured by Harmono Pvt. Ltd., a leading company 
                in educational product manufacturing with years of experience in quality production.
              </motion.p>
              <motion.ul variants={fadeInUp} className="space-y-4 mb-8">
                {[
                  'State-of-the-art manufacturing facility',
                  'Rigorous quality control processes',
                  'Experienced R&D team',
                  'ISO certified production',
                  'Pan-India distribution network'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FiCheck className="text-brand-blue flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-100/20 rounded-3xl -rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600"
                alt="Harmono Manufacturing"
                className="relative rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-brand">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-blue-100/90 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're looking for educational kits for your school, OEM/ODM services for your brand, 
              or want to become a distributor, we're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-blue font-semibold rounded-full hover:bg-blue-100 transition-all">
                Contact Us <FiArrowRight />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
                View Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
