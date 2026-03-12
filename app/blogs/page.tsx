"use client";

import { useEffect, useRef, useState } from "react";

const BLOGS = [
  {
    id: 1,
    title:
      "Why Wedding Photography is the Only Thing That Grows More Valuable with Time",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img1.png",
  },
  {
    id: 2,
    title:
      "What Is Cinematic Wedding Photography and Why Every Couple Needs It",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img2.png",
  },
  {
    id: 3,
    title: "What the Mirrors Remember",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img3.png",
  },
  {
    id: 4,
    title: "The Weight of Vermillion",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img4.png",
  },
  {
    id: 5,
    title: "The Frame That Stopped Time",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img5.png",
  },
  {
    id: 6,
    title: "How to Choose the Perfect Wedding Photographer in Bengaluru",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img6.png",
  },
  {
    id: 7,
    title: "The First Taste of Marriage",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img7.png",
  },
  {
    id: 8,
    title: "The Color of Forever",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img8.png",
  },
  {
    id: 9,
    title: "Behind the Veil",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img9.png",
  },
  {
    id: 10,
    title: "What Gods Remember",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img10.png",
  },
  {
    id: 11,
    title: "Where light learns to fall",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img11.png",
  },
  {
    id: 12,
    title:
      "Cinematic Wedding Photography Trends in 2025 You’ll Fall in Love With",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img12.png",
  },
  {
    id: 13,
    title:
      "Modern vs Traditional What Couples Want from Wedding Photography in Bengaluru Today",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img13.png",
  },
  {
    id: 14,
    title: "The Shoulder That Chose You",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img14.png",
  },
  {
    id: 15,
    title: "The Choreography of Unscripted Love",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img15.png",
  },
  {
    id: 16,
    title: "When Hands Find Home",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img16.png",
  },
  {
    id: 17,
    title: "The Circle of Blessings",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img17.png",
  },
  {
    id: 18,
    title: "The Photographer’s Favorite Frame",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img18.png",
  },
  {
    id: 19,
    title: "The Threshold Moment",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img19.png",
  },
  {
    id: 20,
    title: "Before the World Watches",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img20.png",
  },
  {
    id: 21,
    title: "When Brothers Become Witnesses",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img21.png",
  },
  {
    id: 22,
    title: "The Architecture of Affection",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img22.png",
  },
  {
    id: 23,
    title: "When Gold Dust Becomes Poetry",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img23.png",
  },
  {
    id: 24,
    title: "In Her Eyes, His Tomorrow",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img24.png",
  },
  {
    id: 25,
    title: "The Poetry of Tradition",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img25.png",
  },
  {
    id: 26,
    title: "The Ultimate Guide to Cinematic Wedding Photography in Bengaluru",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img26.png",
  },
  {
    id: 27,
    title:
      "Why House of Bliss Is a Trusted Name for Wedding Photography in Bengaluru",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img27.png",
  },
  {
    id: 28,
    title: "Between Breaths",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img28.png",
  },
  {
    id: 29,
    title: "The Silence Between Vows",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img29.png",
  },
  {
    id: 30,
    title: "Witness to Wonder",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img30.png",
  },
  {
    id: 31,
    title: "When Laughter Writes the Story",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img31.png",
  },
  {
    id: 32,
    title: "The Perfect Adjustment",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img32.png",
  },
  {
    id: 33,
    title:
      "Capture the Opening Moments of Forever with the Best Engagement Photographer in Bengaluru",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img33.png",
  },
  {
    id: 34,
    title: "Top 5 Mistakes Couples Make When Planning Wedding Photography",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img34.png",
  },
  {
    id: 35,
    title:
      "Why Cinematic Wedding Photography Works Beautifully for Intimate Weddings",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img35.png",
  },
  {
    id: 36,
    title: "Best Wedding Photographer Portfolio: What Makes Them Stand Out",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img36.png",
  },
  {
    id: 37,
    title:
      "Capture the Perfect Aura with Affordable Wedding Photographers in Bangalore",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img37.png",
  },
  {
    id: 38,
    title:
      "Top Wedding Photographer in Bengaluru - Who Delivers Stunning Photos",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img38.jpg",
  },
  {
    id: 39,
    title: "Affordable Wedding Photography Without Compromising Quality",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/blog/img39.jpg",
  },
];

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
        <a
          href="#"
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
        </a>
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
