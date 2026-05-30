import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Contact() {
  const containerRef = useScrollReveal();

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you shortly.");
    e.target.reset();
  };

  return (
    <div ref={containerRef}>
      {/* PAGE HERO */}
      <section className="page-hero contact-hero">
        <div className="container">
          <div className="page-hero-split contact-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">GET IN TOUCH</span>
              <h1>
                Let's Start a <br />
                <span className="highlight-text">Conversation</span>
              </h1>
              <p>
                Have questions about our businesses, technical services, careers, or organic retail options? Reach out today.
              </p>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop"
                alt="Business contact and support collaboration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED INFO CARDS */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px" }} className="gsap-reveal">
          {/* Card 1 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-map-pin-line"></i>
            </div>
            <h3>Location</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Bengaluru, Karnataka, India - 560076
            </p>
          </div>

          {/* Card 2 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-phone-line"></i>
            </div>
            <h3>Direct Phone</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              +91 86184 71424 <br />
              +91 90145 74712
            </p>
          </div>

          {/* Card 3 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-mail-line"></i>
            </div>
            <h3>Support Emails</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              info@arshithgroup.com <br />
              support@arshithfresh.com
            </p>
          </div>

          {/* Card 4 */}
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-time-line"></i>
            </div>
            <h3>Office Hours</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Monday – Saturday <br />
              09:00 AM – 06:00 PM
            </p>
          </div>
        </div>
      </section>

      {/* FORM AND DESCRIPTION */}
      <section className="light-contrast">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "60px", alignItems: "center" }} className="gsap-reveal">
          <div>
            <span className="eyebrow">SEND MESSAGE</span>
            <h2 style={{ fontSize: "36px", color: "#0f172a", marginBottom: "20px" }}>Share Your Requirement</h2>
            <p style={{ color: "#111111", marginBottom: "24px", lineHeight: "1.7" }}>
              Whether you are an agricultural vendor seeking listing approval, an enterprise partner requiring cloud consulting, or an applicant tracking career openings, send us a summary. Our coordinators respond within 24 business hours.
            </p>
            <ul style={{ listStyle: "none", color: "#111111", fontSize: "15px" }}>
              <li style={{ marginBottom: "10px" }}><i className="ri-checkbox-circle-line" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Direct integration with key account managers</li>
              <li style={{ marginBottom: "10px" }}><i className="ri-checkbox-circle-line" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Tailored feasibility scoping meetings</li>
              <li><i className="ri-checkbox-circle-line" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Complete data privacy compliance logs</li>
            </ul>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "40px", borderRadius: "var(--radius-lg)" }}>
            <form onSubmit={handleContactSubmit} className="premium-form" style={{ gap: "20px" }}>
              <div className="form-group-luxury">
                <input type="text" placeholder="Your Name" required style={{ border: "1px solid #cbd5e1", color: "#000" }} />
              </div>
              <div className="form-group-luxury">
                <input type="email" placeholder="Email Address" required style={{ border: "1px solid #cbd5e1", color: "#000" }} />
              </div>
              <div className="form-group-luxury">
                <textarea placeholder="Write your message details..." rows="5" required style={{ border: "1px solid #cbd5e1", color: "#000" }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MAP EMBED 
      <section style={{ background: "var(--bg-dark)", borderBottom: "none" }} className="gsap-reveal">
        <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.751336181938!2d77.61849187498305!3d12.92369248738676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14f9d2c2ad31%3A0xe54efefad0c1598f!2sArshith%20Fresh%20India%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1714930198642!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Arshith Fresh Location"
          ></iframe>
        </div>
      </section>*/}
    </div>
  );
}
