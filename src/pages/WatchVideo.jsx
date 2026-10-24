import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiPlay, FiVolume2, FiMaximize2, FiShare2, FiCheck } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { LOCAL_VIDEO_PATH } from '../config/video';
import { SITE_NAME } from '../config/site';

const WatchVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Attempt auto-play on mobile devices (muted auto-play is standard on iOS/Android)
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy prevented playback, user can tap play button
        setIsPlaying(false);
      });
    }
  }, []);

  const handleManualPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${SITE_NAME} - Featured Video`,
          text: 'Watch our STEM and robotics video demonstration!',
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <>
      <Helmet>
        <title>Watch Demonstration Video | {SITE_NAME}</title>
        <meta
          name="description"
          content="Watch our hands-on STEM education, robotics and science demonstration video on your mobile phone."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-brand-orange selection:text-white">
        {/* Cinema Navigation Bar */}
        <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 px-4 py-3 sm:px-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition duration-200 group text-sm font-semibold"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-blue/40 border border-brand-blue/60 flex items-center justify-center">
                <FaGraduationCap className="text-brand-orange text-sm" />
              </span>
              <span className="font-display font-semibold text-sm sm:text-base text-white tracking-wide truncate">
                Builds Your Mind
              </span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition"
              aria-label="Share video"
            >
              {copied ? (
                <>
                  <FiCheck className="text-emerald-400" size={14} />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <FiShare2 size={13} />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Video Stage */}
        <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
          {/* Cinema Card */}
          <div className="w-full relative aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-blue-950/50">
            <video
              ref={videoRef}
              src={LOCAL_VIDEO_PATH}
              controls
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video playback.
            </video>

            {/* Play Button Overlay (shown when video is paused) */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handleManualPlay}
                aria-label="Play video"
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
              >
                <span className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-brand-orange-deep hover:bg-brand-orange text-white shadow-lg shadow-orange-600/40 transform group-hover:scale-110 transition">
                  <FiPlay size={28} className="ml-1" />
                </span>
              </button>
            )}
          </div>

          {/* Video Information & CTA */}
          <div className="w-full mt-5 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-2">
                  Featured Demonstration
                </span>
                <h1 className="text-lg sm:text-xl font-bold text-white mb-1">
                  Hands-on STEM & Robotics Activities
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Watch our students and educators in action, building and experimenting with real robotic components and DIY science kits.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                <Link
                  to="/products"
                  className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 font-semibold rounded-full text-xs sm:text-sm text-center text-white transition shadow-md"
                >
                  Explore Kits
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-brand-orange-deep hover:bg-brand-orange font-semibold rounded-full text-xs sm:text-sm text-center text-white transition shadow-md"
                >
                  Book a Workshop
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="w-full py-4 px-4 text-center text-xs text-slate-400 border-t border-white/10 bg-slate-900/60">
          <p>© {new Date().getFullYear()} {SITE_NAME} • Built for hands-on learning</p>
        </footer>
      </div>
    </>
  );
};

export default WatchVideo;
