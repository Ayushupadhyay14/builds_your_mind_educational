import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaSchool, FaRegBuilding, FaStar } from 'react-icons/fa';
import {
  FiSend,
  FiCheckCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiMessageSquare,
  FiBriefcase,
  FiLayers,
  FiUsers,
  FiArrowRight,
  FiArrowLeft,
  FiClock,
  FiShield,
  FiAlertCircle,
  FiAward
} from 'react-icons/fi';
import { submitEnquiry } from '../services/api';
import { getUtm, whatsappLink } from '../utils/utm';
import { EMAIL } from '../config/contact';
import toast from 'react-hot-toast';

const PROGRAMMES = [
  'STEM Workshop',
  'Robotics Workshop',
  'AI Workshop',
  'IoT Workshop',
  'Coding Workshop',
  'STEM Lab Setup & Programme',
  'School STEM Programme',
  'College / University Workshop',
  'STEM Partnership / MoU',
  'School Meeting / Consultation',
  'Not sure yet',
];

const AGE_GROUPS = [
  'Class 1-3 (age 6-8)',
  'Class 4-5 (age 9-10)',
  'Class 6-8 (age 11-13)',
  'Class 9-10 (age 14-15)',
  'Class 11-12 (age 16-17)',
  'College / University',
  'Mixed groups',
];

const Err = ({ e }) =>
  e ? (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1.5 text-rose-500 text-xs font-medium mt-1.5"
      role="alert"
    >
      <FiAlertCircle className="flex-shrink-0" />
      <span>{e.message}</span>
    </motion.p>
  ) : null;

const Label = ({ id, children, required, hint }) => (
  <div className="flex items-center justify-between mb-1.5">
    <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
      {children}
      {required ? <span className="text-brand-orange ml-1">*</span> : ''}
    </label>
    {hint && <span className="text-xs text-slate-400 font-normal">{hint}</span>}
  </div>
);

/**
 * Institutional lead-capture form with high-conversion UX.
 * `defaultProgramme` pre-selects the programme for the page it sits on.
 * `source` is the page ID/path, sent with the lead so we know which page converted.
 */
