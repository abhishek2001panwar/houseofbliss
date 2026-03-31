"use client";
import Image from "next/image";
import Navbar from "../components/navbar";
import { useEffect, useRef, useState } from "react";
import VideoGrid from "../components/VideoGrid";

// ── Scroll Y ──────────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

// ── Intersection reveal ───────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ── Parallax image ────────────────────────────────────────────────────────────
function ParallaxImg({ src, alt, height, speed = 0.055 }: {
  src: string; alt: string; height: number | string; speed?: number;
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
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden", height, width: "100%" }}>
      <Image width={1200} height={1200} src={src} alt={alt} style={{
        position: "absolute", top: "-12%", left: 0,
        width: "100%", height: "124%", objectFit: "contain",
        transform: `translateY(${ty}px)`, willChange: "transform",
      }} />
    </div>
  );
}

// ── Word-by-word text animation ───────────────────────────────────────────────
function AnimatedWords({ text, baseDelay = 0, style = {}, dark = false }: {
  text: string; baseDelay?: number; style?: React.CSSProperties; dark?: boolean;
}) {
  const { ref, visible } = useReveal(0.12);
  const words = text.split(" ");
  return (
    <p ref={ref} style={{ margin: 0, lineHeight: 1.95, ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.26em" }}>
          <span style={{
            display: "inline-block",
            transform: visible ? "translateY(0)" : "translateY(115%)",
            opacity: visible ? 1 : 0,
            transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 30}ms, opacity 0.4s ease ${baseDelay + i * 30}ms`,
          }}>
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}

// ── Eyebrow ───────────────────────────────────────────────────────────────────
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <p style={{
        fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", margin: 0,
        color: light ? "rgba(253,246,227,0.5)" : "rgba(30,30,26,0.38)",
        fontFamily: "var(--font-neue-light, sans-serif)",
      }}>
        {children}
      </p>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const offers = [
  { num: "01", title: "Pre-Wedding & Couple Shoots",  desc: "Beautifully planned sessions that reflect your personalities and love story in every frame." },
  { num: "02", title: "Candid Wedding Photography",   desc: "Authentic, emotional, spontaneous moments captured discreetly and gracefully." },
  { num: "03", title: "Cinematic Wedding Films",      desc: "High-quality storytelling with cinematic editing and mood - crafted to move you every time you watch." },
  { num: "04", title: "Drone Videography",            desc: "Breathtaking aerial shots that add a grand, unforgettable perspective to your wedding film." },
  { num: "05", title: "Complete Event Coverage",      desc: "From Haldi to Mehendi to Sangeet to Reception - our lens captures it all with artistic precision." },
];

const stats = [
  { value: "10+",  label: "Years of storytelling" },
  { value: "500+", label: "Weddings documented" },
  { value: "12",   label: "Cities covered" },
  { value: "∞",    label: "Memories created" },
];

const trustPoints = [
  { title: "Personalised approach",       desc: "Every wedding is unique. We tailor our style, timeline, and team to fit your story perfectly." },
  { title: "Friendly, professional crew", desc: "Our crew feels like family by the end of the day - warm, low-key, always in the right place." },
  { title: "Seamless coordination",       desc: "We work hand-in-hand with your planners and venues so nothing is ever missed." },
  { title: "Quick, meticulous delivery",  desc: "Fast turnaround without cutting corners - your galleries are edited with obsessive attention to detail." },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const scrollY = useScrollY();

  return (
    <>
      <style>{`
        :root {
          --ink: #1e1e1a;
          --ink-60: rgba(30,30,26,0.60);
          --ink-35: rgba(30,30,26,0.30);
          --ink-10: rgba(30,30,26,0.08);
          --cream: #F4F1E5;
          --dark: #1a1917;
          --gold: #b69149;
        }
        .serif { font-family: Georgia, "Times New Roman", serif; }

        /* Premium glass card */
        .glass-card {
          background: rgba(255,255,255,0.52);
          border: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 2px 24px rgba(30,30,26,0.05);
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .glass-card:hover {
          background: rgba(255,255,255,0.75);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(30,30,26,0.10);
        }

        /* Dark glass card */
        .glass-dark {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .glass-dark:hover {
          background: rgba(255,255,255,0.10);
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.22);
        }

        /* Trust row hover */
        .trust-row {
          display: flex; gap: 20px; padding: 22px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          align-items: flex-start;
          transition: padding-left 0.3s ease;
          cursor: default;
        }
        .trust-row:hover { padding-left: 6px; }
        .trust-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }

        /* Grids */
        .grid-2   { display: grid; grid-template-columns: 1fr 1fr; gap: 0 72px; }
        .grid-2-r { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 0 72px; }
        .grid-3   { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        .grid-closing { display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px; align-items: stretch; }

        @media (max-width: 768px) {
          .grid-2, .grid-2-r, .grid-closing { grid-template-columns: 1fr; gap: 32px 0; }
          .grid-3 { grid-template-columns: 1fr; gap: 10px; }
          .mob-order-1 { order: 1; }
          .mob-order-2 { order: 2; }
          .hero-h1 { font-size: clamp(44px, 14vw, 90px) !important; }
          .section-p { padding: 52px 5% !important; }
        }
      `}</style>

      <Navbar theme="dark" />

      <div style={{ background: "var(--cream)", overflowX: "hidden" }}>

        {/* ══════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════ */}
        <div style={{ padding: "150px 4% 0", borderBottom: "1px solid var(--ink-10)" }}>
          <div className="grid-2" style={{ alignItems: "end", paddingBottom: 60 }}>
            <div>
              <h1
                className="font-serif hero-h1"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(52px, 6vw, 120px)",
                  color: "var(--ink)",
                  margin: 0,
                  lineHeight: 0.87,
                  letterSpacing: "-0.035em",
                  transform: `translateY(${-scrollY * 0.07}px)`,
                  transition: "transform 0.05s linear",
                }}
              >
                About<br /><em>House of Bliss</em>
              </h1>
            </div>
            <Reveal delay={150}>
              <div style={{ paddingBottom: 8 }}>
                <div style={{ width: 32, height: 1, background: "var(--ink-35)", marginBottom: 24 }} />
                <p style={{ fontSize: "clamp(15px, 1.7vw, 18px)", lineHeight: 1.85, color: "var(--ink-60)", margin: "0 0 28px", maxWidth: 380 }}>
                  If I'm thirdwheeling you on one of the most important days of your lives, you'd probably like to know who I am - and why I do what I do.
                </p>
               
              </div>
            </Reveal>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            INTRO — image left, text right
        ══════════════════════════════════════════════════════════════ */}
        <section className="section-p" style={{ padding: "10px 6%" }}>
          <div className="grid-2" style={{ alignItems: "center" }}>
            <Reveal className="mob-order-2">
              <ParallaxImg src="/about/about1.png" alt="photographer" height={580} speed={0.055} />
            </Reveal>
            <div className="mob-order-1">
              <Reveal>
                <Eyebrow>Our story</Eyebrow>
                <h2 className="font-serif" style={{ fontWeight: 400, fontSize: "clamp(24px, 2.8vw, 40px)", color: "var(--ink)", margin: "0 0 28px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                  Where Love Finds Its Most Beautiful Frame
                </h2>
              </Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <AnimatedWords baseDelay={0} style={{ fontSize: 15.5, color: "var(--ink-60)" }}
                  text="Here in House of Bliss, we believe that all love stories should be told truthfully, emotionally, and artistically." />
                <AnimatedWords baseDelay={80} style={{ fontSize: 15.5, color: "var(--ink-60)" }}
                  text="As one of the most trusted names in wedding storytelling, we take great pride in offering the best wedding photography in Bangalore - making your once-in-a-lifetime moments into treasures that last forever." />
                <AnimatedWords baseDelay={160} style={{ fontSize: 15.5, color: "var(--ink-60)" }}
                  text="By combining candid emotion, cinematic images, and drone videography, we offer not just coverage - but a heartfelt experience." />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            WHO WE ARE — dark section, full bleed
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--dark)", padding: "88px 6%" }}>
          <div className="grid-2" style={{ alignItems: "start", gap: "0 80px" }}>

            {/* Left — heading + stats */}
            <div>
              <Reveal>
                <Eyebrow light>Who we are</Eyebrow>
                <h2 className="serif" style={{
                  fontWeight: 400, fontSize: "clamp(28px, 3.5vw, 52px)",
                  color: "#fdf6e3", margin: "0 0 36px",
                  letterSpacing: "-0.03em", lineHeight: 1.05,
                }}>
                  A Community of<br /><em>Dreamers &amp;<br />Storytellers</em>
                </h2>
              </Reveal>

              {/* Pull quote */}
              <Reveal delay={200}>
                <div style={{ borderLeft: "1px solid rgba(182,145,73,0.6)", paddingLeft: 22 }}>
                  <p className="serif" style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(253,246,227,0.85)", margin: "0 0 10px", lineHeight: 1.6, fontStyle: "italic" }}>
                    "We approach each wedding with new eyes, new hearts, and the same passionate commitment."
                  </p>
                  <span style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(253,246,227,0.3)" }}>
                    House of Bliss
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right — animated body copy */}
            <div style={{ paddingTop: 6 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
                <AnimatedWords dark baseDelay={0}
                  style={{ fontSize: 16, color: "rgba(253,246,227,0.62)" }}
                  text="House of Bliss is a community of photographers, filmmakers, editors, and dreamers who understand that weddings are so much more than just events - they are love stories ready to be told." />
                <AnimatedWords dark baseDelay={100}
                  style={{ fontSize: 16, color: "rgba(253,246,227,0.62)" }}
                  text=" We launched with a mission to shape wedding photography, and since then we have documented hundreds of weddings throughout  and far beyond." />
                <AnimatedWords dark baseDelay={180}
                  style={{ fontSize: 16, color: "rgba(253,246,227,0.62)" }}
                  text="From a quiet glance across the mandap to a euphoric dance floor moment - we capture it all, honestly, beautifully, and meaningfully." />
              </div>

           
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            WHAT WE OFFER — glass cards on cream
        ══════════════════════════════════════════════════════════════ */}
        <section className="section-p" style={{ padding: "88px 6%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <Reveal>
              <Eyebrow>What we offer</Eyebrow>
              <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(24px, 3vw, 40px)", color: "var(--ink)", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.1, maxWidth: 500 }}>
                Every Chapter of Your Day,  Beautifully Told
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p style={{ fontSize: 13, color: "var(--ink-35)", maxWidth: 260, lineHeight: 1.75, margin: 0, textAlign: "right" }}>
                No matter how big or intimate - same passion, same professionalism.
              </p>
            </Reveal>
          </div>

          <div className="grid-3">
            {offers.map((o, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="glass-card" style={{ padding: "32px 28px 36px", height: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 9, letterSpacing: "0.38em", color: "var(--ink-35)", fontFamily: "var(--font-neue-light,sans-serif)" }}>
                      {o.num}
                    </span>
                   
                  </div>
                  <div style={{ width: "100%", height: 1, background: "var(--ink-10)" }} />
                  <h3 className="serif" style={{ fontSize: "clamp(15px, 1.4vw, 17px)", fontWeight: 400, color: "var(--ink)", margin: 0, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                    {o.title}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--ink-60)", margin: 0, flex: 1 }}>
                    {o.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            WHY BANGALORE TRUSTS US — dark, full bleed
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--dark)", padding: "88px 6%" }}>
          {/* Top heading row */}
          <div className="grid-2" style={{ alignItems: "end", marginBottom: 64, gap: "0 80px" }}>
            <Reveal>
              <Eyebrow light>Why  trusts us</Eyebrow>
              <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(28px, 3.5vw, 52px)", color: "#fdf6e3", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                The City's Most<br /><em>Trusted Wedding<br />Photographers</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ paddingBottom: 4 }}>
                <AnimatedWords dark baseDelay={0}
                  style={{ fontSize: 15.5, color: "rgba(253,246,227,0.58)", marginBottom: 20 }}
                  text="House of Bliss has become a name synonymous with quality, emotion, and creativity in the  wedding scene." />
                <AnimatedWords dark baseDelay={120}
                  style={{ fontSize: 15.5, color: "rgba(253,246,227,0.58)" }}
                  text="Our  experience combined with global aesthetics helps us deliver photography that carries both style and soul." />
              </div>
            </Reveal>
          </div>

          {/* Trust points grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 1, background: "rgba(255,255,255,0.06)" }}>
            {trustPoints.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="glass-dark" style={{ padding: "32px 28px", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "var(--gold)", fontFamily: "var(--font-neue-light,sans-serif)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1, height: 1, background: "rgba(182,145,73,0.25)" }} />
                  </div>
                  <h3 className="serif" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 400, color: "#fdf6e3", margin: "0 0 10px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(253,246,227,0.5)", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom quote */}
          <Reveal delay={400}>
            <div style={{ marginTop: 56, textAlign: "center" }}>
              <p className="serif" style={{ fontSize: "clamp(18px, 2.2vw, 26px)", color: "rgba(253,246,227,0.8)", margin: "0 auto 12px", lineHeight: 1.5, fontStyle: "italic", maxWidth: 600 }}>
                "We understand  weddings and we pour our hearts into every single one."
              </p>
            </div>
          </Reveal>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CLOSING — two columns
        ══════════════════════════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════════════════════════
    CLOSING — text row + two videos below
══════════════════════════════════════════════════════════════ */}
<section className="section-p" style={{ padding: "98px 4%" }}>

  {/* Top text row — two columns */}
  <div className="grid-closing" style={{ gap: "0 10px", marginBottom: 20 }}>

    {/* Left */}
    <Reveal>
      <div>
        <Eyebrow>Forever yours</Eyebrow>
        <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(24px, 2.8vw, 40px)", color: "var(--ink)", margin: "0 0 20px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
          Your Love Story,<br /><em>Immortalized</em>
        </h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "var(--ink-60)", margin: 0 }}>
          At House of Bliss, our goal is simple: to create imagery that makes your heart skip a beat, even decades from now. Because your love deserves more than pictures - it deserves a legacy.
        </p>
      </div>
    </Reveal>

    {/* Right — quote block */}
    {/* <Reveal delay={100}>
      <div style={{
        background: "var(--dark)", padding: "28px 30px",
        border: "1px solid rgba(30,30,26,0.12)", height: "100%",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <p className="serif" style={{ fontSize: "clamp(14px, 1.4vw, 17px)", color: "#fdf6e3", margin: "0 0 14px", lineHeight: 1.65, fontStyle: "italic" }}>
          "We don't stage; we observe. We don't direct; we follow your rhythm."
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 16, height: 1, background: "var(--gold)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(253,246,227,0.35)" }}>
            House of Bliss
          </span>
        </div>
      </div>
    </Reveal> */}

  </div>

  {/* Two videos side by side — same row, minimal gap */}
  {/* <Reveal delay={80}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      <video
        autoPlay muted loop playsInline
        src="https://res.cloudinary.com/dxcoo0eza/video/upload/v1774514626/PRAKRUTHI_SUDARSHAN_3_1_1_1_tfim5k_amist3_1_cxictn.webm"
        style={{ width: "100%", height: 600, objectFit: "cover", display: "block" }}
      />
      <video
        autoPlay muted loop playsInline
        src="https://res.cloudinary.com/dxcoo0eza/video/upload/v1774945798/WhatsApp_Video_2026-03-31_at_1.58.56_PM_oqgucl.mp4"
        style={{ width: "100%", height: 600, objectFit: "cover", display: "block" }}
      />
    </div>
  </Reveal> */}
  <VideoGrid />

</section>

      </div>
    </>
  );
}