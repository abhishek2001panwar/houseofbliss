'use client'
import React, { useState } from 'react';

function Cta() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="w-full bg-[#fdf9dc] py-24 flex flex-col items-center justify-center px-6">
      
      {/* Heading */}
      <p className="font-neue-light text-[#a89f72] text-xs tracking-[0.3em] uppercase mb-6">
        let's create something
      </p>
      <h2 className="font-editorial text-[#5a5a4c] text-center text-[clamp(2rem,6vw,4.5rem)] leading-tight mb-4">
        Are you ready to do<br />
        epic stuff together?
      </h2>
      <p className="font-neue-light text-[#8a8468] text-center text-sm tracking-wide mb-12 max-w-sm">
        Drop your email and we'll reach out to start the conversation.
      </p>

      {/* Form */}
      {status === 'success' ? (
        <div className="flex flex-col items-center gap-3 animate-[fadeUp_0.7s_ease_forwards]">
          <div className="w-10 h-10 rounded-full border border-[#c9a050] flex items-center justify-center mb-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.5 9.5L7.5 13.5L14.5 5.5" stroke="#c9a050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="font-neue-medium text-[#5a5a4c] text-sm tracking-widest uppercase">We'll be in touch</p>
          <button
            onClick={() => setStatus('idle')}
            className="font-neue-light text-[#a89f72] text-xs tracking-widest underline underline-offset-4 mt-1 hover:text-[#5a5a4c] transition-colors"
          >
            Send another
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row items-stretch gap-0 border border-[#d6ce9a] rounded-sm overflow-hidden shadow-sm"
        >
          {/* Email input */}
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="
              flex-1 bg-white px-5 py-4
              font-neue-light text-[#5a5a4c] text-sm tracking-wide
              placeholder:text-[#c4bc94] placeholder:font-neue-light
              outline-none border-none
              focus:bg-[#fffef5]
              transition-colors duration-200
            "
          />

          {/* Divider on desktop */}
          <div className="hidden sm:block w-px bg-[#d6ce9a]" />

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="
              bg-[#5a5a4c] hover:bg-[#3e3e32] active:scale-[0.98]
              text-[#fdf9dc] font-neue text-xs tracking-[0.25em] uppercase
              px-7 py-4 sm:py-0
              transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
              min-w-[130px]
            "
          >
            {loading ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Sending
              </>
            ) : (
              <>
                Let's talk
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>
      )}

      {/* Fine print */}
      {status !== 'success' && (
        <p className="font-neue-light text-[#b0a87a] text-[10px] tracking-widest uppercase mt-5">
          No spam, ever. Unsubscribe anytime.
        </p>
      )}

    </section>
  );
}

export default Cta;