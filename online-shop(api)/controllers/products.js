const actionWithBD = require('../moduls/product');

class ProductController{
  getProducts(req,res,next){
    actionWithBD.takeProducts().then(data=>{
      res.send(data);
    }).catch(err=>{
      console.log(err);
      res.send({error:"Error in reading data"});
    });
  }
  getProduct(req,res,next){
    actionWithBD.takeProducts().then(data=>{
      let done = false;
      const productId = parseInt(req.params.id);
      data.forEach((product,index)=>{
        if(product.id === productId){
          done = true;
          res.send(product);
        }
      });
      if(!done){
        res.send({error:'Wrong id'});
      }
    }).catch(err=>{
      console.log(err);
      res.send({error:"Error in reading data"});
    });
  }
  postProduct(req,res,next){
    const newProduct = req.body;
    if(newProduct.call && typeof(newProduct.price)==='number' && newProduct.image && newProduct.description && typeof(newProduct.amount)==='number'){
      if(newProduct.amount===0){
        newProduct.exist = false;
      }else if(newProduct.amount>0){
        newProduct.exist = true;
      }else{
        return res.send({error:'Wrong amount'});
      }
      if(newProduct.price===0){
        newProduct.price='Free'
      }else if(newProduct.price<0){
        return res.send({error:'Wrong price'});
      }
      actionWithBD.takeProducts().then(data=>{
        if(data.length===0){
          const newProductRes = {id:1,call:newProduct.call,price:newProduct.price,image:newProduct.image,description:newProduct.description,exist:newProduct.exist,amount:newProduct.amount};
          actionWithBD.addProduct(newProductRes).then(data=>{
            res.send(data);
          }).catch(err=>{
            console.log(err);
            res.send({error:"Error in writing data"});
          });
        }else{
          const lastInProducts = data[data.length-1];
          const idLastProduct=lastInProducts.id;
          const newProductRes = {id:idLastProduct+1,call:newProduct.call,price:newProduct.price,image:newProduct.image,description:newProduct.description,exist:newProduct.exist,amount:newProduct.amount};
          actionWithBD.addProduct(newProductRes).then(data=>{
            res.send(data);
          }).catch(err=>{
            console.log(err);
            res.send({error:"Error in writing data"});
          });
        }
      }).catch(err=>{
        console.log(err);
        res.send({error:"Error in reading data"});
      });
    }else{
      res.send({error:'Wrong data'});
    }
  }
  deleteProduct(req,res,next){
    const productId=parseInt(req.params.id);
    actionWithBD.takeProducts().then(data=>{
      let done = false;
      data.forEach((product,index)=>{
        if(product.id===productId){
          done=true;
          data.splice(index,1);
          actionWithBD.writeProducts(data).then(data=>{
            res.send(data);
          }).catch(err=>{
            console.log(err);
            res.send({error:"Error in writing file"});
          });
        }
      });
      if(!done){
        res.send({error:'Wrong id'});
      }
    }).catch(err=>{
      console.log(err);
      res.send({error:"Error in reading file"});
    })
  }
  editProduct(req,res,next){
    const infoOfEdit = req.body;
    if(typeof(infoOfEdit.id)==='number' && infoOfEdit.call && typeof(infoOfEdit.price)==='number' && infoOfEdit.image && infoOfEdit.description && typeof(infoOfEdit.amount)==='number'){
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
      actionWithBD.takeProducts().then(data=>{
        let done = false;
        data.forEach((product,index)=>{
          if(product.id===infoOfEdit.id){
            done = true;
            data[index]=infoOfEdit;
            actionWithBD.writeProducts(data).then(data=>{
              res.send(data);
            }).catch(err=>{
              console.log(err);
              res.send({error:"Error in writing data"});
            });
          }
        });
        if(!done){
          res.send({error:'Wrong id'});
        }
      }).catch(err=>{
        console.log(err);
        res.send({error:"Error in reading file"});
      });
    }else{
      res.send({error:'Wrong data'});
    }
  }
  buyProduct(req,res,next){
    actionWithBD.takeProducts().then(data=>{
      let done = false;
      const productId=parseInt(req.params.id);
      data.forEach((product,index)=>{
        if(product.id===productId){
          done = true;
          if(product.amount===1){
            product.amount--;
            product.exist = false;
          } else if(product.amount===0){
            return res.send({error:'Wait'});
          } else {
            product.amount--;
          }
        }
      });
      if(done){
        actionWithBD.writeProducts(data).then(data=>{
          res.send(data);
        }).catch(err=>{
          console.log(err);
          res.send({error:"Error in writing data"});
        });
      }else{
        res.send({error:'Wrong id'});
      }
    }).catch(err=>{
      console.log(err);
      res.send({error:"Error in reading data"});
    });
  }
};

module.exports = new ProductController;
