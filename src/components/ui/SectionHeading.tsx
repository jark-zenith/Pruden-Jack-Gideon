import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  eyebrow?: string
}

export function SectionHeading({ title, subtitle, centered = true, eyebrow }: SectionHeadingProps) {
  return (
    <motion.div
      className={centered ? 'text-center' : ''}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
