/**
 * @description: deploy
 * @author: lixinwei
 * @version: V1
 * @update: 16/4/12
 */

"use strict";
module.exports = function (gulp, Plugin, config) {

    // release html
    gulp.task('relhtml', function(){
        var htmlSrc = config.mall.src.html,
            htmlDst = config.mall.output;

        return gulp.src(htmlSrc)
            .pipe(Plugin.fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(Plugin.revCollector())
            .pipe(gulp.dest(htmlDst));

    });

    // release less
    gulp.task('relless', function () {
        var lessSrc = config.mall.src.less,
            lessDst = config.mall.output + 'css';

        return gulp.src(lessSrc)
            //.pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.less())

            .pipe(Plugin.cleanCSS({debug: true}, function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + '.min: ' + details.stats.minifiedSize);
            }))

            //.pipe(Plugin.sourcemaps.write('./maps'))

            .pipe(Plugin.rev())
            .pipe(gulp.dest(lessDst))
            .pipe(Plugin.rev.manifest())
            .pipe(gulp.dest(config.mall.root + 'rev/css' ));
    });

    // release sass
    gulp.task('relsass', function () {
        var sassSrc = config.mall.src.sass,
            sassDst = config.mall.output + 'css';

        return gulp.src(sassSrc)
            //.pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.sass().on('error', Plugin.sass.logError))
            //.pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(Plugin.rev())
            //.pipe(Plugin.minifycss())
            .pipe(gulp.dest(sassDst))
            .pipe(Plugin.rev.manifest())
            .pipe(gulp.dest( config.mall.root + 'rev/css' ));

    });

    // release css
    //gulp.task('relcss', function(){
    //    var cssSrc = config.mall.src.css,
    //        cssDst = config.mall.output + 'css';
    //
    //    return gulp.src(cssSrc)
    //        //.pipe(Plugin.concat('all.css'))
    //        .pipe(gulp.dest(cssDst))
    //        .pipe(Plugin.rename({ suffix: '.min' }))
    //        .pipe(Plugin.minifycss())
    //        .pipe(Plugin.assetRev())
    //        .pipe(gulp.dest(cssDst));
    //
    //});

    // relese js
    //gulp.task('reljs', function () {
    //    var jsSrc = config.mall.src.js,
    //        jsDst = config.mall.output + 'js';
    //
    //    return gulp.src(jsSrc)
    //        // 语法检查
    //        //.pipe(Plugin.jshint('.jshintrc'))
    //        //.pipe(Plugin.jshint.reporter('default'))
    //
    //        // 合并文件
    //        //.pipe(Plugin.concat('all.js'))
    //
    //        // 去掉console和debugger
    //        .pipe(Plugin.stripDebug())
    //        //.pipe(Plugin.rename({ suffix: '.min' }))
    //        .pipe(Plugin.uglify())
    //        .pipe(Plugin.assetRev())
    //        .pipe(gulp.dest(jsDst));
    //
    //});

    gulp.task('reljs', function () {
        var jsSrc = config.mall.src.js,
            jsDst = config.mall.output + 'js';

        return gulp.src(jsSrc)
            .pipe(Plugin.changed(jsDst))

            .pipe(Plugin.stream(Plugin.webpackConfig))

            .pipe(Plugin.rev())
            .pipe(gulp.dest(jsDst))
            .pipe(Plugin.rev.manifest())
            .pipe(gulp.dest( config.mall.root + 'rev/js' ));

    });


    // release img
    gulp.task('relimg', function(){
        var imgSrc = config.mall.src.img,
            imgDst = config.mall.output + 'img';

        return gulp.src(imgSrc)
            .pipe(Plugin.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [Plugin.pngquant()]
            }))
            .pipe(gulp.dest(imgDst));

    });

    // push test server
    var configSSH = {
        host: '123.57.49.111',
        port: 22,
        username: 'root',
        password: 'xxxxx'
        //privateKey: require('fs').readFileSync('/Users/lixinwei/.ssh/id_rsa')
    };
    var gulpSSH = new Plugin.GulpSSH({
        ignoreErrors: false,
        sshConfig: configSSH
    });
    gulp.task('exec', function () {
        return gulpSSH
            .exec(['uptime', 'ls -a', 'pwd'], {filePath: 'commands.log'})
            .pipe(gulp.dest('logs'))
    });
    gulp.task('deploy', function () {
        var fileDst = config.mall.output + '**/*';

        return gulp.src(fileDst)
            .pipe(gulpSSH.dest(fileDst))
    });

    gulp.task('release', ['clean', 'clean-rev'], function(){
        gulp.start('relless', 'reljs', 'relimg', 'font');
    });

    // release code
    gulp.task('build', ['browser-sync'], function() {

        gulp.start('relhtml');

    });



};
