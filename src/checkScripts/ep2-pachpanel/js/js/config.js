requirejs.config({
    paths: {
        "app": "app/app",
        "app-view": "app/views/app-view",
        "images": "app/utils/images-set",
        "preload": "app/utils/preload",
        "jquery": "vendor/jquery.min",
        "underscore": "vendor/underscore-min",
        "settings" : "app/settings",
        "const" : "app/utils/const"
   }
});

require(['app'], function (app) {
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    ready(app.init);
});
