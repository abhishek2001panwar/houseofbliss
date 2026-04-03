"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./button"

export const projects = [
  {
    id:" 01",
     coupleSlug: "nithesh-poojitha",
    title: "Nithesh and Poojitha",
    category: "We don't offer packages,  We create experiences just for you.  Each service flows from one core belief:  intention over expense,  meaning over magnificence.  Because honestly?  Your love story isn't like anyone else's.  Why should your wedding be? ",
    year: "2024",
    location: "Your Special Treatment ",
    image: "https://hsrtiles.in/wp-content/uploads/2026/04/N_P_WEDDING_TEASER_1_w2tcan.webm",
  },
  {
    id: " 02",
      coupleSlug: "shraddha-neelgriv",
    title: "Shraddha & Neelgriv",
    category: "Everything Perfect Here's what sets us apart: We have our own production house. While others coordinate vendors, we create magic in-house. From concept to completion, every element flows through our skilled artisans' hands. No miscommunication. No quality compromises. No vendor conflicts. Just seamless creation where your vision transforms into reality through our complete control of the process. Because when you own the entire journey, perfection isn't just possible - it's promised.",
    year: "2023",
    location: "Everything Under One Roof",
    image: "https://hsrtiles.in/wp-content/uploads/2026/04/S_N_TEASER_1_tzeytd.webm",
  },
    {
    id: " 03",
      coupleSlug: "khajukathara-preetham",
    image: "https://hsrtiles.in/wp-content/uploads/2026/04/K_P_RECEPTION_TEASER_oqig1z.mov",
    title: "Khajukathara & Preetham",
    desc: "Bollywood glamour meets tradition in Mumbai.",
    date: "Aug 8, 2024",
    location: "Mumbai",
    index: "03",
   
  },
    {
    id: " 04",
    coupleSlug: "prakruthi-sudarshan",
    title: "Prakruthi & Sudarshan",
    year: "2023",
    location: "Mysore",
    category: "We don't just capture moments, we craft cinematic love stories.  Our films are more than videos; they're emotional journeys that let you relive the magic of your wedding day, over and over again.  With a blend of artistry and storytelling, we create films that are as unique as your love story, ensuring every glance, every smile, and every tear is beautifully preserved for a lifetime.",
    image:"https://hsrtiles.in/wp-content/uploads/2026/04/PRAKRUTHI_SUDARSHAN_2_1_tbzgwy.webm",
  },

  {
    id: " 05",
    coupleSlug: "dheeraj-sakshi",
    title: " Dheeraj and Sakshi",
category: `Your vision becomes our mission. 
From intimate mandaps that whisper your love story to grand celebrations that announce your union to the world, we design spaces where magic feels natural.

<br/><br/>

What we love creating together:

<br/>● Royal mandap design inspired by your journey - not just beautiful, but meaningful
<br/>● Floral arrangements that tell your story, not just fill space
<br/>● Lighting that transforms spaces into sanctuaries where you belong
<br/>● Decor that honors tradition while embracing your personal style`,
    year: "2023",
    location: "When Your Dreams Breathe",
    image: "https://hsrtiles.in/wp-content/uploads/2026/04/D_S_WEDDING_TEASER_1_1_ipnrf7.webm",
  },

  

 
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  


 useEffect(() => {
  const el = videoRef.current;
  if (!el) return;

  // Skip company watermark at start
  const seekAndPlay = () => {
    el.currentTime = 9;
  };

  // Loop back to 6s before the last 6 seconds (skips end card too)
  const handleTimeUpdate = () => {
    if (el.duration && el.currentTime >= el.duration - 9) {
      el.currentTime = 9;
    }
  };

  el.addEventListener("loadedmetadata", seekAndPlay);
  el.addEventListener("timeupdate", handleTimeUpdate);
  if (el.readyState >= 1) seekAndPlay();

  return () => {
    el.removeEventListener("loadedmetadata", seekAndPlay);
    el.removeEventListener("timeupdate", handleTimeUpdate);
  };
}, []);

  return (
    <div
     
      onClick={() => router.push(`/films/couple/${project.coupleSlug}`)}
      className={`bg-[#F4F1E5] group cursor-pointer transition-all duration-700 `}
      style={{ transitionDelay: `${(index % 2) * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden">
       {project.image ? (
    <video
      ref={videoRef}
      src={project.image}
      className={`w-full aspect-[4/3] object-cover transition-all duration-[800ms] ease-out ${
        hovered ? "scale-[1.04]" : "scale-100"
      }`}
      muted
      playsInline
      
      autoPlay
      preload="metadata"
    />
  ) : null}
      </div>
      <div className="flex items-start justify-between pt-5 pb-5">
        <div className="flex items-start gap-4">
         
          <div>
            <h3 style={{
                            fontFamily: 'var(--font-editorial, serif)',

            }} className="text-lg md:text-xl font-light tracking-tight text-foreground mb-1.5">
              {project.title}
            </h3>
            {/* <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
              {project.location} 
            </p> */}
          </div>
        </div>
        { 
          project.id  && (
             <ArrowUpRight
          className={`h-4 w-4 text-muted-foreground/40 transition-all duration-300 mt-1.5 ${
            hovered ? "translate-x-0.5 -translate-y-0.5 text-foreground" : ""
          }`}
        />
          )
        }

       
      </div>
    </div>
  )
}

export function ProjectsSection() {
    const router = useRouter()


  return (
    <section id="services" className="px-6 py-28 md:px-12 lg:px-20 md:py-10 bg-[#F4F1E5]">
      <div
      
        
        className={`flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-border transition-all duration-700`}
      >
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground ">
            films
          </p>
         
        </div>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-border">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
        <div className="flex justify-center mt-4">
             <Button onClick={()=> router.push('/films')} variant="outline" >
      Explore  More
      </Button>
        </div>
    </section>
  )
}
