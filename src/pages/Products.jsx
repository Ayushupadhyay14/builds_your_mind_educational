import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiShoppingCart,
  FiArrowRight,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { getProducts, getCategories } from "../services/api";
import toast from "react-hot-toast";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [selectedAge, setSelectedAge] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        // ✅ correct arrays
        setProducts(productsRes.data.results || []);
        setCategories([
          { id: "all", name: "All Products", slug: "all" },
          ...(categoriesRes.data.results || []),
        ]);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ageGroups = [
    { id: "all", name: "All Ages" },
    { id: "3-5", name: "3-5 Years" },
    { id: "5-8", name: "5-8 Years" },
    { id: "8-12", name: "8-12 Years" },
    { id: "12-16", name: "12-16 Years" },
    { id: "16+", name: "16+ Years" },
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.short_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Category matching - backend se category object aata hai
    const matchesCategory =
      selectedCategory === "all" ||
      product.category?.slug === selectedCategory ||
      product.category?.id === selectedCategory;

    const matchesAge =
      selectedAge === "all" || product.age_group === selectedAge;

    return matchesSearch && matchesCategory && matchesAge;
  });

  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category"));
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Educational Kits | Builds Your Mind - STEM, DIY Science, Electronics
        </title>
        <meta
          name="description"
          content="Browse our eco-friendly educational kits including STEM learning, DIY science, electronics, and creative development kits. Available for B2B and B2C."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95"></div>
        <div className="absolute inset-0 brand-pattern"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1 bg-white/10 text-blue-100 text-sm font-medium rounded-full mb-6">
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Educational Kits
            </h1>
            <p className="text-lg text-blue-100/90 mb-8">
              Available for individual purchase (B2C) and bulk orders (B2B)
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-orange text-gray-800"
              />
            </div>
          </motion.div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="#F8FDF5"
            />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-brand-cream">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                <h3 className="font-display font-semibold text-lg text-brand-blue mb-6">
                  Filters
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug || cat.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === (cat.slug || cat.id)
                            ? "bg-blue-100/30 text-brand-blue font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age Groups */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Age Group</h4>
                  <div className="space-y-2">
                    {ageGroups.map((age) => (
                      <button
                        key={age.id}
                        onClick={() => setSelectedAge(age.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedAge === age.id
                            ? "bg-blue-100/30 text-brand-blue font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {age.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-md"
            >
              <FiFilter />
              <span>Filters</span>
            </button>

            {/* Mobile Filters Modal */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-semibold text-lg text-brand-blue">
                      Filters
                    </h3>
                    <button onClick={() => setShowFilters(false)}>
                      <FiX size={24} />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat.id
                              ? "bg-blue-100/30 text-brand-blue font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age Groups */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">
                      Age Group
                    </h4>
                    <div className="space-y-2">
                      {ageGroups.map((age) => (
                        <button
                          key={age.id}
                          onClick={() => {
                            setSelectedAge(age.id);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedAge === age.id
                              ? "bg-blue-100/30 text-brand-blue font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {age.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Info */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-brand-blue">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">
                    No products found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedAge("all");
                    }}
                    className="mt-4 text-brand-blue font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                    >
                      {/* IMAGE */}
                      <div className="relative h-56 w-full overflow-hidden">
                        <img
                          src={product.image || "/placeholder.jpg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />

                        {product.is_featured && (
                          <span className="absolute top-3 left-3 bg-brand-blue text-white text-xs px-3 py-1 rounded-full">
                            Featured
                          </span>
                        )}

                        <div className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
                          <FaGraduationCap className="text-brand-blue" />
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-blue-100/40 text-brand-blue px-2 py-1 rounded">
                            {product.category?.name || "Product"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {
                              ageGroups.find((a) => a.id === product.age_group)
                                ?.name
                            }
                          </span>
                        </div>

                        <h3 className="font-display font-semibold text-lg text-brand-blue mb-1">
                          {product.name}
                        </h3>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {product.short_description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-brand-blue">
                              ₹{product.price}
                            </span>
                            {product.bulk_price && (
                              <span className="text-sm text-gray-500 ml-2">
                                Bulk: ₹{product.bulk_price}
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/products/${product.slug}`}
                            className="w-10 h-10 rounded-full bg-blue-100/40 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition"
                          >
                            <FiArrowRight />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* B2B CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-brand-blue rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Looking for Bulk Orders?
              </h2>
              <p className="text-blue-100/90 mb-8 max-w-2xl mx-auto">
                Get special pricing for schools, institutions, and businesses.
                Contact us for B2B enquiries.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-blue font-semibold rounded-full hover:bg-blue-100 transition-all"
                >
                  Request Quote <FiArrowRight />
                </Link>
                <Link
                  to="/distributor-program"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
