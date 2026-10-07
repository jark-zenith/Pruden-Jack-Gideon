import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

interface BlurTextProps {
  text: string
  delay?: number
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  className?: string
  style?: React.CSSProperties
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = 'words',
  direction = 'top',
  className = '',
  style,
}) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.1 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const segments = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [text, animateBy],
  )

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          style={{
            display: 'inline-block',
            filter: inView ? 'blur(0px)' : 'blur(10px)',
            opacity: inView ? 1 : 0,
            transform: inView
              ? 'translateY(0)'
              : `translateY(${direction === 'top' ? '-20px' : '20px'})`,
            transition: `all 0.5s ease-out ${index * delay}ms`,
          }}
        >
          {segment}
          {animateBy === 'words' && index < segments.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </p>
  )
}

const menuItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'CONTACT', href: '#contact' },
]

export function Hero() {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black text-white transition-colors duration-500 dark:bg-black">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(195,228,29,0.055), transparent 30%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.04), transparent 40%)',
        }}
      />

      <header className="absolute left-0 right-0 top-0 z-50 px-5 py-5 sm:px-8 sm:py-7">
        <nav className="mx-auto flex max-w-screen-2xl items-center justify-between">
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="z-50 p-2 text-neutral-500 transition-colors duration-300 hover:text-white"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-8 w-8" strokeWidth={2} /> : <Menu className="h-8 w-8" strokeWidth={2} />}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute left-0 top-full z-[100] mt-2 ml-1 w-[220px] rounded-2xl border border-white/10 bg-black/95 p-4 shadow-2xl backdrop-blur-xl"
              >
                {menuItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-lg font-bold tracking-tight transition-colors hover:text-[#C3E41D] ${index === 0 ? 'text-[#C3E41D]' : 'text-white'}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-3xl font-black tracking-[-0.08em] text-white sm:text-4xl">
            P<span className="text-[#C3E41D]">.</span>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="relative h-8 w-16 rounded-full bg-neutral-900 transition-opacity hover:opacity-80"
            aria-label="Toggle theme"
          >
            <div
              className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform duration-300"
              style={{ transform: isDark ? 'translateX(2rem)' : 'translateX(0)' }}
            />
          </button>
        </nav>
      </header>

      <main className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        <div className="relative w-full text-center">
          <div className="relative z-0">
            <BlurText
              text="PRUDEN"
              delay={80}
              animateBy="letters"
              direction="top"
              className="justify-center whitespace-nowrap text-[18vw] font-black uppercase leading-[0.72] tracking-[-0.075em] text-[#C3E41D] sm:text-[17vw] md:text-[16vw] lg:text-[15vw]"
              style={{ fontFamily: "'Fira Code', monospace" }}
            />
            <BlurText
              text="JACK"
              delay={80}
              animateBy="letters"
              direction="top"
              className="justify-center whitespace-nowrap text-[18vw] font-black uppercase leading-[0.72] tracking-[-0.075em] text-[#C3E41D] sm:text-[17vw] md:text-[16vw] lg:text-[15vw]"
              style={{ fontFamily: "'Fira Code', monospace" }}
            />
            <BlurText
              text="GIDEON"
              delay={80}
              animateBy="letters"
              direction="top"
              className="justify-center whitespace-nowrap text-[18vw] font-black uppercase leading-[0.72] tracking-[-0.075em] text-[#C3E41D] sm:text-[17vw] md:text-[16vw] lg:text-[15vw]"
              style={{ fontFamily: "'Fira Code', monospace" }}
            />
          </div>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="group relative flex h-[145px] w-[88px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-neutral-950 shadow-2xl shadow-black transition-transform duration-300 hover:scale-105 sm:h-[190px] sm:w-[115px] md:h-[235px] md:w-[142px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(195,228,29,0.18),transparent_65%)]" />
              <div className="relative text-6xl font-black tracking-[-0.1em] text-white sm:text-7xl md:text-8xl">
                P<span className="text-[#C3E41D]">.</span>
              </div>
              <span className="absolute bottom-4 left-0 right-0 text-[7px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Owner upload
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 w-full -translate-x-1/2 px-6 sm:bottom-20 md:bottom-24">
          <div className="flex justify-center">
            <BlurText
              text="Building software, AI systems and human experiences in code."
              delay={70}
              animateBy="words"
              direction="top"
              className="justify-center text-center text-[14px] text-neutral-500 transition-colors duration-300 hover:text-white sm:text-[17px] md:text-[20px]"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-neutral-500 transition-colors hover:text-[#C3E41D]"
          aria-label="Scroll to about"
        >
          <ChevronDown className="h-6 w-6 md:h-8 md:w-8" />
        </button>
      </main>
    </section>
  )
}
