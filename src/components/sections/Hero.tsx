'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const wordVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export function Hero() {
  const t = useTranslations('hero')
  const roleLines = t('role').split('\n')

  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-20 relative border-b border-outline-variant overflow-hidden">
      <div className="absolute top-8 left-[1.5rem] md:left-[3rem]">
        <span className="font-mono text-[11px] tracking-widest text-secondary">{t('established')}</span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start md:items-center justify-center w-full max-w-[1400px] mx-auto"
      >
        <div className="font-display text-[100px] md:text-[240px] leading-[0.82] tracking-tighter uppercase w-full text-left md:text-center">
          <motion.div variants={wordVariants}>CARLOS</motion.div>
          <motion.div variants={wordVariants} className="text-primary italic">
            BAENA
          </motion.div>
        </div>

        <motion.div
          variants={wordVariants}
          className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-14 w-full justify-between"
        >
          <div className="font-mono text-[11px] tracking-widest text-secondary uppercase leading-relaxed">
            {roleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < roleLines.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="hidden md:block flex-grow mx-8 h-px bg-outline-variant" />
          <div className="font-display text-[48px] md:text-[72px] leading-none text-right">
            {t('portfolio')}
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 right-[1.5rem] md:right-[3rem] flex gap-3 text-primary">
        <div className="w-11 h-11 border-2 border-primary rounded-full flex items-center justify-center font-display text-xl hover:bg-primary hover:text-on-primary transition-colors cursor-default">
          C
        </div>
        <div className="w-11 h-11 border-2 border-primary rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-default">
          <span className="sparkle w-4 h-4 bg-primary" />
        </div>
      </div>
    </section>
  )
}
