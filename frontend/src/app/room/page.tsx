'use client';

import {Canvas, useFrame} from "@react-three/fiber";
import {Environment, Image, Stage, useScroll} from "@react-three/drei";
import Room from "@/components/Room";
import Desk from "@/components/Desk";
import Macbook from "@/components/Macbook";
import React, {useEffect, useState} from "react";
import GamecubeController from "@/components/GamecubeController"

export default function RoomScene() {

    const [hovering, setHovering] = useState(false)
    useEffect(() => {
        document.body.style.cursor = hovering ? 'pointer' : 'auto'
    }, [hovering])
    //
    // const scroll = useScroll();
    // useFrame((state, delta) => {
    //
    // })

    return (
        <div style={{width: "100%", height: "100%"}}>
            <Canvas camera={{position: [0, 0, 0]}}>
                <Stage>
                    <color args={['#241a1a']} attach="background"/>
                    <Environment
                        background={true} // can be true, false or "only" (which only sets the background) (default: false)
                        backgroundBlurriness={0} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
                        backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
                        backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
                        environmentIntensity={0.3} // optional intensity factor (default: 1, only works with three 0.163 and up)
                        environmentRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
                        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
                        path="/"
                        preset={"park"}
                        scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
                        encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
                    />
                    {/*<ScrollControls pages={3} damping={0.1}>*/}
                    {/*</ScrollControls>*/}
                    <Room/>
                    {/*<Blinds scale={0.01} position={[-0.5, 0, 0.4]}/>*/}
                    <Desk scale={0.7} position={[0, -2.2, -3]} rotation={[0, Math.PI / 2, 0]}/>
                    <Macbook scale={0.5} position={[1, -0.90, -3]}/>
                    {/* eslint-disable jsx-a11y/alt-text */}
                    <Image url="/bomb_painting.png"
                           scale={2}
                           position={[-3.85, 0.80, 1.5]}
                           rotation={[0, Math.PI / 2, 0]}
                           onClick={() => window.open("https://dustinalandzes.github.io/super-mario-64-star-select/")}
                           onPointerOver={() => setHovering(true)}
                           onPointerOut={() => setHovering(false)}
                    />
                    {/* eslint-disable jsx-a11y/alt-text */}
                    <GamecubeController
                        position={[-2, -0.5, -3]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={0.01}
                        onClick={() => window.open("https://dustinalandzes.github.io/react-three-fiber-ssbm/")}
                        onPointerOver={() => setHovering(true)}
                        onPointerOut={() => setHovering(false)}
                    />
                </Stage>
            </Canvas>
        </div>
    );
}