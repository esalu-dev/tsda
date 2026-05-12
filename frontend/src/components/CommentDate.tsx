const currentDate = Date.now()
export function CommentDate({ date }: { date: Date }) {
  function obtenerFechaRelativa(fechaPublicacion: Date) {
    const tiempoTranscurrido = currentDate - fechaPublicacion.getTime()
    const segundosEnDia = 86400 // 24 horas * 60 minutos * 60 segundos * 1000 milisegundos

    const segundosTranscurridos = Math.floor(tiempoTranscurrido / 1000)

    if (segundosTranscurridos < 60) {
      return 'hace menos de un minuto'
    } else if (segundosTranscurridos < 3600) {
      const minutos = Math.floor(segundosTranscurridos / 60)
      return `hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`
    } else if (segundosTranscurridos < segundosEnDia) {
      const horas = Math.floor(segundosTranscurridos / 3600)
      return `hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`
    } else if (segundosTranscurridos < segundosEnDia * 7) {
      const dias = Math.floor(segundosTranscurridos / segundosEnDia)
      return `hace ${dias} ${dias === 1 ? 'día' : 'días'}`
    } else if (segundosTranscurridos < segundosEnDia * 30) {
      const semanas = Math.floor(segundosTranscurridos / (segundosEnDia * 7))
      return `hace ${semanas} ${semanas === 1 ? 'semana' : 'semanas'}`
    } else if (segundosTranscurridos < segundosEnDia * 365) {
      const meses = Math.floor(segundosTranscurridos / (segundosEnDia * 30))
      return `hace ${meses} ${meses === 1 ? 'mes' : 'meses'}`
    } else {
      const fecha = fechaPublicacion.getDate()
      const mes = fechaPublicacion.getMonth() + 1
      const año = fechaPublicacion.getFullYear()
      return `${fecha}/${mes}/${año}`
    }
  }
  return (
    <p className="text-sm text-gray-400 dark:text-gray-600">
      {obtenerFechaRelativa(date)}
    </p>
  )
}
