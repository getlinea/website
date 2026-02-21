"use client";

import React from "react";
import Star1 from "./stars/star1";
import Star2 from "./stars/star2";
import Star3 from "./stars/star3";
import Star4 from "./stars/star4";
import Star5 from "./stars/star5";

const StarMarquee = () => {
  const MarqueeItem = () => (
    <div className="flex items-center gap-4 px-4 shrink-0">
      <span className="text-[10px] md:text-xs text-black uppercase">
        Linea is the universal platform for AI agent workflows
      </span>
      <Star1 size={10} color="#3b82f6" /> {/* Blue */}
      <span className="text-[10px] md:text-xs text-black uppercase">
        Connect and orchestrate any MCP server instantly
      </span>
      <Star2 size={10} color="#f59e0b" /> {/* Amber */}
      <span className="text-[10px] md:text-xs text-black uppercase">
        Build dynamic automated pipelines with state-of-the-art LLMs
      </span>
      <Star3 size={12} color="#ec4899" /> {/* Pink */}
      <span className="text-[10px] md:text-xs text-black uppercase">
        Real-time reasoning and execution for complex tasks
      </span>
      <Star4 size={10} color="#10b981" /> {/* Emerald */}
      <span className="text-[10px] md:text-xs text-black uppercase">
        Join the future of agentic automation today
      </span>
      <Star5 size={10} color="#8b5cf6" /> {/* Violet */}
    </div>
  );

  return (
    <div className="relative h-6 w-full max-w-[100vw] bg-[#fdfdfdde] shadow-md shadow-[#0000001a] flex items-center overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee" style={{ willChange: "transform" }}>
        {/* Render enough items to cover the screen and ensure seamless loop */}
        <div className="flex items-center">
          {[...Array(4)].map((_, i) => (
            <MarqueeItem key={i} />
          ))}
        </div>
        <div className="flex items-center">
          {[...Array(4)].map((_, i) => (
            <MarqueeItem key={i + 4} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarMarquee;
