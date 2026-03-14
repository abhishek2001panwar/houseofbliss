'use client';
import React, { useEffect, useState } from "react";
import Button from "./button";
import Link from "next/link";

const heroText = [
  "Your Wedding: A Story Unfolds",
  "Cinematic Wedding Photography",
];

function Hero() {
      const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.9); // Adjust multiplier for effect strength
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[100vh] min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/hero1.png"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
                style={{ transform: `translateY(${offset}px)`, transition: 'transform 0.2s linear' }}

      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Animated Text */}
      <div
        className="relative z-20 flex flex-col items-center justify-end w-full px-4"
        style={{ minHeight: "80vh" }}
      >
        {heroText.map((line, idx) => (
          <span
            key={idx}
            className={
              `text-[#f3eedf] text-center max-w-5xl ` +
              `${idx === 0 ? "text-[clamp(2rem,5vw,4rem)] font-editorial uppercase " : "text-lg font-neue-light"}` +
              ` leading-tight ` +
              `opacity-0 translate-y-12 animate-hero-fade`
            }
            style={{
              animationDelay: `${0.3 + idx * 0.3}s`,
              animationFillMode: "forwards",
            }}
          >
            {line}
          </span>
          
        ))}
         
         <div className="mt-20 animate-hero-fade">
          <Link
          href="/contact"
          className={`group inline-flex items-center gap-3 font-neue-medium text-[#fdf9dc] text-sm tracking-wide border border-[#fdf9dc]/40 px-6 py-3  backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:border-[#fdf9dc]/70 transition-all duration-300 `}
          style={{ transitionDelay: '0.42s' }}
        >
         Tell us your story
        </Link>
        </div>
       
      </div>
    </section>
  );
}

export default Hero;
