const express = require('express');

const shopRouters = require('./routes/shop');
const shopAdmin = require('./routes/admin');

const app = express();

// app.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080/');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/admin',shopAdmin);
app.use('/',shopRouters);

app.listen(3000,()=>{console.log('Runing api...')});
