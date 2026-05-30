import React from "react";
import { Link, useParams } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const FRAMEWORKS = {
  "agriculture-organic-food": {
    title: "Agriculture & Organic Food Framework",
    eyebrow: "RETAIL & E-COMMERCE",
    summary:
      "A practical operating model to connect farmers, quality labs, fulfillment teams, and households with better traceability and healthier outcomes.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop",
    pillars: [
      "Farmer onboarding with crop planning support",
      "Batch-level quality checks and certification workflow",
      "Direct-to-home last-mile delivery optimization",
      "Feedback loop from customer demand to source planning",
    ],
    implementationTracks: [
      { title: "Sourcing", copy: "Cluster-based procurement contracts with demand balancing." },
      { title: "Operations", copy: "Cold-chain aware packaging and dispatch prioritization." },
      { title: "Digital Layer", copy: "Product traceability, shelf-life alerts, and reorder automation." },
    ],
    outcomes: ["Lower spoilage", "Higher farmer margin", "Faster order cycle", "Trusted quality"],
  },
  "software-digital-technology": {
    title: "Software & Digital Technology Framework",
    eyebrow: "IT SERVICES & INFRASTRUCTURE",
    summary:
      "A modernization blueprint for secure application delivery, cloud scalability, and observable operations across enterprise workloads.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    pillars: [
      "Microservice-friendly architecture and API governance",
      "Cloud-native deployment with auto-scale controls",
      "Secure database and identity access layers",
      "Centralized observability and incident playbooks",
    ],
    implementationTracks: [
      { title: "Platform", copy: "Containerized apps with release pipelines and rollback safety." },
      { title: "Security", copy: "Policy-driven access controls and vulnerability gates." },
      { title: "Performance", copy: "Capacity planning with realtime telemetry and SLA dashboards." },
    ],
    outcomes: ["Faster release velocity", "Stronger security posture", "Reliable uptime", "Lower infra drift"],
  },
  "corporate-strategy-advisory": {
    title: "Corporate Strategy & Advisory Framework",
    eyebrow: "BUSINESS CONSULTING",
    summary:
      "A decision framework for feasibility, compliance, process optimization, and digital transformation sequencing.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    pillars: [
      "Structured diagnostics across finance, process, and governance",
      "Compliance mapping with risk-priority action plans",
      "Operating model redesign with measurable KPI targets",
      "Phased change management and stakeholder alignment",
    ],
    implementationTracks: [
      { title: "Assess", copy: "Current-state audit and opportunity sizing." },
      { title: "Design", copy: "Roadmap with workstreams, owners, and milestone gates." },
      { title: "Execute", copy: "Program governance with periodic value realization reviews." },
    ],
    outcomes: ["Clear execution roadmap", "Reduced compliance risk", "Improved operating efficiency", "Higher strategic clarity"],
  },
  "branding-programmatic-ads": {
    title: "Branding & Programmatic Ads Framework",
    eyebrow: "DIGITAL MARKETING",
    summary:
      "A growth framework that combines brand positioning, search visibility, paid media intelligence, and conversion optimization.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
    pillars: [
      "Audience segmentation and message hierarchy",
      "SEO + content cluster strategy for intent capture",
      "Programmatic campaign planning and optimization",
      "Landing page experimentation with conversion tracking",
    ],
    implementationTracks: [
      { title: "Brand", copy: "Positioning framework and creative system alignment." },
      { title: "Acquisition", copy: "Paid + organic funnel design with CAC guardrails." },
      { title: "Retention", copy: "Remarketing, loyalty triggers, and lifecycle engagement." },
    ],
    outcomes: ["Higher qualified traffic", "Better conversion rate", "Lower acquisition waste", "Consistent brand recall"],
  },
};

function NotFoundState() {
  return (
    <section className="industry-framework-section">
      <div className="industry-framework-shell">
        <h2>Framework Not Found</h2>
        <p>We could not find the requested framework. Please go back and select a listed industry.</p>
        <Link to="/industries" className="btn btn-primary">Back To Industries</Link>
      </div>
    </section>
  );
}

export default function IndustryFrameworkDetail() {
  const { industryId } = useParams();
  const containerRef = useScrollReveal();
  const data = FRAMEWORKS[industryId];

  if (!data) {
    return <NotFoundState />;
  }

  return (
    <div ref={containerRef}>
      <section className="page-hero industries-hero">
        <div className="container">
          <div className="page-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">{data.eyebrow}</span>
              <h1>{data.title}</h1>
              <p>{data.summary}</p>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img src={data.image} alt={data.title} />
            </div>
          </div>
        </div>
      </section>

      <section className="industry-framework-section">
        <div className="industry-framework-shell industry-framework-grid gsap-reveal">
          <div className="industry-framework-image-wrap">
            <img src={data.image} alt={data.title} />
          </div>
          <div>
            <span className="eyebrow">CORE PILLARS</span>
            <h2>{data.title.replace("Framework", "Blueprint")}</h2>
            <div className="industry-framework-list">
              {data.pillars.map((pillar) => (
                <div className="industry-framework-list-item" key={pillar}>
                  <i className="ri-checkbox-circle-line"></i>
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="industry-framework-section industry-framework-soft">
        <div className="industry-framework-shell">
          <div className="section-header gsap-reveal">
            <span className="eyebrow">IMPLEMENTATION TRACKS</span>
            <h2>How The Framework Gets Executed</h2>
          </div>
          <div className="industry-framework-track-grid gsap-reveal">
            {data.implementationTracks.map((track) => (
              <article className="industry-framework-track-card" key={track.title}>
                <h3>{track.title}</h3>
                <p>{track.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="industry-framework-section">
        <div className="industry-framework-shell gsap-reveal">
          <span className="eyebrow">EXPECTED OUTCOMES</span>
          <div className="industry-framework-chip-row">
            {data.outcomes.map((outcome) => (
              <span key={outcome} className="industry-framework-chip">{outcome}</span>
            ))}
          </div>
          <div className="industry-framework-actions">
            <Link to="/contact" className="btn btn-primary">Discuss This Framework</Link>
            <Link to="/industries" className="btn btn-secondary">Back To Industries</Link>
          </div>
        </div>
      </section>
    </div>
  );
}