"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/*
 * -------------------------------------------------------------
 * Genera la CARA de la tarjeta como una textura de canvas.
 *
 * El Lanyard original de reactbits usa un modelo .glb hecho en
 * Blender con la textura ya "horneada". Nosotros no tenemos ese
 * modelo, así que reconstruimos el mismo resultado dibujando el
 * diseño de <SantuchoCard /> directamente en un <canvas> 2D y
 * usándolo como CanvasTexture sobre una caja 3D (RoundedBox).
 *
 * Ventaja: podés seguir editando el diseño acá, en CSS-like
 * canvas calls, sin tocar Blender ni exportar modelos.
 * -------------------------------------------------------------
 */

export type CardFaceContent = {
    logoSrc: string;
    eyebrow?: string;
    index?: string;
    captionTop?: string;
    captionBottom?: string;
};

const TEXTURE_WIDTH = 1600;
const TEXTURE_HEIGHT = 2368; // mantiene el aspect ratio 250:370 del diseño original

export function useCardFaceTexture(content: CardFaceContent) {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(
        null,
    );

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

        if (!ctx) {
            return;
        }

        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = content.logoSrc;

        const draw = () => {
            if (cancelled) {
                return;
            }

            const w = TEXTURE_WIDTH;
            const h = TEXTURE_HEIGHT;
            const pad = 60;
            const radius = 68;

            ctx.clearRect(0, 0, w, h);

            /* Fondo de la tarjeta */
            roundRect(ctx, 0, 0, w, h, radius);
            ctx.fillStyle = "#0a0a0a";
            ctx.fill();

            /* Borde exterior sutil */
            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(255,255,255,0.15)";
            ctx.stroke();

            /* Borde interior */
            roundRect(
                ctx,
                pad * 0.5,
                pad * 0.5,
                w - pad,
                h - pad,
                radius * 0.8,
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(255,255,255,0.06)";
            ctx.stroke();

            /* Fila superior */
            ctx.textBaseline = "top";
            ctx.fillStyle = "rgba(255,255,255,0.35)";
            ctx.font =
                "600 22px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "left";
            drawTracked(
                ctx,
                (content.eyebrow ?? "EVENT PRODUCTION").toUpperCase(),
                pad,
                pad,
                3,
            );

            ctx.fillStyle = "rgba(255,255,255,0.3)";
            ctx.textAlign = "right";
            drawTracked(
                ctx,
                content.index ?? "01",
                w - pad,
                pad,
                3,
                true,
            );

            /* Logo centrado */
            const logoW = w * 0.62;
            const logoH = logoW * (logo.height / logo.width || 0.5);
            const logoX = (w - logoW) / 2;
            const logoY = (h - logoH) / 2;

            if (logo.complete && logo.naturalWidth > 0) {
                ctx.drawImage(logo, logoX, logoY, logoW, logoH);
            }

            /* Fila inferior */
            const bottomY = h - pad - 90;

            ctx.textAlign = "left";
            ctx.fillStyle = "rgba(255,255,255,0.3)";
            ctx.font = "500 18px system-ui, sans-serif";
            drawTracked(
                ctx,
                (
                    content.captionTop ??
                    "Experiencias que se recuerdan"
                ).toUpperCase(),
                pad,
                bottomY,
                2,
            );

            ctx.fillStyle = "rgba(255,255,255,0.55)";
            ctx.font =
                "600 20px system-ui, sans-serif";
            drawTracked(
                ctx,
                (
                    content.captionBottom ??
                    "Tucumán · Argentina"
                ).toUpperCase(),
                pad,
                bottomY + 34,
                2,
            );

            /* Botón circular inferior derecho */
            const circleR = 46;
            const circleX = w - pad - circleR;
            const circleY = h - pad - circleR;

            ctx.beginPath();
            ctx.arc(circleX, circleY, circleR, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255,255,255,0.18)";
            ctx.lineWidth = 2.5;
            ctx.stroke();

            ctx.fillStyle = "rgba(255,255,255,0.65)";
            ctx.font = "300 40px system-ui, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("↗", circleX + 1, circleY - 2);

            /* Brillo diagonal sutil */
            const sheen = ctx.createLinearGradient(0, 0, w, h);
            sheen.addColorStop(0, "rgba(255,255,255,0.07)");
            sheen.addColorStop(0.4, "rgba(255,255,255,0.0)");
            ctx.fillStyle = sheen;
            roundRect(ctx, 0, 0, w, h, radius);
            ctx.fill();

            const tex = new THREE.CanvasTexture(canvas);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.needsUpdate = true;

            setTexture(tex);
        };

        if (logo.complete && logo.naturalWidth > 0) {
            draw();
        } else {
            logo.onload = draw;
            logo.onerror = draw;
        }

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        content.logoSrc,
        content.eyebrow,
        content.index,
        content.captionTop,
        content.captionBottom,
    ]);

    return texture;
}

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
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

/** Dibuja texto con letter-spacing manual (canvas 2D no lo soporta nativo). */
function drawTracked(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    spacing: number,
    rightAlign = false,
) {
    const chars = text.split("");
    const widths = chars.map((c) => ctx.measureText(c).width + spacing);
    const total = widths.reduce((a, b) => a + b, 0);

    let cursor = rightAlign ? x - total : x;

    const prevAlign = ctx.textAlign;
    ctx.textAlign = "left";

    chars.forEach((c, i) => {
        ctx.fillText(c, cursor, y);
        cursor += widths[i];
    });

    ctx.textAlign = prevAlign;
}
