import * as THREE from 'three'
import {Canvas, ThreeElements, useFrame} from "@react-three/fiber";
import {Stage} from "@react-three/drei";
import {useRef, useState} from "react";

function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => (meshRef.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function ThreeComponent() {
        return <section className={"section"} style={{
            height: "80vh"
        }}>
            <Canvas>
                <Stage>
                    <Box position={[0, 0, 0]}/>
                </Stage>
            </Canvas>
        </section>
}