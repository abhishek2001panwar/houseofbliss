"use client";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BLOGS } from "@/lib/data";
import Navbar from "../components/navbar";

// ── Breakpoint hook ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

// ── Single card ───────────────────────────────────────────────────────────────
function BlogCard({ item }: { item: (typeof BLOGS)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          aspectRatio: "4 / 3",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <Image width={1200} height={1300} src={item.img}
          alt={item.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${hovered ? 1.05 : 1.0})`,
            transition: "transform 0.9s cubic-bezier(.25,.46,.45,.94)",
            willChange: "transform",
          }}
        />
        {/* subtle bottom fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.28) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <h3
          style={{
            margin: 0,
            fontWeight: 300,
            fontSize: "clamp(14px, 1.4vw, 19px)",
            color: "#2C2B27",
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
            fontFamily: "var(--font-editorial, serif)",
          }}
        >
          {item.title}
        </h3>

        <Link
          href={`/blogs/${item.id}`}
          style={{
            marginTop: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(44,43,39,0.45)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#2C2B27"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(44,43,39,0.45)"; }}
        >
          Read more
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function OurBlogs() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <>
      <Navbar theme="dark" />
      <section
        style={{
          background: "#F4F1E5",
          minHeight: "100vh",
          padding: isMobile ? "48px 5% 80px" : isTablet ? "60px 5% 100px" : "60px 6% 120px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* grain overlay */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: 0.07,
            zIndex: 0,
          }}
        >
          <filter id="grain-blogs">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-blogs)" />
        </svg>

        <div className="pt-20 md:pt-28" style={{ position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: isMobile ? 20 : 40,
              marginBottom: isMobile ? 32 : 56,
            }}
          >
            <h2
              style={{
                fontWeight: 300,
                fontSize: isMobile ? "clamp(30px,10vw,42px)" : "clamp(34px,5vw,64px)",
                color: "#2C2B27",
                margin: 0,
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                fontFamily: "var(--font-editorial, serif)",
                flexShrink: 0,
              }}
            >
              Our Blogs
            </h2>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(44,43,39,0.14)",
                marginBottom: isMobile ? 6 : 10,
              }}
            />
          </div>

          {/* White panel wrapping the grid */}
          <div
           
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: "1px",
                background: "rgba(44,43,39,0.08)", // gap color between cards
              }}
            >
              {BLOGS.map((item) => (
                <BlogCard key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}