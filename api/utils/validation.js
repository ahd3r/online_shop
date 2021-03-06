const actionWithBD = require('../models/product_dml');

class Validation{
  checkId(req,res,next){
    const pastId=parseInt(req.params.id);
    let done = false;
    actionWithBD.takeProducts().then(data=>{
      data[0].forEach((eachData,index)=>{
        if(parseInt(eachData.id_product)===pastId){
          done = true;
        }
      });
      if(done){
        next();
      }else{
        res.send({error:'Wrong id'});
      }
    }).catch(err=>{console.log(err)});
  }
  checkData(req,res,next){
    const newProduct = req.body;
    /*for adding*/ if(!newProduct.id_product && newProduct.product_name && typeof(parseFloat(newProduct.product_price))==='number' && newProduct.product_description && typeof(newProduct.amount)==='number'){
      if(newProduct.amount===0){
        newProduct.exist = 0;
      }else if(newProduct.amount>0){
        newProduct.exist = 1;
      }else{
        res.send({error:'Wrong amount'});
      }
      if(newProduct.price<0){
        res.send({error:'Wrong price'});
      }
      if(!newProduct.product_image || !/^http[s]:\/\//.test(newProduct.product_image) || newProduct.product_image===''){
        newProduct.product_image='https://www.sylff.org/wp-content/uploads/2016/04/noImage.jpg';
      }
      next();
    } /* for eding*/ else if(typeof(newProduct.id_product)==='number' && newProduct.product_name && typeof(parseFloat(newProduct.product_price))==='number' && newProduct.product_description && typeof(newProduct.amount)==='number'){
      if(newProduct.amount===0){
        newProduct.exist = 0;
      }else if(newProduct.amount>0){
        newProduct.exist = 1;
      }else{
        res.send({error:'Wrong amount'});
      }
      if(newProduct.price<0){
        res.send({error:'Wrong price'});
      }
      if(!newProduct.product_image || !/^htt(p|ps):\/\//.test(newProduct.product_image) || newProduct.product_image===''){
        newProduct.product_image='https://www.sylff.org/wp-content/uploads/2016/04/noImage.jpg';
      }
      if(parseInt(req.params.id)!==newProduct.id_product){
        res.send({error:'Id is not mutch! (url and in new prod)'});
      }
      next();
    } else {
      res.send({error:'Wrong data'});
    }
  }
}

module.exports=new Validation;
