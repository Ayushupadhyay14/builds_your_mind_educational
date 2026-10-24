import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiMail, FiPhone, FiShield } from 'react-icons/fi';
import { ParallaxLayer } from '../components/Parallax';
import {
  EMAIL,
  EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  ADDRESS_DISPLAY,
} from '../config/contact';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="text-xl md:text-2xl font-display font-bold text-brand-blue mb-3">
      {title}
    </h2>
    <div className="space-y-3 text-slate-700 leading-relaxed">{children}</div>
  </section>
);

const Privacy = () => (
  <>
    <Helmet>
      <title>Privacy Policy | Builds Your Mind</title>
      <meta
        name="description"
        content="How Builds Your Mind collects, uses and protects information submitted through enquiry forms, newsletter sign-ups and analytics."
      />
    </Helmet>

    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 gradient-brand opacity-95" />
      <ParallaxLayer className="brand-pattern" />
      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 text-blue-100 text-sm font-medium rounded-full mb-6">
            <FiShield className="text-brand-orange" /> Your Data
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-blue-100/90">
            This policy explains what information we collect, why we collect it,
            and how you can ask us to correct or delete it.
          </p>
          <p className="text-sm text-blue-200/80 mt-4">
            Effective date: 24 October 2026
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto space-y-10">
          <Section title="1. Who we are">
            <p>
              Builds Your Mind is the education brand of{' '}
              <strong>Harmono Pvt. Ltd.</strong>, based in Indore, Madhya
              Pradesh, India. In this policy, “we”, “us” and “our” refer to
              Harmono Pvt. Ltd. operating the Builds Your Mind website.
            </p>
            <p>
              For privacy questions, contact us at{' '}
              <a className="text-brand-blue underline" href={EMAIL_HREF}>
                {EMAIL}
              </a>{' '}
              or{' '}
              <a className="text-brand-blue underline" href={PHONE_HREF}>
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </Section>

          <Section title="2. Information we collect">
            <p>We collect information in three ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Enquiry forms.</strong> Institution name, city, contact
                person, designation, phone number, email address, class group,
                number of students, programme of interest, preferred date and
                any message you choose to send.
              </li>
              <li>
                <strong>Newsletter sign-up.</strong> The email address you enter
                in the footer form.
              </li>
              <li>
                <strong>Technical and campaign data.</strong> Pages visited, the
                referring page, approximate device/browser information, and UTM
                campaign values in the link that brought you to the site. UTM
                values are kept in your browser session storage, not in a
                permanent profile.
              </li>
            </ul>
            <p>
              We do not ask for payment card details on this website. If a
              programme or product order is confirmed, payment instructions are
              shared separately in writing.
            </p>
          </Section>

          <Section title="3. Why we use it">
            <ul className="list-disc pl-6 space-y-2">
              <li>To reply to your enquiry and plan a workshop or programme.</li>
              <li>To prepare a quotation or proposal for your institution.</li>
              <li>To send newsletter updates if you subscribed.</li>
              <li>
                To understand which pages and campaigns are useful so we can
                improve the website.
              </li>
              <li>To keep business records and meet legal or tax obligations.</li>
            </ul>
            <p>
              We do not sell your personal information, and we do not use it to
              send unrelated marketing without your consent.
            </p>
          </Section>

          <Section title="4. Consent and your choices">
            <p>
              When you submit an enquiry, you ask us to contact you about it.
              When you subscribe to the newsletter, you consent to receiving
              updates. You can withdraw consent at any time by replying to an
              email, using the unsubscribe option in a newsletter, or contacting
              us directly.
            </p>
            <p>
              You can also ask us to confirm what information we hold about
              you, correct it, or delete it. We may need to keep some records
              where the law requires it, and we will explain if that applies.
            </p>
          </Section>

          <Section title="5. Cookies, analytics and campaign links">
            <p>
              The website uses essential browser storage to remember campaign
              (UTM) values for the current visit. If website analytics are
              enabled, we use a privacy-conscious configuration that anonymises
              IP addresses and does not send form contents. Analytics data is
              used in aggregate to improve the site.
            </p>
            <p>
              You can block or delete cookies and site data in your browser
              settings. Blocking essential storage will not stop you reading the
              site, but it may stop campaign attribution from working.
            </p>
          </Section>

          <Section title="6. Who receives your information">
            <p>
              Your enquiry is sent to our programme team. We may use trusted
              service providers for website hosting, email delivery, analytics
              and business record-keeping. They receive only what they need to
              provide that service and are not permitted to use it for their own
              marketing.
            </p>
            <p>
              We may disclose information if required by law, a court order or a
              lawful government request, or to protect our legal rights.
            </p>
          </Section>

          <Section title="7. How long we keep it">
            <p>
              Enquiry and programme records are kept for as long as needed to
              respond, deliver the programme and maintain business records.
              Newsletter email addresses are kept until you unsubscribe or ask
              us to delete them. Analytics data is kept according to the
              analytics provider's retention setting.
            </p>
          </Section>

          <Section title="8. Student images and children’s data">
            <p>
              The website is intended for institutions, teachers and parents,
              not for children to submit personal information. We do not
              knowingly collect personal information directly from children.
            </p>
            <p>
              Photographs or feedback that identify students are published only
              where the school and the relevant parent or guardian have given
              permission. If you believe an image should be removed, contact us
              and we will act promptly.
            </p>
          </Section>

          <Section title="9. Security">
            <p>
              We use reasonable technical and organisational measures to protect
              the information you send us, including HTTPS on the website and
              restricted access to enquiry records. No method of transmission or
              storage is completely secure, so please avoid sending sensitive
              information beyond what an enquiry needs.
            </p>
          </Section>

          <Section title="10. Changes to this policy">
            <p>
              We may update this policy when our services or legal obligations
              change. The effective date at the top of this page shows the
              latest version. Material changes will be communicated where
              appropriate.
            </p>
          </Section>

          <Section title="11. Contact and complaints">
            <p>
              For any privacy request or complaint, contact:
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 not-prose">
              <p className="font-semibold text-brand-blue">
                Harmono Pvt. Ltd. (Builds Your Mind)
              </p>
              <p>{ADDRESS_DISPLAY}</p>
              <p className="flex items-center gap-2 mt-1">
                <FiMail className="text-brand-orange" />
                <a className="text-brand-blue underline" href={EMAIL_HREF}>
                  {EMAIL}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="text-brand-orange" />
                <a className="text-brand-blue underline" href={PHONE_HREF}>
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
            <p>
              If you are not satisfied with our response, you may raise the
              matter with the appropriate data-protection authority in India.
            </p>
          </Section>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4">
            <Link to="/terms" className="btn-secondary">
              Read Terms of Service <FiArrowRight className="ml-2" />
            </Link>
            <Link to="/contact" className="btn-primary">
              Contact Us <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Privacy;
