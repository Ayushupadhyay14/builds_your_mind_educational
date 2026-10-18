import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import { submitEnquiry } from '../services/api';
import { getUtm, whatsappLink } from '../utils/utm';

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
  e ? <p className="text-red-500 text-sm mt-1" role="alert">{e.message}</p> : null;

const Label = ({ id, children, required }) => (
  <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
    {children}
    {required ? ' *' : ''}
  </label>
);

/**
 * Institutional lead-capture form (Technical Checklist #20/#21/#22).
 * `defaultProgramme` pre-selects the programme for the page it sits on.
 * `source` is the page ID/path, sent with the lead so we know which page converted.
 */
const EnquiryForm = ({ defaultProgramme = '', source = '' }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { programme: defaultProgramme, duration: 'One-time' } });

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
        // Structured copies of the form data
        ...d,
        // Fields the existing enquiry endpoint already understands
        // (placed after the spread so the full summary is the message)
        enquiry_type: 'workshop',
        name: d.contact_person,
        email: d.email,
        phone: d.phone,
        company_name: d.institution,
        city: d.city,
        message: `${summary(d)}\n\nSource page: ${source || window.location.pathname}${
          Object.keys(utm).length ? `\nUTM: ${JSON.stringify(utm)}` : ''
        }`,
        source_page: source || window.location.pathname,
        ...utm,
      });
      setSubmitted(true);
      reset();
    } catch (err) {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const waText = () => {
    const v = getValues();
    const utm = getUtm();
    const tag = utm.utm_source ? ` [src: ${utm.utm_source}/${utm.utm_medium || '-'}]` : '';
    const body = v.institution
      ? summary(v)
      : `Hello Builds Your Mind, I would like to enquire about ${
          v.programme || defaultProgramme || 'a programme'
        } for our institution.`;
    return `${body}\n\nPage: ${source || window.location.pathname}${tag}`;
  };

  const WhatsAppBtn = ({ className = '' }) => (
    <a
      href={whatsappLink(waText())}
      onClick={(e) => {
        e.currentTarget.href = whatsappLink(waText());
      }}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      className={`btn-secondary ${className}`}
    >
      <FaWhatsapp className="mr-2" /> Chat on WhatsApp
    </a>
  );

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl text-center" role="status">
        <FiCheckCircle className="mx-auto text-5xl text-brand-orange mb-4" />
        <h3 className="text-2xl font-display font-bold text-brand-blue mb-3">
          Thank you for your enquiry
        </h3>
        <p className="text-gray-600 mb-6">
          Our programme team has your details. A programme advisor will get back to
          you to discuss dates, class groups and the plan.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <WhatsAppBtn />
          <button type="button" className="btn-secondary" onClick={() => setSubmitted(false)}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl text-left">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label id="eq-institution" required>Institution name</Label>
            <input
              id="eq-institution"
              className="input-field"
              placeholder="School / college name"
              {...register('institution', {
                required: 'Institution name is required',
                minLength: { value: 3, message: 'Please enter the full name' },
              })}
            />
            <Err e={errors.institution} />
          </div>
          <div>
            <Label id="eq-city" required>City</Label>
            <input
              id="eq-city"
              className="input-field"
              placeholder="e.g. Indore"
              {...register('city', { required: 'City is required' })}
            />
            <Err e={errors.city} />
          </div>
          <div>
            <Label id="eq-person" required>Contact person</Label>
            <input
              id="eq-person"
              className="input-field"
              placeholder="Your name"
              {...register('contact_person', { required: 'Contact person is required' })}
            />
            <Err e={errors.contact_person} />
          </div>
          <div>
            <Label id="eq-designation" required>Designation</Label>
            <input
              id="eq-designation"
              className="input-field"
              placeholder="e.g. Principal, Coordinator"
              {...register('designation', { required: 'Designation is required' })}
            />
            <Err e={errors.designation} />
          </div>
          <div>
            <Label id="eq-phone" required>Phone</Label>
            <input
              id="eq-phone"
              type="tel"
              inputMode="tel"
              className="input-field"
              placeholder="10-digit mobile number"
              {...register('phone', {
                required: 'Phone number is required',
                validate: (v) => {
                  const digits = v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '');
                  return /^[6-9]\d{9}$/.test(digits) || 'Enter a valid 10-digit Indian mobile number';
                },
              })}
            />
            <Err e={errors.phone} />
          </div>
          <div>
            <Label id="eq-email" required>Email</Label>
            <input
              id="eq-email"
              type="email"
              className="input-field"
              placeholder="you@institution.edu"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email address',
                },
              })}
            />
            <Err e={errors.email} />
          </div>
          <div>
            <Label id="eq-age" required>Student age / class group</Label>
            <select
              id="eq-age"
              className="input-field"
              defaultValue=""
              {...register('age_group', { required: 'Please choose a class group' })}
            >
              <option value="" disabled>Select class group</option>
              {AGE_GROUPS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <Err e={errors.age_group} />
          </div>
          <div>
            <Label id="eq-students" required>Number of students</Label>
            <input
              id="eq-students"
              type="number"
              min="1"
              className="input-field"
              placeholder="Approximate number"
              {...register('students', {
                required: 'Number of students is required',
                min: { value: 1, message: 'Enter at least 1 student' },
                max: { value: 100000, message: 'Please enter a realistic number' },
                valueAsNumber: true,
                validate: (v) => Number.isInteger(v) || 'Enter a whole number',
              })}
            />
            <Err e={errors.students} />
          </div>
          <div>
            <Label id="eq-programme" required>Programme required</Label>
            <select
              id="eq-programme"
              className="input-field"
              {...register('programme', { required: 'Please choose a programme' })}
            >
              <option value="" disabled>Select programme</option>
              {PROGRAMMES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Err e={errors.programme} />
          </div>
          <div>
            <Label id="eq-duration" required>One-time or long-term</Label>
            <select
              id="eq-duration"
              className="input-field"
              {...register('duration', { required: 'Please choose one' })}
            >
              <option value="One-time">One-time</option>
              <option value="Long-term">Long-term</option>
              <option value="Not sure">Not sure yet</option>
            </select>
            <Err e={errors.duration} />
          </div>
          <div className="md:col-span-2">
            <Label id="eq-date">Preferred date</Label>
            <input
              id="eq-date"
              type="date"
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
              {...register('preferred_date', {
                validate: (v) =>
                  !v || v >= new Date().toISOString().split('T')[0] || 'Choose today or a later date',
              })}
            />
            <Err e={errors.preferred_date} />
          </div>
        </div>

        <div>
          <Label id="eq-message">Message</Label>
          <textarea
            id="eq-message"
            rows={4}
            className="input-field resize-none"
            placeholder="Anything else we should know (optional)"
            {...register('message', { maxLength: { value: 1500, message: 'Please keep it under 1500 characters' } })}
          />
          <Err e={errors.message} />
        </div>

        {failed && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700" role="alert">
            We could not send your enquiry just now. Please try again, or use WhatsApp
            below, or email buildsyourmind@gmail.com.
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : (<>Send Enquiry <FiSend className="ml-2" /></>)}
          </button>
          <WhatsAppBtn className="flex-1" />
        </div>
        <p className="text-sm text-gray-500">Fields marked * are required.</p>
      </form>
    </div>
  );
};

export default EnquiryForm;
