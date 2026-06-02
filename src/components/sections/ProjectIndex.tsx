// src/components/sections/ProjectIndex.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ProjectPreview } from '@/components/ui/ProjectPreview'

export function ProjectIndex() {
  const t = useTranslations('projects')
  const locale = useLocale()
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const [mobileOpen, setMobileOpen] = useState<number | null>(null)

  function handleClick(slug: string) {
    router.push(`/${locale}/projects/${slug}`)
  }

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop border-b border-outline-variant bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="mb-16 flex flex-col md:flex-row items-start justify-between gap-8"
      >
        <h2 className="font-display text-[56px] md:text-[88px] leading-[0.85] tracking-tighter uppercase">
          {t('title1')}<br /><span className="text-primary">{t('title2')}</span>
        </h2>
        <p className="font-mono text-[11px] tracking-wider text-secondary uppercase leading-relaxed max-w-xs">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Desktop: split panel */}
      <div className="hidden md:grid md:grid-cols-2 border border-outline-variant min-h-[520px]">
        <div className="border-r border-outline-variant flex flex-col justify-center">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              isActive={activeIndex === i}
              onHover={() => setActiveIndex(i)}
              onClick={() => handleClick(project.slug)}
            />
          ))}
        </div>
        <div className="relative">
          <AnimatePresence mode="wait">
            <ProjectPreview
              key={projects[activeIndex].slug}
              project={projects[activeIndex]}
              locale={locale}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden flex flex-col border-t border-outline-variant">
        {projects.map((project, i) => {
          const content = project.translations[locale as 'en' | 'es']
          const isOpen = mobileOpen === i
          return (
            <div key={project.slug} className="border-b border-outline-variant">
              <button
                className="w-full flex items-center justify-between py-5 text-left"
                onClick={() => setMobileOpen(isOpen ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] tracking-widest text-secondary">{project.number}</span>
                  <span className="font-display text-2xl tracking-tighter uppercase text-on-background">
                    {content.title}
                  </span>
                </div>
                <span className="font-mono text-[14px] text-secondary">{isOpen ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 px-2">
                      <p className="font-sans text-sm text-secondary leading-relaxed mb-4">
                        {content.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] tracking-widest uppercase border border-outline-variant px-2 py-0.5 text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleClick(project.slug)}
                        className="font-mono text-[11px] tracking-widest uppercase text-primary"
                      >
                        {t('viewProject')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
