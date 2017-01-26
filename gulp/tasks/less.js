/**
 * Компилирует css из less
 */
var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    config = require('../config'),
    less = require('gulp-less');

gulp.task('less', function () {
    return gulp.src(config.less.src)
        .pipe(less())
        .pipe(cssmin())
        .pipe(concat('less.all.min.css'))
        .pipe(gulp.dest(config.less.dest));
});