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
routers.post('/add',function(req,res){
  const infoOfNewProduct = req.body;
  if(infoOfNewProduct){
    fs.readFile(path.join(__dirname,'../data.json'),function(err,data){
      if(!err){
        const allData = JSON.parse(data);
        const products = allData.products;
        const lastInProducts = products[products.length-1];
        const idLastProduct=lastInProducts.id;
        const newProduct = {id:idLastProduct+1,call:infoOfNewProduct.call,price:infoOfNewProduct.price,image:infoOfNewProduct.image,description:infoOfNewProduct.description,exist:infoOfNewProduct.exist,amount:infoOfNewProduct.amount};
        const resProducts = products.push(newProduct);
        const resData=allData.push(resProducts);
        fs.writeFile(path.join(__dirname,'../data.json'),JSON.stringify(resData),(err)=>{
          if(!err){
            res.send('Product added'+newProduct);
          }
        });
      }
    });
  }else{
    res.send('Wrong data');
  }
});
routers.put('/edit/:id',function(req,res){
  const infoOfEdit = req.body;
  fs.readFile(path.join(__dirname,'../data.json'),(err,data)=>{
    if(!err){
      const db = JSON.parse(data);
      const products = db.products;
      let done = false;
      products.forEach((product,index)=>{
        if(product.id=parseInt(infoOfEdit.id)){
          products[index]=infoOfEdit;
          done = true;
          res.send('Edited');
        }
      });
      if(!done){
        res.send('Wrong id');
      }
    }
  });
});
routers.delete('delete/:id',(req,res)=>{
  fs.readFile(path.join(__dirname,'../data.json'),(err,data)=>{
    if(!err){
      const allData=JSON.parse(data);
      const products = allData.products;
      let done = false;
      products.forEach((product,index)=>{
        if(product.id===parseInt(req.params.id)){
          products.splice(index,1);
          done = true;
          res.send('Deleted');
        }
      });
      if(!done){
        res.send('Wrong id');
      }
    }
  });
});
routers.use((req,res,next)=>{
  res.send('404 (Admin)');
});

module.exports = routers;
