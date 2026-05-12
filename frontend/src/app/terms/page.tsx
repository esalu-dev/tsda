/* eslint-disable @next/next/no-img-element */
import { DarkModeLandingButton } from '@/components/DarkModeLandingButton'
import { Chakra_Petch } from 'next/font/google'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700']
})

const TERMS = [
  {
    title: 'Introducción',
    content: [
      'Bienvenido a Profedex. Los siguientes términos y condiciones son pautas para el uso de nuestra plataforma en línea.',
      'Al acceder y utilizar Profedex, usted acepta seguir estos términos y condiciones en su totalidad. Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice nuestra plataforma. Es importante que lea y comprenda completamente estos términos y condiciones antes de utilizar Profedex. Al utilizar nuestra plataforma, usted acepta estos términos y condiciones como directrices para su uso.',
      'Profedex se reserva el derecho de cambiar estos términos y condiciones en cualquier momento. Es su responsabilidad revisar estos términos y condiciones regularmente para asegurarse de que está de acuerdo con ellos.',
      'Gracias por ser parte de Profedex.'
    ]
  },
  {
    title: 'Uso de la plataforma',
    content: [
      'Al utilizar Profedex, usted acepta los siguientes términos y condiciones:',
      '1. El Usuario es responsable de mantener la confidencialidad de su cuenta y contraseña y de restringir el acceso a su dispositivo.',
      '2. El Usuario se compromete a utilizar la plataforma de manera responsable y respetuosa con otros usuarios y terceros.',
      '3. El Usuario no debe utilizar la plataforma para fines ilegales o no autorizados.',
      '4. Está prohibido el uso de la plataforma para la difusión de contenido ofensivo, abusivo o discriminatorio.',
      '5. Se prohíbe la utilización de la plataforma para realizar spam, ataques cibernéticos o cualquier actividad que afecte la integridad de la plataforma o de otros usuarios.',
      'El incumplimiento de estos términos y condiciones puede resultar en la suspensión o eliminación de la cuenta del Usuario. Nos reservamos el derecho de tomar medidas adecuadas según lo consideremos necesario.'
    ]
  },
  {
    title: 'Contenido del usuario',
    content: [
      'Al utilizar Profedex, el Usuario acepta los siguientes términos y condiciones:',
      '1. El Usuario es responsable del contenido que publica en la plataforma.',
      '2. El Usuario se compromete a no publicar contenido ofensivo, abusivo o discriminatorio.',
      '3. El Usuario no debe publicar contenido que viole los derechos de autor o la privacidad de terceros.',
      '4. Profedex se reserva el derecho de eliminar cualquier contenido que considere inapropiado o que viole estos términos y condiciones.',
      '5. Profedex no se hace responsable del contenido publicado por los usuarios en la plataforma.'
    ]
  },
  {
    title: 'Privacidad y protección de datos',
    content: [
      'En Profedex, nos tomamos muy en serio la privacidad de nuestros usuarios. Al utilizar nuestra plataforma, usted acepta los siguientes términos y condiciones relacionados con la privacidad y la protección de datos:',
      '1. Nos comprometemos a recopilar, utilizar y proteger su información personal de acuerdo con nuestras políticas de privacidad.',
      '2. La información personal que recopilamos solo incluye su nombre de usuario, dirección de correo electrónico, contraseña, número de control y carrera.',
      '3. No compartiremos su información personal con terceros sin su consentimiento, excepto según lo exija la ley.',
      '4. Nos comprometemos a tomar medidas razonables para proteger su información personal contra accesos no autorizados, pérdidas o divulgaciones no autorizadas.',
      '5. Sin embargo, el Usuario comprende y acepta que ninguna transmisión de datos por Internet puede garantizarse como completamente segura, y que la seguridad y la confidencialidad de la información no pueden garantizarse en todo momento.'
    ]
  },
  {
    title: 'Responsabilidades y limitaciones',
    content: [
      'Al utilizar Profedex, el Usuario acepta los siguientes términos y condiciones relacionados con las responsabilidades y limitaciones:',
      '1. No garantizamos que la plataforma será siempre segura, libre de errores o que funcione sin interrupciones.',
      '2. No seremos responsables de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de utilizar la plataforma.',
      '3. Nos reservamos el derecho de modificar, suspender o descontinuar cualquier aspecto de la plataforma en cualquier momento y sin previo aviso.',
      '4. Nos reservamos el derecho de terminar o suspender su acceso a la plataforma en cualquier momento y por cualquier motivo, incluida la violación de estos términos y condiciones.'
    ]
  },
  {
    title: 'Comentarios sobre profesores',
    content: [
      'Al utilizar la función de comentarios sobre profesores en Profedex, el Usuario acepta los siguientes términos y condiciones:',
      '1. Los comentarios sobre profesores se proporcionan como una herramienta para que los estudiantes compartan sus experiencias y opiniones sobre la calidad de la enseñanza y el desempeño de los profesores.',
      '2. Los usuarios son responsables de asegurarse de que sus comentarios sean precisos, respetuosos y pertinentes.',
      '3. Se prohíbe la publicación de comentarios que contengan lenguaje ofensivo, difamatorio, discriminatorio o que viole los derechos de terceros.',
      '4. Los comentarios sobre profesores deben centrarse exclusivamente en su desempeño y habilidades pedagógicas. Cualquier referencia a ideologías, creencias personales, o aspectos no relacionados con su labor docente serán considerados fuera del alcance de esta plataforma y podrían ser eliminados.',
      '5. Se solicita que los comentarios sobre los profesores sean objetivos y se centren en su desempeño académico y habilidades de enseñanza. Evite compartir experiencias personales o conflictos individuales que puedan sesgar la valoración del profesor.'
    ]
  },
  {
    title: 'Integración con SIIT (Sistema Integral de Información)',
    content: [
      'En Profedex, nos integramos con el SIIT (Sistema Integral de Información) del Instituto Tecnológico de Durango para validar la información de los usuarios y garantizar su elegibilidad para utilizar nuestra plataforma. Esta sección describe cómo se manejan los términos y condiciones en relación con la integración con el SIIT:',
      '1. Al utilizar nuestra plataforma, los usuarios aceptan los términos y condiciones establecidos en este documento, así como los términos y condiciones del SIIT del Instituto Tecnológico de Durango.',
      '2. Nos reservamos el derecho de verificar la identidad y la elegibilidad de los usuarios a través de la integración con el SIIT antes de permitirles el acceso a nuestra plataforma.',
      '3. Por el momento, solo permitimos el acceso a nuestra plataforma a usuarios que estén inscritos en el Instituto Tecnológico de Durango y que cursen una de las siguientes carreras: Ingeniería en Sistemas Computacionales, Ingeniería Informática, Ingeniería en Tecnologías de la Información y Comunicaciones, Ingeniería Bioquímica o Ingeniería Mecánica.',
      '4. La integración con el SIIT se utiliza únicamente con el propósito de validar la identidad y la elegibilidad de los usuarios para acceder a nuestra plataforma. No compartimos esta información con terceros y la utilizamos exclusivamente para los fines descritos.'
    ]
  }
]

export default function TermsPage() {
  return (
    <main className="max-w-screen relative flex flex-col items-center dark:bg-dark-black">
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
        <h1 className={`${chakra.className} py-3 text-2xl`}>
          Términos y condiciones
        </h1>
        <ol>
          {TERMS.map((term, index) => (
            <li key={index} className="mb-8 mt-2 flex flex-col gap-2 text-lg">
              <a href={`#${term.title}`} className="font-bold">
                {index + 1}. {term.title}
              </a>
              {term.content.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400">
                  {paragraph}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </article>
      <p className="py-10">Última actualización: 4 de diciembre de 2024</p>
    </main>
  )
}
