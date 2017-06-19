/**
 * Description: webpack production
 * Author: Eilvein
 * Update: 2017/06/15
 */

'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConf = require('./webpack.base.config');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const lib = require('./build/lib.dependencies');

// 写入环境变量
fs.open('./src/config/env.js', 'w', function(err, fd) {
    var buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

const prodConfig = webpackMerge(webpackBaseConf, {

    bail: true,

    devtool: 'hidden-source-map',
    entry: {
        main: './src/js/main',
        vendors: lib
    },
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].chunk.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    use: [
                        'css-loader?minimize&sourceMap&importLoaders=2',
                        'sass-loader?outputStyle=expanded&sourceMap&sourceMapContents'
                    ]
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist'], {
                root: path.resolve(__dirname),
                verbose: true,
                dry: false
            }
        ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[hash].css',
            disable: false,
            allChunks: true
        }),
        // this is needed in webpack 2 for minifying CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        // minify JS
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index_base.html',
            favicon: './src/favicon.png',
            inject: 'body'
        })

    ]

});

module.exports = prodConfig;
