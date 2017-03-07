<template>
    <div>
        <div class="main-menu" v-if="showTabletView">
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
            !!!
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
        showTabletView: function () {
            let res = _.filter(this.ctgs, function(o){return o.breakfast !== '0' || o.lanhc !== '0'});
            return !(res.length > 0);
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
            let md =  this.getCurrentMainDish();
            return md;
        },

        ctgs_bottom: function () {
            let mainDish = this.getCurrentMainDish();
            let res = this.ctgs.map(function (item) {
                item.route = 'menu/' + item.code;
                return item;
            });
            res = _.filter(res, function(item){return item.code !== mainDish.code});
            return res;
        },

        ctg_bottom_count: function () {
            let res = _.without(this.ctgs, this.getCurrentMainDish()[0]);
            return res.length;
        }
    },

    methods: {
        getCurrentMainDish() {
             let res = _.filter(this.ctgs, function(o){return o.activeTime === '1' && (o.breakfast === '1' || o.lanhc === '1')});
             if (res.length > 0) {
                res[0].route = 'menu/' + res[0].code;
                res[0].img = state.settings.server + state.settings.urlBigImage + res[0].urlBigImage;
             }
             return res[0];
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
            operation.name = 'categories';
            ajax.exec(operation, function (resp) {
                self.ctgs = self.middlewareTest(resp);
                state.appState.MenuPoints = self.ctgs;
            });
        },

        middlewareTest(resp){
            const debug = true;
            const checkBreakfastAndLunch = false;
            const checkNoMainPosition = !checkBreakfastAndLunch;
            let retTestData =  resp.data;
            if (!debug){
                return retTestData;
            }
            else {
                console.log('Проводим изменения полученных данных для тестирования');
            }
            for (let i = 0; i< retTestData.length; i++){
                console.log(retTestData[i].activeTime + ' ::: ' + retTestData[i].lanhc  + ' ::: ' + retTestData[i].breakfast + ' :::: ' + retTestData[i].code);
            }

            if (debug && checkBreakfastAndLunch){
                for (let i = 0; i< retTestData.length; i++){
                    if (retTestData[i].code === '472020') {
                        retTestData[i].activeTime = '1';
                        retTestData[i].lanhc = '0';
                        retTestData[i].breakfast = '1';
                    }
                    if (retTestData[i].code === '482020') {
                        retTestData[i].activeTime = '0';
                        retTestData[i].lanhc = '0';
                        retTestData[i].breakfast = '1';
                    }
                    if (i === retTestData.length - 1){
                        return retTestData;
                    }
                }
            }
            if (debug && checkNoMainPosition){
                for (let i = 0; i< retTestData.length; i++){
                    if (retTestData[i].code === '472020' || retTestData[i].code === '482020') {
                        retTestData[i].activeTime = '0';
                        retTestData[i].lanhc = '0';
                        retTestData[i].breakfast = '0';
                    }
                     if (i === retTestData.length - 1){
                        return retTestData;
                    }
                }
            }
        }
    },

    mounted(){
        const self = this;
        let title = state.settings.isTablet ? 'Планшет' : 'Уличный стенд';
        console.log(title);

        if (state.appState.MenuPoints.length > 0) {
            self.ctgs = state.appState.MenuPoints;
        } else {
            this.getResponce();
        }

        let upTimer = setInterval(function () {
            self.getResponce();
        }, 35000);
    }
}







</script>