import { prisma } from "./db/client";

export class GetCompras {
  async execute(month = -1) {  
    const today = new Date() 
    today.setMonth(today.getMonth() + month )
      const tomorrow = new Date() 
      tomorrow.setMonth(tomorrow.getMonth() + month + 1)
      tomorrow.setDate(0)               
    function dateToFilter(type: "lte"| "gte"){    
      if (type === 'gte'){
         return new Date(today.toISOString().substring(0,7) +'-01' +'T00:00:00.000Z')
      }
      if (type === 'lte'){           
        return new Date(tomorrow.toISOString().split('T')[0] +'T23:59:59.000Z')
      }
    }  
    const result = await prisma.compra.findMany({
      where: {
       created_at:{
          gte: dateToFilter("gte"),
          lte:dateToFilter("lte"),
       }
      },
      include: {
        produtos: {
          select: {
            quantidade: true,
            produto: {
              select: {
                nome: true,
                unidade_medida: true,
                valor: {
                  select: {
                    created_at: true,
                    estabelecimento: true,
                    valor: true

                  }
                }
              },


            }
          }
        }
      }
    })
    return result

  }
}

