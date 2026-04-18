import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Workshops = lazy(() => import('./pages/Workshops'));
const HomeTuition = lazy(() => import('./pages/HomeTuition'));
const ForSchools = lazy(() => import('./pages/ForSchools'));
const OEMServices = lazy(() => import('./pages/OEMServices'));
const ODMServices = lazy(() => import('./pages/ODMServices'));
const DistributorProgram = lazy(() => import('./pages/DistributorProgram'));
const RetailerProgram = lazy(() => import('./pages/RetailerProgram'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/home-tuition" element={<HomeTuition />} />
          <Route path="/for-schools" element={<ForSchools />} />
          <Route path="/oem-services" element={<OEMServices />} />
          <Route path="/odm-services" element={<ODMServices />} />
          <Route path="/distributor-program" element={<DistributorProgram />} />
          <Route path="/retailer-program" element={<RetailerProgram />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
