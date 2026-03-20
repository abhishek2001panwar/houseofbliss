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
                fontSize: isMobile
                  ? "clamp(38px, 10vw, 56px)"
                  : "clamp(52px, 3vw, 120px)",
                color: "#1e1e1a",
                margin: 0,
                lineHeight: 0.89,
                letterSpacing: "-0.03em",
                transform: `translateY(${-scrollY * 0.08}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              Wedding Photography in Bengaluru
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

      <section style={{ padding: sectionPadding }}>
        <div
          style={{
            display: "grid",
            gap: isMobile ? "24px 0" : "0 60px",
            alignItems: "start",
            marginBottom: isMobile ? 32 : 48,
            ...twoColGrid,
          }}
        ></div>

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
            src="/serv3/img1.png"
            alt="destination wedding"
            height={380}
            speed={0.06}
            title="Fashion Photography"
            description=""
          />
          <ParallaxImg
            src="/serv3/img2.jpg"
            alt="travel"
            height={270}
            speed={0.04}
            title="Night Photography"
            description=""
          />
          <ParallaxImg
            src="/serv3/img3.webp"
            alt="mountains"
            height={310}
            speed={0.07}
            title="Beauty Photography"
            description=""
          />
        </div>
      </section>

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
          src="/serv3/img4.png"
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
          ></h2>
          <div
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 18,
              lineHeight: 1.85,
              color: "#3a3a35",
            }}
          >
            <p style={{ margin: "0 0 12px" }}>
              Welcome to House of Bliss, your wedding photographer in Bangaluru,
              where we help preserve your precious and timeless wedding memories
              with elegance, authenticity, and creativity.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              As one of the elite wedding photography teams in Bangalore, we
              tell authentic love and cultural stories through heartfelt visual
              storytelling.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              When we photograph your wedding, whether you’re planning a
              luxurious celebration, a more intimate ceremony in a Church, or a
              dreamy destination wedding in Bangaluru,
            </p>
            <p style={{ margin: 0 }}>
              we make sure every significant and magical moment is preserved
              beautifully for eternity.
            </p>
          </div>
        </div>
      </section>

      {/* <blockquote
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
      </blockquote> */}

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
            Why Choose House of Bliss?
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
            We know that weddings are not just events, they’re emotional
            journeys. The family and friends who choose to celebrate those
            fleeting, unscripted moments of laughter, tears, and ritualistic
            embraces with you are what make your day special.
          </p>
         <div className="max-w-3xl mx-auto mt-10">

  <h2 className="text-2xl mb-6 text-[#41453D]">
    This is why couples choose us…
  </h2>

  <ul className="space-y-4 text-lg text-[#41453D]">
    
    <li className="flex items-start gap-3">
      <span className="text-xl">✦</span>
      <span>Custom Wedding Photography Packages</span>
    </li>

    <li className="flex items-start gap-3">
      <span className="text-xl">✦</span>
      <span>Over Ten Years of Experience</span>
    </li>

    <li className="flex items-start gap-3">
      <span className="text-xl">✦</span>
      <span>Utilizing The Latest Equipment & Techniques</span>
    </li>

    <li className="flex items-start gap-3">
      <span className="text-xl">✦</span>
      <span>Creative & Candid Photography Style</span>
    </li>

    <li className="flex items-start gap-3">
      <span className="text-xl">✦</span>
      <span>A Team of Leading Wedding Photographers in Bangalore</span>
    </li>

  </ul>

</div>
        </div>

        <div style={{ order: isMobile ? 0 : 1 }}>
          <ParallaxImg
           src="/serv3/img5.png"
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
          src="/about/about3.png"
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
              textAlign: isMobile ? "left" : "left",
            }}
          >
            Affordable Wedding Photographers in Bangaluru - Packages Customized
            For You
          </h2>
          <div
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 18,
              lineHeight: 1.85,
              color: "#3a3a35",
            }}
          >
            <p style={{ margin: "0 0 12px" }}>
              There are so many costs associated with planning a wedding, and we
              all know it is about striking a balance between quality and cost.
              This is why we have structured our pricing and packages so that we
              do our best to be accommodating. Included in our packages are:
            </p>
           <div className="max-w-3xl mx-auto text-[#41453D] leading-relaxed">

 
  <ul className="space-y-4 text-lg text-[#41453D]">
    
    <li className="flex items-start gap-3">
      <span className="text-xl">✦</span>
      <span>Partial wedding packages and full wedding packages</span>
    </li>

    <li className="flex items-start gap-3">
      <span className="text-xl">✦</span>
      <span>Over Ten Years of Experience</span>
    </li>

    <li className="flex items-start gap-3">
      <span className="text-xl">✦</span>
      <span>Utilizing The Latest Equipment & Techniques</span>
    </li>

   

  </ul>

  <p className="text-lg mb-6 mt-3">
    We would like to believe that we are one of the cheapest wedding
    photographers in Bangaluru without sacrificing creativity and
    professionalism.
  </p>

</div>
          </div>
        </div>
      </section>

      <Divider />

      <blockquote
        style={{
          margin: "40px 0 0",
          padding: "0 0 0 24px",
          borderLeft: "1px solid rgba(30,30,26,0.2)",
          fontFamily: "var(--font-editorial, serif)",
          fontWeight: 500,
          fontSize: 30,
          lineHeight: 1.5,
          color: "#1e1e1a",
          letterSpacing: "-0.01em",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Why We Are Among the Best Wedding Photographers in Bangalore?
        <cite
          style={{
            display: "block",
            marginTop: 12,
            fontFamily: "var(--font-neue-light, sans-serif)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "#000000",
            textTransform: "uppercase",
            fontStyle: "bold",
          }}
        >
          After documenting several hundred successful weddings, we are proud to{" "}
          <br />
          try ourselves with a reputation in the wedding photography industry in
          Bengaluru. Here’s why we stand apart:
        </cite>
      </blockquote>

      {/* ── SERVICES ── */}

      {/* <ScrollStorySection
        tag="Let's Turn Your Wedding Into a Cinematic Legacy"
        lines={[
          "Your wedding deserves more than a basic photo gallery. It deserves a story, an experience, a legacy",
          "If you're looking for luxury cinematic wedding photography in Bengaluru or planning a wedding anywhere in India or abroad, House of Bliss is here to create something extraordinary",
          "We invite you to connect with us, explore our past work, and begin your journey toward a timeless",
          "cinematic wedding photoshoot House of Bliss - Where Every Frame Tells a Love Story Worth Remembering.",
        ]}
        accentColor="#3b4237"
      /> */}

      <section style={{ padding: "100px 7%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 60px",
            alignItems: "start",
            marginBottom: 48,
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
              Our Process - How We Work With You
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 18,
              lineHeight: 1.85,
              color: "#3a3a35",
              margin: 0,
              paddingTop: 8,
            }}
          >
            From your first inquiry to the final photo delivery, our team
            ensures a smooth and enjoyable experience
          </p>
        </div>

        {/* travel images row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1.2fr",
            gap: 16,
            alignItems: "end",
          }}
        >
          <ParallaxImg
            src="/serv3/post1.webp"
            alt="Post Production"
            height={380}
            speed={0.06}
            title="Post Production"
            description=" After the shoot, we carefully edit and curate the best moments, offering you digital galleries, highlight reels, and handcrafted photo albums."
          />
          <ParallaxImg
            src="/serv3/consult1.webp"
            alt="travel"
            height={260}
            speed={0.04}
            title="Consultation & Booking"
            description=" We start by understanding your story, vision, and wedding plans. We then suggest the best photography package based on your requirements."
          />
          <ParallaxImg
            src="/serv3/shoot1.jpg"
            alt="mountains"
            height={310}
            speed={0.07}
            title="Shoot Day Preparation"
            description=" We coordinate with your wedding planner or family to create a shoot timeline and prepare for venue visits, lighting conditions, and rituals."
          />
          <ParallaxImg
            src="/serv3/big1.webp"
            alt="mountains"
            height={310}
            speed={0.07}
            title="The Big Day"
            description=" Our photographers arrive fully equipped and briefed, ready to cover every moment without being intrusive. You live your day-we capture it."
          />
        </div>

        {/* <div style={{ marginTop: 36 }}>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-neue-regular, sans-serif)",
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "#1e1e1a",
              textDecoration: "none",
              borderBottom: "1px solid rgba(30,30,26,0.3)",
              paddingBottom: 3,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "#1e1e1a")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                "rgba(30,30,26,0.3)")
            }
          >
            My travel schedule →
          </a>
        </div> */}
      </section>

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
          src="/serv3/love.jpeg"
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
              textAlign: isMobile ? "left" : "left",
            }}
          >
            Love Stories We've Captured
          </h2>
          <div
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 18,
              lineHeight: 1.85,
              color: "#3a3a35",
            }}
          >
            <p style={{ margin: "0 0 12px" }}>
              Over the years, we’ve had the honor of photographing over 300+
              weddings across India.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              From elegant Bangalore banquet weddings to exotic beach weddings
              in Goa, our lens has captured a wide array of emotions and
              aesthetics.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              Visit our portfolio to view real weddings and explore our
              storytelling style.
            </p>
          </div>
        </div>
      </section>

    

      <section style={{ padding: "100px 7%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 60px",
            alignItems: "start",
            marginBottom: 48,
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
              Hear from Happy Couples
            </h2>
          </div>
        </div>

        <blockquote
          style={{
            margin: "40px 0 0",
            padding: "0 0 0 24px",
            borderLeft: "1px solid rgba(30,30,26,0.2)",
            fontFamily: "var(--font-editorial, serif)",
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 1.5,
            color: "#1e1e1a",
            letterSpacing: "-0.01em",
            fontStyle: "italic",
            textAlign: "left",
          }}
        >
          Ananya & Ravi , Banglore
          <cite
            style={{
              display: "block",
              marginTop: 12,
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#000000",
              textTransform: "uppercase",
              fontStyle: "bold",
            }}
          >
            The House of Bliss team made us feel so comfortable! The candid
            shots were magical, and our wedding <br /> film made everyone cry.
            Thank you for making our day extra special
          </cite>
        </blockquote>

        <blockquote
          style={{
            margin: "40px 0 0",
            padding: "0 0 0 24px",
            borderLeft: "1px solid rgba(30,30,26,0.2)",
            fontFamily: "var(--font-editorial, serif)",
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 1.5,
            color: "#1e1e1a",
            letterSpacing: "-0.01em",
            fontStyle: "italic",
            textAlign: "left",
          }}
        >
          Krishna & Mansi , Whitefield
          <cite
            style={{
              display: "block",
              marginTop: 12,
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#000000",
              textTransform: "uppercase",
              fontStyle: "bold",
            }}
          >
            They are easily the best wedding photographers in Bangalore.
            Professional, punctual, and highly creative. <br/> Our photos turned out
            stunning!
          </cite>
        </blockquote>
      </section>

        <ScrollStorySection
        tag="Let’s Create Memories That Last Forever"
        lines={[
          "At House of Bliss, we don't just take pictures-we craft heirlooms.",
          "With each click, we preserve memories, emotions, and stories that will stay with you forever.",
          "Whether you're looking for affordable wedding photographers in Bangaluru or planning a grand destination wedding in Bangalore,",
          "we’re here to make your wedding photography journey seamless, beautiful, and unforgettable.",
        ]}
        accentColor="#3b4237"
      />
    </div>
    <FAQ/>
    </>
  );
}

export default page;


const faqs = [
  {
    question: "What unique wedding photo ideas does House of Bliss offer?",
    answer: "They provide creative wedding photo ideas blending candid moments with elegant poses and scenic Bengaluru backdrops.",
  },
  {
    question: "How does House of Bliss approach traditional wedding photography in Bengaluru?",
    answer: "Their traditional wedding photography in Bengaluru honors cultural rituals with refined composition and respectful documentation of each ceremony.",
  },
  {
    question: "Can you suggest creative wedding photoshoot themes suited for Bangalore couples?",
    answer: "Yes! romantic gardens, heritage architecture, and modern urban settings make for memorable creative wedding photoshoots in Bangalore.",
  },
  {
    question: "What makes House of Bliss one of the best wedding photography services in Bangalore?",
    answer: "Their artistic vision, emotional storytelling, and timely execution distinguish them among the best wedding photography services in Bangalore.",
  },
  {
    question: "Do you offer both traditional wedding photography and creative wedding photoshoot styles?",
    answer: "Yes! we seamlessly weave traditional wedding photography with imaginative creative wedding photoshoot ideas for well-rounded coverage.",
  },
  {
    question: "How does House of Bliss incorporate wedding photo ideas into packages?",
    answer: "They customize packages by blending classic shots, candid storytelling, and creative wedding photo ideas for varied client preferences.",
  },
  {
    question: "Can couples request traditional wedding photography styles in Bangalore?",
    answer: "Absolutely! our portfolio features authentic traditional wedding photography in Bengaluru tailored to cultural lighting, rituals, and emotion.",
  },
  {
    question: "What sets your creative wedding photoshoot apart in Bangalore’s wedding photography services?",
    answer: "We craft unexpected, cinematic compositions and personalized themes that redefine creative wedding photoshoot experiences in Bangalore.",
  },
  {
    question: "Are your wedding photography services in Bangalore inclusive of staged and candid photo ideas?",
    answer: "Yes! All packages include a thoughtful mix of staged traditional shots and candid wedding photo ideas to capture real emotion.",
  },
  {
    question: "Why choose House of Bliss for both traditional and creative wedding photography styles?",
    answer: "Our fusion of timeless traditional wedding photography and vibrant creative wedding photoshoot styles makes us standout in Bangalore.",
  },
];
function useInViewOnce(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function FAQRow({ faq, idx }: { faq: { question: string; answer: string }; idx: number }) {
  const { ref, inView } = useInViewOnce(0.1);
  // FIX: accordion open state for mobile
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${Math.min(idx * 60, 400)}ms`,
      }}
    >
      {/* Top border */}
      <div className="h-px bg-[#fdf9dc]/20 w-full" />

      {/* ── MOBILE: accordion layout ───────────────────────── */}
      <button
        className="md:hidden w-full text-left py-5 px-1 flex items-start gap-3 group focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {/* Number */}
        <span className="font-neue-light text-[#fdf9dc]/30 text-xs tracking-widest pt-1 flex-shrink-0 w-7">
          {String(idx + 1).padStart(2, '0')}
        </span>
        {/* Question */}
        <span className="flex-1 font-editorial text-[#fdf9dc] text-[1.1rem] leading-snug pr-2">
          {faq.question}
        </span>
        {/* Chevron */}
        <span
          className="flex-shrink-0 mt-1 transition-transform duration-300 text-[#fdf9dc]/50"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Mobile answer panel */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: open ? '400px' : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <p className="font-neue-light text-[#fdf9dc]/65 text-[0.95rem] leading-relaxed pb-5 pl-10 pr-2">
          {faq.answer}
        </p>
      </div>

      {/* ── DESKTOP: original side-by-side row layout ───────── */}
      <div className="hidden md:flex group relative flex-row items-start py-10 px-3">
        {/* Hover fill */}
        <div className="absolute inset-0 bg-[#fdf9dc]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm" />

        {/* Number */}
        <div className="w-12 flex-shrink-0 pt-1">
          <span className="font-neue-light text-[#fdf9dc]/30 text-sm tracking-widest">
            {String(idx + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Question */}
        <div className="w-[45%] pr-12 text-left font-editorial text-[1.35rem] md:text-[1.6rem] text-[#fdf9dc] leading-snug">
          {faq.question}
        </div>

        {/* Divider dot */}
        <div className="flex-shrink-0 w-4 pt-2 flex items-start justify-center">
          <span className="w-1 h-1 rounded-full bg-[#fdf9dc]/25 mt-2 group-hover:bg-[#fdf9dc]/60 transition-colors duration-300" />
        </div>

        {/* Answer */}
        <div className="flex-1 text-left font-neue-light text-[1rem] md:text-[1.05rem] text-[#fdf9dc]/65 leading-relaxed group-hover:text-[#fdf9dc]/85 transition-colors duration-300">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const { ref: headingRef, inView: headingIn } = useInViewOnce(0.3);

  return (
    <section className="w-full py-16 md:py-28 px-4 md:px-20 bg-[#41453D] relative overflow-hidden">

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-2 md:gap-4 transition-all duration-700"
          style={{
            opacity: headingIn ? 1 : 0,
            transform: headingIn ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {/* FIX: smaller heading on mobile */}
          <h2 className="font-editorial text-[2.4rem] sm:text-[3rem] md:text-[4.5rem] text-[#fdf9dc] leading-none">
            FAQ
          </h2>
          <p className="font-neue-light text-[#fdf9dc]/40 text-xs sm:text-sm tracking-[0.2em] uppercase md:pb-3">
            Frequently Asked Questions
          </p>
        </div>

        {/* FAQ list */}
        <div>
          {faqs.map((faq, idx) => (
            <FAQRow key={idx} faq={faq} idx={idx} />
          ))}
          {/* Final bottom border */}
          <div className="h-px bg-[#fdf9dc]/20 w-full" />
        </div>

      </div>
    </section>
  );
}

