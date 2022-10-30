/*
  Warnings:

  - You are about to drop the column `valor_compra` on the `compra` table. All the data in the column will be lost.
  - You are about to drop the column `valor_produto` on the `produto_quantidade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "compra" DROP COLUMN "valor_compra";

-- AlterTable
ALTER TABLE "produto_quantidade" DROP COLUMN "valor_produto";
