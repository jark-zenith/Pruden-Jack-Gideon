import { FeatureShowcase } from '../components/ui/feature-showcase'

const tabs = [
  {
    value: 'builder',
    label: 'Builder',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
    alt: 'Technology circuit board',
  },
  {
    value: 'ai',
    label: 'AI',
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85',
    alt: 'Artificial intelligence visualization',
  },
  {
    value: 'systems',
    label: 'Systems',
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    alt: 'Server infrastructure',
  },
]

const steps = [
  {
    id: 'identity',
    title: 'ICT student becoming a software developer',
    text: 'I am building a practical foundation across programming, operating systems, computer applications and modern software engineering while turning what I learn into working projects.',
  },
  {
    id: 'build',
    title: 'Ideas become working systems',
    text: 'I enjoy taking an ambitious idea, breaking it into smaller components, then designing and building interfaces, APIs, automation and digital products that people can actually use.',
  },
  {
    id: 'future',
    title: 'Building from Kenya for a wider audience',
    text: 'My long-term direction sits at the intersection of software, artificial intelligence, intelligent interfaces and technology entrepreneurship through the PRUDEN ecosystem.',
  },
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-8 md:py-14">
      <div className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
      <FeatureShowcase
        eyebrow="About the builder"
        title="I build, test, learn, and build again."
        description="I am PRUDEN JACK GIDEON — Jark. An ICT student, software developer in progress and AI builder from Kenya, focused on turning ambitious ideas into useful technology."
        stats={['Kenya-based', 'Software + AI', 'Product focused']}
        steps={steps}
        tabs={tabs}
        defaultTab="ai"
        panelMinHeight={600}
      />
    </section>
  )
}
