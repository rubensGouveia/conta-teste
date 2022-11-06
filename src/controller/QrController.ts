import axios from 'axios';
import { Request, Response } from 'express';
import jsdom from 'jsdom'
import { IProduto } from '../@types/ICompra';
const { JSDOM } = jsdom;

function formatData(data) {
  const { window } = new JSDOM(`${data}`);
  const nl = window.document.body.querySelectorAll('li')
  const estabelecimento = window.document.body.querySelector('#heading1 .col').textContent
  const endereco = window.document.body.querySelector('#heading1 div:nth-of-type(3)').textContent?.replace(/\s{2}/g, '')
  const regx = /([\d]{2}\/[\d]{2}\/[\d]{4}\s[\d]{2}:[\d]{2}:[\d]{2})/
  const dataHora = window.document.body.querySelector('#collapse6 ul li div:nth-of-type(2) div p').textContent?.match(regx)[0].replace(/(?:([\d]{2})\/([\d]{2})\/([\d]{4})\s([\d]{2}:[\d]{2}:[\d]{2}))/,"$3-$2-$1 $4")

  const created_at = new Date(dataHora)

  const arr = [] as HTMLLIElement[];

  for (let i = nl.length; i--; arr.unshift(nl[i]));
  const arrayStrings = arr.map(a => a.textContent?.split(/[\s]{4}/g).filter(value => value))
  const prods = arrayStrings.map(a => {
    if (a && a[8]) {
      return {
        codigo: a[1].replace(/[\D]/g, ''),
        nome: a[0].split('-')[0].trim(),
        quantidade: Number(a[4]),
        unidadeMedida: a[6].trim(),
        valorUnitario: Number(a[8].replace(',', '.'))
      }
    }
  }).filter(v => v)

  const grouped: IProduto[] = prods.sort().reduce((init, current) => {
    const existIndex = init?.findIndex(item => item.nome === current.nome)
    if (existIndex >= 0) {
      init[existIndex].quantidade = init[existIndex].quantidade + current.quantidade
      return init
    }
    else {
      return [...init, current]
    }
  }, [])

  const produtos = grouped.map(g => ({ ...g, valorTotal: g.quantidade * g.valorUnitario }))

  const valorCompra = produtos.reduce((init, current) => {
    return init + current.valorTotal
  }, 0)

  return { estabelecimento, created_at, endereco, produtos, valorCompra }
}

const store = async (req: Request, res: Response) => {
  const { params: { url } } = req
  return await axios.get(`http://www.fazenda.df.gov.br/nfce/qrcode?p=${url}`)
    .then(
      response => {
        const { estabelecimento, produtos, valorCompra ,created_at,endereco } = formatData(response.data)
        const compra = { estabelecimento, endereco ,created_at,produtos, valorCompra}


        return res.json(compra)
      }
    )
    .catch(
      error => res.json(error)
    );
}

const pup = async (req: Request, res: Response) => {
  const { params: { url }, query: { token } } = req

  return await axios.get(`https://ww1.receita.fazenda.df.gov.br/DecVisualizador/Visualiza/${url}?token=${token}`)
    .then(
      response => {
        const { estabelecimento, produtos, valorCompra ,created_at,endereco } = formatData(response.data)
        const compra = { estabelecimento, endereco ,created_at,produtos, valorCompra}


        return res.json(compra)
      }
    )
    .catch(
      error => res.json(error)
    );
}
export default { store, pup };