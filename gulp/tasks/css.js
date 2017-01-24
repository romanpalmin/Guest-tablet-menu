/**
 * Компилирует css
 */
var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    config = require('../config').css

gulp.task('css', function () {
    return gulp.src(config.src)
        .pipe(cssmin())
        .pipe(gulp.dest(config.dest ))
});