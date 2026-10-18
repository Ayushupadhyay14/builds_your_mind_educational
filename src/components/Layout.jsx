import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { captureUtm } from '../utils/utm';

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
  telephone: '+919109711321',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  areaServed: ['Indore', 'Dewas', 'Ujjain', 'Dhar'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919109711321',
    email: 'buildsyourmind@gmail.com',
    contactType: 'customer support',
  },
};

const Layout = ({ children }) => {
  const { pathname, search } = useLocation();
  useEffect(() => { captureUtm(); }, [search]);

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
