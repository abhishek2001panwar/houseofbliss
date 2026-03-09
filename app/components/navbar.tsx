'use client';
import React, { useState, useEffect } from 'react';

const overlayBg = '#fdf9dc';
const menuLinkColor = '#5a5a4c';
const menuLinks = [
  'Home',
  'About',
  'Portfolio',
  'Blogs',
  'Say hi',
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add blur bg after scrolling 20px
      setScrolled(currentScrollY > 20);

      // Close menu if user scrolls down
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full flex items-center justify-between py-8 md:py-6 px-4 md:px-20 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.25)' : 'transparent',
          boxShadow: scrolled ? '0 1px 0 0 rgba(255,255,255,0.08)' : 'none',
        }}
      >
        {/* Left: 2 links inside a bordered box */}
        <div
          className="hidden md:flex gap-6 "
          style={{
           
            padding: '6px 16px',
          }}
        >
          <a
            className="font-neue-light text-[18px] hover:underline transition text-[#fdf9dc]"
            href="#stories"
            
          >
            Stories
          </a>
          <a
            className="font-neue-light text-[18px] hover:underline transition text-[#fdf9dc]"
            href="#about"
            
          >
            About
          </a>
        </div>

        {/* Center: Brand — absolutely centered so it's always in the middle */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="font-editorial text-[1.35rem] md:text-[2rem] text-white tracking-tight select-none whitespace-nowrap">
            HOUSE OF BLISS
          </span>
        </div>

        {/* Right: Menu button */}
        <button
          className="font-neue-light text-[16px] md:text-[18px] text-[#fdf9dc] bg-transparent border-none outline-none cursor-pointer ml-auto"
          onClick={() => setOpen(true)}
        >
          MENU
        </button>
      </nav>

      {/* Full-page overlay menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-40 flex flex-col items-center bg-[#fdf9dc] transition-transform duration-700 ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ fontFamily: 'var(--font-editorial)', pointerEvents: open ? 'auto' : 'none' }}
      >
        <button
          className="absolute top-8 right-8 text-[2rem] text-[#5a5a4c] bg-transparent border-none cursor-pointer font-neue-light"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          &#10005;
        </button>
        <div className="mt-24 flex flex-col items-center gap-8 w-full">
          {menuLinks.map((link, idx) => (
            <div
              key={link}
              className="transition-all duration-700"
              style={{
                transitionDelay: `${0.1 + idx * 0.1}s`,
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(100px)',
              }}
            >
              <a
                href={`#${link.replace(/\s+/g, '').toLowerCase()}`}
                className="font-editorial text-[clamp(2rem,6vw,4rem)] hover:underline transition"
                style={{ color: menuLinkColor }}
              >
                {link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;