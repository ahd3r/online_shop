const actionWithBD = require('../models/product_dml');

class ProductController{
  getProducts(req,res,next){
    actionWithBD.takeProducts().then(data=>{
      res.send(data[0]);
    }).catch(err=>{
      console.log(err);
      res.send({error:'Error in get data from mysql'});
    });
  }
  getProduct(req,res,next){
    actionWithBD.takeProduct(parseInt(req.params.id)).then(data=>{
      res.send(data[0]);
    }).catch(err=>{
      console.log(err);
      res.send({error:"Error in get data from mysql"});
    });
  }
  postProduct(req,res,next){
    actionWithBD.addProduct(req.body);
    actionWithBD.takeProducts().then(data=>{
      res.send(data[0]);
    }).catch(err=>{
      console.log(err);
      res.send({error:'Error in get data from mysql'});
    });
  }
  deleteProduct(req,res,next){
    actionWithBD.deleteProduct(req.params.id);
    actionWithBD.takeProducts().then(data=>{
      res.send(data[0]);
    }).catch(err=>{
      console.log(err);
      res.send({error:'Error in get data from mysql'});
    });
  }
  editProduct(req,res,next){
    actionWithBD.editProduct(req.body);
    actionWithBD.takeProducts().then(data=>{
      res.send(data[0]);
    }).catch(err=>{
      console.log(err);
      res.send({error:'Error in get data from mysql'});
    });
  }
  buyProduct(req,res,next){
    actionWithBD.buyProduct(req.params.id);
    actionWithBD.takeProducts().then(data=>{
      res.send(data[0]);
    }).catch(err=>{
      console.log(err);
      res.send({error:'Error in get data from mysql'});
    });
  }
};

module.exports = new ProductController;
