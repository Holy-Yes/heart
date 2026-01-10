import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from './store.js'

export function Heart(props) {
  const group = useRef()
  const gltf = useGLTF('/heart.glb')
  
  const heart_rate = useStore(i => i.heart_rate || 72)
  const contractility = useStore(i => i.contractility || 1.0)
  const dilation = useStore(i => i.dilation || 0)
  const ischemia = useStore(i => i.ischemia || 0)

  useEffect(() => {
    console.log('✅ Heart GLTF loaded:', gltf.scene.children.length, 'objects')
    
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        console.log('✅ Mesh:', child.name)
        child.material = new THREE.MeshStandardMaterial({
          color: 0xc41e3a,  // Red heart
          emissive: 0x220000,
          side: THREE.DoubleSide
        })
      }
    })
  }, [gltf])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const pulse = 1 + 0.15 * contractility * Math.sin(time * heart_rate / 30)
    const dilate = 1 + 0.4 * dilation
    
    if (group.current) {
      group.current.scale.setScalar(pulse * dilate)
      group.current.rotation.y = time * 0.1
      
      // Ischemia red glow
      group.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.emissiveIntensity = ischemia * 2
        }
      })
    }
  })

  return <primitive ref={group} object={gltf.scene} scale={1.5} {...props} />
}

useGLTF.preload('/heart.glb')
