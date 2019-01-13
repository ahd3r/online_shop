const fs = require('fs');
const path = require('path');

class ProductModule{
  async takeProducts(){
    const data = await fs.readFileSync(path.join(__dirname,'../data/products.json'));
    const resdata = JSON.parse(data);
    return resdata;
  }
  async addProduct(data){
    const dataFromBase = await fs.readFileSync(path.join(__dirname,'../data/products.json'));
    const resdata = JSON.parse(dataFromBase);
    resdata.push(data);
    await fs.writeFileSync(path.join(__dirname,'../data/products.json'),JSON.stringify(resdata))
    return resdata;
  }
  async writeProducts(data){
    await fs.writeFileSync(path.join(__dirname,'../data/products.json'),JSON.stringify(data))
    return data;
  }
}

module.exports=new ProductModule;
