import { lazy } from 'react';

const Finance = lazy(() => import('./industries/Finance'));
const SaaS = lazy(() => import('./industries/SaaS'));
const Crypto = lazy(() => import('./industries/Crypto'));
const Ecommerce = lazy(() => import('./industries/Ecommerce'));
const RealEstate = lazy(() => import('./industries/RealEstate'));
const Healthcare = lazy(() => import('./industries/Healthcare'));
const ITSoftware = lazy(() => import('./industries/ITSoftware'));
const Gaming = lazy(() => import('./industries/Gaming'));
const IGaming = lazy(() => import('./industries/IGaming'));
const Forex = lazy(() => import('./industries/Forex'));

const B2B = lazy(() => import('./business-types/B2B'));

const B2C = lazy(() => import('./business-types/B2C'));

const SmallBusiness = lazy(() => import('./business-types/SmallBusiness'));

const Startup = lazy(() => import('./business-types/Startup'));

const Enterprise = lazy(() => import('./business-types/Enterprise'));

const BusinessTypes = lazy(() => import('./business-types/BusinessTypes'));

export const industryPageRoutes = [
  { path: '/business-types', Component: BusinessTypes },
  { path: '/business-types/enterprise', Component: Enterprise },
  { path: '/business-types/startup', Component: Startup },
  { path: '/business-types/small-business', Component: SmallBusiness },
  { path: '/business-types/b2c', Component: B2C },
  { path: '/business-types/b2b', Component: B2B },
  { path: '/industries/finance', Component: Finance },
  { path: '/industries/saas', Component: SaaS },
  { path: '/industries/crypto', Component: Crypto },
  { path: '/industries/ecommerce', Component: Ecommerce },
  { path: '/industries/real-estate', Component: RealEstate },
  { path: '/industries/healthcare', Component: Healthcare },
  { path: '/industries/it-software', Component: ITSoftware },
  { path: '/industries/gaming', Component: Gaming },
  { path: '/industries/igaming', Component: IGaming },
  { path: '/industries/forex', Component: Forex },
];
