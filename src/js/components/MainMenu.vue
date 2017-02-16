<template>
    <div>
        <div class="main-menu">
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
    </div>
</template>
<style scoped lang="less">
    .main-menu {
        .root-icon-descr {
            color: #FFFFFF;
            position: relative;
            height: 35px;
            top: 280px;
            text-align: center;
            padding-top: 5px;
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
    import mp from './store/currentStates';
    import ajax from './helpers/ajax.js';
    export default{
        data(){
            return {
                ctgs: []
            }
        },
        computed: {
            ctgs_with_params: function () {
                var res = this.ctgs.map(function (item) {
                    item.style = 'background-image: url(' +  mp.settings.server + mp.settings.urlBigImage + item.urlBigImage + ');';
                    item.route = 'menu/'+item.code;
                    return item;
                });
                return res;
            },
        },
        mounted(){
             var self = this;
             const operation = {};
             if (mp.appState.MenuPoints.length > 0){
                 self.ctgs = mp.appState.MenuPoints;
                 } else {
                    operation.name = 'categories';
                    ajax.exec(operation, function(resp){
                        self.ctgs = resp.data;
                        mp.appState.MenuPoints = resp.data;
                 });
             }
        }
    }

</script>
