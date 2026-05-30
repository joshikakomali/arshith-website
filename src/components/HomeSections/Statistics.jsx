import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Statistics.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    id: 1,
    target: 7,
    suffix: "+",
    label: "Years of Growth",
    desc: "Forging sustainable pathways in commerce, IT, and administrative management.",
  },
  {
    id: 2,
    target: 100,
    suffix: "+",
    label: "Projects Completed",
    desc: "Providing customized digital infrastructures and scalable hardware/software solutions.",
  },
  {
    id: 3,
    target: 30,
    suffix: "K+",
    label: "Happy Clients",
    desc: "Empowering consumer trust, digitized cargo routing, and fresh food supply lines.",
  },
  {
    id: 4,
    target: 10,
    suffix: "+",
    label: "Business Divisions",
    desc: "Integrated solutions across e-commerce, hosting, marketing, and corporate auditing.",
  },
];

export default function Statistics() {
  const containerRef = useScrollReveal();
  const elementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el, index) => {
        if (!el) return;
        const stat = STATS[index];
        const numEl = el.querySelector(`.${styles.num}`);
        const countObj = { val: 0 };

        gsap.to(countObj, {
          val: stat.target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (numEl) {
              numEl.innerText = Math.floor(countObj.val);
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.glow} />
      <div className={styles.container}>
        
        {/* Statistics Grid */}
        <div className={styles.grid}>
          {STATS.map((stat, index) => (
            <div
              key={stat.id}
              ref={(el) => (elementsRef.current[index] = el)}
              className={`${styles.statCard} gsap-reveal`}
              data-delay={index * 0.1}
            >
              <div className={styles.numberWrapper}>
                <span className={styles.num}>0</span>
                <span className={styles.suffix}>{stat.suffix}</span>
              </div>
              <h4 className={styles.label}>{stat.label}</h4>
              <p className={styles.desc}>{stat.desc}</p>
              <div className={styles.cardLine} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
