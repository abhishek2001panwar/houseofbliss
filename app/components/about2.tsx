'use client'
import React, { useRef, useEffect, useState } from 'react'

const About2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView,     setInView]     = useState(false);
  const [imgScale,   setImgScale]   = useState(0.82);
  const [imgRadius,  setImgRadius]  = useState(32);
  const [textReady,  setTextReady]  = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;

      if (visible) {
        if (!inView) {
          setInView(true);
          // slight delay so text animates after video starts scaling
          setTimeout(() => setTextReady(true), 300);
        }
        const progress = Math.min(
          Math.max((window.innerHeight - rect.top) / (window.innerHeight * 0.75), 0),
          1
        );
        setImgScale(0.82 + 0.18 * progress);
        setImgRadius(32 * (1 - progress));
      } else {
        setInView(false);
        setTextReady(false);
        setImgScale(0.82);
        setImgRadius(32);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [inView]);

  return (
    <>
      <style>{`
        @keyframes hob-line-in {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes hob-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hob-tag-spread {
          from { opacity: 0; letter-spacing: 0.5em; }
          to   { opacity: 1; letter-spacing: 0.22em; }
        }
        .about2-tag  { animation: hob-tag-spread  0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .about2-h2   { animation: hob-fade-up     0.9s cubic-bezier(0.16,1,0.3,1) 0.14s both; }
        .about2-body { animation: hob-fade-up     0.9s cubic-bezier(0.16,1,0.3,1) 0.26s both; }
        .about2-rule { 
          transform-origin: left;
          animation: hob-line-in  0.8s cubic-bezier(0.16,1,0.3,1) 0.38s both;
        }
        .about2-stat { animation: hob-fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          width: '100%',
          /* full viewport height on md+, auto on mobile so text isn't crushed */
          minHeight: 'min(100vh, 700px)',
          background: '#F4F1E5',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
        }}
      >
        {/* ── Video - scale + border-radius reveal ── */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <video
            src="https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893160/S_S_RECEPTION_TEASER_zsf5kg.mp4"
            loop autoPlay muted playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${imgScale})`,
              borderRadius: `${imgRadius}px`,
              willChange: 'transform, border-radius',
              transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), border-radius 0.45s ease',
              display: 'block',
            }}
          />
        </div>

        {/* ── Gradient vignette (scales with video) ── */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            transform: `scale(${imgScale})`,
            borderRadius: `${imgRadius}px`,
            transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), border-radius 0.45s ease',
            background: `
              linear-gradient(to top,  rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.22) 38%, transparent 55%),
              linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 55%)
            `,
          }}
        />

        {/* ── Corner accent (top-right) ── */}
        <div style={{
          position: 'absolute', top: 28, right: 28, zIndex: 5,
          width: 22, height: 22,
          borderTop:   '1.5px solid rgba(253,249,220,0.35)',
          borderRight: '1.5px solid rgba(253,249,220,0.35)',
          opacity: textReady ? 1 : 0,
          transition: 'opacity 0.6s ease 0.7s',
        }} />
        <div style={{
          position: 'absolute', bottom: 28, left: 28, zIndex: 5,
          width: 22, height: 22,
          borderBottom: '1.5px solid rgba(253,249,220,0.35)',
          borderLeft:   '1.5px solid rgba(253,249,220,0.35)',
          opacity: textReady ? 1 : 0,
          transition: 'opacity 0.6s ease 0.7s',
        }} />

        {/* ── Text block - bottom left ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            /* responsive padding */
            padding: 'clamp(20px, 5vw, 80px) clamp(20px, 5vw, 80px) clamp(28px, 6vh, 72px)',
            maxWidth: 'min(730px, 100vw)',
          }}
        >
          {/* Tag */}
          {textReady && (
            <p
              className="about2-tag"
              style={{
                fontSize: 'clamp(8px, 1.8vw, 10px)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(253,249,220,0.5)',
                margin: '0 0 14px',
              }}
            >
              Our Story
            </p>
          )}

          {/* Heading */}
          {textReady && (
            <h2
              className="about2-h2"
              style={{
                fontSize: 'clamp(24px, 4.5vw, 58px)',
                fontWeight: 300,
                color: '#fdf9dc',
                margin: '0 0 16px',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Where Your Love Story<br />Takes Centre Stage.
            </h2>
          )}

          {/* Rule */}
          {textReady && (
            <div
              className="about2-rule"
              style={{
                height: 1,
                width: 'clamp(32px, 5vw, 60px)',
                background: 'rgba(253,249,220,0.3)',
                marginBottom: 16,
              }}
            />
          )}

          {/* Body */}
          {textReady && (
            <p
              className="about2-body"
              style={{
                fontSize: 'clamp(13px, 1.8vw, 16px)',
                lineHeight: 1.82,
                color: 'rgba(253,249,220,0.72)',
                margin: '0 0 clamp(20px, 3.5vh, 36px)',
                maxWidth: 400,
              }}
            >
              We believe every couple has a unique tale waiting to be told
              with artistry, intention, and deep emotion.
            </p>
          )}

          {/* Stats row */}
          {/* {textReady && (
            <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 44px)', alignItems: 'flex-start' }}>
              {[
                { num: '500+', label: 'Weddings' },
                { num: '8+',   label: 'Years' },
                { num: '12',   label: 'Cities' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="about2-stat"
                  style={{ animationDelay: `${0.38 + i * 0.1}s` }}
                >
                  <p style={{
                    margin: 0,
                    fontFamily: 'var(--font-editorial, Georgia, serif)',
                    fontSize: 'clamp(20px, 3.5vw, 34px)',
                    fontWeight: 300,
                    color: '#fdf9dc',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {stat.num}
                  </p>
                  <p style={{
                    margin: '5px 0 0',
                    fontFamily: 'var(--font-neue-light, sans-serif)',
                    fontSize: 'clamp(8px, 1.5vw, 10px)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(253,249,220,0.42)',
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )} */}
        </div>

        {/* ── Grain overlay ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.032,
          backgroundSize: '140px 140px',
        }} />
      </section>
    </>
  );
};

export default About2;