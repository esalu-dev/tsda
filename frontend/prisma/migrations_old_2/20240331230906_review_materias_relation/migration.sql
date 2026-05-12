/*
  Warnings:

  - Added the required column `materiaId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "materiaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
