"use client";

import { useEffect, useRef, useState } from "react";

export default function AuraMemorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 = fully white/out, 1 = fully dark/in

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Start transition when top hits bottom of viewport, finish when centered
      const start = windowH;
      const end = windowH * 0.2;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // bg: white → near-black
  const bgL = Math.round(255 - progress * 245);
  const bgColor = `rgb(${bgL},${bgL},${Math.round(bgL * 0.97)})`;

  // text opacity & transform
  const textOpacity = Math.max(0, (progress - 0.3) / 0.7);
  const titleY = (1 - Math.min(1, Math.max(0, (progress - 0.2) / 0.8))) * 80;
  const bodyY  = (1 - Math.min(1, Math.max(0, (progress - 0.35) / 0.65))) * 60;

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        minHeight: "100vh",
        background: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.05s linear",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* background image — fades in with progress */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/home/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: progress * 0.55,
          transition: "opacity 0.05s linear",
        }}
      />

      {/* wavy bottom clip mask */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "#fefee8",
          clipPath: "ellipse(55% 100% at 50% 100%)",
          zIndex: 3,
          opacity: progress < 0.95 ? 0 : (progress - 0.95) / 0.05,
          transition: "opacity 0.1s",
        }}
      />

      {/* centered content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 clamp(24px, 8%, 160px)",
          maxWidth: 900,
          width: "100%",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-editorial, serif)",
            fontWeight: 300,
            fontSize: "clamp(36px, 7vw, 96px)",
            color: "#fff",
            letterSpacing: "0.1em",
            lineHeight: 1,
            margin: "0 0 clamp(20px, 3vw, 36px)",
            textTransform: "uppercase",
            opacity: textOpacity,
            transform: `translateY(${titleY}px)`,
            transition: "opacity 0.05s linear, transform 0.05s linear",
          }}
        >
          AURA + MEMORY
        </h2>

        <p
          style={{
            fontFamily: "var(--font-neue-light, sans-serif)",
            fontSize: "clamp(14px, 1.4vw, 18px)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.72)",
            maxWidth: 580,
            margin: "0 auto",
            opacity: textOpacity,
            transform: `translateY(${bodyY}px)`,
            transition: "opacity 0.05s linear, transform 0.05s linear",
          }}
        >
          Blending artistic vision with emotional storytelling, House of Bliss
          stands at the forefront of modern wedding documentation. For over ten
          years, their lens has captured not just moments, but memories -
          preserving love stories in frames that last forever.
        </p>
      </div>
    </section>
  );
}