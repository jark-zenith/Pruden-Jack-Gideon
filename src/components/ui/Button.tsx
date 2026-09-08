import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  ariaLabel?: string
}

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tracking-[0.02em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914]'

  const variantStyles = {
    primary:
      'bg-blue-500 text-white shadow-[0_16px_40px_rgba(59,130,246,0.25)] hover:bg-blue-400 hover:-translate-y-0.5',
    secondary:
      'border border-slate-700/80 bg-slate-900/70 text-slate-100 hover:border-blue-400/70 hover:bg-slate-900 hover:text-blue-200',
    ghost:
      'border border-blue-400/40 bg-blue-500/5 text-blue-200 hover:border-blue-300 hover:bg-blue-500/10',
  }

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
