/*
  Warnings:

  - A unique constraint covering the columns `[nombre,carrera]` on the table `Materias` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Materias_carrera_key";

-- CreateIndex
CREATE UNIQUE INDEX "Materias_nombre_carrera_key" ON "Materias"("nombre", "carrera");
