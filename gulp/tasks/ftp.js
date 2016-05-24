/**
 * @description: ftp
 * @author: lixinwei
 * @version: V1
 * @update: 16/4/12
 */

module.exports = function (gulp, Plugin, config) {

    // dev ftp
    gulp.task('ftp', function () {
        var fileDst = config.mall.output + '**/*';

        return gulp.src(fileDst)
            .pipe(Plugin.ftp({
                host: 'ip',
                user: 'root',
                pass: 'pwd',
                remotePath: '/'
            }))
            .pipe(Plugin.gutil.noop());
    });
};