/**
 * Копирует index.html
 */
var gulp = require('gulp'),
    config = require('../config');


gulp.task('deploy', function () {
    return gulp.src(config.deploy.src)
        .pipe(gulp.dest(config.deploy.dest))
});