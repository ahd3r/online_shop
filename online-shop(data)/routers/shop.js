const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const routers = express();

routers.use(bodyParser.urlencoded());
routers.use(bodyParser.json());

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
      let done = false;
      products.forEach((product,index)=>{
        if(product.id===parseInt(req.params.id)){
          done=true;
          res.send(product);
        }
      });
      if(!done){
        res.send({error:'Wrong id'});
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
          if(product.amount===1){
            product.amount--;
            product.exist = false;
          } else if(product.amount===0){
            return res.send({error:'Wait'});
          } else {
            product.amount--;
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
        res.send({error:'Wrong id'});
      }
    }
  });
});
routers.use((req,res,next)=>{
  res.send({error:'404 (Shop)'});
});

module.exports=routers;
