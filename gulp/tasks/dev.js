/**
 * @description: mall.js
 * @author: lixinwei
 * @version: V1
 * @update: 16/4/11
 */

"use strict";

module.exports = function (gulp, Plugin, config) {

    var getFileName = function (str) {
        var _str = str;
        var tmp = [];
        tmp = _str.split("/");
        var cc = tmp[tmp.length-1];
        tmp = cc.split("/");
        return tmp[0];
    };

    // dev html编译
    gulp.task('devhtml', function() {
        var htmlSrc = config.mall.src.html,
            htmlDst = config.mall.output;

        return gulp.src(htmlSrc)
            .pipe(Plugin.changed(htmlDst))
            .pipe(Plugin.fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            //.pipe(Plugin.useref())
            .pipe(gulp.dest(htmlDst))
            .pipe(Plugin.notify({ message: 'Htmls task complete' }));
    });

    // dev less 编译
    gulp.task('devless', function () {
        var lessSrc = config.mall.src.less,
            lessDst = config.mall.output + 'css';

        return gulp.src(lessSrc)
            //.pipe(Plugin.changed(lessDst))
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.less())
            .pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(gulp.dest(lessDst))
            .pipe(Plugin.notify({ message: 'Scss task completed!' }));
    });

    // dev sass 编译
    gulp.task('devsass', function () {
        var sassSrc = config.mall.src.sass,
            sassDst = config.mall.output + 'css';

        return gulp.src(sassSrc)
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.sass().on('error', Plugin.sass.logError))
            .pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(gulp.dest(sassDst))
            .pipe(Plugin.notify({ message: 'Scss task completed!' }));

    });

    // dev css 编译
    //gulp.task('devcss', function () {
    //    var cssSrc = config.mall.src.css,
    //        cssDst = config.mall.output + 'css';
    //
    //    return gulp.src(cssSrc)
    //        .pipe(gulp.dest(cssDst))
    //        .pipe(Plugin.notify({ message: 'css task completed!' }));
    //
    //});

    // dev js 编译
    gulp.task('devjs', function () {
        var jsSrc = config.mall.src.js,
            jsDst = config.mall.output + 'js';

        return gulp.src(jsSrc)
            .pipe(Plugin.changed(jsDst))
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            // es6
            //.pipe(Plugin.sourcemaps.init())
            //.pipe(Plugin.babel({
            //    presets: ['es2015']
            //}))
            //.pipe(Plugin.sourcemaps.write('./maps'))

            .pipe(Plugin.stream(Plugin.webpackConfig))

            .pipe(gulp.dest(jsDst))
            .pipe(Plugin.notify({ message: 'Scripts task complete' }));

    });

    // dev img 编译
    gulp.task('devimg', function(){
        var imgSrc = config.mall.src.img,
            imgDst = config.mall.output + 'img';

        return gulp.src(imgSrc)
            .pipe(Plugin.changed(imgDst))
            .pipe(gulp.dest(imgDst))
            .pipe(Plugin.notify({ message: 'Images task complete' }));
    });

    // dev font 编译
    gulp.task('font', function(){
        var fontsSrc = config.mall.src.fonts,
            fontsDst = config.mall.output + 'fonts';

        return gulp.src(fontsSrc)
            .pipe(gulp.dest(fontsDst));
    });

    // dev data 编译
    gulp.task('data', function(){
        var dataSrc = config.mall.src.data,
            dataDst = config.mall.output + 'data';

        return gulp.src(dataSrc)
            .pipe(gulp.dest(dataDst));
    });

    // 雪碧图
    gulp.task('sprite', function () {
        var imgSrc = config.mall.src.img,
            imgDst = config.mall.output + 'img';

        var spriteData = gulp.src(config.mall.root + 'src/img/ui/*.png')
            .pipe(Plugin.spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }));
        return spriteData.pipe(gulp.dest(imgDst));
    });

    // 清空编译后的文件
    gulp.task('clean', function() {
        var distFile = config.mall.output + '*';

        return Plugin.del(distFile);

    });

    gulp.task('clean-rev', function() {
        var revFile = config.mall.root + 'rev/**/*';

        return Plugin.del(revFile);

    });

    // 默认任务
    gulp.task('default', ['clean'], function(){
        gulp.start('devhtml', 'devless', 'devjs', 'devimg', 'font', 'data');

    });

    // dev watch
    gulp.task('watch', ['browser-sync'],function() {
        gulp.start('devhtml', 'devless', 'devjs', 'devimg', 'font', 'data');

        // watch html
        gulp.watch( config.mall.src.html, function(event){
            gulp.start('devhtml');
            console.log('Event type: ' + event.type);
            console.log('Event path: ' + event.path);
            // 删除同步
            var _pathFile = event.path;
            var _fileName = getFileName(_pathFile);

            if (event.type == "deleted") {
                Plugin.del(config.mall.output + _fileName);

            }
            
        });

        // watch less
        gulp.watch( config.mall.src.allless, function(){
            gulp.start('devless');
        });

        // watch js
        gulp.watch( config.mall.src.js, function(){
            gulp.start('devjs');
        });

        // watch images
        gulp.watch( config.mall.src.img, function(){
            gulp.start('devimg');
        });

        // watch font
        gulp.watch( config.mall.src.fonts, function(){
            gulp.start('font');
        });

        // watch data
        gulp.watch( config.mall.src.data, function(){
            gulp.start('data');
        });

    });





};