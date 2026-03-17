import { useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Hero } from '../components/hero'
import { Link } from 'react-router-dom'
import { DecryptedText } from '../hooks/useDecryptText'

// Lazy load for particles
const ParticlesBackground = lazy(() => import('../components/particles-background'))

const capabilities = [
  {
    id: 'CAP-001',
    title: 'Autonomous AI Agents',
    desc: 'Self-governing, learning, and optimizing agent systems.',
    tech: '128K context • Multi-step reasoning • Self-correction',
    status: 'ACTIVE',
  },
  {
    id: 'CAP-002',
    title: 'Neural Network Architecture',
    desc: 'Purpose-built deep learning models and inference optimization.',
    tech: 'Custom transformers • 99.7% accuracy • <50ms latency',
    status: 'DEPLOYED',
  },
  {
    id: 'CAP-003',
    title: 'Real-time Data Pipelines',
    desc: 'Streaming systems processing millions of events in milliseconds.',
    tech: '2.4M events/sec • Zero data loss • Auto-scaling',
    status: 'OPERATIONAL',
  },
  {
    id: 'CAP-004',
    title: 'Enterprise Integration',
    desc: 'Seamless integration with existing systems. API-first approach.',
    tech: 'REST/GraphQL • Webhook orchestration • Rate limiting',
    status: 'CONNECTED',
  },
  {
    id: 'CAP-005',
    title: 'Security & Compliance',
    desc: 'Zero-trust architecture. SOC2, GDPR, and global compliance.',
    tech: 'End-to-end encryption • Audit logging • RBAC',
    status: 'SECURE',
  },
  {
    id: 'CAP-006',
    title: 'Continuous Optimization',
    desc: 'A/B testing, metric monitoring, and automated performance enhancement.',
    tech: 'Real-time analytics • Auto-tuning • Cost reduction',
    status: 'OPTIMIZED',
  },
]

export function Home() {
  const manifestRef = useRef<HTMLDivElement>(null)
  const capabilitiesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Manifesto reveal on scroll
    gsap.fromTo(
      manifestRef.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'authoritarian',
        scrollTrigger: {
          trigger: manifestRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Capabilities cards stagger
    const cards = capabilitiesRef.current?.querySelectorAll('.glass-card')
    cards?.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'heavy',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index % 3 * 0.1,
        }
      )
    })
  }, [])

  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Manifesto Section with Particles */}
      <section
        ref={manifestRef}
        className="min-h-screen w-full px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden"
      >
        {/* Particle Background */}
        <Suspense fallback={null}>
          <ParticlesBackground intensity="low" />
        </Suspense>

        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D30000] opacity-5"
          style={{
            filter: 'blur(120px)',
            borderRadius: '50%',
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-2 bg-[#D30000]" />
            <span className="text-[#606060] font-mono text-sm uppercase tracking-widest">
              001 / Manifesto
            </span>
          </div>

          {/* Manifesto Text */}
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-[#808080]">
            We don't just{' '}
            <span className="text-[#E0E0E0] font-medium">develop software.</span>
            <br />
            We architect the{' '}
            <span className="text-[#F0F0F0] font-medium">digital workforce</span>
            <span className="text-[#D30000] font-medium">.</span>
            <br />
            <br />
            Every line of code is a systemic command.
            <br />
            Every algorithm is a strategic maneuver.
          </blockquote>

          {/* Decorative Line */}
          <div className="mt-12 w-24 h-px bg-gradient-to-r from-[#D30000] to-transparent" />
        </div>
      </section>

      {/* Services / Capabilities Section - Glassmorphism Cards */}
      <section className="min-h-screen w-full px-6 md:px-12 lg:px-24 py-24 relative">
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(211,0,0,0.03) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-2 bg-[#D30000]" />
            <span className="text-[#606060] font-mono text-sm uppercase tracking-widest">
              002 / Capabilities
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#E0E0E0] uppercase mb-16">
            <DecryptedText text="SYSTEM" as="span" className="block" />
            <span className="block">
              <DecryptedText text="CAPACITY" as="span" className="text-[#F0F0F0]" delay={200} />
              <span className="text-[#D30000]">.</span>
            </span>
          </h2>

          {/* Capabilities Grid - Glassmorphism Cards */}
          <div ref={capabilitiesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <article
                key={cap.id}
                className="glass-card group relative p-6 transition-all duration-500 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(211, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(211, 0, 0, 0.6)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(211, 0, 0, 0.15), 0 0 80px rgba(211, 0, 0, 0.05), inset 0 0 60px rgba(211, 0, 0, 0.03)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(211, 0, 0, 0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#333333] transition-all duration-300 group-hover:border-[#D30000] group-hover:w-6 group-hover:h-6" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#333333] transition-all duration-300 group-hover:border-[#D30000] group-hover:w-6 group-hover:h-6" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#333333] transition-all duration-300 group-hover:border-[#D30000] group-hover:w-6 group-hover:h-6" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#333333] transition-all duration-300 group-hover:border-[#D30000] group-hover:w-6 group-hover:h-6" />

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#505050] font-mono text-xs uppercase tracking-wider">
                    {cap.id}
                  </span>
                  <span className="text-[#808080] font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-[#333333] transition-colors duration-300 group-hover:text-[#D30000] group-hover:border-[#D30000]/30">
                    {cap.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#E0E0E0] mb-3 group-hover:text-white transition-colors duration-300">
                  {cap.title}
                </h3>

                {/* Description */}
                <p className="text-[#606060] text-sm leading-relaxed mb-4 group-hover:text-[#808080] transition-colors duration-300">
                  {cap.desc}
                </p>

                {/* Technical specs */}
                <div className="pt-4 border-t border-[#1A1A1A]">
                  <span className="text-[#404040] font-mono text-[11px] tracking-wide group-hover:text-[#606060] transition-colors duration-300">
                    {cap.tech}
                  </span>
                </div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#D30000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="min-h-[50vh] w-full px-6 md:px-12 lg:px-24 py-24 relative flex items-center overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D30000] opacity-10"
          style={{
            filter: 'blur(100px)',
            borderRadius: '50%',
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#606060] font-mono text-sm uppercase tracking-widest mb-6">
            NEXT STEP
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] mb-8">
            INITIATE<br />
            <span className="text-[#F0F0F0]">SYSTEM</span>
            <span className="text-[#D30000]">.</span>
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-10 py-5 border border-[#333333] bg-transparent text-[#E0E0E0] font-mono text-sm uppercase tracking-wider transition-all duration-500 hover:border-[#D30000] hover:text-[#D30000] hover:shadow-[0_0_20px_rgba(211,0,0,0.15)]"
          >
            <span className="text-[#666666] group-hover:text-[#D30000] transition-colors duration-500">{'['}</span>
            INITIATE ACCESS PROTOCOL
            <span className="text-[#666666] group-hover:text-[#D30000] transition-colors duration-500">{']'}</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
