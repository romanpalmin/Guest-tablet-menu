/**
 * Копирует index.html
 */
var gulp = require('gulp'),
    config = require('../config');


gulp.task('copyindex', function () {
    return gulp.src(config.index.src)
        .pipe(gulp.dest(config.index.dest))
});