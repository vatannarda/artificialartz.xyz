import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { href: '/showcase', label: 'SHOWCASE' },
  { href: '/contact', label: 'PROTOCOL' },
  { href: '/blog', label: 'INTEL' },
]

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const pathname = location.pathname

  useGSAP(() => {
    // Header drops down from top with heavy steel ease
    gsap.fromTo(
      headerRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'steel',
        delay: 0.2,
      }
    )

    // Nav links stagger in
    gsap.fromTo(
      '.nav-link',
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'heavy',
        stagger: 0.1,
        delay: 0.8,
      }
    )

    // Status indicator pulse
    gsap.fromTo(
      '.status-indicator',
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'heavy',
        delay: 1.2,
      }
    )
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#1A1A1A]"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-14">
          {/* Left - Brand */}
          <Link
            to="/"
            className="group flex items-center gap-2"
          >
            <span className="font-mono text-xs tracking-wider text-[#606060] group-hover:text-[#E0E0E0] transition-colors duration-300">
              ARTIFICIAL_ARTZ
            </span>
            <span className="text-[#D30000] font-mono text-xs">//</span>
            <span className="font-mono text-xs tracking-wider text-[#D30000] group-hover:text-[#E50914] transition-colors duration-300">
              SYSTEM
            </span>
          </Link>

          {/* Right - Navigation */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link font-mono text-xs tracking-wider transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-[#D30000]'
                    : 'text-[#606060] hover:text-[#E0E0E0]'
                }`}
              >
                <span className="text-[#404040]">[ </span>
                {link.label}
                <span className="text-[#404040]"> ]</span>
              </Link>
            ))}

            {/* Status Indicator */}
            <div className="status-indicator flex items-center gap-2 ml-4 pl-4 border-l border-[#1A1A1A]">
              <div className="relative">
                <div className="w-2 h-2 bg-[#D30000]" />
                <div className="absolute inset-0 w-2 h-2 bg-[#D30000] animate-ping opacity-75" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-[#606060] uppercase">
                SYSTEM ONLINE
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
