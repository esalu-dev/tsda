# ── Stage 1: Build ──
FROM node:22-alpine AS builder
WORKDIR /app

# Necesario para compatibilidad con Alpine (musl libc)
RUN apk add --no-cache libc6-compat

# 1) Copiar archivos de dependencias e instalar
COPY package.json package-lock.json ./
RUN npm ci

# 2) Copiar TODO el código fuente
#    NOTA: .dockerignore excluye 'generated/' para no copiar
#    los fuentes locales (que pueden diferir del entorno Alpine/Linux)
COPY . .

# 3) Copiar schemas de Prisma (ya incluidos en COPY . ., pero los
#    necesitamos antes de generar — son parte del repo)
#    (ya copiados arriba)

# 4) Generar AMBOS clientes Prisma → crea archivos .ts en ./generated/
#    DEBE correr DESPUÉS de COPY . . para que no sea sobreescrito,
#    y ANTES de npm run build para que tsc encuentre los .ts generados
RUN npx prisma generate --schema=prisma/pg/schema.prisma
RUN npx prisma generate --config=prisma-mysql.config.ts

# 5) Compilar TypeScript
#    tsc compila:
#      - generated/*.ts    → dist/generated/*.js
#      - src/**/*.ts       → dist/src/**/*.js
RUN npm run build

# ── Stage 2: Production ──
FROM node:22-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production

# Copiar solo lo necesario para producción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/prisma-mysql.config.ts ./

# El código en dist/src/.../prisma.service.js hace:
#   require("../../../../generated/prisma-pg/client")
# Desde /app/dist/src/infrastructure/prisma/context/prisma.service.js
# eso resuelve a /app/dist/generated/prisma-pg/client.js ← en dist/ ✅
#
# Por seguridad también mapeamos dist/generated/ → generated/
# por si algún path lo busca relativo a /app/ directamente
COPY --from=builder /app/dist/generated ./generated

# Copiar el entrypoint
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3001

# El entrypoint aplica migraciones y luego arranca la app
ENTRYPOINT ["./entrypoint.sh"]
