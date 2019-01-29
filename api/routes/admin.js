const express = require('express');
const bodyParser = require('body-parser');
const err = require('../controllers/error');
const controllers = require('../controllers/products');
const valid = require('../utils/validation');

const routers = express();

routers.use(bodyParser.json());

routers.get('/',controllers.getProducts);
routers.get('/:id',valid.checkId);
routers.get('/:id',controllers.getProduct);
routers.post('/add',valid.checkData);
routers.post('/add',controllers.postProduct);
routers.put('/edit/:id',valid.checkId);
routers.put('/edit/:id',valid.checkData);
routers.put('/edit/:id',controllers.putProduct);
routers.delete('/delete/:id',valid.checkId);
routers.delete('/delete/:id',controllers.deleteProduct);

routers.use(err.showErrorAdmin);

module.exports = routers;
