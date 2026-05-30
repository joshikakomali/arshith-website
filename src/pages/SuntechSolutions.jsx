import React from "react";
import CompanyDetailPage from "../components/CompanyDetailPage";

const config = {
  eyebrow: "Suntech Solutions",
  title: "Branching out to grow your business.",
  summary:
    "Suntech Solutions positions itself as a trusted partner for digital marketing, backend support, financial support, and online marketplace services.",
  heroImage: "https://suntechorganization.pythonanywhere.com/static/img/all_logo.png",
  heroImageAlt: "Suntech Organization logo",
  heroBadgeLabel: "Since",
  heroBadgeValue: "2020",
  heroNote: "Your trusted partner for comprehensive business solutions.",
  introPills: ["Marketing", "Backend support", "Financial operations"],
  primaryAction: { label: "View Services", href: "#services" },
  secondaryAction: { label: "Contact Support", href: "mailto:support@suntechorganization.com" },
  stats: [
    { value: "4", label: "Core services" },
    { value: "2", label: "Leadership founders" },
    { value: "3", label: "Client testimonials" },
    { value: "2020", label: "Founded" },
  ],
  highlightsTitle: "OUR CORE SERVICES",
  highlightsHeading: "A practical service mix for modern businesses.",
  highlightsCopy:
    "The public site frames the company around marketing, support, finance, and commerce — with each offer presented as a direct pathway to action.",
  highlights: [
    { title: "Digital Marketing", copy: "A strong online presence strategy for businesses in a fast-moving digital world.", kicker: "Service" },
    { title: "Backend Support", copy: "Help desk and technical support focused on prompt issue resolution and minimal downtime.", kicker: "Service" },
    { title: "Financial Support", copy: "Financial operations support for timely transactions and informed decisions.", kicker: "Service" },
  ],
  sections: [
    {
      id: "services",
      eyebrow: "EXPANDING YOUR HORIZONS",
      title: "The service cards reflect the live website messaging.",
      copy: "Each category includes a short benefit statement and a direct read-more path on the source site.",
      image: "https://suntechorganization.pythonanywhere.com/static/img/digital_marketing.png",
      imageAlt: "Digital marketing visual",
      items: [
        { title: "Digital Marketing", copy: "Build a stronger online presence and unlock business potential." },
        { title: "Backend Support", copy: "Reduce downtime with responsive technical support." },
        { title: "Financial Support", copy: "Streamline financial operations and decisions." },
        { title: "Online Market Place", copy: "Connect with global shopping opportunities." },
      ],
    },
    {
      eyebrow: "MEET OUR LEADERSHIP TEAM",
      title: "Leadership, vision, and service culture.",
      copy: "The official site highlights two founders and a client-first vision centered on trust, innovation, and exceptional service.",
      image: "https://suntechorganization.pythonanywhere.com/static/img/md1.png",
      imageAlt: "Founder portrait",
      imageMaxWidth: "320px",
      reverse: true,
      items: [
        { title: "Farook Nurubhasha", copy: "Founder and CEO with a vision to play a vital role in the global marketing scenario." },
        { title: "Nelli Pallavi", copy: "Co-Founder and General Manager focused on customer needs and business improvement." },
      ],
    },
    {
      eyebrow: "AWARDS & SOCIAL PROOF",
      title: "Proof points that reinforce confidence.",
      copy: "The live homepage surfaces awards, testimonials, and a support-first message across the brand story.",
      image: "https://suntechorganization.pythonanywhere.com/static/img/gm1.png",
      imageAlt: "Leadership portrait",
      quotes: [
        { author: "Arun Patil", role: "Client", copy: "Working with Suntech for over 2 years has strengthened our digital marketing success." },
        { author: "Lakshmi", role: "Client", copy: "Their understanding of financial needs and goals has been invaluable." },
        { author: "Chandra Shekhar", role: "Client", copy: "Prompt, practical, and full of good ideas and suggestions." },
      ],
    },
  ],
  spotlightsTitle: "WHAT SETS THE BRAND APART",
  spotlightsHeading: "A service-led organization with direct contact paths.",
  spotlightsCopy:
    "Care, support, careers, and service access are surfaced throughout the official site to keep engagement simple.",
  spotlights: [
    {
      title: "Partner care",
      tag: "Support",
      copy: "High-touch customer service and end-to-end project support with national reach.",
      image: "https://suntechorganization.pythonanywhere.com/static/img/backend-support.png",
    },
    {
      title: "Online marketplace",
      tag: "Commerce",
      copy: "Marketplace access is connected to the Arshith Fresh ecosystem.",
      image: "https://suntechorganization.pythonanywhere.com/static/img/online-marketplace.png",
    },
    {
      title: "Awards and recognition",
      tag: "Trust",
      copy: "The homepage highlights company awards and industry acknowledgment.",
      image: "https://suntechorganization.pythonanywhere.com/static/img/award_leaf.svg",
    },
  ],
  extraSections: [
    {
      eyebrow: "LEADERSHIP & TRUST",
      title: "The public brand is anchored in direct founder visibility.",
      copy: "The site places the leadership team, customer stories, and awards directly in the browsing experience to build confidence quickly.",
      items: [
        { kicker: "Founder-led", title: "Farook Nurubhasha", copy: "Founder and CEO guiding the company’s marketing-first direction." },
        { kicker: "Operations", title: "Nelli Pallavi", copy: "Co-Founder and General Manager focused on experience and execution." },
        { kicker: "Recognition", title: "Awarded growth story", copy: "The homepage highlights performance and leadership awards." },
      ],
    },
    {
      eyebrow: "CLIENT FEEDBACK",
      title: "Customer stories reinforce the service promise.",
      copy: "The testimonials section suggests the company values prompt response, practical guidance, and measurable support.",
      alt: true,
      items: [
        { kicker: "Testimonial", title: "Digital marketing confidence", copy: "Long-term partnership with a strong focus on marketing outcomes." },
        { kicker: "Testimonial", title: "Financial planning support", copy: "Tailored financial guidance aligned to customer needs and goals." },
        { kicker: "Testimonial", title: "Responsive service", copy: "Fast responses, practical ideas, and useful suggestions." },
      ],
    },
  ],
  cta: {
    eyebrow: "JOIN THE TEAM",
    title: "Get in touch with Suntech Solutions.",
    copy: "If you need marketing, support, or financial services, the site routes visitors to direct contact options.",
    primary: { label: "Email Support", href: "mailto:support@suntechorganization.com" },
    secondary: { label: "Back to Businesses", href: "/portfolio" },
  },
};

export default function SuntechSolutions() {
  return <CompanyDetailPage config={config} />;
}