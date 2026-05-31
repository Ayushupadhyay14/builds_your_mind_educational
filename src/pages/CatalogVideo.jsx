import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiInfo, FiExternalLink, FiAlertCircle } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { getProductBySlug, getProducts } from '../services/api';
import Loading from '../components/Loading';

const CatalogVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [youtubeId, setYoutubeId] = useState(null);
  const [error, setError] = useState(false);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    const resolveVideo = async () => {
      try {
        setLoading(true);
        setError(false);
        let resolvedProduct = null;
        let resolvedUrl = '';

        // 1. Try to fetch the product by ID from API
        try {
          const res = await getProductBySlug(id);
          if (res?.data) {
            resolvedProduct = res.data;
            resolvedUrl = res.data.video_url || res.data.videoUrl || '';
          }
        } catch (err) {
          console.warn("Direct lookup failed, trying products list lookup:", err);
        }

        // 2. Fallback to list lookup if direct search failed or returned nothing
        if (!resolvedProduct) {
          try {
            const listRes = await getProducts();
            const products = listRes?.data?.results || listRes?.data || [];
            resolvedProduct = products.find(p => p.id === id || p._id === id || p.slug === id);
            if (resolvedProduct) {
              resolvedUrl = resolvedProduct.video_url || resolvedProduct.videoUrl || '';
            }
          } catch (listErr) {
            console.error("List lookup failed:", listErr);
          }
        }

        if (resolvedProduct) {
          setProduct(resolvedProduct);
        }

        // 3. Determine the video URL
        // If the product specifies a video URL, use it. 
        // Otherwise, assume there's a local video file in /videos/:id.mp4
        if (resolvedUrl) {
          setVideoUrl(resolvedUrl);
          const ytId = getYouTubeId(resolvedUrl);
          if (ytId) {
            setYoutubeId(ytId);
          }
        } else {
          // Default local fallback path (e.g. public/videos/688c504bf093218cde4c9f29.mp4)
          setVideoUrl(`/videos/${id}.mp4`);
        }
      } catch (err) {
        console.error("Error resolving video:", err);
        // Still try to play local file as fallback even on error
        setVideoUrl(`/videos/${id}.mp4`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      resolveVideo();
    }
  }, [id]);

  const handleVideoError = () => {
    // If the local video fails to load, trigger the error state
    setError(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>{product ? `${product.name} - Tutorial` : 'Video Tutorial'} | Builds Your Mind</title>
        <meta name="description" content="Watch the dynamic step-by-step video tutorial for this educational kit." />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between select-none">
        
        {/* Floating Header */}
        <header className="w-full bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50 px-4 py-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link 
              to="/products"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition duration-200 group text-sm font-semibold"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
              <span>Catalog</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue/30 border border-brand-blue/50 flex items-center justify-center">
                <FaGraduationCap className="text-brand-orange text-sm" />
              </span>
              <h1 className="font-display font-semibold text-base sm:text-lg text-slate-200 tracking-wide truncate max-w-[200px] sm:max-w-sm">
                {product ? product.name : 'Educational Kit Tutorial'}
              </h1>
            </div>

            {product?.slug ? (
              <Link
                to={`/products/${product.slug}`}
                className="flex items-center gap-1 text-brand-orange hover:text-brand-orange-light text-xs sm:text-sm font-semibold transition"
              >
                <span>Details</span>
                <FiExternalLink size={14} />
              </Link>
            ) : (
              <div className="w-16"></div>
            )}
          </div>
        </header>

        {/* Video Workspace */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-5xl mx-auto w-full">
          <div className="w-full relative aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-black/80">
            
            {error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900/90 backdrop-blur-sm">
                <FiAlertCircle className="text-brand-orange text-5xl mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-slate-100 mb-2">Tutorial Video Not Loaded</h3>
                <p className="text-slate-400 text-sm max-w-md mb-6">
                  We couldn't load the tutorial video. If you are developing locally, please verify that you placed the video file inside the <code className="bg-slate-950 px-2 py-1 rounded text-brand-orange text-xs">public/videos/</code> folder as <code className="bg-slate-950 px-2 py-1 rounded text-brand-orange text-xs">{id}.mp4</code>.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { setError(false); }}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 font-semibold rounded-full text-sm transition"
                  >
                    Try Again
                  </button>
                  <Link 
                    to="/products"
                    className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark font-semibold rounded-full text-sm text-white transition"
                  >
                    Browse Catalog
                  </Link>
                </div>
              </div>
            ) : youtubeId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                title={product ? product.name : 'Tutorial Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                key={videoUrl}
                className="w-full h-full object-contain"
                src={videoUrl}
                controls
                autoPlay
                playsInline
                onError={handleVideoError}
              />
            )}
          </div>

          {/* Info Card */}
          {product && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full mt-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <FiInfo className="text-brand-orange" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">About the Kit</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 mb-2">{product.name}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {product.short_description || product.shortDescription || 'This educational kit is designed to build minds and explore new concepts through hand-on building blocks.'}
              </p>
            </motion.div>
          )}
        </main>

        {/* Cinematic Footer */}
        <footer className="w-full py-6 px-4 text-center text-xs text-slate-600 border-t border-slate-900 bg-slate-950">
          <p>© {new Date().getFullYear()} Builds Your Mind - Premium Educational Video Portal</p>
        </footer>
      </div>
    </>
  );
};

export default CatalogVideo;
