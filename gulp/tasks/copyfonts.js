/**
 * Копирует шрифты
 */
var gulp = require('gulp'),
    config = require('../config');


gulp.task('copyfonts', function () {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest))
});