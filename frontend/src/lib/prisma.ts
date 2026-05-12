import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || 'libsql://dev-esalu-dev.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Mjk4NzY3MjEsImlkIjoiZTg4Yzk4NzctYjE4MS00YjhjLTljNGMtZTc5NDhkMzBkMGE2In0.WHb8LWoAcs4351JvRMyVN9oGoUW7JuljBsUvEI1amH5-poVaJ3RIN0sHX72rFvbIHc91qMtHwatTcEVmqCPsAw"
})

const adapter = new PrismaLibSQL(libsql)
export const prisma = new PrismaClient({ adapter })
