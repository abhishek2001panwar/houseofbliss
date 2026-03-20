'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react'

const videos = [
  "https://res.cloudinary.com/degf7s9yn/video/upload/v1773901456/testimonial2_afgwa4.mp4",
  "https://res.cloudinary.com/degf7s9yn/video/upload/v1773901481/f_auto,q_auto/testimonial1_jsfz4e.mp4",
];

/* ─── Icons ─── */
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <polygon points="6,3 21,12 6,21" fill="currentColor" />
  </svg>
);
const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="5" height="18" rx="1.5" fill="currentColor" />
    <rect x="15" y="3" width="5" height="18" rx="1.5" fill="currentColor" />
  </svg>
);
const MuteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
    <line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
const UnmuteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

/* ─── VideoPlayer ─── */
function VideoPlayer({ src, index }: { src: string; index: number }) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCtrl, setShowCtrl] = useState(true);
  const [inView,   setInView]   = useState(false);
  const [loaded,   setLoaded]   = useState(false);

  /* Intersection observer — start playing when visible */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          const v = videoRef.current;
          if (v) { v.play().catch(() => {}); setPlaying(true); }
        } else {
          const v = videoRef.current;
          if (v) { v.pause(); setPlaying(false); }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Timeupdate */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => setProgress(vid.duration ? (vid.currentTime / vid.duration) * 100 : 0);
    const onMeta = () => setDuration(vid.duration);
    const onCan  = () => setLoaded(true);
    vid.addEventListener('timeupdate', onTime);
    vid.addEventListener('loadedmetadata', onMeta);
    vid.addEventListener('canplay', onCan);
    return () => {
      vid.removeEventListener('timeupdate', onTime);
      vid.removeEventListener('loadedmetadata', onMeta);
      vid.removeEventListener('canplay', onCan);
    };
  }, []);

  /* Auto-hide controls */
  const resetHide = useCallback(() => {
    setShowCtrl(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowCtrl(false), 3500);
  }, []);

  useEffect(() => {
    resetHide();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [resetHide]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
    resetHide();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    resetHide();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const v = videoRef.current;
    if (v && v.duration) {
      v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
    }
    resetHide();
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const currentTime = duration ? (progress / 100) * duration : 0;

  return (
    <div
      ref={wrapRef}
      onMouseMove={resetHide}
      onTouchStart={resetHide}
      onClick={togglePlay}
      style={{
        position: 'relative',
        width: '100%',
        /* True portrait ratio — never clipped */
        aspectRatio: '9 / 14',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#0a0a08',
        boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)',
        /* Staggered entrance */
        opacity: inView ? 1 : 0,
        transform: inView
          ? 'translateY(0) scale(1)'
          : 'translateY(48px) scale(0.95)',
        transition: `opacity 0.9s ease ${index * 0.15}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
      }}
    >
      {/* ── Loading shimmer ── */}
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 8,
          background: 'linear-gradient(135deg, #1a1a14 0%, #222218 50%, #1a1a14 100%)',
          backgroundSize: '200% 200%',
          animation: 'shimmer 1.8s ease infinite',
        }} />
      )}

      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* ── Gradient vignette ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `
          linear-gradient(to bottom,
            rgba(0,0,0,0.35) 0%,
            transparent 28%,
            transparent 55%,
            rgba(0,0,0,0.65) 100%
          )
        `,
      }} />

      {/* ── Decorative corner brackets ── */}
      {([['top','left'],['top','right'],['bottom','left'],['bottom','right']] as const).map(([v, h]) => (
        <div key={`${v}-${h}`} style={{
          position: 'absolute',
          [v]: 14, [h]: 14,
          width: 22, height: 22,
          zIndex: 10,
          pointerEvents: 'none',
          borderTop:    v === 'top'    ? '1.5px solid rgba(253,249,220,0.45)' : 'none',
          borderBottom: v === 'bottom' ? '1.5px solid rgba(253,249,220,0.45)' : 'none',
          borderLeft:   h === 'left'   ? '1.5px solid rgba(253,249,220,0.45)' : 'none',
          borderRight:  h === 'right'  ? '1.5px solid rgba(253,249,220,0.45)' : 'none',
          borderRadius:
            v === 'top'    && h === 'left'  ? '4px 0 0 0' :
            v === 'top'    && h === 'right' ? '0 4px 0 0' :
            v === 'bottom' && h === 'left'  ? '0 0 0 4px' : '0 0 4px 0',
        }} />
      ))}

      {/* ── Big center play overlay (shows when paused) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 6,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        opacity: !playing ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(253,249,220,0.12)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(253,249,220,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fdf9dc',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          transform: !playing ? 'scale(1)' : 'scale(0.85)',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <PlayIcon />
        </div>
      </div>

      {/* ── Bottom controls ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 16px 18px',
          zIndex: 9,
          opacity: showCtrl ? 1 : 0,
          transform: showCtrl ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {/* Progress bar */}
        <div
          onClick={handleSeek}
          style={{ padding: '12px 0 12px', cursor: 'pointer', margin: '0 0 10px' }}
        >
          <div style={{
            height: 3, borderRadius: 999,
            background: 'rgba(253,249,220,0.18)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #fdf9dc, #e8e2b0)',
              borderRadius: 999,
              transition: 'width 0.1s linear',
              boxShadow: '0 0 8px rgba(253,249,220,0.6)',
            }} />
          </div>
        </div>

        {/* Buttons row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(253,249,220,0.22)',
              background: 'rgba(253,249,220,0.1)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              color: '#fdf9dc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'background 0.2s, transform 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(253,249,220,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(253,249,220,0.1)')}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>

          {/* Mute / Unmute */}
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(253,249,220,0.22)',
              background: 'rgba(253,249,220,0.1)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              color: '#fdf9dc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'background 0.2s, transform 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(253,249,220,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(253,249,220,0.1)')}
          >
            {muted ? <MuteIcon /> : <UnmuteIcon />}
          </button>

          {/* Time */}
          <span style={{
            marginLeft: 'auto',
            color: 'rgba(253,249,220,0.6)',
            fontSize: 11,
            fontFamily: 'ui-monospace, monospace',
            letterSpacing: '0.06em',
          }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

/* ─── Section ─── */
const Testimonial: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setHeaderVisible(true), 80); },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F4F1E5] px-6 md:px-16 py-16 md:py-10 overflow-hidden"
    >
      {/* Header */}
      <div
        className="mb-10 md:mb-14"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-black mb-3">
          What our clients say
        </p>
        <div className="h-px w-full bg-[#41453D]/20" />
      </div>

      {/* Portrait video grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 420px))',
          gap: '16px',
          justifyContent: 'center',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {videos.map((src, i) => (
          <VideoPlayer key={i} src={src} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;