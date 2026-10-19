import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { captureUtm } from '../utils/utm';
import { PHONE_E164 } from '../config/contact';

const SITE_URL = 'https://buildsyourmind.in';

// Site-wide Organisation / Local Business schema (Technical Checklist #18).
// Only verified facts: the brand, its legal name, the one official
// contact identity used everywhere on the site, and the confirmed
// cities served. Nothing invented.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  name: 'Builds Your Mind',
  legalName: 'Harmono Pvt. Ltd.',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.jpg`,
  email: 'buildsyourmind@gmail.com',
  telephone: PHONE_E164,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  areaServed: ['Indore', 'Dewas', 'Ujjain', 'Dhar'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE_E164,
    email: 'buildsyourmind@gmail.com',
    contactType: 'customer support',
  },
};

const Layout = ({ children }) => {
  const { pathname, search, hash, key } = useLocation();
  useEffect(() => { captureUtm(); }, [search]);

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
