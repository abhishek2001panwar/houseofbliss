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
import Magical from './components/magical'
import PhotographySection from "./components/photography";
import { ProjectsSection} from "./components/films";

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
