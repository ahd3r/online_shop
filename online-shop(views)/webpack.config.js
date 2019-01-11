const path = require('path');
const extractCSS = require('extract-text-webpack-plugin');

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
        test:/\.css/,
        use:extractCSS.extract({
          use:'css-loader'
        })
      }
    ]
  },
  plugins:[
    new extractCSS('main.css')
  ]
};
