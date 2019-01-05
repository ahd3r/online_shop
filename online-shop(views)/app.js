const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, './dist')));
app.use(bodyParser.json());

app.use('/',(req,res,next)=>{
  res.sendFile(path.join(__dirname, './views/index.html'));
});

app.listen(4000,()=>{console.log('Runing front...')});
