// src/components/ui/ProjectPreview.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Project } from '@/data/projects'

interface ProjectPreviewProps {
  project: Project
  locale: string
}

export function ProjectPreview({ project, locale }: ProjectPreviewProps) {
  const t = useTranslations('projects')
  const content = project.translations[locale as 'en' | 'es']

  return (
    <motion.div
      key={project.slug}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="h-full flex flex-col justify-between p-10"
    >
      <div>
        <div className="font-mono text-[11px] tracking-widest text-secondary mb-4">
          {project.number} · {project.year}
        </div>
        <h3 className="font-display text-[48px] md:text-[64px] leading-[0.85] tracking-tighter uppercase text-on-background mb-6">
          {content.title}
        </h3>
        <p className="font-sans text-base text-secondary leading-relaxed mb-8">
          {content.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase border border-outline-variant px-2.5 py-1 text-on-background"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-primary hover:gap-4 transition-all duration-200 mt-8"
      >
        {t('viewProject')}
      </Link>
    </motion.div>
  )
}
