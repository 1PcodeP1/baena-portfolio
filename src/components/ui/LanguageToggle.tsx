// src/components/ui/LanguageToggle.tsx
'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale() {
    const nextLocale = locale === 'es' ? 'en' : 'es'
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${nextLocale}${pathWithoutLocale}`)
  }

  return (
    <button
      onClick={switchLocale}
      className="font-mono text-[11px] tracking-widest uppercase border border-outline-variant px-3 py-1.5 text-on-background hover:text-primary hover:border-primary transition-colors"
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
