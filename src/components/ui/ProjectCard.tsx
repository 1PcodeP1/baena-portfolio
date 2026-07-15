// src/components/ui/ProjectCard.tsx
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  locale: string
  isActive: boolean
  onHover: () => void
  onClick: () => void
}

export function ProjectCard({ project, locale, isActive, onHover, onClick }: ProjectCardProps) {
  const content = project.translations[locale as 'en' | 'es']

  return (
    <div
      data-stagger-item
      className={`
        group flex items-center justify-between py-6 px-4 border-b border-outline-variant cursor-pointer
        transition-colors duration-150 hover:bg-surface-variant
        ${isActive ? 'border-l-[3px] border-l-primary pl-3' : 'border-l-[3px] border-l-transparent pl-3'}
      `}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <div className="flex items-center gap-6">
        <span className="font-mono text-[11px] tracking-widest text-secondary">{project.number}</span>
        <span className="font-display text-2xl md:text-3xl tracking-tighter uppercase text-on-background group-hover:text-primary transition-colors">
          {content.title}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-2 flex-wrap justify-end">
          {project.tech.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase border border-outline-variant px-2 py-0.5 text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] tracking-widest text-secondary">{project.year}</span>
      </div>
    </div>
  )
}
