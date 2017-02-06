'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (cb) {
    return runSequence('less', 'js','css', /*'images',*/ 'copyindex', cb);
});