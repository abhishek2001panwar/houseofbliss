'use client'
import React, { useRef, useEffect, useState } from 'react'

const About2 = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [imgScale, setImgScale] = useState(0.75);
  const [imgRadius, setImgRadius] = useState(40);

  useEffect(() => {
    const handleScrollResize = () => {
      if (!sectionRef.current) return;
      const rect = (sectionRef.current as HTMLElement).getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setInView(true);
        const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight * 0.8), 0), 1);
        // Scale from 0.75 → 1
        setImgScale(0.75 + 0.25 * progress);
        // Border radius from 40px → 0px as it fills
        setImgRadius(40 * (1 - progress));
      } else {
        setInView(false);
        setImgScale(0.75);
        setImgRadius(40);
      }
    };
    window.addEventListener('scroll', handleScrollResize, { passive: true });
    window.addEventListener('resize', handleScrollResize);
    handleScrollResize();
    return () => {
      window.removeEventListener('scroll', handleScrollResize);
      window.removeEventListener('resize', handleScrollResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F4F1E5] overflow-hidden flex items-end justify-start "
    >
      {/* Fullscreen Image — no overlay, scales to full */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <video
          src="https://houseofbliss.co.in/wp-content/uploads/2025/05/Untitled-design-2.mp4"
          className="object-cover transition-all duration-500 ease-out"
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${imgScale})`,
            borderRadius: `${imgRadius}px`,
            willChange: 'transform, border-radius',
          }}
          loop
          autoPlay
          muted
          controls={false}
        />
      </div>

      {/* Bottom gradient — only for text legibility, no color overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 40%, transparent 50%)',
          borderRadius: `${imgRadius}px`,
          transform: `scale(${imgScale})`,
          transition: 'all 0.5s ease-out',
        }}
      />

      {/* Text — bottom left */}
      <div className="relative z-20 flex flex-col items-start justify-end px-8 md:px-20 pb-14 md:pb-20 max-w-2xl">
        {/* Eyebrow label */}
      

        <h2
          className={`font-editorial text-[#fdf9dc] text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.15s' }}
        >
          Where Your Love Story<br />Takes Center Stage.
        </h2>

        <p
          className={`font-neue-light text-[#fdf9dc]/80 text-sm md:text-base mb-8 max-w-sm leading-relaxed transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.28s' }}
        >
          We believe every couple has a unique tale waiting to be told with artistry and emotion.
        </p>

        {/* <a
          href="#"
          className={`group inline-flex items-center gap-3 font-neue-medium text-[#fdf9dc] text-sm tracking-wide border border-[#fdf9dc]/40 px-6 py-3  backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:border-[#fdf9dc]/70 transition-all duration-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.42s' }}
        >
          Learn More
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a> */}
      </div>
    </section>
  )
}

export default About2