'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { LuSearchX } from 'react-icons/lu'

export function NoResultsSearch() {
  return (
    <motion.div
      className="flex flex-grow flex-col items-center justify-center font-semibold text-gray-500 dark:text-gray-400"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.8, ease: 'easeIn', delay: 0.4 }
      }}
    >
      <span className="my-5 text-2xl">
        <LuSearchX />
      </span>
      <h2 className="text-xl">No se encontraron resultados</h2>
      <p className="text-center font-normal">
        Puedes intentar con otra búsqueda o{' '}
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSdavBuF2LRBEf4PfcUDWJuVM8Mxy51is8gBLfwaUpzt3p9-_g/viewform"
          target="_blank"
          className="text-main-red hover:underline"
          rel="noreferrer"
        >
          solicitar que se agregue un profesor
        </Link>
      </p>
    </motion.div>
  )
}
