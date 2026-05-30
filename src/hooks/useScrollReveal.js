import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable React Hook to trigger premium GSAP ScrollTrigger reveals on elements.
 * Wrap your section with the returned ref and add the class "gsap-reveal"
 * (or custom class/tag specified in selector option) to elements inside.
 */
export default function useScrollReveal(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const selector = options.selector || ".gsap-reveal";
      const elements = container.querySelectorAll(selector);

      elements.forEach((el) => {
        const delay = parseFloat(el.getAttribute("data-delay")) || 0;
        const customY = el.getAttribute("data-y") !== null 
          ? parseFloat(el.getAttribute("data-y")) 
          : (options.yOffset !== undefined ? options.yOffset : 40);

        // Animation type: 'slide-up' (default), 'slide-left', 'slide-right', 'slide-down', 'fade', 'zoom'
        const anim = el.getAttribute("data-anim") || options.anim || "slide-up";
        const xOffset = options.xOffset !== undefined ? options.xOffset : 60;
        const fromVars = { opacity: 0 };
        const toVars = {
          opacity: 1,
          duration: options.duration || 1.2,
          delay: delay,
          ease: options.ease || "power3.out",
          scrollTrigger: {
            trigger: el,
            start: options.start || "top 88%",
            toggleActions: options.toggleActions || "play none none none",
          },
        };

        if (anim.includes("left")) {
          fromVars.x = -xOffset;
          fromVars.y = 0;
          toVars.x = 0;
        } else if (anim.includes("right")) {
          fromVars.x = xOffset;
          fromVars.y = 0;
          toVars.x = 0;
        } else if (anim.includes("down")) {
          fromVars.y = -customY;
          toVars.y = 0;
        } else if (anim.includes("fade")) {
          // keep only opacity change
        } else if (anim.includes("zoom")) {
          fromVars.scale = parseFloat(el.getAttribute("data-from-scale")) || 0.96;
          toVars.scale = 1;
        } else {
          // default: slide-up
          fromVars.y = customY;
          toVars.y = 0;
        }

        gsap.fromTo(el, fromVars, toVars);
      });
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run exactly once on mount

  return containerRef;
}
