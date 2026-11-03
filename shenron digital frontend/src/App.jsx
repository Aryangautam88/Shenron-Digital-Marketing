
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";

import Service from "./pages/Service";
import Industries from "./pages/Industries";
<<<<<<< HEAD
=======

import About from "./subpages/About";
import Contact from "./subpages/Contact";
import ServiceDetail from "./subpages/ServiceDetail";


>>>>>>> 1eceb596f34cd4bb82c2938199a551ae00252239
import Hero from "./pages/Hero";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";

export default function App() {
<<<<<<< HEAD
  return (
    <>
      <Navbar />
      <Preloader />
=======
 return (
  <>
   <Navbar />
   <Preloader/>

   <Routes>
    <Route path="/" element={<Hero />} />
>>>>>>> 1eceb596f34cd4bb82c2938199a551ae00252239

    <Route path="/services" element={<Service/>} />
    <Route path="/services/:category" element={<ServiceDetail />} />
    <Route path="/services/:category/:offering" element={<ServiceDetail />} />

<<<<<<< HEAD
        {/* Services */}
        <Route path="/services" element={<Service />} />
        <Route path="/services/seo" element={<main />} />
        <Route path="/services/paid-advertising" element={<main />} />
        <Route
          path="/services/influencer-marketing"
          element={<main />}
        />
        <Route path="/services/digital-design" element={<main />} />
        <Route
          path="/services/web-development"
          element={<main />}
        />

        {/* Industries */}
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:industry" element={<main />} />

        {/* Business Types */}
        <Route path="/business-types" element={<main />} />
        <Route path="/business-types/:type" element={<main />} />

        {/* Testimonials */}
        <Route
          path="/testimonials"
          element={<Testimonials />}
        />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />

        {/* Company */}
        <Route path="/company/about" element={<main />} />
        <Route path="/company/contact" element={<main />} />

        {/* 404 fallback */}
        <Route path="*" element={<main />} />
      </Routes>

      <Footer />
    </>
  );
=======
    <Route path="/industries" element={<Industries/>} />
    <Route path="/industries/:industry" element={<main />} />

    <Route path="/business-types" element={<main />} />
    <Route path="/business-types/:type" element={<main />} />

    <Route path="/testimonials" element={<main />} />

  
    <Route path="/company/about" element={<About />} />
    <Route path="/company/contact" element={<Contact />} />
    <Route path="/contact" element={<Contact />} />

    <Route path="*" element={<main />} />
   </Routes>
   <Footer/>
  </>
 );
>>>>>>> 1eceb596f34cd4bb82c2938199a551ae00252239
}
