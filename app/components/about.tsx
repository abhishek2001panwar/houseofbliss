'use client'
import React, { useState } from 'react'
import Button from './button'

const images = [
  'https://www.houseofbliss.co.in/wp-content/uploads/2025/06/Untitled-design-10.webp',
  'https://www.houseofbliss.co.in/wp-content/uploads/2025/06/Untitled-design-11.webp'
]

const content = {
  title: "CLASSIC MOMENT'S\nCAPTURED WITH EDGE",
  description: `Blending artistic vision with emotional storytelling, House of Bliss stands at the forefront of modern wedding documentation. For over ten years, their lens has captured not just moments, but memories - preserving love stories in frames that last forever. House of Bliss has redefined the visual narrative of Indian weddings time and again. For nearly a decade, they have crafted timeless photographs and films that live on in the hearts of thousands.`
}

function About() {
  const [active, setActive] = useState(0)

  // Flip animation handler
  const handleFlip = () => {
    setActive((prev) => (prev + 1) % images.length)
  }

  return (
    <section className="w-full min-h-[70vh] bg-[#41453D] flex items-center justify-center py-12 px-4 md:px-20">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left: Flipping image and number */}
        <div className="relative w-full max-w-[340px] h-[340px] md:h-[440px] flex flex-col items-center justify-center mb-8 md:mb-0">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="text-[#fdf9dc] font-editorial text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] absolute left-[-40px] sm:left-[-60px] top-0">{active + 1}</div>
          </div>
          <div
            className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-black transition-transform duration-700 cursor-pointer"
            style={{
              transform: `perspective(800px) rotateY(${active * 180}deg)`,
              transition: 'transform 0.7s cubic-bezier(0.77,0,0.175,1)'
            }}
            onClick={handleFlip}
          >
            <img
              src={images[active]}
              alt="House of Bliss Wedding"
              className="w-full h-full object-cover"
              style={{ transition: 'opacity 0.7s cubic-bezier(0.77,0,0.175,1)' }}
            />
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="font-editorial text-[#fdf9dc] text-[1.5rem] sm:text-[2.2rem] md:text-[3rem] mb-6 whitespace-pre-line">{content.title}</h2>
          <p className="font-neue-light text-[#fdf9dc] text-[1rem] sm:text-[1.1rem] mb-8 max-w-xl">{content.description}</p>
          <a href="#contact" className="inline-block font-neue-medium text-[#54564c] px-6 py-3">
            <Button variant="filled">Get in Touch</Button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About