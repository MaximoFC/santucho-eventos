import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Experiences } from "@/components/sections/Experiences";
import { Positioning } from "@/components/sections/Positioning";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/home/Gallery";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Experiences />

        <Positioning />

        <Services />

        <Gallery />

        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}