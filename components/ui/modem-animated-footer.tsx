"use client";
import React from "react";
import Link from "next/link";
import { NotepadTextDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="bg-background relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-3 sm:p-4 py-8 sm:py-10">
          <div className="flex flex-col mb-8 sm:mb-12 md:mb-16 lg:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-2xl sm:text-3xl font-bold">
                    {brandName}
                  </span>
                </div>
                <p className="text-muted-foreground font-semibold text-center w-full max-w-sm sm:max-w-md md:max-w-lg px-3 sm:px-4 md:px-0 text-sm sm:text-base">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-3 gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-muted-foreground max-w-full px-3 sm:px-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="hover:text-foreground duration-300 hover:font-semibold"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-3 sm:px-4 md:px-0">
            <p className="text-sm sm:text-base text-muted-foreground text-center md:text-left">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-300 hover:font-medium text-center"
                >
                  The universal platform for AI agents by <span className="font-semibold">{creatorName}</span>
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text - FIXED */}
        <div
          className="bg-linear-to-b from-zinc-800/20 via-zinc-800/10 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-32 sm:bottom-36 md:bottom-40 lg:bottom-32 font-extrabold tracking-tighter pointer-events-none select-none text-center px-3 sm:px-4"
          style={{
            fontSize: 'clamp(4.5rem, 15vw, 10rem)',
            maxWidth: '95vw'
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo */}
        <div className="absolute hover:border-zinc-700 duration-400 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] bottom-20 sm:bottom-22 md:bottom-24 lg:bottom-20 backdrop-blur-sm rounded-3xl bg-zinc-950/60 left-1/2 border-2 border-zinc-800 flex items-center justify-center p-2 sm:p-3 -translate-x-1/2 z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-linear-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center shadow-lg">
            {brandIcon || (
              <NotepadTextDashed className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 text-white drop-shadow-lg" />
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-28 sm:bottom-30 md:bottom-32 lg:bottom-34 backdrop-blur-sm h-1 bg-linear-to-r from-transparent via-zinc-800 to-transparent w-full left-1/2 -translate-x-1/2"></div>

        {/* Bottom shadow */}
        <div className="bg-linear-to-t from-background via-background/80 blur-[1em] to-background/40 absolute bottom-24 sm:bottom-26 md:bottom-28 w-full h-20 sm:h-24 pointer-events-none"></div>
      </footer>
    </section>
  );
};
