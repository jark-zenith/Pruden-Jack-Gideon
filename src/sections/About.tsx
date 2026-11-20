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
    title: 'Technology learner and web developer',
    text: 'I am still increasing my knowledge across ICT, web development, web application development, and artificial intelligence through structured learning and practical work.',
  },
  {
    id: 'build',
    title: 'Ideas become working systems',
    text: 'I enjoy understanding a need, breaking it into manageable parts, and shaping useful websites, web applications, interfaces, and AI-enabled workflows.',
  },
  {
    id: 'future',
    title: 'Building from Kenya for a wider audience',
    text: 'My direction sits at the intersection of web technology, artificial intelligence, research, and entrepreneurship through Pruden Technologies and TeraVex.',
  },
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-8 md:py-14">
      <div className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
      <FeatureShowcase
        eyebrow="About the builder"
        title="I build, test, learn, and build again."
        description="I am PRUDEN JACK GIDEON — Jark. A Kenya-based technology learner focused on web development, web applications, and artificial intelligence, with an interest in building practical digital solutions."
        stats={['Kenya-based', 'Software + AI', 'Product focused']}
        steps={steps}
        tabs={tabs}
        defaultTab="ai"
        panelMinHeight={600}
      />
    </section>
  )
}
