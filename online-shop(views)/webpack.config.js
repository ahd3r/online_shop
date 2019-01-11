const path = require('path');
const extractCSS = require('mini-css-extract-plugin');
const separatedHTML = require('html-webpack-plugin');

const fileHTML = new separatedHTML({
  template:'./src/index.html',
  minify:true
});

module.exports = {
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module:{
    rules:[
      {
        test:/\.js/,
        use:'babel-loader'
      },
      {
        test:/\.css/,
        use:[{
          loader:extractCSS.loader,
          options:{
            use:'css-loader'
          }
        }]
      }
    ]
  },
  plugins:[
    new extractCSS({
      filename:'main.css'
    }),
    fileHTML
  ]
};
