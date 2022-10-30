/*
  Warnings:

  - The primary key for the `produto_quantidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `produto_id` on the `produto_quantidade` table. All the data in the column will be lost.
  - Added the required column `produto_nome` to the `produto_quantidade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "produto_quantidade" DROP CONSTRAINT "produto_quantidade_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "valor" DROP CONSTRAINT "valor_produto_id_fkey";

-- AlterTable
ALTER TABLE "produto_quantidade" DROP CONSTRAINT "produto_quantidade_pkey",
DROP COLUMN "produto_id",
ADD COLUMN     "produto_nome" TEXT NOT NULL,
ADD CONSTRAINT "produto_quantidade_pkey" PRIMARY KEY ("compra_id", "produto_nome");

-- AddForeignKey
ALTER TABLE "produto_quantidade" ADD CONSTRAINT "produto_quantidade_produto_nome_fkey" FOREIGN KEY ("produto_nome") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valor" ADD CONSTRAINT "valor_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;
