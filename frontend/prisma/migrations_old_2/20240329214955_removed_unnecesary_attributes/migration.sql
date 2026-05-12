/*
  Warnings:

  - You are about to drop the column `apellidoMaterno` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `apellidoPaterno` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `carrera` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "apellidoMaterno",
DROP COLUMN "apellidoPaterno",
DROP COLUMN "carrera",
DROP COLUMN "nombre";
