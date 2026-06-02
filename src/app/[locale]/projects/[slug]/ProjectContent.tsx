'use client'

import { motion } from 'framer-motion'

interface ProjectContentProps {
  children: React.ReactNode
}

export function ProjectContent({ children }: ProjectContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="px-margin-mobile md:px-margin-desktop py-16 max-w-[1200px]"
    >
      {children}
    </motion.div>
  )
}
