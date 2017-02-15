'use strict';

var gulp        = require('gulp');
var requireDir  = require('require-dir');
var runSequence = require('run-sequence');

requireDir('./gulp/tasks', {recurse: true});

gulp.task('release', function () {
    runSequence('build');
});

gulp.task('release-local', function () {
    runSequence('build-local');
});
