"use client";

import {
    Canvas,
    extend,
    useFrame,
    useThree,
} from "@react-three/fiber";

import type {
    ThreeElement,
} from "@react-three/fiber";

import {
    Environment,
    Lightformer,
    RoundedBox,
} from "@react-three/drei";

import {
    BallCollider,
    CuboidCollider,
    interactionGroups,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
    type RapierRigidBody,
} from "@react-three/rapier";

import {
    MeshLineGeometry,
    MeshLineMaterial,
} from "meshline";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import * as THREE from "three";

import {
    useCardFaceTexture,
} from "./useCardFaceTexture";

/*
 * -------------------------------------------------------------
 * MeshLine
 * -------------------------------------------------------------
 */

extend({
    MeshLineGeometry,
    MeshLineMaterial,
});

declare module "@react-three/fiber" {
    interface ThreeElements {
        meshLineGeometry:
            ThreeElement<typeof MeshLineGeometry>;

        meshLineMaterial:
            ThreeElement<typeof MeshLineMaterial>;
    }
}

/*
 * -------------------------------------------------------------
 * Configuración de tarjeta
 * -------------------------------------------------------------
 */

const CARD_WIDTH = 2.0;
const CARD_HEIGHT = 2.95;
const CARD_DEPTH = 0.07;

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
        <div
            className={`relative h-full w-full ${
                className ?? ""
            }`}
        >
            <Canvas
                camera={{
                    position: [0, 0.5, 13],
                    fov: 22,
                }}
                gl={{
                    alpha: true,
                    antialias: true,
                }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.75} />

                <directionalLight
                    position={[3, 6, 4]}
                    intensity={1.15}
                />

                <Physics
                    gravity={[0, -25, 0]}
                    interpolate
                    timeStep={1 / 60}
                >
                    <Band
                        logoSrc={logoSrc}
                        eyebrow={eyebrow}
                        index={index}
                        captionTop={captionTop}
                        captionBottom={captionBottom}
                    />
                </Physics>

                <Environment resolution={256}>
                    <group
                        rotation={[
                            Math.PI / 2,
                            0,
                            0,
                        ]}
                    >
                        <Lightformer
                            intensity={2.5}
                            color="white"
                            position={[
                                0,
                                -1,
                                5,
                            ]}
                            scale={[
                                10,
                                10,
                                1,
                            ]}
                            form="rect"
                        />

                        <Lightformer
                            intensity={1.2}
                            color="white"
                            position={[
                                -2,
                                3,
                                1,
                            ]}
                            scale={[
                                4,
                                4,
                                1,
                            ]}
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
 * Band
 * -------------------------------------------------------------
 */

