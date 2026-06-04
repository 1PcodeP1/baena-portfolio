// src/components/layout/Ticker.tsx
'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function Ticker() {
  const t = useTranslations('ticker')
  const items: string[] = t.raw('items')
  const content = [...items, ...items]

  return (
    <div className="w-full bg-on-background text-background py-4 border-b border-outline-variant overflow-hidden">
      <motion.div
        className="flex items-center whitespace-nowrap gap-12"
        initial={{ x: '0%' }}
        animate={{ x: '-50%' }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {content.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12 shrink-0">
            <span className="font-mono text-[11px] tracking-widest uppercase">{item}</span>
            <span className="text-primary text-lg leading-none">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
