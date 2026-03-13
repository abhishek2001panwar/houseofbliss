import { About } from "./components/about";
import About2 from "./components/about2";
import AuraMemorySection from "./components/AuraMemorySection";
import Contact from "./components/contact";
import Cta from "./components/cta";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import Gallery from "./components/gallery";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Stories from "./components/stories";
import Testimonial from "./components/testimonial";

export default function Home() {
  return (
    <>
     <Navbar  />
      <Hero />
      <About />
      <Gallery />
      <AuraMemorySection  />
      <About2 />
      <Stories />
      <Testimonial />

      <FAQ />
      <Contact />
      <Cta />
      
    </>
  );
}
