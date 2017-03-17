'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build-local', function (cb) {
    return runSequence(/*'less',*/ 'js','css', /*'images',*/ 'copyindex'/*, 'deploy'*/, 'copysvg', cb);
});