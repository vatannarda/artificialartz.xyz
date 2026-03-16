import { useRef, Suspense, lazy } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Link } from 'react-router-dom'

// Lazy load 3D components
const AutonomousSphere = lazy(() => import('./autonomous-sphere'))
const ParticlesBackground = lazy(() => import('./particles-background'))

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Split title into words
    const titleSplit = new SplitText(titleRef.current, {
      type: 'words',
      wordsClass: 'word',
    })

    // Animate words from darkness - oppressive/authoritarian ease
    gsap.fromTo(
      titleSplit.words,
      {
        opacity: 0,
        y: 120,
        rotateX: -80,
        transformOrigin: 'center bottom',
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.4,
        ease: 'authoritarian',
        stagger: 0.1,
        delay: 0.5,
      }
    )

    // Subtitle fade in
    gsap.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'heavy',
        delay: 2.2,
      }
    )

    // CTA buttons stagger
    gsap.fromTo(
      ctaRef.current?.children || [],
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'heavy',
        stagger: 0.15,
        delay: 2.6,
      }
    )

    // Metrics reveal on scroll
    gsap.fromTo(
      metricsRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'heavy',
        scrollTrigger: {
          trigger: metricsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Scroll indicator
    gsap.fromTo(
      scrollIndicatorRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'heavy',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 10%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Glow pulse animation
    gsap.to(glowRef.current, {
      opacity: 0.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden"
    >
      {/* Background Grid Lines */}
      <div className="absolute inset-0 grid-lines opacity-20" />

      {/* Deep ambient glow behind sphere */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D30000] opacity-0"
        style={{
          filter: 'blur(150px)',
          borderRadius: '50%',
        }}
      />

      {/* Secondary glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#8B0000] opacity-10"
        style={{
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />

      {/* 3D Autonomous Sphere - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border border-[#D30000]/30 animate-pulse" />
          </div>
        }>
          <AutonomousSphere />
        </Suspense>
      </div>

      {/* Ambient Particles */}
      <Suspense fallback={null}>
        <ParticlesBackground intensity="low" />
      </Suspense>

      {/* Radial gradient overlay to darken behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D30000]/20 to-transparent" />

      {/* Content - Split layout with sphere in center */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">
          {/* Left Column - Title */}
          <div className="lg:pr-8">
            <h1
              ref={titleRef}
              className="text-[10vw] md:text-[8vw] lg:text-[5vw] xl:text-[4vw] font-bold leading-[1.05] tracking-tight text-[#E0E0E0] uppercase"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="block">WE DON'T BUILD</span>
              <span className="block">WEBSITES.</span>
            </h1>
          </div>

          {/* Right Column - Subtext and CTAs */}
          <div className="lg:pl-8 lg:border-l lg:border-[#1A1A1A]">
            <h2
              className="text-[8vw] md:text-[6vw] lg:text-[4vw] xl:text-[3.5vw] font-bold leading-[1.1] tracking-tight uppercase mb-8"
            >
              <span className="block text-[#E0E0E0]">WE</span>
              <span className="block text-[#D30000] glow-crimson">ARCHITECT</span>
              <span className="block text-[#E0E0E0]">DIGITAL WORKFORCES.</span>
            </h2>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base md:text-lg text-[#606060] font-mono max-w-lg leading-relaxed mb-8"
            >
              Enterprise AI Systems Architecture.
              <br />
              Architecting the digital workforce.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/showcase"
                className="group relative px-8 py-4 bg-[#D30000] text-white font-mono text-sm uppercase tracking-wider transition-all duration-500 hover:bg-[#E50914] hover:shadow-[0_0_30px_rgba(211,0,0,0.5),0_0_60px_rgba(211,0,0,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-[#FF6666]">{'['}</span>
                  SYSTEM METRICS
                  <span className="text-[#FF6666]">{']'}</span>
                </span>
              </Link>

              <Link
                to="/contact"
                className="group relative px-8 py-4 border border-[#404040] text-[#808080] font-mono text-sm uppercase tracking-wider transition-all duration-500 hover:border-[#D30000] hover:text-[#E0E0E0] hover:shadow-[0_0_20px_rgba(211,0,0,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-[#D30000] group-hover:text-[#E50914]">{'['}</span>
                  REQUEST ACCESS
                  <span className="text-[#D30000] group-hover:text-[#E50914]">{']'}</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div
          ref={metricsRef}
          className="mt-12 lg:mt-0 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          <div className="metric-card group relative border-l border-[#1A1A1A] pl-4 md:pl-6 py-4 transition-all duration-500 hover:bg-[#D30000]/5 hover:border-l-[#D30000]">
            <span className="block text-2xl md:text-3xl font-bold text-[#E0E0E0]">47+</span>
            <span className="block mt-1 text-[#606060] font-mono text-xs uppercase tracking-wider">
              Deployment
            </span>
          </div>
          <div className="metric-card group relative border-l border-[#1A1A1A] pl-4 md:pl-6 py-4 transition-all duration-500 hover:bg-[#D30000]/5 hover:border-l-[#D30000]">
            <span className="block text-2xl md:text-3xl font-bold text-[#E0E0E0]">99.9%</span>
            <span className="block mt-1 text-[#606060] font-mono text-xs uppercase tracking-wider">
              Uptime
            </span>
          </div>
          <div className="metric-card group relative border-l border-[#1A1A1A] pl-4 md:pl-6 py-4 transition-all duration-500 hover:bg-[#D30000]/5 hover:border-l-[#D30000]">
            <span className="block text-2xl md:text-3xl font-bold text-[#E0E0E0]">2.4M+</span>
            <span className="block mt-1 text-[#606060] font-mono text-xs uppercase tracking-wider">
              Operations / Day
            </span>
          </div>
          <div className="metric-card group relative border-l border-[#1A1A1A] pl-4 md:pl-6 py-4 transition-all duration-500 hover:bg-[#D30000]/5 hover:border-l-[#D30000]">
            <span className="block text-2xl md:text-3xl font-bold text-[#D30000]">24/7</span>
            <span className="block mt-1 text-[#606060] font-mono text-xs uppercase tracking-wider">
              Active
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#404040] font-mono text-[10px] uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#D30000]/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

export default Hero
