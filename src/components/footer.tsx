'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      footerRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'heavy',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <footer
      ref={footerRef}
      className="w-full border-t border-[#1A1A1A] bg-black"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Left - System Info */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-wider text-[#404040] uppercase">
              SYS.TERMINAL.END
            </span>
            <span className="text-[#303030] font-mono text-[10px]">//</span>
            <span className="font-mono text-[10px] tracking-wider text-[#404040] uppercase">
              ALL RIGHTS RESERVED
            </span>
          </div>

          {/* Right - Status */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-wider text-[#404040]">
              [ STATUS:
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[#D30000]">
              SECURE
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[#404040]">
              ]
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
