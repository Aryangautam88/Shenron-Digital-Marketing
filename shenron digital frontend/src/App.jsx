import { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Preloader from"./components/Preloader";
import Footer from"./components/Footer";
import Service from "./pages/Service";
import Industries from "./pages/Industries";

import About from "./subpages/About";
import Contact from "./subpages/Contact";
import ServiceDetail from "./subpages/ServiceDetail";
import { servicePageRoutes } from "./subpages/servicePageRoutes";
import ScrollToTop from "./components/ScrollToTop";


import Hero from "./pages/Hero";



export default function App() {
 return (
  <>
   <ScrollToTop />
   <Navbar />
   <Preloader/>

   <Routes>
    <Route path="/" element={<Hero />} />

    <Route path="/services" element={<Service/>} />
    {servicePageRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Suspense fallback={<main style={{ minHeight: "100vh", padding: "150px 6%", background: "#F7F3EB" }} aria-busy="true">Loading service...</main>}><Component /></Suspense>} />)}
    <Route path="/services/:category" element={<ServiceDetail />} />
    <Route path="/services/:category/:offering" element={<ServiceDetail />} />

    <Route path="/industries" element={<Industries/>} />
    <Route path="/industries/:industry" element={<main />} />

    <Route path="/business-types" element={<main />} />
    <Route path="/business-types/:type" element={<main />} />

    <Route path="/testimonials" element={<main />} />

  
    <Route path="/about" element={<About />} />
    <Route path="/company/about" element={<About />} />
    <Route path="/company/contact" element={<Contact />} />
    <Route path="/contact" element={<Contact />} />

    <Route path="*" element={<main />} />
   </Routes>
   <Footer/>
  </>
 );
}
