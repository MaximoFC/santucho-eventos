"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type CardFaceContent = {
    logoSrc: string;
    eyebrow?: string;
    index?: string;
    captionTop?: string;
    captionBottom?: string;
};

const TEXTURE_WIDTH = 2048;
const TEXTURE_HEIGHT = 3031;

export function useCardFaceTexture(content: CardFaceContent) {
    const [texture, setTexture] =
        useState<THREE.CanvasTexture | null>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        let cancelled = false;

        const canvas =
            canvasRef.current ??
            document.createElement("canvas");

        canvas.width = TEXTURE_WIDTH;
        canvas.height = TEXTURE_HEIGHT;

        canvasRef.current = canvas;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        /*
         * ---------------------------------------------------------
         * Imagen del logo
         * ---------------------------------------------------------
         */

        const logo = new Image();

        logo.crossOrigin = "anonymous";
        logo.src = content.logoSrc;

        /*
         * ---------------------------------------------------------
         * Render de la tarjeta
         * ---------------------------------------------------------
         */

        const draw = () => {
            if (cancelled) return;

            const w = TEXTURE_WIDTH;
            const h = TEXTURE_HEIGHT;

            const pad = 140;
            const radius = 140;

            /*
             * -----------------------------------------------------
             * Fondo
             * -----------------------------------------------------
             */

            ctx.clearRect(0, 0, w, h);

            roundRect(
                ctx,
                0,
                0,
                w,
                h,
                radius,
            );

            ctx.fillStyle = "#0a0a0a";
            ctx.fill();

            /*
             * -----------------------------------------------------
             * Borde exterior
             * -----------------------------------------------------
             */

            ctx.lineWidth = 5;

            ctx.strokeStyle =
                "rgba(255,255,255,0.14)";

            ctx.stroke();

            /*
             * -----------------------------------------------------
             * Borde interior
             * -----------------------------------------------------
             */

            roundRect(
                ctx,
                pad * 0.5,
                pad * 0.5,
                w - pad,
                h - pad,
                radius * 0.82,
            );

            ctx.lineWidth = 3;

            ctx.strokeStyle =
                "rgba(255,255,255,0.055)";

            ctx.stroke();

            /*
             * -----------------------------------------------------
             * Metadata superior
             * -----------------------------------------------------
             */

            ctx.textBaseline = "top";

            ctx.fillStyle =
                "rgba(255,255,255,0.45)";

            ctx.font =
                "600 84px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

            ctx.textAlign = "left";

            drawTracked(
                ctx,
                (
                    content.eyebrow ??
                    "EVENT PRODUCTION"
                ).toUpperCase(),
                pad,
                pad,
                8,
            );

            ctx.fillStyle =
                "rgba(255,255,255,0.4)";

            ctx.textAlign = "right";

            drawTracked(
                ctx,
                content.index ?? "01",
                w - pad,
                pad,
                8,
                true,
            );

            /*
             * -----------------------------------------------------
             * Logo
             * -----------------------------------------------------
             */

            if (
                logo.complete &&
                logo.naturalWidth > 0 &&
                logo.naturalHeight > 0
            ) {
                const maxLogoWidth = w * 0.44;
                const maxLogoHeight = h * 0.15;

                const ratio =
                    logo.naturalHeight /
                    logo.naturalWidth;

                let logoW = maxLogoWidth;
                let logoH = logoW * ratio;

                if (logoH > maxLogoHeight) {
                    logoH = maxLogoHeight;
                    logoW = logoH / ratio;
                }

                const logoX =
                    (w - logoW) / 2;

                const logoY =
                    (h - logoH) / 2;

                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";

                ctx.drawImage(
                    logo,
                    logoX,
                    logoY,
                    logoW,
                    logoH,
                );
            }

            /*
             * -----------------------------------------------------
             * Metadata inferior
             * -----------------------------------------------------
             */

            const bottomY =
                h - pad - 260;

            ctx.textAlign = "left";

            ctx.fillStyle =
                "rgba(255,255,255,0.38)";

            ctx.font =
                "500 68px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

            drawTracked(
                ctx,
                (
                    content.captionTop ??
                    "Experiencias que se recuerdan"
                ).toUpperCase(),
                pad,
                bottomY,
                5,
            );

            ctx.fillStyle =
                "rgba(255,255,255,0.72)";

            ctx.font =
                "700 110px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

            drawTracked(
                ctx,
                (
                    content.captionBottom ??
                    "Tucumán · Argentina"
                ).toUpperCase(),
                pad,
                bottomY + 95,
                6,
            );

            /*
             * -----------------------------------------------------
             * Indicador circular
             * -----------------------------------------------------
             */

            const circleR = 130;

            const circleX =
                w - pad - circleR;

            const circleY =
                h - pad - circleR;

            ctx.beginPath();

            ctx.arc(
                circleX,
                circleY,
                circleR,
                0,
                Math.PI * 2,
            );

            ctx.strokeStyle =
                "rgba(255,255,255,0.18)";

            ctx.lineWidth = 5;

            ctx.stroke();

            ctx.fillStyle =
                "rgba(255,255,255,0.68)";

            ctx.font =
                "300 104px system-ui, sans-serif";

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
                "↗",
                circleX + 4,
                circleY - 5,
            );

            /*
             * -----------------------------------------------------
             * Sheen
             * -----------------------------------------------------
             */

            const sheen =
                ctx.createLinearGradient(
                    0,
                    0,
                    w,
                    h,
                );

            sheen.addColorStop(
                0,
                "rgba(255,255,255,0.075)",
            );

            sheen.addColorStop(
                0.35,
                "rgba(255,255,255,0)",
            );

            sheen.addColorStop(
                0.75,
                "rgba(255,255,255,0)",
            );

            sheen.addColorStop(
                1,
                "rgba(255,255,255,0.025)",
            );

            ctx.fillStyle = sheen;

            roundRect(
                ctx,
                0,
                0,
                w,
                h,
                radius,
            );

            ctx.fill();

            /*
             * -----------------------------------------------------
             * Three.js texture
             * -----------------------------------------------------
             */

            const tex =
                new THREE.CanvasTexture(canvas);

            tex.colorSpace =
                THREE.SRGBColorSpace;

            tex.minFilter =
                THREE.LinearMipmapLinearFilter;

            tex.magFilter =
                THREE.LinearFilter;

            tex.generateMipmaps = true;

            tex.anisotropy = 8;

            tex.needsUpdate = true;

            if (!cancelled) {
                setTexture(tex);
            }
        };

        /*
         * ---------------------------------------------------------
         * Esperamos al logo antes de dibujar
         * ---------------------------------------------------------
         */

        if (
            logo.complete &&
            logo.naturalWidth > 0
        ) {
            draw();
        } else {
            logo.onload = draw;
            logo.onerror = draw;
        }

        return () => {
            cancelled = true;
        };
    }, [
        content.logoSrc,
        content.eyebrow,
        content.index,
        content.captionTop,
        content.captionBottom,
    ]);

    return texture;
}

