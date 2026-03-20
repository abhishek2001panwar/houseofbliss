"use client";

import { useEffect, useRef, useState } from "react";

interface BulletItem {
  title: string;
  desc: string;
}

interface ScrollStorySectionProps {
  tag: string;
  intro?: string;
  lines?: string[];
  bullets?: BulletItem[];
  closing?: string;
  accentColor?: string;
  textColor?: string;
}

// ── Colour-reveal animated line ───────────────────────────────────────────────
// Clips to overflow:hidden on the WRAPPER, the inner text slides up into view
function AnimatedLine({
  text,
  accentColor,
  textColor,
}: {
  text: string;
  accentColor: string;
  textColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0 = hidden, 1 = fully revealed

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // start animating when top of line hits 90% of viewport, done at 55%
      const val = Math.min(
        1,
        Math.max(0, (vh * 0.9 - rect.top) / (vh * 0.35))
      );
      setP(val);
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
  }, []);

  // Colour transition: starts as accentColor, transitions to textColor once p > 0.6
  const color = p < 0.6 ? accentColor : textColor;

  return (
    // outer ref used only for scroll position tracking - no overflow hidden here
    <div ref={ref} style={{ lineHeight: 1.3, marginBottom: "0.18em" }}>
      {/* clip wrapper - hides the line until it slides up */}
      <div style={{ overflow: "hidden" }}>
        <span
          style={{
            display: "block",
            transform: `translateY(${(1 - p) * 100}%)`,
            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            color,
            transition2: "color 0.4s ease",
          } as React.CSSProperties}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

// ── Fade + rise in (for bullets / paragraphs) ─────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const val = Math.min(1, Math.max(0, (vh * 0.88 - rect.top) / (vh * 0.3)));
      setP(val);
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
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 20}px)`,
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ScrollStorySection({
  tag,
  intro,
  lines,
  bullets,
  closing,
  accentColor = "#3b4237",
  textColor = "#1e1e1a",
}: ScrollStorySectionProps) {
  return (
    <div
      style={{
        padding: "clamp(52px, 5vh, 140px) 5%",
        background: "#F4F1E5",
      }}
    >
      {/* ── tag label ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: "clamp(24px, 4vh, 44px)",
        }}
      >
        <span
          style={{
            
            fontSize: 25,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#000000",
            opacity: "",
            fontWeight: 700,
            fontStyle: "bold",
            
          }}
        >
          {tag}
        </span>
        <div
          style={{
            width: 36,
            height: 1,
            background: accentColor,
            opacity: "",
          }}
        />
      </div>

      {/* ── Lines mode ── */}
      {lines && (
        <div
          style={{
            fontWeight: 100,
            // ← smaller than before, clearly body-ish size not heading
            fontSize: 18,
            letterSpacing: "-0.001em",
            // ← wide paragraph width
            maxWidth: "min(960px, 96%)",
            color: textColor,
            opacity: 0.7,
            
          }}
        >
          {lines.map((line, i) => (
            <AnimatedLine
              key={i}
              text={line}
              accentColor={accentColor}
              textColor={textColor}
            />
          ))}
        </div>
      )}

      {/* ── Bullets mode ── */}
      {bullets && (
        <div style={{ maxWidth: "min(960px, 90%)" }}>
          {intro && (
            <FadeIn>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.85,
                  color: textColor,
                  opacity: 0.68,
                  margin: "0 0 clamp(28px, 4.5vh, 48px)",
                }}
              >
                {intro}
              </p>
            </FadeIn>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px, 3vh, 34px)",
            }}
          >
            {bullets.map((item, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  {/* dot */}
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: 8,
                      display: "block",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: accentColor,
                      opacity: 0.6,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        margin: "0 0 5px",
                        fontWeight: 300,
                        fontSize: 20,
                        color: textColor,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 17,
                        lineHeight: 1.82,
                        color: textColor,
                        opacity: 0.5,
                        maxWidth: 680,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {closing && (
            <FadeIn delay={bullets.length * 60 + 60}>
              <p
                style={{
                  marginTop: "clamp(28px, 4.5vh, 48px)",
                  fontSize: 18,
                  lineHeight: 1.85,
                  color: textColor,
                  opacity: 0.68,
                }}
              >
                {closing}
              </p>
            </FadeIn>
          )}
        </div>
      )}

      {/* ── bottom rule ── */}
      {/* <div
        style={{
          marginTop: "clamp(40px, 7vh, 72px)",
          height: 1,
          background: "rgba(30,30,26,0.09)",
        }}
      /> */}
    </div>
  );
}

/*
── USAGE ────────────────────────────────────────────────────────────────────

// Plain lines - slide up from bottom, colour changes on entry:
<ScrollStorySection
  tag="Who we are"
  lines={[
    "House of Bliss is a community of photographers,",
    "filmmakers, editors, and dreamers who understand",
    "that weddings are so much more than just events -",
    "they are love stories ready to be told.",
  ]}
  accentColor="#3b4237"
  textColor="#1e1e1a"
/>

// Bullets:
<ScrollStorySection
  tag="What we offer"
  accentColor="#7a6a52"
  intro="From the pre-wedding excitement to the final Vidai moment, House of Bliss offers end-to-end coverage tailored to your journey:"
  bullets={[
    { title: "Pre-Wedding & Couple Photoshoots", desc: "Beautifully planned sessions that reflect your personalities and love story in every frame." },
    { title: "Candid Wedding Photography",        desc: "Authentic, emotional, and spontaneous moments captured discreetly and gracefully." },
    { title: "Cinematic Wedding Films",           desc: "High-quality storytelling with cinematic editing, music, and mood-crafted to move you every time you watch." },
    { title: "Drone Videography",                 desc: "Breathtaking aerial shots that add a grand, unforgettable perspective to your wedding film." },
    { title: "Complete Event Coverage",           desc: "From Haldi to Mehendi to Sangeet to Reception-our lens captures it all with artistic precision." },
  ]}
  closing="No matter how big or intimate your wedding is, our team brings the same passion and professionalism to every celebration."
/>

*/