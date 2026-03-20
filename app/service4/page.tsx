"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import ScrollStorySection from "../components/Scrollstorysection";
import Navbar from "../components/navbar";

// ── Responsive hook ───────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

// ── Scroll hook ───────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

// ── Parallax image inside fixed-height container ──────────────────────────────
function ParallaxImg({
  src,
  alt,
  height,
  speed = 0.06,
  title,
  description,
}: {
  src: string;
  alt: string;
  height: number | string;
  speed?: number;
  title?: string;
  description?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ty, setTy] = useState(0);
  const [hovered, setHovered] = useState(false);
  const hasOverlayDescription = Boolean(description);
  const isMobile = useIsMobile();

  useEffect(() => {
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
  }, [speed]);

  // On mobile, use auto height so images don't get squished
  const resolvedHeight = isMobile ? "auto" : height;
  const aspectStyle = isMobile
    ? { aspectRatio: "4/3" }
    : { height: resolvedHeight };

  return (
    <div style={{ width: "100%" }}>
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          ...aspectStyle,
        }}
      >
        <Image src={src} alt={alt} width={1200} height={1600} style={{
            position: "absolute",
            top: "-12%",
            left: 0,
            width: "100%",
            height: "124%",
            objectFit: "cover",
            transform: `translateY(${ty}px)`,
            willChange: "transform",
          }} />

        {hasOverlayDescription && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              padding: "clamp(14px, 3vw, 28px)",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0) 100%)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.35s ease",
              pointerEvents: "none",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-neue-light, sans-serif)",
                fontSize: "clamp(11px, 1.3vw, 14px)",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.88)",
                maxWidth: "min(92%, 560px)",
              }}
            >
              {description}
            </p>
          </div>
        )}
      </div>

      {title && (
        <h3
          style={{
            margin: 0,
            paddingTop: "clamp(12px, 1.5vw, 22px)",
            fontFamily: "var(--font-editorial, serif)",
            fontWeight: 200,
            fontSize: 18,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "#1e1e1a",
          }}
        >
          {title}
        </h3>
      )}
    </div>
  );
}

// ── Manifesto slide ───────────────────────────────────────────────────────────
const MANIFESTO = [
  {
    n: "01",
    rule: "If it makes you happy, it doesn't have to make sense to others.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  },
  {
    n: "02",
    rule: "Always take the scenic route.",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
  },
  {
    n: "03",
    rule: "Love is love - all love is welcome here.",
    img: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80",
  },
  {
    n: "04",
    rule: "Tradition is optional. Meaning is essential.",
    img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=80",
  },
  {
    n: "05",
    rule: "Present over perfect, experiences over things.",
    img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80",
  },
  {
    n: "06",
    rule: "Respect nature - respect others - respect yourself.",
    img: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=1200&q=80",
  },
  {
    n: "07",
    rule: "Not everything needs a hashtag.",
    img: "https://images.unsplash.com/photo-1501901609772-df0848060b33?w=1200&q=80",
  },
  {
    n: "08",
    rule: "Photos are the most important thing. (Apart from the people in them.)",
    img: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80",
  },
  {
    n: "09",
    rule: "Drink water and don't be an asshole.",
    img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80",
  },
  {
    n: "10",
    rule: "Chase adventure, not approval.",
    img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80",
  },
];

function ManifestoSlide({ item }: { item: (typeof MANIFESTO)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Image width={1200} height={1200} src={item.img}
        alt={item.rule}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 1s cubic-bezier(.25,.46,.45,.94)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "clamp(20px,4vw,48px)",
        }}
      >
        <p
          style={{
            margin: "0 0 10px",
            fontFamily: "var(--font-neue-light, monospace)",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
          }}
        >
          {item.n}
        </p>
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-editorial, serif)",
            fontWeight: 300,
            fontSize: "clamp(18px, 2.8vw, 36px)",
            color: "#fff",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            maxWidth: 520,
          }}
        >
          {item.rule}
        </h3>
      </div>
    </div>
  );
}

