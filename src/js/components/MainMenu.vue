<template>
    <div>
        <div class="main-menu" v-if="!count_of_main">
            <ul class="root-icons">
                <li class="root-icon" v-for="item in tabView">
                    <router-link :to="item.route">
                        <a :root-data-code="item.code">
                            <div class="root-icon-image" :style="item.style">
                                <div class="root-icon-descr">
                                    {{ item.name }}
                                </div>
                            </div>
                        </a>
                    </router-link>
                </li>
            </ul>
        </div>
        <div v-else class="main-table">
            <table class="inner-table">
                <tr class="top-row">
                    <td :colspan="ctg_bottom_count">
                        <template>
                            <div class="img-wrapper">
                                <router-link :to="mainDish.route">
                                    <a>
                                        <div class="root-icon-image-bottom">
                                            <img :src="mainDish.img">
                                            <div class="root-icon-descr">
                                                {{ mainDish.name }}
                                            </div>
                                        </div>
                                    </a>
                                </router-link>
                            </div>
                        </template>
                    </td>
                </tr>
                <tr>
                    <template v-for="item in ctgs_bottom">
                        <td class="current-cell">
                            <router-link :to="item.route">
                                <a :root-data-code="item.code">
                                    <div class="root-icon-image-bottom">
                                        <div class="img-wrapper">
                                            <img :src="getImageSrcBig(item)">
                                        </div>
                                        <div class="root-icon-descr">
                                            {{ item.name }}
                                        </div>
                                    </div>
                                </a>
                            </router-link>
                        </td>
                    </template>
                </tr>
            </table>
        </div>
    </div>

</template>

<style scoped lang="less">
    .current-cell {
        .img-wrapper {
            width: 200px;
            img {
                width: 100%;
            }
        }
    }

    .main-table {
        .img-wrapper {
            max-width: 500px;
            max-height: 500px;
            margin: 0 auto;
            img {
                width: 100%;
            }
        }
        .root-icon-descr {
            color: #FFFFFF;
            height: 35px;
            top: 280px;
            text-align: center;
            padding-top: 5px;
        }
        .inner-table {
            width: 100%;
            text-align: center;
            color: white;
            height: 100%;
        }
        .top-row {
            height: 730px;
            vertical-align: middle;
        }

        .main-menu {
            margin-left: 35px;

            .root-icon-descr {
                color: #FFFFFF;
                position: relative;
                height: 35px;
                top: 280px;
                text-align: center;
                padding-top: 5px;
            }

            .current-cell {
                width: 20%;
            }

            .root-icon-image {
                background-size: cover;
                width: 280px;
                height: 280px;
            }

            .root-icons {
                display: inline;
                align-items: center;
                text-align: center;
                padding: 0;
            }

            .root-icon {
                display: inline-block;
                width: 280px;
                height: 315px;
                margin-top: 35px;
                margin-right: 35px;
                margin-left: 35px;
            }

            a {
                text-decoration: none;
                color: #000;
                outline: none;
            }
        }
    }
</style>
<script>
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
        }

    },
    computed: {
        count_of_main: function () {
            let res = _.filter(this.ctgs, {activeTime: '1'});
            return res.length > 0;
        },

        countOfMainDish(){
            return this.getCurrentMainDish().length;
        },

        tabView: function () {
            let res = this.ctgs.map(function (item) {
                item.route = 'menu/' + item.code;
                item.style = 'background-image: url(' + state.settings.server + state.settings.urlBigImage + item.urlSmallImage + ');';
                return item;
            });
            return res;
        },
        mainDish: function() {
            return this.getCurrentMainDish()[0];
        },

        mainView: function () {
            console.log('Большой патч:');
            console.log(this.getCurrentMainDish()[0]);

        },

        ctgs_bottom: function () {
            let mainDish = this.getCurrentMainDish()[0];
            console.log('Текущеее основное блюдо:');
            console.log(mainDish.code);
            let res = this.ctgs.map(function (item) {
                item.route = 'menu/' + item.code;
                return item;
            });
            res = _.filter(res, function(item){return item.code !== mainDish.code});
            console.log('патчи внизу:');
            console.log(res);
            return res;
        },

        ctg_bottom_count: function () {
            let res = _.without(this.ctgs, this.getCurrentMainDish()[0]);
            console.log(res);
            return res.length;
        }
    },

    methods: {
        getCurrentMainDish() {
            let listOfTitlePatches =  ['472020', '482020'];
            let result = [];
            let tmpBigPatch = {};
            let self = this;
            let bigPatches = [];

            listOfTitlePatches.forEach(function(item){
                tmpBigPatch = _.find(self.ctgs, {code: item, activeTime: '1'});
                    if (tmpBigPatch !== undefined) {
                        bigPatches.push(tmpBigPatch);
                    }
                }
            );
            if (bigPatches.length > 0){
                bigPatches[0].route = 'menu/' + bigPatches[0].code;
                bigPatches[0].img = state.settings.server + state.settings.urlBigImage + bigPatches[0].urlBigImage;
                result.push(bigPatches[0]);
            }
            return result;
        },
        getCurrentMainDish2() {
            let listOfTitlePatches =  ['472020', '482020'];
            let result = [];
            let tmpBigPatch = {};
            var res = [];
            var bigPatches = [];
            var res = this.ctgs.map(function (item) {
                if (item.activeTime && item.activeTime === '1') {
                    item.route = 'menu/' + item.code;
                    return item;
                }
            });
            var ret = _.remove(res, function (item) {
                return item !== undefined;
            });

            listOfTitlePatches.forEach(function(item, ){
                tmpBigPatch = _.find(ret, {code: item, activeTime: '1'});
                    if (tmpBigPatch !== undefined) {
                        bigPatches.push(tmpBigPatch);
                    }
                }
            );

            console.log('Большой патч!!!!');
            console.log(bigPatches);
            if (bigPatches.length > 0){
                result.push(bigPatches[0]);
            }
            return result;
        },

        getImageSrc(item){
            return state.settings.server + state.settings.urlBigImage + item.urlSmallImage;
        },
        getImageSrcBig(item){
            return state.settings.server + state.settings.urlBigImage + item.urlBigImage;
        },
        getResponce(){
            var self = this;
            const operation = {};
            console.log('тест');
            console.log(operation);
            operation.name = 'categories';
            ajax.exec(operation, function (resp) {
                self.ctgs = resp.data;
                //_.find(self.ctgs, {code: '472020'}).activeTime = '1';
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
            self.getResponce();
        }, 15000);
    }
}







</script>