const EnquiryForm = ({ defaultProgramme = '', source = '' }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [step, setStep] = useState(1);
  // Set after mount so the pre-rendered HTML never bakes in the build date.
  const [today, setToday] = useState(undefined);
  useEffect(() => setToday(new Date().toISOString().split('T')[0]), []);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      programme: defaultProgramme,
      duration: 'One-time',
      institution: '',
      city: '',
      contact_person: '',
      designation: '',
      phone: '',
      email: '',
      age_group: '',
      students: '',
      preferred_date: '',
      message: '',
    },
  });

  const selectedDuration = watch('duration');
  const selectedProgramme = watch('programme');
  const messageContent = watch('message');

  const summary = (d) =>
    [
      `Institution: ${d.institution}`,
      `City: ${d.city}`,
      `Contact person: ${d.contact_person} (${d.designation})`,
      `Phone: ${d.phone}`,
      `Email: ${d.email}`,
      `Age/class group: ${d.age_group}`,
      `Number of students: ${d.students}`,
      `Programme: ${d.programme}`,
      `One-time / long-term: ${d.duration}`,
      d.preferred_date ? `Preferred date: ${d.preferred_date}` : null,
      d.message ? `Message: ${d.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');

  const onSubmit = async (d) => {
    setLoading(true);
    setFailed(false);
    const utm = getUtm();
    try {
      await submitEnquiry({
        ...d,
        enquiry_type: 'workshop',
        name: d.contact_person,
        email: d.email,
        phone: d.phone,
        company_name: d.institution,
        city: d.city,
        message: `${summary(d)}\n\nSource page: ${source || (typeof window !== 'undefined' ? window.location.pathname : '')}${
          Object.keys(utm).length ? `\nUTM: ${JSON.stringify(utm)}` : ''
        }`,
        source_page: source || (typeof window !== 'undefined' ? window.location.pathname : ''),
        ...utm,
      });
      toast.success('Thank you for your enquiry! We will get back to you soon.');
      setSubmittedData(d);
      setSubmitted(true);
      reset();
    } catch (err) {
      setFailed(true);
      toast.error('Failed to submit enquiry. Please try again or WhatsApp us.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async () => {
    const isStep1Valid = await trigger([
      'institution',
      'city',
      'contact_person',
      'designation',
      'phone',
      'email',
    ]);
    if (isStep1Valid) {
      setStep(2);
      // smoothly scroll form top into view
      const formEl = document.getElementById('enquiry-form-container');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const waText = () => {
    const v = getValues();
    const utm = getUtm();
    const tag = utm.utm_source ? ` [src: ${utm.utm_source}/${utm.utm_medium || '-'}]` : '';
    const body = v.institution
      ? summary(v)
      : `Hello Builds Your Mind, I would like to enquire about ${
          v.programme || defaultProgramme || 'a STEM programme'
        } for our institution.`;
    const path = source || (typeof window !== 'undefined' ? window.location.pathname : '');
    return `${body}\n\nPage: ${path}${tag}`;
  };

  const WhatsAppBtn = ({ className = '', label = 'Chat on WhatsApp' }) => (
    <a
      href={whatsappLink(waText())}
      onClick={(e) => {
        e.currentTarget.href = whatsappLink(waText());
      }}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      className={`btn-whatsapp ${className}`}
    >
      <FaWhatsapp className="mr-2 text-xl" /> {label}
    </a>
  );

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-card bg-white p-8 md:p-12 shadow-2xl rounded-3xl text-center border border-emerald-100 max-w-2xl mx-auto"
        role="status"
      >
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <FiCheckCircle className="text-3xl" />
          </div>
        </div>

        <span className="inline-block px-3.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wider uppercase rounded-full mb-3">
          Enquiry Received
        </span>

        <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-blue mb-3">
          Thank you, {submittedData?.contact_person || 'Educator'}!
        </h3>

        <p className="text-slate-600 mb-8 max-w-lg mx-auto text-base leading-relaxed">
          We have received details for{' '}
          <strong className="text-brand-blue">{submittedData?.institution || 'your institution'}</strong>.
          A dedicated STEM programme advisor will review your requirements and reach out within 24 hours.
        </p>

        {/* Timeline roadmap */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-left mb-8 max-w-md mx-auto">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
            <FiClock className="text-brand-orange" /> What Happens Next
          </h4>
          <ol className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-brand-blue text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
              <span className="text-slate-700">Detailed session proposal & curriculum match prepared.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-brand-blue text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
              <span className="text-slate-700">Direct consultation call to confirm dates and kit requirements.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-brand-orange text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
              <span className="text-slate-700">Hands-on STEM session executed at your campus.</span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <WhatsAppBtn className="w-full sm:w-auto" label="Connect on WhatsApp Now" />
          <button
            type="button"
            className="btn-secondary w-full sm:w-auto"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
          >
            Submit Another Request
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      id="enquiry-form-container"
      className="glass-card bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(30,58,138,0.08)] border border-slate-100 text-left relative"
    >
      {/* Decorative gradient corner badge */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-brand-orange/10 via-brand-blue/5 to-transparent rounded-tr-3xl pointer-events-none -z-10" />

      {/* Stepper Header */}
      <div className="mb-8 pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-blue mb-2">
              <FaStar className="text-brand-orange text-xs" /> Institutional Booking Form
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-brand-blue">
              {step === 1 ? '1. Institution & Coordinator Details' : '2. Programme & Scheduling Details'}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <span>Step {step} of 2</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
              {step === 1 ? '50%' : '100%'}
            </span>
          </div>
        </div>

        {/* Progress bar track */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-blue via-primary-500 to-brand-orange"
            initial={false}
            animate={{ width: step === 1 ? '50%' : '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </div>

        {/* Step buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              step === 1
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
            Institution Info
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              step === 2
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
            Workshop Preferences
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* STEP 1: Institution & Contact Details */}
        <div className={step === 1 ? 'block space-y-6' : 'hidden'}>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <Label id="eq-institution" required>Institution Name</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaRegBuilding className="text-base" />
                </span>
                <input
                  id="eq-institution"
                  className={`input-field pl-10 ${errors.institution ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                  placeholder="e.g. DPS Indore / Medi-Caps University"
                  {...register('institution', {
                    required: 'Institution name is required',
                    minLength: { value: 3, message: 'Please enter the full institution name' },
                  })}
                />
              </div>
              <Err e={errors.institution} />
            </div>

            <div>
              <Label id="eq-city" required>City / Location</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiMapPin className="text-base" />
                </span>
                <input
                  id="eq-city"
                  className={`input-field pl-10 ${errors.city ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                  placeholder="e.g. Indore, Ujjain, Dewas"
                  {...register('city', { required: 'City is required' })}
                />
              </div>
              <Err e={errors.city} />
            </div>

            <div>
              <Label id="eq-person" required>Contact Person Name</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiUser className="text-base" />
                </span>
                <input
                  id="eq-person"
                  className={`input-field pl-10 ${errors.contact_person ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                  placeholder="Your full name"
                  {...register('contact_person', { required: 'Contact person is required' })}
                />
              </div>
              <Err e={errors.contact_person} />
            </div>

            <div>
              <Label id="eq-designation" required>Designation / Role</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiBriefcase className="text-base" />
                </span>
                <input
                  id="eq-designation"
                  className={`input-field pl-10 ${errors.designation ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                  placeholder="e.g. Principal, STEM Coordinator, HOD"
                  {...register('designation', { required: 'Designation is required' })}
                />
              </div>
              <Err e={errors.designation} />
            </div>

            <div>
              <Label id="eq-phone" required hint="WhatsApp enabled">Phone Number</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-semibold text-xs border-r border-slate-200 pr-2 my-2">
                  +91
                </span>
                <input
                  id="eq-phone"
                  type="tel"
                  inputMode="tel"
                  className={`input-field pl-14 ${errors.phone ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                  placeholder="10-digit mobile number"
                  {...register('phone', {
                    required: 'Phone number is required',
                    validate: (v) => {
                      const digits = v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '');
                      return /^[6-9]\d{9}$/.test(digits) || 'Enter a valid 10-digit Indian mobile number';
                    },
                  })}
                />
              </div>
              <Err e={errors.phone} />
            </div>

            <div>
              <Label id="eq-email" required>Official Email</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiMail className="text-base" />
                </span>
                <input
                  id="eq-email"
                  type="email"
                  className={`input-field pl-10 ${errors.email ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                  placeholder="name@institution.edu.in"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Enter a valid email address',
                    },
                  })}
                />
              </div>
              <Err e={errors.email} />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <FiShield className="text-emerald-500" />
              Direct connection with our Indore academic coordinators.
            </span>
            <button
              type="button"
              onClick={handleNextStep}
              className="btn-primary w-full sm:w-auto !px-8 flex items-center justify-center gap-2 group"
            >
              Continue to Programme Details
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* STEP 2: Programme & Session Details */}
        <div className={step === 2 ? 'block space-y-6' : 'hidden'}>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {/* Programme Selection */}
            <div className="md:col-span-2">
              <Label id="eq-programme" required hint="Choose preferred topic">
                Programme Required
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiLayers className="text-base" />
                </span>
                <select
                  id="eq-programme"
                  className={`input-field pl-10 cursor-pointer ${errors.programme ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                  {...register('programme', { required: 'Please choose a programme' })}
                >
                  <option value="" disabled>Select a STEM Programme</option>
                  {PROGRAMMES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <Err e={errors.programme} />

              {/* Quick Pick Chips */}
              <div className="flex flex-wrap gap-2 mt-2.5">
                <span className="text-xs text-slate-400 self-center mr-1">Popular:</span>
                {['STEM Workshop', 'Robotics Workshop', 'AI Workshop', 'STEM Lab Setup & Programme'].map((quickP) => (
                  <button
                    key={quickP}
                    type="button"
                    onClick={() => setValue('programme', quickP, { shouldValidate: true })}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      selectedProgramme === quickP
                        ? 'bg-blue-100 text-brand-blue border-brand-blue font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    + {quickP}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Group */}
            <div>
              <Label id="eq-age" required>Student Class / Age Group</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiUsers className="text-base" />
                </span>
                <select
                  id="eq-age"
                  className={`input-field pl-10 cursor-pointer ${errors.age_group ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                  defaultValue=""
                  {...register('age_group', { required: 'Please choose a class group' })}
                >
                  <option value="" disabled>Select Target Classes</option>
                  {AGE_GROUPS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <Err e={errors.age_group} />
            </div>

            {/* Student Count */}
            <div>
              <Label id="eq-students" required>Approximate Number of Students</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiUser className="text-base" />
                </span>
                <input
                  id="eq-students"
                  type="number"
                  min="1"
                  className={`input-field pl-10 ${errors.students ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                  placeholder="e.g. 50"
                  {...register('students', {
                    required: 'Number of students is required',
                    min: { value: 1, message: 'Enter at least 1 student' },
                    max: { value: 100000, message: 'Please enter a realistic number' },
                    valueAsNumber: true,
                    validate: (v) => Number.isInteger(v) || 'Enter a whole number',
                  })}
                />
              </div>
              <Err e={errors.students} />
            </div>

            {/* Duration Type Pill Selector */}
            <div>
              <Label id="eq-duration" required>Engagement Format</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'One-time', label: 'One-Time Workshop' },
                  { value: 'Long-term', label: 'Annual Programme' },
                  { value: 'Not sure', label: 'Not Sure Yet' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setValue('duration', item.value, { shouldValidate: true })}
                    className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                      selectedDuration === item.value
                        ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <input type="hidden" {...register('duration', { required: 'Please choose one' })} />
              <Err e={errors.duration} />
            </div>

            {/* Preferred Date */}
            <div>
              <Label id="eq-date" hint="Tentative date">Preferred Date</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiCalendar className="text-base" />
                </span>
                <input
                  id="eq-date"
                  type="date"
                  className="input-field pl-10 cursor-pointer"
                  min={today}
                  {...register('preferred_date', {
                    validate: (v) =>
                      !v || v >= new Date().toISOString().split('T')[0] || 'Choose today or a later date',
                  })}
                />
              </div>
              <Err e={errors.preferred_date} />
            </div>

            {/* Message Area */}
            <div className="md:col-span-2">
              <Label
                id="eq-message"
                hint={`${(messageContent?.length || 0)}/1500 chars`}
              >
                Special Requirements or Questions
              </Label>
              <div className="relative">
                <textarea
                  id="eq-message"
                  rows={3}
                  className="input-field resize-none py-3"
                  placeholder="Share details about your lab space, existing kits, timetable preferences, or specific goals..."
                  {...register('message', {
                    maxLength: { value: 1500, message: 'Please keep it under 1500 characters' },
                  })}
                />
              </div>
              <Err e={errors.message} />
            </div>
          </div>

          {failed && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700 flex items-start gap-3"
              role="alert"
            >
              <FiAlertCircle className="text-rose-500 text-lg flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">We could not send your enquiry online just now.</p>
                <p className="text-rose-600 text-xs">
                  Please tap the WhatsApp button below or email <strong>{EMAIL}</strong> directly.
                </p>
              </div>
            </motion.div>
          )}

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary sm:w-auto !px-6 flex items-center justify-center gap-2"
            >
              <FiArrowLeft /> Back to Step 1
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed text-base font-bold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Enquiry...
                </>
              ) : (
                <>
                  Submit Institutional Enquiry <FiSend className="ml-1" />
                </>
              )}
            </button>
            <WhatsAppBtn className="sm:w-auto" label="WhatsApp Us" />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Fields marked <span className="text-brand-orange">*</span> are required.</span>
            <span>🔒 Confidential & Direct to Academic Team</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