// ── Manifesto carousel ────────────────────────────────────────────────────────
function ManifestoCarousel() {
  const [active, setActive] = useState(0);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
      }}
    >
      {MANIFESTO.map((item, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 0.8s ease",
            pointerEvents: i === active ? "auto" : "none",
          }}
        >
          <ManifestoSlide item={item} />
        </div>
      ))}

      {["prev", "next"].map((dir) => (
        <button
          key={dir}
          onClick={() =>
            setActive((a) =>
              dir === "prev"
                ? (a - 1 + MANIFESTO.length) % MANIFESTO.length
                : (a + 1) % MANIFESTO.length,
            )
          }
          style={{
            position: "absolute",
            top: "50%",
            [dir === "prev" ? "left" : "right"]: 20,
            transform: "translateY(-50%)",
            zIndex: 5,
            width: 40,
            height: 40,
            border: "1px solid rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            outline: "none",
            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          {dir === "prev" ? "←" : "→"}
        </button>
      ))}

      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 7,
          zIndex: 5,
        }}
      >
        {MANIFESTO.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              border: "none",
              padding: 0,
              background: i === active ? "#fff" : "rgba(255,255,255,0.35)",
              cursor: "pointer",
              outline: "none",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 5,
          fontFamily: "var(--font-neue-light, monospace)",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {String(active + 1).padStart(2, "0")} / {MANIFESTO.length}
      </div>
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      style={{ height: 1, background: "rgba(30,30,26,0.1)", margin: "0 7%" }}
    />
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
function page() {
  const scrollY = useScrollY();
  const isMobile = useIsMobile();

  // Shared responsive grid helpers
  const twoColGrid = isMobile
    ? { gridTemplateColumns: "1fr" }
    : { gridTemplateColumns: "1fr 1fr" };

  const sectionPadding = isMobile ? "48px 5%" : "80px 7%";

  return (
    <><Navbar theme="dark" />
    <div
      style={{ background: "#fefee8", minHeight: "100vh", overflowX: "hidden" }}
    >
      {/* ── HERO ── */}
      <div
        style={{
          padding: isMobile ? "120px 5% 0" : "190px 7% 0",
          borderBottom: "1px solid rgba(30,30,26,0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: isMobile ? "24px 0" : "0 60px",
            alignItems: "start",
            paddingBottom: isMobile ? 36 : 56,
            ...twoColGrid,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-editorial, serif)",
                fontWeight: 200,
                fontSize: isMobile
                  ? "clamp(38px, 10vw, 56px)"
                  : "clamp(52px, 1vw, 120px)",
                color: "#1e1e1a",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                transform: `translateY(${-scrollY * 0.08}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              Best Wedding Photography in Bangalore: Where Every Frame Tells
              Your Story
            </h1>
          </div>

          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: "clamp(14px, 1.4vw, 17px)",
              lineHeight: 1.75,
              color: "#3a3a35",
              margin: 0,
              maxWidth: 840,
            }}
          >
            In the bustling center of India’s Silicon Valley, a subtle
            transformation is taking place – one which is transforming how
            couples will remember perhaps the most important day in their lives.
            Welcome to the realm of wedding photography in Bangalore, where art
            becomes visual storytelling, and each click celebrates love
            throughout the day. Whether you are planning a small, intimate
            at-home ceremony or a picturesque wedding somewhere exotic, finding
            the best wedding photographers in Bangalore involves much more than
            checking a box. You should find someone that is able to see your
            story, feel that energy, and create images that consider time.
          </p>
        </div>
      </div>

      <section
        style={{
          padding: sectionPadding,
          display: "grid",
          gap: isMobile ? "32px 0" : "0 60px",
          alignItems: "start",
          ...twoColGrid,
        }}
      >
        {/* Left col: image */}
        <ParallaxImg
          src="/serv4/img1.jpg"
          alt="photographer with camera"
          height={480}
          speed={0.055}
        />

        {/* Right col: text */}
        <div style={{ paddingTop: isMobile ? 0 : 40 }}>
          <h2
            style={{
              fontFamily: "var(--font-editorial, serif)",
              fontWeight: 300,
              fontSize: "clamp(26px, 3vw, 42px)",
              color: "#1e1e1a",
              margin: "0 0 28px",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Why is Bangalore a Wedding Photography Hub?
          </h2>
          <div
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 17,
              lineHeight: 1.85,
              color: "#3a3a35",
            }}
          >
            <p style={{ margin: "0 0 12px" }}>
              Bangalore isn’t just a tech capital. It is a melting pot of
              cultures, traditions, and modern sensibilities.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              From beautiful garden venues to heritage temples and classy urban
              rooftops, the city is a beautiful backdrop for photographers to
              cast their spell, and as couples look for more personal,
            </p>
            <p style={{ margin: "0 0 12px" }}>
              cinematic representation of their big day, it is obvious that both
              marriage photographers in Bangalore and their clients are
              embracing being creative, passionate, and stylish.
            </p>
          </div>
        </div>
      </section>

      <ScrollStorySection
        tag="House of Bliss: A Standard for Wedding Storytellers"
        lines={[
          "Even in this crowded space of talented service providers, House of Bliss, shines through as a benchmark in excellence. For over the past decade they have created a skill for combining emotion and experience not capturing events, but the emotional undercurrents that are usually the unknowns that separate weddings from each other. ",
          "Their approach is personal. They typically are drawn to the couples that wear their hearts on their sleeves – the dreamers, the rebels, the storytellers. For House of Bliss, it is not just about taking a photograph, it is connected to authenticity. It is about capturing laughter, tears, and solemn glances into frames that will last a lifetime after your wedding day. ",
           ]}
        accentColor="#3b4237"
      />

         <ScrollStorySection
        tag="What Makes a Wedding Photographer “The Best”?"
        lines={[
          "When you are searching for the best wedding photographers in Bangalore, you are generally not only looking for a beautiful portfolio of photographs. Here are a few of the things that set the very best professionals apart",
          "Artistic Vision: They do not simply take photos; they create visual poetry.",
           "Emotional Intelligence: They have the wisdom to know when to gently step back and when to move in close, capturing moments instead of intruding.",
            "Versatility: They operate in all forms and styles of weddings, from traditional South Indian weddings to cross-cultural celebrations – they adapt seamlessly. ",
             "Storytelling: Every album is a story, not a simple collection of random shots. ",
              "Tech & Talent: They strike a perfect balance between the latest technology and long-standing experience with a cinematographic appeal.",

           ]}
        accentColor="#3b4237"
      />

       <ScrollStorySection
        tag="Trends in Wedding Photography Bangalore Couples Love"
        accentColor="#7a6a52"
        intro="Couples in Bangalore are shaping the face of weddings. Here are some trends about wedding photography in Bangalore : "
        bullets={[
          { title: "Preference for Candid Moments instead Posed Portraits: Natural interactions trump posed portraits.", desc: "" },
          { title: "Pre-Wedding Shoots in Popular Locations for Pre-Wedding Shoots: Cubbon Park, Nandi Hills or any rustic cafe.",        desc: "" },
          { title: "Drone Photography: Suddenly the aerial view makes that wedding film more glamorous.",           desc: "" },
          { title: "Editorial Album Style & Design: Album design borrowed from fashion magazines – sleek, stylish, storytelling albums. ",                 desc: "" },
          { title: "Hybrid Coverage: Using both photography and videography services to give the complete experience!",           desc: "" },
        ]}
        closing=""
      />

 <ScrollStorySection
        tag="How to pick a Wedding Photographer in Bangalore"
        accentColor="#7a6a52"
        intro="Guide to find your perfect fit:"
        bullets={[
          { title: "Choose a style", desc: "Classic, documentary, or cinematic." },
          { title: "Determine a budget",        desc: "Great pictures are a worthy investment, so plan ahead." },
          { title: "Meet in person",           desc: "It’s all about chemistry. You’ll be spending your most emotional day with your photographer" },
          { title: "Look at Full Albums ",                 desc: " Not just highlight reels - get a sense of how they actually document an entire event. " },
          { title: "Ask about backup",           desc: "Backup equipment, backup team, backup timeline - leave no stone unturned." },
        ]}
        closing=""
      />
        <ScrollStorySection
        tag="To sum up: Your love deserves the best"
        lines={[
          "Your wedding is not just a day, it’s the start of your beginning! And the right photographer ensures that you start your story with beautiful elegance and depth.",
          "Since you’re already looking for wedding photography at Bangalore studios and may even be falling in love with soulful storytelling ",
           "and photography of House of Bliss, just remember: the best photographers do not just see you, they feel you. ",
            "Versatility: They operate in all forms and styles of weddings, from traditional South Indian weddings to cross-cultural celebrations – they adapt seamlessly. ",
             "So trust your heart and take your time to choose a wedding photographer that can turn all your beautiful moments into memories.",

           ]}
        accentColor="#3b4237"
      />
     
   
    </div>
    </>
  );
}

export default page;
