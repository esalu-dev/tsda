import { StatCardProfile } from './StatCardProfile'
import { getProfileStats } from '@/lib/getProfileStats'

export async function StatsCardProfile({ username }: { username: string }) {
  const { reviewCount, likeCount } = await getProfileStats(username)
  return (
    <div className="flex flex-1 basis-40 flex-col gap-4">
      <StatCardProfile
        type="Total de comentarios"
        rating={reviewCount}
        content={
          <div className="w-[300px]">
            <strong>Total de comentarios</strong>
            <p className="text-pretty">
              El total de comentarios que ha realizado este usuario.
            </p>
          </div>
        }
      />
      <StatCardProfile
        type="Likes recibidos"
        rating={likeCount}
        content={
          <div className="w-[300px]">
            <strong>Likes recibidos</strong>
            <p className="text-pretty">
              Número de likes que ha recibido este usuario en sus comentarios.
            </p>
          </div>
        }
      />
    </div>
  )
}
