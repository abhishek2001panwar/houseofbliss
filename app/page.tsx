import { About } from "./components/about";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import dynamic from "next/dynamic";

// Below-the-fold components with dynamic imports (code splitting)
const About2 = dynamic(() => import("./components/about2"));
const AuraMemorySection = dynamic(() => import("./components/AuraMemorySection"));
const Contact = dynamic(() => import("./components/contact"));
const FAQ = dynamic(() => import("./components/faq"));
const Magical = dynamic(() => import('./components/magical'));
const PhotographySection = dynamic(() => import("./components/photography"));
const ProjectsSection = dynamic(() => import("./components/films").then(mod => ({ default: mod.ProjectsSection })));
const Testimonial = dynamic(() => import("./components/testimonial"));

export default function Home() {
  return (
    <>
     <Navbar  />
      <Hero />
      <About />
      <Magical/>
      {/* <Gallery /> */}
      <PhotographySection />
      <AuraMemorySection  />
      <About2 />
      <ProjectsSection/>
      {/* <Stories /> */}
      <Testimonial />

      <FAQ />
      <Contact />
      
      
    </>
  );
}
