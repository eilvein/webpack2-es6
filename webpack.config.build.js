"use strict";

var webpack = require('webpack');
var path = require('path');

var node_modules_dir = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
        path: path.join(__dirname, _ASSETS +'js'),
        publicPath:'/js/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.js?$/, loader: 'babel-loader', exclude: [node_modules_dir] },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.vue$/, loader: 'vue' },
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
    resolve:{
        //绝对路径
        root: _SRC,

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
        }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: 'Hello World app',
            filename: ASSETS_PATH + '/index.html',
            template: SRC_PATH + '/index.html',
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'app'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false, //删除空白符与换行符
                ignoreCustomFragments:[
                    /\{\{[\s\S]*?\}\}/g  //不处理 {{}} 里面的 内容
                ]
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })

        //new webpack.ProvidePlugin({
        //    $: 'jquery',
        //    jQuery: 'jquery',
        //    "window.jQuery": "jquery"
        //})
    ]

};
