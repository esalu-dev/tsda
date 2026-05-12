/*
  Warnings:

  - You are about to drop the column `device` on the `UserSession` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `UserSession` table. All the data in the column will be lost.
  - You are about to drop the column `lastUsed` on the `UserSession` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `UserSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSession" DROP COLUMN "device",
DROP COLUMN "ip",
DROP COLUMN "lastUsed",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
