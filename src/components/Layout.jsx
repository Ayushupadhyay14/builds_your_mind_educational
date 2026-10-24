import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { captureUtm } from '../utils/utm';
import { initAnalytics, trackEvent, trackPageView } from '../utils/analytics';
import {
  PHONE_E164,
  EMAIL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
} from '../config/contact';
import {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  SERVED_CITIES,
} from '../config/site';

// Site-wide Organisation / Local Business schema (Technical Checklist #18).
// Only verified facts: the brand, its legal name, the one official
// contact identity used everywhere on the site, and the confirmed
// cities served. Nothing invented.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.jpg`,
  email: EMAIL,
  telephone: PHONE_E164,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  areaServed: SERVED_CITIES,
  sameAs: [LINKEDIN_URL, INSTAGRAM_URL],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE_E164,
    email: EMAIL,
    contactType: 'customer support',
  },
};

const Layout = ({ children }) => {
  const { pathname, search, hash, key } = useLocation();
  useEffect(() => { captureUtm(); }, [search]);

  // Analytics is optional: it only loads a script when VITE_GA_MEASUREMENT_ID
  // is configured, and it always pushes a generic event to window.dataLayer.
  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // One delegated listener covers every phone, WhatsApp, email and explicit
  // data-track action on the site. No form contents are ever sent.
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleClick = (event) => {
      const target = event.target.closest('a, button, [data-track]');
      if (!target) return;

      const pagePath = window.location.pathname;
      const explicit = target.getAttribute('data-track');

      if (explicit) {
        trackEvent(explicit, {
          page_path: pagePath,
          link_text: (target.textContent || '').trim().slice(0, 80),
        });
        return;
      }

      const href = target.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { page_path: pagePath });
      } else if (href.includes('wa.me')) {
        trackEvent('whatsapp_click', { page_path: pagePath });
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', { page_path: pagePath });
      }
    };

    const handleSubmit = (event) => {
      const form = event.target.closest('form');
      if (!form) return;
      trackEvent('form_submit', {
        page_path: window.location.pathname,
        form_id: form.id || 'unnamed',
      });
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit, true);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit, true);
    };
  }, []);

  // The router owns scrolling now, so stop the browser from restoring an old
  // scroll position on back/forward and fighting the effect below.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Every page change opens at the top of the new page. A link that carries a
  // #hash (e.g. "#enquiry" on a workshop page) scrolls to that section instead.
  // Pages are code-split, so keep looking for the anchor target for a moment.
  useEffect(() => {
    if (!hash) {
      // Instant, even though html sets scroll-behavior: smooth.
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previous;
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let tries = 0;
    const findTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        // scroll-padding-top keeps the section clear of the fixed header.
        target.scrollIntoView();
        return;
      }
      if (++tries < 30) frame = requestAnimationFrame(findTarget);
      else window.scrollTo(0, 0);
    };
    frame = requestAnimationFrame(findTarget);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* One canonical per page for every route, including dynamic ones */}
        <link rel="canonical" href={`${SITE_URL}${pathname}`} />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
