import type { Skill } from '../../types'

interface SkillBadgeProps {
  skill: Skill
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <div className="group p-4 rounded-lg border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all cursor-default">
      <h3 className="font-semibold text-[#20201e] mb-1 group-hover:text-purple-600 transition-colors">
        {skill.name}
      </h3>
      <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full">
          {skill.category}
        </span>
        {skill.proficiency && (
          <span className="text-xs text-gray-500">{skill.proficiency}</span>
        )}
      </div>
    </div>
  )
}
