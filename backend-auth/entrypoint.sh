#!/bin/sh
set -e

echo "▶ Aplicando migraciones en PostgreSQL..."
npx prisma migrate deploy --schema=prisma/pg/schema.prisma

echo "▶ Sincronizando esquema en MySQL..."
npx prisma db push --config=prisma-mysql.config.ts --accept-data-loss

echo "▶ Iniciando aplicación..."
exec node dist/src/main.js
