"use client";

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
        <img
          src={src}
          alt={alt}
          style={{
            position: "absolute",
            top: "-12%",
            left: 0,
            width: "100%",
            height: "124%",
            objectFit: "cover",
            transform: `translateY(${ty}px)`,
            willChange: "transform",
          }}
        />

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
            fontSize: 17,
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
      <img
        src={item.img}
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
    <>
    <Navbar theme="dark" />
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
            alignItems: "end",
            paddingBottom: isMobile ? 36 : 56,
            ...twoColGrid,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-editorial, serif)",
                fontWeight: 300,
                fontSize: isMobile ? "clamp(38px, 10vw, 56px)" : "clamp(52px, 3vw, 120px)",
                color: "#1e1e1a",
                margin: 0,
                lineHeight: 0.89,
                letterSpacing: "-0.03em",
                transform: `translateY(${-scrollY * 0.08}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              Cinematic wedding photography
            </h1>
          </div>

          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: "clamp(14px, 1.4vw, 17px)",
              lineHeight: 1.75,
              color: "#3a3a35",
              margin: 0,
              maxWidth: 440,
            }}
          ></p>
        </div>
      </div>

      {/* ── INTRO: image + text block ── */}
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
          src="/serv1/img1.webp"
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
            Our Photography Services
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
              At House of Bliss, we know your Wedding Day is not simply an
              occasion-it is a classic story, an emotion, and a visual
              celebration
            </p>
            <p style={{ margin: "0 0 12px" }}>
              As specialists in cinematic wedding photography, we create and
              craft every heartbeat, tear, laugh, and promise-all under the
              authority we have earned in directing and the artistry of an
              artist's eye.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              Regardless of whether you have an extravagant destination wedding
              on your head, or a simplified ceremony;
            </p>
            <p style={{ margin: 0 }}>
              our professional wedding cinematographers or photographers use
              luxury photographic artistry to transform moments into memories
              through our luxury cinematic wedding photography in Bengaluru and
              beyond.
            </p>
          </div>
        </div>
      </section>

      <blockquote
        style={{
          margin: "40px 0 0",
          padding: "0 0 0 24px",
          borderLeft: "1px solid rgba(30,30,26,0.2)",
          fontFamily: "var(--font-editorial, serif)",
          fontWeight: 300,
          fontSize: "clamp(16px, 3.8vw, 22px)",
          lineHeight: 1.5,
          color: "#1e1e1a",
          letterSpacing: "-0.01em",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Welcome to House of Bliss - Where Your Love Story Is a Masterpiece in
        Cinema.
      </blockquote>

      {/* ── CINEMATIC SECTION ── */}
      <section
        style={{
          padding: sectionPadding,
          display: "grid",
          gap: isMobile ? "32px 0" : "0 60px",
          alignItems: "center",
          ...twoColGrid,
        }}
      >
        {/* On mobile, text comes first then image */}
        <div style={{ order: isMobile ? 1 : 0 }}>
          <h2
            style={{
              fontFamily: "var(--font-editorial, serif)",
              fontWeight: 300,
              fontSize: "clamp(26px, 3vw, 42px)",
              color: "#1e1e1a",
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            What is Cinematic Wedding Photography?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 18,
              lineHeight: 1.85,
              color: "#3a3a35",
              margin: 0,
            }}
          >
            Cinematic wedding photography is a new and immersive visual
            storytelling style. It blends wedding photography and a cinematic
            feel by focusing on movement, emotion, composition, and
            mood-bringing a movie quality to your wedding day. At House of
            Bliss, we provide a cinematic wedding photoshoot experience made
            just for you, your personality, preferences, and your love story.
            Slow-motion captures, natural light, framed moments, and
            storytelling sequences suitable for a romantic film.
          </p>
        </div>

        <div style={{ order: isMobile ? 0 : 1 }}>
          <ParallaxImg
            src="/serv1/img2.webp"
            alt="kaat in landscape"
            height={520}
            speed={0.06}
          />
        </div>
      </section>

      <Divider />

      {/* ── WHY CHOOSE US ── */}
      <section
        style={{
          padding: sectionPadding,
          display: "grid",
          gap: isMobile ? "32px 0" : "0 80px",
          alignItems: "start",
          ...twoColGrid,
        }}
      >
        {/* image always first on mobile */}
        <ParallaxImg
          src="/serv1/img3.webp"
          alt="surf couple"
          height={500}
          speed={0.05}
        />

        <div style={{ paddingTop: isMobile ? 0 : 20 }}>
          <h2
            style={{
              fontFamily: "var(--font-editorial, serif)",
              fontWeight: 300,
              fontSize: "clamp(26px, 3vw, 42px)",
              color: "#1e1e1a",
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textAlign: isMobile ? "left" : "right",
            }}
          >
            Why Choose House of Bliss for Your Cinematic Wedding Photoshoot?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 18,
              lineHeight: 1.85,
              color: "#3a3a35",
              margin: "0 0 20px",
              textAlign: isMobile ? "left" : "right",
            }}
          >
            We're more than photographers. We're storytellers with a camera. Our
            philosophy is based on authenticity, art, and emotion. Here's why
            couples all over India - and especially Bengaluru - choose us for
            their wedding day:
          </p>
        </div>
        
      </section>

     

       <section style={{ padding: sectionPadding }}>
       

        {/* Service images - 1 col on mobile, 3-col asymmetric on desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr 1.2fr",
            gap: isMobile ? 24 : 16,
            alignItems: isMobile ? "stretch" : "end",
          }}
        >
          <ParallaxImg
            src="/serv1/why1.png"
            alt="destination wedding"
            height={380}
            speed={0.06}
            title="Story-Driven Visuals"
            description="Based on cinematic wedding storytelling, every frame is connected - together, they tell a powerful, emotional, beautiful story that is uniquely yours."
          />
          <ParallaxImg
            src="/serv1/why2.webp"
            alt="travel"
            height={270}
            speed={0.04}
            title="Luxury Wedding Aesthetics"
            description="We create luxury cinematic wedding photography in Bengaluru, where every detail-from your designer lehenga to the glowing sunset-looks extraordinarily beautiful and sophisticated"
          />
          <ParallaxImg
            src="/serv1/why3.webp"
            alt="mountains"
            height={310}
            speed={0.07}
            title="Experienced Team"
            description="Our directors, editors, and artistic visionaries have been making wedding films and photographing fashion for years! Everyone on our team is committed to artistic precision, emotional depth, and your big day."
          />
          
        
           <ParallaxImg
            src="/serv1/why4.webp"
            alt="travel"
            height={270}
            speed={0.04}
            title="Available Wherever Your Story Unfolds"
            description="Though we have a place to call home, our work knows no boundaries. Whether it's a cozy celebration or a grand destination wedding, we're ready to travel and capture your moments-anywhere your love takes us."
          />

           <ParallaxImg
            src="/serv1/why5.png"
            alt="travel"
            height={270}
            speed={0.04}
            title="Custom-Tailored Shoots"
            description="No two weddings are the same. We talk with every couple to learn about their vision, personal style, and preferences to create a cinematic wedding photoshoot that is 100% original"
          />
          <ParallaxImg
            src="/serv1/why6.png"
            alt="mountains"
            height={310}
            speed={0.07}
            title="Based in Bengaluru, Shoots Anywhere"
            description="Our home base is in the heart of Bengaluru, but we travel domestically and internationally to shoot destination weddings, cultural events, and love stories."
          />
          
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: sectionPadding }}>
        <div
          style={{
            display: "grid",
            gap: isMobile ? "24px 0" : "0 60px",
            alignItems: "start",
            marginBottom: isMobile ? 32 : 48,
            ...twoColGrid,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-editorial, serif)",
                fontWeight: 300,
                fontSize: "clamp(26px, 3vw, 42px)",
                color: "#1e1e1a",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Our Signature Cinematic Wedding Photography Services
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 18,
              lineHeight: 1.85,
              color: "#3a3a35",
              margin: 0,
              paddingTop: isMobile ? 0 : 8,
            }}
          >
            At House of Bliss, we offer a range of premium services tailored to
            capture your wedding in its most cinematic form:
          </p>
        </div>

        {/* Service images - 1 col on mobile, 3-col asymmetric on desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr 1.2fr",
            gap: isMobile ? 24 : 16,
            alignItems: isMobile ? "stretch" : "end",
          }}
        >
          <ParallaxImg
            src="/serv1/sig1.jpg"
            alt="destination wedding"
            height={380}
            speed={0.06}
            title="Pre-Wedding Cinematic Shoots"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          />
          <ParallaxImg
            src="/serv1/sig2.png"
            alt="travel"
            height={270}
            speed={0.04}
            title="Wedding Day Cinematic Coverage"
            description="From the bridal prep to the final farewell, we document each chapter of your wedding day with rich emotion, beautiful frames, and creative depth."
          />
          <ParallaxImg
            src="/serv1/sig3.webp"
            alt="mountains"
            height={310}
            speed={0.07}
            title="Highlight Films & Teasers"
            description="Short, breathtaking highlights crafted to share on social media or relive the essence of your day in under 5 minutes. A true blend of film editing and wedding documentation."
          />
          <ParallaxImg
            src="/serv1/sig4.png"
            alt="travel"
            height={270}
            speed={0.04}
            title="Luxury Album Design & Delivery"
            description="Our cinematic photography is not just digital. We offer beautifully crafted photo albums that feel like premium art books-because your memories deserve to be held, not just scrolled."
          />
        </div>
      </section>

      <Divider />

      <ScrollStorySection
        tag="Let's Turn Your Wedding Into a Cinematic Legacy"
        lines={[
          "Your wedding deserves more than a basic photo gallery. It deserves a story, an experience, a legacy",
          "If you're looking for luxury cinematic wedding photography in Bengaluru or planning a wedding anywhere in India or abroad, House of Bliss is here to create something extraordinary",
          "We invite you to connect with us, explore our past work, and begin your journey toward a timeless",
          "cinematic wedding photoshoot House of Bliss - Where Every Frame Tells a Love Story Worth Remembering.",
        ]}
        accentColor="#3b4237"
      />
    </div>
    </>
  );
}

export default page;