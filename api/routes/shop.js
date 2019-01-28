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
routers.patch('/buy/:id',valid.checkId);
routers.patch('/buy/:id',controllers.buyProduct);

routers.use(err.showErrorShop);

module.exports=routers;
