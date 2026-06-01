import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Services() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      {/* PAGE HERO */}
      <section className="page-hero services-hero">
        <div className="container">
          <div className="page-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">OUR SOLUTIONS</span>
              <h1>
                Innovative Services <br />
                For Modern <span className="highlight-text">Enterprises</span>
              </h1>
              <p>
                Accelerating brand transformation with custom web software, scalable cloud architecture, e-commerce networks, and data-driven marketing.
              </p>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                alt="Analytics and digital services workspace"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES LIST SHOWCASE */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="section-header gsap-reveal">
          <span className="eyebrow">WHAT WE DELIVER</span>
          <h2>Diversified Business Verticals</h2>
        </div>

        <div className="services-card-grid gsap-reveal">
          {/* Card 1 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-computer-line"></i>
            </div>
            <h3>IT Services &amp; Consulting</h3>
            <p>
              Designing scalable custom enterprise software architectures, cloud system deployments (AWS/Azure), and operational consulting to modernize workflows.
            </p>
          </div>

          {/* Card 2 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-shopping-cart-2-line"></i>
            </div>
            <h3>E-Commerce Architecture</h3>
            <p>
              Deploying multi-channel shopping portals, payment integrations, secure merchant terminals, and fulfillment setups to fuel retail operations.
            </p>
          </div>

          {/* Card 3 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-store-3-line"></i>
            </div>
            <h3>Multi Seller Platforms</h3>
            <p>
              Building complex multi-vendor marketplaces, vendor dashboards, commission structures, and bulk stock databases.
            </p>
          </div>

          {/* Card 4 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-megaphone-line"></i>
            </div>
            <h3>Digital Marketing &amp; Brand Ads</h3>
            <p>
              Executing cross-platform lead generation, programmatic ads placement, conversion funnel setup, and search engine campaigns.
            </p>
          </div>

          {/* Card 5 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-search-eye-line"></i>
            </div>
            <h3>Advanced SEO &amp; Analytics</h3>
            <p>
              Comprehensive organic ranking audits, keyword research, link profiles, schema mockups, and real-time user metrics dashboards.
            </p>
          </div>

          {/* Card 6 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-briefcase-4-line"></i>
            </div>
            <h3>Corporate Growth Consulting</h3>
            <p>
              Strategic advisory on business consolidation, market entry parameters, administrative compliance, and digital transformations.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS WORKFLOW */}
      <section className="light-contrast">
        <div className="section-header gsap-reveal">
          <span className="eyebrow">OUR METHODOLOGY</span>
          <h2>How We Engineer Success</h2>
        </div>

        <div className="process-step-row gsap-reveal">
          {/* Step 1 */}
          <div className="process-step-card" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <span className="step-num" style={{ color: "rgba(0,0,0,0.06)" }}>01</span>
            <h3>Strategic Audits</h3>
            <p style={{ color: "#111111" }}>
              Analysing existing workflows, audience requirements, and operational bottlenecks to build robust design briefs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="process-step-card" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <span className="step-num" style={{ color: "rgba(0,0,0,0.06)" }}>02</span>
            <h3>Agile Planning</h3>
            <p style={{ color: "#111111" }}>
              Drafting step-by-step technological architecture milestones, milestones roadmaps, and validation criteria.
            </p>
          </div>

          {/* Step 3 */}
          <div className="process-step-card" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <span className="step-num" style={{ color: "rgba(0,0,0,0.06)" }}>03</span>
            <h3>Scalable Dev</h3>
            <p style={{ color: "#111111" }}>
              Writing clean, modular codes, testing security parameters, and constructing scalable cloud pipelines.
            </p>
          </div>

          {/* Step 4 */}
          <div className="process-step-card" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <span className="step-num" style={{ color: "rgba(0,0,0,0.06)" }}>04</span>
            <h3>Launch &amp; Opt</h3>
            <p style={{ color: "#111111" }}>
              Deploying modules, monitoring operational health, gathering user responses, and adjusting optimizations.
            </p>
          </div>
        </div>
      </section>

      {/* STORYTELLING DETAIL SECTION */}
      <section style={{ background: "var(--bg-dark)", borderBottom: "none" }}>
        <div className="grid-2-col gsap-reveal">
          <div>
            <span className="eyebrow">PARTNERSHIP VALUE</span>
            <h2 style={{ fontSize: "36px", marginBottom: "20px", color: "var(--text-main)" }}>Unlocking Exponential Growth Potential</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px", fontSize: "16px" }}>
              We collaborate with corporate stakeholders and startup partners alike to bridge technical execution with operational business objectives. By combining secure data storage, search optimization, and modern UI engineering, we ensure your platforms remain scalable over time.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>
              Our multi-tiered services layout supports modular selection, enabling organizations to implement cloud transformations, organic retail channels, or targeted digital marketing as unified packages or standalone blocks.
            </p>
          </div>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: "400px" }}>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
              alt="Analytics Dashboard" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
