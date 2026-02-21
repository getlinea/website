"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const tooltipTween = { duration: 0.22, ease: "power2.out" as const };
const tooltipTweenOut = { duration: 0.15, ease: "power2.in" as const };

export default function VideoSection() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const videoZoomRef = useRef<HTMLDivElement>(null);
  const media2ZoomRef = useRef<HTMLDivElement>(null);
  const tooltipLineaRef = useRef<HTMLSpanElement>(null);
  const tooltipTaxRef = useRef<HTMLSpanElement>(null);
  const tooltipLedgerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const refs = [tooltipLineaRef, tooltipTaxRef, tooltipLedgerRef];
    refs.forEach((ref) => {
      if (ref.current) gsap.set(ref.current, { opacity: 0, scale: 0.95, y: 8, x: "-50%" });
    });
  }, []);

  const showTooltip = (ref: React.RefObject<HTMLSpanElement | null>) => {
    if (ref.current) gsap.to(ref.current, { opacity: 1, scale: 1, y: 0, x: "-50%", ...tooltipTween, overwrite: true });
  };
  const hideTooltip = (ref: React.RefObject<HTMLSpanElement | null>) => {
    if (ref.current) gsap.to(ref.current, { opacity: 0, scale: 0.95, y: 8, x: "-50%", ...tooltipTweenOut, overwrite: true });
  };

  useGSAP(() => {
    if (!pinSectionRef.current || !media2ZoomRef.current || !videoZoomRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isTablet: "(min-width: 768px) and (max-width: 1023px)",
      isMobile: "(max-width: 767px)",
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };

      // Set initial state for zoom-in effect
      // Increased initial scale for mobile to provide better visual hint
      gsap.set(videoZoomRef.current, { scale: isMobile ? 0.95 : 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(videoZoomRef.current, {
        scale: 1,
        duration: 1,
        ease: "none",
      }, 0);

      tl.to(media2ZoomRef.current, {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        borderRadius: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }, 0.5);

      const otherMedia = videoZoomRef.current?.querySelectorAll(".floating-media:not(.media-2)");
      if (otherMedia) {
        tl.to(otherMedia, {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: "power2.inOut",
        }, 0.5);
      }

      tl.to(".zoom-text", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.inOut",
      }, 0.2);
    });

    return () => mm.revert();
  }, { scope: pinSectionRef });

  return (
    <div ref={pinSectionRef} className="relative h-screen w-full max-w-[100vw] min-w-0 overflow-hidden bg-background">
      <div ref={videoZoomRef} className="absolute inset-0 w-full h-full">
        <div className="floating-media absolute top-[18%] left-[5%] sm:left-[6%] md:left-[8%] z-5 w-24 h-20 sm:w-32 sm:h-24 md:w-44 md:h-32 lg:w-52 lg:h-36 rounded-xl border border-border bg-background/80 backdrop-blur-sm shadow-sm flex flex-col p-2 sm:p-3 overflow-hidden">
          <div className="w-full h-8 sm:h-10 border-b border-border flex items-center justify-between pointer-events-none">
            <div className="w-16 sm:w-20 md:w-24 h-2 sm:h-3 rounded-full bg-muted"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-muted/50"></div>
          </div>
          <div className="flex-1 w-full flex flex-col justify-end gap-1 sm:gap-2 mt-2">
            <div className="w-3/4 h-1 sm:h-2 rounded-full bg-muted/30"></div>
            <div className="w-1/2 h-1 sm:h-2 rounded-full bg-muted/30"></div>
            <div className="w-full h-1 sm:h-2 rounded-full bg-muted/30"></div>
          </div>
        </div>
        <div className="floating-media absolute top-[50%] left-[5%] sm:left-[8%] md:left-[12%] z-5 w-20 h-16 sm:w-32 sm:h-24 md:w-40 md:h-28 lg:w-48 lg:h-32 rounded-xl border border-border bg-background/80 backdrop-blur-sm shadow-sm flex flex-col p-2 sm:p-3 overflow-hidden">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-green-500/10 text-green-500 flex items-center justify-center text-[10px]">+</div>
            <div className="w-12 sm:w-16 h-2 rounded-full bg-muted"></div>
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">Tokens: 2,450</div>
        </div>
        <div className="floating-media absolute top-[48%] right-[5%] sm:right-[6%] md:right-[10%] z-5 w-28 h-20 sm:w-40 sm:h-28 md:w-56 md:h-36 lg:w-64 lg:h-44 rounded-xl border border-border bg-background/80 backdrop-blur-sm shadow-sm flex flex-col p-3 sm:p-4">
          <div className="w-full h-1/2 flex items-end gap-1 sm:gap-2 pb-2 border-b border-border">
            <div className="w-1/5 h-[30%] bg-muted rounded-t-sm"></div>
            <div className="w-1/5 h-[60%] bg-muted rounded-t-sm"></div>
            <div className="w-1/5 h-[45%] bg-primary/40 rounded-t-sm"></div>
            <div className="w-1/5 h-[80%] bg-primary rounded-t-sm"></div>
            <div className="w-1/5 h-[65%] bg-muted rounded-t-sm"></div>
          </div>
          <div className="flex-1 w-full flex items-center justify-between pt-2">
            <div className="w-1/3 h-2 rounded-full bg-muted"></div>
            <div className="w-1/4 h-2 rounded-full bg-muted"></div>
          </div>
        </div>
        <div className="floating-media absolute bottom-[10%] left-[12%] sm:left-[15%] md:left-[20%] z-5 w-24 h-16 sm:w-36 sm:h-24 md:w-48 md:h-32 lg:w-52 lg:h-36 rounded-xl border border-border bg-background/80 backdrop-blur-sm shadow-sm flex flex-col p-2 sm:p-3 overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted text-[10px] flex items-center justify-center">AI</div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="w-2/3 h-2 rounded-full bg-muted"></div>
              <div className="w-1/2 h-1.5 rounded-full bg-muted/50"></div>
            </div>
          </div>
          <div className="w-full h-12 sm:h-16 rounded-md bg-muted/20 border border-muted/50 mt-1"></div>
        </div>
        <div className="floating-media absolute bottom-[10%] right-[12%] sm:right-[15%] md:right-[24%] z-5 w-24 h-18 sm:w-36 sm:h-24 md:w-48 md:h-28 lg:w-52 lg:h-32 rounded-xl border border-border bg-background/80 backdrop-blur-sm shadow-sm flex flex-col p-2 sm:p-3 overflow-hidden">
          <div className="w-full flex justify-between items-center mb-2">
            <div className="w-16 sm:w-20 h-2 bg-muted rounded-full"></div>
            <div className="w-8 sm:w-10 h-3 bg-indigo-500/20 text-indigo-500 rounded-sm text-[8px] flex items-center justify-center">Approval Gate</div>
          </div>
          <div className="space-y-1.5 sm:space-y-2 mt-2">
            <div className="w-full h-1.5 sm:h-2 bg-muted/40 rounded-full"></div>
            <div className="w-5/6 h-1.5 sm:h-2 bg-muted/40 rounded-full"></div>
            <div className="w-4/6 h-1.5 sm:h-2 bg-muted/40 rounded-full"></div>
          </div>
        </div>
        <div className="floating-media absolute bottom-[14%] right-[32%] sm:right-[35%] md:right-[45%] z-5 w-24 h-16 sm:w-36 sm:h-24 md:w-48 md:h-28 lg:w-52 lg:h-32 rounded-xl border border-border bg-background/80 backdrop-blur-sm shadow-sm flex flex-col p-2 sm:p-3 overflow-hidden justify-between">
          <div className="w-full flex justify-between mb-1">
            <div className="w-10 h-10 rounded-md bg-muted"></div>
            <div className="w-10 h-10 rounded-md bg-muted/50"></div>
            <div className="w-10 h-10 rounded-md bg-muted/20"></div>
          </div>
          <div className="w-full h-2 rounded-full bg-primary/20 overflow-hidden"><div className="h-full w-2/3 bg-primary"></div></div>
        </div>
        <div className="floating-media absolute top-[12%] left-[32%] sm:left-[35%] md:left-[40%] z-5 w-24 h-16 sm:w-36 sm:h-24 md:w-48 md:h-28 lg:w-52 lg:h-32 rounded-xl border border-border bg-background/80 backdrop-blur-sm shadow-sm flex flex-col p-2 sm:p-3 overflow-hidden">
          <div className="w-full flex gap-2 sm:gap-3 items-center mb-2 sm:mb-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 text-blue-500 text-[10px] flex items-center justify-center">?</div>
            <div className="w-20 sm:w-24 h-2 bg-muted rounded-full"></div>
          </div>
          <div className="w-full p-2 bg-muted/20 border border-muted/50 rounded-md flex-1"></div>
        </div>

        <div
          ref={media2ZoomRef}
          className="floating-media media-2 absolute top-[25%] right-[4%] w-36 h-28 sm:top-[18%] sm:right-[3%] sm:w-36 sm:h-24 md:right-[10%] md:w-48 md:h-32 lg:right-[15%] lg:w-60 lg:h-40 rounded-xl border border-border bg-background flex flex-col items-center justify-center text-foreground p-3 sm:p-4 md:p-6 overflow-hidden z-20 shadow-xl"
        >
          <div className="w-full h-full border border-border/50 rounded-lg p-3 sm:p-4 flex flex-col bg-muted/10 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 sm:w-20 h-16 sm:h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -left-4 -bottom-4 w-16 sm:w-20 h-16 sm:h-20 bg-blue-500/10 rounded-full blur-xl"></div>

            <div className="flex justify-between items-center mb-2 sm:mb-4 relative z-10 w-full">
              <div className="text-[10px] sm:text-xs md:text-sm font-semibold">Activity</div>
              <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-primary/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary"></div></div>
            </div>

            <div className="flex-1 w-full space-y-2 sm:space-y-3 relative z-10">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-muted border border-border"></div>
                  <div className="flex flex-col gap-1">
                    <div className="w-16 sm:w-20 h-1.5 sm:h-2 bg-muted-foreground/30 rounded-full"></div>
                    <div className="w-10 sm:w-12 h-1.5 sm:h-2 bg-muted-foreground/20 rounded-full"></div>
                  </div>
                </div>
                <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-muted-foreground/30 rounded-full"></div>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-muted border border-border"></div>
                  <div className="flex flex-col gap-1">
                    <div className="w-14 sm:w-16 h-1.5 sm:h-2 bg-muted-foreground/30 rounded-full"></div>
                    <div className="w-12 sm:w-14 h-1.5 sm:h-2 bg-muted-foreground/20 rounded-full"></div>
                  </div>
                </div>
                <div className="w-10 sm:w-14 h-1.5 sm:h-2 bg-muted-foreground/30 rounded-full text-green-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="zoom-text absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-foreground text-[10px] leading-relaxed sm:text-xs sm:leading-relaxed md:text-sm md:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed max-w-[280px] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl text-center pointer-events-auto"
        >
          <span
            className="relative inline-block font-semibold underline cursor-help"
            onMouseEnter={() => showTooltip(tooltipLineaRef)}
            onMouseLeave={() => hideTooltip(tooltipLineaRef)}
          >
            Linea
            <span
              ref={tooltipLineaRef}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none origin-bottom"
            >
              <Image src="/assets/linea-light.svg" alt="" width={160} height={160} className="w-28 sm:w-40 h-auto max-w-[90vw] rounded-lg border border-white/20 shadow-xl bg-black/80 object-contain" />
            </span>
          </span>{" "}
          is an advanced, visual no-code platform that empowers you to build, test, and deploy sophisticated{" "}
          <span
            className="relative inline-block font-semibold underline cursor-help"
            onMouseEnter={() => showTooltip(tooltipTaxRef)}
            onMouseLeave={() => hideTooltip(tooltipTaxRef)}
          >
            AI agent workflows
            <span
              ref={tooltipTaxRef}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none origin-bottom"
            >
              <Image src="/assets/hero.webp" alt="AI agent workflows" width={224} height={126} className="w-48 sm:w-56 h-auto max-w-[90vw] rounded-lg border border-white/20 shadow-xl bg-black/80 object-cover aspect-video" />
            </span>
          </span>{" "}
          effortlessly. Built around a universal MCP architecture and leveraging state-of-the-art LLMs, it allows anyone to design complex automated pipelines by dynamically connecting{" "}
          <span
            className="relative inline-block font-semibold underline cursor-help"
            onMouseEnter={() => showTooltip(tooltipLedgerRef)}
            onMouseLeave={() => hideTooltip(tooltipLedgerRef)}
          >
            any MCP server
            <span
              ref={tooltipLedgerRef}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none origin-bottom"
            >
              <Image src="/assets/hero.webp" alt="MCP Server Integration" width={224} height={126} className="w-48 sm:w-56 h-auto max-w-[90vw] rounded-lg border border-white/20 shadow-xl bg-black/80 object-cover aspect-video" />
            </span>
          </span>
          {" "}through an intuitive drag-and-drop canvas.
        </motion.p>
      </div>
    </div>
  );
}