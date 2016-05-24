/**
 * @description: webpack.config.dev.js
 * @author: lixinwei
 * @version: V1
 * @update: 16/5/5
 */

"use strict";

var webpack = require('webpack');
var path = require('path');

var node_modules_dir = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var _SRC = './vue.project/src/',
    _ASSETS = './vue.project/assets/';

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'vue.project/src');
var ASSETS_PATH = path.resolve(ROOT_PATH, 'vue.project/assets');


module.exports = {
    entry: {
        //common: ['dialog'],
        app: _SRC + '/js/main'
    },
    output: {
        path: path.join(__dirname, _ASSETS),
        publicPath:'/assets/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader?harmony'},
            { test: /\.js?$/, loader: 'babel-loader', exclude: [node_modules_dir]},
            { test: /\.css$/, loader: 'style-loader!css-loader'},
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash:7]'
                }
            }

        ]
    },
    vue: {
      loaders: {
          css: ExtractTextPlugin.extract("css"),
          // you can also include <style lang="less"> or other langauges
          less: ExtractTextPlugin.extract("css!less")
      }
    },
    resolve:{
        //绝对路径
        root: path.join(__dirname, _SRC),

        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.vue', '.json'],

        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            jquery: path.resolve( _SRC + 'js/lib/jquery'),
            dialog: path.resolve(_SRC + 'js/lib/jquery.dialog')
        }

    },
    plugins:[
        //function() { // 文件名带[hash]的时候, 必须依赖stats
        //    this.plugin('done', function(stats) { // stats.json的assetsByChunkName, 包含了build后的文件列表
        //        var datas = stats.toJson(), stats;
        //        stats = './stats.json'; // path.join(__dirname, '..', 'stats.json'),
        //        require('fs').writeFileSync(stats, JSON.stringify(datas.assetsByChunkName));
        //    });
        //},

        // short-circuits all Vue.js warning code
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: 'Hello World app',
            filename: ASSETS_PATH + '/index.html',
            template: SRC_PATH + '/index.html',
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: true //为静态资源生成hash值

        }),
        new ExtractTextPlugin("style.css") // 输出到 output path

        //new webpack.ProvidePlugin({
        //    $: 'jquery',
        //    jQuery: 'jquery',
        //    "window.jQuery": "jquery"
        //})
    ]

};
