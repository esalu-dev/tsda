import { ReactNode } from 'react'

export function LandingSection({
  children,
  isObscure,
  id,
  first
}: {
  children: ReactNode
  isObscure?: boolean
  id: string
  first?: boolean
}) {
  return (
    <section
      id={id}
      className={`mb-20 flex w-full justify-center px-5 py-5 ${
        first === true ? 'pt-16' : 'pt-10'
      } ${isObscure ? 'bg-main-white dark:bg-light-black' : ''}`}
    >
      <div className="flex max-w-[1200px] flex-col">{children}</div>
    </section>
  )
}
