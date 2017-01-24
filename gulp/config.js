'use strict';
var project = '/';
var src = './src' + project;
var dist = './build' + project;
var assets = 'assets';
var srcAssets = src + assets;
var distAssets = dist + assets;


module.exports = {
    js: {
        src: ['./assets/js/*'],
        dest: distAssets + '/js',
        dest2: srcAssets+'/js'
    },

    css: {
        src: [
            srcAssets + '/css/*.css',
            '!' + srcAssets + '/css/*.min.css',
            '!' + srcAssets + '/css/*.all.css'
        ],
        dest: distAssets + '/css'
    },

    images: {
        src: [srcAssets + '/images/**/*'],
        dest: distAssets + '/images'
    },

    index: {
        src:  './*.html',
        dest: dist
    }
};