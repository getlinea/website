"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const STAGGER_DURATION = 0.03;
const BASE_DURATION = 0.35;
const Y_OFFSET = 14;

type AnimatedTextProps = {
  children: string;
  className?: string;
};

export default function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const letters = Array.from(children);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap || letters.length === 0) return;

      const letterEls = wrap.querySelectorAll<HTMLSpanElement>("[data-animated-letter]");

      const onEnter = () => {
        gsap.fromTo(
          letterEls,
          { y: Y_OFFSET, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: BASE_DURATION,
            stagger: STAGGER_DURATION,
            ease: "power2.out",
            overwrite: true,
          }
        );
      };

      wrap.addEventListener("mouseenter", onEnter);
      return () => wrap.removeEventListener("mouseenter", onEnter);
    },
    { scope: wrapRef, dependencies: [children] }
  );

  return (
    <span
      ref={wrapRef}
      className={`inline-flex overflow-hidden cursor-pointer ${className}`.trim()}
    >
      {letters.map((char, i) => (
        <span
          key={i}
          data-animated-letter
          className="inline-block whitespace-pre"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
