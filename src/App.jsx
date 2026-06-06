import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Businesses from "./pages/Businesses";
import ArshithInfotech from "./pages/ArshithInfotech";
import ArshithFresh from "./pages/ArshithFresh";
import SuntechSolutions from "./pages/SuntechSolutions";
import Industries from "./pages/Industries"; // NEW Industries Page
import IndustryFrameworkDetail from "./pages/IndustryFrameworkDetail";
import Careers from "./pages/Careers";
import Internship from "./pages/Internship";
import InternshipDetails from "./pages/InternshipDetails";
import Blog from "./pages/Blog"; // NEW Blog Page
import BlogDetail from "./pages/BlogDetail"; // NEW Blog Detail Page
import Contact from "./pages/Contact";

// Recruiter & Waiting Queue Pages
import BookSlot from "./pages/BookSlot";
import InterviewLobby from "./pages/InterviewLobby";
import RecruiterDashboard from "./pages/RecruiterDashboard";

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/portfolio" element={<Businesses />} />
      <Route path="/portfolio/arshith-infotech" element={<ArshithInfotech />} />
      <Route path="/portfolio/arshith-fresh" element={<ArshithFresh />} />
      <Route path="/portfolio/suntech-solutions" element={<SuntechSolutions />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/industries/framework/:industryId" element={<IndustryFrameworkDetail />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/internship" element={<Internship />} />
      <Route path="/internship-details" element={<InternshipDetails />} />
      <Route path="/book-slot" element={<BookSlot />} />
      <Route path="/interview/:token" element={<InterviewLobby />} />
      <Route path="/recruiter" element={<RecruiterDashboard />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <AnimatedRoutes />
      </main>
      <Footer />
    </Router>
  );
}
