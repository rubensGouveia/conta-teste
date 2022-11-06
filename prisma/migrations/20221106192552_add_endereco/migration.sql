/*
  Warnings:

  - Made the column `endereco` on table `compra` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "compra" ALTER COLUMN "endereco" SET NOT NULL;
