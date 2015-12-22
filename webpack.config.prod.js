var path = require('path');
var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin(/\.svg$/);
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var lib_dir = __dirname + '/public/javascripts/vendor';

module.exports = {
    entry: {
        "calendar/main": './src/javascripts/calendar/main.js',
        "calendar2/main": './src/javascripts/calendar2/main2.js',
        "vendor": [
            'moment',
            'react',
        ]
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: './public/javascripts/[name].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: [nodeModulesDir] },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass') }
        ]
    },
    resolve: {
        alias:{jquery:lib_dir+"/jquery-2.0.3.js"},
        extensions: ['', '.js']
    },
    plugins: [
        ignore,
        new webpack.ProvidePlugin({
            "$": "jquery"
        }),
        new ExtractTextPlugin('./public/styles/[name].css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', './public/javascripts/vendor.js')
    ]
};