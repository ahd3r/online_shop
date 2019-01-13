const express = require('express');
const bodyParser = require('body-parser');
const err = require('../controllers/error');
const controllers = require('../controllers/products');

const routers = express();

routers.use(bodyParser.json());

routers.get('/',controllers.getProducts);
routers.get('/:id',controllers.getProduct);
routers.post('/add',controllers.postProduct);
routers.put('/edit/:id',controllers.editProduct);
routers.delete('/delete/:id',controllers.deleteProduct);

routers.use(err.showErrorAdmin);

module.exports = routers;
