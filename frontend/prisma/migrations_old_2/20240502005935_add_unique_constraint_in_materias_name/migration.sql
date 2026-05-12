/*
  Warnings:

  - A unique constraint covering the columns `[carrera]` on the table `Materias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Materias_carrera_key" ON "Materias"("carrera");
