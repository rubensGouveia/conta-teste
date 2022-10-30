import axios from 'axios';
import { Request, Response } from 'express';
import jsdom from 'jsdom'
const { JSDOM } = jsdom;
const store = async (req: Request, res: Response) => {
  const { query: { token }, params: { id } } = req

  return await axios.get(`https://ww1.receita.fazenda.df.gov.br/DecVisualizador/Visualiza/${id}?token=${token}`)
    .then(
      response => {
        const { window } = new JSDOM(`${response.data}`);
        const nl = window.document.body.querySelectorAll('li')
        const arr = [] as HTMLLIElement[];

        for (let i = nl.length; i--; arr.unshift(nl[i]));
        const arrayStrings = arr.map(a => a.textContent?.split(/[\s]{4}/g).filter(value => value))
        const splited = arrayStrings.map(a => {
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
        return res.json(splited)
      }
    )
    .catch(
      error => res.json(error)
    );



}

export default { store };