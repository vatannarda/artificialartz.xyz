import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const intelligenceReports = [
  {
    id: 'DOC-001',
    date: '2026.03.15',
    title: 'The Impact of AI on the Digital Labor Market: Transitioning from Human Labor to Autonomous Systems',
    category: 'Analysis',
    classification: 'PUBLIC',
  },
  {
    id: 'DOC-002',
    date: '2026.03.12',
    title: 'Enterprise Integration of Large Language Models: Security and Scalability Protocols',
    category: 'Technical',
    classification: 'INTERNAL',
  },
  {
    id: 'DOC-003',
    date: '2026.03.08',
    title: 'Autonomous Agent Systems: Multi-Agent Orchestration and Decision-Making Mechanisms',
    category: 'Research',
    classification: 'PUBLIC',
  },
  {
    id: 'DOC-004',
    date: '2026.03.01',
    title: 'Real-Time Data Processing Pipelines: Stream Processing Architecture Deep Dive',
    category: 'Technical',
    classification: 'INTERNAL',
  },
  {
    id: 'DOC-005',
    date: '2026.02.24',
    title: 'AI Security Frameworks: Prompt Injection, Model Extraction, and Defense Strategies',
    category: 'Security',
    classification: 'RESTRICTED',
  },
  {
    id: 'DOC-006',
    date: '2026.02.18',
    title: 'Vector Database Optimization: HNSW, Quantization, and Hybrid Search Approaches',
    category: 'Technical',
    classification: 'PUBLIC',
  },
  {
    id: 'DOC-007',
    date: '2026.02.10',
    title: 'Business Process Automation: Transitioning from RPA to BPA and AI-Augmented Workflow Design',
    category: 'Analysis',
    classification: 'PUBLIC',
  },
  {
    id: 'DOC-008',
    date: '2026.02.03',
    title: 'Edge AI Deployment: Model Compression, Quantization, and On-Device Inference',
    category: 'Technical',
    classification: 'INTERNAL',
  },
]

const getClassificationColor = (classification: string) => {
  switch (classification) {
    case 'RESTRICTED':
      return 'text-[#D30000]'
    case 'INTERNAL':
      return 'text-[#808080]'
    case 'PUBLIC':
    default:
      return 'text-[#404040]'
  }
}

export function BlogPage() {
  const listRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header animation
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
        delay: 0.2,
      }
    )

    // Document items
    const items = listRef.current?.querySelectorAll('.doc-item')

    items?.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'heavy',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.03,
        }
      )
    })

    // Scan line animation
    gsap.to(scanRef.current, {
      y: '100%',
      duration: 10,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  return (
    <div className="min-h-screen pt-14">
      {/* Background Scan Line */}
      <div
        ref={scanRef}
        className="fixed top-0 left-0 right-0 h-[200px] pointer-events-none opacity-[0.03]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(211, 0, 0, 0.3) 50%, transparent 100%)',
        }}
      />

      {/* Header */}
      <header ref={headerRef} className="px-6 md:px-12 lg:px-24 py-24">
        <div className="max-w-[1800px] mx-auto">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 bg-[#D30000]" />
            <span className="text-[#606060] font-mono text-sm uppercase tracking-widest">
              003 / INTELLIGENCE ARCHIVE
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E0E0E0] uppercase tracking-tight">
            INTEL
            <br />
            <span className="text-[#D30000]">DOCS</span>
          </h1>

          <p className="mt-6 text-[#606060] font-mono max-w-2xl">
            Technical documentation, system analysis, and research reports.
            <br />
            Content is filtered based on your clearance level.
          </p>

          {/* Classification Legend */}
          <div className="mt-8 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#404040]" />
              <span className="text-[#404040] font-mono text-xs uppercase">PUBLIC</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#808080]" />
              <span className="text-[#606060] font-mono text-xs uppercase">INTERNAL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#D30000]" />
              <span className="text-[#606060] font-mono text-xs uppercase">RESTRICTED</span>
            </div>
          </div>
        </div>
      </header>

      {/* Document List */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div ref={listRef} className="max-w-[1400px] mx-auto">
          {intelligenceReports.map((doc, index) => (
            <article
              key={doc.id}
              className="doc-item group relative py-6 border-b border-[#1A1A1A] cursor-pointer transition-all duration-300 hover:bg-[#0A0A0A] hover:border-[#1A1A1A]"
            >
              <div className="flex items-start gap-6">
                {/* Index Number */}
                <span className="text-[#303030] font-mono text-xs tabular-nums w-8 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Date */}
                <span className="text-[#404040] font-mono text-xs w-24 shrink-0">
                  [{doc.date}]
                </span>

                {/* Classification */}
                <span className={`font-mono text-xs w-20 shrink-0 ${getClassificationColor(doc.classification)}`}>
                  {doc.classification}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* ID & Category */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#D30000]/50 font-mono text-xs">
                      {doc.id}
                    </span>
                    <span className="text-[#303030] font-mono text-xs uppercase">
                      {doc.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg text-[#808080] group-hover:text-white transition-colors duration-300 leading-snug">
                    {doc.title}
                  </h2>

                  {/* Access Indicator */}
                  <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[#D30000] font-mono text-xs uppercase">
                      {'>'} ACCESS
                    </span>
                  </div>
                </div>
              </div>

              {/* Left accent line on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-transparent group-hover:bg-[#D30000] transition-colors duration-300" />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D30000]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default BlogPage
