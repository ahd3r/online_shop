class ErrorController{
  showErrorShop(req,res,next){
    res.send({error:'404 (Shop)'});
  }
  showErrorAdmin(req,res,next){
    res.send({error:'404 (Admin)'});
  }
};

module.exports=new ErrorController;
