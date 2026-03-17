import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

function Scene() {
  const parallaxRef = useRef<THREE.Group>(null)
  const autoRotateRef = useRef<THREE.Group>(null)
  const mainBlobRef = useRef<THREE.Mesh>(null) // Ref for the main blob
  const blueLightRef = useRef<THREE.PointLight>(null)
  const redLightRef = useRef<THREE.PointLight>(null)

  // Refs for the satellite blobs
  const blob1Ref = useRef<THREE.Mesh>(null)
  const blob2Ref = useRef<THREE.Mesh>(null)
  const blob3Ref = useRef<THREE.Mesh>(null)
  const blob4Ref = useRef<THREE.Mesh>(null)
  const blob5Ref = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (!parallaxRef.current || !blueLightRef.current) return

    // Heavy, smooth GSAP quickTo for parallax with strong deceleration
    const xTo = gsap.quickTo(parallaxRef.current.rotation, "y", { duration: 6, ease: "expo.out" })
    const yTo = gsap.quickTo(parallaxRef.current.rotation, "x", { duration: 6, ease: "expo.out" })
    
    // Parallax for the blue light to give depth
    const lightXTo = gsap.quickTo(blueLightRef.current.position, "x", { duration: 5, ease: "expo.out" })
    const lightYTo = gsap.quickTo(blueLightRef.current.position, "y", { duration: 5, ease: "expo.out" })

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      
      xTo(x * 0.3) // Reduced multiplier for heavier, more contained feel
      yTo(y * 0.3)
      
      lightXTo(-5 + x * 2)
      lightYTo(-5 + y * 2)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (autoRotateRef.current) {
      // Base slow, commanding rotation - Reduced and managed by main blob's internal rotation
      autoRotateRef.current.rotation.y += 0.0001
      autoRotateRef.current.rotation.x += 0.00005
    }

    if (redLightRef.current) {
      // Subtle, slow pulsation and movement in the emissive data core
      redLightRef.current.position.x = Math.sin(t * 2) * 0.5
      redLightRef.current.position.y = Math.cos(t * 1.5) * 0.5
      redLightRef.current.position.z = Math.sin(t * 1.2) * 0.5
      redLightRef.current.intensity = 20 + Math.sin(t * 4) * 10
    }

    // Ferrofluid Swarm Animation: Orbit, drift, and crash back into the core
    if (blob1Ref.current) {
      const r = 1.0 + Math.sin(t * 2.1) * 0.8
      blob1Ref.current.position.set(Math.sin(t * 1.2) * r, Math.cos(t * 1.3) * r, Math.sin(t * 0.8) * r)
    }
    if (blob2Ref.current) {
      const r = 1.2 + Math.cos(t * 1.8) * 0.9
      blob2Ref.current.position.set(Math.cos(t * 1.5) * r, Math.sin(t * 1.1) * r, Math.cos(t * 1.4) * r)
    }
    if (blob3Ref.current) {
      const r = 0.8 + Math.sin(t * 2.5) * 0.7
      blob3Ref.current.position.set(Math.sin(t * 0.9) * -r, Math.cos(t * 1.6) * r, Math.sin(t * 1.1) * -r)
    }
    if (blob4Ref.current) {
      const r = 1.1 + Math.cos(t * 2.2) * 0.8
      blob4Ref.current.position.set(Math.cos(t * 1.7) * r, Math.sin(t * 1.4) * -r, Math.cos(t * 0.9) * r)
    }
    if (blob5Ref.current) {
      const r = 0.9 + Math.sin(t * 1.9) * 0.8
      blob5Ref.current.position.set(Math.sin(t * 1.4) * -r, Math.cos(t * 1.7) * -r, Math.sin(t * 1.2) * r)
    }

    // Yalpalayarak kendi ekseni etrafında dönme (Wobbly rotation on own axis)
    if (mainBlobRef.current) {
      mainBlobRef.current.rotation.x += 0.01 * Math.sin(t * 0.5) // X yalpalama
      mainBlobRef.current.rotation.z += 0.01 * Math.cos(t * 0.5) // Z yalpalama
      mainBlobRef.current.rotation.y += 0.002 // Y ekseni etrafında sabit dönme
    }
  })

  // Shared material properties for the ferrofluid - Increased distort and speed for "ferrofluid effect"
  const fluidMaterialProps = {
    color: "#000000",
    roughness: 0.0,
    metalness: 1.0,
    distort: 0.8, // Increased for stronger surface undulation
    speed: 4, // Increased for faster surface undulation
    clearcoat: 1.0,
  }

  return (
    <group ref={parallaxRef}>
      {/* Cool blue point light managed by GSAP parallax for subtle rim lighting */}
      <pointLight ref={blueLightRef} position={[-5, -5, -2]} color="#4488ff" intensity={10} distance={20} />
      
      <group ref={autoRotateRef}>
        {/* ENVIRONMENT REFLECTION: Blurred city for pure, smooth gradients without literal shapes */}
        <Environment preset="city" blur={1} environmentIntensity={0.5} />
        
        {/* HIGH-FIDELITY SPECULAR LIGHTING */}
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={0.1} 
          intensity={25} 
          color="#ffffff" 
        />

        {/* INTERNAL SUBTLE GLOW: Moving crimson red point light */}
        <pointLight ref={redLightRef} position={[0, 0, 0]} color="#D30000" intensity={20} distance={10} />

        <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.05}>
          <group>
            {/* Main Core - Scale increased for "biraz daha büyük" request */}
            <mesh ref={mainBlobRef} scale={1.7}>
              <sphereGeometry args={[1, 64, 64]} />
              <MeshDistortMaterial {...fluidMaterialProps} />
            </mesh>
            
            {/* Satellite Blobs - Using same material so they undulate too */}
            <mesh ref={blob1Ref} scale={0.8}>
              <sphereGeometry args={[1, 64, 64]} />
              <MeshDistortMaterial {...fluidMaterialProps} />
            </mesh>
            <mesh ref={blob2Ref} scale={0.6}>
              <sphereGeometry args={[1, 64, 64]} />
              <MeshDistortMaterial {...fluidMaterialProps} />
            </mesh>
            <mesh ref={blob3Ref} scale={0.5}>
              <sphereGeometry args={[1, 64, 64]} />
              <MeshDistortMaterial {...fluidMaterialProps} />
            </mesh>
            <mesh ref={blob4Ref} scale={0.7}>
              <sphereGeometry args={[1, 64, 64]} />
              <MeshDistortMaterial {...fluidMaterialProps} />
            </mesh>
            <mesh ref={blob5Ref} scale={0.4}>
              <sphereGeometry args={[1, 64, 64]} />
              <MeshDistortMaterial {...fluidMaterialProps} />
            </mesh>
          </group>
        </Float>
      </group>
    </group>
  )
}

export default function AutonomousSphere() {
  // The canvas will mount and stay permanently visible.
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}