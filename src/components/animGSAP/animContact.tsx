"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const AnimContact: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (sectionRef.current) {
      new SplitType(".contact h1", {
        types: "lines,words,chars",
        tagName: "span",
      });

      gsap.from(".contact h1 .char", {
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".contact",
          start: "top 50%",
          once: true,
        },
      });

      gsap.from(".contact-down-inner", {
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".contact",
          start: "top 50%",
          once: true,
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="kontakt" className="contact">
      {children}
    </section>
  );
};

export default AnimContact;
