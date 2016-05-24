/**
 * @description: ftp
 * @author: lixinwei
 * @version: V1
 * @update: 16/4/12
 */

module.exports = function (gulp, Plugin, config) {

    // browser-sync
    gulp.task('browser-sync', function(){

        Plugin.browserSync.init({
            files: "./vue.project/assets/**",
            //proxy: "yourlocal.com",
            server:{
                baseDir: "./vue.project/assets"
            }
        });

    });

};
