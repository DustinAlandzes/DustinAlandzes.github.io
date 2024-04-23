/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 nintendo_gamecube_controller.glb --transform --types
Files: nintendo_gamecube_controller.glb [10.56MB] > /Users/dustinalandzes/PycharmProjects/DustinAlandzes.github.io/frontend/public/nintendo_gamecube_controller-transformed.glb [889.56KB] (92%)
Author: Josevan Danusastra (https://sketchfab.com/JosevanD2)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/nintendo-gamecube-controller-01d506e601b64668b82195e914af54f1
Title: Nintendo GameCube Controller
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
    Object_3: THREE.Mesh
    Object_4: THREE.Mesh
    Object_7: THREE.Mesh
  }
  materials: {
    gamecube_controllerblinn9SG: THREE.MeshStandardMaterial
    gamecube_controllerblinn10SG: THREE.MeshStandardMaterial
    gamecube_controllerblinn12SG: THREE.MeshStandardMaterial
    gamecube_controllerblinn11SG: THREE.MeshStandardMaterial
  }
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/nintendo_gamecube_controller-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.gamecube_controllerblinn9SG} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_3.geometry} material={materials.gamecube_controllerblinn10SG} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_4.geometry} material={materials.gamecube_controllerblinn12SG} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_7.geometry} material={materials.gamecube_controllerblinn11SG} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/nintendo_gamecube_controller-transformed.glb')
