import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <>
      <style>{`
        .hob-footer {
          background: #fdf9dc;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* ── large editorial brand strip ── */
        .hob-brand-strip {
          padding: 4rem 3rem 0;
          border-top: 1px solid rgba(90, 90, 76, 0.18);
          position: relative;
        }

        .hob-brand-name {
          font-family: var(--font-editorial);
          font-size: clamp(3.5rem, 10vw, 9rem);
          line-height: 0.92;
          color: rgba(90, 90, 76, 0.9);
          letter-spacing: -0.02em;
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
          margin-bottom: -0.15em;
        }

        /* ── main content row ── */
        .hob-main {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          padding: 3rem 3rem 2.5rem;
          border-top: 1px solid rgba(90, 90, 76, 0.15);
          position: relative;
          z-index: 1;
        }

        /* nav column */
        .hob-col {
          padding-right: 2rem;
        }

        .hob-col-label {
          font-family: var(--font-neue-regular);
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(90, 90, 76, 0.45);
          margin-bottom: 1.4rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .hob-col-label::after {
          content: '';
          display: block;
          flex: 1;
          height: 1px;
          background: rgba(90, 90, 76, 0.15);
          max-width: 40px;
        }

        .hob-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .hob-nav-link {
          font-family: var(--font-editorial);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          color: #5a5a4c;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          width: fit-content;
          transition: color 0.25s;
        }

        .hob-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: #5a5a4c;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.77,0,0.175,1);
        }

        .hob-nav-link:hover::after { transform: scaleX(1); }

        /* instagram column */
        .hob-ig-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-left: 1px solid rgba(90, 90, 76, 0.12);
          border-right: 1px solid rgba(90, 90, 76, 0.12);
          padding: 0 2.5rem;
        }

        .hob-ig-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-neue-regular);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #5a5a4c;
          text-decoration: none;
          position: relative;
          padding: 1.5rem 2rem;
          border: 1px solid rgba(90, 90, 76, 0.25);
          overflow: hidden;
          transition: color 0.35s, border-color 0.35s;
          text-align: center;
          width: 100%;
        }

        .hob-ig-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #5a5a4c;
          transform: translateY(101%);
          transition: transform 0.4s cubic-bezier(0.77,0,0.175,1);
          z-index: 0;
        }

        .hob-ig-btn:hover::before { transform: translateY(0); }
        .hob-ig-btn:hover { color: #fdf9dc; border-color: #5a5a4c; }

        .hob-ig-btn svg,
        .hob-ig-btn span { position: relative; z-index: 1; }

        .hob-ig-icon {
          width: 28px;
          height: 28px;
          opacity: 0.8;
        }

        /* address column */
        .hob-addr-col {
          padding-left: 2.5rem;
        }

        .hob-address {
          font-family: var(--font-neue-regular);
          font-size: 0.82rem;
          line-height: 1.75;
          color: rgba(90, 90, 76, 0.7);
        }

        /* ── bottom bar ── */
        .hob-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 3rem;
          border-top: 1px solid rgba(90, 90, 76, 0.12);
        }

        .hob-legal {
          display: flex;
          align-items: center;
          gap: 0;
          flex-wrap: wrap;
        }

        .hob-legal-item {
          font-family: var(--font-neue-regular);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: rgba(90, 90, 76, 0.5);
          text-decoration: none;
          padding: 0 1rem;
          border-right: 1px solid rgba(90, 90, 76, 0.2);
          transition: color 0.2s;
          white-space: nowrap;
        }

        .hob-legal-item:first-child { padding-left: 0; }
        .hob-legal-item:last-child { border-right: none; }
        .hob-legal-item:hover { color: #5a5a4c; }

        /* ── mobile ── */
        @media (max-width: 768px) {
          .hob-brand-strip { padding: 3rem 1.5rem 0; }

          .hob-main {
            grid-template-columns: 1fr;
            padding: 2.5rem 1.5rem;
            gap: 2.5rem;
          }

          .hob-col { padding-right: 0; }

          .hob-ig-col {
            border-left: none;
            border-right: none;
            border-top: 1px solid rgba(90, 90, 76, 0.12);
            border-bottom: 1px solid rgba(90, 90, 76, 0.12);
            padding: 2rem 0;
          }

          .hob-addr-col { padding-left: 0; }

          .hob-bottom {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
            align-items: flex-start;
          }

          .hob-legal { gap: 0; }
          .hob-legal-item { padding: 0.25rem 0.75rem; }
          .hob-legal-item:first-child { padding-left: 0; }
        }
      `}</style>

      <footer className="hob-footer">

        {/* Oversized ghost brand name */}
        <div className="hob-brand-strip">
          <div className="hob-brand-name">House of Bliss</div>
        </div>

        {/* Main three-column grid */}
        <div className="hob-main">

          {/* Col 1 — Navigation */}
          <div className="hob-col">
            <div className="hob-col-label">Navigate</div>
            <nav className="hob-nav-links">
              <Link href="/portfolio" className="hob-nav-link">Portfolio</Link>
              <Link href="/blogs" className="hob-nav-link">Blogs</Link>
              <Link href="/about" className="hob-nav-link">About</Link>
              <Link href="/contact" className="hob-nav-link">Say hi</Link>
            </nav>
          </div>

          {/* Col 2 — Instagram CTA */}
          <div className="hob-ig-col">
            <a
              href="https://www.instagram.com/houseofbliss.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hob-ig-btn"
            >
              <svg className="hob-ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
              </svg>
              <span>Follow us on Instagram</span>
            </a>
          </div>

          {/* Col 3 — Address */}
          <div className="hob-addr-col">
            <div className="hob-col-label">Visit us</div>
            <p className="hob-address">
              2nd Floor, 772, 100 Feet Rd,<br />
              Above Royal Enfield Showroom,<br />
              HAL 2nd Stage, Doopanahalli,<br />
              Indiranagar, Bengaluru,<br />
              Karnataka - 560038
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="hob-bottom">
          <div className="hob-legal">
            <span className="hob-legal-item">© House of Bliss</span>
            <a href="#privacy" className="hob-legal-item">Privacy Policy</a>
            <a href="#cookie" className="hob-legal-item">Cookie Policy</a>
            <a href="#terms" className="hob-legal-item">Terms & Conditions</a>
          </div>
        </div>

      </footer>
    </>
  );
}

export default Footer;