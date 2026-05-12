/* eslint-disable @next/next/no-img-element */
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Chakra_Petch } from 'next/font/google'
import { Navbar } from '@/components/landing/Navbar'
import { FAQItem } from '@/components/landing/FAQItem'
import { BiSolidCommentDetail, BiCheckCircle } from 'react-icons/bi'
import { FaShieldAlt, FaUserLock, FaUniversity } from 'react-icons/fa'
import { FcPieChart } from 'react-icons/fc'
import { FiChevronRight, FiInstagram, FiStar } from 'react-icons/fi'
import { IoMdInformationCircle } from 'react-icons/io'
import { MdSchool } from 'react-icons/md'
import React from 'react'

// --- FONTS ---
const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '600', '700']
})

// --- 3D / FALLBACK LOGIC ---
/**
 * NOTA PARA EL DESARROLLADOR:
 * Para habilitar la experiencia 3D completa, instala las siguientes dependencias:
 * npm install three @types/three @react-three/fiber @react-three/drei
 *
 * Luego, descomenta el bloque de importación abajo y el componente <Hero3D /> en la sección Hero.
 */

/*
// --- 3D IMPORTS (Descomentar cuando se instalen deps) ---
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls, Float, Sparkles, Text } from '@react-three/drei'
// import * as THREE from 'three'

// const FloatingCard = ({ position, text, color }: any) => {
//   return (
//     <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
//       <group position={position}>
//         <mesh>
//           <boxGeometry args={[3, 2, 0.1]} />
//           <meshStandardMaterial color={color} transparent opacity={0.8} />
//         </mesh>
//         <Text position={[0, 0, 0.1]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
//           {text}
//         </Text>
//       </group>
//     </Float>
//   )
// }

// const HeroScene = () => {
//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <Sparkles count={100} scale={10} size={4} speed={0.4} opacity={0.5} color="#6036dd" />
//       <FloatingCard position={[-2, 1, 0]} text="Dificultad" color="#ff4b4b" />
//       <FloatingCard position={[2, -1, -1]} text="Aprendizaje" color="#51dfe1" />
//       <FloatingCard position={[0, 2, -2]} text="Volvería" color="#ffd43b" />
//       <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
//     </>
//   )
// }
*/

// --- COMPONENTS ---

const HeroFallback = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900 to-black">
    {/* Abstract background shapes */}
    <div className="absolute left-[-20%] top-[-20%] h-[500px] w-[500px] animate-pulse rounded-full bg-purple-600/20 blur-[100px]" />
    <div className="absolute bottom-[-20%] right-[-20%] h-[500px] w-[500px] animate-pulse rounded-full bg-red-600/20 blur-[100px] duration-700" />

    {/* Content mimicking 3D elements */}
    <div className="relative z-10 flex flex-col items-center gap-6">
      {/* Floating cards simulation */}
      <div className="mb-[-40px] ml-[-120px] w-48 rotate-[-6deg] transform rounded-xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:rotate-0">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="font-mono text-xs text-white/80">CALIFICACIÓN</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-[80%] bg-yellow-400" />
        </div>
      </div>

      <div className="z-20 w-64 rotate-[3deg] transform rounded-xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:rotate-0">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 text-xl text-white">
            <MdSchool />
          </div>
          <div>
            <div className="h-2 w-20 rounded bg-white/40 md:mb-1" />
            <div className="h-2 w-12 rounded bg-white/20" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-[80%] rounded bg-white/10" />
        </div>
        <div className="mt-4 flex gap-1 text-sm text-yellow-400">
          <FiStar fill="currentColor" />
          <FiStar fill="currentColor" />
          <FiStar fill="currentColor" />
          <FiStar fill="currentColor" />
          <FiStar fill="currentColor" />
        </div>
      </div>

      <div className="mr-[-140px] mt-[-40px] w-48 rotate-[12deg] transform rounded-xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:rotate-0">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-400" />
          <span className="font-mono text-xs text-white/80">VOLVERÍA</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-[92%] bg-green-400" />
        </div>
      </div>
    </div>
  </div>
)

const SectionTitle = ({
  title,
  subtitle,
  align = 'center'
}: {
  title: string
  subtitle: string
  align?: 'left' | 'center'
}) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2
      className={`mb-4 text-3xl font-bold dark:text-white md:text-5xl ${chakra.className}`}
    >
      {title}
    </h2>
    <p className="mx-auto max-w-2xl text-pretty text-lg text-gray-600 dark:text-gray-400">
      {subtitle}
    </p>
  </div>
)

const FeatureCard = ({
  icon,
  title,
  desc,
  color
}: {
  icon: React.ReactNode
  title: string
  desc: string
  color: string
}) => (
  <div className="group relative rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-1 transition-colors duration-300 hover:from-main-red/20">
    <div className="relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white p-8 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-main-red/5 dark:border-white/10 dark:bg-zinc-900/50">
      <div
        className={`${
          color as string
        } mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-4xl`}
      >
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-main-red dark:text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {desc}
      </p>
    </div>
  </div>
)

