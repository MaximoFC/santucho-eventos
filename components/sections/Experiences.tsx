"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { siteConfig } from "@/config/site";

type Experience = (typeof siteConfig.experiences)[number];

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className={[
        "group relative overflow-hidden rounded-[1.75rem]",
        "border border-white/10 bg-neutral-900",
        "lg:translate-y-0",
        index % 2 === 1 ? "lg:translate-y-16" : "",
      ].join(" ")}
    >
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6] lg:aspect-[4/5]">
        <Image
          src={experience.image}
          alt={`Experiencia de Santucho Eventos: ${experience.title.replace(
            "\n",
            " ",
          )}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
          style={{
            objectPosition: experience.imagePosition ?? "center",
          }}
        />

        {/* Darkening */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-white/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top metadata */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
            {experience.number}
          </span>

          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
            {experience.category}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
          <div className="max-w-md">
            <h3 className="whitespace-pre-line text-[2.35rem] font-semibold uppercase leading-[0.86] tracking-[-0.065em] text-white sm:text-5xl">
              {experience.title}
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60 sm:text-[15px]">
              {experience.description}
            </p>
          </div>

          {/* Decorative indicator */}
          <div
            aria-hidden="true"
            className="mt-7 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm text-white/60 transition-all duration-500 group-hover:border-[#ff1010] group-hover:bg-[#ff1010] group-hover:text-white"
          >
            +
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Experiences() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 20%"],
  });

  const ruleScale = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="experiencias"
      className="relative overflow-hidden bg-[#050505] px-6 py-28 text-white lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 xl:gap-28">
          {/* INTRO */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">
              {siteConfig.experienceIntro.eyebrow}
            </p>

            <h2 className="mt-7 max-w-xl whitespace-pre-line text-[clamp(3.5rem,6.5vw,7rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em] text-white">
              {siteConfig.experienceIntro.title}
            </h2>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-white/50">
              {siteConfig.experienceIntro.description}
            </p>

            <Link
              href="#contacto"
              className="group mt-9 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/65 transition-colors duration-300 hover:text-white"
            >
              <span>Contanos tu idea</span>

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {/* EXPERIENCES */}
          <div className="relative">
            {/* Section rule */}
            <motion.div
              style={{
                scaleX: ruleScale,
                transformOrigin: "left",
              }}
              className="mb-8 h-px w-full bg-white/15"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5">
              {siteConfig.experiences.map((experience, index) => (
                <ExperienceCard
                  key={experience.number}
                  experience={experience}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}