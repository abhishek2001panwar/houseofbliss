'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react'

const scaleVideo = "https://res.cloudinary.com/degf7s9yn/video/upload/v1773635588/test_1_muzg2h.mp4";

// ── Icons ─────────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="5" y="3" width="4" height="18" rx="1" />
    <rect x="15" y="3" width="4" height="18" rx="1" />
  </svg>
);

const MuteIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UnmuteIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const Testimonial: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const hideTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [inView,          setInView]          = useState(false);
  const [headerVisible,   setHeaderVisible]   = useState(false);
  const [playing,         setPlaying]         = useState(true);
  const [muted,           setMuted]           = useState(true);
  const [progress,        setProgress]        = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isMobile,        setIsMobile]        = useState(false);

  // ── Detect mobile ─────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── IntersectionObserver ──────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setHeaderVisible(true), 100);
          setTimeout(() => setInView(true), 350);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // ── Video progress ────────────────────────────────────────────────────────
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => setProgress((vid.currentTime / vid.duration) * 100 || 0);
    vid.addEventListener('timeupdate', onTime);
    return () => vid.removeEventListener('timeupdate', onTime);
  }, []);

  // ── Auto-hide controls ────────────────────────────────────────────────────
  const resetHideTimer = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), isMobile ? 3500 : 2800);
  }, [isMobile]);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [resetHideTimer]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else            { vid.pause(); setPlaying(false); }
    resetHideTimer();
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
    resetHideTimer();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const vid   = videoRef.current;
    if (vid && vid.duration) {
      vid.currentTime = ratio * vid.duration;
      setProgress(ratio * 100);
    }
    resetHideTimer();
  };

  // Mobile: tap video to toggle controls; desktop: tap to play/pause
  const handleVideoTap = () => {
    if (isMobile) {
      if (controlsVisible) {
        setControlsVisible(false);
        if (hideTimer.current) clearTimeout(hideTimer.current);
      } else {
        resetHideTimer();
      }
    } else {
      togglePlay();
    }
  };

  const btnSize = isMobile ? 40 : 48;

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes letterSpread {
          from { opacity: 0; letter-spacing: 0.4em; }
          to   { opacity: 1; letter-spacing: 0.18em; }
        }
        .hob-tag     { animation: letterSpread 1s cubic-bezier(0.16,1,0.3,1) both; }
        .hob-heading { animation: fadeSlideUp  1s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .hob-rule    { transform-origin: left; animation: revealLine 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }

        .hob-video-wrap {
          transition: transform 1.6s cubic-bezier(0.16,1,0.3,1), opacity 1.2s ease;
        }
        .hob-control-btn {
          background: rgba(253,249,220,0.08);
          border: 1px solid rgba(253,249,220,0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fdf9dc;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: background 0.2s ease, transform 0.15s ease, border-color 0.2s ease;
        }
        .hob-control-btn:hover  { background: rgba(253,249,220,0.18); border-color: rgba(253,249,220,0.38); transform: scale(1.08); }
        .hob-control-btn:active { transform: scale(0.93); }

        .hob-progress-track {
          cursor: pointer;
          border-radius: 999px;
          position: relative;
          /* big touch hit-area via padding */
          padding: 10px 0;
          margin: -10px 0;
          box-sizing: content-box;
        }
        .hob-progress-inner {
          height: 3px;
          background: rgba(253,249,220,0.22);
          border-radius: 999px;
          overflow: hidden;
        }
        .hob-progress-fill {
          height: 100%;
          border-radius: 999px;
          background: #fdf9dc;
          pointer-events: none;
          transition: width 0.1s linear;
        }
        .hob-controls { transition: opacity 0.4s ease; }

        @media (max-width: 767px) {
          .hob-corner { width: 12px !important; height: 12px !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        onMouseMove={isMobile ? undefined : resetHideTimer}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: isMobile ? 'auto' : '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#41453D',
          overflow: 'hidden',
          padding: isMobile
            ? 'clamp(40px, 8vh, 64px) 0 clamp(28px, 5vh, 48px)'
            : 'clamp(56px, 10vh, 100px) 0 clamp(40px, 6vh, 72px)',
        }}
      >
        {/* Grain */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.35,
        }} />

        {/* Header */}
        <div style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          padding: '0 20px',
          marginBottom: isMobile ? 'clamp(20px, 4vh, 32px)' : 'clamp(28px, 5vh, 52px)',
          opacity: headerVisible ? 1 : 0,
          transition: 'opacity 0.01s',
        }}>
          <p className="hob-tag" style={{
            fontFamily: 'var(--font-neue-light, sans-serif)',
            fontSize: isMobile ? 9 : 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(253,249,220,0.45)',
            margin: '0 0 12px',
            animationPlayState: headerVisible ? 'running' : 'paused',
          }}>
            What our clients say
          </p>
          <h2 className="hob-heading" style={{
            fontFamily: 'var(--font-editorial, Georgia, serif)',
            fontSize: isMobile ? 'clamp(26px, 7vw, 38px)' : 'clamp(32px, 5vw, 68px)',
            fontWeight: 300,
            color: '#fdf9dc',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            animationPlayState: headerVisible ? 'running' : 'paused',
          }}>
            Testimonials
          </h2>
          <div className="hob-rule" style={{
            height: 1,
            background: 'rgba(253,249,220,0.22)',
            marginTop: 16,
            width: 'clamp(28px, 6vw, 80px)',
            marginLeft: 'auto', marginRight: 'auto',
            animationPlayState: headerVisible ? 'running' : 'paused',
          }} />
        </div>

        {/* Video container */}
        <div
          className="hob-video-wrap"
          style={{
            position: 'relative',
            zIndex: 2,
            width: isMobile ? 'calc(100% - 32px)' : 'clamp(300px, 88vw, 900px)',
            // portrait on mobile, landscape on desktop
            aspectRatio: isMobile ? '9 / 16' : '16 / 9',
            transform: inView ? 'scale(1)' : 'scale(0.88)',
            opacity: inView ? 1 : 0,
          }}
        >
          {/* Corner accents */}
          {(['top-left','top-right','bottom-left','bottom-right'] as const).map(pos => {
            const isTop  = pos.includes('top');
            const isLeft = pos.includes('left');
            return (
              <div key={pos} className="hob-corner" style={{
                position: 'absolute',
                [isTop  ? 'top'    : 'bottom']: -1,
                [isLeft ? 'left'   : 'right' ]: -1,
                width: 18, height: 18,
                borderTop:    isTop  ? '1.5px solid rgba(253,249,220,0.4)' : 'none',
                borderBottom: !isTop ? '1.5px solid rgba(253,249,220,0.4)' : 'none',
                borderLeft:   isLeft ? '1.5px solid rgba(253,249,220,0.4)' : 'none',
                borderRight: !isLeft ? '1.5px solid rgba(253,249,220,0.4)' : 'none',
                zIndex: 10,
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.4s ease',
                transitionDelay: '0.8s',
              }} />
            );
          })}

          <video
            ref={videoRef}
            src={scaleVideo}
            autoPlay loop muted playsInline
            onClick={handleVideoTap}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
          />

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(30,30,26,0.65) 0%, transparent 38%, transparent 68%, rgba(30,30,26,0.25) 100%)',
            zIndex: 2,
          }} />

          {/* Controls */}
          <div
            className="hob-controls"
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: isMobile ? '14px 14px 16px' : '20px',
              zIndex: 5,
              opacity: controlsVisible ? 1 : 0,
            }}
          >
            <div
              className="hob-progress-track"
              onClick={handleSeek}
              style={{ marginBottom: isMobile ? 10 : 14 }}
            >
              <div className="hob-progress-inner">
                <div className="hob-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 10 }}>
              <button
                className="hob-control-btn"
                onClick={togglePlay}
                aria-label={playing ? 'Pause' : 'Play'}
                style={{ width: btnSize, height: btnSize }}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                className="hob-control-btn"
                onClick={toggleMute}
                aria-label={muted ? 'Unmute' : 'Mute'}
                style={{ width: btnSize, height: btnSize }}
              >
                {muted ? <MuteIcon /> : <UnmuteIcon />}
              </button>

              {/* Mobile hint when muted */}
              {isMobile && muted && (
                <span style={{
                  marginLeft: 4, fontSize: 9, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'rgba(253,249,220,0.45)',
                  fontFamily: 'var(--font-neue-light, sans-serif)',
                }}>
                  Tap to unmute
                </span>
              )}
            </div>
          </div>

          {/* Mobile: ghost hint when controls hidden */}
          {isMobile && !controlsVisible && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 4,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              paddingBottom: 20, pointerEvents: 'none',
            }}>
              <span style={{
                fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(253,249,220,0.25)',
                fontFamily: 'var(--font-neue-light, sans-serif)',
              }}>
                tap for controls
              </span>
            </div>
          )}
        </div>

        {/* Bottom label */}
        <p style={{
          position: 'relative', zIndex: 2,
          fontFamily: 'var(--font-neue-light, sans-serif)',
          fontSize: isMobile ? 9 : 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(253,249,220,0.28)',
          marginTop: isMobile ? 'clamp(12px, 2.5vh, 20px)' : 'clamp(18px, 3vh, 32px)',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease 1.2s',
          textAlign: 'center',
          padding: '0 16px',
        }}>
          House of Bliss - Real Stories
        </p>
      </section>
    </>
  );
};

export default Testimonial;