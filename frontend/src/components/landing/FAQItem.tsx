'use client'

import { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'

export const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 dark:border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium dark:text-white">{q}</span>
        <span
          className={`transform transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <BiChevronDown className="text-2xl text-gray-500" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="pr-8 leading-relaxed text-gray-600 dark:text-gray-400">
          {a}
        </p>
      </div>
    </div>
  )
}
