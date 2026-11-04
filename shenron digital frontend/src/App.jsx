
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
<<<<<<< HEAD
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";
const Service = lazy(() => import("./pages/Service"));
const Hero = lazy(() => import("./pages/Hero"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Blog = lazy(() => import("./pages/Blog"));
const About = lazy(() => import("./SubPages/About"));
const Contact = lazy(() => import("./SubPages/Contact"));
const ServiceDetail = lazy(() => import("./SubPages/ServiceDetail"));
const AdminBlogPage = lazy(() => import("./admin/AdminBlogPage"));
=======
import Preloader from"./components/Preloader";
import Footer from"./components/Footer";
import Service from "./pages/Service";
import Industries from "./pages/Industries";

import About from "./subpages/About";
import Contact from "./subpages/Contact";
import ServiceDetail from "./subpages/ServiceDetail";
import { servicePageRoutes } from "./subpages/servicePageRoutes";
import { industryPageRoutes } from "./subpages/industries/industryPageRoutes";
import IndustryNotFound from "./subpages/industries/IndustryNotFound";
import ScrollToTop from "./components/ScrollToTop";


import Hero from "./pages/Hero";


>>>>>>> 97c8aa86b1ac200df21756c27db2a3b82405ea92

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

<<<<<<< HEAD
          {/* Services */}
          <Route path="/services" element={<Service />} />
          <Route path="/services/:category" element={<ServiceDetail />} />
          <Route
            path="/services/:category/:offering"
            element={<ServiceDetail />}
          />

          {/* Testimonials remain available by direct URL. */}
          <Route path="/testimonials" element={<Testimonials />} />
=======
    <Route path="/industries" element={<Industries/>} />
    {industryPageRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Suspense fallback={<main style={{ minHeight: "100vh", padding: "150px 6%", background: "#F7F3EB" }} aria-busy="true">Loading industry...</main>}><Component /></Suspense>} />)}
    <Route path="/industries/:industry" element={<IndustryNotFound />} />

    <Route path="/business-types" element={<main />} />
    <Route path="/business-types/:type" element={<IndustryNotFound section="business-types" />} />
>>>>>>> 97c8aa86b1ac200df21756c27db2a3b82405ea92

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
