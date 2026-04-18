import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGraduationCap, FaBoxOpen, FaChalkboardTeacher, FaHandshake, FaStore, FaCogs, FaWhatsapp } from 'react-icons/fa';
import { FiCheck, FiArrowRight, FiSend } from 'react-icons/fi';
import { submitSchoolInquiry } from '../services/api';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const ForSchools = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const offerings = [
    { icon: FaBoxOpen, title: 'Educational Kits Supply', desc: 'STEM, Robotics, IoT and Science kits for your school labs at special institutional pricing.', link: '/products' },
    { icon: FaChalkboardTeacher, title: 'School Workshops', desc: 'Interactive hands-on workshops conducted at your school by expert trainers.', link: '/workshops' },
    { icon: FaGraduationCap, title: 'Home Tuition Partnership', desc: 'Partner with us to provide home tuition services to your student community.', link: '/home-tuition' },
    { icon: FaCogs, title: 'Custom Kits (OEM/ODM)', desc: 'Get custom branded educational kits made specifically for your institution.', link: '/oem-services' },
    { icon: FaHandshake, title: 'Distributor Program', desc: 'Become an area distributor for Builds Your Mind products.', link: '/distributor-program' },
    { icon: FaStore, title: 'Retailer Program', desc: 'Stock our products in your retail outlet with attractive margins.', link: '/retailer-program' },
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const interests = [];
      if (data.interest_kits) interests.push('Educational Kits');
      if (data.interest_workshops) interests.push('Workshops');
      if (data.interest_tuition) interests.push('Home Tuition');
      if (data.interest_oem) interests.push('Custom Kits (OEM/ODM)');

      await submitSchoolInquiry({
        school_name: data.school_name,
        contact_person: data.contact_person,
        designation: data.designation,
        email: data.email,
        phone: data.phone,
        city: data.city,
        state: data.state,
        number_of_students: data.number_of_students ? parseInt(data.number_of_students) : null,
        interested_in: interests,
        message: data.message,
      });
      toast.success('Inquiry submitted! Our team will contact you soon.');
      reset();
    } catch {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>For Schools & Partners | Builds Your Mind</title>
        <meta name="description" content="Partner with Builds Your Mind for educational kits, workshops, home tuition and distribution programs for schools and institutions." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95"></div>
        <div className="absolute inset-0 brand-pattern"></div>
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-white/10 text-blue-100 text-sm font-medium rounded-full mb-6">For Schools & Partners</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Partner With <span className="text-brand-orange">Builds Your Mind</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-blue-100/90">
              Educational kits, workshops, home tuition services, and business partnership opportunities for schools and institutions.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0V120Z" fill="#F8FAFC"/></svg>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="section-title mb-4">What We Offer</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">Comprehensive solutions for educational institutions</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o, i) => (
              <motion.div key={i} variants={fadeInUp} className="card p-6 group hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-brand-blue transition-colors">
                  <o.icon className="text-2xl text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg text-brand-blue mb-2">{o.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{o.desc}</p>
                <Link to={o.link} className="inline-flex items-center gap-2 text-brand-blue font-medium text-sm hover:gap-3 transition-all">
                  Learn More <FiArrowRight />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="section-title mb-6">School / Partner Inquiry</h2>
              <p className="text-gray-600 mb-8">Fill the form below and our team will reach out to you with the best solutions for your institution.</p>
              <ul className="space-y-4 mb-8">
                {['Institutional pricing available', 'Customizable programs', 'Pan-India delivery', 'Dedicated account manager', 'After-sales support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <FiCheck className="text-brand-blue flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/919109711321" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                <FaWhatsapp size={20} /> Chat on WhatsApp
              </a>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-brand-cream rounded-3xl p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">School/Institute Name *</label>
                      <input {...register('school_name', { required: true })} className="input-field" placeholder="Institution name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Person *</label>
                      <input {...register('contact_person', { required: true })} className="input-field" placeholder="Your name" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Designation</label>
                      <input {...register('designation')} className="input-field" placeholder="e.g. Principal, HOD" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Students</label>
                      <input type="number" {...register('number_of_students')} className="input-field" placeholder="Approximate count" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input type="email" {...register('email', { required: true })} className="input-field" placeholder="email@school.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                      <input type="tel" {...register('phone', { required: true })} className="input-field" placeholder="+91 9876543210" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                      <input {...register('city', { required: true })} className="input-field" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">State *</label>
                      <input {...register('state', { required: true })} className="input-field" placeholder="State" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interested In</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'interest_kits', label: 'Educational Kits' },
                        { name: 'interest_workshops', label: 'Workshops' },
                        { name: 'interest_tuition', label: 'Home Tuition' },
                        { name: 'interest_oem', label: 'Custom Kits (OEM/ODM)' },
                      ].map((item) => (
                        <label key={item.name} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                          <input type="checkbox" {...register(item.name)} className="w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue" />
                          {item.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea {...register('message')} rows={3} className="input-field resize-none" placeholder="Tell us about your requirements..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                    {loading ? 'Submitting...' : <>Submit Inquiry <FiSend className="ml-2" /></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForSchools;
