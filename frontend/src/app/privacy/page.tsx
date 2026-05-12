/* eslint-disable @next/next/no-img-element */
import { DarkModeLandingButton } from '@/components/DarkModeLandingButton'
import { Chakra_Petch } from 'next/font/google'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700']
})

const PRIVACY_POLICY = [
  {
    title: 'Informacion recopilada',
    content: [
      'Podemos recopilar información personal identificable de los usuarios, como nombres de usuario, direcciones de correo electrónico y otra información que los usuarios proporcionen voluntariamente al registrarse en la plataforma.',
      'Cuando los usuarios interactúan con nuestra plataforma, podemos recopilar información de registro, como direcciones IP, tipo de navegador, páginas visitadas, tiempo de visita y otros datos de diagnóstico.',
      'Utilizamos cookies y tecnologías similares para recopilar información sobre la actividad de los usuarios en nuestra plataforma y mejorar su experiencia de usuario. Los usuarios pueden controlar el uso de cookies a través de la configuración de su navegador.'
    ]
  },
  {
    title: 'Uso de la información',
    content: [
      'En Profedex, valoramos la privacidad de nuestros usuarios y utilizamos la información recopilada exclusivamente para proporcionar y mejorar nuestros servicios. Esta sección describe cómo utilizamos la información que recopilamos:',
      'Utilizamos la información personal de los usuarios para proporcionar y mantener nuestros servicios, incluida la autenticación de usuarios, la gestión de cuentas y la personalización de la experiencia del usuario dentro de la plataforma.',
      'Utilizamos la información de contacto de los usuarios para enviar comunicaciones internas relacionadas con el uso de la plataforma, como notificaciones sobre cambios en los términos y condiciones, actualizaciones de la plataforma y mensajes administrativos.',
      'Utilizamos la información recopilada para garantizar la seguridad de la plataforma y protegerla contra actividades fraudulentas, abusivas o no autorizadas.'
    ]
  },
  {
    title: 'Compartición de la información',
    content: [
      'En Profedex, nos comprometemos a proteger la privacidad de nuestros usuarios y a no compartir su información personal con terceros, excepto en las circunstancias descritas a continuación:',
      'Podemos compartir información con proveedores de servicios de confianza que nos ayudan a operar y mantener la plataforma, incluidos proveedores de alojamiento web, servicios de alojamiento de base de datos y proveedores de servicios de correo electrónico.',
      'Podemos divulgar información personal cuando creemos de buena fe que la divulgación es necesaria para cumplir con la ley, una orden judicial, u otros procesos legales, o para proteger los derechos, la propiedad o la seguridad de Profedex, sus usuarios u otros.',
      'Obtendremos el consentimiento del usuario antes de compartir su información personal con terceros con fines diferentes a los establecidos en esta política de privacidad.'
    ]
  },
  {
    title: 'Retención de Datos',
    content: [
      'En Profedex, conservamos la información personal de los usuarios solo durante el tiempo necesario para los fines para los que fue recopilada y de acuerdo con los requisitos legales aplicables. Esta sección describe nuestras prácticas de retención de datos:',
      '1. Conservamos la información personal de los usuarios mientras tengan una cuenta activa en la plataforma',
      '2. Los datos de registro, como direcciones IP y registros de actividad, pueden ser retenidos durante un período más largo para fines de seguridad, detección de fraudes y cumplimiento de la ley.',
      '3. Los usuarios pueden solicitar la eliminación de su información personal de nuestra plataforma en cualquier momento, sujeto a nuestras obligaciones legales y regulatorias de retención de datos.'
    ]
  },
  {
    title: 'Seguridad de la Información',
    content: [
      'En Profedex, nos comprometemos a proteger la seguridad de la información de nuestros usuarios y a implementar medidas adecuadas para prevenir el acceso no autorizado, el uso indebido o la divulgación de información personal. Esta sección describe nuestras prácticas de seguridad de la información:',
      '1. Implementamos medidas de seguridad para proteger la información de nuestros usuarios contra pérdidas, uso indebido, acceso no autorizado, divulgación, alteración o destrucción.',
      '2. La información personal de los usuarios solo está accesible para el creador de la plataforma, quien la utiliza exclusivamente para operar, desarrollar y mejorar el servicio',
      '3. Utilizamos prácticas de cifrado y almacenamiento seguro para proteger las contraseñas de los usuarios y garantizar que estén almacenadas de forma segura.',
      '4. Mantenemos nuestras medidas de seguridad actualizadas y revisamos regularmente nuestras prácticas para garantizar que cumplan con los estándares de seguridad más recientes.'
    ]
  },
  {
    title: 'Derechos de los usuarios',
    content: [
      'En Profedex, respetamos los derechos de privacidad de nuestros usuarios y nos comprometemos a brindarles transparencia y control sobre su información personal. Esta sección describe los derechos de los usuarios con respecto a su información personal:',
      '1. Los usuarios tienen derecho a acceder a su información personal y solicitar la corrección, actualización o eliminación de datos inexactos o incompletos.'
    ]
  },
  {
    title: 'Integración con SIIT (Sistema Integral de Información)',
    content: [
      'En Profedex, nos integramos con el SIIT (Sistema Integral de Información) del Instituto Tecnológico de Durango para validar la información de los usuarios y garantizar su elegibilidad para utilizar nuestra plataforma. Esta sección describe cómo manejamos la información en relación con la integración con el SIIT:',
      '1. Utilizamos la integración con el SIIT para validar la identidad de los usuarios y confirmar que están inscritos en el Instituto Tecnológico de Durango.',
      '2. Solo permitimos el acceso a nuestra plataforma a los usuarios que estén inscritos en una de las siguientes carreras: Ingeniería en Sistemas Computacionales, Ingeniería Informática o Ingeniería en Tecnologías de la Información y Comunicaciones.',
      '3. Al iniciar sesión con el SIIT, recopilamos únicamente la información necesaria para verificar la identidad y la elegibilidad del usuario, incluido el número de control y la carrera en la que está inscrito.',
      '4. No almacenamos el PIN de acceso de los estudiantes, y la validación se realiza únicamente al momento de crear una cuenta',
      '5. La información obtenida a través de la integración con el SIIT se utiliza únicamente con el propósito de validar la identidad y la elegibilidad de los usuarios para acceder a nuestra plataforma. No compartimos esta información con terceros y la utilizamos exclusivamente para los fines descritos.'
    ]
  },
  {
    title: 'Cambios en la política de privacidad',
    content: [
      'En Profedex, nos reservamos el derecho de actualizar o modificar esta política de privacidad en cualquier momento y sin previo aviso. Cualquier cambio en esta política será efectivo cuando se publique la versión revisada en la plataforma. Esta sección describe nuestra política con respecto a los cambios en la política de privacidad:',
      '1. Al continuar utilizando nuestra plataforma después de que se publique la versión revisada de esta política de privacidad, los usuarios aceptan y consienten los términos actualizados de la política. Si un usuario no está de acuerdo con los términos de la nueva política, deberá dejar de utilizar nuestra plataforma.',
      '2. Es responsabilidad de los usuarios revisar periódicamente esta política de privacidad para estar al tanto de los cambios y asegurarse de que están de acuerdo con los términos actualizados.'
    ]
  }
]

export default function PolicyPage() {
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
          Política de privacidad
        </h1>
        <ol>
          {PRIVACY_POLICY.map((policy, index) => (
            <li key={index} className="mb-8 mt-2 flex flex-col gap-2 text-lg">
              <a href={`#${policy.title}`} className="font-bold">
                {index + 1}. {policy.title}
              </a>
              {policy.content.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400">
                  {paragraph}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </article>
      <p className="py-10">Última actualización: 11 de mayo de 2024</p>
    </main>
  )
}
