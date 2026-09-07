import { ArrowRight } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { personalInfo } from '../data/personal'

export function Hero() {
  return (
    <section id="home" className="relative py-20 md:py-32 bg-gradient-to-b from-[#f7f6f2] to-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <PageContainer className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <div className="mb-6">
              <p className="text-purple-600 font-semibold mb-2">Welcome to my portfolio</p>
              <h1 className="text-5xl md:text-6xl font-bold text-[#20201e] mb-4 leading-tight">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-gray-700 font-medium mb-2">
                {personalInfo.role}
              </p>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              {personalInfo.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button href="#projects" variant="primary">
                View My Work
                <ArrowRight size={18} />
              </Button>
              <Button href="#contact" variant="secondary">
                Let's Talk
              </Button>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Connect with me</p>
              <SocialLinks className="gap-4" />
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="order-1 md:order-2">
            <div className="relative mx-auto w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-100 rounded-2xl opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-purple-200 to-purple-50 rounded-2xl flex items-center justify-center border-2 border-purple-200">
                <span className="text-gray-400 font-medium text-center px-4">
                  Profile Image
                </span>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
