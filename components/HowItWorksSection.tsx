"use client";

import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DisplayCards from "./ui/display-cards";
import { CreditCard, Building2, Wallet, FileCheck, FileText, Scale } from "lucide-react";
import DottedMap from "dotted-map";
import { AIInputWithSuggestions } from "./ui/ai-input-with-suggestions";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create dotted map
  const mapData = useMemo(() => {
    const map = new DottedMap({ height: 60, grid: "diagonal" });
    map.addPin({ lat: 40.7128, lng: -74.0060, svgOptions: { color: "#3b82f6", radius: 0.4 } });
    map.addPin({ lat: 51.5074, lng: -0.1278, svgOptions: { color: "#3b82f6", radius: 0.4 } });
    map.addPin({ lat: 35.6762, lng: 139.6503, svgOptions: { color: "#3b82f6", radius: 0.4 } });
    map.addPin({ lat: 1.3521, lng: 103.8198, svgOptions: { color: "#3b82f6", radius: 0.4 } });
    map.addPin({ lat: 37.7749, lng: -122.4194, svgOptions: { color: "#3b82f6", radius: 0.4 } });
    map.addPin({ lat: -33.8688, lng: 151.2093, svgOptions: { color: "#3b82f6", radius: 0.4 } });
    return map.getSVG({ radius: 0.22, color: "#1e3a8a", shape: "circle", backgroundColor: "transparent" });
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isTablet: "(min-width: 768px) and (max-width: 1023px)",
      isMobile: "(max-width: 767px)",
    }, () => {
      const cards = gsap.utils.toArray(".feature-stack-card") as HTMLElement[];

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top ${100 + i * 40}px`,
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.95 - (cards.length - 1 - i) * 0.02,
            opacity: 0.8,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: `top ${100 + (i + 1) * 40}px`,
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            }
          });
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const visual1 = (
    <div className="p-3 sm:p-4 md:p-5 lg:p-8 h-full flex flex-col items-start justify-start">
      <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-800 mb-1 sm:mb-1.5 md:mb-2 text-center w-full">
          Universal Connectors
        </h4>
        <p className="text-slate-500 text-center text-[10px] sm:text-xs md:text-sm w-full">
          Connect your custom MCP servers instantly
        </p>
      </div>
      <div className="w-full flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-12 scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100">
        <DisplayCards
          cards={[
            {
              icon: <Building2 className="size-4 text-zinc-400" />,
              title: "Github MCP",
              description: "Repository Access",
              date: "Connected",
              className: "[grid-area:stack] z-10 -translate-x-8 translate-y-4 hover:-translate-y-16 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] group-hover:before:opacity-0 before:transition-opacity before:duration-300 group-hover:grayscale-0 before:left-0 before:top-0 before:pointer-events-none",
            },
            {
              icon: <CreditCard className="size-4 text-zinc-400" />,
              title: "Slack MCP",
              description: "Channel Messaging",
              date: "Syncing",
              className: "[grid-area:stack] z-20 translate-x-6 translate-y-16 hover:-translate-y-6 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] group-hover:before:opacity-0 before:transition-opacity before:duration-300 group-hover:grayscale-0 before:left-0 before:top-0 before:pointer-events-none",
            },
            {
              icon: <Wallet className="size-4 text-zinc-400" />,
              title: "Notion MCP",
              description: "Knowledge Base",
              date: "Ready",
              className: "[grid-area:stack] z-30 translate-x-20 translate-y-28 hover:translate-y-4",
            },
          ]}
        />
      </div>
    </div>
  );

  const visual2 = (
    <div className="p-3 sm:p-4 md:p-5 lg:p-8 h-full flex flex-col items-center justify-center">
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-800 mb-1 sm:mb-1.5 md:mb-2 text-center">
          Agentic Orchestration
        </h4>
        <p className="text-slate-500 text-center text-[10px] sm:text-xs md:text-sm max-w-sm mb-3 sm:mb-4 md:mb-6 lg:mb-8">
          Multi-step LLM reasoning working 24/7
        </p>
      </div>
      <div className="w-full max-w-2xl opacity-60 hover:opacity-100 transition-opacity duration-500 scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100">
        <div
          className="w-full h-auto [&_svg]:w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: mapData }}
        />
      </div>
      <p className="text-slate-400 text-xs mt-4 text-center">
        Orchestrating agent workflows globally in real-time
      </p>
    </div>
  );

  const visual3 = (
    <div className="p-3 sm:p-4 md:p-5 lg:p-8 h-full flex flex-col items-center justify-center">
      <div className="mb-2 sm:mb-3 md:mb-4">
        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-800 mb-1 sm:mb-1.5 md:mb-2 text-center">
          Human-in-the-Loop
        </h4>
        <p className="text-slate-500 text-center text-[10px] sm:text-xs md:text-sm max-w-sm mb-2 sm:mb-3 md:mb-4">
          Oversight gates for critical workflow execution
        </p>
      </div>
      <div className="w-full scale-[0.85] sm:scale-90 md:scale-95 lg:scale-100">
        <div className="w-full bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl p-2 sm:p-4">
          <AIInputWithSuggestions
            placeholder="Enter agent instruction..."
            minHeight={64}
            maxHeight={150}
            actions={[
              {
                text: "Review PR Comments",
                icon: FileCheck,
                colors: { icon: "text-slate-600", border: "border-slate-300", bg: "bg-white" },
              },
              {
                text: "Approve Broadcast",
                icon: FileText,
                colors: { icon: "text-slate-600", border: "border-slate-300", bg: "bg-white" },
              },
              {
                text: "Verify Automation",
                icon: Scale,
                colors: { icon: "text-slate-600", border: "border-slate-300", bg: "bg-white" },
              },
            ]}
            onSubmit={(text, action) => console.log("Submitted:", { text, action })}
            className="w-full py-2"
          />
        </div>
      </div>
    </div>
  );

  const steps = [
    {
      num: "01",
      title: "Connect Any Tool",
      desc: "Seamlessly connect any custom or community MCP server to your workflows.",
      visual: visual1,
    },
    {
      num: "02",
      title: "Multi-Step AI Orchestration",
      desc: "Chain together LLM reasoning steps with universal connectors and sandboxed code.",
      visual: visual2,
    },
    {
      num: "03",
      title: "Embedded AI Capabilities",
      desc: "Run your customized agent workflows dynamically via APIs or schedules.",
      visual: visual3,
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-background w-full pb-32">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 md:mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Building agentic workflows in 3 simple steps
          </p>
        </motion.div>

        <div className="relative w-full flex flex-col gap-6 sm:gap-8 rounded-3xl pb-[50vh]">
          {steps.map((step, i) => (
            <div
              key={i}
              className="feature-stack-card w-full h-[60vh] sm:h-[70vh] max-h-[600px] flex flex-col md:flex-row bg-white/50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl shadow-black/5 rounded-[2rem] overflow-hidden backdrop-blur-3xl transform-gpu origin-top"
              style={{ zIndex: i + 1 }}
            >
              <div className="w-full md:w-[45%] lg:w-[40%] p-8 sm:p-12 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 sm:mb-8">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="w-full md:w-[55%] lg:w-[60%] relative flex-1 bg-slate-50/50 dark:bg-zinc-950/50 flex items-center justify-center overflow-hidden h-full min-h-[50%]">
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
