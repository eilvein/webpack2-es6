/**
 * Description: webpack base
 * Author: Eilvein
 * Update: 2017/06/15
 */

'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const config = {
    entry: {
        main: './src/js/main'
    },
    output: {
        path: path.resolve(__dirname, 'dist/static')
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
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]

            },
            {
                test: /\.(html|tpl)$/,
                use: 'html-loader?-minimize'
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.scss', '.sass', '.json'],
        alias: {
            util$: path.resolve(__dirname, 'src/js/util/util'),
            comps: path.resolve(__dirname, 'src/js/components/'),
            mods: path.resolve(__dirname, 'src/js/modules/')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};

module.exports = config;
