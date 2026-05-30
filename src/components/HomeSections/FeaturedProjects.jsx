import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FeaturedProjects.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Future Growth & Direction",
    category: "Strategic Milestone",
    desc: "Structuring the corporate roadmap for Arshith Group's next phase of market integration.",
    image: "/assests/news1.png",
  },
  {
    id: 2,
    title: "New Phase of Progress",
    category: "Educational Outreach",
    desc: "Fostering academic collaborations and corporate training ecosystems at DIET college.",
    image: "/assests/news2.png",
  },
  {
    id: 3,
    title: "Empowering Minds",
    category: "Student Development",
    desc: "Nurturing future engineering leaders through digital internship and technical certification programs.",
    image: "/assests/news3.jpg",
  },
  {
    id: 4,
    title: "Women Leadership Initiatives",
    category: "Corporate Culture",
    desc: "Increasing administrative capabilities and promoting leadership growth for women.",
    image: "/assests/news4.jpg",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    if (!section || !scrollWrapper) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Configure horizontal scrolling for screen widths above 768px
      mm.add("(min-width: 769px)", () => {
        gsap.to(scrollWrapper, {
          x: () => -(scrollWrapper.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.0,
            start: "top top",
            end: () => `+=${scrollWrapper.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.sectionContainer} id="news">
      
      {/* Static header block for title */}
      <div className={styles.introHeader}>
        <span className={styles.eyebrow}>Media & Achievements</span>
        <h2 className={styles.title}>Featured Projects & Updates</h2>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div ref={scrollWrapperRef} className={styles.scrollWrapper}>
        {PROJECTS.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.imageFrame}>
              <img src={project.image} alt={project.title} className={styles.projectImage} />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.projectInfo}>
              <span className={styles.projectCategory}>{project.category}</span>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.desc}</p>
            </div>
          </div>
        ))}
        
        {/* Call to action card at the end of the scroll */}
        <div className={styles.moreCard}>
          <div className={styles.moreContent}>
            <h3>Stay Updated</h3>
            <p>Read all our latest media features and corporate statements.</p>
            <a href="#" className={styles.moreBtn}>
              View All Posts <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
