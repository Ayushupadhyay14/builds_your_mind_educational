import { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaQrcode, FaYoutube } from 'react-icons/fa';
import { FiX, FiExternalLink, FiCopy, FiCheck } from 'react-icons/fi';
import { FEATURED_YOUTUBE_URL, QR_MODAL_DEFAULTS } from '../config/video';
import './FloatingQRButton.css';

/**
 * FloatingQRButton Component
 *
 * A fixed, floating button at the bottom-right of the screen that opens
 * an interactive modal dialog with a dynamically generated QR code linking
 * directly to a featured YouTube video.
 *
 * @param {string} [videoUrl] - The YouTube video URL (defaults to FEATURED_YOUTUBE_URL in src/config/video.js)
 * @param {string} [title] - Title heading in modal (defaults to "Scan to Watch Video")
 * @param {string} [instruction] - Short instruction text below heading
 * @param {string} [buttonText] - Text on the direct YouTube link button
 * @param {string} [badgeText] - Optional badge tag shown above title
 */
const FloatingQRButton = ({
  videoUrl = FEATURED_YOUTUBE_URL,
  title = QR_MODAL_DEFAULTS.title,
  instruction = QR_MODAL_DEFAULTS.instruction,
  buttonText = QR_MODAL_DEFAULTS.buttonText,
  badgeText = QR_MODAL_DEFAULTS.badgeText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalCardRef = useRef(null);
  const closeBtnRef = useRef(null);
  const triggerBtnRef = useRef(null);

  // Close modal when Escape key is pressed
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        // Return focus to trigger button
        triggerBtnRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Auto-focus the close button for accessibility
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Copy link helper
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(videoUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
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
          aria-label="Open QR code to watch our video on YouTube"
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

      {/* QR Code Modal Popup */}
      {isOpen && (
        <div
          className="qr-modal-backdrop"
          onClick={handleBackdropClick}
          role="presentation"
        >
          <div
            ref={modalCardRef}
            className="qr-modal-card"
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
                aria-label="Close QR code popup"
                id="qr-modal-close-button"
              >
                <FiX size={18} />
              </button>

              {badgeText && (
                <span className="qr-badge">
                  <FaYoutube className="text-red-600" size={14} />
                  {badgeText}
                </span>
              )}

              <h2 id="qr-modal-title" className="qr-modal-title">
                {title}
              </h2>

              <p id="qr-modal-instruction" className="qr-modal-instruction">
                {instruction}
              </p>
            </div>

            {/* Modal Body with dynamically generated QR code */}
            <div className="qr-modal-body">
              {/* QR Code Container with Camera Viewfinder Framing */}
              <div className="qr-code-frame" aria-label="Dynamically generated QR code">
                <span className="qr-corner qr-corner-tl" aria-hidden="true" />
                <span className="qr-corner qr-corner-tr" aria-hidden="true" />
                <span className="qr-corner qr-corner-bl" aria-hidden="true" />
                <span className="qr-corner qr-corner-br" aria-hidden="true" />

                <QRCodeSVG
                  value={videoUrl}
                  size={200}
                  level="Q"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#0F172A"
                  title="Scan with phone camera to watch on YouTube"
                />
              </div>

              {/* Action Buttons */}
              <div className="qr-modal-actions">
                {/* Primary: Direct "Watch on YouTube" Alternative Link */}
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qr-btn-youtube"
                  id="qr-modal-youtube-link"
                >
                  <FaYoutube size={19} />
                  <span>{buttonText}</span>
                  <FiExternalLink size={15} className="ml-0.5 opacity-80" />
                </a>

                {/* Secondary: Quick Copy Video Link */}
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
                      <span>Copy Video Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* Scanner Helper Note */}
              <p className="qr-modal-hint">
                Compatible with iOS Camera, Google Lens & any QR scanner.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingQRButton;
