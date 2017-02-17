// jshint maxparams:9
define(['jquery', "underscore", 'settings', 'const'], function ($, _, settings, constants) {

    return {
        classes: {
            burger: '.stamp.top-left',
            bage: '.bage',
            patches: '.logo'
        },

        init: function () {
            var self = this;
            self.mainViewLoop();
            $(self.classes.burger).addClass('icon-b-f-1');
            $(self.classes.patches + '[data-name="bbq"]').addClass('icon-b-bbq-1');
            $(self.classes.patches + '[data-name="beer"]').addClass('icon-b-beer-1');
            $(self.classes.patches + '[data-name="sf"]').addClass('icon-b-sf-1');
        },

        /**
         * Все виды анимаций на данной странице
         */
        animations: {
            /**
             * Включает крутилку цены, на вход рпинимает объект из трех полей: selector(), цена и цвет
             */
            rollPrices: function (priceCoin) {
                var bage = $(priceCoin.bage);
                var className = 'icon-';
                var color = priceCoin.color;
                if (color) {
                    className += color[0] + '-';
                }
                var newClass = '';
                var rollingIndex = 1;
                var timerId = setInterval(function () {
                    newClass = 'bage ' + className + 'pr_' + rollingIndex;
                    if (bage.hasClass('t-l')) {
                        newClass += ' t-l';
                    }
                    bage.removeClass().addClass(newClass);
                    if (rollingIndex >= constants.FRAMES_IN_PRICE) {
                        rollingIndex = 1;
                    }
                    rollingIndex++;
                }, settings.timeouts.speedOfPrice);
            },

            /**
             * Включает крутилку бургера, приниимает на вход объект из бургера и позиции
             * @param burger
             */
            rollBurger: function (burger) {
                var rollingBurger = $(burger);
                var className = 'icon-';
                var newClass = '';
                var rollingIndex = 1;
                var timerId = setInterval(function () {
                    newClass = 'stamp top-left ' + className + 'b-f-' + rollingIndex;
                    rollingBurger.removeClass().addClass(newClass);
                    if (rollingIndex >= constants.FRAMES_IN_BURGER) {
                        clearInterval(timerId);
                    }
                    rollingIndex++;
                }, settings.timeouts.speedOfBurger);
            },

            /**
             * Включает крутилку патча
             * @param patch
             */
            rollPatchNew: function (patch) {
                var rollingPath = $(patch.classes);
                var className = ' icon-';
                var newClass = '';
                var rollingIndex = 1;
                var timerId = setInterval(function () {
                    newClass = patch.addClasses + className + 'b-' + patch.name + '-' + rollingIndex;
                    rollingPath.removeClass().addClass(newClass);
                    if (rollingIndex >= constants.FRAMES_IN_PATCH) {
                        clearInterval(timerId);
                    }
                    rollingIndex++;
                }, settings.timeouts.speedOfPatch);
            },

        },

        mainViewLoop: function () {
            var self = this;
            var bages;
            var burger = $(self.classes.burger);
            var patches = {
                'patchTopMidle': {
                    'classes': '.stamp.top-middle',
                    'name': 'bbq',
                    'addClasses': ' stamp top-middle '
                },
                'patchBottomMidle': {
                    'classes': '.stamp.bottom-middle',
                    'name': 'beer',
                    'addClasses': ' stamp bottom-middle '
                },
                'patchBottomLeft': {
                    'classes': '.stamp.bottom-left',
                    'name': 'sf',
                    'addClasses': ' stamp bottom-left '
                }

            };

            // Запускаем бургеры и патчи с заданной периодичностью
            var burgerTopLeftInterval = setInterval(function () {
                self.animations.rollBurger(burger[0]);
                for (var key in patches) {
                    self.animations.rollPatchNew(patches[key]);
                }
            }, settings.timeouts.frequenceBurgerRolling);

            // Запускаем цены безостановочно
            bages = $(self.classes.bage);
            for (var i = 0; i < bages.length; i++) {
                self.animations.rollPrices({bage: bages[i], price: constants.CURRENT_PRICE, color: 'gold'});
            }

            //  todo довести до ума остановку анимаций при смене страницы
           /* $(window).focus(function () {
                console.log('Пришли перезапускаем');
                self.init();
            });

            $(window).blur(function () {
                console.log('Ушли со страницы, останавливаем анимацию');
                clearInterval(burgerTopLeftInterval);
            });*/

        }
    };
});