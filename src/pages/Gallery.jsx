import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { ParallaxLayer } from '../components/Parallax';
import { galleryPhotos, galleryCategories } from '../data/gallery';
import { videos } from '../data/videos';
import { SITE_URL } from '../config/site';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Gallery = () => {
  const [category, setCategory] = useState('All');
  const [open, setOpen] = useState(null);

  const shown = category === 'All' ? galleryPhotos : galleryPhotos.filter((p) => p.category === category);
  const counts = (c) => (c === 'All' ? galleryPhotos.length : galleryPhotos.filter((p) => p.category === c).length);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length]
  );

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open !== null ? shown[open] : null;

  return (
    <>
      <Helmet>
        <title>Photo Gallery: STEM Workshops in Indore | Builds Your Mind</title>
        <meta
          name="description"
          content="Photos from real Builds Your Mind STEM, robotics and electronics workshops in schools and colleges across Indore and Madhya Pradesh."
        />
        <link rel="canonical" href={`${SITE_URL}/gallery`} />
      </Helmet>

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95" />
        <ParallaxLayer className="brand-pattern" />
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-white/10 text-blue-100 text-sm font-medium rounded-full mb-6">
              From Our Sessions
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Photo Gallery
            </h1>
            <p className="text-base sm:text-lg text-blue-100/90">
              Real moments from our STEM, robotics and electronics workshops in schools and colleges.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-brand-cream">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10" role="tablist" aria-label="Filter photos">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-colors ${
                  category === c
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-white text-brand-blue border-slate-200 hover:border-brand-blue'
                }`}
              >
                {c} <span className="opacity-70">({counts(c)})</span>
              </button>
            ))}
          </div>

          <ul className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [&>li]:mb-3 sm:[&>li]:mb-4">
            {shown.map((p, i) => (
              <li key={p.file} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo: ${p.alt}`}
                  className="block w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto hover:scale-[1.03] transition-transform duration-500"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <Link to="/contact?type=meeting" className="btn-primary">
              Book a School Meeting <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section id="videos" className="py-12 sm:py-20 bg-white scroll-mt-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100/30 text-brand-blue text-sm font-medium rounded-full mb-4">
              Watch
            </span>
            <h2 className="section-title mb-3">Videos From Our Sessions</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Short clips from workshops and events in schools. Tap play to watch.
            </p>
          </div>
          <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {videos.map((v) => (
              <li key={v.id} className="rounded-2xl overflow-hidden border border-slate-100 shadow-md bg-white flex flex-col">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={v.poster}
                  aria-label={v.title}
                  className="w-full aspect-[9/16] bg-slate-900 object-contain"
                >
                  <source src={v.src} type="video/mp4" />
                </video>
                <div className="p-3 sm:p-4">
                  <h3 className="font-display font-bold text-sm sm:text-base text-brand-blue leading-snug mb-1">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600">{v.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[1000] bg-slate-950/95 flex items-center justify-center p-3 sm:p-8"
          onClick={close}
        >
          <button type="button" onClick={close} aria-label="Close" className="absolute top-3 right-3 sm:top-5 sm:right-5 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
            <FiX size={22} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-2 sm:left-5 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
            <FiChevronLeft size={24} />
          </button>
          <figure className="max-h-full max-w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} className="max-h-[78vh] max-w-full w-auto rounded-xl object-contain" />
            <figcaption className="mt-3 text-center text-xs sm:text-sm text-slate-300 max-w-xl px-10">
              {current.alt} · {open + 1}/{shown.length}
            </figcaption>
          </figure>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-2 sm:right-5 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
            <FiChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
