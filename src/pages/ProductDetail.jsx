import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaGraduationCap, FaWhatsapp } from 'react-icons/fa';
import {
  FiCheck,
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiShield,
  FiTruck,
  FiFileText,
} from 'react-icons/fi';
import { getProductBySlug } from '../services/api';
import { whatsappLink } from '../utils/utm';
import { SITE_URL } from '../config/site';
import Loading from '../components/Loading';

const asList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const normaliseStock = (status) => {
  const key = String(status || '').toLowerCase();
  if (key === 'in_stock' || key === 'in stock') {
    return { label: 'In Stock', className: 'bg-blue-100 text-brand-blue' };
  }
  if (key === 'out_of_stock' || key === 'out of stock') {
    return { label: 'Out of Stock', className: 'bg-red-100 text-red-700' };
  }
  if (key === 'made_to_order' || key === 'made to order') {
    return { label: 'Made to Order', className: 'bg-amber-100 text-amber-800' };
  }
  return { label: 'Ask for Availability', className: 'bg-slate-100 text-slate-700' };
};

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getProductBySlug(slug);
        const data = res?.data;

        // Do not fall back to invented sample products or prices. If the API
        // does not return a product, the page says so honestly.
        if (!data || cancelled) {
          if (!cancelled) setProduct(null);
          return;
        }

        const gallery = asList(data.gallery_images || data.galleryImages);
        const mainImage = data.image || gallery[0] || '/placeholder.jpg';

        setProduct({
          id: data.id || data._id || slug,
          name: data.name || '',
          slug: data.slug || slug || '',
          category: data.category || null,
          ageGroup: data.age_group || data.ageGroup || '',
          price: Number(data.price) || 0,
          bulkPrice: Number(data.bulk_price || data.bulkPrice) || 0,
          minBulkQuantity:
            Number(data.min_bulk_quantity || data.minBulkQuantity) || 0,
          shortDescription:
            data.short_description || data.shortDescription || '',
          description: data.description || '',
          features: asList(data.features),
          learningOutcomes: asList(
            data.learning_outcomes || data.learningOutcomes
          ),
          image: mainImage,
          galleryImages: gallery.length ? gallery : [mainImage],
          isEcoFriendly:
            data.is_eco_friendly !== undefined
              ? data.is_eco_friendly
              : data.isEcoFriendly === true,
          stockStatus: data.stock_status || data.stockStatus || '',
          videoUrl: data.video_url || data.videoUrl || '',
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        if (!cancelled) setProduct(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (product && activeImage >= (product.galleryImages?.length || 0)) {
      setActiveImage(0);
    }
  }, [product, activeImage]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Product Not Available | Builds Your Mind</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-lg">
            <h1 className="text-2xl font-display font-bold text-brand-blue mb-4">
              Product Not Available
            </h1>
            <p className="text-gray-600 mb-6">
              This product is not in the current catalogue, or the catalogue is
              temporarily unavailable. Our team can send you the current kit
              list, prices and availability directly.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/products" className="btn-primary">
                Browse All Products
              </Link>
              <Link to="/contact?type=quote" className="btn-secondary">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const stock = normaliseStock(product.stockStatus);
  const hasPrice = product.price > 0;
  const hasBulkPrice =
    product.bulkPrice > 0 && product.minBulkQuantity > 1;
  const isEcoFriendly = product.isEcoFriendly === true;
  const productPath = `/products/${product.slug || product.id}`;
  const quotePath = `/contact?type=product&product=${encodeURIComponent(
    product.name || 'Educational kit'
  )}&qty=${quantity}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description:
      product.shortDescription ||
      product.description ||
      'Educational kit by Builds Your Mind.',
    image: product.galleryImages.map((img) =>
      String(img).startsWith('http') ? img : `${SITE_URL}${img}`
    ),
    brand: {
      '@type': 'Brand',
      name: 'Builds Your Mind',
    },
    category: product.category?.name || 'Educational Kit',
    ...(product.slug ? { sku: product.slug } : {}),
    ...(hasPrice
      ? {
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability:
              product.stockStatus === 'out_of_stock'
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
            url: `${SITE_URL}${productPath}`,
          },
        }
      : {}),
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Builds Your Mind`}</title>
        <meta
          name="description"
          content={
            product.shortDescription ||
            `${product.name} from Builds Your Mind. Ask for current kit contents, price, delivery and warranty terms.`
          }
        />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <section className="pt-32 pb-20 bg-brand-cream">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-brand-blue">
                  Home
                </Link>
              </li>
              <li className="text-gray-400" aria-hidden="true">
                /
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-500 hover:text-brand-blue"
                >
                  Products
                </Link>
              </li>
              <li className="text-gray-400" aria-hidden="true">
                /
              </li>
              <li className="text-brand-blue font-medium">{product.name}</li>
            </ol>
          </nav>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-brand-blue hover:gap-3 transition-all mb-8"
          >
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
                {isEcoFriendly && (
                  <span className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                    <FaGraduationCap className="text-brand-blue" />
                    <span className="text-sm font-medium text-brand-blue">
                      Eco-Friendly
                    </span>
                  </span>
                )}
              </div>

              {product.galleryImages.length > 1 && (
                <div className="flex flex-wrap gap-3">
                  {product.galleryImages.map((img, index) => (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`Show image ${index + 1} of ${product.name}`}
                      aria-pressed={activeImage === index}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        activeImage === index
                          ? 'border-brand-blue'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {product.category?.name && (
                <span className="inline-block px-3 py-1 bg-blue-100/30 text-brand-blue text-sm font-medium rounded-full mb-4">
                  {product.category.name}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-blue mb-4">
                {product.name}
              </h1>

              {product.shortDescription && (
                <p className="text-gray-600 text-lg mb-6">
                  {product.shortDescription}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 mb-6">
                {product.ageGroup && (
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Age: {product.ageGroup}
                  </span>
                )}
                <span className={`text-sm px-3 py-1 rounded-full ${stock.className}`}>
                  {stock.label}
                </span>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="flex flex-wrap items-end gap-3 mb-2">
                  {hasPrice ? (
                    <>
                      <span className="text-4xl font-bold text-brand-blue">
                        ₹{product.price}
                      </span>
                      <span className="text-gray-500 mb-1">per unit</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-brand-blue">
                      Price on request
                    </span>
                  )}
                </div>

                {hasBulkPrice && (
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 bg-blue-100/20 px-4 py-2 rounded-lg">
                    <span>
                      Bulk price:{' '}
                      <strong className="text-brand-blue">
                        ₹{product.bulkPrice}
                      </strong>
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>Minimum {product.minBulkQuantity} units</span>
                  </div>
                )}

                {!hasPrice && (
                  <p className="text-sm text-gray-500 mt-3">
                    Send an enquiry and we will confirm the current price,
                    availability and delivery timeline in writing.
                  </p>
                )}
              </div>

              {/* Quantity & CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="flex items-center justify-between sm:justify-start gap-3 bg-white rounded-full px-4 py-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center font-semibold" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <FiPlus />
                  </button>
                </div>
                <Link
                  to={quotePath}
                  data-track="product_enquiry_click"
                  className="btn-primary flex-1 text-center"
                >
                  Enquire for {quantity} {quantity === 1 ? 'unit' : 'units'}
                </Link>
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappLink(
                  `Hi, I'm interested in ${product.name}${
                    quantity > 1 ? ` (quantity: ${quantity})` : ''
                  }. Please share price, delivery and warranty details.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                className="flex items-center justify-center gap-2 w-full py-3 bg-brand-orange-deep text-white rounded-full hover:bg-brand-orange-dark transition-colors font-semibold"
              >
                <FaWhatsapp size={20} />
                Chat on WhatsApp
              </a>

              {/* Video Tutorial */}
              <Link
                to={`/catalog/${product.slug || product.id}`}
                className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                <FaGraduationCap size={20} className="text-brand-orange" />
                Watch Video Tutorial
              </Link>

              <p className="text-xs text-gray-500 mt-4">
                Enquiry-based catalogue. We confirm price, delivery, warranty
                and replacement terms in writing before payment.
              </p>
            </motion.div>
          </div>

          {/* Product Details */}
          <div className="mt-16 grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold text-brand-blue mb-6">
                  Description
                </h2>

                {product.description ? (
                  <div className="prose prose-gray max-w-none">
                    {String(product.description)
                      .split('\n\n')
                      .filter(Boolean)
                      .map((para, index) => (
                        <p key={index} className="text-gray-600 mb-4">
                          {para}
                        </p>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Full kit contents and specifications are available on
                    request. Ask us for the current product sheet.
                  </p>
                )}

                {product.features.length > 0 && (
                  <>
                    <h3 className="text-xl font-display font-semibold text-brand-blue mt-8 mb-4">
                      Features
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FiCheck className="text-brand-blue mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {product.learningOutcomes.length > 0 && (
                  <>
                    <h3 className="text-xl font-display font-semibold text-brand-blue mt-8 mb-4">
                      Learning Outcomes
                    </h3>
                    <ul className="space-y-3">
                      {product.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FiCheck className="text-brand-blue mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-display font-semibold text-lg text-brand-blue mb-4">
                  Need Help?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Contact us for bulk orders, custom requirements, or any
                  questions about this kit.
                </p>
                <Link
                  to={quotePath}
                  className="btn-secondary w-full text-center text-sm"
                >
                  Request a Quote
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="font-display font-semibold text-lg text-brand-blue mb-4">
                  Warranty, Delivery &amp; Support
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <FiShield className="text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>
                      Warranty and replacement terms are confirmed in your
                      written quotation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiTruck className="text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>
                      Delivery timeline and charges depend on quantity and
                      location; we confirm them before payment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiFileText className="text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>
                      Read the{' '}
                      <Link
                        to="/terms"
                        className="text-brand-blue underline"
                      >
                        Terms of Service
                      </Link>{' '}
                      for the full policy.
                    </span>
                  </li>
                </ul>
              </div>

              {isEcoFriendly && (
                <div className="bg-blue-100/20 rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-lg text-brand-blue mb-4">
                    Eco-Friendly
                  </h3>
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
              )}
            </div>
          </div>

          {/* No invented related products. Send visitors to the real catalogue. */}
          <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-brand-blue mb-2">
                Looking for another kit?
              </h2>
              <p className="text-gray-600">
                Browse the current catalogue or ask us to recommend kits for
                your class group and budget.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">
                Browse All Products <FiArrowRight className="ml-2" />
              </Link>
              <Link to="/contact?type=quote" className="btn-secondary">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
