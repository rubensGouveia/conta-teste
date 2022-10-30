import { prisma } from "../db/client";
export async function clean() {
  await prisma.produto.deleteMany();
  await prisma.produtoQuantidade.deleteMany();
  await prisma.valor.deleteMany();
  await prisma.compra.deleteMany();
}