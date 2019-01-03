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
      products.forEach((product,i)=>{
        if(product.id===parseInt(req.params.id)){
          done = true;
          res.send(JSON.stringify(products[i]));
        }
      });
      if(!done){
        res.send(JSON.stringify({error:'Wrong id'}));
      }
    }
  });
});
routers.post('/add',function(req,res){
  const infoOfNewProduct = JSON.parse(req.body);
  if(infoOfNewProduct.call && infoOfNewProduct.price && infoOfNewProduct.image && infoOfNewProduct.description && infoOfNewProduct.amount){
    if(infoOfNewProduct.amount===0){
      infoOfNewProduct.exist = false;
    }else if(infoOfNewProduct.amount>0){
      infoOfNewProduct.exist = true;
    }else{
      return res.send(JSON.stringify({error:'Wrong amount'}));
    }
    fs.readFile(path.join(__dirname,'../data.json'),function(err,data){
      if(!err){
        const allData = JSON.parse(data);
        const products = allData.products;
        if(products.length===0){
          const newProduct = {id:1,call:infoOfNewProduct.call,price:infoOfNewProduct.price,image:infoOfNewProduct.image,description:infoOfNewProduct.description,exist:infoOfNewProduct.exist,amount:infoOfNewProduct.amount};
          const resProducts = products.push(newProduct);
          allData.products=resProducts;
        }else{
          const lastInProducts = products[products.length-1];
          const idLastProduct=lastInProducts.id;
          const newProduct = {id:idLastProduct+1,call:infoOfNewProduct.call,price:infoOfNewProduct.price,image:infoOfNewProduct.image,description:infoOfNewProduct.description,exist:infoOfNewProduct.exist,amount:infoOfNewProduct.amount};
          const resProducts = products.push(newProduct);
          allData.products=resProducts;
        }
        fs.writeFile(path.join(__dirname,'../data.json'),JSON.stringify(allData),(err)=>{
          if(!err){
            res.send(JSON.stringify(allData.products));
          }
        });
      }
    });
  }else{
    res.send(JSON.stringify({error:'Wrong data'}));
  }
});
routers.put('/edit/:id',function(req,res){
  const infoOfEdit = JSON.parse(req.body);
  if(infoOfEdit.id && infoOfEdit.call && infoOfEdit.price && infoOfEdit.image && infoOfEdit.description && infoOfEdit.amount){
    if(infoOfEdit.amount===0){
      infoOfEdit.exist = false;
    }else if(infoOfEdit.amount > 0){
      infoOfEdit.exist = true;
    }else{
      return res.send(JSON.stringify({error:'Wrong amount'}));
    }
    fs.readFile(path.join(__dirname,'../data.json'),(err,data)=>{
      if(!err){
        const db = JSON.parse(data);
        const products = db.products;
        let done = false;
        products.forEach((product,i)=>{
          if(product.id=parseInt(infoOfEdit.id)){
            products[i]=infoOfEdit;
            db.products=products;
            done = true;
            fs.writeFile(path.join(__dirname,'../data.json'),JSON.stringify(db),(err)=>{
              if(!err){
                res.send(JSON.stringify(db.products));
              }
            });
          }
        });
        if(!done){
          res.send(JSON.stringify({error:'Wrong id'}));
        }
      }
    });
  } else {
    res.send(JSON.stringify({error:'Wrong data'}));
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
              res.send(JSON.stringify(db.products));
            }
          });
        }
      });
      if(!done){
        res.send(JSON.stringify({error:'Wrong id'}));
      }
    }
  });
});
routers.use((req,res,next)=>{
  res.send(JSON.stringify({error:'404 (Admin)'}));
});

module.exports = routers;
