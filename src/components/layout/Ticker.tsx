// src/components/layout/Ticker.tsx
import { useTranslations } from 'next-intl'

export function Ticker() {
  const t = useTranslations('ticker')
  const items: string[] = t.raw('items')
  const content = [...items, ...items]

  return (
    <div className="w-full bg-on-background text-background py-4 border-b border-outline-variant overflow-hidden">
      <div className="ticker-animate gap-12 items-center whitespace-nowrap">
        {content.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12">
            <span className="font-mono text-[11px] tracking-widest uppercase">{item}</span>
            <span className="text-primary text-lg leading-none">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
