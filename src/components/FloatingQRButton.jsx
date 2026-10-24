import { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaQrcode, FaYoutube, FaPlay } from 'react-icons/fa';
import { FiX, FiExternalLink, FiCopy, FiCheck, FiSmartphone, FiVideo } from 'react-icons/fi';
import { getScannableVideoUrl, LOCAL_VIDEO_PATH, FEATURED_YOUTUBE_URL, QR_MODAL_DEFAULTS } from '../config/video';
import './FloatingQRButton.css';

/**
 * FloatingQRButton Component
 *
 * A fixed, floating button at the bottom-right of the website.
 * Opens a modal popup with:
 * 1) Dynamic QR Code: When scanned by mobile phone, plays the video on the user's phone.
 * 2) Inline Video Player: Allows watching the video directly on the website.
 */
const FloatingQRButton = ({
  customVideoUrl,
  localVideoSrc = LOCAL_VIDEO_PATH,
  title = QR_MODAL_DEFAULTS.title,
  instruction = QR_MODAL_DEFAULTS.instruction,
  badgeText = QR_MODAL_DEFAULTS.badgeText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('qr'); // 'qr' | 'player'
  const [copied, setCopied] = useState(false);
  const [scannableUrl, setScannableUrl] = useState(() => customVideoUrl || getScannableVideoUrl());

  const modalCardRef = useRef(null);
  const closeBtnRef = useRef(null);
  const triggerBtnRef = useRef(null);
  const videoPlayerRef = useRef(null);

  // Update scannable URL on mount (ensuring client-side hostname is used)
  useEffect(() => {
    if (!customVideoUrl) {
      setScannableUrl(getScannableVideoUrl());
    }
  }, [customVideoUrl]);

  const isYouTube = scannableUrl.includes('youtube.com') || scannableUrl.includes('youtu.be');

  // Close modal when Escape key is pressed
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        triggerBtnRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when modal is open and pause video on close
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.pause();
      }
    }
  }, [isOpen]);

  // Copy link helper
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(scannableUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      setCopied(false);
    }
  };

  // Close when clicking the semi-transparent backdrop
  const handleBackdropClick = (e) => {
    if (modalCardRef.current && !modalCardRef.current.contains(e.target)) {
      setIsOpen(false);
      triggerBtnRef.current?.focus();
    }
  };

  return (
    <>
      {/* Fixed Floating Button (Visible on all pages & routes) */}
      <div className="qr-floating-wrapper" data-testid="qr-floating-wrapper">
        <button
          ref={triggerBtnRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="qr-floating-btn"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Scan QR code to watch video on your phone"
          title="Scan QR Code to Watch Video"
          id="floating-qr-trigger-button"
        >
          {/* Subtle Attention Aura Ring */}
          <span className="qr-pulse-ring" aria-hidden="true" />

          {/* QR Icon with live status dot */}
          <span className="qr-btn-icon-wrapper" aria-hidden="true">
            <FaQrcode size={18} />
            <span className="qr-live-dot" />
          </span>

          {/* Descriptive label for desktop / tablet */}
          <span className="qr-btn-label">Watch Video</span>
        </button>
      </div>

      {/* QR Code & Video Modal Popup */}
      {isOpen && (
        <div
          className="qr-modal-backdrop"
          onClick={handleBackdropClick}
          role="presentation"
        >
          <div
            ref={modalCardRef}
            className={`qr-modal-card ${activeTab === 'player' ? 'qr-modal-card-wide' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
            aria-describedby="qr-modal-instruction"
          >
            {/* Modal Header */}
            <div className="qr-modal-header">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  triggerBtnRef.current?.focus();
                }}
                className="qr-modal-close-btn"
                aria-label="Close video popup"
                id="qr-modal-close-button"
              >
                <FiX size={18} />
              </button>

              {badgeText && (
                <span className="qr-badge">
                  {isYouTube ? (
                    <FaYoutube className="text-red-600" size={14} />
                  ) : (
                    <FaPlay className="text-orange-500" size={10} />
                  )}
                  {badgeText}
                </span>
              )}

              <h2 id="qr-modal-title" className="qr-modal-title">
                {title}
              </h2>

              <p id="qr-modal-instruction" className="qr-modal-instruction">
                {instruction}
              </p>

              {/* View Switcher Tabs: QR Code vs Inline Video Player */}
              <div className="qr-view-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'qr'}
                  onClick={() => {
                    setActiveTab('qr');
                    if (videoPlayerRef.current) videoPlayerRef.current.pause();
                  }}
                  className={`qr-tab-btn ${activeTab === 'qr' ? 'qr-tab-btn-active' : ''}`}
                >
                  <FiSmartphone size={14} />
                  <span>Scan on Phone</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'player'}
                  onClick={() => setActiveTab('player')}
                  className={`qr-tab-btn ${activeTab === 'player' ? 'qr-tab-btn-active' : ''}`}
                >
                  <FiVideo size={14} />
                  <span>Watch on Desktop</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="qr-modal-body">
              {activeTab === 'qr' ? (
                /* TAB 1: QR Code Scanner View (Runs on user's phone when scanned) */
                <>
                  <div className="qr-code-frame" aria-label="Dynamically generated QR code">
                    <span className="qr-corner qr-corner-tl" aria-hidden="true" />
                    <span className="qr-corner qr-corner-tr" aria-hidden="true" />
                    <span className="qr-corner qr-corner-bl" aria-hidden="true" />
                    <span className="qr-corner qr-corner-br" aria-hidden="true" />

                    <QRCodeSVG
                      value={scannableUrl}
                      size={200}
                      level="Q"
                      includeMargin={true}
                      bgColor="#FFFFFF"
                      fgColor="#0F172A"
                      title="Scan with phone camera to run video on mobile"
                    />
                  </div>

                  <div className="qr-modal-actions">
                    <a
                      href={scannableUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`qr-btn-primary-action ${isYouTube ? 'qr-btn-youtube' : 'qr-btn-standard'}`}
                      id="qr-modal-open-video-link"
                    >
                      {isYouTube ? <FaYoutube size={19} /> : <FaPlay size={14} />}
                      <span>{isYouTube ? 'Watch on YouTube' : 'Open Video Link'}</span>
                      <FiExternalLink size={15} className="ml-0.5 opacity-80" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="qr-btn-copy"
                      aria-label="Copy video URL to clipboard"
                      id="qr-modal-copy-link-btn"
                    >
                      {copied ? (
                        <>
                          <FiCheck size={16} className="text-emerald-600" />
                          <span className="text-emerald-600">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <FiCopy size={15} />
                          <span>Copy Mobile Video Link</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="qr-modal-hint">
                    📱 Open your iPhone Camera or Google Lens to scan and watch instantly on your phone.
                  </p>
                </>
              ) : (
                /* TAB 2: Direct Video Player View */
                <div className="qr-player-wrapper">
                  <div className="qr-video-container">
                    <video
                      ref={videoPlayerRef}
                      src={localVideoSrc}
                      controls
                      playsInline
                      preload="metadata"
                      className="qr-video-element"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="qr-player-actions">
                    <a
                      href={scannableUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="qr-btn-primary-action qr-btn-standard"
                    >
                      <FiExternalLink size={15} />
                      <span>Open in Fullscreen Cinema Tab</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingQRButton;
