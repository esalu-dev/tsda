import React from 'react'

export const ResetPasswordEmail: React.FC<{
  username: string
  href: string
}> = ({ username, href }) => {
  const styles = {
    main: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'white'
    },
    header: {
      display: 'flex',
      padding: '1rem',
      alignItems: 'center',
      gap: '0.25rem'
    },
    logo: {
      width: '1.5rem',
      height: '1.5rem'
    },
    title: {
      color: '#d0021a',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      fontFamily: 'Chakra Petch, sans-serif'
    }
  }
  return (
    <main style={styles.main as React.CSSProperties}>
      <header style={styles.header}>
        <p style={styles.title}>Profedex</p>
      </header>
      <div
        style={{
          padding: '0 0.75rem'
        }}
      >
        <h1
          style={{
            fontFamily: 'Chakra Petch, sans-serif',
            color: '#000',
            fontSize: '1.875rem',
            fontWeight: 'bold'
          }}
        >
          Restablece tu contraseña
        </h1>
        <article
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '0.75rem 0'
          }}
        >
          <h2
            style={{
              color: '#000',
              fontWeight: 'bold'
            }}
          >
            Hola, {username}
          </h2>
          <p
            style={{
              color: '#888'
            }}
          >
            Recibimos una solicitud para restablecer la contraseña de tu cuenta
            en Profedex. No te preocupes, estamos aquí para ayudarte a recuperar
            el acceso a tu cuenta.
          </p>
          <p
            style={{
              color: '#000'
            }}
          >
            Haz clic en el siguiente enlace para restablecer tu contraseña:
          </p>

          <a
            href={href}
            style={{
              color: '#fff',
              fontWeight: 'bold',
              backgroundColor: '#d0021a',
              maxWidth: 'max-content',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem'
            }}
          >
            Click aquí para reiniciar tu contraseña
          </a>
          <p
            style={{
              color: '#888'
            }}
          >
            Si no solicitaste esta acción, simplemente ignora este correo
            electrónico y tu contraseña permanecerá sin cambios. Recuerda, este
            enlace solo es válido por 1 hora.
          </p>
          <p
            style={{
              color: '#888'
            }}
          >
            Si tienes problemas para hacer clic en el botón, copia y pega la
            siguiente URL en tu navegador:
            <code
              style={{
                color: '#d0021a',
                display: 'block'
              }}
            >
              {href}
            </code>
          </p>
          <div>
            <p
              style={{
                color: '#000'
              }}
            >
              Gracias,
            </p>
            <p
              style={{
                color: '#000'
              }}
            >
              el equipo de{' '}
              <strong
                style={{
                  fontFamily: 'Chakra Petch, sans-serif',
                  color: '#d0021a',
                  fontWeight: 'bold'
                }}
              >
                Profedex
              </strong>
            </p>
          </div>
        </article>
      </div>
    </main>
  )
}
