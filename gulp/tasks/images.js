/**
 * Оптимизирует и копирует изображения
 */
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    flatten = require('gulp-flatten'),
    config = require('../config');
console.log(config.images.src);
console.log(config.images.dest);
gulp.task('images', function () {
    return gulp.src(config.images.src)
        .pipe(imagemin())
        .pipe(flatten())
        .pipe(gulp.dest(config.images.dest));
});