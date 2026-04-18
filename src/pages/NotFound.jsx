import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
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
          Oops! The page you're looking for seems to have wandered off into the forest. 
          Let's get you back on track.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            <FiHome className="mr-2" /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
