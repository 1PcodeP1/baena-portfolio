// src/app/[locale]/projects/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { projects, getProjectBySlug } from '@/data/projects'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProjectContent } from './ProjectContent'

export function generateStaticParams() {
  return projects.flatMap((p) =>
    ['es', 'en'].map((locale) => ({ locale, slug: p.slug }))
  )
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const content = project.translations[locale as 'en' | 'es']
  const t = await getTranslations({ locale, namespace: 'projects' })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <ProjectContent>
          {/* Back button */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-secondary hover:text-primary transition-colors mb-16"
          >
            {t('backToIndex')}
          </Link>

          {/* Header block */}
          <div className="border-b border-outline-variant pb-12 mb-12">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 flex-wrap">
              <div>
                <span className="font-mono text-[11px] tracking-widest text-secondary block mb-4">
                  {project.number} · {project.year}
                </span>
                <h1 className="font-display text-[64px] md:text-[120px] leading-[0.85] tracking-tighter uppercase text-on-background">
                  {content.title}
                </h1>
              </div>
              <div className="flex gap-4 mt-4">
                <a
                  href={project.repoUrl}
                  className="font-mono text-[11px] tracking-widest uppercase border border-outline-variant px-5 py-2.5 text-on-background hover:border-primary hover:text-primary transition-colors"
                >
                  {t('viewRepo')}
                </a>
                <a
                  href={project.liveUrl}
                  className="font-mono text-[11px] tracking-widest uppercase border border-primary bg-primary text-on-primary px-5 py-2.5 hover:bg-transparent hover:text-primary transition-colors"
                >
                  {t('viewLive')}
                </a>
              </div>
            </div>
          </div>

          {/* Description + Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-7">
              <p className="font-sans text-lg text-secondary leading-relaxed">
                {content.fullDescription}
              </p>
            </div>
            <div className="md:col-span-5">
              <h2 className="font-mono text-[11px] tracking-widest uppercase text-primary mb-6">
                {t('techStack')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-widest uppercase border border-outline-variant px-3 py-1.5 text-on-background"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* What it does */}
          <div className="border-t border-outline-variant pt-12">
            <h2 className="font-display text-[40px] md:text-[56px] tracking-tighter uppercase text-on-background mb-10">
              {t('whatItDoes')}
            </h2>
            <ul className="flex flex-col gap-4">
              {content.whatItDoes.map((item, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-outline-variant pb-4">
                  <span className="font-mono text-[11px] tracking-widest text-primary mt-1 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="font-sans text-base text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ProjectContent>
      </main>
      <Footer />
    </>
  )
}
