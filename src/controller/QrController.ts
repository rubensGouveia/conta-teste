import axios from 'axios';
import { Request, Response } from 'express';
import jsdom from 'jsdom'
import { IProduto } from '../@types/ICompra';
import { CreateCompra } from '../criar-compra';
const { JSDOM } = jsdom;
function formatData(data){
  const { window } = new JSDOM(`${data}`);
        const nl = window.document.body.querySelectorAll('li')
        const estabelecimento = window.document.body.querySelector('#heading1 .col').textContent
       
        const arr = [] as HTMLLIElement[];

        for (let i = nl.length; i--; arr.unshift(nl[i]));
        const arrayStrings = arr.map(a => a.textContent?.split(/[\s]{4}/g).filter(value => value))
        const produtos = arrayStrings.map(a => {
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

        const splited: IProduto[] = produtos.sort().reduce((init, current,index) => {
          const existIndex = init?.findIndex(item => item.nome === current.nome)
        

            if(existIndex >= 0){
              init[existIndex].quantidade =  init[existIndex].quantidade + current.quantidade
              return init
            }
           else{

           return[...init, current]
      
           }
          
      }, [])

     
        return {estabelecimento, splited}
}

const store = async (req: Request, res: Response) => {
  const { params: { url } } = req
  return await axios.get(`http://www.fazenda.df.gov.br/nfce/qrcode?p=${url}`)
    .then(
      response => {
        const {estabelecimento,splited} = formatData(response.data)
        const compra = { estabelecimento, produtos: splited}
        

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
        const {estabelecimento,splited} = formatData(response.data)
        const compra = { estabelecimento, produtos: splited}
        
        return res.json(compra)
      }
    )
    .catch(
      error => res.json(error)
    );
}
export default { store, pup };