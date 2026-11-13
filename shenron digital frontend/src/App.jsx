
import { createElement, lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./subpages/SubpageHero.css";
import "./subpages/HeroTypography.css";
import "./SectionTypography.css";
import "./Layout.css";
import "./MainPageHeroes.css";
import { industryPageRoutes } from "./subpages/industries/industryPageRoutes";
const Service = lazy(() => import("./pages/Service"));
const Hero = lazy(() => import("./pages/Hero"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Blog = lazy(() => import("./pages/Blog"));
const Industries = lazy(() => import("./pages/Industries"));
const About = lazy(() => import("./subpages/About"));
const Contact = lazy(() => import("./subpages/Contact"));
const Legal = lazy(() => import("./subpages/Legal"));
const ServiceDetail = lazy(() => import("./subpages/ServiceDetail"));
const AdminBlogPage = lazy(() => import("./admin/AdminBlogPage"));

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
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

          {/* Testimonials remain available by direct URL. */}
          <Route path="/testimonials" element={<Testimonials />} />

          {/* Industries and business types */}
          <Route path="/industries" element={<Industries />} />
          {industryPageRoutes.map(({ path, Component: PageComponent }) => (
            <Route
              key={path}
              path={path}
              element={createElement(PageComponent)}
            />
          ))}

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={<AdminBlogPage />}
          />
          <Route path="/admin/blogs" element={<AdminBlogPage />} />
          <Route path="/admin/blogs/new" element={<AdminBlogPage />} />
          <Route path="/admin/enquiries" element={<AdminBlogPage />} />

          {/* Company */}
          <Route path="/about" element={<About />} />
          <Route path="/company/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company/contact" element={<Contact />} />

          {/* 404 fallback */}
          <Route path="/privacy-policy" element={<Legal type="privacy" />} />
          <Route path="/terms-of-service" element={<Legal type="terms" />} />
          <Route path="*" element={<main />} />
        </Routes>
      </Suspense>

      {!isAdminRoute && <Footer />}
    </>
  );
}
