import { lazy } from 'react';

// Code-split pages for the browser.
export const pages = {
  Home: lazy(() => import('./pages/Home')),
  About: lazy(() => import('./pages/About')),
  Products: lazy(() => import('./pages/Products')),
  ProductDetail: lazy(() => import('./pages/ProductDetail')),
  CatalogVideo: lazy(() => import('./pages/CatalogVideo')),
  WatchVideo: lazy(() => import('./pages/WatchVideo')),
  WorkshopPage: lazy(() => import('./pages/WorkshopPage')),
  ServicePage: lazy(() => import('./pages/ServicePage')),
  CaseStudies: lazy(() => import('./pages/CaseStudies')),
  CaseStudyDetail: lazy(() => import('./pages/CaseStudyDetail')),
  Gallery: lazy(() => import('./pages/Gallery')),
  Blog: lazy(() => import('./pages/Blog')),
  ForSchools: lazy(() => import('./pages/ForSchools')),
  OEMServices: lazy(() => import('./pages/OEMServices')),
  ODMServices: lazy(() => import('./pages/ODMServices')),
  DistributorProgram: lazy(() => import('./pages/DistributorProgram')),
  RetailerProgram: lazy(() => import('./pages/RetailerProgram')),
  Privacy: lazy(() => import('./pages/Privacy')),
  Terms: lazy(() => import('./pages/Terms')),
  Contact: lazy(() => import('./pages/Contact')),
  NotFound: lazy(() => import('./pages/NotFound')),
};
