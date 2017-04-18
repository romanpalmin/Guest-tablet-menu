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
            <table class="inner-table">
                <tr class="top-row">
                    <td colspan=10>
                        <template>
                            <div class="img-wrapper">
                                <router-link :to="mainPosition.route">
                                    <a>
                                        <div class="root-icon-image-bottom">
                                            <div id="svg" class="svg"></div>
                                            <div class="root-icon-descr">
                                                {{ mainPosition.name }}

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
            width: 170px;
            img {
                width: 100%;
            }
            .svg {
                width: 500px;
            }
        }
    }

    .main-menu {
        margin-left: 35px;
        text-align: center;

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
            width: 210px;
            height: 210px;
        }

        .root-icons {
            display: inline;
            align-items: center;
            text-align: center;
            padding: 0;
        }

        .root-icon {
            display: inline-block;
            width: 200px;
            height: 290px;
            margin-top: 75px;
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
    import axios from 'axios';
    import _ from 'lodash';
    //require ('../vendor/snap.svg-min.js');
    //require ('../vendor/SnapSVGAnimator.min.js');
    export default {
        data(){
            return {
                ctgs: [],
                showTabletView: true,
                mainPosition: {},
                isDebug: true,
                svg: {
                    jsonfile: '',
                    fps: 24,
                    width: 200,
                    height: 200,
                    AJAX_req: ''
                },
                svgUrl: '',
                showSvg: true
            }
        },

        watch: {
            ctgs: function () {
                this.showTabletView = this.defineView();
                if (!this.showTabletView) {
                    this.mainPosition = this.populateMainPosition();
                }
            }
        },

        computed: {
            tabView: function () {
                let res = this.ctgs.map(function (item) {
                    item.route = 'menu/' + item.code;
                    item.style = 'background-image: url(' + state.settings.server + state.settings.urlBigImage + item.urlSmallImage + ');';
                    return item;
                });
                return res;
            },

            ctgs_bottom: function () {
                let mainDish = this.populateMainPosition();
                let res = this.ctgs.map(function (item) {
                    item.route = 'menu/' + item.code;
                    return item;
                });
                res = _.filter(res, function (item) {
                    return item.code !== mainDish.code
                });
                return res;
            },
        },

        methods: {
            getResponce(){
                var self = this;
                const operation = {};
                operation.name = 'categories';
                ajax.exec(operation, function (resp) {
                    self.ctgs = resp.data;
                    state.appState.MenuPoints = self.ctgs;
                });
            },
            getJsonCtgs(){
                var self = this;
                const operation = {};
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

            defineView(){
                let notActive = _.filter(this.ctgs, {activeTime: '0'});
                return (notActive.length === 2);
            },

            populateMainPosition(){
                let ret = {};
                ret = _.filter(this.ctgs, function (o) {
                    return o.activeTime === '1' && (o.breakfast === '1' || o.lanhc === '1')
                });

                if (ret.length > 0) {
                    ret[0].route = 'menu/' + ret[0].code;
                    ret[0].img = state.settings.server + state.settings.urlBigImage + ret[0].urlBigImage;
                    this.svgUrl = 'assets/svg/' + ret[0].code + '.json';
                    if (this.svgUrl !== this.svg.json) {
                        this.showSvg = true;
                    }
                    this.svg.json = this.svgUrl;
                    this.AJAX_JSON_Req(this.svg.json);
                    return ret[0];
                }
            },
            getImageSrc(item){
                return state.settings.server + state.settings.urlBigImage + item.urlSmallImage;
            },

            getImageSrcBig(item){
                return state.settings.server + state.settings.urlBigImage + item.urlBigImage;
            },

            handle_AJAX_Complete() {
                if (this.svg.AJAX_req.readyState === 4 && this.svg.AJAX_req.status === 200) {
                    if (this.showSvg) {
                        const json = JSON.parse(this.svg.AJAX_req.responseText);
                        var container = document.getElementById("svg");
                        container.innerHTML = '';

                        const comp = new SVGAnim(
                            json,
                            this.svg.width,
                            this.svg.height,
                            this.svg.fps
                        );


                        container.appendChild(comp.s.node);
                        this.showSvg = false;
                    } else {
                    }
                }
            },

            AJAX_JSON_Req(url)
            {
                this.svg.AJAX_req = new XMLHttpRequest();
                this.svg.AJAX_req.open("GET", url, true);
                this.svg.AJAX_req.setRequestHeader("Content-type", "application/json");

                this.svg.AJAX_req.onreadystatechange = this.handle_AJAX_Complete;
                this.svg.AJAX_req.send();
            }

        },

        mounted(){
            const self = this;
            if (state.appState.MenuPoints.length > 0) {
                self.ctgs = state.appState.MenuPoints;
            } else {
                this.getData();
            }

            let title = state.settings.isTablet ? 'Планшет' : 'Уличный стенд';
            console.log(title);

            let upTimer = setInterval(function () {
                self.getData();
            }, 15000);
        }
    }


</script>