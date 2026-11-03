import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Preloader from"./components/Preloader";
import Footer from"./components/Footer";
import Service from "./pages/Service";
import Industries from "./pages/Industries";

import About from "./subpages/About";
import Contact from "./subpages/Contact";
import ServiceDetail from "./subpages/ServiceDetail";


import Hero from "./pages/Hero";



export default function App() {
 return (
  <>
   <Navbar />
   <Preloader/>

   <Routes>
    <Route path="/" element={<Hero />} />

    <Route path="/services" element={<Service/>} />
    <Route path="/services/:category" element={<ServiceDetail />} />
    <Route path="/services/:category/:offering" element={<ServiceDetail />} />

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
}
