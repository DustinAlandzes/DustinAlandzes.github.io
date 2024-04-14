'use client';

import styles from "./page.module.css";
import * as THREE from 'three'
import React, {useRef} from "react";
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import Macbook from "./Macbook";

function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
    }
  })

  return <mesh {...props} ref={meshRef} >
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={'orange'} />
  </mesh>;
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <h1>Dustin Alandzes</h1>
          <Canvas>
            {/* <Stage> and <OrbitControls> from drei?*/}
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Box position={[0, 0, 0]} />
            <Macbook   />
          </Canvas>
        </div>
      </div>
    </main>
  );
}
