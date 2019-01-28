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
  mode: 'production',
  module:{
    rules:[
      {
        test:/\.js/,
        use:'babel-loader'
      },
      {
        test:/\.css/,
        use:[extractCSS.loader,'css-loader']
      },
      {
        test:/\.html/,
        use:'html-loader'
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
