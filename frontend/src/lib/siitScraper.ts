import { Agent } from 'https'
import { load } from 'cheerio'
import fetch from 'node-fetch'

const agent = new Agent({
  rejectUnauthorized: false
})

export function titleCase(str: string) {
  if (!str) return ''
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
}

export function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function parseTeacherName(rawSiitName: string) {
  const parts = rawSiitName.trim().split(/\s+/)
  let paterno = ''
  let materno = ''
  let nombre = ''

  if (parts.length >= 3) {
    paterno = parts[0]
    materno = parts[1]
    nombre = parts.slice(2).join(' ')
  } else if (parts.length === 2) {
    paterno = parts[0]
    materno = '' // Explicarlo aunque ya esté vacío arriba para silenciar linter si es necesario, o simplemente removerlo de la línea 21. En TS mejor reasignarlo para silenciar.
    nombre = parts[1]
  } else {
    materno = ''
    nombre = parts[0] || ''
  }

  return {
    nombre: titleCase(nombre),
    apellidoPaterno: titleCase(paterno),
    apellidoMaterno: titleCase(materno),
    rawName: rawSiitName.trim()
  }
}

export function generateShortname(
  nombre: string,
  paterno: string,
  materno: string
) {
  const full = `${nombre} ${paterno} ${materno}`.trim()
  return removeAccents(full)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export interface ScrapedTeacher {
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  shortname: string
  rawName: string
}

export async function scrapeSiitTeachers(
  numControl: string,
  pin: string
): Promise<
  | { success: true; teachers: ScrapedTeacher[] }
  | { success: false; error: string }
> {
  try {
    const loginRes = await fetch(
      'https://siit.itdurango.edu.mx/sistema/acceso.php',
      {
        agent,
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: `tipo=a&usuario=${numControl}&contrasena=${pin}`,
        method: 'POST'
      }
    )

    const setCookieHeader = loginRes.headers.get('set-cookie')
    if (!setCookieHeader) {
      return {
        success: false,
        error:
          'No se pudo iniciar sesión en el SIIT. Verifica tu configuración de PIN.'
      }
    }

    const cookies = setCookieHeader.split(';')
    const phpsessid = cookies.find((cookie) =>
      cookie.trim().startsWith('PHPSESSID=')
    )

    if (!phpsessid) {
      return { success: false, error: 'No se recibió la sesión del SIIT.' }
    }

    const scheduleRes = await fetch(
      'https://siit.itdurango.edu.mx/sistema/modulos/alu//inscripciones/consulta_horarios/consultar_horarios_cargados.php',
      {
        agent,
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          cookie: `ROUTEID=.1; ${phpsessid}`
        },
        method: 'GET'
      }
    )

    const buffer = await scheduleRes.arrayBuffer()
    const html = new TextDecoder('iso-8859-1').decode(buffer)

    // Logout preventivo en background
    fetch('https://siit.itdurango.edu.mx/sistema/cerrar_sesion.php', {
      agent,
      headers: { cookie: `ROUTEID=.1; ${phpsessid}` },
      method: 'GET'
    }).catch(() => {})

    const $ = load(html)
    const teachersMap = new Map<string, ScrapedTeacher>()

    $('table[bordercolor="#0066FF"] tr').each((_, row) => {
      const materiaCell = $(row).find('td.medium_left').first()
      if (materiaCell.length > 0) {
        const cellHtml = materiaCell.html()
        if (cellHtml) {
          const parts = cellHtml.split(/<br\s*\/?>/i)
          if (parts.length >= 3) {
            // El tercer elemento es el nombre del profesor
            const rawContent = parts[2]
            const rawTeacherName = load(`<div>${rawContent}</div>`)
              .text()
              .trim()

            if (
              rawTeacherName &&
              rawTeacherName.length > 3 &&
              !rawTeacherName.toLowerCase().includes('pendiente')
            ) {
              const parsed = parseTeacherName(rawTeacherName)
              const shortname = generateShortname(
                parsed.nombre,
                parsed.apellidoPaterno,
                parsed.apellidoMaterno
              )

              if (!teachersMap.has(shortname)) {
                teachersMap.set(shortname, {
                  ...parsed,
                  shortname
                })
              }
            }
          }
        }
      }
    })

    return {
      success: true,
      teachers: Array.from(teachersMap.values())
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'Error de conexión con SIIT'
      }
    }
    return {
      success: false,
      error: 'Error de conexión con SIIT'
    }
  }
}
