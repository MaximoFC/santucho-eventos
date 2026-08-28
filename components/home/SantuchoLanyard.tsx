"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import type { ThreeElement } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
    type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { useCardFaceTexture } from "./useCardFaceTexture";

/*
 * -------------------------------------------------------------
 * Registrar meshline como elemento JSX válido para R3F
 * -------------------------------------------------------------
 */
extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
    interface ThreeElements {
        meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
        meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
    }
}

/*
 * -------------------------------------------------------------
 * Config
 *
 * Esta implementación sigue el mismo patrón que usa reactbits.dev
 * para su componente Lanyard (a su vez basado en el badge de
 * Vercel Ship, documentado por pmndrs). Puntos clave que se
 * respetan a propósito, porque son los que hacen que el original
 * sea liviano y estable:
 *
 *  - El useFrame MUTA objetos ya creados (curve.points[i].copy(...))
 *    en vez de instanciar Vector3/Quaternion/CatmullRomCurve3
 *    nuevos en cada frame (60-120 veces por segundo).
 *  - 3 joints intermedios (j1, j2, j3), no 2.
 *  - El drag usa camera.unproject() sobre el puntero normalizado
 *    de R3F, no un raycaster manual contra un plano.
 *  - Los tipos de rigid body se pasan como string
 *    ('kinematicPosition' / 'dynamic'), como espera la API actual
 *    de @react-three/rapier.
 * -------------------------------------------------------------
 */

const CARD_WIDTH = 1.6;
const CARD_HEIGHT = 2.36; // ratio 250:370 del diseño original
const CARD_DEPTH = 0.06;

export type SantuchoLanyardProps = {
    logoSrc?: string;
    eyebrow?: string;
    index?: string;
    captionTop?: string;
    captionBottom?: string;
    className?: string;
};

