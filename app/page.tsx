import About from "./components/about";
import Cta from "./components/cta";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <FAQ />
      <Cta />
      <Footer />
    </>
  );
}
