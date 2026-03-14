"use client";

import { useEffect, useRef, useState } from "react";
import ScrollStorySection from "../components/Scrollstorysection";

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
}: {
  src: string;
  alt: string;
  height: number | string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ty, setTy] = useState(0);
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

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        height,
        width: "100%",
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

      {/* prev / next */}
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
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(255,255,255,0.22)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.8)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.4)";
          }}
        >
          {dir === "prev" ? "←" : "→"}
        </button>
      ))}

      {/* dots */}
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

      {/* counter */}
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

  return (
    <div
      style={{ background: "#fefee8", minHeight: "100vh", overflowX: "hidden" }}
    >
      {/* ── HERO ── */}
      <div
      className="pt-32"
        style={{
          padding: "190px 7% 0",
          borderBottom: "1px solid rgba(30,30,26,0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 60px",
            alignItems: "end",
            paddingBottom: 56,
          }}
        >
          {/* left: big heading */}
          <div>
           
            <h1
              style={{
                fontFamily: "var(--font-editorial, serif)",
                fontWeight: 300,
                fontSize: "clamp(52px, 9vw, 120px)",
                color: "#1e1e1a",
                margin: 0,
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                transform: `translateY(${-scrollY * 0.08}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              About
              <br />
              House of Bliss
            </h1>
          </div>

          {/* right: subtitle */}
          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: "clamp(14px, 1.4vw, 17px)",
              lineHeight: 1.75,
              color: "#3a3a35",
              margin: 0,
              maxWidth: 440,
            }}
          >
            If I'm thirdwheeling you on one of the most important days of your
            lives, you'd probably like to know who I am and why I do what I do.
          </p>
        </div>
      </div>

      {/* ── INTRO: two images + text block ── */}
      <section
        style={{
          padding: "80px 7%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 60px",
          alignItems: "start",
        }}
      >
        {/* Left col: stacked images */}
        <div
          style={{
            display: "",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 16,
            alignItems: "end",
          }}
        >
          <ParallaxImg
            src="/about/about1.png"
            alt="photographer with camera"
            height={480}
            speed={0.055}
          />
        
        </div>

        {/* Right col: text */}
        <div style={{ paddingTop: 40 }}>
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
            Where Love Finds Its Most Beautiful Frame
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
              Here in House of Bliss, we believe that all love stories should be
              told truthfully, emotionally, and artistically.
            </p>

            <p style={{ margin: "0 0 12px" }}>
              As one of the most trusted names in wedding storytelling, we take
              great pride in being able to offer the best wedding photography in
              Bangalore so we can continue to make your once-in-a-lifetime
              moments into treasures that last a lifetime.
            </p>

            <p style={{ margin: "0 0 12px" }}>
              By combining the often unnoticed elements of candid emotion,
              cinematic images, and mind-blowing drone videos, we offer not just
              wedding coverage but a heartfelt experience.
            </p>

            <p style={{ margin: 0 }}>
              That provides a pathway to relive your happiest moments forever.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <ScrollStorySection
        tag="Who we are"
        lines={[
          "House of Bliss is a community of photographers, filmmakers, editors, and dreamers who understand",
          "that weddings are so much more than just events they are love stories ready to be told.",
          "We launched with a mission to shape wedding photography, and since then, we have documented hundreds of weddings throughout Bangalore,",
          "and far beyond. We approach each wedding with new eyes, new hearts, and the same passionate quality.From a quiet moment of a gazing at each other, ",
          "we will capture it all – honestly, beautifully, and meaningfully.",
          "",
        ]}
        accentColor="#3b4237"
      />

      {/* ── PERSON OF OPPOSITES ── */}
      <section
        style={{
          padding: "80px 7%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 60px",
          alignItems: "center",
        }}
      >
        {/* left: text */}
        <div>
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
            Our Promise : Emotions First, Always
          </h2>
          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 13.5,
              lineHeight: 1.85,
              color: "#3a3a35",
              margin: 0,
            }}
          >
            We don’t just take photos. We document love, laughter, joy, chaos,
            tears, and everything in between. What makes us the go-to team for
            couples looking for the best wedding photo session is our focus on
            natural storytelling. We don’t stage; we observe. We don’t direct;
            we follow your rhythm. And we never lose sight of what matters most:
            your story.{" "}
          </p>

          {/* pull quote */}
          <blockquote
            style={{
              margin: "40px 0 0",
              padding: "0 0 0 24px",
              borderLeft: "1px solid rgba(30,30,26,0.2)",
              fontFamily: "var(--font-editorial, serif)",
              fontWeight: 300,
              fontSize: "clamp(16px, 1.8vw, 22px)",
              lineHeight: 1.5,
              color: "#1e1e1a",
              letterSpacing: "-0.01em",
              fontStyle: "italic",
            }}
          >
            "Some people never go crazy. What truly horrible lives they must
            live."
            <cite
              style={{
                display: "block",
                marginTop: 12,
                fontFamily: "var(--font-neue-light, sans-serif)",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "rgba(30,30,26,0.45)",
                textTransform: "uppercase",
                fontStyle: "normal",
              }}
            >
              - Charles Bukowski
            </cite>
          </blockquote>
        </div>

        {/* right: single image */}
        <ParallaxImg
          src="/about/about2.png"
          alt="kaat in landscape"
          height={520}
          speed={0.06}
        />
      </section>

      <Divider />

      
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
      {/* ── ADVENTUROUS YES-WOMAN ── */}
      <section
        style={{
          padding: "80px 7%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 80px",
          alignItems: "start",
        }}
      >
        {/* left: image */}
        <ParallaxImg
          src="/about/about3.png"
          alt="surf couple"
          height={500}
          speed={0.05}
        />

        {/* right: text */}
        <div style={{ paddingTop: 20 }}>
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
            Why We're Known for the Best Wedding Photography in Bangalore
          </h2>
          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 13.5,
              lineHeight: 1.85,
              color: "#3a3a35",
              margin: "0 0 20px",
            }}
          >
            House of Bliss has become a name synonymous with quality, emotion,
            and creativity in the Bangalore wedding scene. Here’s why couples
            trust us:
          </p>
          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 13.5,
              lineHeight: 1.85,
              color: "#3a3a35",
              margin: 0,
            }}
          >
            <li>A personalized approach to every wedding </li>
            <li>Friendly, professional crew that feels like family</li>
            <li>Seamless coordination with planners and venues</li>
            <li>Quick turnaround with meticulous post-production</li>
            <li>Packages tailored for every need-from minimal to majestic</li>
          </p>

          {/* current location pill */}
          <div
            style={{
              marginTop: 36,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              border: "1px solid rgba(30,30,26,0.18)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#3b4237",
                boxShadow: "0 0 0 3px rgba(59,66,55,0.2)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-neue-regular, sans-serif)",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#3a3a35",
              }}
            >
              We understand Bangalore weddings-from vibrant South Indian
              traditions to contemporary cross-cultural fusions. Our local
              experience, combined with global aesthetics, helps us deliver the
              best wedding photography in Bangalore with style and soul.
            </span>
          </div>
        </div>
      </section>

      <Divider />

       <ScrollStorySection
        tag="Aerial Views That Make Your Moments Soar"
        lines={[
          "Our drone videography service is a signature element of the House of Bliss experience. From capturing sweeping views of your venue to ",
          "dynamic shots of the baraat, mandap, or bridal entry-our drone footage brings cinematic flair to your wedding story.",
          "Licensed pilots, strict safety protocols, and skilled editors ensure your aerial visuals are nothing short of spectacular.",
       
        ]}
        accentColor="#3b4237"
      />

      {/* ── TRAVEL ── */}
      <section style={{ padding: "80px 7%" }}>
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
              Your Love Story, Immortalized
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-neue-light, sans-serif)",
              fontSize: 13.5,
              lineHeight: 1.85,
              color: "#3a3a35",
              margin: 0,
              paddingTop: 8,
            }}
          >
            At House of Bliss, our goal is simple: to create imagery that makes
            your heart skip a beat, even decades from now. If you’re searching
            for the best wedding photosession, planning your dream wedding in
            Bangalore, or looking to elevate your celebration with drone
            videography- we would be honoured to tell your story, frame by
            frame. Because your love deserves more than pictures.
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
            src="/about/about4.png"
            alt="destination wedding"
            height={380}
            speed={0.06}
          />
          <ParallaxImg
            src="/about/about2.png"
            alt="travel"
            height={260}
            speed={0.04}
          />
          <ParallaxImg
            src="/about/about3.png"
            alt="mountains"
            height={310}
            speed={0.07}
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

      <Divider />
    </div>
  );
}

export default page;

{
  /* ── MANIFESTO ── */
}
// <section style={{ padding: "80px 0 0" }}>
//   {/* header */}
//   <div style={{ padding: "0 7% 48px" }}>
//     <p
//       style={{
//         margin: "0 0 12px",
//         fontFamily: "var(--font-neue-light, sans-serif)",
//         fontSize: 10,
//         letterSpacing: "0.2em",
//         textTransform: "uppercase",
//         color: "rgba(30,30,26,0.4)",
//       }}
//     >
//       Carpe DM manifesto
//     </p>
//     <h2
//       style={{
//         fontFamily: "var(--font-editorial, serif)",
//         fontWeight: 300,
//         fontSize: "clamp(28px, 4vw, 56px)",
//         color: "#1e1e1a",
//         margin: 0,
//         letterSpacing: "-0.02em",
//         lineHeight: 1.1,
//       }}
//     >
//       10 rules to live by
//     </h2>
//   </div>

//   {/* full-bleed carousel */}
//   <ManifestoCarousel />

//   {/* rules list below */}
//   <div style={{ padding: "0 7%", marginTop: 60, marginBottom: 80 }}>
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(2, 1fr)",
//         gap: "0 60px",
//       }}
//     >
//       {MANIFESTO.map((item) => (
//         <div
//           key={item.n}
//           style={{
//             display: "flex",
//             gap: 20,
//             alignItems: "baseline",
//             padding: "18px 0",
//             borderBottom: "1px solid rgba(30,30,26,0.1)",
//           }}
//         >
//           <span
//             style={{
//               fontFamily: "var(--font-neue-light, monospace)",
//               fontSize: 10,
//               letterSpacing: "0.1em",
//               color: "rgba(30,30,26,0.35)",
//               flexShrink: 0,
//               width: 24,
//             }}
//           >
//             {item.n}
//           </span>
//           <p
//             style={{
//               margin: 0,
//               fontFamily: "var(--font-editorial, serif)",
//               fontWeight: 300,
//               fontSize: "clamp(14px, 1.4vw, 18px)",
//               color: "#1e1e1a",
//               lineHeight: 1.4,
//               letterSpacing: "-0.005em",
//             }}
//           >
//             {item.rule}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>
