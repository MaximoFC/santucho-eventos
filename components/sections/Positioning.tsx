"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { siteConfig } from "@/config/site";

export function Positioning() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 20%"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.08, 1],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [30, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="posicionamiento"
      className="relative isolate overflow-hidden bg-[#050505] px-6 py-28 text-white lg:px-10 lg:py-40"
    >
      {/* Background image */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src="/images/positioning.PNG"
          alt="Público disfrutando de una experiencia producida por Santucho Eventos"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Image treatment */}
      <div className="absolute inset-0 -z-10 bg-black/72" />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/70 to-black/90"
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto max-w-[1600px]"
      >
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.28em] text-white/45"
          >
            {siteConfig.positioning.eyebrow}
          </motion.p>

          {/* Main statement */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.8,
              delay: 0.05,
              ease: "easeOut",
            }}
            className="mt-7 max-w-4xl text-[clamp(4rem,9vw,9rem)] font-semibold uppercase leading-[0.78] tracking-[-0.08em]"
          >
            <span className="block">Una</span>

            <span className="block text-white/55">
              experiencia.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="mt-9 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {siteConfig.positioning.description}
          </motion.p>
        </div>

        {/* Concepts */}
        <div className="mt-24 border-t border-white/15">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.positioning.concepts.map(
              (concept, index) => (
                <motion.article
                  key={concept.id}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className={[
                    "group relative py-7 lg:py-8",
                    "border-b border-white/15",
                    "sm:px-6",
                    "lg:border-b-0 lg:border-r",
                    index === 0 ? "sm:pl-0" : "",
                    index === 3 ? "lg:border-r-0" : "",
                    index >= 2 ? "lg:pt-10" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                      {concept.number}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-[#ff1010] opacity-50 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100"
                    />
                  </div>

                  <h3 className="mt-12 text-2xl font-semibold uppercase tracking-[-0.045em]">
                    {concept.title}
                  </h3>

                  <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-white/50">
                    {concept.description}
                  </p>
                </motion.article>
              ),
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}