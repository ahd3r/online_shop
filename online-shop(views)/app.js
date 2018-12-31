const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './dist')));
app.use(bodyParser.urlencoded());

app.get('/',(req,res,next)=>{
  res.sendFile(path.join(__dirname, './views/index.html'));
});

app.use((req,res,next)=>{
  res.send('404');
});

app.listen(4000,()=>{console.log('Runing front...')});
