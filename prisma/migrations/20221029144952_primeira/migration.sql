/*
  Warnings:

  - You are about to drop the `Compra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Compra";

-- CreateTable
CREATE TABLE "compra" (
    "id" TEXT NOT NULL,
    "estabelecimento" TEXT NOT NULL,
    "valor_compra" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_quantidade" (
    "id" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "produto_id" TEXT NOT NULL,
    "valor_produto" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "compraId" TEXT,

    CONSTRAINT "produto_quantidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "valor" (
    "id" TEXT NOT NULL,
    "estabelecimento" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "produto_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "valor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produto_nome_key" ON "produto"("nome");

-- AddForeignKey
ALTER TABLE "produto_quantidade" ADD CONSTRAINT "produto_quantidade_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_quantidade" ADD CONSTRAINT "produto_quantidade_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "compra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valor" ADD CONSTRAINT "valor_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
