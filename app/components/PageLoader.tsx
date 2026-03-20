'use client';
import { useEffect, useState } from 'react';

/**
 * PageLoader — House of Bliss
 *
 * KEY FIX: waits for window 'load' event (hero image + all assets done)
 * before sliding away. Hero is guaranteed visible on reveal.
 *
 * Usage in app/layout.tsx:
 *   import PageLoader from '@/app/components/PageLoader';
 *   <PageLoader />
 *   {children}
 */
export default function PageLoader() {
  const [phase, setPhase] = useState<'in' | 'ready' | 'exit' | 'done'>('in');

  useEffect(() => {
    // Lock scroll so user can't interact with hidden page
    document.body.style.overflow = 'hidden';

    const MIN_MS = 1800; // animation always runs at least this long
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);

      setPhase('ready'); // progress bar snaps to 100%

      setTimeout(() => {
        setPhase('exit');
        document.body.style.overflow = ''; // restore scroll as curtain lifts
        setTimeout(() => setPhase('done'), 920);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      // Page already loaded (e.g. fast cache hit)
      finish();
    } else {
      // Wait for ALL resources — images, fonts, videos
      window.addEventListener('load', finish, { once: true });
      // Hard cap: never block more than 6s
      const cap = setTimeout(finish, 6000);
      return () => {
        window.removeEventListener('load', finish);
        clearTimeout(cap);
        document.body.style.overflow = '';
      };
    }

    return () => { document.body.style.overflow = ''; };
  }, []);

  if (phase === 'done') return null;

  const revealed = phase === 'ready' || phase === 'exit';

  return (
    <>
      <style>{`
        @keyframes hob-ring {
          from { stroke-dashoffset: 239; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes hob-grain {
          0%,100% { transform: translate(0,0); }
          25% { transform: translate(-1px, 1px); }
          50% { transform: translate(1px,-1px); }
          75% { transform: translate(-1px,-1px); }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#0F0E0B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: phase === 'exit' ? 'translateY(-100%)' : 'translateY(0)',
          transition: phase === 'exit' ? 'transform 0.88s cubic-bezier(0.76,0,0.24,1)' : 'none',
          willChange: 'transform',
          overflow: 'hidden',
          pointerEvents: phase === 'exit' ? 'none' : 'all',
        }}
      >
        {/* Animated grain */}
        <div style={{
          position: 'absolute', inset: '-20%', zIndex: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          animation: 'hob-grain 0.2s steps(1) infinite',
        }} />

        {/* Corner brackets */}
        {([
          { top: 24, left: 24,    borderTop: '1px solid rgba(253,245,210,0.14)', borderLeft:   '1px solid rgba(253,245,210,0.14)' },
          { top: 24, right: 24,   borderTop: '1px solid rgba(253,245,210,0.14)', borderRight:  '1px solid rgba(253,245,210,0.14)' },
          { bottom: 24, left: 24,  borderBottom: '1px solid rgba(253,245,210,0.14)', borderLeft:  '1px solid rgba(253,245,210,0.14)' },
          { bottom: 24, right: 24, borderBottom: '1px solid rgba(253,245,210,0.14)', borderRight: '1px solid rgba(253,245,210,0.14)' },
        ] as React.CSSProperties[]).map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 24, height: 24, zIndex: 1, ...s }} />
        ))}

        {/* ── Main content ── */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>

          {/* Ring + H */}
          <div style={{ position: 'relative', width: 88, height: 88 }}>
            {/* Track */}
            <svg width="88" height="88" viewBox="0 0 88 88" style={{ position: 'absolute', inset: 0 }}>
              <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(253,245,210,0.07)" strokeWidth="1" />
            </svg>
            {/* Drawing arc */}
            <svg width="88" height="88" viewBox="0 0 88 88" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
              <circle
                cx="44" cy="44" r="38"
                fill="none"
                stroke="rgba(253,245,210,0.50)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="239"
                strokeDashoffset="239"
                style={{ animation: 'hob-ring 1.5s cubic-bezier(0.76,0,0.24,1) 0.1s forwards' }}
              />
            </svg>
            {/* Monogram */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: 28, fontWeight: 300, fontStyle: 'italic',
                color: '#fdf5d2', letterSpacing: '-0.03em',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.65s ease 0.4s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.4s',
              }}>H</span>
            </div>
          </div>

          {/* Name + divider + tag */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
            <div style={{ overflow: 'hidden' }}>
              <p style={{
                margin: 0,
                fontFamily: 'Georgia, serif',
                fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(1.25rem, 4vw, 1.85rem)',
                color: '#fdf5d2', letterSpacing: '-0.015em', lineHeight: 1,
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(110%)',
                transition: 'opacity 0.7s ease 0.55s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.55s',
              }}>House of Bliss</p>
            </div>

            {/* Expanding hairline */}
            <div style={{
              height: 1,
              background: 'rgba(253,245,210,0.20)',
              width: revealed ? 52 : 0,
              transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s',
            }} />

            {/* Subtitle with tracking animation */}
            <p style={{
              margin: 0, fontSize: '7.5px',
              textTransform: 'uppercase',
              letterSpacing: revealed ? '0.45em' : '0.22em',
              color: 'rgba(253,245,210,0.30)',
              fontFamily: 'monospace',
              opacity: revealed ? 1 : 0,
              transition: 'opacity 0.7s ease 0.95s, letter-spacing 1s cubic-bezier(0.16,1,0.3,1) 0.95s',
            }}>Wedding Photography</p>
          </div>
        </div>

        {/* ── Progress bar + city ── */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)',
          width: 100, zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9,
        }}>
          <div style={{ width: '100%', height: 1, background: 'rgba(253,245,210,0.09)', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(253,245,210,0.42)',
              // Crawls to 72% during load, snaps to 100% when assets are ready
              width: revealed ? '100%' : '72%',
              transition: revealed
                ? 'width 0.28s ease'
                : 'width 1.5s cubic-bezier(0.4,0,0.6,1)',
            }} />
          </div>
          <p style={{
            margin: 0, fontSize: '6.5px', letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(253,245,210,0.18)',
            fontFamily: 'monospace',
          }}>Bangalore</p>
        </div>
      </div>
    </>
  );
}