function Band({
    logoSrc,
    eyebrow,
    index,
    captionTop,
    captionBottom,
}: Required<
    Omit<
        SantuchoLanyardProps,
        "className" | "logoSrc"
    >
> & {
    logoSrc: string;
}) {
    const band =
        useRef<
            THREE.Mesh<
                MeshLineGeometry,
                THREE.Material
            >
        >(null!);

    const fixed =
        useRef<RapierRigidBody>(null!);

    const j1 =
        useRef<RapierRigidBody>(null!);

    const j2 =
        useRef<RapierRigidBody>(null!);

    const j3 =
        useRef<RapierRigidBody>(null!);

    const j4 =
        useRef<RapierRigidBody>(null!);

    const j5 =
        useRef<RapierRigidBody>(null!);

    const card =
        useRef<RapierRigidBody>(null!);

    const {
        width,
        height,
    } = useThree(
        (state) => state.size,
    );

    /*
     * ---------------------------------------------------------
     * Objetos reutilizados
     * ---------------------------------------------------------
     */

    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ]),
    );

    const vec =
        useRef(
            new THREE.Vector3(),
        ).current;

    const dir =
        useRef(
            new THREE.Vector3(),
        ).current;

    const ang =
        useRef(
            new THREE.Vector3(),
        ).current;

    const quat =
        useRef(
            new THREE.Quaternion(),
        ).current;

    const euler =
        useRef(
            new THREE.Euler(),
        ).current;

    const [
        dragged,
        setDragged,
    ] =
        useState<
            THREE.Vector3 | false
        >(false);

    /*
     * ---------------------------------------------------------
     * Física de la cuerda
     * ---------------------------------------------------------
     */

    useRopeJoint(
        fixed,
        j1,
        [
            [0, 0, 0],
            [0, 0, 0],
            0.6,
        ],
    );

    useRopeJoint(
        j1,
        j2,
        [
            [0, 0, 0],
            [0, 0, 0],
            0.6,
        ],
    );

    useRopeJoint(
        j2,
        j3,
        [
            [0, 0, 0],
            [0, 0, 0],
            0.6,
        ],
    );

    useRopeJoint(
        j3,
        j4,
        [
            [0, 0, 0],
            [0, 0, 0],
            0.6,
        ],
    );

    useRopeJoint(
        j4,
        j5,
        [
            [0, 0, 0],
            [0, 0, 0],
            0.6,
        ],
    );

    useSphericalJoint(
        j5,
        card,
        [
            [0, 0, 0],
            [0, CARD_HEIGHT / 2, 0],
        ],
    );

    /*
     * ---------------------------------------------------------
     * Cursor
     * ---------------------------------------------------------
     */

    useEffect(() => {
        if (dragged) {
            document.body.style.cursor =
                "grabbing";

            return () => {
                document.body.style.cursor =
                    "auto";
            };
        }

        document.body.style.cursor =
            "auto";
    }, [dragged]);

    /*
     * ---------------------------------------------------------
     * Render loop
     * ---------------------------------------------------------
     */

    useFrame((state) => {
        /*
         * -----------------------------------------------------
         * Drag
         * -----------------------------------------------------
         */

        if (
            dragged &&
            card.current
        ) {
            vec
                .set(
                    state.pointer.x,
                    state.pointer.y,
                    0.5,
                )
                .unproject(
                    state.camera,
                );

            dir
                .copy(vec)
                .sub(
                    state.camera.position,
                )
                .normalize();

            vec.add(
                dir.multiplyScalar(
                    state.camera.position.length(),
                ),
            );

            card.current.setNextKinematicTranslation(
                {
                    x:
                        vec.x -
                        dragged.x,

                    y:
                        vec.y -
                        dragged.y,

                    z:
                        vec.z -
                        dragged.z,
                },
            );
        }

        /*
         * -----------------------------------------------------
         * Guardas
         * -----------------------------------------------------
         */

        if (
            !fixed.current ||
            !j1.current ||
            !j2.current ||
            !j3.current ||
            !j4.current ||
            !j5.current ||
            !card.current ||
            !band.current
        ) {
            return;
        }

        /*
         * -----------------------------------------------------
         * Posiciones
         * -----------------------------------------------------
         */

        const p0 =
            j5.current.translation();

        const p1 =
            j4.current.translation();

        const p2 =
            j3.current.translation();

        const p3 =
            j2.current.translation();

        const p4 =
            j1.current.translation();

        const p5 =
            fixed.current.translation();

        /*
         * -----------------------------------------------------
         * Protección contra NaN
         * -----------------------------------------------------
         */

        const values = [
            p0,
            p1,
            p2,
            p3,
            p4,
            p5,
        ].flatMap(
            (p) => [
                p.x,
                p.y,
                p.z,
            ],
        );

        if (
            values.some(
                (value) =>
                    !Number.isFinite(
                        value,
                    ),
            )
        ) {
            return;
        }

        /*
         * -----------------------------------------------------
         * Actualizar cuerda
         * -----------------------------------------------------
         */

        curve.points[0].copy(p0);
        curve.points[1].copy(p1);
        curve.points[2].copy(p2);
        curve.points[3].copy(p3);
        curve.points[4].copy(p4);
        curve.points[5].copy(p5);

        band.current.geometry.setPoints(
            curve.getPoints(48),
        );

        /*
         * -----------------------------------------------------
         * Estabilización de tarjeta
         * -----------------------------------------------------
         */

        const q =
            card.current.rotation();

        quat.set(
            q.x,
            q.y,
            q.z,
            q.w,
        );

        euler.setFromQuaternion(
            quat,
            "YXZ",
        );

        ang.copy(
            card.current.angvel(),
        );

        const angMag = Math.hypot(
            ang.x,
            ang.y,
            ang.z,
        );

        const yaw = euler.y;

        /*
         * Sólo corregimos si hay movimiento o desvío real.
         * Si no, dejamos que la física la deje dormir en paz
         * en vez de despertarla en cada frame (eso era lo que
         * generaba la vibración constante en reposo).
         */

        if (
            angMag > 0.0015 ||
            Math.abs(yaw) > 0.01
        ) {
            card.current.setAngvel(
                {
                    x: ang.x,
                    y:
                        ang.y -
                        yaw * 0.15,
                    z: ang.z,
                },
                true,
            );
        }
    });

    return (
        <>
            {/*
             * -------------------------------------------------
             * Punto fijo
             * -------------------------------------------------
             */}

            <RigidBody
                ref={fixed}
                type="fixed"
                position={[
                    0,
                    4.7,
                    0,
                ]}
            />

            {/*
             * -------------------------------------------------
             * Joint 1
             * -------------------------------------------------
             */}

            <RigidBody
                position={[
                    0.06,
                    4.7,
                    0,
                ]}
                ref={j1}
                angularDamping={9}
                linearDamping={4.5}
                collisionGroups={interactionGroups(
                    1,
                    [],
                )}
            >
                <BallCollider
                    args={[0.08]}
                />
            </RigidBody>

            {/*
             * -------------------------------------------------
             * Joint 2
             * -------------------------------------------------
             */}

            <RigidBody
                position={[
                    0.12,
                    4.7,
                    0,
                ]}
                ref={j2}
                angularDamping={9}
                linearDamping={4.5}
                collisionGroups={interactionGroups(
                    1,
                    [],
                )}
            >
                <BallCollider
                    args={[0.08]}
                />
            </RigidBody>

            {/*
             * -------------------------------------------------
             * Joint 3
             * -------------------------------------------------
             */}

            <RigidBody
                position={[
                    0.18,
                    4.7,
                    0,
                ]}
                ref={j3}
                angularDamping={9}
                linearDamping={4.5}
                collisionGroups={interactionGroups(
                    1,
                    [],
                )}
            >
                <BallCollider
                    args={[0.08]}
                />
            </RigidBody>

            {/*
             * -------------------------------------------------
             * Joint 4
             * -------------------------------------------------
             */}

            <RigidBody
                position={[
                    0.24,
                    4.7,
                    0,
                ]}
                ref={j4}
                angularDamping={9}
                linearDamping={4.5}
                collisionGroups={interactionGroups(
                    1,
                    [],
                )}
            >
                <BallCollider
                    args={[0.08]}
                />
            </RigidBody>

            {/*
             * -------------------------------------------------
             * Joint 5
             * -------------------------------------------------
             */}

            <RigidBody
                position={[
                    0.3,
                    4.7,
                    0,
                ]}
                ref={j5}
                angularDamping={9}
                linearDamping={4.5}
                collisionGroups={interactionGroups(
                    1,
                    [],
                )}
            >
                <BallCollider
                    args={[0.08]}
                />
            </RigidBody>

            {/*
             * -------------------------------------------------
             * Card
             * -------------------------------------------------
             */}

            <RigidBody
                ref={card}
                type={
                    dragged
                        ? "kinematicPosition"
                        : "dynamic"
                }
                position={[
                    0.4,
                    2.5,
                    0,
                ]}
                angularDamping={6.5}
                linearDamping={3.5}
                canSleep={true}
                collisionGroups={interactionGroups(
                    1,
                    [],
                )}
            >
                <CuboidCollider
                    args={[
                        CARD_WIDTH / 2,
                        CARD_HEIGHT / 2,
                        CARD_DEPTH,
                    ]}
                />

                <group
                    onPointerUp={(event) => {
                        (
                            event.target as Element
                        ).releasePointerCapture?.(
                            event.pointerId,
                        );

                        setDragged(false);
                    }}
                    onPointerDown={(event) => {
                        (
                            event.target as Element
                        ).setPointerCapture?.(
                            event.pointerId,
                        );

                        setDragged(
                            new THREE.Vector3()
                                .copy(
                                    event.point as THREE.Vector3,
                                )
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
                        captionTop={
                            captionTop
                        }
                        captionBottom={
                            captionBottom
                        }
                    />
                </group>
            </RigidBody>

            {/*
             * -------------------------------------------------
             * Cuerda visible
             * -------------------------------------------------
             */}

            <mesh ref={band}>
                <meshLineGeometry />

                <meshLineMaterial
                    args={[
                        {
                            color: "#242323",
                        },
                    ]}
                    resolution={[
                        width || 1,
                        height || 1,
                    ]}
                    lineWidth={0.075}
                    transparent
                    opacity={0.96}
                />
            </mesh>
        </>
    );
}

/*
 * -------------------------------------------------------------
 * Card Face
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
    const texture =
        useCardFaceTexture({
            logoSrc,
            eyebrow,
            index,
            captionTop,
            captionBottom,
        });

    return (
        <group>
            {/*
             * -------------------------------------------------
             * Cuerpo 3D
             * -------------------------------------------------
             */}

            <RoundedBox
                args={[
                    CARD_WIDTH,
                    CARD_HEIGHT,
                    CARD_DEPTH,
                ]}
                radius={0.09}
                smoothness={6}
                castShadow
            >
                <meshStandardMaterial
                    color="#0a0a0a"
                    roughness={0.42}
                    metalness={0.08}
                />
            </RoundedBox>

            {/*
             * -------------------------------------------------
             * Cara visual
             * -------------------------------------------------
             */}

            {texture && (
                <mesh
                    position={[
                        0,
                        0,
                        CARD_DEPTH / 2 +
                            0.004,
                    ]}
                >
                    <planeGeometry
                        args={[
                            CARD_WIDTH -
                                0.02,
                            CARD_HEIGHT -
                                0.02,
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