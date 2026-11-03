
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";

const Service = lazy(() => import("./pages/Service"));
const Industries = lazy(() => import("./pages/Industries"));
const Hero = lazy(() => import("./pages/Hero"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Blog = lazy(() => import("./pages/Blog"));
const About = lazy(() => import("./subpages/About"));
const Contact = lazy(() => import("./subpages/Contact"));
const ServiceDetail = lazy(() => import("./subpages/ServiceDetail"));
const AdminBlogPage = lazy(() => import("./admin/AdminBlogPage"));

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <Preloader />}

      <Suspense
        fallback={<main aria-busy="true" style={{ minHeight: "65vh" }} />}
      >
        <Routes>
          <Route path="/" element={<Hero />} />

          {/* Services */}
          <Route path="/services" element={<Service />} />
          <Route path="/services/:category" element={<ServiceDetail />} />
          <Route
            path="/services/:category/:offering"
            element={<ServiceDetail />}
          />

          {/* Industries */}
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:industry" element={<main />} />

          {/* Business Types */}
          <Route path="/business-types" element={<main />} />
          <Route path="/business-types/:type" element={<main />} />

          {/* Testimonials remain available by direct URL. */}
          <Route path="/testimonials" element={<Testimonials />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/blogs" replace />}
          />
          <Route path="/admin/blogs" element={<AdminBlogPage />} />

          {/* Company */}
          <Route path="/about" element={<About />} />
          <Route path="/company/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company/contact" element={<Contact />} />

          {/* 404 fallback */}
          <Route path="*" element={<main />} />
        </Routes>
      </Suspense>

      {!isAdminRoute && <Footer />}
    </>
  );
}
