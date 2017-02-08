/**
 * Копирует index.html
 */
var gulp = require('gulp'),
    config = require('../config');


gulp.task('copysettings', function () {
    return gulp.src(config.settings.src)
        .pipe(gulp.dest(config.settings.dest))
});