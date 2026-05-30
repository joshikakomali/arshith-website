import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const BLOG_DATA = [
  {
    id: 1,
    title: "A Defining Moment for Future Growth and Direction",
    category: "press",
    tag: "Press Release",
    desc: "Strengthening corporate vision, outlining resource coordination pipelines, and expanding operational capabilities for long-term sustainable growth.",
    image: "/assests/news1.png",
    date: "May 20, 2026"
  },
  {
    id: 2,
    title: "Marking a New Phase of Progress and Commitment",
    category: "events",
    tag: "Corporate Event",
    desc: "Celebrating cross-vertical collaborations and announcing software framework updates across Suntech and Infotech divisions.",
    image: "/assests/news2.png",
    date: "April 18, 2026"
  },
  {
    id: 3,
    title: "A Moment of Pride and Institutional Collaboration",
    category: "achievements",
    tag: "Achievements",
    desc: "Honouring shared achievements, industry awards, and formal training partnerships with educational technology centers.",
    image: "/assests/news3.jpg",
    date: "March 15, 2026"
  },
  {
    id: 4,
    title: "Empowering Minds for a Brighter Leadership Tomorrow",
    category: "events",
    tag: "Training Event",
    desc: "Details from the leadership training workshop coordinated for project managers and interns within the Arshith Fresh headquarters.",
    image: "/assests/news4.jpg",
    date: "Feb 28, 2026"
  },
  {
    id: 5,
    title: "A Step Forward in Strengthening Women Leadership",
    category: "achievements",
    tag: "Achievements",
    desc: "Empowering women with diverse opportunities, leadership responsibilities, and clear equal-growth trajectories in our corporate ecosystem.",
    image: "/assests/news5.jpeg",
    date: "Jan 12, 2026"
  },
  {
    id: 6,
    title: "Strengthening Foundations for Future Success",
    category: "press",
    tag: "Press Release",
    desc: "Drafting corporate compliance models and deploying regional agricultural distribution metrics to streamline Arshith Fresh systems.",
    image: "/assests/news6.jpg",
    date: "Dec 05, 2025"
  }
];

export default function BlogDetail() {
  const containerRef = useScrollReveal();
  const { id } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = BLOG_DATA.find(p => p.id === parseInt(id)) || BLOG_DATA[0];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef}>
      {/* READING PROGRESS BAR */}
      <div className="reading-bar-container">
        <div 
          className="reading-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ARTICLE HERO */}
      <section className="page-hero" style={{ background: `radial-gradient(circle at center, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.92) 100%), url('${post.image}') center/cover no-repeat` }}>
        <div className="container">
          <div className="page-hero-content gsap-reveal" style={{ maxWidth: "900px" }}>
            <span className="eyebrow">{post.tag}</span>
            <span style={{ fontSize: "13px", color: "var(--accent)", display: "block", marginBottom: "15px" }}>{post.date}</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", lineHeight: "1.2", color: "var(--text-main)" }}>
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT LAYOUT */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="blog-detail-layout">
          {/* Main Article Body */}
          <div className="blog-detail-article gsap-reveal">
            <p style={{ fontSize: "18px", color: "var(--text-main)", fontWeight: "500", marginBottom: "2rem" }}>
              {post.desc}
            </p>

            <h2 id="section1">1. Executive Overview &amp; Background</h2>
            <p>
              As the global economy continues to shift towards modular technical solutions and sustainable agricultural assets, Arshith Group has proactively structured its resource allocation parameters to optimize service delivery. By coordinating software frameworks, payment channels, and local organic sourcing, we guarantee stability across all commercial sectors.
            </p>
            <p>
              Our internal metrics indicate that digital platform adoptions have surged by 45% over the past two fiscal semesters, driven primarily by our Suntech Digital advisory services and the expanding Arshith Fresh merchant base.
            </p>

            <blockquote>
              "Innovation is not merely about writing clean scripts or setting up cloud architectures; it is about building a secure, transparent legacy of trust that empowers local farming networks and global organizations alike."
            </blockquote>

            <h2 id="section2">2. Implementation Milestones</h2>
            <p>
              We have completed deployment updates for our regional marketplace dashboards, allowing vendors to handle stock inputs and verify payment status with minimal latency. Our infrastructure operates on a dual-redundant cloud stack to prevent server outages during peak shopping hours.
            </p>
            <p>
              Additionally, our cooperative agricultural logistics network has added three regional warehouse hubs, bringing our direct-to-home delivery transit duration to less than twelve hours.
            </p>

            <h2 id="section3">3. Future Growth &amp; Roadmaps</h2>
            <p>
              Looking forward, Arshith Group is scaling resources to support technical simulations, client training, and automated verification codes. We are committed to developing carbon-neutral distribution frameworks and organic branding initiatives that foster economic prosperity.
            </p>
            <p style={{ marginTop: "3rem" }}>
              <Link to="/blog" className="btn btn-secondary">
                <i className="ri-arrow-left-line"></i> Back to News
              </Link>
            </p>
          </div>

          {/* Sticky Sidebar Table of Contents */}
          <div className="blog-detail-sidebar gsap-reveal">
            <div className="toc-widget">
              <h4>Table of Contents</h4>
              <ul>
                <li><a href="#section1">1. Executive Overview</a></li>
                <li><a href="#section2">2. Implementation Milestones</a></li>
                <li><a href="#section3">3. Future Roadmaps</a></li>
              </ul>
              
              <div style={{ borderTop: "1px solid var(--border)", marginTop: "30px", paddingTop: "20px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "10px" }}>Share this Article</span>
                <div style={{ display: "flex", gap: "10px", fontSize: "16px", color: "var(--accent)" }}>
                  <a href="#share" aria-label="Share on LinkedIn"><i className="ri-linkedin-fill"></i></a>
                  <a href="#share" aria-label="Share on Twitter"><i className="ri-twitter-fill"></i></a>
                  <a href="#share" aria-label="Share on Facebook"><i className="ri-facebook-fill"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
