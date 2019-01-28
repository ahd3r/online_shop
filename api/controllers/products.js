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
      res.send({error:"Error in get one data from mysql"});
    });
  }
  postProduct(req,res,next){
    actionWithBD.addProduct(req.body).then(data=>{
      actionWithBD.takeProducts().then(data=>{
        res.send(data[0]);
      }).catch(err=>{
        console.log(err);
        res.send({error:"Error in get data from mysql"});
      });
    }).catch(err=>{
      console.log(err);
      res.send({error:"Error in add data from mysql"});
    });
  }
  deleteProduct(req,res,next){
    actionWithBD.deleteProduct(parseInt(req.params.id)).then(data=>{
      actionWithBD.takeProducts().then(data=>{
        res.send(data[0]);
      }).catch(err=>{
        console.log(err);
        res.send({error:"Error in get data from mysql"});
      });
    }).catch(err=>{
      console.log(err);
      res.send({error:"Error in delete data from mysql"});
    });
  }
  editProduct(req,res,next){
    actionWithBD.editProduct(req.body).then(data=>{
      actionWithBD.takeProducts().then(data=>{
        res.send(data[0]);
      }).catch(err=>{
        console.log(err);
        res.send({error:"Error in get data from mysql"});
      });
    }).catch(err=>{
      console.log(err);
      res.send({error:"Error in edit data from mysql"});
    });
  }
  buyProduct(req,res,next){
    actionWithBD.buyProduct(parseInt(req.params.id)).then(data=>{
      actionWithBD.takeProducts().then(data=>{
        res.send(data[0]);
      }).catch(err=>{
        console.log(err);
        res.send({error:"Error in get data from mysql"});
      });
    }).catch(err=>{
      console.log(err);
      res.send({error:"Error in (patch) data from mysql"});
    });
  }
};

module.exports = new ProductController;
