'use client'
import React, { useState } from 'react'
import Button from './button'
import Link from 'next/link'

const images = [
  '/about1.webp',
  '/about2.webp'
]

const services = [
  {
    number: '',
    title: "CLASSIC MOMENT'S CAPTURED WITH EDGE",
    description: `Blending artistic vision with emotional storytelling, House of Bliss stands at the forefront of modern wedding documentation. For over ten years, their lens has captured not just moments, but memories. Blending artistic vision with emotional storytelling, House of Bliss stands at the forefront of modern wedding documentation. For nearly a decade, they have crafted timeless photographs and films that live on in the hearts of thousands`,
    link: 'Explore more'
  },
]

export function About() {
  const [active, setActive] = useState(0)

  return (
    // FIX 1: Replace h-screen + py-52 with auto height and responsive padding
    <section className="relative w-full bg-[#41453D] flex items-center justify-center py-20 md:py-32 px-4 md:px-16">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 md:gap-16">

        {/* Left: Overlapping image collage */}
        {/* FIX 2 & 3: Reduce min-h on mobile, keep collage readable */}
        <div className="relative w-full md:w-[45%] min-h-[280px] sm:min-h-[380px] md:min-h-[480px] flex-shrink-0">
          {/* Back image */}
          <div className="absolute top-0 right-0 w-[72%] h-[78%] rounded-sm overflow-hidden shadow-xl z-10">
            <img
              src={images[0]}
              alt="House of Bliss Wedding"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Front image */}
          <div className="absolute bottom-0 left-0 w-[55%] h-[62%] rounded-sm overflow-hidden shadow-2xl z-20">
            <img
              src={images[1]}
              alt="House of Bliss Wedding"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Service content */}
        <div className="flex-1 flex flex-col justify-center gap-10">
          {services.map((service, i) => (
            <div
              key={i}
              className="flex gap-4 md:gap-6 items-start border-t border-[#fdf9dc]/10 pt-8 first:border-t-0 first:pt-0"
            >
              {/* Number */}
              <span className="font-editorial text-[#fdf9dc]/40 text-[1.2rem] md:text-[1.4rem] mt-1 w-6 md:w-8 flex-shrink-0">
                {service.number}
              </span>
              {/* Content */}
              <div className="flex flex-col gap-3">
                {/* FIX 4: Responsive heading size — starts small, grows at larger breakpoints */}
                <h3 className="font-editorial text-[#fdf9dc] text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.6rem] leading-tight">
                  {service.title}
                </h3>
                <p className="font-neue-light text-[#fdf9dc]/70 text-[0.9rem] md:text-[0.95rem] leading-relaxed max-w-md">
                  {service.description}
                </p>
                <Link
                  href="/about"
                  className="font-neue-medium text-[#fdf9dc] text-[1rem] md:text-[1.2rem] underline underline-offset-4 decoration-[#fdf9dc]/40 hover:decoration-[#fdf9dc] transition-all w-fit mt-1"
                >
                  {service.link}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* FIX 5: Wave SVG — use viewBox that matches the path coordinates (1440 wide),
          width="100%" ensures it scales to any container without clipping */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 130"
          className="w-full h-[80px] sm:h-[100px] md:h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 
               C200,160 350,40 520,80
               C700,120 900,30 1100,70
               C1250,100 1350,70 1440,90
               L1440,180
               L0,180 Z"
            fill="#F4F1E5"
          />
        </svg>
      </div>
    </section>
  )
}