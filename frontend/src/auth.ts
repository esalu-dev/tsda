import NextAuth, { type DefaultSession, type NextAuthConfig } from 'next-auth'
import 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      carrera: string
      username: string
      accessToken: string
    } & DefaultSession['user']
  }
  interface User {
    role: string
    carrera: string
    username: string
    accessToken: string
    refreshToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    carrera: string
    username: string
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
  }
}

const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'E-mail', type: 'email' },
    password: { label: 'Password', type: 'password' }
  },
  async authorize(credentials) {
    try {
      const res = await fetch(
        `${process.env.BACKEND_AUTH_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        }
      )

      if (!res.ok) {
        if (res.status === 403) {
          const banData = await res.json()
          throw new Error(
            JSON.stringify({
              error: 'banned',
              banReason: banData.banReason,
              banDuration: banData.banDuration
            })
          )
        }
        return null
      }
      const data = await res.json()

      const payload = JSON.parse(
        Buffer.from(data.accessToken.split('.')[1], 'base64').toString()
      )

      return {
        id: payload.sub,
        email: payload.email,
        username: payload.username,
        role: payload.role,
        carrera: payload.carrera,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }
    } catch (error) {
      // Re-lanzar si es error de baneo para que llegue a loginAction()
      if (error instanceof Error && error.message.includes('banned')) {
        throw error
      }
      console.log(error)
      return null
    }
  }
})

const config: NextAuthConfig = {
  providers: [credentialsConfig],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
        session.user.carrera = token.carrera as string
        session.user.username = token.username as string
        session.user.accessToken = token.accessToken as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.role = user.role
        token.carrera = user.carrera
        token.username = user.username
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.accessTokenExpires = Date.now() + 30 * 1000
      }
      if (Date.now() < token.accessTokenExpires) {
        return token
      }
      try {
        const res = await fetch(
          `${process.env.BACKEND_AUTH_URL}/api/auth/refresh`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken: token.refreshToken })
          }
        )

        if (!res.ok) {
          console.log(`Failed to refresh, data: ${JSON.stringify(res)}`)
          return { ...token, error: 'RefreshAccessTokenError' }
        }

        const data = await res.json()
        console.log(`Successful refresh, data: ${JSON.stringify(data)}`)
        return {
          ...token,
          accessToken: data.accessToken,
          accessTokenExpires: Date.now() + 30 * 1000,
          refreshToken: data.newRefreshToken
        }
      } catch (error) {
        console.log(error)
        return { ...token, error: 'RefreshAccessTokenError' }
      }
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
