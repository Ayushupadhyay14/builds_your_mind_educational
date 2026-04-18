import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaMapMarkerAlt,
  FaBookOpen,
  FaClipboardCheck,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import { FiCheck, FiArrowRight, FiSend } from "react-icons/fi";
import { getSubjects, applyTuition, registerTeacher } from "../services/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const HomeTuition = () => {
  const [activeTab, setActiveTab] = useState("parent");
  const [loading, setLoading] = useState(false);
  const parentForm = useForm();
  const teacherForm = useForm();
  const [subjects, setSubjects] = useState([]);

  const features = [
    {
      icon: FaShieldAlt,
      title: "Verified Teachers",
      desc: "All teachers are thoroughly background-checked and verified",
    },
    {
      icon: FaBookOpen,
      title: "Subject-wise Matching",
      desc: "Get perfectly matched teachers for every subject",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location Based",
      desc: "Teachers from your area for convenient scheduling",
    },
    {
      icon: FaUserGraduate,
      title: "All Classes & Boards",
      desc: "From Nursery to Class 12, all boards covered",
    },
    {
      icon: FaClock,
      title: "Flexible Timing",
      desc: "Choose your preferred schedule and timings",
    },
    {
      icon: FaClipboardCheck,
      title: "Progress Tracking",
      desc: "Regular performance updates and reports",
    },
  ];

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await getSubjects();
        setSubjects(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const classOptions = [
    { value: "nursery", label: "Nursery" },
    { value: "lkg", label: "LKG" },
    { value: "ukg", label: "UKG" },
    ...Array.from({ length: 12 }, (_, i) => ({
      value: `${i + 1}`,
      label: `Class ${i + 1}`,
    })),
  ];

  const handleParentSubmit = async (data) => {
    setLoading(true);
    try {
      await applyTuition({ ...data, subject_ids: data.subjects ? [1] : [] });
      toast.success("Application submitted! We will contact you soon.");
      parentForm.reset();
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherSubmit = async (data) => {
    setLoading(true);
    try {
      await registerTeacher(data);
      toast.success("Registration submitted! We will verify and contact you.");
      teacherForm.reset();
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const howItWorks = [
    {
      num: "1",
      title: "Apply Online",
      desc: "Fill the simple application form with your requirements",
    },
    {
      num: "2",
      title: "We Match",
      desc: "Our team finds the best teacher based on subject, location & preference",
    },
    {
      num: "3",
      title: "Meet & Start",
      desc: "Meet your assigned teacher and start learning at home",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Home Tuition Services | Builds Your Mind - Verified Home Tutors
        </title>
        <meta
          name="description"
          content="Apply online for home tuition services. Get verified, trained teachers matched by subject and location. From Nursery to Class 12."
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
              Home Tuition Services
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              Find the Perfect{" "}
              <span className="text-brand-orange">Home Tutor</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100/90 mb-8"
            >
              Verified, trained teachers matched to your child's needs. Simple
              online application, trusted service.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a
                href="#apply-form"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange-dark transition-all"
              >
                Apply for Tuition <FiArrowRight />
              </a>
              <a
                href="#apply-form"
                onClick={() => setActiveTab("teacher")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
              >
                Register as Teacher
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0V120Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* Features */}
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
              Why Choose Our Tuition Service?
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Parent-friendly process with trusted, quality teaching
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="card p-5 md:p-8 text-center group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                  <f.icon className="text-2xl text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-base md:text-xl text-brand-blue mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">How It Works</h2>
            <p className="section-subtitle mx-auto">
              Simple 3-step process for parents
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-blue text-white flex items-center justify-center font-display text-3xl font-bold">
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-xl text-brand-blue mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Forms */}
      <section id="apply-form" className="py-20 bg-brand-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Apply Now</h2>
              <p className="section-subtitle mx-auto">
                Choose your role to get started
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-white rounded-full p-1.5 shadow-lg mb-10 max-w-md mx-auto">
              <button
                onClick={() => setActiveTab("parent")}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all ${activeTab === "parent" ? "bg-brand-blue text-white shadow" : "text-gray-600 hover:text-brand-blue"}`}
              >
                I'm a Parent
              </button>
              <button
                onClick={() => setActiveTab("teacher")}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all ${activeTab === "teacher" ? "bg-brand-blue text-white shadow" : "text-gray-600 hover:text-brand-blue"}`}
              >
                I'm a Teacher
              </button>
            </div>

            {/* Parent Form */}
            {activeTab === "parent" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-xl"
              >
                <h3 className="text-xl font-display font-bold text-brand-blue mb-6">
                  Parent Application - Apply for Home Tuition
                </h3>
                <form
                  onSubmit={parentForm.handleSubmit(handleParentSubmit)}
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Parent Name *
                      </label>
                      <input
                        {...parentForm.register("parent_name", {
                          required: true,
                        })}
                        className="input-field"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Student Name *
                      </label>
                      <input
                        {...parentForm.register("student_name", {
                          required: true,
                        })}
                        className="input-field"
                        placeholder="Student's full name"
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
                        {...parentForm.register("email", { required: true })}
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        {...parentForm.register("phone", { required: true })}
                        className="input-field"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Student Class *
                      </label>
                      <select
                        {...parentForm.register("student_class", {
                          required: true,
                        })}
                        className="input-field"
                      >
                        <option value="">Select Class</option>
                        {classOptions.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Subject(s) Needed
                      </label>
                      <input
                        {...parentForm.register("subjects")}
                        className="input-field"
                        placeholder="e.g. Maths, Science"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        City *
                      </label>
                      <input
                        {...parentForm.register("city", { required: true })}
                        className="input-field"
                        placeholder="Your city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Area
                      </label>
                      <input
                        {...parentForm.register("area")}
                        className="input-field"
                        placeholder="Your locality"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        State *
                      </label>
                      <input
                        {...parentForm.register("state", { required: true })}
                        className="input-field"
                        placeholder="Your state"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Preferred Time
                    </label>
                    <input
                      {...parentForm.register("preferred_time")}
                      className="input-field"
                      placeholder="e.g. Morning 9-11 AM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Additional Message
                    </label>
                    <textarea
                      {...parentForm.register("message")}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Any specific requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Application <FiSend className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Teacher Form */}
            {activeTab === "teacher" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-xl"
              >
                <h3 className="text-xl font-display font-bold text-brand-blue mb-6">
                  Teacher Registration - Join Our Team
                </h3>
                <form
                  onSubmit={teacherForm.handleSubmit(handleTeacherSubmit)}
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        {...teacherForm.register("full_name", {
                          required: true,
                        })}
                        className="input-field"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...teacherForm.register("email", { required: true })}
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        {...teacherForm.register("phone", { required: true })}
                        className="input-field"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Qualification *
                      </label>
                      <input
                        {...teacherForm.register("qualification", {
                          required: true,
                        })}
                        className="input-field"
                        placeholder="e.g. B.Ed, M.Sc"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Experience (Years) *
                      </label>
                      <input
                        type="number"
                        {...teacherForm.register("experience_years", {
                          required: true,
                        })}
                        className="input-field"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Subjects You Teach *
                      </label>
                      <input
                        {...teacherForm.register("subjects", {
                          required: true,
                        })}
                        className="input-field"
                        placeholder="e.g. Maths, Physics"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        City *
                      </label>
                      <input
                        {...teacherForm.register("city", { required: true })}
                        className="input-field"
                        placeholder="Your city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Area
                      </label>
                      <input
                        {...teacherForm.register("area")}
                        className="input-field"
                        placeholder="Your locality"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        State *
                      </label>
                      <input
                        {...teacherForm.register("state", { required: true })}
                        className="input-field"
                        placeholder="Your state"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      About You
                    </label>
                    <textarea
                      {...teacherForm.register("message")}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Tell us about your teaching experience..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? (
                      "Submitting..."
                    ) : (
                      <>
                        Register as Teacher <FiSend className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Need Help?</h2>
          <p className="section-subtitle mx-auto mb-8">
            Talk to us directly on WhatsApp for quick assistance
          </p>
          <a
            href="https://wa.me/919109711321"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all shadow-lg"
          >
            <FaWhatsapp size={24} /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
};

export default HomeTuition;
