"use client";

import { useEffect, useRef, useState } from "react";
import ScrollStorySection from "../components/Scrollstorysection";
import Navbar from "../components/navbar";

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

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
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

// ── Parallax image ────────────────────────────────────────────────────────────
function ParallaxImg({ src, alt, height, speed = 0.06 }: { src: string; alt: string; height: number | string; speed?: number }) {
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
      <img src={src} alt={alt} style={{ position: "absolute", top: "-12%", left: 0, width: "100%", height: "124%", objectFit: "cover", transform: `translateY(${ty}px)`, willChange: "transform" }} />
    </div>
  );
}

// ── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Section divider ───────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 1, background: "rgba(30,30,26,0.08)", margin: "0 7%" }} />;
}

// ── Eyebrow label ─────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(30,30,26,0.38)", margin: "0 0 20px", fontFamily: "var(--font-neue-light, sans-serif)" }}>
      {children}
    </p>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const scrollY = useScrollY();

  return (
    <>
      <style>{`
        :root { --ink: #1e1e1a; --ink-60: rgba(30,30,26,0.6); --ink-35: rgba(30,30,26,0.35); --ink-10: rgba(30,30,26,0.10); --cream: #F4F1E5; }

        .about-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 80px; align-items: end; padding-bottom: 56px; }
        .about-intro    { padding: 40px 7%; display: grid; grid-template-columns: 1fr 1fr; gap: 0 72px; align-items: start; }
        .about-promise  { padding: 30px 7%; display: grid; grid-template-columns: 1fr 1fr; gap: 0 72px; align-items: center; }
        .about-bangalore{ padding: 30px 7%; display: grid; grid-template-columns: 1fr 1fr; gap: 0 80px; align-items: start; }
        .about-travel-header { display: grid; grid-template-columns: 1fr 1fr; gap: 0 72px; align-items: start; margin-bottom: 40px; }
        .about-travel-images { display: grid; grid-template-columns: 1.6fr 1fr 1.2fr; gap: 12px; align-items: end; }
        .travel-hide-mob { display: block; }

        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr; gap: 20px 0; padding-bottom: 36px; }
          .about-hero-pad  { padding: 110px 5% 0 !important; }
          .about-intro, .about-promise, .about-bangalore { padding: 48px 5%; grid-template-columns: 1fr; gap: 28px 0; }
          .about-intro .intro-text { padding-top: 0 !important; }
          .about-promise .promise-text { order: 2; }
          .about-promise .promise-img  { order: 1; }
          .about-bangalore .bangalore-img  { order: 1; }
          .about-bangalore .bangalore-text { order: 2; padding-top: 0 !important; }
          .about-travel-header { grid-template-columns: 1fr; gap: 16px 0; margin-bottom: 24px; }
          .about-travel-images { grid-template-columns: 1fr; gap: 10px; }
          .travel-hide-mob { display: none; }
          .about-travel-section { padding: 48px 5% !important; }
        }
      `}</style>

      <Navbar theme="dark" />

      <div style={{ background: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div
          className="about-hero-pad"
          style={{ padding: "150px 4% 0", borderBottom: "1px solid var(--ink-10)" }}
        >
          <div className="about-hero-grid">
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-editorial, serif)",
                  fontWeight: 300,
                  fontSize: "clamp(42px, 9vw, 118px)",
                  color: "var(--ink)",
                  margin: 0,
                  lineHeight: 0.88,
                  letterSpacing: "-0.03em",
                  transform: `translateY(${-scrollY * 0.07}px)`,
                  transition: "transform 0.05s linear",
                }}
              >
                About<br />
                <em>House of Bliss</em>
              </h1>
            </div>
            <Reveal delay={120}>
              <p style={{ fontSize: "clamp(15px, 1.8vw, 19px)", lineHeight: 1.8, color: "var(--ink-60)", margin: 0, maxWidth: 400 }}>
                If I'm thirdwheeling you on one of the most important days of your lives, you'd probably like to know who I am and why I do what I do.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── INTRO ────────────────────────────────────────────────────── */}
        <section className="about-intro">
          <Reveal>
            <ParallaxImg src="/about/about1.png" alt="photographer with camera" height={580} speed={0.055} />
          </Reveal>

          <div className="intro-text" style={{ paddingTop: 24 }}>
            <Reveal>
              <Eyebrow>Our story</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-editorial, serif)", fontWeight: 300, fontSize: "clamp(22px, 2.8vw, 40px)", color: "var(--ink)", margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
                Where Love Finds Its Most Beautiful Frame
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ fontSize: 16, lineHeight: 1.9, color: "var(--ink-60)" }}>
                <p style={{ margin: "0 0 14px" }}>Here in House of Bliss, we believe that all love stories should be told truthfully, emotionally, and artistically.</p>
                <p style={{ margin: "0 0 14px" }}>As one of the most trusted names in wedding storytelling, we take great pride in being able to offer the best wedding photography in Bangalore so we can continue to make your once-in-a-lifetime moments into treasures that last a lifetime.</p>
                <p style={{ margin: "0 0 14px" }}>By combining the often unnoticed elements of candid emotion, cinematic images, and mind-blowing drone videos, we offer not just wedding coverage but a heartfelt experience.</p>
                <p style={{ margin: 0 }}>That provides a pathway to relive your happiest moments forever.</p>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        <ScrollStorySection
          tag="Who we are"
          lines={[
            "House of Bliss is a community of photographers, filmmakers, editors, and dreamers who understand",
            "that weddings are so much more than just events they are love stories ready to be told.",
            "We launched with a mission to shape wedding photography, and since then, we have documented hundreds of weddings throughout Bangalore,",
            "and far beyond. We approach each wedding with new eyes, new hearts, and the same passionate quality. From a quiet moment of a gazing at each other,",
            "we will capture it all – honestly, beautifully, and meaningfully.",
          ]}
          accentColor="#3b4237"
        />

        {/* ── PROMISE ──────────────────────────────────────────────────── */}
        <section className="about-promise">
          <div className="promise-text">
            <Reveal>
              <Eyebrow>Our commitment</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-editorial, serif)", fontWeight: 300, fontSize: "clamp(22px, 2.8vw, 40px)", color: "var(--ink)", margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
                Emotions First, Always
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "var(--ink-60)", margin: 0 }}>
                We don't just take photos. We document love, laughter, joy, chaos, tears, and everything in between. What makes us the go-to team for couples looking for the best wedding photo session is our focus on natural storytelling. We don't stage; we observe. We don't direct; we follow your rhythm. And we never lose sight of what matters most: your story.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120} className="promise-img">
            <ParallaxImg src="/about/about2.png" alt="couple portrait" height={520} speed={0.06} />
          </Reveal>
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
            { title: "Complete Event Coverage",           desc: "From Haldi to Mehendi to Sangeet to Reception — our lens captures it all with artistic precision." },
          ]}
          closing="No matter how big or intimate your wedding is, our team brings the same passion and professionalism to every celebration."
        />

        {/* ── BANGALORE ────────────────────────────────────────────────── */}
        <section className="about-bangalore">
          <Reveal className="bangalore-img">
            <ParallaxImg src="/about/about3.png" alt="Bangalore wedding" height={500} speed={0.05} />
          </Reveal>

          <div className="bangalore-text" style={{ paddingTop: 10 }}>
            <Reveal>
              <Eyebrow>Why Bangalore trusts us</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-editorial, serif)", fontWeight: 300, fontSize: "clamp(22px, 2.8vw, 40px)", color: "var(--ink)", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
                Best Wedding Photography in Bangalore
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "var(--ink-60)", margin: "0 0 20px" }}>
                House of Bliss has become a name synonymous with quality, emotion, and creativity in the Bangalore wedding scene. Here's why couples trust us:
              </p>
              <ul style={{ margin: "0 0 28px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "A personalized approach to every wedding",
                  "Friendly, professional crew that feels like family",
                  "Seamless coordination with planners and venues",
                  "Quick turnaround with meticulous post-production",
                  "Packages tailored for every need — from minimal to majestic",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, color: "var(--ink-60)", lineHeight: 1.6 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ink-35)", flexShrink: 0, marginTop: 8 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160}>
              <div style={{ padding: "20px 22px", borderLeft: "1px solid var(--ink-10)", background: "rgba(30,30,26,0.025)" }}>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ink-60)", margin: 0 }}>
                  We understand Bangalore weddings — from vibrant South Indian traditions to contemporary cross-cultural fusions. Our local experience, combined with global aesthetics, helps us deliver the best wedding photography in Bangalore with style and soul.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        <ScrollStorySection
          tag="Aerial Views That Make Your Moments Soar"
          lines={[
            "Our drone videography service is a signature element of the House of Bliss experience. From capturing sweeping views of your venue to",
            "dynamic shots of the baraat, mandap, or bridal entry — our drone footage brings cinematic flair to your wedding story.",
            "Licensed pilots, strict safety protocols, and skilled editors ensure your aerial visuals are nothing short of spectacular.",
          ]}
          accentColor="#3b4237"
        />

        {/* ── TRAVEL / CLOSING ─────────────────────────────────────────── */}
        <section className="about-travel-section" style={{ padding: "30px 7%" }}>
          <div className="about-travel-header">
            <Reveal>
              <Eyebrow>Forever yours</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-editorial, serif)", fontWeight: 300, fontSize: "clamp(22px, 2.8vw, 40px)", color: "var(--ink)", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.12 }}>
                Your Love Story, Immortalized
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "var(--ink-60)", margin: 0, paddingTop: 8 }}>
                At House of Bliss, our goal is simple: to create imagery that makes your heart skip a beat, even decades from now. If you're searching for the best wedding photosession, planning your dream wedding in Bangalore, or looking to elevate your celebration with drone videography — we would be honoured to tell your story, frame by frame. Because your love deserves more than pictures.
              </p>
            </Reveal>
          </div>

          <div className="about-travel-images">
            <Reveal>
              <ParallaxImg src="/about/about4.png" alt="destination wedding" height={380} speed={0.06} />
            </Reveal>
            <Reveal delay={80} className="travel-hide-mob">
              <ParallaxImg src="/about/about2.png" alt="travel" height={260} speed={0.04} />
            </Reveal>
            <Reveal delay={160} className="travel-hide-mob">
              <ParallaxImg src="/about/about3.png" alt="mountains" height={310} speed={0.07} />
            </Reveal>
          </div>
        </section>

        <Divider />

      </div>
    </>
  );
}