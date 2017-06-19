/**
 * Description: webpack dev
 * Author: Eilvein
 * Update: 2017/06/15
 */

'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConf = require('./webpack.base.config');
const proxyConf = require('./build/proxy.config');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

// 写入环境变量
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'export default "development";';
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
});

const devConfig = webpackMerge(webpackBaseConf, {
    cache: true,
    devtool: 'cheap-module-eval-source-map',

    output:{
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: false,
            allChunks: true
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/dll/lib.manifest')
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.html',
            inject: 'body'
        }),
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: ['../dll/lib.dll.js'],
        //     append: true,
        //     hash: true
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()


    ],
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        publicPath: '/static/',
        compress: true,
        host: 'localhost',
        port: 9000,
        open: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        proxy: proxyConf
    }

});


module.exports = devConfig;
