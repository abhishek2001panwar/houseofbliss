'use client'

import { useRef, useState, useEffect } from 'react'

interface VideoCardProps {
  src: string
  delay?: number
}

function VideoCard({ src, delay = 0 }: VideoCardProps) {
  const videoRef  = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted,   setMuted]   = useState(true)
  const [inView,  setInView]  = useState(false)
  const wrapRef   = useRef<HTMLDivElement>(null)

  // Intersection reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (wrapRef.current) obs.observe(wrapRef.current)
    return () => obs.disconnect()
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden bg-[#0a0a0a] group"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        src={src}
        onClick={togglePlay}
        className="w-full cursor-pointer block"
        style={{
          height:     'clamp(400px, 60vw, 700px)',
          objectFit:  'cover',
          objectPosition: 'center center',
          display:    'block',
        }}
      />

      {/* ── Subtle vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* ── Center play/pause indicator (flashes on toggle) ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: playing ? 0 : 1, transition: 'opacity 0.3s ease' }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 64, height: 64,
            background: 'rgba(240,236,230,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(240,236,230,0.3)',
          }}
        >
          {/* Play icon */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <polygon points="7,4 19,11 7,18" fill="#f0ece6" />
          </svg>
        </div>
      </div>

      {/* ── Bottom-right controls ── */}
      <div
        className="absolute bottom-4 right-4 flex items-center gap-2 z-10"
        style={{
          opacity:    1,
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            width: 36, height: 36,
            background: 'rgba(10,9,8,0.55)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(240,236,230,0.2)',
            color: '#f0ece6',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(10,9,8,0.8)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,9,8,0.55)')}
        >
          {muted ? (
            /* Muted icon */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            /* Unmuted icon */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </button>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          className="flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            width: 36, height: 36,
            background: 'rgba(10,9,8,0.55)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(240,236,230,0.2)',
            color: '#f0ece6',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(10,9,8,0.8)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,9,8,0.55)')}
        >
          {playing ? (
            /* Pause icon */
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <rect x="0" y="0" width="4" height="14" rx="1"/>
              <rect x="8" y="0" width="4" height="14" rx="1"/>
            </svg>
          ) : (
            /* Play icon */
            <svg width="13" height="14" viewBox="0 0 13 14" fill="currentColor">
              <polygon points="0,0 13,7 0,14"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function VideoGrid() {
  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2" style={{ gap: 6 }}>
        <VideoCard
          src="https://res.cloudinary.com/dxcoo0eza/video/upload/v1774946987/IMG_6301_lmqlyl.mp4"
          delay={0}
        />
        <VideoCard
          src="https://res.cloudinary.com/dxcoo0eza/video/upload/v1774948443/IMG_6303_gzcuhm.mov"
          delay={120}
        />
      </div>
    </div>
  )
}