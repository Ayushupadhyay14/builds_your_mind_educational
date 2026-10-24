import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiFileText, FiMail, FiPhone } from 'react-icons/fi';
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

const Section = ({ title, children }) => (
  <section className="scroll-mt-28">
    <h2 className="text-xl md:text-2xl font-display font-bold text-brand-blue mb-3">
      {title}
    </h2>
    <div className="space-y-3 text-slate-700 leading-relaxed">{children}</div>
  </section>
);

const Terms = () => (
  <>
    <Helmet>
      <title>Terms of Service | Builds Your Mind</title>
      <meta
        name="description"
        content="Terms for using the Builds Your Mind website and for workshop, programme and educational-kit enquiries, quotations, delivery, warranty and support."
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
            <FiFileText className="text-brand-orange" /> Website & Services
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-blue-100/90">
            These terms apply to this website and to enquiries, quotations and
            orders placed with Builds Your Mind.
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
          <Section title="1. About these terms">
            <p>
              This website is operated by <strong>Harmono Pvt. Ltd.</strong>{' '}
              under the brand Builds Your Mind. By using the website or sending
              an enquiry, you agree to these terms. If you do not agree, please
              do not use the site.
            </p>
          </Section>

          <Section title="2. Information on the website">
            <p>
              We try to keep programme descriptions, product information and
              contact details accurate. Education programmes and kits can change,
              so the website is a general guide rather than a binding offer.
              The written quotation or order confirmation we send you is the
              authoritative description of scope, price and deliverables.
            </p>
            <p>
              We do not guarantee a particular learning outcome, rank, admission
              result or exam score. Programme content is matched to the class
              group and the time available.
            </p>
          </Section>

          <Section title="3. Enquiries and quotations">
            <p>
              Submitting an enquiry does not create a contract. A contract is
              formed only when both sides confirm the scope, dates, price and
              payment terms in writing. We may decline an enquiry where the
              requested date, location or scope cannot be delivered properly.
            </p>
            <p>
              Quotations are valid for the period stated in the quotation. If no
              period is stated, please ask us to reconfirm before relying on it.
            </p>
          </Section>

          <Section title="4. Products, prices and availability">
            <p>
              Product pages may show a price, a bulk price or “price on
              request”. Prices can change and availability is confirmed at the
              time of order. Where a product is listed without a price, the
              current price is provided in the quotation.
            </p>
            <p>
              Images are illustrative. Kit contents, packaging and component
              brands may change where necessary, provided the educational
              purpose and agreed specifications are maintained.
            </p>
          </Section>

          <Section title="5. Delivery, warranty, replacement and refunds">
            <p>
              Delivery timelines, shipping charges, warranty periods, replacement
              terms and refund/cancellation terms are confirmed in writing in the
              quotation or order confirmation <strong>before</strong> payment.
              Please read that document before confirming an order.
            </p>
            <p>
              Where a product arrives damaged or incomplete, contact us promptly
              with photographs and the order reference so we can arrange a
              replacement or another remedy under the agreed terms. Consumable
              components and damage caused by misuse may be excluded.
            </p>
            <p>
              Workshop and programme cancellation or rescheduling terms are
              confirmed in the programme proposal. If a session has to be moved
              because of weather, a school closure or a similar event, we will
              work with you to find a new date.
            </p>
          </Section>

          <Section title="6. Payments">
            <p>
              This website does not currently take online payments. Payment
              instructions are shared separately in writing after an order or
              programme is confirmed. Do not send money to any account that has
              not been confirmed by our team through an official channel.
            </p>
          </Section>

          <Section title="7. Intellectual property">
            <p>
              The Builds Your Mind name, logo, text, photographs, programme
              materials and kit designs are owned by Harmono Pvt. Ltd. or used
              with permission. You may view and share links to the website for
              personal or institutional planning. You may not copy, resell or
              republish our content, images or kit designs without written
              permission.
            </p>
            <p>
              Student work and photographs remain the property of their creators
              or institutions; we publish them only with permission.
            </p>
          </Section>

          <Section title="8. Acceptable use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the website for unlawful, misleading or harmful activity.</li>
              <li>Attempt to gain unauthorised access to the site or its data.</li>
              <li>Submit false enquiries or another person’s information without permission.</li>
              <li>Scrape, copy or resell the website content or product data.</li>
              <li>Introduce malware or interfere with the website’s operation.</li>
            </ul>
          </Section>

          <Section title="9. Third-party links">
            <p>
              The website may link to third-party services such as WhatsApp,
              LinkedIn, Instagram or Google Maps. Those services have their own
              terms and privacy policies. We are not responsible for their
              content or practices.
            </p>
          </Section>

          <Section title="10. Limitation of liability">
            <p>
              To the extent permitted by law, Harmono Pvt. Ltd. is not liable for
              indirect or consequential loss arising from use of this website or
              reliance on general website content. Nothing in these terms
              excludes liability that cannot lawfully be excluded, including
              liability for fraud or for death or personal injury caused by
              negligence.
            </p>
          </Section>

          <Section title="11. Governing law">
            <p>
              These terms are governed by the laws of India. Subject to any
              applicable consumer-protection rights, the courts at Indore,
              Madhya Pradesh have exclusive jurisdiction over disputes arising
              from these terms or from a confirmed order.
            </p>
          </Section>

          <Section title="12. Changes and contact">
            <p>
              We may update these terms from time to time. The effective date at
              the top of the page shows the latest version. For questions about
              these terms, contact:
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
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
          </Section>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4">
            <Link to="/privacy" className="btn-secondary">
              Read Privacy Policy <FiArrowRight className="ml-2" />
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

export default Terms;
