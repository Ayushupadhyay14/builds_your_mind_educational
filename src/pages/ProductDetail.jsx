import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaGraduationCap, FaWhatsapp } from 'react-icons/fa';
import { FiCheck, FiArrowRight, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Sample product data (will be replaced with API data)
  const product = {
    id: 1,
    name: 'Basic Electronics Kit',
    slug: 'basic-electronics-kit',
    category: { name: 'Electronics Kits', slug: 'electronics' },
    ageGroup: '8-12 Years',
    price: 1499,
    bulkPrice: 1199,
    minBulkQuantity: 10,
    shortDescription: 'Learn basic electronics with hands-on experiments',
    description: `The Basic Electronics Kit is designed to introduce young learners to the fascinating world of electronics through hands-on experiments and projects. This comprehensive kit includes all the components needed to build circuits and understand fundamental electronic concepts.

Perfect for home learning, classroom experiments, or science fairs, this kit provides a safe and engaging way to explore electronics while developing problem-solving and critical thinking skills.`,
    features: [
      'Complete kit with all components included',
      'Step-by-step instruction manual',
      'Safe, child-friendly components',
      'Multiple experiment projects',
      'Reusable components for extended learning',
      'QR codes for video tutorials'
    ],
    learningOutcomes: [
      'Understanding of basic circuit concepts',
      'Knowledge of electronic components',
      'Hands-on soldering skills',
      'Problem-solving abilities',
      'Scientific thinking and experimentation'
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800',
    ],
    isEcoFriendly: true,
    stockStatus: 'in_stock',
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Arduino Learning Kit',
      slug: 'arduino-learning-kit',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400',
    },
    {
      id: 3,
      name: 'Robotics Starter Kit',
      slug: 'robotics-starter-kit',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{product.name} | Builds Your Mind - Eco-Friendly Educational Kits</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>

      <section className="pt-28 pb-20 bg-brand-cream">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link to="/" className="text-gray-500 hover:text-brand-blue">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link to="/products" className="text-gray-500 hover:text-brand-blue">Products</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-brand-blue font-medium">{product.name}</li>
            </ol>
          </nav>

          <Link to="/products" className="inline-flex items-center gap-2 text-brand-blue hover:gap-3 transition-all mb-8">
            <FiArrowLeft />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-white">
                <img
                  src={product.galleryImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isEcoFriendly && (
                  <span className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                    <FaGraduationCap className="text-brand-blue" />
                    <span className="text-sm font-medium text-brand-blue">Eco-Friendly</span>
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                {product.galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === index ? 'border-brand-blue' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-100/30 text-brand-blue text-sm font-medium rounded-full mb-4">
                {product.category.name}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-blue mb-4">
                {product.name}
              </h1>
              
              <p className="text-gray-600 text-lg mb-6">
                {product.shortDescription}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Age: {product.ageGroup}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  product.stockStatus === 'in_stock' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.stockStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="flex items-end gap-4 mb-4">
                  <span className="text-4xl font-bold text-brand-blue">₹{product.price}</span>
                  <span className="text-gray-500 mb-1">per unit</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-100/20 px-4 py-2 rounded-lg">
                  <span>Bulk Price: <strong className="text-brand-blue">₹{product.bulkPrice}</strong></span>
                  <span>•</span>
                  <span>Min. {product.minBulkQuantity} units</span>
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <FiPlus />
                  </button>
                </div>
                <Link to="/contact" className="btn-primary flex-1 text-center">
                  Enquire Now
                </Link>
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/919876543210?text=Hi, I'm interested in ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp size={20} />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16 grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold text-brand-blue mb-6">Description</h2>
                <div className="prose prose-gray max-w-none">
                  {product.description.split('\n\n').map((para, index) => (
                    <p key={index} className="text-gray-600 mb-4">{para}</p>
                  ))}
                </div>

                <h3 className="text-xl font-display font-semibold text-brand-blue mt-8 mb-4">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="text-brand-blue mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-display font-semibold text-brand-blue mt-8 mb-4">Learning Outcomes</h3>
                <ul className="space-y-3">
                  {product.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="text-brand-blue mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-2xl p-6 mb-6">
                <h3 className="font-display font-semibold text-lg text-brand-blue mb-4">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Contact us for bulk orders, custom requirements, or any questions.
                </p>
                <Link to="/contact" className="btn-secondary w-full text-center text-sm">
                  Contact Us
                </Link>
              </div>

              <div className="bg-blue-100/20 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-lg text-brand-blue mb-4">Eco-Friendly</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-gray-700">
                    <FaGraduationCap className="text-brand-blue" />
                    Recyclable materials
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <FaGraduationCap className="text-brand-blue" />
                    Minimal plastic
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <FaGraduationCap className="text-brand-blue" />
                    Eco-friendly packaging
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-bold text-brand-blue mb-8">Related Products</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(item => (
                  <Link
                    key={item.id}
                    to={`/products/${item.slug}`}
                    className="card group overflow-hidden"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-brand-blue mb-2">{item.name}</h3>
                      <span className="text-lg font-bold text-brand-blue">₹{item.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
