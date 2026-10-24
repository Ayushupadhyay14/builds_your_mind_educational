import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaGraduationCap } from 'react-icons/fa';
import { FiHome, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Builds Your Mind</title>
        <meta
          name="description"
          content="The page you are looking for could not be found. Browse Builds Your Mind workshops, STEM programmes, products or contact the team."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative inline-block mb-8">
            <span className="text-[150px] md:text-[200px] font-display font-bold text-blue-100/30">
              404
            </span>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <FaGraduationCap className="text-6xl md:text-8xl text-brand-blue" />
            </motion.div>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-blue mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for may have moved or no longer exists.
            Try one of these instead.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              <FiHome className="mr-2" /> Go Home
            </Link>
            <Link to="/stem-workshops-schools-indore" className="btn-secondary">
              Explore Workshops <FiArrowRight className="ml-2" />
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 text-brand-blue font-semibold hover:underline"
            >
              <FiArrowLeft className="mr-2" /> Go Back
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
            <Link to="/products" className="hover:text-brand-blue hover:underline">
              Products
            </Link>
            <Link to="/for-schools" className="hover:text-brand-blue hover:underline">
              For Schools
            </Link>
            <Link to="/contact" className="hover:text-brand-blue hover:underline">
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
