/* eslint-disable @next/next/no-img-element */
import { DarkModeLandingButton } from '@/components/DarkModeLandingButton'
import { Chakra_Petch } from 'next/font/google'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700']
})

const LAST_NEWS = [
  {
    title: 'Comunicado de CESA - 20/11/2025 3:00 PM',
    content: [
      'El Comité Ejecutivo de la Sociedad de Alumnos (CESA) del Instituto Tecnológico de Durango informa a la comunidad estudiantil y al público en general que el paro de labores continuará hasta que se cumplan las demandas planteadas anteriormente.'
    ],
    img: '/manifestacion/comunicado-cesa-20-11-2025.jpeg',
    url: 'https://www.instagram.com/stories/ana.alvaradooo/3770296158787703653/'
  },
  {
    title: 'Zona Norte permanece cerrada - 20/11/2025 3:00 PM',
    content: [
      'Emmanuel Lara, miembro de CESA, informó que la Zona Norte del Instituto Tecnológico de Durango permanece tomada por los estudiantes en paro.'
    ],
    img: '/manifestacion/zona-norte-tomada-20-11-2025.png',
    url: 'https://www.instagram.com/stories/emmanuel_laraaa/3770262708936645881/'
  }
]

export default function ManifestacionPage() {
  return (
    <main className="max-w-screen relative flex min-h-screen flex-col items-center dark:bg-dark-black">
      <span className="absolute left-3 top-3">
        <DarkModeLandingButton />
      </span>
      <header className="flex items-center gap-2 py-10">
        <img src="/logo.svg" alt="Logo" className="size-8" />
        <strong
          className={`${chakra.className} text-3xl text-dark-black dark:text-white`}
        >
          Profedex
        </strong>
      </header>
      <article className="max-w-[1100px] px-4">
        <h2 className={`${chakra.className} py-3 text-2xl`}>Estado del paro</h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          El Instituto Tecnológico de Durango se encuentra{' '}
          <span className="font-semibold text-main-red">
            actualmente en paro de labores
          </span>{' '}
          debido a una manifestación estudiantil.
        </p>
        <h2 className={`${chakra.className} py-3 text-2xl`}>
          Últimas actualizaciones
        </h2>
        <ol>
          {LAST_NEWS.map((term, index) => (
            <li key={index} className="mb-8 mt-2 flex flex-col gap-2 text-lg">
              <a href={`#${term.title}`} className="font-bold">
                {term.title}
              </a>
              {term.content.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400">
                  {paragraph}
                </p>
              ))}
              {term.img && (
                <img
                  src={term.img}
                  alt={term.title}
                  className="mt-4 size-auto max-h-96 object-contain"
                />
              )}
              {term.url && (
                <>
                  <a
                    href={term.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-main-red underline"
                  >
                    Ver fuente original
                  </a>
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    Nota: Puede que la fuente original ya no esté disponible por
                    razones de privacidad o eliminación del contenido.
                  </span>
                </>
              )}
            </li>
          ))}
        </ol>
      </article>
      <p className="py-10">
        Última actualización: 20 de noviembre de 2025. 4:29 P.M.
      </p>
    </main>
  )
}
