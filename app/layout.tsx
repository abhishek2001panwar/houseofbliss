import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";



export const metadata: Metadata = {
  title: "House of Bliss - Capturing Timeless Moments with a Modern Edge",
  description: "House of Bliss is a premier wedding photography and cinematography studio based in Bengaluru, India. With over a decade of experience, we specialize in capturing the essence of love stories through a blend of artistic vision and emotional storytelling. Our work transcends traditional wedding documentation, creating timeless photographs and films that resonate with the hearts of our clients. Whether it's an intimate ceremony or a grand celebration, House of Bliss is dedicated to preserving your most cherished moments with a modern edge and unparalleled creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        
        {children}
        <Footer />
      </body>
    </html>
  );
}
