const axios = require('axios');
const jsdom = require('jsdom')
const { JSDOM } = jsdom;
const store = async (req, res) => {
    
   return await axios.get('https://ww1.receita.fazenda.df.gov.br/DecVisualizador/Visualiza/53221007738069000409650690001157581163650897?token=4d53bce03ec34c0a911182d4c228ee6c:AjJXYx/b5gZhtGcNBGE26bvD8OG2y2Dc17vBtB7KFmU=:702034d4961548a6b4ca84273051317f:1666603277')
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
      // .map(a =>a.split(/\[\s]{4}/)).filter(v=>v !== '')
      
      console.log(splited)
        return res.json({ok:true})
    }
  )
  .catch(
    error => res.json(error)
  );



  }
  
  exports.store = store;