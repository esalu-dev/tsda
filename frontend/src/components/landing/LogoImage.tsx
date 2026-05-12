'use client'

import { motion } from 'framer-motion'

export function LogoImage() {
  return (
    <div className="size-16">
      <motion.img
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        src="http://localhost:3000/logo.svg"
        alt="Logo de Profedex"
      />
    </div>
  )
}
