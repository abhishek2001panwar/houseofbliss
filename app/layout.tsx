import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'

import Footer from "./components/footer";



const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})



export const metadata: Metadata = {
  title: "House of Bliss",
  description:
    "House of Bliss is a premier wedding photography and cinematography studio based in Bengaluru, India. With over a decade of experience, we specialize in capturing the essence of love stories through artistic vision and cinematic storytelling.",

  keywords: [
    "Best wedding photographer in Bangalore",
    "cinematic wedding photography Bangalore",
    "wedding photographer Bengaluru",
    "candid wedding photography Bangalore",
    "pre wedding photoshoot Bangalore",
    "drone wedding videography Bangalore",
    "luxury wedding photography Bangalore",
    "House of Bliss wedding photography"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
       
        {children}
        <Footer />
      </body>
    </html>
  );
}