const StepCard = ({
  number,
  title,
  desc
}: {
  number: number
  title: string
  desc: string
}) => (
  <div className="relative flex flex-col items-center p-6 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-main-red/20 bg-main-red/10 text-2xl font-bold text-main-red">
      {number}
    </div>
    <h3 className="mb-3 text-xl font-bold dark:text-white">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    {number !== 3 && (
      <div className="absolute right-[-50%] top-14 z-0 hidden h-[2px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700 md:block" />
    )}
  </div>
)

const PreviewCard = () => (
  <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
    <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600" />
    <div className="px-6 pb-6">
      <div className="relative -top-10 flex items-end justify-between">
        <div className="h-20 w-20 rounded-2xl bg-white p-1 shadow-lg dark:bg-zinc-800">
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-200 text-3xl dark:bg-zinc-700">
            👨‍🏫
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
          <BiCheckCircle /> 92% RECOMENDADO
        </div>
      </div>
      <div className="mt-[-1.5rem]">
        <h3 className="text-xl font-bold dark:text-white">
          Ing. Roberto Martínez
        </h3>
        <p className="text-sm text-gray-500">Departamento de Sistemas</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-zinc-800/50">
          <div className="text-xl font-bold text-yellow-500">4.8</div>
          <div className="text-[10px] uppercase tracking-wide text-gray-500">
            General
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-zinc-800/50">
          <div className="text-xl font-bold text-red-500">Hard</div>
          <div className="text-[10px] uppercase tracking-wide text-gray-500">
            Dificultad
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-zinc-800/50">
          <div className="text-xl font-bold text-blue-500">Alta</div>
          <div className="text-[10px] uppercase tracking-wide text-gray-500">
            Calidad
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-4 dark:border-white/5">
        <p className="text-sm italic text-gray-600 dark:text-gray-400">
          &quot;Excelente profesor, explica muy bien pero sus exámenes son
          difíciles. Tienes que estudiar mucho.&quot;
        </p>
      </div>
    </div>
  </div>
)

