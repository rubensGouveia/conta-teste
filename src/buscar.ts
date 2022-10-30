import { prisma } from "./db/client";


async function createUserWithProfile() {

  const filter = await prisma.compra.findFirst({

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
  });
  
 console.log(filter.produtos[0].produto.valor)
} 


createUserWithProfile()