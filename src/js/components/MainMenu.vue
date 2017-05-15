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

    import _ from 'lodash';
    import checkFile from './helpers/checkForExist.js';
    import getImg from './helpers/importImages.js';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    import LsPut from './helpers/lsPut.js';
    import LsGet from './helpers/lsGet.js';


    export default {
        data(){
            return {
                ctgs: [],
                mainPosition: {},
                isDebug: false,
                currentLanguage: this.$store.state.settings.language,
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
                var self = this;
                var cnt = 0;
                var payload = {};
                var updateLocalStorage = false;
                this.ctgs = this.$store.state.app.MenuPoints.map(function (item, index, arr) {
                    item.route = 'menu/' + item.code;
                    if (!self.$store.state.settings.isBrowser){
                                   if (self.$store.state.app.LocalPaths.Category[item.code] === void 1){
                                        updateLocalStorage = true;
                                        getImg(self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage, function(res, isExist){
                                           if (isExist)
                                           {
                                                cnt++;
                                                if (cnt == arr.length){
                                                    alert('Update');
                                                    self.ctgs = _.map(self.ctgs,(item)=>{return item;});
                                                }
                                           }
                                           payload = {
                                                type: 'category',
                                                name: item.code,
                                                value: 'file:///storage/emulated/0/StreetFoodBar/images/'+res,
                                                callback: function(){
                                                }
                                           }
                                           self.$store.commit('SET_LOCAL_PATH', payload);
                                       });
                                   }
                                   else {
                                       item.style = 'background-image: url(' +  self.$store.state.app.LocalPaths.Category[item.code] + ')';
                                   }

                    } else
                    {
                            item.style = 'background-image: url(' + self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage + ')';
                    }

                    return item;

                });
                return this.ctgs;
            }
        },

        methods: {
            getResponce(){
                const self = this;
                this.$store.dispatch('GET_CATEGORY', {callback: function(){
                    self.populatePositions();
                }});

             },

            getData(){
                this.getResponce();
            },

            populatePositions(){
                this.$store.dispatch('GET_ALL_POSITIONS');
            }
        },

        mounted(){
            LsGet("category",(data)=>{
                //alert('data from LS: ' + data);
                alert(JSON.parse(data));
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null){
                    self.$store.state.app.LocalPaths.Category = JSON.parse(data);
                }

            });

            //var test2 = JSON.parse(test);
            //console.log(test);
            const self = this;
            this.currentLanguage = this.$store.state.settings.language;
            if (this.$store.state.app.MenuPoints.length > 0) {
                self.ctgs = this.$store.state.app.MenuPoints;
            } else {
                this.getData();
            }
            let upTimer = setInterval(function () {
                  let payload = {};
                  let lastUpdate = self.$store.state.app.LastTimeUpdate;
                  console.log('Старое знаечение:' + lastUpdate);
                  let callback = function(){
                         setTimeout(function(){
                         if (lastUpdate !== self.$store.state.app.LastTimeUpdate){
                             console.log('Обновляем номенклатуру');
                             self.getData();
                         }
                          else {
                              console.log('Обновление не требуется');
                          }
                         }, 1000)};
                self.$store.dispatch('GET_LAST_UPDATE', {callback: callback});
            }, 7000000);
        },
        destroyed(){
            var category = JSON.stringify(this.$store.state.app.LocalPaths.Category);
            LsPut("category", category);
        }
    }



</script>