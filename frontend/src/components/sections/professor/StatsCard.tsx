import { StatCard } from '@/components/StatCard'
import { getStats } from '@/lib/getStats'

export async function StatsCard({ shortname }: { shortname: string }) {
  const stats = await getStats(shortname)
  return (
    <div className="flex flex-1 basis-60 flex-col gap-4">
      <StatCard
        type="¿Volvería a cursar?"
        rating={stats.wouldTakeAgain}
        content={
          <div className="w-[300px]">
            <strong>¿Volvería a cursar?</strong>
            <p className="text-pretty">
              Porcentaje de estudiantes que volverían a tomar clase con este
              profesor.
            </p>
          </div>
        }
      />
      <StatCard
        type="Dificultad"
        rating={stats.difficulty}
        content={
          <div className="w-[300px]">
            <strong>Dificultad</strong>
            <p className="text-pretty">
              Calificación de la dificultad de las clases del profesor. Siendo 1
              la dificultad más baja y 10 la más alta.
            </p>
          </div>
        }
      />
      <StatCard
        type="Aprendizaje percibido"
        rating={stats.learningLevel}
        content={
          <div className="w-[300px]">
            <strong>Aprendizaje percibido</strong>
            <p className="text-pretty">
              Calificación del nivel de aprendizaje que se percibe en las clases
              del profesor. Siendo 1 el aprendizaje más bajo y 10 el más alto.
            </p>
          </div>
        }
      />
    </div>
  )
}
