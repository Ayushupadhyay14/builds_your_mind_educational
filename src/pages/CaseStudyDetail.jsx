import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiClock,
  FiAward,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiShield,
} from 'react-icons/fi';
import { FaGraduationCap, FaWhatsapp, FaQuoteLeft } from 'react-icons/fa';
import { getCaseStudyBySlug } from '../data/caseStudies';
import { WHATSAPP_HREF } from '../config/contact';
import { SITE_URL } from '../config/site';

/**
 * Normalizes any YouTube URL (standard, shortened, or embed) into an embed URL
 */
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

const getPhotoSrc = (p) => {
  if (!p) return '';
  if (typeof p === 'string') return p;
  return p.src || '';
};

const getPhotoCaption = (p) => {
  if (!p || typeof p === 'string') return '';
  return p.caption || '';
};

const getPhotoAlt = (p, fallback = '') => {
  if (!p) return fallback;
  if (typeof p === 'string') return fallback;
  return p.alt || p.caption || fallback;
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const caseStudy = getCaseStudyBySlug(slug);

  // Lightbox state
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Filter photos to only those that have valid sources
  const approvedPhotos = caseStudy?.photos
    ? caseStudy.photos.filter((p) => {
        const src = getPhotoSrc(p);
        if (!src) return false;
        if (typeof p === 'object' && p.approvedFace === false) return false;
        return true;
      })
    : [];

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? approvedPhotos.length - 1 : prev - 1
    );
  }, [activePhotoIndex, approvedPhotos.length]);

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev === approvedPhotos.length - 1 ? 0 : prev + 1
    );
  }, [activePhotoIndex, approvedPhotos.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    },
    [activePhotoIndex, handlePrevPhoto, handleNextPhoto]
  );

  useEffect(() => {
    if (activePhotoIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activePhotoIndex, handleKeyDown]);

  if (!caseStudy) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-24 bg-slate-50">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FiLayers className="text-3xl text-brand-blue" />
          </div>
          <h1 className="text-2xl font-display font-bold text-brand-blue mb-3">
            Case Study Not Found
          </h1>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            The requested case study is either unpublished or awaiting written
            verification from the institution.
          </p>
          <Link to="/case-studies" className="btn-primary">
            <FiArrowLeft className="mr-2" /> Back to All Case Studies
          </Link>
        </div>
      </div>
    );
  }

  // Support multiple videos or single video object
  const workshopVideos = useMemo(() => {
    if (caseStudy?.videos && caseStudy.videos.length > 0) {
      return caseStudy.videos;
    }
    if (caseStudy?.video?.videoUrl || caseStudy?.video?.youtubeUrl) {
      return [caseStudy.video];
    }
    return [];
  }, [caseStudy]);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const currentVideo = workshopVideos[activeVideoIndex] || workshopVideos[0];

  const embedUrl = currentVideo?.youtubeUrl
    ? getYouTubeEmbedUrl(currentVideo.youtubeUrl)
    : '';
  const localVideoUrl = currentVideo?.videoUrl || '';

  // Quick facts list — only display facts that actually have data
  const quickFacts = [
    {
      label: 'Institution',
      value: caseStudy.institution,
      icon: FaGraduationCap,
    },
    {
      label: 'City',
      value: caseStudy.city,
      icon: FiMapPin,
    },
    {
      label: 'Class Group',
      value: caseStudy.classGroup,
      icon: FiUsers,
    },
    {
      label: 'Students (approx.)',
      value: caseStudy.studentsApprox,
      icon: FiUsers,
    },
    {
      label: 'Workshop Type',
      value: caseStudy.workshopType,
      icon: FiCpu,
    },
    {
      label: 'Date',
      value: caseStudy.date,
      icon: FiCalendar,
    },
    {
      label: 'Engagement Format',
      value: caseStudy.engagementFormat,
      icon: FiClock,
    },
  ].filter((f) => Boolean(f.value));

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.whatWeDid || caseStudy.summary,
    url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
    datePublished: caseStudy.permissionDate || caseStudy.date,
    author: {
      '@type': 'Organization',
      name: 'Builds Your Mind',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Builds Your Mind by Harmono Pvt. Ltd.',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
    ...(caseStudy.coverPhoto ? { image: `${SITE_URL}${caseStudy.coverPhoto}` } : {}),
  };

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | Case Studies | Builds Your Mind</title>
        <meta
          name="description"
          content={
            caseStudy.summary ||
            (caseStudy.whatWeDid
              ? caseStudy.whatWeDid.slice(0, 150)
              : `Real workshop case study at ${caseStudy.institution}, ${caseStudy.city}.`)
          }
        />
        <link rel="canonical" href={`${SITE_URL}/case-studies/${caseStudy.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLdArticle)}</script>
      </Helmet>

      {/* Header / Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 gradient-brand opacity-95" />
        <div
          aria-hidden="true"
          className="absolute inset-0 circuit-pattern opacity-15 pointer-events-none"
        />

        <div className="container-custom relative z-10">
          {/* Breadcrumb & Back button */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200 mb-6">
            <Link
              to="/case-studies"
              className="hover:text-white transition flex items-center gap-1 font-semibold"
            >
              <FiArrowLeft /> Case Studies
            </Link>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-xs sm:max-w-md">
              {caseStudy.institution}
            </span>
          </div>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {caseStudy.workshopType ? (
                <span className="px-3.5 py-1 bg-white/10 text-amber-300 text-xs font-bold rounded-full uppercase tracking-wider border border-white/15">
                  {caseStudy.workshopType}
                </span>
              ) : null}
              {caseStudy.classGroup ? (
                <span className="px-3.5 py-1 bg-brand-orange-deep text-white text-xs font-bold rounded-full">
                  {caseStudy.classGroup}
                </span>
              ) : null}
              {caseStudy.city ? (
                <span className="text-xs text-blue-200 flex items-center gap-1">
                  <FiMapPin /> {caseStudy.city}
                </span>
              ) : null}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
              {caseStudy.title}
            </h1>

            {caseStudy.summary ? (
              <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-3xl">
                {caseStudy.summary}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Main Case Study Article Body */}
      <main className="py-12 md:py-16 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              {/* What We Did Section */}
              {caseStudy.whatWeDid ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-blue mb-4 flex items-center gap-2.5">
                    <FiLayers className="text-brand-orange" /> What We Did
                  </h2>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {caseStudy.whatWeDid}
                  </p>
                </div>
              ) : null}

              {/* What Students Built (Bullets) */}
              {caseStudy.whatStudentsBuilt && caseStudy.whatStudentsBuilt.length > 0 ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-blue mb-6 flex items-center gap-2.5">
                    <FiCpu className="text-brand-orange" /> What Students Built
                  </h2>
                  <ul className="space-y-3.5">
                    {caseStudy.whatStudentsBuilt.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100"
                      >
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Observed Outcome (Factual, no invented stats) */}
              {caseStudy.observedOutcome ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-blue mb-4 flex items-center gap-2.5">
                    <FiCheckCircle className="text-emerald-500" /> Observed Outcome
                  </h2>
                  <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 text-slate-800 text-sm sm:text-base leading-relaxed">
                    {caseStudy.observedOutcome}
                  </div>
                </div>
              ) : null}

              {/* Session Demonstration Video Player */}
              {workshopVideos.length > 0 ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-blue flex items-center gap-2.5">
                      <FiPlay className="text-brand-orange fill-brand-orange" /> Session Demonstration Video
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">
                      Real workshop footage
                    </span>
                  </div>

                  {/* Video Stage */}
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg relative">
                    {embedUrl ? (
                      <iframe
                        src={`${embedUrl}?autoplay=1&rel=0`}
                        title={currentVideo?.title || caseStudy.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    ) : localVideoUrl ? (
                      <video
                        key={localVideoUrl}
                        src={localVideoUrl}
                        poster={currentVideo?.poster || caseStudy.coverPhoto}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-contain"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                  </div>

                  {/* Current Video Title & Description */}
                  {currentVideo?.title ? (
                    <div className="mt-4">
                      <h3 className="text-sm sm:text-base font-bold text-brand-blue">
                        {currentVideo.title}
                      </h3>
                      {currentVideo.description ? (
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {currentVideo.description}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {/* Video Clip Selector if multiple videos are available */}
                  {workshopVideos.length > 1 ? (
                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <p className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                        <FiPlay size={12} className="text-brand-orange" /> Select Video Clip to Watch ({workshopVideos.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {workshopVideos.map((vid, vIdx) => {
                          const isSelected = vIdx === activeVideoIndex;
                          return (
                            <button
                              key={vid.id || vIdx}
                              type="button"
                              onClick={() => setActiveVideoIndex(vIdx)}
                              className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition cursor-pointer ${
                                isSelected
                                  ? 'border-brand-orange bg-orange-50/70 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-brand-blue/40 hover:bg-slate-50'
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isSelected
                                    ? 'bg-brand-orange text-white shadow'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                <FiPlay size={12} className={isSelected ? 'fill-white ml-0.5' : 'ml-0.5'} />
                              </div>
                              <div className="min-w-0">
                                <p
                                  className={`text-xs font-bold truncate ${
                                    isSelected ? 'text-brand-orange-deep' : 'text-slate-800'
                                  }`}
                                >
                                  {vid.title || `Clip ${vIdx + 1}`}
                                </p>
                                <span className="text-[11px] text-slate-500 block mt-0.5">
                                  {isSelected ? '▶ Playing Now' : 'Click to Play'}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* Photo Gallery with Lightbox and Captions */}
              {approvedPhotos.length > 0 ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-blue">
                      Session Photo Gallery
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">
                      Click any photo to expand
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {approvedPhotos.map((photo, idx) => {
                      const pSrc = getPhotoSrc(photo);
                      const pCaption = getPhotoCaption(photo);
                      const pAlt = getPhotoAlt(photo, `Workshop photo ${idx + 1}`);

                      return (
                        <div
                          key={idx}
                          onClick={() => setActivePhotoIndex(idx)}
                          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-slate-200 aspect-[4/3]"
                        >
                          <img
                            src={pSrc}
                            alt={pAlt}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                            <span className="text-xs font-semibold flex items-center gap-1 mb-1">
                              <FiMaximize2 /> View Large
                            </span>
                            {pCaption ? (
                              <p className="text-xs text-slate-200 line-clamp-2">
                                {pCaption}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Optional Written Quote */}
              {caseStudy.feedbackQuote?.text ? (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/40 rounded-3xl p-6 sm:p-8 md:p-10 border border-blue-200/80 shadow-sm relative overflow-hidden">
                  <FaQuoteLeft className="text-3xl sm:text-4xl text-brand-blue/20 mb-4" />
                  <blockquote className="text-base sm:text-lg text-slate-800 font-medium italic leading-relaxed mb-4">
                    “{caseStudy.feedbackQuote.text}”
                  </blockquote>
                  <div className="border-t border-blue-200/60 pt-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      {caseStudy.feedbackQuote.author ? (
                        <p className="font-bold text-brand-blue text-sm">
                          {caseStudy.feedbackQuote.author}
                        </p>
                      ) : null}
                      {caseStudy.feedbackQuote.role ? (
                        <p className="text-xs text-slate-600">
                          {caseStudy.feedbackQuote.role}
                        </p>
                      ) : null}
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold bg-white px-3 py-1 rounded-full border border-blue-100">
                      Approved in Writing
                    </span>
                  </div>
                </div>
              ) : null}

              {/* Written Permission Confirmation Badge */}
              {caseStudy.permissionConfirmedBy ? (
                <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                  <FiShield className="text-brand-blue flex-shrink-0 mt-0.5 text-base" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">
                      Permission &amp; Privacy Verification
                    </span>
                    Published with confirmed permission from{' '}
                    <span className="font-semibold text-slate-800">
                      {caseStudy.permissionConfirmedBy}
                    </span>
                    {caseStudy.permissionDate
                      ? ` on ${caseStudy.permissionDate}`
                      : ''}
                    . Student privacy and institutional approval are strictly respected.
                  </div>
                </div>
              ) : null}
            </div>

            {/* Right Sidebar Column (4 cols) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Quick Facts Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm sticky top-24">
                <h3 className="text-lg font-display font-bold text-brand-blue mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <FiAward className="text-brand-orange" /> Quick Facts
                </h3>

                <dl className="space-y-4">
                  {quickFacts.map((fact, index) => {
                    const IconComponent = fact.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <span className="w-8 h-8 rounded-xl bg-slate-50 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5 text-sm border border-slate-100">
                          <IconComponent />
                        </span>
                        <div>
                          <dt className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                            {fact.label}
                          </dt>
                          <dd className="text-sm font-semibold text-slate-800 mt-0.5">
                            {fact.value}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>

                {/* Primary CTA Block inside sidebar */}
                <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                  <p className="text-xs text-slate-500 font-medium text-center">
                    Interested in running a similar session for your students?
                  </p>
                  <Link
                    to="/contact?type=quote"
                    className="btn-primary w-full text-xs sm:text-sm"
                  >
                    Book a Similar Workshop <FiArrowRight className="ml-1.5" />
                  </Link>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full text-xs sm:text-sm"
                  >
                    <FaWhatsapp className="mr-2 text-base" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom Strip: Invite Us to Your Institution */}
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
                  Share your institution details and our programme director will arrange
                  a customized curriculum session plan for your school or college.
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
        </div>
      </main>

      {/* Accessible Interactive Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && approvedPhotos[activePhotoIndex] ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActivePhotoIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Close lightbox"
            >
              <FiX size={24} />
            </button>

            {/* Left navigation */}
            {approvedPhotos.length > 1 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="Previous image"
              >
                <FiChevronLeft size={28} />
              </button>
            ) : null}

            {/* Right navigation */}
            {approvedPhotos.length > 1 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="Next image"
              >
                <FiChevronRight size={28} />
              </button>
            ) : null}

            {/* Active Image and Caption */}
            <div
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getPhotoSrc(approvedPhotos[activePhotoIndex])}
                alt={getPhotoAlt(
                  approvedPhotos[activePhotoIndex],
                  'Enlarged workshop photo'
                )}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center max-w-xl px-4">
                {getPhotoCaption(approvedPhotos[activePhotoIndex]) ? (
                  <p className="text-white text-sm leading-relaxed">
                    {getPhotoCaption(approvedPhotos[activePhotoIndex])}
                  </p>
                ) : null}
                <p className="text-xs text-slate-400 mt-1">
                  Photo {activePhotoIndex + 1} of {approvedPhotos.length}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default CaseStudyDetail;
