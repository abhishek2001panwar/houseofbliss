'use client'
import React, { useRef, useEffect, useState } from 'react'


const scaleVideo = "https://houseofbliss.co.in/wp-content/uploads/2025/06/HOB-PROMO-reel.mp4";

const Testimonial: React.FC = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      setInView(rect.top < window.innerHeight && rect.bottom > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[122vh] flex flex-col items-center justify-center overflow-hidden bg-[#41453D]">
      
      <h2 className="text-center font-editorial text-3xl md:text-6xl mb-10 text-[#fdf9dc]">Testimonial</h2>
      <div
        ref={videoRef}
        className={`w-full h-[60vh] md:h-[92vh] flex items-end justify-center transition-transform duration-[1600ms] ease-out relative ${inView ? "scale-95 opacity-100" : "scale-0 opacity-0"}`}
      >
        <div className="relative w-full h-full max-w-4xl">
          <video
            src={scaleVideo}
            controls
            autoPlay
            loop
            muted
            className="w-full h-full object-cover  shadow-xl"
            style={{ minHeight: "50vh", minWidth: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Overlay for contrast */}
          <div className="absolute inset-0  bg-black/30 pointer-events-none" style={{ zIndex: 2 }} />
        </div>
      </div>
    </section>
  );
};

export default Testimonial