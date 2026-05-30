import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscription successful! Thank you for joining our newsletter.");
    e.target.reset();
  };

  return (
    <footer className={`ag-footer ${styles.footer}`} id="footer">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
      </div>
      <div className="ag-footer-inner">
        <div className="ag-footer-brand">
          <Link to="/">
            <img src="/assests/logo.png" alt="Arshith Group Logo" style={{ maxHeight: "55px", marginBottom: "20px" }} />
          </Link>
          <p>
            Arshith Group is a dynamic enterprise committed to innovation, sustainability, and quality across multiple diversified verticals. We build future-ready solutions that create long-term impact.
          </p>
          <div className="ag-footer-social">
            <a href="https://www.linkedin.com/in/farook-n-2bb2b5344/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://www.linkedin.com/company/arshith-fresh-india-pvt-ltd/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://www.linkedin.com/in/pallavi-n-4578033ab/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/npallavi_arshith?igsh=MXVxeWViejE3eHJsdg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://youtube.com/@vamikadurbar?si=mvXxo3HM8Qe4liD9" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="ag-footer-cols">
          <div className="ag-footer-col">
            <h5>About Us</h5>
            <ul>
              <li><Link to="/about">Our Company</Link></li>
              <li><Link to="/about">Leadership</Link></li>
              <li><Link to="/about">Values & Culture</Link></li>
              <li><Link to="/portfolio">Projects</Link></li>
            </ul>
          </div>

          <div className="ag-footer-col">
            <h5>Businesses</h5>
            <ul>
              <li><Link to="/portfolio/arshith-fresh">Arshith Fresh</Link></li>
              <li><Link to="/portfolio/arshith-infotech">Arshith Infotech</Link></li>
              <li><Link to="/portfolio/suntech-solutions">Suntech Solutions</Link></li>
              <li><Link to="/portfolio/suntech-solutions">Suntech Digital</Link></li>
            </ul>
          </div>

          <div className="ag-footer-col">
            <h5>Connect</h5>
            <ul>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/internship">Internships</Link></li>
              <li><Link to="/blog">Latest News</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="ag-footer-col">
            <h5>Newsletter</h5>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "15px", lineHeight: "1.5" }}>
              Subscribe to receive the latest updates, press releases, and corporate news.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input type="email" placeholder="Your Email Address" required />
              <button type="submit" aria-label="Subscribe">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="ag-footer-bottom">
        <div className="ag-footer-bottom-inner">
          <p>&copy; 2026 Arshith Group. All rights reserved.</p>
          <div className={`ag-footer-legal ${styles.legal}`}>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/legal-disclaimer">Legal Disclaimer</a>
          </div>
          <button className="ag-back-top" onClick={scrollToTop} aria-label="Back to top">
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}