/*
 * -------------------------------------------------------------
 * Rounded rectangle
 * -------------------------------------------------------------
 */

function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
) {
    ctx.beginPath();

    ctx.moveTo(x + r, y);

    ctx.arcTo(
        x + w,
        y,
        x + w,
        y + h,
        r,
    );

    ctx.arcTo(
        x + w,
        y + h,
        x,
        y + h,
        r,
    );

    ctx.arcTo(
        x,
        y + h,
        x,
        y,
        r,
    );

    ctx.arcTo(
        x,
        y,
        x + w,
        y,
        r,
    );

    ctx.closePath();
}

/*
 * -------------------------------------------------------------
 * Letter spacing manual para Canvas 2D
 * -------------------------------------------------------------
 */

function drawTracked(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    spacing: number,
    rightAlign = false,
) {
    const chars = text.split("");

    const widths = chars.map(
        (char) =>
            ctx.measureText(char).width +
            spacing,
    );

    const total =
        widths.reduce(
            (sum, width) =>
                sum + width,
            0,
        );

    let cursor = rightAlign
        ? x - total
        : x;

    const previousAlign =
        ctx.textAlign;

    ctx.textAlign = "left";

    chars.forEach(
        (char, index) => {
            ctx.fillText(
                char,
                cursor,
                y,
            );

            cursor += widths[index];
        },
    );

    ctx.textAlign = previousAlign;
}