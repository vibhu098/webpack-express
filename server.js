var express =require("express");
var routes = require('./routes/index');
var path=require('path');
//var webpack = require("webpack");
//var WebpackDevServer = require('webpack-dev-server');
//var config = require('./webpack.config.dev');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
var app = express();

// set up Jade
app.set('views', './views');
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'public')));
app.all('/javascripts/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
});
app.use('/', routes);


// bundler = new WebpackDevServer(webpack(config), {
// 	publicPath: '/javascripts/calendar/',
//     // Configure hot replacement
//     hot: true,

//     // The rest is terminal configurations
//     quiet: false,
//     noInfo: true,
//     stats: {
//       colors: true
//     }
//   });

//   // We fire up the development server and give notice in the terminal
//   // that we are starting the initial bundle
//   bundler.listen(8080, 'localhost', function () {
//     console.log('Bundling project, please wait...');
//   });



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

});


