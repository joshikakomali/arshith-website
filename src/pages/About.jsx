import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollReveal from "../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useScrollReveal();
  const timelineRef = useRef(null);

  useEffect(() => {
    // Milestones scroll progress line animation
    const timeline = timelineRef.current;
    if (!timeline) return;

    const progressLine = timeline.querySelector(".milestones-progress");
    if (!progressLine) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressLine,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 40%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, timeline);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* PAGE HERO */}
      <section className="page-hero about-hero">
        <div className="container">
          <div className="page-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">ABOUT US</span>
              <h1>
                Building Trust <br />
                Through <span className="highlight-text">Innovation</span>
              </h1>
              <p>
                Empowering businesses and communities with cutting-edge technology, natural sourcing, and future-ready enterprise solutions.
              </p>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img src="/assests/about us.png" alt="Arshith Group team" />
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="grid-2-col gsap-reveal">
          <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", height: "450px" }}>
            <img 
               src="/assests/group.png" 
               alt="Arshith Group Team" 
               style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <span className="eyebrow">OUR LEGACY</span>
            <h2 style={{ fontSize: "36px", marginBottom: "20px", color: "var(--text-main)" }}>The Arshith Story</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px", fontSize: "16px" }}>
              <strong>Arshith Group</strong> is a dynamic and growing ecosystem built on trust, innovation, and a vision for sustainable growth. At its core, the organization is driven by strong pillars - <strong>Arshith Infotech, Arshith Fresh, and Suntech Solutions</strong> - each contributing uniquely to our mission of delivering excellence.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>
              We specialize in providing smart digital solutions that empower businesses to scale, while remaining deeply rooted in our commitment to quality through organic, farm-sourced retail options directly serving consumer homes. With a balance of tradition and innovation, Arshith Group is steadily shaping a future where technology, sustainability, and trust come together.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="light-contrast">
        <div className="section-header gsap-reveal">
          <span className="eyebrow">PURPOSE</span>
          <h2>Driven by Purpose &amp; Vision</h2>
        </div>

        <div className="grid-2-col gsap-reveal">
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "40px", borderRadius: "var(--radius-lg)" }}>
            <i className="ri-rocket-2-line" style={{ fontSize: "36px", color: "var(--accent)", marginBottom: "20px", display: "inline-block" }}></i>
            <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#0f172a" }}>Our Mission</h3>
            <p style={{ color: "#111111", lineHeight: "1.7" }}>
              To enrich lives by supplying fresh, wholesome products directly to households while providing cutting-edge IT services and strategic consulting that support business transformation and global operational scalability.
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "40px", borderRadius: "var(--radius-lg)" }}>
            <i className="ri-eye-line" style={{ fontSize: "36px", color: "var(--accent)", marginBottom: "20px", display: "inline-block" }}></i>
            <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#0f172a" }}>Our Vision</h3>
            <p style={{ color: "#111111", lineHeight: "1.7" }}>
              To build a sustainable global conglomerate recognized for bringing positive ecological change and technological supremacy, cementing a legacy of trust and quality for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="section-header gsap-reveal">
          <span className="eyebrow">CORE VALUES</span>
          <h2>Our Guiding Principles</h2>
        </div>

        <div className="grid-3-col gsap-reveal">
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-shield-check-line"></i>
            </div>
            <h3>Absolute Integrity</h3>
            <p>We believe in maintaining transparent relations with our farmers, partners, and clients, ensuring transparency and accountability at every stage.</p>
          </div>

          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-lightbulb-flash-line"></i>
            </div>
            <h3>Continuous Innovation</h3>
            <p>Adopting advanced methodologies, modern cloud infrastructures, and digital algorithms to solve complex technological challenges.</p>
          </div>

          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-leaf-line"></i>
            </div>
            <h3>Eco-Sustainability</h3>
            <p>Supporting local agricultural ecosystems and organic farming to deliver pure health benefits without compromising our environment.</p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SHOWCASE */}
      <section className="light-contrast">
        <div className="section-header gsap-reveal">
          <span className="eyebrow">LEADERSHIP</span>
          <h2>Guided by Visionaries</h2>
        </div>

        <div className="leadership-grid gsap-reveal">
          {/* Leader 1 */}
          <div className="leadership-card" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <div className="leadership-image-wrap">
              <img src="/assests/ceo sir.png" alt="Farook N" />
            </div>
            <div className="leadership-info">
              <h3 style={{ color: "#0f172a" }}>Farook N</h3>
              <span>Chairman - Arshith Group</span>
              <p style={{ color: "#111111" }}>
                "As a proudly rooted Indian brand, we at Arshith Fresh are dedicated to creating honest, healthy, and high-quality products that nourish every home. Our journey is guided by deep respect for tradition and a bold vision for modern India."
              </p>
              <a 
                href="https://www.linkedin.com/in/farook-n-2bb2b5344" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="leadership-linkedin"
              >
                <i className="ri-linkedin-box-fill"></i> View LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Leader 2 */}
          <div className="leadership-card" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <div className="leadership-image-wrap">
              <img src="/assests/pallavi mam.png" alt="Pallavi N" />
            </div>
            <div className="leadership-info">
              <h3 style={{ color: "#0f172a" }}>Pallavi N</h3>
              <span>Managing Director - Arshith Group</span>
              <p style={{ color: "#111111" }}>
                "At Arshith Group, we're more than just a brand — we're a heartfelt movement rooted in the soil of India. Our mission is to nourish every Indian home with wholesome, transparent, and thoughtfully made products."
              </p>
              <a 
                href="https://www.linkedin.com/in/pallavi-n-4578033ab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="leadership-linkedin"
              >
                <i className="ri-linkedin-box-fill"></i> View LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="section-header gsap-reveal">
          <span className="eyebrow">TIMELINE</span>
          <h2>Our Strategic Journey</h2>
        </div>

        <div className="milestones-timeline" ref={timelineRef}>
          <div className="milestones-line" />
          <div className="milestones-progress" />

          {/* Milestone 1 */}
          <div className="milestone-item gsap-reveal">
            <div className="milestone-node" />
            <div className="milestone-card">
              <span>2018</span>
              <h3>Corporate Genesis</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Founded with a strong aspiration to bridge traditional market structures with digital capability, building early client workflows.
              </p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="milestone-item gsap-reveal">
            <div className="milestone-node" />
            <div className="milestone-card">
              <span>2020</span>
              <h3>Arshith Fresh Launch</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Expanded footprint into e-commerce retail networks to serve organic farm-to-table foods to thousands of active homes.
              </p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="milestone-item gsap-reveal">
            <div className="milestone-node" />
            <div className="milestone-card">
              <span>2022</span>
              <h3>Suntech Consolidation</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Integrated enterprise cloud, tech advisory, and marketing channels under Suntech Solutions to support commercial ventures globally.
              </p>
            </div>
          </div>

          {/* Milestone 4 */}
          <div className="milestone-item gsap-reveal">
            <div className="milestone-node" />
            <div className="milestone-card">
              <span>2024</span>
              <h3>Global Ecosystem Expansion</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Exceeded 30K+ loyal customers and scaled IT and consulting resources to service clients across three continents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{ background: "var(--bg-dark)", borderBottom: "none" }} className="gsap-reveal">
        <div className="grid-4-col" style={{ textAlign: "center" }}>
          <div>
            <h2 style={{ fontSize: "56px", color: "var(--accent)", marginBottom: "8px" }}>7+</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", textTransform: "uppercase" }}>Years of Operation</p>
          </div>
          <div>
            <h2 style={{ fontSize: "56px", color: "var(--accent)", marginBottom: "8px" }}>100+</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", textTransform: "uppercase" }}>Premium Products</p>
          </div>
          <div>
            <h2 style={{ fontSize: "56px", color: "var(--accent)", marginBottom: "8px" }}>30K+</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", textTransform: "uppercase" }}>Satisfied Consumers</p>
          </div>
          <div>
            <h2 style={{ fontSize: "56px", color: "var(--accent)", marginBottom: "8px" }}>15+</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", textTransform: "uppercase" }}>Digital Solutions</p>
          </div>
        </div>
      </section>
    </div>
  );
}
