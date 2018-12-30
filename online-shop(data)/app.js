const express = require('express');
const bodyParser = require('body-parser');

const shopRouters = require('./routers/shop');
const shopAdmin = require('./routers/admin');

const app = express();

app.use(bodyParser.urlencoded());

app.use('/admin',shopAdmin);
app.use(shopRouters);

app.listen(3000,()=>{console.log('Runing')});
