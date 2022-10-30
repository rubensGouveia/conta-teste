import { ICompra } from "./@types/ICompra";
import { prisma } from "./db/client";
import { clean } from "./helpers.ts/clean";
import  {olha }from './mock'
/*
 * one-to-one
 * A user has one profile, a profile belongs to one user
 */


export async function CreateCompra(newCompra:ICompra) {
  const newProdutos = newCompra.produtos.map(produto =>( {
    quantidade: produto.quantidade,            
    produto:{
       connectOrCreate:{
        where:{
          nome:produto.nome
              },
        create:{
          nome:produto.nome ,
          unidade_medida:produto.unidadeMedida                 
              }                     
                        }                 
                      }
                  }       ))


   const newValores =    newCompra.produtos.map(produto =>( {    
      estabelecimento:newCompra.estabelecimento,
      valor: produto.valorUnitario,
      produto_nome:produto.nome
  }  ))       
  
  

 const createTransaction = await prisma.$transaction([
  prisma.compra.create({
    data: {
      estabelecimento: newCompra.estabelecimento,
      produtos:{create:[...newProdutos] }          
    },
    include: {
      produtos:{
        select:{
          quantidade: true,
          produto:{
            select:{
              nome:true,
              unidade_medida:true,
              valor:true
            }
          }
        },
      }
    },
  }),
  prisma.valor.createMany({
    data:[
    ...newValores
    ]
  })

 ])
       return  createTransaction ;
} 

CreateCompra(olha).then(res=> console.log(res))