import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaRobot,
  FaMicrochip,
  FaFlask,
  FaCode,
  FaLaptopCode,
  FaCogs,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiCheck,
  FiArrowRight,
  FiSend,
  FiCalendar,
  FiUsers,
} from "react-icons/fi";
import { getWorkshops, bookWorkshop } from "../services/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Workshops = () => {
  // Ye purana const [loading, setLoading] = useState(false); hata do
  // Niche wale add karo:
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Icon mapping add karo
  const iconMap = {
    stem: FaCogs,
    robotics: FaRobot,
    iot: FaMicrochip,
    science: FaFlask,
    coding: FaCode,
    electronics: FaLaptopCode,
  };

  // Ye useEffect add karo (workshops array ke jagah)
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await getWorkshops();
        console.log("API Response:", response.data); // Debugging ke liye
        const workshopsData = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];
        setWorkshops(workshopsData);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const onSubmit = async (data) => {
    setBookingLoading(true); // Ye change karo
    try {
      await bookWorkshop(data);
      toast.success("Workshop booking submitted! We will contact you soon.");
      reset();
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setBookingLoading(false); // Ye bhi change karo
    }
  };
  console.log("STATE:", workshops);
  console.log("LENGTH:", workshops?.length);


  return (
    <>
      <Helmet>
        <title>
          Workshops | Builds Your Mind - STEM, Robotics, IoT Workshops for
          Schools
        </title>
        <meta
          name="description"
          content="Book interactive STEM, Robotics, IoT, Science and Coding workshops for schools and colleges. Conducted by expert educators."
        />
      </Helmet>

      {/* Hero */}
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
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1 bg-white/10 text-blue-100 text-sm font-medium rounded-full mb-6"
            >
              School & College Workshops
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              Interactive <span className="text-brand-orange">Workshops</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100/90"
            >
              STEM, Robotics, IoT, Science, Coding & Electronics workshops for
              Play Schools, Schools, and Colleges.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0V120Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* Workshop Cards */}
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
              Our Workshops
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Expert-led workshops designed for different age groups
            </motion.p>
          </motion.div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {workshops.map((w) => {
    const IconComponent = iconMap[w.workshop_type] || FaCogs;

    return (
      <div
        key={w.id}
        className="card p-6 group hover:-translate-y-2 transition-all duration-300"
      >
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
          <IconComponent className="text-2xl text-brand-blue" />
        </div>

        <h3 className="font-semibold text-lg text-brand-blue mb-2">
          {w.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          {w.target_audience && (
            <span className="text-xs bg-blue-100/30 text-brand-blue px-2 py-1 rounded">
              {w.target_audience.replace("_", " ")}
            </span>
          )}

          {w.duration && (
            <span className="text-xs bg-orange-100/30 text-brand-orange px-2 py-1 rounded">
              {w.duration}
            </span>
          )}

          {w.max_students && (
            <span className="text-xs bg-green-100/30 text-green-700 px-2 py-1 rounded">
              Max {w.max_students} students
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {w.description}
        </p>
      </div>
    );
  })}
          </div>
        </div>

      </section>

      {/* Booking Form */}
      <section id="book-workshop" className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="section-title mb-6">Book a Workshop</h2>
              <p className="text-gray-600 mb-8">
                Fill the form and our workshop coordinator will contact you to
                schedule and plan the workshop for your institution.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Customizable",
                    desc: "Workshops tailored to your curriculum",
                  },
                  {
                    title: "Expert Trainers",
                    desc: "Experienced educators and mentors",
                  },
                  {
                    title: "Materials Included",
                    desc: "All kits and materials provided",
                  },
                  {
                    title: "Certificate",
                    desc: "Participation certificates for students",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiCheck className="text-brand-blue mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/919109711321"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp size={20} /> Quick Enquiry on WhatsApp
              </a>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-brand-cream rounded-3xl p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        School/College Name *
                      </label>
                      <input
                        {...register("school_name", { required: true })}
                        className="input-field"
                        placeholder="Institution name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Contact Person *
                      </label>
                      <input
                        {...register("contact_person", { required: true })}
                        className="input-field"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="input-field"
                        placeholder="email@school.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", { required: true })}
                        className="input-field"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Workshop Type *
                      </label>
                      <select
                        {...register("workshop_type", { required: true })}
                        className="input-field"
                      >
                        <option value="">Select Workshop</option>
                        <option value="stem">STEM Discovery</option>
                        <option value="robotics">Robotics</option>
                        <option value="iot">IoT & Electronics</option>
                        <option value="science">Fun Science</option>
                        <option value="coding">Coding & Scratch</option>
                        <option value="electronics">Electronics Lab</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Number of Students *
                      </label>
                      <input
                        type="number"
                        {...register("number_of_students", { required: true })}
                        className="input-field"
                        placeholder="30"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        City *
                      </label>
                      <input
                        {...register("city", { required: true })}
                        className="input-field"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        State *
                      </label>
                      <input
                        {...register("state", { required: true })}
                        className="input-field"
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      {...register("preferred_date")}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Any additional requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="..."
                  >
                    {bookingLoading ? (
                      "Submitting..."
                    ) : (
                      <>
                        <FiSend /> Book Workshop
                      </>
                    )}
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

export default Workshops;
