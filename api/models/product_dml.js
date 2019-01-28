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
    return db.execute(`UPDATE products SET product_name='${data.product_name}' AND product_price='${data.product_price}' AND product_image='${data.product_image}' AND product_description='${data.product_description}' AND amount='${data.amount}' AND exist='${data.exist}' WHERE id_product=${data.id_product}`);
  }
  deleteProduct(id){
    return db.execute(`DELETE FROM products WHERE id_product=${id}`);
  }
  buyProduct(id){
    db.execute(`SELECT amount FROM products WHERE id_product=${id}`).then(data=>{
      let curAmount = data[0][0].amount;
      curAmount--;
      db.execute(`UPDATE products SET amount = ${curAmount} WHERE id_product=${id}`);
    }).catch(err=>{
      console.log(err);
    });
  }
}

module.exports=new ProductDMLModule;
