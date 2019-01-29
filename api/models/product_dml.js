const db = require('../utils/database');

class ProductDMLModule{
  takeProducts(){
    return db.execute('SELECT * FROM products');
  }
  takeProduct(id){
    return db.execute(`SELECT * FROM products WHERE id_product=${id}`);
  }
  addProduct(data){
    return db.execute(`INSERT products(product_name,product_price,product_image,product_description,amount,exist) VALUES ('${data.product_name}','${data.product_price}','${data.product_image}','${data.product_description}','${data.amount}','${data.exist}')`);
  }
  editProduct(data){
    return db.execute(`UPDATE products SET product_name = '${data.product_name}',product_price=${data.product_price},product_image='${data.product_image}',product_description='${data.product_description}',amount=${data.amount},exist=${data.exist} WHERE id_product=${data.id_product}`);
  }
  deleteProduct(id){
    return db.execute(`DELETE FROM products WHERE id_product=${id}`);
  }
  buyProduct(id){
    return db.execute(`CALL buy_prod(${id})`);
  }
}

module.exports=new ProductDMLModule;
