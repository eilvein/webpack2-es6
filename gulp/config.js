/**
 * @description: config
 * @author: lixinwei
 * @version: V1
 * @update: 16/4/12
 */

"use strict";

module.exports = function(){
    var config = {
        mall:{
            src: {
                html: [
                    'vue.project/rev/**/*.json',
                    'vue.project/src/*.html',
                    'vue.project/src/templates*/*.html',
                ],
                less: ['vue.project/src/less/*.less'],
                allless: ['vue.project/src/less/**/*.less'],
                sass: ['vue.project/src/sass/**/*.scss'],
                css: ['vue.project/src/css/**/*.css'],
                js: [
                    'vue.project/src/js/**/*.js',
                    'vue.project/src/**/*.vue'
                ],
                img: ['vue.project/src/img/**/*'],
                fonts: ['vue.project/src/fonts/**/*'],
                data: ['vue.project/src/data/**/*']

            },
            output: 'vue.project/assets/',
            input: 'vue.project/src/',
            root :'vue.project/'
        }


    };
    return config;
};
