// src/components/ui/LanguageToggle.tsx
'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  function switchLocale() {
    const nextLocale = locale === 'es' ? 'en' : 'es'
    // Anchored regex prevents replacing locale strings inside slugs (e.g. /en/projects/sent-emails)
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/'
    startTransition(() => {
      router.replace(`/${nextLocale}${pathWithoutLocale}`)
    })
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
