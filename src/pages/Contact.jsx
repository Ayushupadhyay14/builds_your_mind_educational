import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { FiMail, FiPhone, FiSend } from "react-icons/fi";
import { submitEnquiry } from "../services/api";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  EMAIL,
  EMAIL_HREF,
  ADDRESS_DISPLAY,
} from "../config/contact";
import { ParallaxLayer } from '../components/Parallax';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // Deep links from product, programme and campaign CTAs pre-fill the form so
  // the visitor does not have to retype what they were already looking at.
  const typeParam = (searchParams.get("type") || "").toLowerCase();
  const productParam = searchParams.get("product") || "";
  const programmeParam = searchParams.get("programme") || "";
  const cityParam = searchParams.get("city") || "";
  const qtyParam = searchParams.get("qty") || "";

  const typeMap = {
    meeting: "meeting",
    school: "school",
    quote: "bulk",
    bulk: "bulk",
    product: "product",
    workshop: "workshop",
    oem: "oem",
    odm: "odm",
    distributor: "distributor",
    retailer: "retailer",
    tuition: "tuition",
  };
  const defaultType =
    typeMap[typeParam] || (productParam ? "product" : "general");

  const defaultMessage = productParam
    ? `I would like a quote for ${productParam}${
        qtyParam ? ` (quantity: ${qtyParam})` : ""
      }. Please share price, availability, delivery and warranty terms.`
    : programmeParam
      ? `I would like to discuss ${programmeParam} for our institution.`
      : "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      enquiry_type: defaultType,
      company_name: "",
      city: cityParam,
      message: defaultMessage,
    },
  });

  const enquiryTypes = [
    { value: "meeting", label: "School Meeting Request" },
    { value: "general", label: "General Enquiry" },
    { value: "product", label: "Product Enquiry" },
    { value: "bulk", label: "Bulk / Quote Request" },
    { value: "oem", label: "OEM Enquiry" },
    { value: "odm", label: "ODM Enquiry" },
    { value: "distributor", label: "Distributor Enquiry" },
    { value: "retailer", label: "Retailer Enquiry" },
    { value: "school", label: "School Enquiry" },
    { value: "workshop", label: "Workshop Enquiry" },
    { value: "tuition", label: "Home Tuition Enquiry" },
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitEnquiry(data);
      toast.success(
        "Thank you for your enquiry! We will get back to you soon.",
      );
      reset();
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email",
      value: EMAIL,
      href: EMAIL_HREF,
    },
    {
      icon: FiPhone,
      title: "Phone",
      value: PHONE_DISPLAY,
      href: PHONE_HREF,
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: PHONE_DISPLAY,
      href: WHATSAPP_HREF,
    },
  ];

  const officeAddress = ADDRESS_DISPLAY;

  return (
    <>
      <Helmet>
        <title>School Meeting & Workshop Enquiry | Builds Your Mind</title>
        <meta
          name="description"
          content="Book a school meeting or request a workshop, STEM lab or product quote. Contact Builds Your Mind in Indore for programmes and kits."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95"></div>
        <ParallaxLayer className="brand-pattern" />

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1 bg-white/10 text-blue-100 text-sm font-medium rounded-full mb-6"
            >
              Get in Touch
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              School Meeting & Workshop Enquiry
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100/90"
            >
              Planning a workshop, a STEM lab or a programme at your school or
              college? Want a quote for kits? Share a few details and our team
              will get back to you — usually within one working day.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-brand-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-display font-bold text-brand-blue mb-6">
                Phone, Email, WhatsApp
              </h2>
              <p className="text-gray-600 mb-8">
                Reach us directly on any of these. For workshop, STEM lab,
                partnership, OEM, ODM, bulk order, distributor, retailer or home
                tuition enquiries, the same team handles every message.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue transition-colors">
                      <item.icon className="text-xl text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-brand-blue transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick WhatsApp CTA */}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-brand-orange-deep text-white rounded-xl hover:bg-brand-orange-dark transition-colors"
              >
                <FaWhatsapp size={24} />
                <span className="font-semibold">Chat on WhatsApp</span>
              </a>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-display font-bold text-brand-blue mb-6">
                  Enquiry Form
                </h2>

                <p className="text-gray-600 mb-6">
                  Tell us your institution, city and what you are planning. All
                  fields marked * are required.
                </p>

                {(productParam || programmeParam) && (
                  <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-brand-blue">
                    We have pre-filled this enquiry for{" "}
                    <strong>{productParam || programmeParam}</strong>. You can
                    change any detail before sending.
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Enquiry Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enquiry Type *
                    </label>
                    <select
                      {...register("enquiry_type", {
                        required: "Please select enquiry type",
                      })}
                      className="input-field"
                    >
                      {enquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.enquiry_type && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.enquiry_type.message}
                      </p>
                    )}
                  </div>

                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="input-field"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="input-field"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                        className="input-field"
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        {...register("company_name")}
                        className="input-field"
                        placeholder="Your company (optional)"
                      />
                    </div>
                  </div>

                  {/* City & State */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        {...register("city")}
                        className="input-field"
                        placeholder="Your city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        {...register("state")}
                        className="input-field"
                        placeholder="Your state"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                      })}
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Enquiry <FiSend className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Address and Map */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-4">Address and Map</h2>
            <p className="section-subtitle mx-auto mb-8">
              Our office is in Indore, Madhya Pradesh.
            </p>
            <div className="inline-flex items-start gap-3 text-left">
              <FaMapMarkerAlt className="text-2xl text-brand-blue mt-1 flex-shrink-0" />
              <p className="text-gray-700 text-lg">{officeAddress}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-4">
              What Happens After You Contact Us
            </h2>
            <p className="section-subtitle mx-auto mb-8">
              Your enquiry goes to our programme team. A programme advisor reads
              it and gets back to you to discuss dates, class groups and what the
              session or programme would cover. If you would like to see what we
              run first, you can review our workshops or reach us directly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/stem-workshops-schools-indore" className="btn-secondary">
                See Our Workshops
              </Link>
              <a href={PHONE_HREF} className="btn-primary">
                <FiPhone className="mr-2" /> Call Us
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FaWhatsapp className="mr-2" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
