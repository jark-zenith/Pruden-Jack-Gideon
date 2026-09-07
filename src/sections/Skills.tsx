import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SkillBadge } from '../components/ui/SkillBadge'
import { skills } from '../data/skills'

// Group skills by category
const skillsByCategory = skills.reduce(
  (acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  },
  {} as Record<string, typeof skills>
)

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-[#f7f6f2]">
      <PageContainer>
        <SectionHeading
          title="Skills & Technologies"
          subtitle="A range of tools and practices I work with professionally"
        />

        <div className="mt-16 space-y-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold text-[#20201e] mb-6">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
