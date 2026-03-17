'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Button from './button';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
//  LAYOUT
//
//  Each image is placed at:   top = SLOT * idx + OFFSET[idx]
//
//  SLOT  = fixed vertical slot size (guarantees no overlap between rows)
//  OFFSET = small horizontal/vertical jitter for organic feel
//  The container height = last image bottom + PADDING  (no dead space)
// ─────────────────────────────────────────────────────────────────────────────
const SLOT = 520; // px per row — wide enough that even tall images + offsets never collide

const images = [
  //  src               coords                left    width  topOffset
  { src: "/gallery/img1.png",  coords: "46°52'N 11°01'E", left: "4%",  width: 320, topOff:   0 },
  { src: "/gallery/img2.png",  coords: "46°28'N 11°39'E", left: "37%", width: 390, topOff:  60 },
  { src: "/gallery/img3.png",  coords: "48°12'N 16°22'E", left: "65%", width: 290, topOff:  20 },  // was -20 → fixed
  { src: "/gallery/img4.png",  coords: "51°21'N 4°49'E",  left: "13%", width: 300, topOff:  30 },
  { src: "/gallery/img5.png",  coords: "62°7'N 7°26'W",   left: "56%", width: 330, topOff:   0 },
  { src: "/gallery/img6.png",  coords: "43°46'N 11°15'E", left: "27%", width: 370, topOff:  50 },
  { src: "/gallery/image.png",  coords: "47°33'N 12°10'E", left: "5%",  width: 310, topOff:  10 },
  // { src: "/gallery/img8.png",  coords: "38°42'N 27°08'E", left: "61%", width: 295, topOff:  40 },
  // { src: "/gallery/img9.png",  coords: "45°26'N 12°20'E", left: "23%", width: 350, topOff:  20 },
  // { src: "/gallery/img10.png", coords: "50°51'N 4°21'E",  left: "59%", width: 305, topOff:   0 },
  // { src: "/gallery/img11.png", coords: "41°54'N 12°29'E", left: "11%", width: 285, topOff:  30 },
];

// aspect ratio h/w  (portrait-ish)
const AR = [1.35, 1.5, 1.4, 1.55, 1.3, 1.5, 1.4, 1.35, 1.5, 1.4, 1.3];

// parallax speed per image (alternating slow/fast for depth)
const PARALLAX_SPEED = [0.08, 0.13, 0.07, 0.12, 0.09, 0.14, 0.08, 0.11, 0.1, 0.13, 0.07];

type ScreenSize = 'mobile' | 'tablet' | 'desktop';
function pct(s: string) { return parseFloat(s); }

// ── bounding box ─────────────────────────────────────────────────────────────
function box(img: typeof images[0], idx: number, cw: number) {
  const l = (pct(img.left) / 100) * cw;
  const t = idx * SLOT + img.topOff;
  const h = Math.round(img.width * AR[idx % AR.length]);
  return { l, t, r: l + img.width, b: t + h, cx: l + img.width / 2, h };
}

// ── waypoints strictly in gaps ───────────────────────────────────────────────
function waypoints(cw: number) {
  const GAP = 36;
  const boxes = images.map((img, i) => box(img, i, cw));
  const pts: { x: number; y: number }[] = [];

  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i];
    if (i === 0) pts.push({ x: b.cx, y: Math.max(b.t - GAP, 4) });
    pts.push({ x: b.cx, y: b.b + GAP });
    if (i < boxes.length - 1) {
      const nb = boxes[i + 1];
      pts.push({ x: b.cx * 0.3 + nb.cx * 0.7, y: (b.b + GAP + nb.t - GAP) / 2 });
      pts.push({ x: nb.cx, y: nb.t - GAP });
    }
  }
  return pts;
}

function dotAnchors(cw: number) {
  return images.map((img, i) => { const b = box(img, i, cw); return { x: b.cx, y: b.b + 22 }; });
}

