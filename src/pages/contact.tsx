import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export function ContactPage() {
  const [history, setHistory] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [isBooting, setIsBooting] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useGSAP(() => {
    gsap.fromTo('.terminal-container', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'heavy' }
    )
  }, [])

  useEffect(() => {
    let isMounted = true;
    const bootSequence = async () => {
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
      
      const os = navigator.platform || 'UNKNOWN'
      const browser = navigator.userAgent.split(' ')[0] || 'UNKNOWN'
      const cores = navigator.hardwareConcurrency || 'UNKNOWN'
      const res = `${window.innerWidth}x${window.innerHeight}`

      const sequence = [
        '[SYS] INITIATING SECURE HANDSHAKE...',
        '[SYS] LOCATING CLIENT NODE...',
        `[SYS] OS DETECTED: ${os} / ${browser}`,
        `[SYS] HARDWARE THREADS: ${cores} CORES`,
        `[SYS] RESOLUTION: ${res}`,
        '[SYS] ENCRYPTION: TLS 1.3 | AES-256-GCM',
        '[SYS] ACCESS GRANTED. AWAITING COMMAND.',
        '',
        'ARTIFICIAL_ARTZ SECURE TERMINAL v9.4.1',
        'TYPE "HELP" FOR AVAILABLE COMMANDS.'
      ]

      await delay(500); // Initial pause

      for (const line of sequence) {
        if (!isMounted) return;
        setHistory(prev => [...prev, line])
        await delay(150 + Math.random() * 200) // Mechanical delay
      }
      
      if (isMounted) setIsBooting(false)
    }

    bootSequence()
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toUpperCase()
    let response: string | string[] = ''

    switch (trimmed) {
      case 'HELP':
        response = [
          'AVAILABLE COMMANDS:',
          '  HELP          - Display this message',
          '  SYS_STATUS    - Display core system metrics',
          '  INIT_PROTOCOL - Request secure access protocol',
          '  CLEAR         - Clear terminal output'
        ]
        break
      case 'SYS_STATUS':
        response = [
          'SYSTEM STATUS: ONLINE',
          'NODES: 47/47 OPERATIONAL',
          'SECURITY LEVEL: MAXIMUM (ZERO-TRUST)',
          'THREAT DETECTION: ACTIVE'
        ]
        break
      case 'INIT_PROTOCOL':
        response = [
          'PROTOCOL INITIATED.',
          'AWAITING FURTHER CLEARANCE.',
          'CONTACTING COMMAND CENTER...',
          'ACCESS DENIED: INSUFFICIENT CLEARANCE LEVEL.'
        ]
        break
      case 'CLEAR':
        setHistory([])
        return
      case '':
        return
      default:
        response = `COMMAND NOT RECOGNIZED: ${trimmed}`
    }

    setHistory(prev => [
      ...prev, 
      `> ${cmd}`, 
      ...(Array.isArray(response) ? response : [response])
    ])
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    handleCommand(input)
    setInput('')
  }

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ background: 'linear-gradient(180deg, rgba(211, 0, 0, 0.05) 0%, transparent 50%, rgba(211, 0, 0, 0) 100%)' }} />

      <div className="w-full max-w-4xl mb-6 z-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-2 h-2 bg-[#D30000] animate-pulse" />
          <span className="text-[#606060] font-mono text-sm uppercase tracking-widest">
            004 / ACCESS PROTOCOL
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] uppercase tracking-tight">
          SECURE TERMINAL<span className="text-[#D30000]">.</span>
        </h1>
      </div>

      <div 
        className="terminal-container w-full max-w-4xl bg-[#050505] border border-[#1A1A1A] p-6 font-mono text-sm h-[60vh] flex flex-col relative z-10"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#1A1A1A]">
          <div className="w-3 h-3 bg-[#D30000]/50" />
          <div className="w-3 h-3 bg-[#303030]" />
          <div className="w-3 h-3 bg-[#303030]" />
          <span className="ml-4 text-[#404040]">root@artificial-artz:~#</span>
        </div>
        
        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto space-y-2 text-[#E0E0E0] scrollbar-hide">
          {history.map((line, i) => (
            <div key={i} className={line.startsWith('>') ? 'text-[#E0E0E0]' : 'text-[#808080]'}>
              {line}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input */}
        {!isBooting ? (
          <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2 text-[#E0E0E0]">
            <span className="text-[#D30000]">root@artificial-artz:~#</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#E0E0E0] placeholder-[#303030]"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        ) : (
          <div className="mt-4 flex items-center gap-2 text-[#E0E0E0] opacity-50">
            <span className="text-[#D30000]">root@artificial-artz:~#</span>
            <span className="w-2 h-4 bg-[#D30000] animate-pulse" />
          </div>
        )}

        {/* Terminal overlay scanlines */}
        <div className="absolute inset-0 pointer-events-none scan-lines" />
      </div>
    </div>
  )
}

export default ContactPage
