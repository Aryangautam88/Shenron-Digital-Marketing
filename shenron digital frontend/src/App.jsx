
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<main id="home" />} />

        <Route path="/services" element={<main id="services" />} />
        <Route path="/services/seo" element={<main />} />
        <Route path="/services/paid-advertising" element={<main />} />
        <Route path="/services/influencer-marketing" element={<main />} />
        <Route path="/services/digital-design" element={<main />} />
        <Route path="/services/web-development" element={<main />} />

        <Route path="/industries" element={<main id="industries" />} />
        <Route path="/industries/:industry" element={<main />} />

        <Route path="/business-types" element={<main />} />
        <Route path="/business-types/:type" element={<main />} />

        <Route path="/testimonials" element={<main />} />
        <Route path="/company/about" element={<main />} />
        <Route path="/company/contact" element={<main />} />

        <Route path="*" element={<main />} />
      </Routes>
    </>
  );
}
