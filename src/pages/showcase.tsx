import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const caseStudies = [
  {
    id: 'OPS-001',
    title: 'Autonomous Freelance Operations',
    metric: '400%',
    metricLabel: 'Output Increase',
    description: 'End-to-end replacement of traditional freelance workflows with AI.',
    tags: ['Automation', 'Workflow'],
  },
  {
    id: 'OPS-002',
    title: 'Enterprise Data Pipeline',
    metric: '2.4M',
    metricLabel: 'Events/Second',
    description: 'Real-time data streaming and processing system. Zero data loss guarantee.',
    tags: ['Streaming', 'Real-time'],
  },
  {
    id: 'OPS-003',
    title: 'Neural Content Engine',
    metric: '85%',
    metricLabel: 'Automation Rate',
    description: 'Neural network-based system for content generation and optimization.',
    tags: ['Content', 'NLP'],
  },
  {
    id: 'OPS-004',
    title: 'Autonomous Customer Support',
    metric: '< 3s',
    metricLabel: 'Average Response',
    description: '24/7 operating, learning, and self-optimizing customer support system.',
    tags: ['Support', 'ML'],
  },
  {
    id: 'OPS-005',
    title: 'Financial Intelligence Unit',
    metric: '99.97%',
    metricLabel: 'Accuracy',
    description: 'Financial anomaly detection and automated reporting system.',
    tags: ['Finance', 'Detection'],
  },
  {
    id: 'OPS-006',
    title: 'Supply Chain Optimizer',
    metric: '-35%',
    metricLabel: 'Cost Reduction',
    description: 'Supply chain optimization and demand forecasting algorithms.',
    tags: ['Logistics', 'Prediction'],
  },
]

export function ShowcasePage() {
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header animations
    gsap.fromTo(
      headerRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'heavy',
        delay: 0.3,
      }
    )

    // Cards stagger in
    const cards = gridRef.current?.querySelectorAll('.case-card')

    cards?.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'heavy',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
          delay: index % 3 * 0.1,
        }
      )
    })

    // Glow pulse
    gsap.to(glowRef.current, {
      opacity: 0.1,
      duration: 3,
      repeat: -1,
      yoyo: true,
    })

    // Scan line animation
    gsap.to(scanRef.current, {
      y: '100%',
      duration: 8,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  return (
    <div className="min-h-screen pt-14">
      {/* Background Glow */}
      <div
        ref={glowRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(211, 0, 0, 0.1) 0%, rgba(211, 0, 0, 0.05) 100%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Scan Line */}
      <div
        ref={scanRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.03]"
        style={{
          background: 'linear-gradient(180deg, rgba(211, 0, 0, 0.05) 0%, transparent 50%, rgba(211, 0, 0, 0) 100%)',
        }}
      />

      {/* Header */}
      <header
        ref={headerRef}
        className="px-6 md:px-12 lg:px-24 py-24 pb-0"
      >
        <div className="max-w-[1800px] mx-auto">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 bg-[#D30000]" />
            <span className="text-[#606060] font-mono text-sm uppercase tracking-widest">
              002 / SYSTEM METRICS
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E0E0E0] uppercase tracking-tight">
            DEPLOYed
            <br />
            <span className="text-[#D30000]">SYSTEMS</span>
          </h1>

          <p className="mt-6 text-[#606060] font-mono max-w-2xl">
            Systems actively operating in production environments
          </p>
        </div>
      </header>

      {/* Grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-24 mt-16">
        <div
          ref={gridRef}
          className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className="case-card group relative bg-[#0A0A0A] border border-[#1A1A1A] p-6 transition-all duration-500 hover:border-[#D30000]/50 hover:bg-[#0A0A0A]"
              style={{
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(211, 0, 0, 0.15), inset 0 0 60px rgba(211, 0, 0, 0.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Gradient Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#D30000]/20 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none" />

              {/* ID Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[#404040] font-mono text-xs uppercase tracking-wider">
                  {study.id}
                </span>
                <div className="flex gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[#303030] font-mono text-[10px] uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#808080] mb-4 group-hover:text-[#E0E0E0] transition-colors duration-300">
                {study.title}
              </h3>

              {/* Description */}
              <p className="text-[#505050] text-sm mb-6 leading-relaxed group-hover:text-[#707070] transition-colors duration-300">
                {study.description}
              </p>

              {/* Metric */}
              <div className="pt-4 border-t border-[#1A1A1A]">
                <span
                  className="case-card__metric block text-3xl font-bold text-[#D30000] transition-all duration-300 group-hover:text-4xl group-hover:text-[#E50914]"
                  style={{
                    textShadow: '0 0 20px rgba(211, 0, 0, 0.5)',
                  }}
                >
                  {study.metric}
                </span>
                <span className="block mt-1 text-[#404040] font-mono text-xs uppercase tracking-wider group-hover:text-[#606060] transition-colors duration-300">
                  {study.metricLabel}
                </span>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#D30000] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ShowcasePage
