"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BLOGS } from "@/lib/data";


// ── Parallax hook (disabled on mobile for perf) ──────────────────────────────
function useCardParallax(speed: number, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [ty, setTy] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let raf: number;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setTy(center * speed);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, enabled]);

  return { ref, ty: enabled ? ty : 0 };
}

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
function BlogCard({
  item,
  parallaxSpeed,
  pushDown,
  imgHeight,
  parallaxEnabled,
}: {
  item: (typeof BLOGS)[0];
  parallaxSpeed: number;
  pushDown: number;
  imgHeight: number;
  parallaxEnabled: boolean;
}) {
  const { ref, ty } = useCardParallax(parallaxSpeed, parallaxEnabled);
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ marginTop: parallaxEnabled ? pushDown : 0 }}>
      {/* image */}
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: imgHeight,
          cursor: "pointer",
        }}
      >
        <img
          src={item.img}
          alt={item.title}
          style={{
            position: "absolute",
            top: "-12%",
            left: 0,
            width: "100%",
            height: "124%",
            objectFit: "cover",
            transform: `translateY(${ty}px) scale(${hovered ? 1.05 : 1.0})`,
            transition: "transform 0.9s cubic-bezier(.25,.46,.45,.94)",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(15,22,15,0.52) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* text */}
      <div style={{ paddingTop: 18 }}>
        <h3
          style={{
            margin: "0 0 8px",
            fontFamily: "var(--font-editorial, serif)",
            fontWeight: 300,
            fontSize: "clamp(15px, 1.5vw, 21px)",
            color: "#e8e2cc",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {item.title}
        </h3>
        {/* <p
          style={{
            margin: "0 0 14px",
            fontFamily: "var(--font-neue-light, sans-serif)",
            fontSize: 12.5,
            lineHeight: 1.72,
            color: "rgba(232,226,204,0.52)",
          }}
        >
          {item.desc}
        </p> */}
        <Link
          href={`/blogs/${item.id}`}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-neue-regular, sans-serif)",
            fontSize: 14,
            letterSpacing: "0.03em",
            color: "rgba(232,226,204,0.7)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(232,226,204,0.28)",
            paddingBottom: 2,
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#e8e2cc";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(232,226,204,0.85)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color =
              "rgba(232,226,204,0.7)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(232,226,204,0.28)";
          }}
        >
          More info
        </Link>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function OurBlogs() {
  const bp = useBreakpoint();

  // Responsive config
  const isDesktop = bp === "desktop";
  const isTablet = bp === "tablet";
  const isMobile = bp === "mobile";

  // Layout config per breakpoint
  // Desktop: 4 cols, staggered pushes, parallax ON
  // Tablet:  2 cols, light stagger, parallax ON
  // Mobile:  1 col, no stagger, no parallax

  const desktopConfig = [
    { push: 0, h: 360, speed: 0.055 },
    { push: 80, h: 300, speed: 0.042 },
    { push: 80, h: 300, speed: 0.068 },
    { push: 150, h: 360, speed: 0.05 },
    { push: 150, h: 360, speed: 0.058 },
    { push: 80, h: 300, speed: 0.044 },
    { push: 80, h: 300, speed: 0.065 },
    { push: 0, h: 360, speed: 0.055 },
    { push: 80, h: 300, speed: 0.042 },
    { push: 80, h: 300, speed: 0.068 },
    { push: 150, h: 360, speed: 0.05 },
    { push: 150, h: 360, speed: 0.058 },
    { push: 80, h: 300, speed: 0.044 },
    { push: 80, h: 300, speed: 0.065 },
    { push: 0, h: 360, speed: 0.055 },
    { push: 80, h: 300, speed: 0.042 },
    { push: 80, h: 300, speed: 0.068 },
    { push: 150, h: 360, speed: 0.05 },
    { push: 150, h: 360, speed: 0.058 },
    { push: 80, h: 300, speed: 0.044 },
    { push: 80, h: 300, speed: 0.065 },
    { push: 0, h: 360, speed: 0.055 },
    { push: 80, h: 300, speed: 0.042 },
    { push: 80, h: 300, speed: 0.068 },
    { push: 150, h: 360, speed: 0.05 },
    { push: 150, h: 360, speed: 0.058 },
    { push: 80, h: 300, speed: 0.044 },
    { push: 80, h: 300, speed: 0.065 },
    { push: 0, h: 360, speed: 0.055 },
    { push: 80, h: 300, speed: 0.042 },
    { push: 80, h: 300, speed: 0.068 },
    { push: 150, h: 360, speed: 0.05 },
    { push: 150, h: 360, speed: 0.058 },
    { push: 80, h: 300, speed: 0.044 },
    { push: 80, h: 300, speed: 0.065 },
    { push: 0, h: 360, speed: 0.055 },
    { push: 80, h: 300, speed: 0.042 },
    { push: 80, h: 300, speed: 0.068 },
    { push: 150, h: 360, speed: 0.05 },
    { push: 150, h: 360, speed: 0.058 },
    { push: 80, h: 300, speed: 0.044 },
    { push: 80, h: 300, speed: 0.065 },

  ];

  const tabletConfig = [
    { push: 0, h: 280, speed: 0.04 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
    { push: 0, h: 280, speed: 0.035 },
    { push: 0, h: 280, speed: 0.045 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
     { push: 0, h: 280, speed: 0.04 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
    { push: 0, h: 280, speed: 0.035 },
    { push: 0, h: 280, speed: 0.045 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
     { push: 0, h: 280, speed: 0.04 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
    { push: 0, h: 280, speed: 0.035 },
    { push: 0, h: 280, speed: 0.045 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
     { push: 0, h: 280, speed: 0.04 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
    { push: 0, h: 280, speed: 0.035 },
    { push: 0, h: 280, speed: 0.045 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
     { push: 0, h: 280, speed: 0.04 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
    { push: 0, h: 280, speed: 0.035 },
    { push: 0, h: 280, speed: 0.045 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
     { push: 0, h: 280, speed: 0.04 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
    { push: 0, h: 280, speed: 0.035 },
    { push: 0, h: 280, speed: 0.045 },
    { push: 60, h: 240, speed: 0.03 },
    { push: 60, h: 240, speed: 0.05 },
  ];

  const mobileConfig = BLOGS.map(() => ({ push: 0, h: 220, speed: 0 }));

  const config = isDesktop
    ? desktopConfig
    : isTablet
      ? tabletConfig
      : mobileConfig;

  const gridStyle: React.CSSProperties = isDesktop
    ? {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "0 26px",
        alignItems: "start",
      }
    : isTablet
      ? {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0 20px",
          alignItems: "start",
        }
      : {
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "32px 0",
          alignItems: "start",
        };

  return (
    <section
      style={{
        background: "#3b4237",
        minHeight: "100vh",
        padding: isMobile
          ? "48px 5% 80px"
          : isTablet
            ? "60px 5% 100px"
            : "60px 6% 140px",
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
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-blogs)" />
      </svg>

      <div className="pt-32" style={{ position: "relative", zIndex: 1 }}>
        {/* title + rule */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: isMobile ? 20 : 40,
            marginBottom: isMobile ? 40 : 72,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 300,
              fontSize: isMobile
                ? "clamp(30px, 10vw, 42px)"
                : "clamp(34px, 5vw, 64px)",
              color: "#e8e2cc",
              margin: 0,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              flexShrink: 0,
            }}
          >
            Our Blogs
          </h2>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "rgba(232,226,204,0.14)",
              marginBottom: isMobile ? 6 : 10,
            }}
          />
        </div>

        {/* cards */}
        <div style={gridStyle}>
          {BLOGS.map((item, i) => (
            <BlogCard
              key={item.id}
              item={item}
              parallaxSpeed={config[i]?.speed ?? 0.05}
              pushDown={config[i]?.push ?? 0}
              imgHeight={config[i]?.h ?? 280}
              parallaxEnabled={!isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
