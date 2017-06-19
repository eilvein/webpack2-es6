/**
 * Description: webpack dll
 * Author: Eilvein
 * Update: 2017/06/15
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const dist = path.resolve(process.cwd(), 'dist');
const lib = require('./build/lib.dependencies');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dllConfig = {
    devtool: 'eval',
    entry: {
        lib: lib
    },
    output: {
        path: path.resolve(__dirname, 'dist/static'),
        filename: 'js/[name].dll.js',

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader?cacheDirectory=true',
                    'eslint-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: path.join(dist, 'dll/[name].manifest.json'),

            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]',
            context: __dirname
        }),
        // minify JS
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     }
        // }),
        new HtmlWebpackPlugin({
            filename: '../../src/template/index.html',
            template: './src/template/index_base.html',
            inject: 'body',
            hash: true
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true
            // }
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')]
    }

}

module.exports = dllConfig;
