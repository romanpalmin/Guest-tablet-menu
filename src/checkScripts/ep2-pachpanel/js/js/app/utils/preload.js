define(['images', 'jquery'], function (images, $) {
    /**
     * Предзагрузка изображений средствами Chrome (>=v.50), использовать аккуратно, оттестировав
     * @param arr - массив изображений для предзагрузки, по сути все спрайты
     * @param callback
     */
    return {
        preloadImagesByChromePreloading: function (callback) {
            var el;
            var arr = images.url;
            for (var i = 0; i < arr.length; i++) {
                el = '<link rel="preload" href="' + arr[i] + '" as="image">';
                $('head').append(el);
                if (i === arr.length - 1 && typeof callback === 'function') {
                    callback();
                }
            }
        }
    };
});