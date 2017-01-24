/**
 * Копирует index.html
 */
var gulp = require('gulp'),
    config = require('../config');


gulp.task('copyindex', function () {
    console.log(config.index.src);
    console.log(config.index.dest);
    return gulp.src(config.index.src)
        .pipe(gulp.dest(config.index.dest))
});