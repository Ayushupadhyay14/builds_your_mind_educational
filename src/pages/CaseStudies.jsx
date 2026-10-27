import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ParallaxLayer } from '../components/Parallax';
import {
  FiArrowRight,
  FiMapPin,
  FiCalendar,
  FiLayers,
  FiCheckCircle,
  FiCpu,
  FiPlay,
  FiShield,
  FiMaximize2,
  FiX,
  FiFilm,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { FaGraduationCap, FaWhatsapp } from 'react-icons/fa';
import {
  getPublishedCaseStudies,
  getAllVerifiedVideos,
  filterCategories,
  caseStudyLinks,
} from '../data/caseStudies';
import { WHATSAPP_HREF } from '../config/contact';
import { SITE_URL } from '../config/site';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Normalizes any YouTube URL into an embed URL
function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed.includes('youtube.com/embed/')) return trimmed;

  const matchShort = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (matchShort && matchShort[1]) {
    return `https://www.youtube-nocookie.com/embed/${matchShort[1]}`;
  }

  const matchStandard = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (matchStandard && matchStandard[1]) {
    return `https://www.youtube-nocookie.com/embed/${matchStandard[1]}`;
  }

  return trimmed;
}

// Safe helper to extract image source whether photo is string or object
const getPhotoSrc = (p) => {
  if (!p) return '';
  if (typeof p === 'string') return p;
  return p.src || '';
};

