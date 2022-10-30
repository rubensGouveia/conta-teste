/*
  Warnings:

  - The primary key for the `produto_quantidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `compraId` on the `produto_quantidade` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `produto_quantidade` table. All the data in the column will be lost.
  - You are about to drop the `_ProdutoToProdutoQuantidade` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `compra_id` to the `produto_quantidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produto_id` to the `produto_quantidade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProdutoToProdutoQuantidade" DROP CONSTRAINT "_ProdutoToProdutoQuantidade_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProdutoToProdutoQuantidade" DROP CONSTRAINT "_ProdutoToProdutoQuantidade_B_fkey";

-- DropForeignKey
ALTER TABLE "produto_quantidade" DROP CONSTRAINT "produto_quantidade_compraId_fkey";

-- AlterTable
ALTER TABLE "produto_quantidade" DROP CONSTRAINT "produto_quantidade_pkey",
DROP COLUMN "compraId",
DROP COLUMN "id",
ADD COLUMN     "compra_id" TEXT NOT NULL,
ADD COLUMN     "produto_id" TEXT NOT NULL,
ADD CONSTRAINT "produto_quantidade_pkey" PRIMARY KEY ("compra_id", "produto_id");

-- DropTable
DROP TABLE "_ProdutoToProdutoQuantidade";

-- AddForeignKey
ALTER TABLE "produto_quantidade" ADD CONSTRAINT "produto_quantidade_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_quantidade" ADD CONSTRAINT "produto_quantidade_compra_id_fkey" FOREIGN KEY ("compra_id") REFERENCES "compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
