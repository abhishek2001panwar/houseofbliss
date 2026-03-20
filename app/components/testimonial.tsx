'use client'
import React, { useRef } from 'react'

const videos = [
  "https://res.cloudinary.com/degf7s9yn/video/upload/v1773901456/testimonial2_afgwa4.mp4",
  "https://res.cloudinary.com/degf7s9yn/video/upload/v1773901481/testimonial1_jsfz4e.mp4",
];

/* ─── VideoPlayer ─── */
function VideoPlayer({ src, index }: { src: string; index: number }) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '9 / 16',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#000',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        autoPlay
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
    </div>
  );
}

/* ─── Section ─── */
const Testimonial: React.FC = () => {
  return (
    <section
      className="w-full bg-[#F4F1E5] px-6 md:px-12 py-20 md:py-24"
    >
      {/* Header */}
      <div className="mb-16">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-black mb-3">
          What our clients say
        </p>
        <div className="h-px w-full bg-[#41453D]/20" />
      </div>

      {/* Video grid - small and compact */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 280px))',
          gap: '24px',
          justifyContent: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {videos && videos.length > 0 ? videos.map((src, i) => (
          <VideoPlayer key={i} src={src} index={i} />
        )) : <p className="text-center text-gray-500">Loading...</p>}
      </div>
    </section>
  );
};

export default Testimonial;