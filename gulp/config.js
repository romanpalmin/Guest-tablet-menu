'use strict';
var project = '/';
var src = './src' + project;
var dist = './build' + project;
var deploy = './deploy';
var assets = 'assets';
var srcAssets = src + assets;
var distAssets = dist + assets;


module.exports = {
    js: {
        src: ['./assets/js/**/*'],
        dest: distAssets+'/js'
    },

    vendor: {
        src: [],
        dest: distAssets+'/js/vendor'
    },

    css: {
        src: [
            './assets/css/*.css',
            '!' + srcAssets + '/css/*.min.css',
            '!' + srcAssets + '/css/*.all.css'
        ],
        dest: distAssets + '/css'
    },
    
    less: {
        src: ['./assets/less/*.less',],
        dest: distAssets + '/css'
    },

    images: {
        src: [ './assets/images/**/*'],
        dest: distAssets + '/images'
    },

    index: {
        src:  './*.html',
        dest: dist
    },

    svg: {
        src: './assets/svg/**/*',
        dest: distAssets + '/svg'
    },
    
    settings: {
        src: './assets/settings.json',
        dest: distAssets
    },

    deploy:{
        src: dist + '/**/*/',
        dest: deploy
    }
};