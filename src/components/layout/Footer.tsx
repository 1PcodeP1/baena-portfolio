import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  const links = [
    { key: 'email' as const, href: 'mailto:hello@carlosbaena.dev' },
    { key: 'linkedin' as const, href: '#' },
    { key: 'github' as const, href: '#' },
    { key: 'instagram' as const, href: '#' },
  ]

  return (
    <footer className="bg-background text-on-background w-full px-margin-mobile md:px-margin-desktop py-16 border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12">
        <div className="font-display text-[56px] md:text-[88px] leading-[0.85] tracking-tighter">
          CARLOS<br />BAENA
        </div>
        <nav className="flex flex-col md:flex-row gap-5 md:gap-10">
          {links.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="font-mono text-[11px] tracking-widest uppercase text-secondary hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
            >
              {t(key)}
            </a>
          ))}
        </nav>
      </div>
      <div className="w-full h-px bg-outline-variant mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-[10px] md:text-[11px] tracking-widest text-secondary uppercase gap-3">
        <span>{t('rights')}</span>
        <span className="flex items-center gap-2">
          {t('builtWith')}
          <span className="sparkle w-2.5 h-2.5 bg-primary inline-block" />
        </span>
      </div>
    </footer>
  )
}
