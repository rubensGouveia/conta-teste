/*
  Warnings:

  - You are about to drop the column `produto_id` on the `produto_quantidade` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "produto_quantidade" DROP CONSTRAINT "produto_quantidade_produto_id_fkey";

-- AlterTable
ALTER TABLE "produto_quantidade" DROP COLUMN "produto_id";

-- CreateTable
CREATE TABLE "_ProdutoToProdutoQuantidade" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProdutoToProdutoQuantidade_AB_unique" ON "_ProdutoToProdutoQuantidade"("A", "B");

-- CreateIndex
CREATE INDEX "_ProdutoToProdutoQuantidade_B_index" ON "_ProdutoToProdutoQuantidade"("B");

-- AddForeignKey
ALTER TABLE "_ProdutoToProdutoQuantidade" ADD CONSTRAINT "_ProdutoToProdutoQuantidade_A_fkey" FOREIGN KEY ("A") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProdutoToProdutoQuantidade" ADD CONSTRAINT "_ProdutoToProdutoQuantidade_B_fkey" FOREIGN KEY ("B") REFERENCES "produto_quantidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
