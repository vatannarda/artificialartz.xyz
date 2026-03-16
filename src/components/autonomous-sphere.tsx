import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heavy, smooth GSAP quickTo for parallax
      const xTo = gsap.quickTo(groupRef.current!.rotation, "y", { duration: 4, ease: "power4.out" })
      const yTo = gsap.quickTo(groupRef.current!.rotation, "x", { duration: 4, ease: "power4.out" })

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        xTo(x * 0.4)
        yTo(y * 0.4)
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    })
    return () => ctx.revert()
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Base slow, commanding rotation
      groupRef.current.rotation.y += 0.001
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={5} color="#D30000" />
      <pointLight position={[0, 0, 5]} intensity={2} color="#8B0000" />

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Obsidian Core */}
        <Icosahedron args={[1.4, 3]}>
          <meshPhysicalMaterial
            color="#000000"
            metalness={1}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1}
          />
        </Icosahedron>

        {/* Glowing Wireframe Overlay */}
        <Icosahedron args={[1.405, 3]}>
          <meshBasicMaterial
            color="#D30000"
            wireframe={true}
            transparent={true}
            opacity={0.3}
          />
        </Icosahedron>

        {/* Inner Data Core Glow */}
        <Sphere args={[1.2, 32, 32]}>
          <meshBasicMaterial 
            color="#FF0000" 
            transparent={true} 
            opacity={0.05} 
            side={THREE.BackSide} 
          />
        </Sphere>
      </Float>
    </group>
  )
}

export default function AutonomousSphere() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
