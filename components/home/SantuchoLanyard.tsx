"use client";

import Image from "next/image";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from "motion/react";

export type SantuchoLanyardProps = {
    logoSrc?: string;
    eyebrow?: string;
    index?: string;
    captionTop?: string;
    captionBottom?: string;
    className?: string;
};

// Largo de la cinta en px (anclaje → borde superior de la tarjeta).
const STRAP_LENGTH = 150;

/*
 * Versión DOM del lanyard: sin WebGL ni física. La tarjeta se arrastra
 * (mouse o touch) y vuelve con un resorte; la cinta la sigue y la
 * rotación sale del desplazamiento horizontal. Todo corre en el
 * compositor vía transforms, así que no pesa en el hilo principal.
 */
export function SantuchoLanyard({
    logoSrc = "/logo-black.png",
    eyebrow = "Event production",
    index = "01",
    captionTop = "Experiencias que se recuerdan",
    captionBottom = "Tucumán · Argentina",
    className,
}: SantuchoLanyardProps) {
    const reduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Con la tarjeta arrastrada a un costado, se inclina hacia el anclaje.
    const rotate = useTransform(x, [-250, 250], [18, -18]);
    const strapY2 = useTransform(y, (v) => STRAP_LENGTH + v);

    return (
        <div
            className={`relative flex h-full w-full justify-center ${className ?? ""}`}
        >
            {/* Balanceo en reposo: todo el conjunto pivota desde el anclaje */}
            <motion.div
                className="relative flex flex-col items-center"
                style={{ transformOrigin: "50% 0%" }}
                animate={reduceMotion ? undefined : { rotate: [-2.5, 2.5] }}
                transition={{
                    duration: 3.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
            >
                {/* Anclaje */}
                <span className="relative z-10 h-3 w-3 rounded-full bg-white/25" />

                {/* Cinta: línea del anclaje al borde superior de la tarjeta */}
                <svg
                    className="pointer-events-none absolute left-1/2 top-1.5 overflow-visible"
                    width="1"
                    height="1"
                >
                    <motion.line
                        x1={0}
                        y1={0}
                        x2={x}
                        y2={strapY2}
                        stroke="#2a2929"
                        strokeWidth={10}
                        strokeLinecap="round"
                    />
                </svg>

                <motion.div
                    drag
                    dragSnapToOrigin
                    dragElastic={0.35}
                    dragTransition={{ bounceStiffness: 260, bounceDamping: 9 }}
                    whileDrag={{ scale: 1.03, cursor: "grabbing" }}
                    style={{
                        x,
                        y,
                        rotate,
                        marginTop: STRAP_LENGTH - 12,
                        transformOrigin: "50% 0%",
                        touchAction: "none",
                    }}
                    className="relative aspect-[2/2.95] w-[min(62vw,280px)] cursor-grab select-none rounded-[1.1rem] border border-white/15 bg-[#0a0a0a] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] lg:w-[300px]"
                >
                    {/* Ojal de la cinta */}
                    <span className="absolute left-1/2 top-3 h-2 w-10 -translate-x-1/2 rounded-full bg-white/10" />

                    <div className="pointer-events-none absolute inset-2.5 rounded-[0.9rem] border border-white/5 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),transparent_35%,transparent_75%,rgba(255,255,255,0.025))]" />

                    <div className="relative flex h-full flex-col justify-between text-white">
                        <div className="flex justify-between pt-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em]">
                            <span className="text-white/45">{eyebrow}</span>
                            <span className="text-white/40">{index}</span>
                        </div>

                        <Image
                            src={logoSrc}
                            alt=""
                            width={400}
                            height={200}
                            draggable={false}
                            className="mx-auto h-auto max-h-[30%] w-[72%] object-contain"
                        />

                        <div className="uppercase">
                            <p className="text-[0.6rem] font-semibold tracking-[0.12em] text-white/40">
                                {captionTop}
                            </p>
                            <p className="mt-1 text-xs font-bold tracking-[0.14em] text-white/75">
                                {captionBottom}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
