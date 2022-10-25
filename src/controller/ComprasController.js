const axios = require('axios');
const jsdom = require('jsdom')
const { JSDOM } = jsdom;
const store = async (req, res) => {
    const {query :{token},params:{id}} = req  
    
   return await axios.get(`https://ww1.receita.fazenda.df.gov.br/DecVisualizador/Visualiza/${id}?token=${token}`)
   .then(
    response => {   
      const {window}= new JSDOM(`${response.data}`);
      const nl = window.document.body.querySelectorAll('li')
      var arr = [];

      for(var i = nl.length; i--; arr.unshift(nl[i]));
      const arrayStrings = arr.map(a => a.textContent.split(/[\s]{4}/g).filter(value =>value))
      const splited = arrayStrings.map(a => {  
        if(a[8]){
         return {
         codigo:a[1].replace(/[\D]/g,''),
        nome: a[0].split('-')[0].trim(), 
        quantidade:Number(a[4]),
        unidadeMedida: a[6].trim(),
        valorUnitario:  Number(a[8].replace(',','.'))
      }
    }
  })
  console.log(splited[0])
        return res.json({ok:true})
    }
  )
  .catch(
    error => res.json(error)
  );



  }
  
  exports.store = store;