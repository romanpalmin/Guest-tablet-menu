/**
 * Копирует svg
 */
var gulp = require('gulp'),
    config = require('../config');


gulp.task('copysvg', function () {
    return gulp.src(config.svg.src)
        .pipe(gulp.dest(config.svg.dest))
});