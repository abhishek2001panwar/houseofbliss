'use client';
import React, { useEffect, useRef } from 'react'
import Button from './button';
import Link from 'next/link';

// Each image has a layout position: left offset (% of container), width, and top margin
// This replicates the scattered, asymmetric feel from the reference
const images = [
  { src: "/blog/img1.png",  coords: "46°52'N 11°01'E", left: "8%",  width: 240, marginTop: 0   },
  { src: "/blog/img2.png",  coords: "46°28'N 11°39'E", left: "38%", width: 320, marginTop: -60 },
  { src: "/blog/img3.png",  coords: "48°12'N 16°22'E", left: "68%", width: 200, marginTop: 80  },
  { src: "/blog/img4.png",  coords: "51°21'N 4°49'E",  left: "18%", width: 200, marginTop: 80  },
  { src: "/blog/img5.png",  coords: "62°7'N 7°26'W",   left: "55%", width: 240, marginTop: -40 },
  { src: "/blog/img6.png",  coords: "43°46'N 11°15'E", left: "30%", width: 280, marginTop: 100 },
  { src: "/blog/img7.png",  coords: "47°33'N 12°10'E", left: "6%",  width: 220, marginTop: 60  },
  { src: "/blog/img8.png",  coords: "38°42'N 27°08'E", left: "62%", width: 200, marginTop: 40  },
  { src: "/blog/img9.png",  coords: "45°26'N 12°20'E", left: "22%", width: 260, marginTop: 80  },
  { src: "/blog/img10.png", coords: "50°51'N 4°21'E",  left: "58%", width: 220, marginTop: -20 },
  { src: "/blog/img11.png", coords: "41°54'N 12°29'E", left: "10%", width: 200, marginTop: 60  },
];

// Aspect ratios alternating portrait/landscape for variety
const aspectRatios = [1.4, 1.5, 1.35, 1.6, 1.3, 1.5, 1.4, 1.35, 1.5, 1.4, 1.3];

const Gallery = () => {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      itemsRef.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;

        // Fade + slide up on enter
        const entered = rect.top < viewH * 0.88;
        const progress = Math.min(Math.max((viewH * 0.88 - rect.top) / (viewH * 0.4), 0), 1);

        // Parallax: each image moves at slightly different speed
        const speed = 0.06 + (idx % 4) * 0.015;
        const scrollY = window.scrollY;
        const parallaxY = -(scrollY * speed) % 80;

        if (entered) {
          const enterY = (1 - progress) * 60;
          el.style.opacity = String(Math.min(progress * 1.4, 1));
          el.style.transform = `translateY(${enterY + parallaxY}px)`;
        } else {
          el.style.opacity = '0';
          el.style.transform = `translateY(60px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full bg-[#F4F1E5] px-4 pt-24 pb-10 overflow-hidden">
      {/* Header — centered, bigger */}
      <div className="max-w-6xl mx-auto text-center mb-32">
        <h2 className="font-editorial text-[#41453D] text-6xl md:text-8xl">Gallery</h2>
        <p className="font-neue-light text-[#41453D]/50 text-sm mt-4 leading-relaxed">
          Come for the inspiration. Stay because you got lost and now you're emotionally invested.
        </p>
      </div>

      {/* Scattered layout container */}
      <div className="relative max-w-6xl mx-auto" style={{ minHeight: '2600px' }}>
        {images.map((img, idx) => {
          const height = Math.round(img.width * aspectRatios[idx % aspectRatios.length]);
          // Stack vertically with offset: each item is absolutely positioned
          const topBase = idx * 220 + (idx % 3) * 40;

          return (
            <div
              key={idx}
              ref={(el) => { itemsRef.current[idx] = el; }}
              className="absolute transition-all duration-[900ms] ease-out"
              style={{
                left: img.left,
                top: topBase + img.marginTop,
                width: img.width,
                opacity: 0,
                transform: 'translateY(60px)',
                willChange: 'transform, opacity',
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.13)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.2)] transition-shadow duration-500">
                <img
                  src={img.src}
                  alt="Gallery"
                  className="w-full object-cover block transition-transform duration-700 hover:scale-[1.03]"
                  style={{ height, display: 'block' }}
                />
                {/* Coordinates overlay — top right like reference */}
                <div
                  className="absolute top-3 right-3 font-editorial text-[#fdf9dc] text-xs leading-tight text-right pointer-events-none"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)', letterSpacing: '0.05em' }}
                >
                  {img.coords.split(' ').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            
            </div>
          
          );
        })}
        
      </div>
      <div className="max-w-6xl mx-auto text-center ">
        <Button className='text-center' variant='outline'>
        <Link href="/portfolio">
        Explore more
        </Link>
      </Button>
      </div>
    </section>
  );
};

export default Gallery;