import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ReactNode } from 'react'

const onest = Onest({
  subsets: ['latin'],
  weight: ['200', '400', '600']
})

export const metadata: Metadata = {
  title: 'Profedex | Califica a tus profesores',
  applicationName: 'Profedex',
  generator: 'Next.js',
  description:
    '¡Descubre Profedex! Una herramienta donde los estudiantes pueden evaluar a sus profesores y compartir sus experiencias académicas. Obtén información valiosa sobre la calidad de la enseñanza y mejora tu experiencia educativa hoy mismo.',
  keywords:
    'profedex, itd, instituto tecnológico de durango, acisti, emilio salas, profesores, calificaciones, evaluaciones, universidad, estudiantes, educación, enseñanza, calidad, experiencias, académicas, herramienta, información, valiosa, experiencia, educativa',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Emilio Salas', url: 'https://www.esalu,site' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  creator: 'Emilio Salas',
  publisher: 'Emilio Salas',
  metadataBase: new URL('https://www.profedex.top'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Profedex | Califica a tus profesores',
    description:
      '¡Descubre Profedex! Una herramienta donde los estudiantes pueden evaluar a sus profesores y compartir sus experiencias académicas. Obtén información valiosa sobre la calidad de la enseñanza y mejora tu experiencia educativa hoy mismo.',
    type: 'website',
    siteName: 'Profedex',
    locale: 'es_MX',
    url: 'https://www.profedex.top'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profedex | Califica a tus profesores',
    description:
      '¡Descubre Profedex! Una herramienta donde los estudiantes pueden evaluar a sus profesores y compartir sus experiencias académicas. Obtén información valiosa sobre la calidad de la enseñanza y mejora tu experiencia educativa hoy mismo.',
    creator: '@esalu88'
  },
  category: 'platform'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}
export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="antialiased">
      <body className={onest.className}>
        <Providers>
          {children}
          {process.env.APP_ENV === 'development' && (
            <code className="absolute right-10 top-10">
              Entorno de development
            </code>
          )}
        </Providers>
      </body>
    </html>
  )
}