const getPhotoAlt = (p, fallback = '') => {
  if (!p) return fallback;
  if (typeof p === 'string') return fallback;
  return p.alt || p.caption || fallback;
};

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

  const allPublished = useMemo(() => getPublishedCaseStudies(), []);
  const verifiedVideos = useMemo(() => getAllVerifiedVideos(), []);

  // Handle ESC key and prevent body scroll when video or photo modal is open
  useEffect(() => {
    if (activeVideo || activePhoto) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveVideo(null);
          setActivePhoto(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [activeVideo, activePhoto]);

  // Filter matching logic based on the 7 filter categories
  const filteredCaseStudies = useMemo(() => {
    if (activeFilter === 'All') return allPublished;

    return allPublished.filter((cs) => {
      if (activeFilter === 'College / University') {
        return (
          cs.classGroup === 'College / University' ||
          (cs.tags && cs.tags.includes('College / University'))
        );
      }
      if (activeFilter === 'Schools') {
        return (
          (cs.classGroup && cs.classGroup.startsWith('Class')) ||
          (cs.tags && cs.tags.includes('Schools'))
        );
      }
      if (activeFilter === 'Robotics') {
        return (
          cs.workshopType === 'Robotics' ||
          (cs.tags && cs.tags.includes('Robotics'))
        );
      }
      if (activeFilter === 'AI & Coding') {
        return (
          cs.workshopType === 'AI & Coding' ||
          cs.workshopType === 'AI' ||
          cs.workshopType === 'Coding' ||
          (cs.tags &&
            (cs.tags.includes('AI') ||
              cs.tags.includes('Coding') ||
              cs.tags.includes('AI & Coding')))
        );
      }
      if (activeFilter === 'IoT') {
        return (
          cs.workshopType === 'IoT' ||
          (cs.tags && cs.tags.includes('IoT'))
        );
      }
      if (activeFilter === 'STEM Science') {
        return (
          cs.workshopType === 'STEM Science' ||
          cs.workshopType === 'STEM' ||
          (cs.tags &&
            (cs.tags.includes('STEM') || cs.tags.includes('STEM Science')))
        );
      }
      return true;
    });
  }, [allPublished, activeFilter]);

  return (
    <>
      <Helmet>
        <title>STEM Workshop Case Studies in Indore | Builds Your Mind</title>
        <meta
          name="description"
          content="Real STEM, robotics, AI and IoT workshops completed at schools and colleges in Indore. See what students built."
        />
        <link rel="canonical" href={`${SITE_URL}/case-studies`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'STEM Workshop Case Studies in Indore',
            description:
              'Real STEM, robotics, AI and IoT workshops completed at schools and colleges in Indore. See what students built.',
            url: `${SITE_URL}/case-studies`,
            publisher: {
              '@type': 'Organization',
              name: 'Builds Your Mind by Harmono Pvt. Ltd.',
              url: SITE_URL,
            },
          })}
        </script>
      </Helmet>

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95" />
        <div
          aria-hidden="true"
          className="absolute inset-0 circuit-pattern opacity-15 pointer-events-none"
        />
        <ParallaxLayer className="brand-pattern" />

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-amber-300 text-xs sm:text-sm font-semibold rounded-full border border-white/15 backdrop-blur-sm">
                <FiShield className="text-amber-400" /> Published With Written Permission
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Case Studies &amp; Real Evidence
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Documented from completed sessions in Indore, Ujjain, Dewas and Dhar,
              published with permission.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Link to="/contact?type=quote" className="btn-primary w-full sm:w-auto">
                Request a Quote <FiArrowRight className="ml-2" />
              </Link>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                <FaWhatsapp className="mr-2 text-lg" /> Chat with Advisor
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom wave separator */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            className="w-full h-8 sm:h-12 md:h-16 object-fill"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0V120Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-20 bg-slate-50 min-h-[500px]">
        <div className="container-custom">
          {/* 2. Filter Bar */}
          <div className="mb-10 md:mb-14">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                Filter by Programme or Level
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Showing {filteredCaseStudies.length} of {allPublished.length} verified sessions
              </span>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5 pb-2">
              {filterCategories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border min-h-[40px] flex items-center justify-center ${
                      isActive
                        ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-brand-blue hover:text-brand-blue hover:bg-blue-50/50'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verified Video Showcase Strip: Click to play real workshop videos */}
          {verifiedVideos.length > 0 && activeFilter === 'All' ? (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/10 text-brand-orange-deep text-xs font-bold uppercase rounded-full mb-1">
                    <FiPlay size={11} className="fill-brand-orange" /> Real Session Recordings
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-blue">
                    Watch Workshop Footage in Action
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Click any video to play directly
                </span>
              </div>

              <div className={verifiedVideos.length === 1 ? "grid grid-cols-1 max-w-xl" : "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"}>
                {verifiedVideos.map((vid) => (
                  <button
                    key={vid.id || vid.videoUrl}
                    type="button"
                    onClick={() =>
                      setActiveVideo({
                        videoUrl: vid.videoUrl,
                        youtubeUrl: vid.youtubeUrl,
                        title: vid.title,
                        institution: vid.institution,
                        slug: vid.slug,
                        allVideos: verifiedVideos.filter((v) => v.slug === vid.slug),
                      })
                    }
                    className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-brand-blue/50 shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden w-full">
                      <img
                        src={vid.poster}
                        alt={vid.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Play overlay button */}
                      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:bg-brand-orange-deep transition-all duration-300 border-2 border-white/80">
                          <FiPlay className="text-xl fill-white ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-black/80 text-amber-300 text-[11px] font-bold rounded-full backdrop-blur-sm">
                        {vid.category || 'Workshop Clip'}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-brand-orange-deep uppercase tracking-wider mb-1">
                          {vid.institution}
                        </p>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-brand-blue transition-colors leading-snug">
                          {vid.title}
                        </h3>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <FiCheckCircle size={12} /> Verified Session
                        </span>
                        <span className="text-brand-blue group-hover:underline flex items-center gap-1 font-bold">
                          Play Video <FiPlay size={10} className="fill-brand-blue" />
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* 3. Case study card grid (2 columns desktop, 1 mobile) */}
          {filteredCaseStudies.length === 0 ? (
            /* Friendly Honest Empty State */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto my-12 bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-brand-blue rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <FiLayers className="text-3xl sm:text-4xl text-brand-blue" />
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-blue mb-3">
                Case notes will appear here as our sessions are completed.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
                We publish case studies and pictures only from real, completed
                institutional work with written permission. We do not use invented
                testimonials or borrowed figures.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                {activeFilter !== 'All' ? (
                  <button
                    type="button"
                    onClick={() => setActiveFilter('All')}
                    className="btn-outline text-xs sm:text-sm"
                  >
                    Reset Filter
                  </button>
                ) : null}
                <Link to="/contact?type=quote" className="btn-primary text-xs sm:text-sm">
                  Invite Us to Your Institution
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <AnimatePresence>
                {filteredCaseStudies.map((cs) => {
                  const coverSrc = cs.coverPhoto || (cs.photos && getPhotoSrc(cs.photos[0]));
                  const primaryVideo = cs.videos?.[0] || cs.video;
                  const hasVideo = Boolean(primaryVideo?.videoUrl || primaryVideo?.youtubeUrl);

                  return (
                    <motion.article
                      key={cs.slug}
                      variants={fadeInUp}
                      className="card flex flex-col justify-between overflow-hidden border border-slate-200/90 hover:border-brand-blue/30 shadow-md hover:shadow-xl transition-all duration-300 group"
                    >
                      <div>
                        {/* Cover Media Header: Pure authentic workshop photo */}
                        {coverSrc ? (
                          <div
                            onClick={() =>
                              setActivePhoto({
                                src: coverSrc,
                                alt: cs.coverPhotoAlt || cs.title,
                                caption: cs.coverPhotoAlt || cs.title,
                                institution: cs.institution,
                              })
                            }
                            className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 group/cover cursor-pointer"
                          >
                            <img
                              src={coverSrc}
                              alt={cs.coverPhotoAlt || cs.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay Badges */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">
                              {cs.workshopType ? (
                                <span className="px-3 py-1 bg-brand-blue/95 text-white text-xs font-bold rounded-full backdrop-blur-md shadow-sm">
                                  {cs.workshopType}
                                </span>
                              ) : null}
                              {cs.classGroup ? (
                                <span className="px-3 py-1 bg-brand-orange-deep text-white text-xs font-bold rounded-full shadow-sm">
                                  {cs.classGroup}
                                </span>
                              ) : null}
                            </div>

                            {/* Subtle Click to View Photo badge on hover */}
                            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 text-white text-xs font-semibold backdrop-blur-md opacity-0 group-hover/cover:opacity-100 transition-opacity">
                              <FiMaximize2 size={12} />
                              <span>View Photo</span>
                            </div>
                          </div>
                        ) : (
                          <div className="px-6 sm:px-8 pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 bg-slate-50">
                            <div className="flex flex-wrap gap-2">
                              {cs.workshopType ? (
                                <span className="px-3 py-1 bg-blue-50 text-brand-blue text-xs font-bold rounded-full border border-blue-200">
                                  {cs.workshopType}
                                </span>
                              ) : null}
                              {cs.classGroup ? (
                                <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
                                  {cs.classGroup}
                                </span>
                              ) : null}
                            </div>
                            {cs.date ? (
                              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                                <FiCalendar className="text-slate-400" /> {cs.date}
                              </span>
                            ) : null}
                          </div>
                        )}

                        {/* Card Content Body */}
                        <div className="p-6 sm:p-8">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-orange-deep mb-2">
                            <FiMapPin className="flex-shrink-0" />
                            <span>
                              {cs.institution}
                              {cs.city ? ` · ${cs.city}` : ''}
                            </span>
                            {cs.date ? (
                              <span className="text-slate-400 font-normal ml-auto text-xs">
                                {cs.date}
                              </span>
                            ) : null}
                          </div>

                          <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-blue mb-3 group-hover:text-primary-600 transition-colors leading-snug">
                            <Link to={`/case-studies/${cs.slug}`}>
                              {cs.title}
                            </Link>
                          </h2>

                          {cs.summary ? (
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                              {cs.summary}
                            </p>
                          ) : cs.whatWeDid ? (
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                              {cs.whatWeDid}
                            </p>
                          ) : null}

                          {/* Photos Thumbnail Strip Preview: Pure authentic photos */}
                          {cs.photos && cs.photos.length > 1 ? (
                            <div className="mb-6">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1">
                                  <FiMaximize2 size={12} /> Workshop Photos ({cs.photos.length})
                                </p>
                                <span className="text-[11px] text-slate-400">Click photo to view</span>
                              </div>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {cs.photos.slice(0, 4).map((photo, pIdx) => {
                                  const pSrc = getPhotoSrc(photo);
                                  const pCaption = typeof photo === 'object' ? photo.caption : '';
                                  return (
                                    <button
                                      key={pIdx}
                                      type="button"
                                      onClick={() =>
                                        setActivePhoto({
                                          src: pSrc,
                                          alt: getPhotoAlt(photo, `Photo ${pIdx + 1}`),
                                          caption: pCaption || cs.title,
                                          institution: cs.institution,
                                        })
                                      }
                                      className="group/p aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative text-left cursor-pointer hover:border-brand-blue transition"
                                      title="Click to view full photo"
                                    >
                                      <img
                                        src={pSrc}
                                        alt={getPhotoAlt(photo, `Photo ${pIdx + 1}`)}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover/p:scale-110 transition-transform duration-300"
                                      />
                                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/p:opacity-100 transition-opacity flex items-center justify-center">
                                        <FiMaximize2 className="text-white text-sm" />
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ) : null}

                          {/* What Students Built highlights */}
                          {cs.whatStudentsBuilt && cs.whatStudentsBuilt.length > 0 ? (
                            <div className="space-y-2 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
                                <FiCpu className="text-brand-orange" /> What students built:
                              </p>
                              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5">
                                {cs.whatStudentsBuilt.slice(0, 2).map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <FiCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                                {cs.whatStudentsBuilt.length > 2 ? (
                                  <li className="text-xs text-brand-blue font-semibold pl-5">
                                    + {cs.whatStudentsBuilt.length - 2} more hands-on builds
                                  </li>
                                ) : null}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {/* Card Footer Action: Watch Video Button + View Case Study */}
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 mt-auto pt-4">
                        {cs.studentsApprox ? (
                          <span className="text-xs text-slate-500 font-medium">
                            Approx. {cs.studentsApprox} students
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">Institutional session</span>
                        )}

                        <div className="flex items-center gap-2">
                          {hasVideo ? (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveVideo({
                                  videoUrl: primaryVideo?.videoUrl,
                                  youtubeUrl: primaryVideo?.youtubeUrl,
                                  title: primaryVideo?.title || cs.title,
                                  institution: cs.institution,
                                  slug: cs.slug,
                                  allVideos: cs.videos && cs.videos.length > 0 ? cs.videos : [primaryVideo],
                                });
                              }}
                              className="btn-outline !py-2.5 !px-4 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-brand-orange text-brand-orange hover:bg-orange-50 hover:border-brand-orange-deep"
                            >
                              <FiPlay className="text-brand-orange fill-brand-orange" size={12} /> Watch Video
                            </button>
                          ) : null}

                          <Link
                            to={`/case-studies/${cs.slug}`}
                            className="btn-primary !py-2.5 !px-4 text-xs sm:text-sm font-bold flex items-center gap-1.5"
                          >
                            View Case Study <FiArrowRight />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* 5. Bottom CTA strip: "Invite Us to Your Institution" */}
          <div className="mt-16 sm:mt-24">
            <div className="glass-card bg-gradient-to-r from-brand-blue-dark via-brand-blue to-primary-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
              <div
                aria-hidden="true"
                className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none"
              />
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 text-amber-300 text-xs font-bold uppercase rounded-full mb-4 border border-white/15">
                  <FaGraduationCap /> Hands-on Workshops for Schools &amp; Colleges
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 text-white">
                  Invite Us to Your Institution
                </h2>
                <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  Whether you are planning a one-day robotics immersion, an AI
                  curriculum module, or an institutional MoU, our educators design
                  the session plan around your students' grade levels.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link to="/contact?type=quote" className="btn-primary">
                    Enquire for Your Institution <FiArrowRight className="ml-2" />
                  </Link>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <FaWhatsapp className="mr-2 text-lg" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Programme Navigation */}
          <div className="mt-16 text-center">
            <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-4">
              Explore Our Workshop &amp; Programme Pages
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {caseStudyLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 bg-white text-slate-700 hover:text-brand-blue hover:border-brand-blue border border-slate-200 text-xs font-semibold rounded-full transition-colors shadow-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Video Player Lightbox Modal */}
      <AnimatePresence>
        {activeVideo ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Workshop video player"
          >
            <div
              className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2.5 min-w-0 pr-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-white text-sm sm:text-base font-bold truncate">
                      {activeVideo.title}
                    </h3>
                    {activeVideo.institution ? (
                      <p className="text-xs text-amber-400 font-semibold truncate">
                        {activeVideo.institution}
                      </p>
                    ) : null}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="text-slate-400 hover:text-white p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition flex-shrink-0"
                  aria-label="Close video player"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Video Screen */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                {activeVideo.youtubeUrl ? (
                  <iframe
                    src={`${getYouTubeEmbedUrl(activeVideo.youtubeUrl)}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : activeVideo.videoUrl ? (
                  <video
                    key={activeVideo.videoUrl}
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-slate-400 text-sm">No video source provided</div>
                )}
              </div>

              {/* Multi-clip playlist switcher if this workshop has more clips */}
              {activeVideo.allVideos && activeVideo.allVideos.length > 1 ? (
                <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                    <FiPlay className="text-brand-orange" size={12} /> More Video Clips From This Workshop ({activeVideo.allVideos.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeVideo.allVideos.map((clip, cIdx) => {
                      const isSelected =
                        (clip.videoUrl && clip.videoUrl === activeVideo.videoUrl) ||
                        (clip.youtubeUrl && clip.youtubeUrl === activeVideo.youtubeUrl);
                      return (
                        <button
                          key={clip.id || cIdx}
                          type="button"
                          onClick={() =>
                            setActiveVideo({
                              ...activeVideo,
                              videoUrl: clip.videoUrl,
                              youtubeUrl: clip.youtubeUrl,
                              title: clip.title,
                            })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                            isSelected
                              ? 'bg-brand-orange text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          <FiPlay size={10} className={isSelected ? 'fill-white' : ''} />
                          <span className="truncate max-w-[200px]">
                            {clip.title || `Clip ${cIdx + 1}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Footer info & Link */}
              <div className="px-4 sm:px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-slate-400">
                  Captured during live workshops in Indore
                </span>
                {activeVideo.slug ? (
                  <Link
                    to={`/case-studies/${activeVideo.slug}`}
                    onClick={() => setActiveVideo(null)}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    Read full case study <FiArrowRight size={13} />
                  </Link>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Interactive Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhoto ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActivePhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Workshop photo view"
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Close photo view"
            >
              <FiX size={24} />
            </button>

            <div
              className="max-w-5xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.alt || 'Workshop photo'}
                className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center max-w-2xl px-4">
                {activePhoto.caption ? (
                  <p className="text-white text-sm sm:text-base leading-relaxed font-medium">
                    {activePhoto.caption}
                  </p>
                ) : null}
                {activePhoto.institution ? (
                  <p className="text-xs text-amber-400 mt-1 font-semibold">
                    {activePhoto.institution}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default CaseStudies;
