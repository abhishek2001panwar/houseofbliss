"use client";

import { useEffect, useRef, useState } from "react";

// ── Easing ─────────────────────────────────────────────────────────────────────
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

export default function AuraMemorySection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 as section scrolls into view

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect    = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start   = windowH;
      const end     = windowH * 0.15;
      const raw     = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Derived values ────────────────────────────────────────────────────────
  const easedMain  = easeOutExpo(progress);
  const easedBg    = easeInOutQuart(progress);

  // Background: warm cream → near-black (#41453D tone)
  const bgL   = Math.round(244 - easedBg * 233);
  const bgG   = Math.round(241 - easedBg * 230);
  const bgB   = Math.round(229 - easedBg * 218);
  const bgColor = `rgb(${bgL},${bgG},${bgB})`;

  // Text reveal starts at progress > 0.25
  const textP  = Math.max(0, Math.min(1, (progress - 0.25) / 0.75));
  const textPE = easeOutExpo(textP);

  // ── Infinity symbol paths ─────────────────────────────────────────────────
  // SVG infinity "∞" drawn as two bezier loops, animated stroke-dashoffset
  const DASH_LEN = 900;
  const infP  = Math.max(0, Math.min(1, (progress - 0.05) / 0.7));
  const infPE = easeOutExpo(infP);
  const strokeDash   = DASH_LEN;
  const strokeOffset = DASH_LEN * (1 - infPE);

  // Scale / opacity for the infinity symbol
  const infScale   = 0.6 + 0.4 * infPE;
  const infOpacity = infP;

  // Word-by-word stagger for heading
  const words = ["AURA", "+", "MEMORY"];

  return (
    <>
      <style>{`
        @keyframes hob-word-in {
          from { opacity: 0; transform: translateY(60px) scaleY(1.15); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0)   scaleY(1);    filter: blur(0); }
        }
        @keyframes hob-body-in {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hob-line-in {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes hob-tag-in {
          from { opacity: 0; letter-spacing: 0.6em; }
          to   { opacity: 1; letter-spacing: 0.28em; }
        }
        @keyframes hob-stat-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .aura-word {
          display: inline-block;
          animation: hob-word-in 1.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .aura-body {
          animation: hob-body-in 1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .aura-tag {
          animation: hob-tag-in 1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .aura-rule {
          transform-origin: center;
          animation: hob-line-in 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        .aura-stat {
          animation: hob-stat-in 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          minHeight: "100vh",
          background: bgColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(48px, 10vh, 100px) clamp(20px, 6vw, 80px)",
          boxSizing: "border-box",
        }}
      >

        {/* ── Background image - fades in ── */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/aura.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: easedBg * 0.5,
        }} />

        {/* ── Multi-layer dark overlay ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `
            linear-gradient(to bottom, rgba(10,12,8,0.55) 0%, rgba(10,12,8,0.28) 40%, rgba(10,12,8,0.62) 100%),
            radial-gradient(ellipse at center, transparent 40%, rgba(5,6,4,0.45) 100%)
          `,
          opacity: easedBg,
        }} />

        {/* ── Grain texture ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "140px 140px",
          opacity: easedBg * 0.04,
        }} />

        {/* ── INFINITY SYMBOL - scroll-drawn SVG ── */}
        <div style={{
          position: "absolute",
          zIndex: 3,
          // center it, let it breathe
          top: "50%", left: "50%",
          transform: `translate(-50%, -50%) scale(${infScale})`,
          opacity: infOpacity,
          transition: "opacity 0.05s linear",
          pointerEvents: "none",
          width: "min(700px, 90vw)",
        }}>
          <svg
            viewBox="0 0 500 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <defs>
              <linearGradient id="inf-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="rgba(253,249,220,0.0)" />
                <stop offset="30%"  stopColor="rgba(253,249,220,0.55)" />
                <stop offset="70%"  stopColor="rgba(253,249,220,0.55)" />
                <stop offset="100%" stopColor="rgba(253,249,220,0.0)" />
              </linearGradient>
            </defs>

            {/* faint full path */}
            <path
              d="M250,100 C250,100 220,40 160,40 C100,40 60,70 60,100 C60,130 100,160 160,160 C220,160 250,100 250,100 C250,100 280,40 340,40 C400,40 440,70 440,100 C440,130 400,160 340,160 C280,160 250,100 250,100 Z"
              stroke="rgba(253,249,220,0.08)"
              strokeWidth="1"
            />

            {/* animated stroke */}
            <path
              d="M250,100 C250,100 220,40 160,40 C100,40 60,70 60,100 C60,130 100,160 160,160 C220,160 250,100 250,100 C250,100 280,40 340,40 C400,40 440,70 440,100 C440,130 400,160 340,160 C280,160 250,100 250,100 Z"
              stroke="url(#inf-grad)"
              strokeWidth="1.5"
              strokeDasharray={strokeDash}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />

            {/* glowing dot that rides the path end */}
            {infP > 0.05 && infP < 0.98 && (
              <circle r="3" fill="rgba(253,249,220,0.9)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M250,100 C250,100 220,40 160,40 C100,40 60,70 60,100 C60,130 100,160 160,160 C220,160 250,100 250,100 C250,100 280,40 340,40 C400,40 440,70 440,100 C440,130 400,160 340,160 C280,160 250,100 250,100 Z"
                />
              </circle>
            )}
          </svg>
        </div>

        {/* ── Content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "min(860px, 100%)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        

          {/* Heading - word by word */}
          <h2
            style={{
              fontFamily: "var(--font-editorial, Georgia, serif)",
              fontWeight: 300,
              fontSize: "clamp(36px, 9vw, 108px)",
              color: "#fdf9dc",
              letterSpacing: "0.08em",
              lineHeight: 0.95,
              margin: "0 0 clamp(12px, 2.5vh, 20px)",
              textTransform: "uppercase",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 0.25em",
            }}
          >
            {textP > 0 && words.map((word, i) => (
              <span
                key={word}
                className="aura-word"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {word}
              </span>
            ))}
          </h2>

          {/* Rule */}
          {textP > 0 && (
            <div
              className="aura-rule"
              style={{
                height: 1,
                width: "clamp(32px, 5vw, 64px)",
                background: "rgba(253,249,220,0.3)",
                marginBottom: "clamp(16px, 3vh, 28px)",
                animationDelay: "0.4s",
              }}
            />
          )}

          {/* Body copy */}
          {textP > 0 && (
            <p
              className="aura-body"
              style={{
                fontFamily: "var(--font-neue-light, sans-serif)",
                fontSize: "clamp(13px, 1.6vw, 17px)",
                lineHeight: 1.85,
                color: "rgba(253,249,220,0.65)",
                maxWidth: "min(560px, 90vw)",
                margin: "10px 0 clamp(28px, 5vh, 52px)",
                animationDelay: "0.44s",
              }}
            >
              Blending artistic vision with emotional storytelling, House of Bliss
              stands at the forefront of modern wedding documentation. For over ten
              years, our lens has captured not just moments, but memories -
              preserving love stories in frames that last forever.
            </p>
          )}

         
        </div>

        {/* ── Corner accents ── */}
        {(['tl','tr','bl','br'] as const).map(pos => {
          const isTop  = pos[0] === 't';
          const isLeft = pos[1] === 'l';
          return (
            <div key={pos} style={{
              position: "absolute",
              [isTop  ? 'top'    : 'bottom']: 24,
              [isLeft ? 'left'   : 'right' ]: 24,
              width: 20, height: 20,
              borderTop:    isTop  ? '1px solid rgba(253,249,220,0.28)' : 'none',
              borderBottom: !isTop ? '1px solid rgba(253,249,220,0.28)' : 'none',
              borderLeft:   isLeft ? '1px solid rgba(253,249,220,0.28)' : 'none',
              borderRight:  !isLeft? '1px solid rgba(253,249,220,0.28)' : 'none',
              zIndex: 10,
              opacity: textPE * 0.7,
              transition: "opacity 0.05s linear",
            }} />
          );
        })}

        {/* ── Wavy bottom clip to next section ── */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 100,
          background: "#fefee8",
          clipPath: "ellipse(55% 100% at 50% 100%)",
          zIndex: 4,
          opacity: progress < 0.9 ? 0 : (progress - 0.9) / 0.1,
        }} />
      </section>
    </>
  );
}