export default function Home() {
  return (
    <main className="font-onest min-h-screen overflow-x-hidden bg-gray-50 text-gray-900 selection:bg-main-red selection:text-white dark:bg-[#0a0a0a] dark:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="inicio"
        className="relative overflow-hidden pb-20 pt-12 lg:pb-32 lg:pt-24"
      >
        <div className="absolute left-0 top-0 -z-10 h-[500px] w-full bg-gradient-to-b from-main-red/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-main-red/20 bg-main-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-main-red">
                <IoMdInformationCircle /> V 2.0.0 Beta
              </div>
              <h1
                className={`mb-6 text-4xl font-bold leading-tight dark:text-white md:text-6xl lg:text-7xl ${chakra.className}`}
              >
                Califica a tus profesores.
                <br />
                <span className="bg-gradient-to-r from-main-red to-orange-500 bg-clip-text text-transparent">
                  Decide mejor.
                </span>
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
                La plataforma definitiva para estudiantes. Evalúa con estrellas,
                métricas detalladas y comentarios anónimos. Valida tu cuenta con
                SIIT y únete a la comunidad.
              </p>

              <div className="mb-10 flex flex-wrap gap-4">
                <Button
                  as={Link}
                  href="/auth/register"
                  size="lg"
                  className="bg-main-red px-8 font-bold text-white shadow-xl transition-transform hover:scale-105"
                  radius="full"
                >
                  Crear cuenta gratis
                </Button>
                <Button
                  as={Link}
                  href="/auth/login"
                  variant="bordered"
                  size="lg"
                  className="border-2 px-8 font-bold hover:bg-white/5"
                  radius="full"
                >
                  Entrar
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FaShieldAlt className="text-main-red" /> Privacidad total
                </span>
                <span className="flex items-center gap-1">
                  <FaUniversity className="text-main-red" /> Validación SIIT
                </span>
                <span className="flex items-center gap-1">
                  <MdSchool className="text-main-red" /> Solo estudiantes
                </span>
              </div>
            </div>

            <HeroFallback />
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section
        id="power"
        className="border-y border-gray-100 bg-white py-24 dark:border-white/5 dark:bg-zinc-950/[0.3]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="¿Por qué Profedex?"
            subtitle="Empoderamos a los estudiantes con información real y transparente para que tomen el control de su semestre."
          />

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<FiStar />}
              color="text-yellow-400"
              title="Calificación 5 estrellas"
              desc="Sistema intuitivo para valorar el desempeño general. Una visión rápida y clara de la calidad docente."
            />
            <FeatureCard
              icon={<FcPieChart />}
              color="text-cyan-400"
              title="Métricas Clave"
              desc="Analiza probabilidad de volver a cursar, nivel de dificultad y percepción de aprendizaje con gráficas simples."
            />
            <FeatureCard
              icon={<BiSolidCommentDetail />}
              color="text-purple-500"
              title="Comentarios Reales"
              desc="Lee experiencias detalladas de otros alumnos. Sin censura, pero con respeto. Tu opinión construye comunidad."
            />
          </div>
        </div>
      </section>

      {/* PREVIEW SECTION */}
      <section className="overflow-hidden bg-gray-50 py-24 dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 rounded-full bg-main-red/20 blur-[80px]" />
              <div className="relative transform transition-transform duration-500 hover:-translate-y-2">
                <PreviewCard />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionTitle
                align="left"
                title="Conoce a tus profes antes de inscribir"
                subtitle="Evita sorpresas. Revisa el perfil detallado de cada docente, sus fortalezas y áreas de mejora según la comunidad."
              />
              <ul className="mt-8 space-y-4">
                {[
                  'Búsqueda inteligente por nombre o materia',
                  'Filtros por departamento y ranking',
                  'Historial de comentarios por semestre',
                  'Modo oscuro nativo para tus noches de estudio'
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <BiCheckCircle className="mt-0.5 flex-shrink-0 text-xl text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                as={Link}
                href="/auth/login"
                className="mt-8 bg-zinc-900 font-bold text-white dark:bg-white dark:text-black"
                size="lg"
                endContent={<FiChevronRight />}
              >
                Explorar profesores
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="register" className="bg-white py-24 dark:bg-zinc-950/[0.3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Funciona en 3 pasos"
            subtitle="Sin complicaciones. Diseñado para que entres, opines y sigas con tu vida."
          />
          <div className="relative mt-16 grid gap-12 md:grid-cols-3">
            <StepCard
              number={1}
              title="Crea tu cuenta"
              desc="Regístrate en segundos con tu correo personal. Solo necesitas un usuario y contraseña."
            />
            <StepCard
              number={2}
              title="Valida con SIIT"
              desc="Conectamos seguramente con SIIT para verificar que eres estudiante activo. Tus datos están encriptados."
            />
            <StepCard
              number={3}
              title="Opina y Consulta"
              desc="¡Listo! Accede a todas las evaluaciones y deja las tuyas. 100% anónimo y gratuito."
            />
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-zinc-900 dark:bg-black" />
        <div className='absolute inset-0 bg-[url("/grid.svg")] opacity-10' />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 shadow-2xl md:p-16">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2
                  className={`mb-6 text-3xl font-bold text-white md:text-4xl ${chakra.className}`}
                >
                  Tu privacidad es sagrada.
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-400">
                  Sabemos que evaluar a tus profesores puede ser intimidante.
                  Por eso construimos Profedex con la confidencialidad como
                  pilar central.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex gap-4">
                    <div className="h-fit rounded-lg bg-main-red/20 p-3 text-xl text-main-red">
                      <FaUserLock />
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-white">Anónimo</h4>
                      <p className="text-sm text-gray-500">
                        Tu identidad nunca se muestra públicamente en las
                        reseñas.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-fit rounded-lg bg-blue-500/20 p-3 text-xl text-blue-400">
                      <FaShieldAlt />
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-white">Encriptado</h4>
                      <p className="text-sm text-gray-500">
                        Datos protegidos con estándares de la industria.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="./mockup.webp"
                  alt="Privacy shield illusion"
                  className="rounded-xl border border-white/5 opacity-80 shadow-2xl transition-opacity hover:opacity-100"
                />
                <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-white/10 bg-zinc-800 p-4 shadow-xl md:block">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
                    <span className="font-mono text-sm text-white">
                      Sistema Seguro
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-24 dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Preguntas Frecuentes"
            subtitle="Resolvemos tus dudas antes de que preguntes."
          />
          <div className="mt-10">
            <FAQItem
              q="¿Es realmente anónimo?"
              a="Sí. Aunque cruzamos datos con SIIT para verificar que eres estudiante, esa información se disocia de tus comentarios públicos. Tu nombre nunca aparecerá junto a una reseña."
            />
            <FAQItem
              q="¿Pueden los profesores borrar reseñas?"
              a="No. Los profesores no tienen rol de administrador. Solo moderamos comentarios que violen nuestras normas de comunidad (insultos graves, incitación al odio, etc)."
            />
            <FAQItem
              q="¿Cómo funciona la validación del SIIT?"
              a="Utilizamos un script seguro que verifica tus credenciales contra el portal oficial. No almacenamos tu contraseña del SIIT, solo el token de validación y tus datos básicos de estudiante."
            />
            <FAQItem
              q="¿Tiene costo?"
              a="Profedex es y siempre será 100% gratuito para los estudiantes."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12 dark:border-white/10 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <img src="./logo.svg" alt="Profedex" className="h-6" />
                <span
                  className={`text-xl font-bold dark:text-white ${chakra.className}`}
                >
                  Profedex
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                Hecho por estudiantes, para estudiantes. <br />
                Mejorando la experiencia académica un semestre a la vez.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Plataforma
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#inicio" className="hover:text-main-red">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#power" className="hover:text-main-red">
                    Características
                  </a>
                </li>
                <li>
                  <a href="/auth/login" className="hover:text-main-red">
                    Entrar
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/privacy" className="hover:text-main-red">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-main-red">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Social
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a
                    href="https://instagram.com/profedex.top"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-main-red"
                  >
                    <FiInstagram /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@profedex.top"
                    className="hover:text-main-red"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-white/5 md:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Profedex. Todos los derechos
              reservados.
            </p>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>Desarrollado con ❤️ por Emilio Salas & Victoria Bueno</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
