import state from './store/currentStates';
import ajax from './helpers/ajax.js';
import _ from 'lodash';
export default {
    data(){
        return {
            ctgs: state.appState.MenuPoints
        }
    },

    watch: {
        ctgs: function (val) {
            console.log('Изменились исходные данные');
        }

    },
    computed: {
        count_of_main: function () {
            let res = _.filter(this.ctgs, {activeTime: '1'});
            return res.length > 0;
        },

        tabView: function () {
            let res = this.ctgs.map(function (item) {
                item.route = 'menu/' + item.code;
                item.style = 'background-image: url(' + state.settings.server + state.settings.urlBigImage + item.urlSmallImage + ');';
                return item;
            });
            return res;
        },

        mainView: function () {
            let result = [];
            var res = [];
            var res = this.ctgs.map(function (item) {
                if (item.activeTime && item.activeTime === '1') {
                    item.route = 'menu/' + item.code;
                    return item;
                }
            });
            var ret = _.remove(res, function (item) {
                return item !== undefined;
            });
            result.push(ret[0])
            return result;
        },

        ctgs_bottom: function () {
            var res = this.ctgs.map(function (item) {
                item.route = 'menu/' + item.code;
                return item;
            });

            res = _.without(res, _.find(res, {activeTime: '1'}));
            return res;
        },

        ctg_bottom_count: function () {
            let res = _.without(this.ctgs, _.find(this.ctgs, {activeTime: '1'}));
            return res.length;
        }
    },

    methods: {
        getImageSrc(item){
            return state.settings.server + state.settings.urlBigImage + item.urlSmallImage;
        },
        getImageSrcBig(item){
            return state.settings.server + state.settings.urlBigImage + item.urlBigImage;
        },
        getResponce(){
            var self = this;
            const operation = {};
            operation.name = 'categories';
            ajax.exec(operation, function (resp) {
                self.ctgs = resp.data;
                _.find(self.ctgs, {code: '482020'}).activeTime = '1';
                state.appState.MenuPoints = self.ctgs;
            });
        }
    },

    mounted(){
        var self = this;

        if (state.appState.MenuPoints.length > 0) {
            self.ctgs = state.appState.MenuPoints;
        } else {
            this.getResponce();
        }

        if (state.settings.isTablet) {
            console.log('Планшет');
        }
        else {
            console.log('Уличный стенд');
        }

        let upTimer = setInterval(function () {
            console.log('Будем обновлять состояние по таймеру, раз в 15 секунд');
            self.getResponce();
        }, 15000);
    }
}