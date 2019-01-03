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
      res.send(JSON.stringify(products));
    }
  });
});
routers.get('/:id',(req,res,next)=>{
  fs.readFile(path.join(__dirname,'../data.json'),function(err,data){
    if(!err){
      const allData = JSON.parse(data);
      const products = allData.products;
      let done = false;
      products.forEach((product,index)=>{
        if(product.id===parseInt(req.params.id)){
          done=true;
          res.send(JSON.stringify(product));
        }
      });
      if(!done){
        res.send(JSON.stringify({error:'Wrong id'}));
      }
    }
  });
});
routers.patch('/buy/:id',(req,res,next)=>{
  fs.readFile(path.join(__dirname,'../data.json'),(err,data)=>{
    if(!err){
      const db=JSON.parse(data);
      const products=db.products;
      let done = false;
      products.forEach((product,i)=>{
        if(product.id===parseInt(req.params.id)){
          done = true;
          if(products[i].amount===1){
            products[i].amount--;
            products[i].exist = false;
          } else if(products[i].amount===0){
            return res.send(JSON.stringify({error:'Wait'}));
          }else {
            products[i].amount--;
          }
          db.products=products;
          fs.writeFile(path.join(__dirname,'../data.json'),JSON.stringify(db),(err)=>{
            if(!err){
              res.send(db.products);
            }
          })
        }
      });
      if(!done){
        res.send(JSON.stringify({error:'Wrong id'}));
      }
    }
  });
});
routers.use((req,res,next)=>{
  res.send(JSON.stringify({error:'404 (Shop)'}));
});

module.exports=routers;
