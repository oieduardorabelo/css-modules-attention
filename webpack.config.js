var path = require('path')
var webpack = require('webpack')
var postcssPluginAutoReset = require('postcss-autoreset')
var postcssPluginInitial = require('postcss-initial')()
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var styleguideExtractTextPlugin = new ExtractTextPlugin('styleguide.bundle.css')
var comp1ExtractTextPlugin = new ExtractTextPlugin('comp1.bundle.css')
var comp2ExtractTextPlugin = new ExtractTextPlugin('comp2.bundle.css')

module.exports = {
    entry: path.resolve('main.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve('dist'),
      pathinfo: true
    },
    module: {
        loaders: [
            {
                test: /styleguide\.css$/,
                loader: styleguideExtractTextPlugin.extract('style', 'css'),
                exclude: [/node_module/]
            },
            {
                test: /comp1\.css$/,
                loader: comp1ExtractTextPlugin.extract('style', 'css?modules!postcss'),
                exclude: [/node_module/, /styleguide\.css/]
            },
            {
                test: /comp2\.css$/,
                loader: comp2ExtractTextPlugin.extract('style', 'css?modules!postcss'),
                exclude: [/node_module/, /styleguide\.css/]
            },
            {
                test: /\.json$/,
                loader: 'json',
                exclude: /node_module/
            }
        ]
    },
    plugins: [
        styleguideExtractTextPlugin,
        comp1ExtractTextPlugin,
        comp2ExtractTextPlugin
    ],
    postcss: function() {
        return [postcssPluginAutoReset, postcssPluginInitial]
    }
}
