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
                            <div class="img-wrapper" v-for="item in mainView">
                                <router-link :to="item.route">
                                    <a>
                                        <div class="root-icon-image-bottom">
                                            <img :src="getImageSrcBig(item)">
                                            <div class="root-icon-descr">
                                                {{ item.name }}
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
                                        <img :src="getImageSrc(item)">
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
            height: 800px;
            vertical-align: middle;
        }

        .root-icon-image-bottom {
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
            self.getResponce();
        }, 15000);
    }
}

</script>