import React from "react";
import Hero from "../components/Hero/Hero";
import CompanyOverview from "../components/HomeSections/CompanyOverview";
import BusinessVerticals from "../components/HomeSections/BusinessVerticals";
import Statistics from "../components/HomeSections/Statistics";
import FeaturedProjects from "../components/HomeSections/FeaturedProjects";
import Sustainability from "../components/HomeSections/Sustainability";
import Timeline from "../components/HomeSections/Timeline";
import Testimonials from "../components/HomeSections/Testimonials";
import CTA from "../components/HomeSections/CTA";

export default function Home() {
  return (
    <>
      {/* 0. Fullscreen Parallax Hero Slider */}
      <Hero />

      {/* 1. Company Overview (CEO Quote / Vision) */}
      <CompanyOverview />

      {/* 2. Business Verticals & Divisons (Tabbed Grid) */}
      <BusinessVerticals />

      {/* 3. Statistics & Counters */}
      <Statistics />

      {/* 4. Featured Projects (Horizontal Scrolling Slide) */}
      <FeaturedProjects />

      {/* 5. Sustainability & Innovation */}
      <Sustainability />

      {/* 6. Evolution Timeline (Progress Line on Scroll) */}
      <Timeline />

      {/* 7. Testimonials Carousel */}
      <Testimonials />

      {/* 8. Get In Touch (Contact Inquiry Form) */}
      <CTA />
    </>
  );
}
