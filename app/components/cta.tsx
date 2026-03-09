import React from 'react';
import Button from './button';

function Cta() {
  return (
    <section className="w-full bg-[#fdf9dc] border-t border-[#5a5a4c] py-24 flex flex-col items-center justify-center">
      <h2 className="font-editorial text-[#5a5a4c] text-center text-[clamp(2rem,6vw,4.5rem)] leading-tight mb-8">
        Are you ready to do<br />
        epic stuff together?
      </h2>
      <Button variant="outline" className="mt-4">
        Contact us
      </Button>
    </section>
  );
}

export default Cta;