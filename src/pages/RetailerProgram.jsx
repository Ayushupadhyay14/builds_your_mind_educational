import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaStore, FaBoxOpen, FaPercent, FaHeadset, FaShoppingBag, FaAward } from 'react-icons/fa';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const RetailerProgram = () => {
  const benefits = [
    { icon: FaBoxOpen, title: 'Regular Supply', desc: 'Consistent and timely supply of educational kits to keep your shelves stocked.' },
    { icon: FaPercent, title: 'Attractive Margins', desc: 'Competitive pricing structure with healthy retail margins.' },
    { icon: FaStore, title: 'Display Support', desc: 'POS materials and display units to showcase products effectively.' },
    { icon: FaHeadset, title: 'Sales Support', desc: 'Training and support to help you sell our products.' },
    { icon: FaShoppingBag, title: 'Easy Ordering', desc: 'Simple reordering process with flexible minimum quantities.' },
    { icon: FaAward, title: 'Quality Products', desc: 'Premium eco-friendly educational kits that sell themselves.' },
  ];

  const idealFor = [
    'Book stores and stationery shops',
    'Educational supply stores',
    'Toy stores',
    'Gift shops',
    'School supply vendors',
    'General retail stores',
  ];

  return (
    <>
      <Helmet>
        <title>Retailer Program | Builds Your Mind - Retail Partnership</title>
        <meta name="description" content="Retail shop owners, book stores and educational stores can register as retail partners for regular supply of eco-friendly learning kits." />
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
              Retailer Program
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-blue-100/90">
              Register as a retail partner for regular supply of eco-friendly educational kits with attractive margins.
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
              Retailer Benefits
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Why stock Builds Your Mind products?
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

      {/* Ideal For */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600"
                alt="Retail Store"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="section-title mb-6">Ideal For</h2>
              <p className="text-gray-600 mb-6">
                Our retailer program is designed for businesses that serve students, parents, and educators. 
                If you have a customer base interested in educational products, we'd love to partner with you.
              </p>
              <ul className="space-y-4">
                {idealFor.map((item, index) => (
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

      {/* How to Join */}
      <section className="py-20 bg-brand-cream brand-pattern">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="section-title mb-4">
              How to Join
            </motion.h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Register', desc: 'Fill out the retailer registration form with your business details' },
                { step: '2', title: 'Verification', desc: 'Our team verifies your information and contacts you' },
                { step: '3', title: 'Start Selling', desc: 'Place your first order and start selling eco-friendly kits' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-blue text-white flex items-center justify-center font-display text-3xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-display font-semibold text-xl text-brand-blue mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-brand-blue">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Products You'll Be Selling
            </h2>
            <p className="text-blue-100/90 max-w-2xl mx-auto">
              High-quality eco-friendly educational kits that parents and educators love
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'STEM Learning Kits', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300' },
              { name: 'DIY Science Kits', image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=300' },
              { name: 'Electronics Kits', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300' },
              { name: 'Creative Kits', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300' },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-white font-medium">{product.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-12 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="section-title mb-4">Become a Retailer</h2>
              <p className="section-subtitle mx-auto mb-8">
                Start selling eco-friendly educational kits in your store today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Register Now <FiArrowRight className="ml-2" />
                </Link>
                <Link to="/products" className="btn-secondary">
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RetailerProgram;
