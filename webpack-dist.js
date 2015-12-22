// Webpack dev server
// Ran in parallel with the Express server

var WebpackDevServer=require("webpack-dev-server");
var webpack =require("webpack");
var config =require("./webpack.config.dev");


var server = new WebpackDevServer(webpack(config), {
  // webpack-dev-server options
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true },
});

server.listen(8080, "localhost", function() {});
