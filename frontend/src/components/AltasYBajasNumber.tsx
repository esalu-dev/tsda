export function AltasYBajasNumber({
  day,
  month,
  year,
  state
}: {
  day: string
  month: string
  year: string
  state?: string
}) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <p className="uppercase text-tiny">{state}</p>
      <h5 className="text-6xl">{day}</h5>
      <p className="uppercase text-gray-500 text-tiny">{month}</p>
      <p className="uppercase text-gray-500 text-tiny">{year}</p>
    </section>
  )
}
