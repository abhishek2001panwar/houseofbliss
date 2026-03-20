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

  const sectionPadding = isMobile ? "28px 5%" : "40px 7%";

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
                fontSize: isMobile ? "clamp(38px, 10vw, 56px)" : 35,
                color: "#1e1e1a",
                margin: 0,
                lineHeight: 1.3,
                letterSpacing: "-0.03em",
                transform: `translateY(${-scrollY * 0.08}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              Top Wedding Photographers in Bangalore: Documenting Love, Light,
              and Legacy
            </h1>
          </div>

          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 17,
              lineHeight: 1.75,
              color: "#3a3a35",
              margin: 0,
              maxWidth: 840,
            }}
          >
            When it comes to weddings, every moment is a memory waiting to be
            captured. From the nervous excitement of a bride’s first look to the
            joyous chaos of the baraat, these moments of time, however fleeting
            they may be, should be approached with the same artistry and emotion
            you will have when you look back at them years down the line. That
            is the essence of professional wedding photography Bangalore and
            this is achieved with House of Bliss leading the way.
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
          src="/serv10/img1.png"
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
            Why Wedding Photography is Important
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
              Your wedding day is one of the most important days of your life.
              It is not just an event, it is a story. And like every great
              story, it needs to be told
            </p>
            <p style={{ margin: "0 0 12px" }}>
              The best wedding photographers in Bangalore are not just
              photographers, they are videographers, story tellers, artists,
              marketing reflects, culture, and the love you share.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              Whether you are having a traditional South Indian wedding,
              extravagant North Indian wedding or a combination of both, House
              of Bliss can appreciate the details of what makes a unique wedding
              truly unique.
            </p>
          </div>
        </div>
      </section>

      <blockquote
        style={{
          margin: "40px 0 10",
          padding: "34px",
          borderLeft: "1px solid rgba(30,30,26,0.2)",
          fontFamily: "var(--font-editorial, serif)",
          fontWeight: 300,
          fontSize: 30,
          lineHeight: 1.5,
          color: "#1e1e1a",
          letterSpacing: "-0.01em",
          fontStyle: "italic",
          textAlign: "left",
        }}
      >
        What Sets House of Bliss Apart As the Top Wedding Photographer in
        Bangalore?
        <cite
          style={{
            display: "block",
            marginTop: 12,
            fontFamily: "var(--font-neue-light, sans-serif)",
            fontSize: 17,
            letterSpacing: "0.1em",
            color: "",
            textTransform: "capitalize",
            fontStyle: "bold",
          }}
        >
          At House of Bliss, photography is not only our profession, it is our
          passion. Our team has a year’s worth of experience that spans hundreds
          of weddings and brings technical capability and emotional intelligence
          to every shoot.
        </cite>
      </blockquote>

    

      <ScrollStorySection
        tag="We are different because of"
        accentColor="#7a6a52"
        intro=""
        bullets={[
          {
            title: "Candid storytelling",
            desc: "We take pride in capturing unscripted moments that show actual emotion.",
          },
          {
            title: "Creative compositions",
            desc: "From beautiful screenings to intimate close-ups, our photographs are thoughtfully composed.",
          },
          {
            title: "Cultural awareness",
            desc: "We understand the rituals, traditions, and timing of the different types of Indian weddings.",
          },
          {
            title: "Post-production excellence",
            desc: "Our editing staff strives to retouch every image with care and quality.",
          },
        ]}
        closing="Whether you are looking for marriage photographers in Bangalore to cover a large celebration, or a small ceremony, we offer packages to fit your vision."
      />

      <ScrollStorySection
        tag="Our Services"
        accentColor="#7a6a52"
        intro="We offer a full suite of wedding photography in Bangalore services to ensure every body to document every detail of your wedding"
        bullets={[
          {
            title: "Pre-wedding shoots ",
            desc: "Romantic, fun, and customized sessions in inspiring locations.",
          },
          {
            title: "Wedding day coverage",
            desc: "From haldi and mehendi to reception, we will be there for each event.",
          },
          {
            title: "Candid photography",
            desc: "Natural, stay-true-to-definition, spontaneous moments without interference",
          },
          {
            title: "Traditional photography",
            desc: "Portraits, posed group photographs with cultural themes and scenes.",
          },
          {
            title: "Cinematic videography",
            desc: "Wedding films which feel like a movie, starring you.",
          },
          {
            title: "Drone photography",
            desc: "Aerial photography of your venue and celebrations.",
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
        <ParallaxImg
          src="/serv10/img2.jpg"
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
            Why hire Professional Marriage Photographers in Bangalore?
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
              Professional marriage photographers in Bangalore not only will
              capture your memories with clarity, creativity, and care, but
              amateurs may miss some of the major happenings or may not know how
              to account for lighting and stage. At House of Bliss, we use the
              latest technology along with an experienced eye. Additionally,
              when you hire House of Bliss, we will blend into the background,
              and you can enjoy your day without the feeling of always being
              posed or interrupted.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: sectionPadding,
          display: "grid",
          gap: isMobile ? "32px 0" : "0 60px",
          alignItems: "start",
          ...twoColGrid,
        }}
      >
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
            Bangalore: Picturesque Backdrops
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
              As a city filled with beauty and culture, Bangalore features
              picturesque wedding photography backdrops. From Cubbon Park’s lush
              gardens to Bangalore Palace’s royal architecture, or the elegance
              of luxury hotels – our team members are adept at leveraging the
              city’s beauty to frame your photos. Our team will also do
              destination wedding photography throughout India and the world,
              under the same level of style wherever your love takes you.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: sectionPadding,
          display: "grid",
          gap: isMobile ? "32px 0" : "0 60px",
          alignItems: "start",
          ...twoColGrid,
        }}
      >
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
            Client Testimonials
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
              “House of Bliss captured our wedding in the most stunning and
              dreamy way. Every photo tells a story, and we couldn’t be
              happier.” <br/> - Radhika & Arjun <br/> “The team was genuinely nice,
              professional, and so talented. They completely put us at ease, and
              the results we got were stunning.” <br/> - Neha & Vikram{" "}
            </p>
          </div>
        </div>
      </section>

 <section
        style={{
          padding: sectionPadding,
          display: "grid",
          gap: isMobile ? "32px 0" : "0 60px",
          alignItems: "start",
          ...twoColGrid,
        }}
      >
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
           Packages & Booking

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
             We have packages for every style and budget. Whether you want a single day shoot, or all-day coverage, our pricing is upfront and competitive. Please reach out for a personalized quote and consultation.  </p>
          </div>
        </div>
      </section>

<section
        style={{
          padding: sectionPadding,
          display: "grid",
          gap: isMobile ? "32px 0" : "0 60px",
          alignItems: "start",
          ...twoColGrid,
        }}
      >
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
Contact Us

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
Are you ready to make your wedding moment unforgettable?

Let House of Bliss be your trusted partner for photography Bangalore.

View House of Bliss to see our gallery and packages, and book your date.
</p>
          </div>
        </div>
      </section>



    </div>
    </>
  );
}

export default page;
