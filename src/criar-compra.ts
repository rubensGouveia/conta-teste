import { ICompra } from "./@types/ICompra";
import { prisma } from "./db/client";
import { clean } from "./helpers.ts/clean";
import { olha } from './mock'
/*
 * one-to-one
 * A user has one profile, a profile belongs to one user
 */


export async function CreateOrcameto() { 
  const createTransaction = await prisma.$transaction([
    prisma.orcamento.create({
      data: {
        mesAno:'Outubro 2022',
        valor: 2000
        
      },
   
    })  
  ])
  return createTransaction;
}


export async function CreateCompra(newCompra: ICompra) {
  const newProdutos = newCompra.produtos.map(produto => ({
    quantidade: produto.quantidade,
    produto: {
      connectOrCreate: {
        where: {
          nome: produto.nome
        },
        create: {
          nome: produto.nome,
          unidade_medida: produto.unidadeMedida
        }
      }
    }
  }))


  const newValores = newCompra.produtos.map(produto => ({
    estabelecimento: newCompra.estabelecimento,
    valor: produto.valorUnitario,
    produto_nome: produto.nome,
    created_at: newCompra.created_at
  }))



  const createTransaction = await prisma.$transaction([
    prisma.compra.create({
      data: {
        created_at: newCompra.created_at,
        estabelecimento: newCompra.estabelecimento,
        endereco: newCompra.endereco,
        produtos: { create: [...newProdutos] }
      },
      include: {
        produtos: {
          select: {
            quantidade: true,
            produto: {
              select: {
                nome: true,
                unidade_medida: true,
                valor: true
              }
            }
          },
        }
      },
    }),
    prisma.valor.createMany({
      data: [
        ...newValores
      ]
    })

  ])
  return createTransaction;
}

// clean()
CreateCompra(olha).then(res => console.log(res))
// CreateOrcameto().then(res => console.log(res))