import React, { useState } from "react";
import { Link } from "react-router-dom";
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

export default function Blog() {
  const containerRef = useScrollReveal();
  const [activeTab, setActiveTab] = useState("all");

  const filteredPosts = activeTab === "all"
    ? BLOG_DATA
    : BLOG_DATA.filter(post => post.category === activeTab);

  const featuredPost = BLOG_DATA[0];

  return (
    <div ref={containerRef}>
      {/* PAGE HERO */}
      <section className="page-hero blog-hero">
        <div className="container">
          <div className="page-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">EDITORIAL CENTER</span>
              <h1>
                Latest News &amp; <br />
                Corporate <span className="highlight-text">Updates</span>
              </h1>
              <p>
                Stay informed on press updates, training events, agricultural retail progress, and technical milestones.
              </p>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img src="/assests/news.png" alt="Corporate news and updates" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="section-header gsap-reveal">
          <span className="eyebrow">FEATURED ARTICLE</span>
          <h2>Top Story</h2>
        </div>

        <Link 
          to={`/blog/${featuredPost.id}`} 
          className="gsap-reveal"
          style={{ 
            display: "grid", 
            gridTemplateColumns: "1.2fr 0.8fr", 
            gap: "50px", 
            alignItems: "center",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            padding: "0"
          }}
        >
          <div style={{ height: "450px" }}>
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "40px" }}>
            <span className="blog-card-tag">{featuredPost.tag}</span>
            <span style={{ fontSize: "13px", color: "var(--text-muted)", display: "block", marginBottom: "15px" }}>{featuredPost.date}</span>
            <h3 style={{ fontSize: "28px", lineHeight: "1.3", marginBottom: "16px", color: "var(--text-main)" }}>{featuredPost.title}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}>
              {featuredPost.desc}
            </p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "14px", color: "var(--accent)" }}>
              Read Full Article <i className="ri-arrow-right-line"></i>
            </span>
          </div>
        </Link>
      </section>

      {/* NEWS GRID SECTION */}
      <section style={{ background: "var(--bg-dark)", borderBottom: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }} className="gsap-reveal">
          <h2>All Articles</h2>
          <div className="filter-tabs-wrapper" style={{ margin: "0" }}>
            <button className={`filter-tab-btn ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>All</button>
            <button className={`filter-tab-btn ${activeTab === "press" ? "active" : ""}`} onClick={() => setActiveTab("press")}>Press</button>
            <button className={`filter-tab-btn ${activeTab === "events" ? "active" : ""}`} onClick={() => setActiveTab("events")}>Events</button>
            <button className={`filter-tab-btn ${activeTab === "achievements" ? "active" : ""}`} onClick={() => setActiveTab("achievements")}>Achievements</button>
          </div>
        </div>

        <div className="blog-editorial-grid gsap-reveal">
          {filteredPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="blog-card-editorial">
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-card-content">
                <span className="blog-card-tag">{post.tag}</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "10px" }}>{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "13px", color: "var(--accent)", marginTop: "15px" }}>
                  Read Article <i className="ri-arrow-right-line"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
