'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import { Observer } from 'gsap/Observer'
import Lenis from 'lenis'

// GSAP Plugin Registration
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, SplitText, Observer)
}

// Custom Eases - Ağır, kasıtlı, otoriter animasyonlar
const registerCustomEases = () => {
  CustomEase.create('heavy', '0.16, 1, 0.3, 1')
  CustomEase.create('authoritarian', '0.22, 1, 0.36, 1')
  CustomEase.create('oppressive', '0.33, 1, 0.68, 1')
  CustomEase.create('cold', '0.25, 0.1, 0.25, 1')
  CustomEase.create('steel', '0.19, 1, 0.22, 1')
}

interface GSAPProviderProps {
  children: React.ReactNode
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Register custom eases
    registerCustomEases()

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return <>{children}</>
}

export default GSAPProvider
