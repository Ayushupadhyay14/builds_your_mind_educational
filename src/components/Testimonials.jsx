import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { getTestimonials } from '../services/api';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const normalise = (item) => ({
  id: item.id ?? item.pk ?? item.uuid,
  quote: item.content || item.quote || item.message || '',
  name: item.name || item.author || item.client_name || '',
  role: item.role || item.designation || '',
  institution: item.institution || item.company || item.company_name || '',
  rating: Number(item.rating) || 0,
  image: item.image || item.avatar || item.photo || '',
});

/**
 * Real feedback only.
 *
 * This component deliberately renders nothing when there is no published,
 * permission-based testimonial in the API. That is better than showing an
 * invented quote. Add real testimonials in the admin/API to make it appear.
 */
const Testimonials = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await getTestimonials();
        const data = res?.data;
        const list = Array.isArray(data) ? data : data?.results || [];
        const cleaned = list
          .map(normalise)
          .filter((t) => t.quote && t.name);
        if (!cancelled) setItems(cleaned);
      } catch {
        // Network/API failure is not an error the visitor needs to see.
        if (!cancelled) setItems([]);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50/90 border border-blue-200/60 text-brand-blue text-xs font-bold tracking-wide uppercase rounded-full mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-orange" />
            <span>Feedback With Permission</span>
          </div>
          <h2 className="section-title mb-4">What School Leaders Say</h2>
          <p className="section-subtitle">
            Every quote below comes from a real institution and is published
            with its permission. We do not use invented testimonials.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <motion.blockquote
              key={t.id || `${t.name}-${t.quote.slice(0, 20)}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="card h-full p-7 flex flex-col border border-slate-100"
            >
              <FaQuoteLeft className="text-brand-orange/70 text-2xl mb-4" />
              <p className="text-slate-700 leading-relaxed flex-grow">
                “{t.quote}”
              </p>

              {t.rating > 0 && (
                <div
                  className="flex items-center gap-1 mt-4 text-brand-orange"
                  aria-label={`${t.rating} out of 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < t.rating ? 'opacity-100' : 'opacity-25'}
                    />
                  ))}
                </div>
              )}

              <footer className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-3">
                {t.image ? (
                  <img
                    src={t.image}
                    alt=""
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="w-10 h-10 rounded-full bg-blue-50 text-brand-blue font-display font-bold flex items-center justify-center"
                  >
                    {t.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0">
                  <cite className="not-italic font-semibold text-brand-blue block truncate">
                    {t.name}
                  </cite>
                  <span className="text-xs text-slate-500 block truncate">
                    {[t.role, t.institution].filter(Boolean).join(', ')}
                  </span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
