
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";

import Service from "./pages/Service";
import Industries from "./pages/Industries";
import Hero from "./pages/Hero";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <>
      <Navbar />
      <Preloader />

      <Routes>
        <Route path="/" element={<Hero />} />

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
}
