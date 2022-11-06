import { Request, Response } from 'express';
import { ComprasService } from '../services/ComprasService';


const store = async (req: Request, res: Response) => {
  const { index } = req.query
  const month = index ? Number(index) :0
  const comprasService = new ComprasService()
  const result = await comprasService.find(month)
  const orcamento = await comprasService.getOrcamento()

  const valorproduto = result?.map(compra => ({
    ...compra, produtos: compra.produtos.map(
      produto => ({
        ...produto, produto: undefined, ...{
          ...produto.produto, valor: produto.produto.valor.find(
            v => v.created_at.toString() === compra.created_at.toString()).valor
        }, valorTotal: produto.produto.valor.find(v => v.created_at.toString() === compra.created_at.toString()).valor * produto.quantidade
      }))
  }))
  const compra = valorproduto.map(c => ({
    ...c, valorCompra: c.produtos.reduce((init, current) => {
      return init + current.valorTotal
    }, 0)
  }))
  return res.json({orcamento,compras:compra})
}
export default { store };