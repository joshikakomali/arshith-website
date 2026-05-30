import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Timeline.module.css";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2019",
    title: "Corporate Foundation",
    desc: "Arshith Group was established with a long-term goal of building high-quality consumer and technology services.",
  },
  {
    year: "2021",
    title: "Arshith Fresh Launch",
    desc: "Ventured into e-commerce to bridge the gap between regional farmers and end consumers, delivering fresh produce.",
  },
  {
    year: "2023",
    title: "IT & Business Consulting",
    desc: "Founded Arshith Infotech and Suntech Solutions to support businesses in their software and administrative needs.",
  },
  {
    year: "2025",
    title: "Marketplace Expansion",
    desc: "Developed open multi-seller portals and digital assessment systems to automate enterprise logistics.",
  },
  {
    year: "2026",
    title: "Sustainable Integration",
    desc: "Upgrading regional logistics, launching unified enterprise platforms, and establishing net-zero targets.",
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);
  const milestoneRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const progressLine = progressLineRef.current;
    if (!container || !progressLine) return;

    const ctx = gsap.context(() => {
      // Progress line height linked directly to scroll position
      gsap.fromTo(
        progressLine,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      // Light up milestone nodes and trigger card entries
      milestoneRefs.current.forEach((el, index) => {
        if (!el) return;
        const dot = el.querySelector(`.${styles.dot}`);
        const card = el.querySelector(`.${styles.card}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(dot, {
          backgroundColor: "#2563eb",
          borderColor: "#60a5fa",
          scale: 1.3,
          duration: 0.4,
        }).fromTo(
          card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -40 : 40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.section} id="journey">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Our Journey</span>
          <h2 className={styles.title}>Tracing Our Evolution</h2>
          <p className={styles.desc}>
            From a humble visionary concept to a leading multi-sector corporate brand, see how we have scaled our services over the years.
          </p>
        </div>

        {/* Timeline Path */}
        <div className={styles.timelinePath}>
          {/* Background vertical bar line */}
          <div className={styles.bgLine} />
          {/* Active progress bar line animated by GSAP */}
          <div ref={progressLineRef} className={styles.progressLine} />

          {/* Milestones */}
          {MILESTONES.map((milestone, index) => (
            <div
              key={milestone.year}
              ref={(el) => (milestoneRefs.current[index] = el)}
              className={`${styles.milestoneItem} ${
                index % 2 === 0 ? styles.leftSide : styles.rightSide
              }`}
            >
              {/* Timeline Center Node */}
              <div className={styles.nodeWrapper}>
                <div className={styles.dot} />
              </div>

              {/* Milestone Card */}
              <div className={styles.card}>
                <span className={styles.year}>{milestone.year}</span>
                <h3 className={styles.cardTitle}>{milestone.title}</h3>
                <p className={styles.cardDesc}>{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
