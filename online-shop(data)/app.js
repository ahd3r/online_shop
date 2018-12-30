const express = require('express');
const bodyParser = require('body-parser');

const shopRouters = require('./roters/shop');
const shopAdmin = require('./roters/admin');

const app = express();

app.use(bodyParser.urlencoded());

app.use(shopRouters);
app.use('admin',shopAdmin);

app.listen(3000,'http://127.0.0.1/',()=>{console.log('Runing')});
