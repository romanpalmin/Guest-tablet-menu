<template>
    <div>
        <div class="main-menu" v-if="isTablet">
            <ul class="root-icons">
                <li class="root-icon" v-for="item in ctgs_with_params">
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
                <tr>
                    <td colspan="8"><br/><br/><br/><br/><br/><br/><br/> test</td>
                </tr>

                <tr>
                    <template v-for="item in ctgs_with_params_without_adding">
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
    .main-table{
        .inner-table{
            width: 100%;
            text-align: center;
            color: white;
            height: 100%;
        }

        .root-icon-image-bottom {
        }
    }


    .main-menu {
        .root-icon-descr {
            color: #FFFFFF;
            position: relative;
            height: 35px;
            top: 280px;
            text-align: center;
            padding-top: 5px;
        }

        .current-cell{
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
            margin-top: 30px;
            margin-right: 30px;
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
    export default{
        data(){
            return {
                ctgs: []
            }
        },
        computed: {
            ctgs_with_params: function () {
                var res = this.ctgs.map(function (item) {
                    item.style = 'background-image: url(' +  state.settings.server + state.settings.urlBigImage + item.urlSmallImage + ');';
                    item.route = 'menu/'+item.code;
                    return item;
                });
                return res;
            },
            ctgs_with_params_without_adding: function () {
                var res = this.ctgs.map(function (item) {
                    item.route = 'menu/'+item.code;
                    return item;
                });
                console.log(res);
                res = _.without(res, _.find(res, {code: '472020'}));
                res = _.without(res, _.find(res, {code: '482020'}));
                console.log(res);
                return res;
            },
            isTablet: function(){
                console.log(state.settings.isTablet);
                return state.settings.isTablet;
            }
        },

        methods:{
            getImageSrc(item){
                return state.settings.server + state.settings.urlBigImage + item.urlSmallImage;
            }
        },
        mounted(){
             var self = this;
             const operation = {};
             if (state.appState.MenuPoints.length > 0){
                 self.ctgs = state.appState.MenuPoints;
                 } else {
                    operation.name = 'categories';
                    ajax.exec(operation, function(resp){
                        self.ctgs = resp.data;
                        state.appState.MenuPoints = resp.data;
                 });
             }
             setTimeout(console.log(this.ctgs), 2000);
             this.isTablet = state.settings.isTablet;
             console.log(this.isTablet);
             if (state.settings.isTablet) {
                console.log('Планшет');
             }
             else {
                console.log('Уличный стенд');
             }

        }
    }





</script>
