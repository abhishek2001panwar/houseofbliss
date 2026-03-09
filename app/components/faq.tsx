import React from 'react'

const faqs = [
  {
    question: 'What services do you offer for wedding photography in Bengaluru?',
    answer: 'We offer cinematic wedding photography in Bengaluru, including pre-wedding shoots and emotional storytelling with high-end visuals.'
  },
  {
    question: 'Why are you considered the best wedding photographer in Bengaluru?',
    answer: 'Our team is known as the best wedding photographer in Bengaluru for blending emotion, storytelling, and cinematic detail.'
  },
  {
    question: 'What defines your best wedding photography style?',
    answer: 'We create the best wedding photography by capturing real emotions, natural moments, and dramatic visuals in every frame.'
  }
];

function FAQ() {
  return (
    <section className="w-full py-16 px-4 md:px-20 bg-[#fdf9dc]">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-left font-editorial text-[3rem] md:text-[4rem] text-[#5a5a4c] mb-12">FAQ</h2>
        <div className="divide-y divide-[#e5e5d6]">
          {faqs.map((faq, idx) => (
            <div key={idx} className="flex flex-row items-start py-8">
              <div className="w-1/2 pr-8 text-left font-editorial text-[2rem] md:text-[1.5rem] text-[#5a5a4c]">{idx + 1}. {faq.question}</div>
              <div className="w-1/2 text-left font-neue-light text-[1.1rem] text-[#5a5a4c]">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