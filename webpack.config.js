/**
 * @description: webpack.config.js
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

var _ROOT = './vue.project',
    _SRC = _ROOT + '/src/',
    _ASSETS = _ROOT +  '/assets/';

var ROOT_PATH = path.resolve(__dirname),
    SRC_PATH = path.resolve(ROOT_PATH, 'vue.project/src'),
    ASSETS_PATH = path.resolve(ROOT_PATH, 'vue.project/assets');

var isProduction = function () {
    return process.env.NODE_ENV === 'production';
};

module.exports = {
    entry: {
        //common: ['dialog'],
        app: _SRC + '/js/main'
    },
    output: {
        path: path.join(__dirname, _ASSETS + 'js'),
        publicPath:'/js/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader?harmony', exclude: [node_modules_dir]},
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
    vue: { //vue的配置,需要单独出来配置
      loaders: {

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

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        })

        //new webpack.ProvidePlugin({
        //    $: 'jquery',
        //    jQuery: 'jquery',
        //    "window.jQuery": "jquery"
        //})

    ]

};


var vueLoader = {

    //css: ExtractTextPlugin.extract('vue-style-loader',"css-loader"),
    //scss: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader')

    css: ExtractTextPlugin.extract("css"),
    // you can also include <style lang="less"> or other langauges
    less: ExtractTextPlugin.extract("css!less")
};

if ( isProduction()) {

    delete module.exports.devtool;
    module.exports.vue.loaders = vueLoader;

    // http://vuejs.github.io/vue-loader/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new ExtractTextPlugin( "style.css"), // 输出到 output path

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}
