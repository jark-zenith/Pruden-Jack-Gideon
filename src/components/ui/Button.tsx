import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

export function Button({ children, href, variant = 'primary', className = '' }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2'

  const variantStyles = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-gray-200 text-[#20201e] hover:bg-gray-300',
    ghost: 'text-purple-600 hover:bg-purple-50 border border-purple-600',
  }

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </button>
  )
}
