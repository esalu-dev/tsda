/*
  Warnings:

  - Added the required column `carrera` to the `Materias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carrera` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Materias" ADD COLUMN     "carrera" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "carrera" TEXT NOT NULL;
