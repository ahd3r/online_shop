const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const routers = express();

routers.use(bodyParser.urlencoded());

routers.get('/',(req,res,next)=>{
  fs.readFile(path.join(__dirname,'../data.json'),function(err,data){
    if(!err){
      const allData = JSON.parse(data);
      const products = allData.products;
      res.send(products);
    }
  });
});
routers.get('/:id',(req,res,next)=>{
  fs.readFile(path.join(__dirname,'../data.json'),function(err,data){
    if(!err){
      const allData = JSON.parse(data);
      const products = allData.products;
      let result;
      products.forEach((product,index)=>{
        if(product.id===parseInt(req.params.id)){
          result=products[index];
        }
      });
      if(result){
        res.send(result);
      } else {
        res.send('404');
      }
    }
  });
});
routers.use((req,res,next)=>{
  res.send('404 (Shop)');
});

module.exports=routers;
