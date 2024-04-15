'use client';

import React from "react";
import {Canvas} from '@react-three/fiber';
import Macbook from "./Macbook";
import Room from "./Room";
import {Environment, Float, PresentationControls, Text, Image} from "@react-three/drei";

export default function Home() {
    return (
        <Canvas>
            {/* <Stage> from drei?*/}
            <Environment preset="forest"/>
            <ambientLight intensity={Math.PI / 2}/>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
            <color args={['#241a1a']} attach="background"/>
            <Environment
              background={true} // can be true, false or "only" (which only sets the background) (default: false)
              backgroundBlurriness={0} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
              backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
              backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
              environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
              environmentRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
              files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
              path="/"
              preset={"park"}
              scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
              encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
            />
            <PresentationControls
                global
                rotation={[0.90, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{mass: 2, tension: 400}}
                snap={{mass: 4, tension: 400}}
            >
                <Macbook scale={1}/>
            </PresentationControls>
            <Room/>
            <Image url="/bomb_painting.png" />
            <Float>
                <Text>DUSTIN ALANDZES</Text>
            </Float>
        </Canvas>
    );
}
