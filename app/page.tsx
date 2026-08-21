import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Experiences } from "@/components/sections/Experiences";
import { Positioning } from "@/components/sections/Positioning";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Experiences />

        <Positioning />
        {/* Temporary content */}
        <section
          id="servicios"
          className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white"
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              Próximamente
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
              Servicios
            </h2>
          </div>
        </section>

        <section
          id="experiencias"
          className="min-h-screen bg-[#050505]"
        />

        <section
          id="galeria"
          className="min-h-screen bg-[#080808]"
        />

        <section
          id="contacto"
          className="min-h-screen bg-[#050505]"
        />
      </main>

      <Footer />
    </>
  )
}