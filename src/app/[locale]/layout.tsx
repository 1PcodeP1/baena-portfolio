import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { PageTransition } from '@/components/ui/PageTransition'
import { SmoothScroll } from '@/components/scroll/SmoothScroll'

export const metadata: Metadata = {
  title: 'Carlos Baena | Portfolio',
  description: 'Full Stack Developer & Systems Architect',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <SmoothScroll>
        <PageTransition>{children}</PageTransition>
      </SmoothScroll>
    </NextIntlClientProvider>
  )
}
