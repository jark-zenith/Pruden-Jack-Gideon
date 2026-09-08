import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageContainer } from '../components/layout/PageContainer'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { personalInfo } from '../data/personal'

const contentVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-16 md:py-28">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-red-500/10 blur-3xl"></div>
      </div>

      <PageContainer className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <motion.div
            className="order-2 md:order-1"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={contentVariants}
          >
            <div className="mb-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Hello, I'm</p>

              <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-100 sm:text-5xl md:text-6xl">
                {personalInfo.name}
              </h1>

              <p className="mb-3 text-lg font-semibold text-slate-300">{personalInfo.role} — I build thoughtful web products and practical AI integrations.</p>

              <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-400">{personalInfo.bio}</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button href="#projects" variant="primary" className="btn-soft" ariaLabel="View projects">
                  View My Work
                  <ArrowRight size={16} />
                </Button>
                <Button href="#contact" variant="ghost" className="btn-soft" ariaLabel="Contact me">
                  Let's Talk
                </Button>
              </div>

              {/* Social Links */}
              <div>
                <p className="mb-3 text-sm text-slate-500">Connect with me</p>
                <SocialLinks className="gap-4" />
              </div>
            </div>
          </motion.div>

          {/* Image Placeholder */}
          <motion.div
            className="order-1 md:order-2 flex justify-center md:justify-end"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 card-radius card-surface border border-transparent shadow-lg">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-red-500/8" />
              <div className="absolute inset-4 flex items-center justify-center rounded-2xl bg-[#07101f]/70 border border-slate-700">
                <span className="px-4 text-center font-medium text-slate-400">Profile Image</span>
              </div>
            </div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  )
}