export function SantuchoLanyard({
    logoSrc = "/logo-black.png",
    eyebrow = "Event production",
    index = "01",
    captionTop = "Experiencias que se recuerdan",
    captionBottom = "Tucumán · Argentina",
    className,
}: SantuchoLanyardProps) {
    return (
        <div className={`relative h-[560px] w-full ${className ?? ""}`}>
            <Canvas
                camera={{ position: [0, 0.5, 13], fov: 22 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
                onCreated={({ gl }) => {
                    // Si el contexto WebGL se cae, evitamos que quede
                    // muerto para siempre y lo dejamos loggeado.
                    gl.domElement.addEventListener(
                        "webglcontextlost",
                        (e) => {
                            e.preventDefault();
                            // eslint-disable-next-line no-console
                            console.warn("WebGL context lost", e);
                        },
                    );
                    gl.domElement.addEventListener(
                        "webglcontextrestored",
                        () => {
                            // eslint-disable-next-line no-console
                            console.warn("WebGL context restored");
                        },
                    );
                }}
            >
                <ambientLight intensity={0.6} />

                <directionalLight
                    position={[3, 6, 4]}
                    intensity={1.1}
                    color="#ffffff"
                />

                <Physics gravity={[0, -40, 0]} interpolate timeStep={1 / 60}>
                    <Band
                        logoSrc={logoSrc}
                        eyebrow={eyebrow}
                        index={index}
                        captionTop={captionTop}
                        captionBottom={captionBottom}
                    />
                </Physics>

                <Environment resolution={256}>
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <Lightformer
                            intensity={2.5}
                            color="white"
                            position={[0, -1, 5]}
                            scale={[10, 10, 1]}
                            form="rect"
                        />
                        <Lightformer
                            intensity={1.2}
                            color="white"
                            position={[-2, 3, 1]}
                            scale={[4, 4, 1]}
                            form="rect"
                        />
                    </group>
                </Environment>
            </Canvas>
        </div>
    );
}

/*
 * -------------------------------------------------------------
 * Band: cuerda física + tarjeta, siguiendo el patrón de
 * pmndrs/Vercel (fixed -> j1 -> j2 -> j3 -> card)
 * -------------------------------------------------------------
 */

function Band({
    logoSrc,
    eyebrow,
    index,
    captionTop,
    captionBottom,
}: Required<Omit<SantuchoLanyardProps, "className" | "logoSrc">> & {
    logoSrc: string;
}) {
    const band = useRef<THREE.Mesh<MeshLineGeometry, THREE.Material>>(null!);
    const fixed = useRef<RapierRigidBody>(null!);
    const j1 = useRef<RapierRigidBody>(null!);
    const j2 = useRef<RapierRigidBody>(null!);
    const j3 = useRef<RapierRigidBody>(null!);
    const card = useRef<RapierRigidBody>(null!);

    const { width, height } = useThree((state) => state.size);

    // Objetos reutilizados en cada frame — NO se recrean, se mutan.
    // Esto es clave: instanciar THREE.Vector3/Quaternion/Curve en un
    // hook que corre a 60-120fps genera mucha presión de garbage
    // collection y puede ser el tipo de cosa que hace tambalear a
    // un driver de GPU ya al límite.
    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ]),
    );
    const vec = useRef(new THREE.Vector3()).current;
    const dir = useRef(new THREE.Vector3()).current;
    const ang = useRef(new THREE.Vector3()).current;
    const rot = useRef(new THREE.Vector3()).current;

    const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);

    useRopeJoint(fixed, j1, [
        [0, 0, 0],
        [0, 0, 0],
        1,
    ]);
    useRopeJoint(j1, j2, [
        [0, 0, 0],
        [0, 0, 0],
        1,
    ]);
    useRopeJoint(j2, j3, [
        [0, 0, 0],
        [0, 0, 0],
        1,
    ]);
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, CARD_HEIGHT / 2, 0],
    ]);

    useEffect(() => {
        if (dragged) {
            document.body.style.cursor = "grabbing";
            return () => {
                document.body.style.cursor = "auto";
            };
        }
        document.body.style.cursor = "auto";
    }, [dragged]);

    useFrame((state) => {
        if (dragged && card.current) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(
                state.camera,
            );
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));

            card.current.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            });
        }

        if (
            !fixed.current ||
            !j1.current ||
            !j2.current ||
            !j3.current ||
            !card.current ||
            !band.current
        ) {
            return;
        }

        const p0 = j3.current.translation();
        const p1 = j2.current.translation();
        const p2 = j1.current.translation();
        const p3 = fixed.current.translation();

        // Guardia anti-NaN: si el solver de física diverge, no le
        // mandamos geometría corrupta a la GPU.
        const values = [p0, p1, p2, p3].flatMap((p) => [p.x, p.y, p.z]);
        if (values.some((v) => !Number.isFinite(v))) {
            return;
        }

        curve.points[0].copy(p0);
        curve.points[1].copy(p1);
        curve.points[2].copy(p2);
        curve.points[3].copy(p3);
        band.current.geometry.setPoints(curve.getPoints(32));

        // Inclinamos la tarjeta para que siempre encare la cámara,
        // igual que en el original.
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation() as unknown as THREE.Vector3);
        card.current.setAngvel(
            { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
            true,
        );
    });

    return (
        <>
            <RigidBody ref={fixed} type="fixed" position={[0, 4.1, 0]} />

            <RigidBody
                position={[0.5, 4.1, 0]}
                ref={j1}
                angularDamping={4}
                linearDamping={2}
            >
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody
                position={[1, 4.1, 0]}
                ref={j2}
                angularDamping={4}
                linearDamping={2}
            >
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody
                position={[1.5, 4.1, 0]}
                ref={j3}
                angularDamping={4}
                linearDamping={2}
            >
                <BallCollider args={[0.1]} />
            </RigidBody>

            <RigidBody
                ref={card}
                type={dragged ? "kinematicPosition" : "dynamic"}
                position={[2, 2.5, 0]}
                angularDamping={2.5}
                linearDamping={1.5}
                canSleep={false}
            >
                <CuboidCollider
                    args={[CARD_WIDTH / 2, CARD_HEIGHT / 2, CARD_DEPTH]}
                />

                <group
                    onPointerUp={(e) => {
                        (e.target as Element).releasePointerCapture?.(
                            e.pointerId,
                        );
                        setDragged(false);
                    }}
                    onPointerDown={(e) => {
                        (e.target as Element).setPointerCapture?.(
                            e.pointerId,
                        );
                        setDragged(
                            new THREE.Vector3()
                                .copy(e.point as THREE.Vector3)
                                .sub(
                                    vec.copy(
                                        card.current.translation() as unknown as THREE.Vector3,
                                    ),
                                ),
                        );
                    }}
                >
                    <CardFace
                        logoSrc={logoSrc}
                        eyebrow={eyebrow}
                        index={index}
                        captionTop={captionTop}
                        captionBottom={captionBottom}
                    />
                </group>
            </RigidBody>

            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    args={[{ color: "#282727" }]}
                    resolution={[width || 1, height || 1]}
                    lineWidth={0.06}
                    transparent
                    opacity={0.9}
                />
            </mesh>
        </>
    );
}

/*
 * -------------------------------------------------------------
 * Cara visible de la tarjeta (usa el canvas del diseño Santucho)
 * -------------------------------------------------------------
 */

function CardFace({
    logoSrc,
    eyebrow,
    index,
    captionTop,
    captionBottom,
}: {
    logoSrc: string;
    eyebrow: string;
    index: string;
    captionTop: string;
    captionBottom: string;
}) {
    const texture = useCardFaceTexture({
        logoSrc,
        eyebrow,
        index,
        captionTop,
        captionBottom,
    });

    return (
        <group>
            {/* -------------------------------------------------
             * Cuerpo físico de la tarjeta
             * ------------------------------------------------- */}
            <RoundedBox
                args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]}
                radius={0.09}
                smoothness={4}
                castShadow
            >
                <meshStandardMaterial
                    color="#0a0a0a"
                    roughness={0.5}
                    metalness={0.05}
                />
            </RoundedBox>

            {/* -------------------------------------------------
             * Cara visual
             *
             * La textura se renderiza como una superficie
             * independiente ligeramente delante de la tarjeta.
             * Esto evita depender de los material groups de
             * RoundedBox.
             * ------------------------------------------------- */}
            {texture && (
                <mesh
                    position={[
                        0,
                        0,
                        CARD_DEPTH / 2 + 0.002,
                    ]}
                >
                    <planeGeometry
                        args={[
                            CARD_WIDTH - 0.02,
                            CARD_HEIGHT - 0.02,
                        ]}
                    />

                    <meshBasicMaterial
                        map={texture}
                        transparent
                        toneMapped={false}
                        depthWrite={false}
                    />
                </mesh>
            )}
        </group>
    );
}