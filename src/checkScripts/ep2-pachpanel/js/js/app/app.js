define(['preload', 'app-view', 'settings'], function (preload, view, settings) {
    return {
        init: function () {
            if (settings.hasPreload) {
                preload.preloadImagesByChromePreloading(function () {
                    setTimeout(function () {
                        $('.preload').hide('slow').remove();
                        view.init();
                    }, settings.timeouts.pauseBeforeMainLoop);
                });
            }
            else {
                view.init();
            }
        }
    };
});