var webpack = require('webpack');
var path=require("path");
var lib_dir = __dirname + '/public/javascripts/vendor';
module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/javascripts/calendar/main'
  ],
  output: {
    path: path.resolve(__dirname,'public/javascripts'),
    filename: '[name].js',
    publicPath: 'http://localhost:8080/javascripts/calendar/',
  },
  plugins: [
    new webpack.ProvidePlugin({
    "$": "jquery"
    }), 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    alias:{jquery:lib_dir+"/jquery.min.js"},
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader?experimental'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer', 'sass'] }
    ]
  }
}