// ── catmull-rom → cubic bezier ────────────────────────────────────────────────
function catmull(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[Math.max(i - 2, 0)], p1 = pts[i - 1];
    const p2 = pts[i], p3 = pts[Math.min(i + 1, pts.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6, cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6, cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

// ─────────────────────────────────────────────────────────────────────────────
const Gallery = () => {
  const itemsRef      = useRef<(HTMLDivElement | null)[]>([]);
  const innerImgRef   = useRef<(HTMLImageElement | null)[]>([]); // for inner parallax
  const sectionRef    = useRef<HTMLDivElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const pathRef       = useRef<SVGPathElement>(null);
  const ghostRef      = useRef<SVGPathElement>(null);
  const dotsRef       = useRef<(SVGGElement | null)[]>([]);

  const [screenSize,  setScreenSize]  = useState<ScreenSize>('desktop');
  const [pathLength,  setPathLength]  = useState(0);
  const [svgSize,     setSvgSize]     = useState({ w: 1200, h: 6000 });
  const [dots,        setDots]        = useState<{ x: number; y: number }[]>([]);
  const [containerH,  setContainerH]  = useState(6000);

  // screen size
  useEffect(() => {
    const upd = () => setScreenSize(window.innerWidth < 640 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop');
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  // build path + compute exact container height
  const buildPath = useCallback(() => {
    if (screenSize !== 'desktop') return;
    const c = containerRef.current;
    if (!c) return;
    const cw = c.offsetWidth;

    // Container height = bottom of last image + small padding (no dead space)
    const lastBox = box(images[images.length - 1], images.length - 1, cw);
    const ch = lastBox.b + 80; // 80px breathing room after last image
    setContainerH(ch);
    setSvgSize({ w: cw, h: ch });

    const d = catmull(waypoints(cw));
    setDots(dotAnchors(cw));

    [pathRef, ghostRef].forEach(r => r.current?.setAttribute('d', d));

    if (pathRef.current) {
      pathRef.current.style.strokeDasharray  = '5 14';
      pathRef.current.style.strokeDashoffset = String(99999);
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
      pathRef.current.style.strokeDasharray  = '5 14';
      pathRef.current.style.strokeDashoffset = String(len);
    }
    if (ghostRef.current) ghostRef.current.style.strokeDasharray = '5 14';
  }, [screenSize]);

  useEffect(() => {
    if (screenSize !== 'desktop') return;
    const t = setTimeout(buildPath, 160);
    window.addEventListener('resize', buildPath);
    return () => { clearTimeout(t); window.removeEventListener('resize', buildPath); };
  }, [screenSize, buildPath]);

  // scroll
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sTop = section.getBoundingClientRect().top + window.scrollY;
      const sH   = section.offsetHeight;
      const gp   = Math.min(Math.max((window.scrollY - sTop) / Math.max(sH - window.innerHeight, 1), 0), 1);

      // draw path
      if (pathRef.current && pathLength > 0)
        pathRef.current.style.strokeDashoffset = String(pathLength * (1 - gp));

      // per-image
      itemsRef.current.forEach((el, idx) => {
        if (!el) return;
        const rect  = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        const prog  = Math.min(Math.max((viewH * 0.92 - rect.top) / (viewH * 0.45), 0), 1);

        // fade-in: use CSS transition, only drive opacity + a one-time enter translateY
        // we track 'entered' via a data attribute so parallax can take over transform
        const entered = prog > 0.05;
        if (!el.dataset.entered && entered) {
          el.dataset.entered = '1';
        }

        if (!el.dataset.entered) {
          el.style.opacity   = '0';
          el.style.transform = 'translateY(55px)';
        } else {
          el.style.opacity = String(Math.min(prog * 1.7, 1));
          // outer wrapper: no translateY (parallax is on inner img)
          el.style.transform = 'translateY(0px)';
        }

        // ── INNER IMAGE PARALLAX ──
        // Move the img inside its overflow:hidden container
        const innerImg = innerImgRef.current[idx];
        if (innerImg && el.dataset.entered) {
          const speed  = PARALLAX_SPEED[idx % PARALLAX_SPEED.length];
          // rect.top relative to viewport: negative = scrolled past
          const centerDelta = rect.top + rect.height / 2 - viewH / 2;
          const shift = centerDelta * speed;
          // clamp shift so image doesn't expose edges
          const maxShift = (innerImg.offsetHeight - el.offsetHeight) / 2;
          const clamped = Math.max(-maxShift, Math.min(maxShift, shift));
          innerImg.style.transform = `translateY(${clamped}px)`;
        }

        // dot
        const dot = dotsRef.current[idx];
        if (dot) {
          const dp = Math.min(prog * 2.2, 1);
          dot.style.opacity = String(dp);
          (dot as SVGGElement).style.transform = `scale(${0.1 + dp * 0.9})`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathLength, screenSize]);

  // ── MOBILE ────────────────────────────────────────────────────────────────
  if (screenSize === 'mobile') {
    return (
      <section ref={sectionRef} className="w-full bg-[#F4F1E5] px-4 pt-16 pb-10 overflow-hidden">
        <div className="text-center mb-14">
          <h2 className="font-editorial text-[#41453D] text-5xl">Gallery</h2>
          <p className="font-neue-light text-[#41453D]/50 text-xs mt-3 leading-relaxed px-2">
            Come for the inspiration. Stay because you got lost and now you're emotionally invested.
          </p>
        </div>
        <div className="flex flex-col gap-6 max-w-sm mx-auto">
          {images.map((img, idx) => (
            <div key={idx} ref={el => { itemsRef.current[idx] = el; }}
              className="transition-all duration-700 ease-out"
              style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <div className="relative overflow-hidden shadow-[0_6px_30px_rgba(0,0,0,0.12)]">
                <img src={img.src} alt="Gallery" className="w-full object-cover block"
                  style={{ aspectRatio: `1 / ${AR[idx % AR.length]}` }} />
                <div className="absolute top-2 right-2 font-editorial text-[#fdf9dc] text-[10px] leading-tight text-right pointer-events-none"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)', letterSpacing: '0.05em' }}>
                  {img.coords.split(' ').map((l, i) => <div key={i}>{l}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline"><Link href="/portfolio">Explore more</Link></Button>
        </div>
      </section>
    );
  }

  // ── TABLET ────────────────────────────────────────────────────────────────
  if (screenSize === 'tablet') {
    const lc = images.filter((_, i) => i % 2 === 0);
    const rc = images.filter((_, i) => i % 2 === 1);
    return (
      <section ref={sectionRef} className="w-full bg-[#F4F1E5] px-6 pt-20 pb-10 overflow-hidden">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="font-editorial text-[#41453D] text-6xl">Gallery</h2>
          <p className="font-neue-light text-[#41453D]/50 text-sm mt-3 leading-relaxed">
            Come for the inspiration. Stay because you got lost and now you're emotionally invested.
          </p>
        </div>
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-6 items-start">
          {[lc, rc].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-6" style={{ marginTop: ci === 1 ? 60 : 0 }}>
              {col.map((img, i) => {
                const idx = ci === 0 ? i * 2 : i * 2 + 1;
                return (
                  <div key={idx} ref={el => { itemsRef.current[idx] = el; }}
                    className="transition-all duration-700 ease-out"
                    style={{ opacity: 0, transform: 'translateY(40px)' }}>
                    <div className="relative overflow-hidden shadow-[0_6px_30px_rgba(0,0,0,0.12)]">
                      <img src={img.src} alt="Gallery" className="w-full object-cover block"
                        style={{ aspectRatio: `1 / ${AR[idx % AR.length]}` }} />
                      <div className="absolute top-2 right-2 font-editorial text-[#fdf9dc] text-xs leading-tight text-right pointer-events-none"
                        style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)', letterSpacing: '0.05em' }}>
                        {img.coords.split(' ').map((l, k) => <div key={k}>{l}</div>)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline"><Link href="/portfolio">Explore more</Link></Button>
        </div>
      </section>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────────────────────
  return (
    <section ref={sectionRef} className="w-full bg-[#F4F1E5] px-4 pt-24 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="font-editorial text-[#41453D] text-6xl md:text-8xl">Gallery</h2>
        {/* <p className="font-neue-light text-[#41453D]/50 text-sm mt-4 leading-relaxed">
          Come for the inspiration. Stay because you got lost and now you're emotionally invested.
        </p> */}
      </div>

      {/* container height is computed exactly — no dead space */}
      <div ref={containerRef} className="relative max-w-6xl mx-auto" style={{ height: containerH }}>

        {/* SVG z=0, behind everything */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%', zIndex: 0, overflow: 'visible' }}
          viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow" x="-50%" y="-20%" width="200%" height="140%">
              <feGaussianBlur stdDeviation="1.4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ghost full route */}
          <path ref={ghostRef} fill="none"
            stroke="rgba(90,90,76,0.09)" strokeWidth="1" strokeLinecap="round" />

          {/* animated drawing */}
          <path ref={pathRef} fill="none"
            stroke="rgba(90,90,76,0.42)" strokeWidth="1.2" strokeLinecap="round"
            style={{ filter: 'url(#glow)', transition: 'stroke-dashoffset 0.04s linear' }}
          />

          {/* dots in gaps */}
          {dots.map((pt, idx) => (
            <g key={idx} ref={el => { dotsRef.current[idx] = el; }}
              style={{ opacity: 0, transform: 'scale(0.1)',
                transformOrigin: `${pt.x}px ${pt.y}px`,
                transition: 'opacity 0.4s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)' }}>
              <circle cx={pt.x} cy={pt.y} r={11}  fill="none" stroke="rgba(90,90,76,0.1)"  strokeWidth="1"/>
              <circle cx={pt.x} cy={pt.y} r={5.5}  fill="none" stroke="rgba(90,90,76,0.18)" strokeWidth="1"/>
              <circle cx={pt.x} cy={pt.y} r={2.8}  fill="rgba(90,90,76,0.52)"/>
              <circle cx={pt.x} cy={pt.y} r={1.1}  fill="#b08d57"/>
            </g>
          ))}
        </svg>

        {/* images z=1 */}
        {images.map((img, idx) => {
          const h   = Math.round(img.width * AR[idx % AR.length]);
          const top = idx * SLOT + img.topOff;
          // inner img is taller by 20% so parallax shift never exposes background
          const innerH = Math.round(h * 1.2);

          return (
            <div
              key={idx}
              ref={el => { itemsRef.current[idx] = el; }}
              className="absolute"
              style={{
                left: img.left,
                top,
                width: img.width,
                height: h,
                opacity: 0,
                transform: 'translateY(55px)',
                willChange: 'transform, opacity',
                zIndex: 1,
                transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              {/* clip wrapper */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  boxShadow: '0 14px 60px rgba(0,0,0,0.13)',
                  transition: 'box-shadow 0.4s ease, transform 0.4s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 72px rgba(0,0,0,0.2)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.012) translateY(-3px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 60px rgba(0,0,0,0.13)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)';
                }}
              >
                {/* inner img — taller than wrapper, parallax-shifted via JS */}
                <img
                  ref={el => { innerImgRef.current[idx] = el; }}
                  src={img.src}
                  alt="Gallery"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: innerH,
                    objectFit: 'cover',
                    display: 'block',
                    marginTop: `-${Math.round((innerH - h) / 2)}px`, // center initially
                    willChange: 'transform',
                    transition: 'transform 0.1s linear',
                  }}
                />

                {/* coords */}
                {/* <div className="absolute top-3 right-3 font-editorial text-[#fdf9dc] text-[11px] leading-snug text-right pointer-events-none"
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.65)', letterSpacing: '0.06em' }}>
                  {img.coords.split(' ').map((line, i) => <div key={i}>{line}</div>)}
                </div> */}

                {/* index */}
                <div className="absolute bottom-3 left-3 font-neue-light text-[#fdf9dc] pointer-events-none"
                  style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textShadow: '0 1px 6px rgba(0,0,0,0.55)', opacity: 0.6 }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA — sits right after images, no dead space */}
      <div className="max-w-6xl mx-auto text-center mt-16">
        <Button variant="outline">
          <Link href="/portfolio">Explore more</Link>
        </Button>
      </div>
    </section>
  );
};

export default Gallery;