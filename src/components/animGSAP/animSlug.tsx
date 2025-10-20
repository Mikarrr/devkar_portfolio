"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const AnimSlug: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    new SplitType(".single-project-section-tittle h1", {
      types: "lines,words,chars",
      tagName: "span",
    });

    if (sectionRef.current) {
      gsap.from(`.single-project-section-tittle h1 .word`, {
        y: "100%",
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        stagger: 0.06,
      });

      gsap.from(
        ".single-project-section-category, .single-project-section-down, .single-project-section-img, .single-project-section-img-mockups",
        {
          y: "15%",
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          stagger: {
            each: 0.2,
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="single-project-section">
      {children}
    </section>
  );
};

export default AnimSlug;
