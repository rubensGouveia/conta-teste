import { prisma } from "../db/client";
import { eachMonthOfInterval, subMonths, addMonths, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

export class ComprasService {
  private myMonth
  async find(month = 0) {  
    this.myMonth = month
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
  async getOrcamento(cmo?:number) {  
   const month = this.myMonth || cmo
   let date = new Date()
    if(month >0 ){
      date = addMonths(date, month)
    }
    if(month < 0 ){
      date = addMonths(date, month)
    }   
    const mesAno = format(date, 'MMMM Y', { locale: ptBR }).replace(/^(\w{1})/g, s => s.toUpperCase())
 
    const result = await prisma.orcamento.findFirst({
      where: {
       mesAno:{
        equals:mesAno
       }
      }
     
    })
    return result

  }
}

