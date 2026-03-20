import { BLOGS } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const blog = BLOGS.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f2ed]">
        <p className="font-neue-light tracking-[0.3em] uppercase text-xs text-[#999]">
          Article not found
        </p>
      </div>
    );
  }

  const currentIndex = BLOGS.findIndex((b) => b.id === Number(id));
  const prevBlog = currentIndex > 0 ? BLOGS[currentIndex - 1] : null;
  const nextBlog = currentIndex < BLOGS.length - 1 ? BLOGS[currentIndex + 1] : null;

  return (
    <>
      <style>{`
        /* ─────────────────────────────────────────
           BASE
        ───────────────────────────────────────── */
        .bp-root {
          background: #f5f2ed;
          min-height: 100vh;
          color: #1a1a1a;
        }

        /* ─────────────────────────────────────────
           TOP NAV
        ───────────────────────────────────────── */
        .bp-nav {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 100;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          background: rgba(245, 242, 237, 0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .bp-nav-logo {
          font-size: 1.25rem;
          letter-spacing: 0.04em;
          color: #1a1a1a;
          text-decoration: none;
        }

        .bp-nav-count {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #aaa;
        }

        .bp-nav-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #666;
          text-decoration: none;
          padding: 0.4rem 0.9rem 0.4rem 0.6rem;
          border: 1px solid rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, color 0.3s;
        }

        .bp-nav-back::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #1a1a1a;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.77,0,0.175,1);
          z-index: 0;
        }

        .bp-nav-back:hover::before { transform: translateX(0); }
        .bp-nav-back:hover { border-color: #1a1a1a; color: #f5f2ed; }

        .bp-nav-back svg,
        .bp-nav-back span {
          position: relative;
          z-index: 1;
        }

        /* ─────────────────────────────────────────
           TWO-COLUMN LAYOUT
        ───────────────────────────────────────── */
        .bp-layout {
          display: grid;
          grid-template-columns: 42% 58%;
          min-height: 100vh;
          padding-top: 56px;
        }

        /* LEFT — sticky */
        .bp-left {
          position: sticky;
          top: 56px;
          height: calc(100vh - 56px);
          display: flex;
          flex-direction: column;
          padding: 3.5rem 3rem 3rem 3.5rem;
          border-right: 1px solid rgba(0,0,0,0.07);
          overflow: hidden;
        }

        .bp-label {
          font-size: 0.62rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #b08d57;
          margin-bottom: 1.6rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-shrink: 0;
        }

        .bp-label::before {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: #b08d57;
          flex-shrink: 0;
        }

        .bp-title {
          font-size: clamp(1.9rem, 2.8vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: #1a1a1a;
          margin: 0 0 2rem;
          flex-shrink: 0;
        }

        .bp-image-wrap {
          flex: 1;
          min-height: 0;
          position: relative;
          overflow: hidden;
        }

        .bp-image-wrap img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .bp-image-wrap:hover img {
          transform: scale(1.03);
        }

        .bp-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(245,242,237,0.2) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        /* RIGHT — scrollable */
        .bp-right {
          display: flex;
          flex-direction: column;
        }

        .bp-content {
          flex: 1;
          padding: 3.5rem 4rem 2.5rem 3.5rem;
        }

        /* prose */
        .bp-prose {
          font-size: 1rem;
          line-height: 1.9;
          color: #2e2e2e;
        }
        .bp-prose p { margin-bottom: 1.6rem; }
        .bp-prose h2 {
          font-size: 1.7rem;
          font-weight: 300;
          line-height: 1.2;
          color: #1a1a1a;
          margin: 3rem 0 1rem;
        }
        .bp-prose h3 {
          font-size: 1.25rem;
          font-style: italic;
          color: #666;
          margin: 2rem 0 0.7rem;
        }
        .bp-prose blockquote {
          border-left: 1.5px solid #b08d57;
          padding: 0.2rem 0 0.2rem 1.5rem;
          margin: 2rem 0;
          font-size: 1.3rem;
          font-style: italic;
          color: #666;
          line-height: 1.5;
        }
        .bp-prose strong {
          font-weight: 500;
          color: #1a1a1a;
        }
        .bp-prose a {
          color: #b08d57;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* divider */
        .bp-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0 4rem 0 3.5rem;
        }
        .bp-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(0,0,0,0.09);
        }
        .bp-divider-dot {
          width: 5px;
          height: 5px;
          background: #b08d57;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* ─────────────────────────────────────────
           FOOTER: prev/next + back
        ───────────────────────────────────────── */
        .bp-footer {
          padding: 2.5rem 4rem 3.5rem 3.5rem;
        }

        .bp-footer-label {
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 1.4rem;
        }

        .bp-nav-cards {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2rem;
        }

        /* nav card */
        .bp-nav-card {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          padding: 1rem 1.25rem;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
        }

        .bp-nav-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #1a1a1a;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 0;
        }

        .bp-nav-card:hover::before { transform: translateX(0); }
        .bp-nav-card:hover {
          border-color: #1a1a1a;
          box-shadow: 0 10px 36px rgba(0,0,0,0.09);
          transform: translateY(-1px);
        }

        .bp-nav-card:hover .bp-nc-dir,
        .bp-nav-card:hover .bp-nc-title { color: rgba(245,242,237,0.9); }
        .bp-nav-card:hover .bp-nc-icon {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.18);
          color: #f5f2ed;
        }

        .bp-nc-icon {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b08d57;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }

        .bp-nc-body {
          position: relative;
          z-index: 1;
          flex: 1;
          min-width: 0;
        }

        .bp-nc-dir {
          font-size: 0.57rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #b08d57;
          margin-bottom: 0.28rem;
          transition: color 0.3s;
        }

        .bp-nc-title {
          font-size: 1rem;
          line-height: 1.25;
          color: #1a1a1a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.3s;
        }

        /* next card: icon on right */
        .bp-nav-card.bp-next { flex-direction: row-reverse; }
        .bp-nav-card.bp-next .bp-nc-body { text-align: right; }

        /* back button */
        .bp-back {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1.4rem 0.65rem 0.9rem;
          border: 1px solid rgba(0,0,0,0.1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .bp-back::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #b08d57;
          transform: translateX(-101%);
          transition: transform 0.38s cubic-bezier(0.77,0,0.175,1);
          z-index: 0;
        }

        .bp-back:hover::before { transform: translateX(0); }
        .bp-back:hover { border-color: #b08d57; }
        .bp-back:hover .bp-back-icon,
        .bp-back:hover .bp-back-text { color: #fff; }

        .bp-back-icon {
          position: relative;
          z-index: 1;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          flex-shrink: 0;
          transition: color 0.3s;
        }

        .bp-back-text {
          position: relative;
          z-index: 1;
          font-size: 0.62rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #666;
          transition: color 0.3s;
        }

        /* ─────────────────────────────────────────
           MOBILE
        ───────────────────────────────────────── */
        @media (max-width: 900px) {
          .bp-layout { grid-template-columns: 1fr; }
          .bp-left {
            position: relative;
            top: 0;
            height: auto;
            padding: 2.5rem 1.5rem 0;
            border-right: none;
          }
          .bp-image-wrap { min-height: 56vw; }
          .bp-content { padding: 2.5rem 1.5rem; }
          .bp-divider { padding: 0 1.5rem; }
          .bp-footer { padding: 2rem 1.5rem 3rem; }
          .bp-nav { padding: 0 1.5rem; }
        }
      `}</style>

      <div className="bp-root">

        {/* Top nav */}
        <nav className="bp-nav">
          <Link href="/" className="bp-nav-logo"></Link>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <Link href="/blogs" className="bp-nav-back">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M6.5 1.5L2.5 5L6.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>All Blogs</span>
            </Link>
          </div>
        </nav>

        <div className="bp-layout">

          {/* ── LEFT: sticky title + image ── */}
          <aside className="bp-left am-in">
            <span className="bp-label am-title">Feature Article</span>
            <h1 className="bp-title am-title">{blog.title}</h1>
            <div className="bp-image-wrap am-body">
              <Image
                src={blog.img}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="bp-image-overlay" />
            </div>
          </aside>

          {/* ── RIGHT: scrollable content + nav ── */}
          <div className="bp-right">

            <article className="bp-content am-in">
              <div
                className="bp-prose am-body"
                dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
              />
            </article>

            <div className="bp-divider">
              <div className="bp-divider-line" />
              <div className="bp-divider-dot" />
              <div className="bp-divider-line" />
            </div>

            <footer className="bp-footer">
              <p className="bp-footer-label">Continue Reading</p>

              <div className="bp-nav-cards">
                {prevBlog && (
                  <Link href={`/blogs/${prevBlog.id}`} className="bp-nav-card bp-prev">
                    <div className="bp-nc-icon">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M7.5 1.5L3 6L7.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="bp-nc-body">
                      <div className="bp-nc-dir">Previous</div>
                      <div className="bp-nc-title">{prevBlog.title}</div>
                    </div>
                  </Link>
                )}
                {nextBlog && (
                  <Link href={`/blogs/${nextBlog.id}`} className="bp-nav-card bp-next">
                    <div className="bp-nc-body">
                      <div className="bp-nc-dir">Next</div>
                      <div className="bp-nc-title">{nextBlog.title}</div>
                    </div>
                    <div className="bp-nc-icon">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M4.5 1.5L9 6L4.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                )}
              </div>


            </footer>

          </div>
        </div>
      </div>
    </>
  );
}