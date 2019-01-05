const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const routers = express();

routers.use(bodyParser.json());

routers.get('/',(req,res,next)=>{
  fs.readFile(path.join(__dirname,'../data.json'),function(err,data){
    if(!err){
      const allData = JSON.parse(data);
      const products = allData.products;
      res.send(products);
    } else {
      res.send({error:"Error in reading data"});
    }
  });
});
routers.get('/:id',(req,res,next)=>{
  fs.readFile(path.join(__dirname,'../data.json'),function(err,data){
    if(!err){
      const allData = JSON.parse(data);
      const products = allData.products;
      let done = false;
      products.forEach((product,i)=>{
        if(product.id===parseInt(req.params.id)){
          done = true;
          res.send(product);
        }
      });
      if(!done){
        res.send({error:'Wrong id'});
      }
    } else {
      res.send({error:"Error in reading data"});
    }
  });
});
routers.post('/add',function(req,res){
  const infoOfNewProduct = req.body;
  if(infoOfNewProduct.call && typeof(infoOfNewProduct.price)==='number' && infoOfNewProduct.image && infoOfNewProduct.description && typeof(infoOfNewProduct.amount)==='number'){
    if(infoOfNewProduct.amount===0){
      infoOfNewProduct.exist = false;
    }else if(infoOfNewProduct.amount>0){
      infoOfNewProduct.exist = true;
    }else{
      return res.send({error:'Wrong amount'});
    }
    if(infoOfNewProduct.price===0){
      infoOfNewProduct.price='Free'
    }else if(infoOfNewProduct.price<0){
      return res.send({error:'Wrong price'});
    }
    fs.readFile(path.join(__dirname,'../data.json'),function(err,data){
      if(!err){
        const allData = JSON.parse(data);
        const products = allData.products;
        if(products.length===0){
          const newProduct = {id:1,call:infoOfNewProduct.call,price:infoOfNewProduct.price,image:infoOfNewProduct.image,description:infoOfNewProduct.description,exist:infoOfNewProduct.exist,amount:infoOfNewProduct.amount};
          const resProducts = products.concat(newProduct);
          allData.products=resProducts;
        }else{
          const lastInProducts = products[products.length-1];
          const idLastProduct=lastInProducts.id;
          const newProduct = {id:idLastProduct+1,call:infoOfNewProduct.call,price:infoOfNewProduct.price,image:infoOfNewProduct.image,description:infoOfNewProduct.description,exist:infoOfNewProduct.exist,amount:infoOfNewProduct.amount};
          const resProducts = products.concat(newProduct);
          allData.products=resProducts;
        }
        fs.writeFile(path.join(__dirname,'../data.json'),JSON.stringify(allData),(err)=>{
          if(!err){
            res.send(allData.products);
          }else{
            res.send({error:"Error in writing file"});
          }
        });
      } else {
        res.send({error:"Error in reading file"});
      }
    });
  }else{
    res.send({error:'Wrong data'});
  }
});
routers.put('/edit/:id',function(req,res){
  const infoOfEdit = req.body;
  if(typeof(infoOfEdit.id)==='string'){
    res.send({error:'Id is a string'});
  }else if(typeof(infoOfEdit.id)==='number' && infoOfEdit.call && typeof(infoOfEdit.price)==='number' && infoOfEdit.image && infoOfEdit.description && typeof(infoOfEdit.amount)==='number'){
    if(infoOfEdit.amount===0){
      infoOfEdit.exist = false;
    }else if(infoOfEdit.amount > 0){
      infoOfEdit.exist = true;
    }else{
      return res.send({error:'Wrong amount'});
    }
    if(infoOfEdit.price===0){
      infoOfEdit.price='Free';
    } else if(infoOfEdit.price<0){
      return res.send({error:'Wrong price'});
    }
    fs.readFile(path.join(__dirname,'../data.json'),(err,data)=>{
      if(!err){
        const db = JSON.parse(data);
        const products = db.products;
        let done = false;
        products.forEach((product,i)=>{
          if(product.id===infoOfEdit.id){
            products[i]=infoOfEdit;
            db.products=products;
            done = true;
            fs.writeFile(path.join(__dirname,'../data.json'),JSON.stringify(db),(err)=>{
              if(!err){
                res.send(db.products);
              } else {
                res.send({error:"Error in writing file"});
              }
            });
          }
        });
        if(!done){
          res.send({error:'Wrong id'});
        }
      } else {
        res.send({error:"Error in reading file"});
      }
    });
  } else {
    res.send({error:'Wrong data'});
  }
});
routers.delete('/delete/:id',(req,res)=>{
  fs.readFile(path.join(__dirname,'../data.json'),(err,data)=>{
    if(!err){
      const allData=JSON.parse(data);
      const products = allData.products;
      let done = false;
      products.forEach((product,i)=>{
        if(product.id===parseInt(req.params.id)){
          products.splice(i,1);
          allData.products = products;
          done = true;
          fs.writeFile(path.join(__dirname,'../data.json'),JSON.stringify(allData),(err)=>{
            if(!err){
              res.send(allData.products);
            } else {
              res.send({error:"Error in writing file"});
            }
          });
        }
      });
      if(!done){
        res.send({error:'Wrong id'});
      }
    } else {
      res.send({error:"Error in reading file"});
    }
  });
});
routers.use((req,res,next)=>{
  res.send({error:'404 (Admin)'});
});

module.exports = routers;
