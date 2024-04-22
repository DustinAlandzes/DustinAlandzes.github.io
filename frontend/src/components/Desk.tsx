/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 desk.glb --types --transform 
Files: desk.glb [6.59KB] > /Users/dustinalandzes/PycharmProjects/DustinAlandzes.github.io/frontend/public/desk-transformed.glb [1.99KB] (70%)
*/

import * as THREE from 'three'
import React from 'react'
import {useGLTF} from '@react-three/drei'
import {GLTF} from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        wood_top: THREE.Mesh
        leg: THREE.Mesh
    }
    materials: {
        aCG_Wood067_1K_JPG: THREE.MeshStandardMaterial
        aCG_Metal033_1K_JPG: THREE.MeshStandardMaterial
    }
}


export default function Model(props: JSX.IntrinsicElements['group']) {
    const {nodes, materials} = useGLTF('/desk-transformed.glb') as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.wood_top.geometry} material={materials.aCG_Wood067_1K_JPG} position={[0, 2, 0]}/>
            <mesh geometry={nodes.leg.geometry} material={materials.aCG_Metal033_1K_JPG} position={[0, 1, -2.5]}/>
        </group>
    )
}

useGLTF.preload('/desk-transformed.glb')
