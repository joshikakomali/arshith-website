import React from "react";
import CompanyDetailPage from "../components/CompanyDetailPage";

const config = {
  eyebrow: "Arshith Infotech",
  title: "Supercharging progress for the digital age.",
  summary:
    "We are a next-generation global technology company that helps enterprises reimagine their businesses for the digital age through innovation, client-centric delivery, and a strong culture of invention.",
  heroImage: "https://arshithgroup.com/assets/images/hero-office.png",
  heroImageAlt: "IT professionals collaborating",
  heroBadgeLabel: "Uptime",
  heroBadgeValue: "99.9% guaranteed",
  heroNote: "Operating with innovation-driven AI, cloud, and cyber capabilities across 40+ countries.",
  introPills: ["AI-enabled delivery", "Cloud-native architecture", "Cybersecurity by design"],
  primaryAction: { label: "Explore Capabilities", href: "#capabilities" },
  secondaryAction: { label: "Contact Us", href: "mailto:info@arshithgroup.com" },
  stats: [
    { value: "99.9%", label: "Uptime guaranteed" },
    { value: "40+", label: "Countries served" },
    { value: "5", label: "Core capabilities" },
    { value: "24/7", label: "Support model" },
  ],
  highlightsTitle: "WHO WE ARE",
  highlightsHeading: "A technology partner built around outcomes.",
  highlightsCopy:
    "Arshith Infotech blends cloud engineering, product development, cybersecurity, and enterprise software into a focused delivery model designed for measurable business results.",
  highlights: [
    { title: "Innovation-Driven", copy: "Pioneering solutions in AI, cloud, and cyber to modernize complex business systems." },
    { title: "Client-Centric", copy: "Every engagement is aligned to business value, delivery clarity, and long-term support." },
    { title: "Global Reach", copy: "Supporting enterprises across international markets with scalable delivery and architecture." },
  ],
  sections: [
    {
      id: "capabilities",
      eyebrow: "OUR CORE CAPABILITIES",
      title: "Capabilities that accelerate transformation.",
      copy: "From cloud migration to enterprise software, the company structures delivery around practical transformation outcomes and resilient technology foundations.",
      image: "https://arshithgroup.com/assets/images/tech-abstract.png",
      imageAlt: "Technology abstract visual",
      items: [
        { title: "Digital Transformation", copy: "AI, analytics, and cloud technologies that modernize business processes and customer engagement." },
        { title: "Cloud Computing", copy: "Migration, hybrid management, and cloud-native services for scalable infrastructure." },
        { title: "Engineering & R&D", copy: "Accelerating product development with automation, platform engineering, and IoT expertise." },
        { title: "Enterprise Software", copy: "Customer experience, DevSecOps, and intelligent automation built for enterprise use." },
      ],
    },
    {
      eyebrow: "DOMAIN EXPERTISE",
      title: "Tailored delivery for major industries.",
      copy: "The team applies the same engineering discipline across regulated and high-growth sectors to improve reliability and performance.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
      imageAlt: "Team collaboration",
      reverse: true,
      items: [
        { title: "Financial Services", copy: "Digital banking and fintech innovation." },
        { title: "Healthcare", copy: "Digital health systems that improve patient experiences." },
        { title: "Manufacturing", copy: "Industry 4.0 and smarter supply chains." },
        { title: "Retail & CPG", copy: "Omnichannel commerce and customer experience improvements." },
      ],
    },
    {
      eyebrow: "HOW WE WORK",
      title: "A structured model that keeps delivery transparent.",
      copy: "The operating model is built around discovery, design, build, and scale so that clients can track progress without losing flexibility.",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
      imageAlt: "Planning session",
      items: [
        { title: "Discover", copy: "Workshops to understand business goals, pain points, and landscape." },
        { title: "Design", copy: "Blueprints that match the right technologies to the problem." },
        { title: "Build", copy: "Agile execution with continuous integration and reporting." },
        { title: "Scale & Support", copy: "Optimization and monitoring after launch." },
      ],
    },
    {
      eyebrow: "LATEST INSIGHTS",
      title: "Thought leadership for enterprise decision-makers.",
      copy: "The public site highlights current thinking across AI, cloud strategy, and cybersecurity.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
      imageAlt: "Conference and strategy",
      quotes: [
        {
          author: "Dr. Aisha Patel",
          role: "Head of AI Research",
          copy: "The Future of Generative AI in the Enterprise",
        },
        {
          author: "Marcus Chen",
          role: "Principal Cloud Architect",
          copy: "Multi-Cloud in 2026: Strategy Over Complexity",
        },
        {
          author: "Priya Ramesh",
          role: "Chief Security Officer",
          copy: "Building a Zero-Trust Architecture That Actually Works",
        },
      ],
    },
  ],
  extraSections: [
    {
      eyebrow: "POWERED BY INDUSTRY-LEADING TOOLS",
      title: "The stack is built to ship securely and scale cleanly.",
      copy: "The official site references a broad toolkit across cloud platforms, containers, development frameworks, and CI/CD practices.",
      items: [
        { kicker: "Cloud", title: "AWS, Azure, Google Cloud", copy: "Multi-cloud capabilities support flexible deployment and infrastructure choices." },
        { kicker: "Engineering", title: "React, Node.js, Python", copy: "Modern application layers support fast delivery and strong developer ergonomics." },
        { kicker: "Operations", title: "Docker, Kubernetes, DevOps", copy: "Repeatable delivery pipelines help reduce operational drift." },
      ],
    },
    {
      eyebrow: "LATEST INSIGHTS",
      title: "A sharper view of the company’s public thinking.",
      copy: "The live site publishes AI, cloud strategy, and security perspectives that reinforce the company’s enterprise orientation.",
      alt: true,
      items: [
        { kicker: "AI", title: "The Future of Generative AI in the Enterprise", copy: "A pragmatic enterprise lens on AI adoption and value creation." },
        { kicker: "Cloud", title: "Multi-Cloud in 2026: Strategy Over Complexity", copy: "Guidance on simplifying cloud posture without losing capability." },
        { kicker: "Security", title: "Building a Zero-Trust Architecture That Actually Works", copy: "A practical framework for hybrid security planning." },
      ],
    },
  ],
  cta: {
    eyebrow: "GET IN TOUCH",
    title: "Let’s build the next version of your technology stack.",
    copy: "Reach out if you want to modernize infrastructure, launch a digital product, or map an AI-driven transformation roadmap.",
    primary: { label: "Email Us", href: "mailto:info@arshithgroup.com" },
    secondary: { label: "Back to Businesses", href: "/portfolio" },
  },
};

export default function ArshithInfotech() {
  return <CompanyDetailPage config={config} />;
}