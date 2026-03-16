import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

export function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [formState, setFormState] = useState({
    designation: '',
    organization: '',
    objective: '',
    transmission: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useGSAP(() => {
    // Title animation
    const titleSplit = new SplitText(titleRef.current, {
      type: 'chars',
      charsClass: 'char',
    })

    gsap.fromTo(
      titleSplit.chars,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'heavy',
        stagger: 0.05,
      }
    )

    // Form elements stagger
    gsap.fromTo(
      '.form-line',
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'heavy',
        stagger: 0.1,
        delay: 0.8,
      }
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Protocol initiated:', formState)
    // Add form submission logic here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const TerminalInput = ({
    name,
    label,
    placeholder,
    multiline = false,
  }: {
    name: string
    label: string
    placeholder: string
    multiline?: boolean
  }) => {
    const isFocused = focusedField === name
    const hasValue = formState[name as keyof typeof formState]

    return (
      <div className="form-line relative">
        <label className="flex items-center gap-2 mb-3">
          <span className="text-[#D30000] font-mono text-sm">{'>'}</span>
          <span className="text-[#606060] font-mono text-xs uppercase tracking-wider">
            {label}
          </span>
          {/* Blinking cursor when focused */}
          {isFocused && (
            <span className="inline-block w-2 h-3 bg-[#D30000] animate-pulse ml-1" />
          )}
        </label>

        <div className="relative">
          {multiline ? (
            <textarea
              name={name}
              value={formState[name as keyof typeof formState]}
              onChange={handleChange}
              onFocus={() => setFocusedField(name)}
              onBlur={() => setFocusedField(null)}
              rows={4}
              className="w-full bg-transparent border-0 border-b py-3 text-[#E0E0E0] font-mono text-sm resize-none focus:outline-none transition-colors duration-300"
              style={{
                borderBottomColor: isFocused ? '#D30000' : '#1A1A1A',
              }}
              placeholder={placeholder}
              required
            />
          ) : (
            <input
              type="text"
              name={name}
              value={formState[name as keyof typeof formState]}
              onChange={handleChange}
              onFocus={() => setFocusedField(name)}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent border-0 border-b py-3 text-[#E0E0E0] font-mono text-sm focus:outline-none transition-colors duration-300"
              style={{
                borderBottomColor: isFocused ? '#D30000' : '#1A1A1A',
              }}
              placeholder={placeholder}
              required
            />
          )}

          {/* Placeholder fade effect when focused or has value */}
          {isFocused && !hasValue && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#303030] font-mono text-xs animate-pulse">
              _
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-14">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-24 py-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 bg-[#D30000] animate-pulse" />
            <span className="text-[#606060] font-mono text-sm uppercase tracking-widest">
              004 / ACCESS PROTOCOL
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E0E0E0] uppercase tracking-tight"
          >
            REQUEST
            <br />
            <span className="text-[#D30000]">ACCESS</span>
          </h1>

          <p className="mt-6 text-[#606060] font-mono max-w-xl">
            High-security communication channel. All data is transmitted encrypted.
            Return protocol initiates within 24 hours.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-2xl">
          {/* Terminal Window */}
          <div className="bg-[#0A0A0A] border border-[#1A1A1A]">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A1A1A]">
              <div className="w-3 h-3 bg-[#D30000]/50" />
              <div className="w-3 h-3 bg-[#303030]" />
              <div className="w-3 h-3 bg-[#303030]" />
              <span className="ml-4 text-[#404040] font-mono text-xs">
                secure_channel://init
              </span>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-6 md:p-8 space-y-8"
            >
              <TerminalInput
                name="designation"
                label="Name / Designation"
                placeholder="..."
              />

              <TerminalInput
                name="organization"
                label="Organization"
                placeholder="..."
              />

              <TerminalInput
                name="objective"
                label="Project Objective"
                placeholder="..."
              />

              <TerminalInput
                name="transmission"
                label="Communication / Message"
                placeholder="..."
                multiline
              />

              {/* Submit Button - Brutalist */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="group relative w-full px-8 py-5 bg-black border border-[#1A1A1A] text-[#E0E0E0] font-mono text-sm uppercase tracking-wider transition-all duration-500 hover:border-[#D30000]"
                  style={{
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(211, 0, 0, 0.3), 0 0 60px rgba(211, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-[#D30000]">{'>'}</span>
                    INITIATE PROTOCOL
                    <span className="text-[#D30000]">{'<'}</span>
                  </span>

                  {/* Animated border corners */}
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D30000] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D30000] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D30000] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D30000] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              {/* Status Line */}
              <div className="pt-4 border-t border-[#1A1A1A]">
                <div className="flex items-center justify-between">
                  <p className="text-[#404040] font-mono text-xs">
                    <span className="text-[#D30000] mr-2">{'>'}</span>
                    STATUS: Connection encrypted
                  </p>
                  <p className="text-[#303030] font-mono text-xs">
                    TLS 1.3 | AES-256-GCM
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
