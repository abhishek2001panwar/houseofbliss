'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden">

      {/* Low-quality placeholder blur — shows instantly while full image loads */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "#1a1612",
          transition: "opacity 0.6s ease",
          opacity: loaded ? 0 : 1,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
        height={1000}
        width={1200}
          src="/cover.JPEG"
          alt="Hero background"
          fetchPriority="high"   
          loading="eager"       
onLoadingComplete={() => setLoaded(true)}
          className="w-full h-full object-cover"
          style={{
            objectPosition: "left center",
            transformOrigin: "left center",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            willChange: "transform",
          }}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.08) 0%,
              rgba(0,0,0,0.18) 50%,
              rgba(0,0,0,0.55) 100%
            ),
            linear-gradient(
              to left,
              rgba(10,8,5,0.82) 0%,
              rgba(10,8,5,0.60) 30%,
              rgba(10,8,5,0.18) 60%,
              rgba(0,0,0,0.00) 100%
            )
          `,
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      {/* Text block */}
      <div className="absolute z-20 inset-0 flex items-end justify-end">
        <div className="w-full md:w-[62%] lg:w-[54%] px-6 pb-12 md:px-14 md:pb-16 lg:px-20 lg:pb-20 flex flex-col items-start md:items-end text-left md:text-right">

          <p
            className="text-[10px] uppercase tracking-[0.38em] mb-5 opacity-0 animate-hero-fade"
            style={{
              color: "rgba(253,245,210,0.50)",
              animationDelay: "0.2s",
              animationFillMode: "forwards",
            }}
          >
            Cinematic Wedding Photography
          </p>

          <h1
            className="leading-[1.02] opacity-0 animate-hero-fade uppercase mb-6"
            style={{
              color: "#f5efd8",
              fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
              letterSpacing: "-0.025em",
              animationDelay: "0.45s",
              animationFillMode: "forwards",
              fontFamily: "var(--font-editorial, serif)",
              textShadow: "0 2px 32px rgba(0,0,0,0.38)",
            }}
          >
            Your Wedding, <br />
            A Story
            <em style={{ fontStyle: "italic", opacity: 0.85 }}> Unfolds.</em>
          </h1>

          <div
            className="opacity-0 animate-hero-fade"
            style={{ animationDelay: "0.75s", animationFillMode: "forwards" }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] border px-5 py-3 transition-all duration-500 hover:bg-white/8 hover:border-white/40 hover:tracking-[0.34em]"
              style={{
                color: "#fdf5d2",
                borderColor: "rgba(253,245,210,0.28)",
                fontFamily: "var(--font-neue-light, sans-serif)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              Tell us your story
              <svg
                width="13" height="13" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-500 group-hover:translate-x-1.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Hero;