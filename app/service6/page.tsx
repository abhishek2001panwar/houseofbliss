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
            fontSize: "clamp(15px, 2vw, 30px)",
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
              Start your Forever: Engagement Photographers in Bengaluru{" "}
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
            Your engagement is one of the most special moments in your love
            story, and certainly a moment worth capturing beautifully,
            elegantly, and authentically. We are wedding engagement
            photographers at House of Bliss, passionate about wedding engagement
            photography infused with creativity, emotion, and story telling. If
            you’re looking for an engagement photographer in the beautiful city
            of Bengaluru, you’ve come to the right place! From romantic couple
            portraits, to candid laughter, to the little moments leading up to
            your big day, we cover it all.
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
          src="/about/about1.png"
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
            Why Do You Need an Engagement Photographer?
          </h2>
          <div
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 13.5,
              lineHeight: 1.85,
              color: "#3a3a35",
            }}
          >
            <p style={{ margin: "0 0 12px" }}>
              When your wedding day arrives, the day is all documented!
            </p>
            <p style={{ margin: "0 0 12px" }}>
              You have many wedding photographs that document the wedding, the
              couple, the ceremony, family, guests, wedding party, the
              reception, the flowers, the food.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              All of that is well and good, but a wedding photograph tells your
              wedding day story, your engagement photographs tell your love
              story unfiltered, raw, vulnerable, and romantic
            </p>
            <p style={{ margin: "0 0 12px" }}>
              It is a great way to celebrate and commemorate your relationship
              together, and to feel comfortable in front of the camera before
              your wedding day.
            </p>
          </div>
        </div>
      </section>

      <ScrollStorySection
        tag=""
        accentColor="#7a6a52"
        intro="What is the value of hiring a professional wedding engagement photographer?"
        bullets={[
          {
            title: "A unique story",
            desc: "your engagement shoot is the story of your unique personality, dynamic, and passions together. ",
          },
          {
            title: "Save-the-date content",
            desc: "you can use the engagement photographs on your wedding invitations, social media, and your wedding website.",
          },
          {
            title: "Pre-Wedding Trial",
            desc: "Meet your photographers for engagements and create a relationship before the wedding day.",
          },
          {
            title: "Memory Keepsake",
            desc: "These are moments you’ll cherish for years to come-your first chapter frozen in time.",
          },
        ]}
        closing=""
      />

      <blockquote
        style={{
          margin: "40px 0 0",
          padding: "0 0 0 24px",
          borderLeft: "1px solid rgba(30,30,26,0.2)",
          fontFamily: "var(--font-editorial, serif)",
          fontWeight: 300,
          fontSize: 30,
          lineHeight: 1.5,
          color: "#1e1e1a",
          letterSpacing: "-0.01em",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Meet Your Photographers for Engagement - House of Bliss
        <cite
          style={{
            display: "block",
            marginTop: 12,
            fontFamily: "var(--font-neue-light, sans-serif)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "rgba(30,30,26,0.45)",
            textTransform: "uppercase",
            fontStyle: "bold",
          }}
        >
          At House of Bliss we know that all couples are different, so we take a
          bespoke approach to engagement photography in Bengaluru. Whatever you
          envision for your engagement shoot, a casual outdoor shoot, a luxury
          editorial style shoot, or an at home cozy vibe, we take your vision
          into consideration in every detail.
        </cite>
      </blockquote>

      <ScrollStorySection
        tag=""
        accentColor="#7a6a52"
        intro="What makes us different:"
        bullets={[
          {
            title:
              "Experienced wedding photographers and engagement photographers",
            desc: "",
          },
          {
            title: "Supportive creative direction and some styling",
            desc: "",
          },
          {
            title: "Professional equipment for photography and post production",
            desc: "",
          },
          {
            title: "Natural and cinematic shooting style",
            desc: "",
          },
          {
            title: "Location scouting in Bengaluru’s most beautiful places ",
            desc: "",
          },
        ]}
        closing=""
      />

      <blockquote
        style={{
          margin: "40px 0 0",
          padding: "0 0 0 24px",
          borderLeft: "1px solid rgba(30,30,26,0.2)",
          fontFamily: "var(--font-editorial, serif)",
          fontWeight: 300,
          fontSize: 30,
          lineHeight: 1.5,
          color: "#1e1e1a",
          letterSpacing: "-0.01em",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Best Engagement Photography Locations in Bengaluru
        <cite
          style={{
            display: "block",
            marginTop: 12,
            fontFamily: "var(--font-neue-light, sans-serif)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "",
            textTransform: "uppercase",
            fontStyle: "bold",
          }}
        >
          With its stylish urban setting and beautiful parks and lakes,
          Bengaluru has so many different looks to play with. Are you in awe of
          heritage architecture or are you a lover of natural beauty? With the
          endless scope of engagement photography in such a rich contrast of
          urban chic and nature, plus all the places that will suit your shoot
          perfectly, the best locations await!
        </cite>
      </blockquote>

      <ScrollStorySection
        tag=""
        accentColor="#7a6a52"
        intro="Some of our favourite places for engagement pictures in Bengaluru:"
        bullets={[
          {
            title: "Cubbon Park",
            desc: "Perfectly magical for early morning engagement photography with light and nature all about. ",
          },
          {
            title: "Lalbagh Botanical Garden",
            desc: "The classic floral backdrop where romance easily comes alive.",
          },
          {
            title: "Nandi Hills",
            desc: "The dramatic, engaging sunrise photographs with sprawling views of the valleys.",
          },
          {
            title: "Ulsoor Lake",
            desc: "Designed for dreamy, dreamy engagement photoshoots.",
          },
          {
            title: "Indiranagar or MG Road Streets",
            desc: "The edgy urban chic themed photographs.",
          },
          {
            title: "Your home or cafe",
            desc: "Pictures that are relaxed and represent intimacy.",
          },
        ]}
        closing=""
      />

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
          src="/about/about1.png"
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
            What to Expect with Our Engagement Photography Packages
          </h2>
          <div
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 13.5,
              lineHeight: 1.85,
              color: "#3a3a35",
            }}
          >
            <p style={{ margin: "0 0 12px" }}>
              We have photography packages to suit every style, budget, and
              needs.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              Each photography package allows for a pre-shoot consultation, will
              guide you in creating mood boards, and finally provide you with a
              photographic gallery of collected images professionally edited.
            </p>
          </div>
        </div>
      </section>

      <ScrollStorySection
        tag=""
        accentColor="#7a6a52"
        intro="Our engagement photography package will consist of:"
        bullets={[
          {
            title: "More than one outfit change",
            desc: "",
          },
          {
            title: "More than one location",
            desc: "",
          },
          {
            title: "Drone footage of the session (upon request)",
            desc: "",
          },
          {
            title: "Professional makeup and styling (add-on)",
            desc: "",
          },
          {
            title: "Help with couple poses",
            desc: "",
          },
          {
            title: "Develop a creative theme for your session",
            desc: "",
          },
        ]}
        closing=""
      />

      <ScrollStorySection
        tag="Tips for Planning Your Engagement Shoot"
        accentColor="#7a6a52"
        intro="To get the best out of your time with your engagement photographer, follow these tips:"
        bullets={[
          {
            title: "Coordinate your outfits but don’t match completely.",
            desc: "",
          },
          {
            title:
              "Choose locations that have meaning like where you first met or went for your first date.",
            desc: "",
          },
          {
            title: "Keep your props simple and easy.",
            desc: "",
          },
          {
            title: "Relax and trust your photographer.",
            desc: "",
          },
        ]}
        closing="Be you! The best photos happen when you are genuinely having fun and being your authentic selves.

"
      />

      <blockquote
        style={{
          margin: "40px 0 0",
          padding: "30px",
          borderLeft: "1px solid rgba(30,30,26,0.2)",
          fontFamily: "var(--font-editorial, serif)",
          fontWeight: 300,
          fontSize: 30,
          lineHeight: 1.5,
          color: "#1e1e1a",
          letterSpacing: "-0.01em",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Book Your Wedding Engagement Photographer Today
        <cite
          style={{
            display: "block",
            marginTop: 12,
            fontFamily: "var(--font-neue-light, sans-serif)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "",
            textTransform: "uppercase",
            fontStyle: "bold",
          }}
        >
          Your love should be captured in the best possible way to represent you
          as a couple. Whether you want a grand photo shoot, or a minimal
          intimate celebration, our wedding engagement photographers in
          Bengaluru will be with you, every step of the way to make your vision
          come true. Ready to book your dream engagement shoot? It’s time to
          turn your love into timeless art together. Call or Contact us now to
          book your shoot and create your first memory as a newly engaged couple
          that will last forever!
        </cite>
      </blockquote>
    </div>
    </>
  );
}

export default page;
