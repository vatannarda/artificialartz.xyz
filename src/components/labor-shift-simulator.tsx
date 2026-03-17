import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const vertexShader = `
  uniform float uProgress;
  uniform float uTime;
  attribute vec3 targetPosition;
  attribute vec3 chaoticColor;
  attribute vec3 structuredColor;
  varying vec3 vColor;
  varying float vProgress;
  
  void main() {
    // Normalize x position roughly between 0 and 1
    float normalizedX = (position.x + 8.0) / 16.0;
    
    // Laser sweep effect
    float sweep = uProgress * 1.5 - 0.25;
    float particleProgress = smoothstep(normalizedX - 0.1, normalizedX + 0.1, sweep);
    vProgress = particleProgress;
    
    // Add chaotic noise to position if not structured
    vec3 noise = vec3(
      sin(uTime * 2.0 + position.y) * 0.1,
      cos(uTime * 1.5 + position.x) * 0.1,
      sin(uTime * 1.8 + position.z) * 0.1
    );
    
    vec3 currentPos = mix(position + noise, targetPosition, particleProgress);
    
    // Laser line color burst
    float laserDistance = abs(normalizedX - sweep);
    float laserIntensity = smoothstep(0.05, 0.0, laserDistance) * (1.0 - particleProgress);
    
    vec3 baseColor = mix(chaoticColor, structuredColor, particleProgress);
    vColor = baseColor + vec3(1.0, 0.0, 0.0) * laserIntensity * 2.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_PointSize = mix(2.0, 3.0, particleProgress) * (15.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vColor;
  varying float vProgress;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.2, dist) * mix(0.4, 0.9, vProgress);
    gl_FragColor = vec4(vColor, alpha);
  }
`

function Swarm() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const pointsRef = useRef<THREE.Points>(null)
  
  const { chaoticPositions, structuredPositions, chaoticColors, structuredColors } = useMemo(() => {
    const count = 15000;
    const chaoticPositions = new Float32Array(count * 3)
    const structuredPositions = new Float32Array(count * 3)
    const chaoticColors = new Float32Array(count * 3)
    const structuredColors = new Float32Array(count * 3)
    
    const gridSize = Math.ceil(Math.pow(count, 1/3));
    const spacing = 0.4;
    const offset = (gridSize * spacing) / 2;

    for(let i = 0; i < count; i++) {
      // Chaotic: Wide random spread
      chaoticPositions[i*3] = (Math.random() - 0.5) * 20;
      chaoticPositions[i*3+1] = (Math.random() - 0.5) * 10;
      chaoticPositions[i*3+2] = (Math.random() - 0.5) * 10;
      
      // Structured: Neural Lattice
      const x = (i % gridSize) * spacing - offset;
      const y = (Math.floor(i / gridSize) % gridSize) * spacing - offset;
      const z = (Math.floor(i / (gridSize * gridSize))) * spacing - offset;
      
      structuredPositions[i*3] = x * 1.5;
      structuredPositions[i*3+1] = y * 1.5;
      structuredPositions[i*3+2] = z * 1.5;
      
      // Chaotic: Dull white/grey
      const grey = 0.3 + Math.random() * 0.2;
      chaoticColors[i*3] = grey;
      chaoticColors[i*3+1] = grey;
      chaoticColors[i*3+2] = grey;
      
      // Structured: Glowing Red (#D30000)
      structuredColors[i*3] = 0.827;
      structuredColors[i*3+1] = 0.0;
      structuredColors[i*3+2] = 0.0;
    }
    return { chaoticPositions, structuredPositions, chaoticColors, structuredColors }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { progress: 0 }
      
      ScrollTrigger.create({
        trigger: "#labor-shift-container",
        start: "top 70%",
        onEnter: () => {
          gsap.to(proxy, {
            progress: 1,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (materialRef.current) {
                materialRef.current.uniforms.uProgress.value = proxy.progress;
              }
            }
          })
          
          gsap.to(".laser-sweep", {
            left: "100%",
            opacity: 0.8,
            duration: 2.5,
            ease: "power2.inOut",
          })
        },
        once: true
      })
    })
    return () => ctx.revert()
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      pointsRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.05;
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={15000} array={chaoticPositions} itemSize={3} />
        <bufferAttribute attach="attributes-targetPosition" count={15000} array={structuredPositions} itemSize={3} />
        <bufferAttribute attach="attributes-chaoticColor" count={15000} array={chaoticColors} itemSize={3} />
        <bufferAttribute attach="attributes-structuredColor" count={15000} array={structuredColors} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uProgress: { value: 0.0 },
          uTime: { value: 0.0 }
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function LaborShiftSimulator() {
  return (
    <div id="labor-shift-container" className="w-full h-[60vh] relative bg-black border-y border-[#1A1A1A] overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#D30000] animate-pulse" />
          <span className="text-[#606060] font-mono text-xs uppercase tracking-widest">
            SYS.SIMULATION // LABOR_SHIFT
          </span>
        </div>
      </div>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Swarm />
      </Canvas>
      {/* Laser line overlay effect */}
      <div className="laser-sweep absolute top-0 bottom-0 w-1 bg-[#D30000] shadow-[0_0_30px_10px_#D30000] opacity-0 -left-4 z-20" />
    </div>
  )
}
