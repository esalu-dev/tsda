import { FaHeart } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { MdModeComment, MdSchool } from 'react-icons/md'
import { StatCardHome } from './StatCardHome'

export async function StatsCardHome() {
  return (
    <section className="grid flex-1 grid-cols-2 grid-rows-2 gap-5 sm:grid-cols-4 sm:grid-rows-1">
      <StatCardHome
        icon={<MdModeComment />}
        title="Comentarios"
        color="text-purple-400 bg-purple-100 dark:bg-purple-900"
        subtitle="Comentarios en total"
        body={'0'}
      />
      <StatCardHome
        icon={<FiUser />}
        title="Mis comentarios"
        color="text-green-400 bg-green-100 dark:bg-green-900"
        subtitle="Comentarios realizados"
        body={'0'}
      />
      <StatCardHome
        icon={<MdSchool />}
        title="Profesores"
        color="text-cyan-400 bg-cyan-100 dark:bg-cyan-900"
        subtitle="Profesores en la plataforma"
        body={'0'}
      />
      <StatCardHome
        icon={<FaHeart />}
        title="Likes"
        color="text-red-400 bg-red-100 dark:bg-red-900"
        subtitle="Total de likes emitidos"
        body={'0'}
      />
    </section>
  )
}
