/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 room.glb --types --transform 
Files: room.glb [3.25KB] > /Users/dustinalandzes/PycharmProjects/DustinAlandzes.github.io/frontend/public/room-transformed.glb [1.92KB] (41%)
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Room: THREE.Mesh
    Window: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/room-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Room.geometry} material={materials.Material} scale={[3.809, 2.252, 3.753]} />
      <mesh geometry={nodes.Window.geometry} material={nodes.Window.material} position={[-3.649, 0.368, -1.783]} rotation={[-Math.PI, 0, 0]} scale={[-0.227, -1.476, -1.121]} />
    </group>
  )
}

useGLTF.preload('/room-transformed.glb')
