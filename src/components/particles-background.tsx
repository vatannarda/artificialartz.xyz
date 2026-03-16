import { useEffect, useState, useRef } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'
import gsap from 'gsap'

interface ParticlesBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
}

export default function ParticlesBackground({ intensity = 'medium' }: ParticlesBackgroundProps) {
  const [init, setInit] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const particleCount = {
    low: 50,
    medium: 100,
    high: 180,
  }

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  useEffect(() => {
    if (!init || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Heavy, smooth GSAP quickTo for parallax
      const xTo = gsap.quickTo(containerRef.current, "x", { duration: 5, ease: "power4.out" })
      const yTo = gsap.quickTo(containerRef.current, "y", { duration: 5, ease: "power4.out" })

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 60 // 60px movement range
        const y = (e.clientY / window.innerHeight - 0.5) * 60
        xTo(-x) // Inverse movement for depth
        yTo(-y)
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    })

    return () => ctx.revert()
  }, [init])

  const options: ISourceOptions = {
    fullScreen: false,
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: ['#D30000', '#404040', '#808080'],
      },
      links: {
        color: '#D30000',
        distance: 150,
        enable: true,
        opacity: 0.15,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.03,
        }
      },
      move: {
        enable: true,
        direction: 'top',
        outModes: {
          default: 'out',
        },
        random: false,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: particleCount[intensity],
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.6,
        },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      shape: {
        type: ['circle', 'square'],
      },
      size: {
        value: {
          min: 1,
          max: 3,
        },
      },
    },
    detectRetina: true,
  }

  if (!init) {
    return null
  }

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none scale-110 z-0">
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0"
      />
    </div>
  )
}
