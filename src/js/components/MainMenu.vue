<template>
    <div>
        <div class="main-menu">
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
    </div>
</template>

<style scoped lang="less">
    .main-menu {
        margin-top: 55px;
        text-align: center;

        .root-icon-descr {
            color: #FFFFFF;
            position: relative;
            height: 35px;
            top: 200px;
            text-align: center;
            padding-top: 5px;
        }

        .root-icon-image {
            background-size: cover;
            width: 200px;
            height: 200px;
        }

        .root-icons {
            display: inline;
            align-items: center;
            text-align: center;
            padding: 0;
        }

        .root-icon {
            display: inline-block;
            width: 13%;
            height: 315px;
            margin-top: 20px;
            margin-right: 2%;
            margin-left: 20px;
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
    import axios from 'axios';
    import _ from 'lodash';


    export default {
        data(){
            return {
                ctgs: state.appState.MenuPoints,
                mainPosition: {},
                isDebug: false,
                currentLanguage: state.settings.language,
                test: true
            }
        },

        watch: {
            ctgs: function () {
            },
            $route: function () {
                this.getData();
            }
        },

        computed: {
            tabView: function () {
                this.ctgs = this.ctgs.map(function (item) {
                    item.route = 'menu/' + item.code;
                    item.style = 'background-image: url(' + state.settings.server + state.settings.urlBigImage + item.urlBigImage + ');';
                    return item;
                });
                return this.ctgs;
            },
        },

        methods: {
            getResponce(){
                let self = this;
                self.test = !self.test;
                const operation = {};
                operation.name = 'categories';
                ajax.exec(operation, function (resp) {
                    if (self.test) {
                        state.appState.MenuPoints = _.reverse(resp.data);
                    }
                    else {
                        state.appState.MenuPoints = resp.data;
                    }
                    console.log(666);
                    console.log(state.appState.MenuPoints);
                    self.ctgs = state.appState.MenuPoints.filter(function(item){
                        return item;
                    })
                });
            },
            getJsonCtgs(){
                let self = this;
                this.axios.get('./ctgs.js')
                    .then(function (response) {
                        self.ctgs = response.data;
                        state.appState.MenuPoints = self.ctgs;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            getData(){
                if (this.isDebug) {
                    this.getJsonCtgs();
                }
                else {
                    this.getResponce();
                }
            },

            getImageSrc(item){
                return state.settings.server + state.settings.urlBigImage + item.urlSmallImage;
            },

            getImageSrcBig(item){
                return state.settings.server + state.settings.urlBigImage + item.urlBigImage;
            },
        },

        mounted(){
            const self = this;
            this.currentLanguage = state.settings.language;
            if (state.appState.MenuPoints.length > 0) {
                self.ctgs = state.appState.MenuPoints;
            } else {
                this.getData();
            }

            let upTimer = setInterval(function () {
                self.getData();
            }, 15000);
        }
    }


</script>