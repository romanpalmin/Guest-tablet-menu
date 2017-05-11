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
    //import check from './helpers/checkFieldList.js';
    import getImg from './helpers/importImages.js';
    import axios from 'axios';
    import VueAxios from 'vue-axios';



    export default {
        data(){
            return {
                ctgs: [],
                mainPosition: {},
                isDebug: false,
                currentLanguage: this.$store.state.settings.language,
                test: true,
                isBrowser: false
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
                this.ctgs = this.$store.state.app.MenuPoints.map(function (item) {
                    item.route = 'menu/' + item.code;
                    //item.style = 'background-image: url(file:///storage/emulated/0/StreetFoodBar/images/group.jpg );';
                    item.style = 'background-image: url(file:///storage/emulated/0/StreetFoodBar/images'+item.urlBigImage + ')';
                    //item.style = 'background-image: url(' + self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage + ');';
                    //console.log(self.isBrowser);
                    /*if (!self.isBrowser){
                               var img = new Image();
                               alert('Текущая строка: file:///storage/emulated/0/StreetFoodBar/images'+item.urlBigImage);
                               img.src = 'file:///storage/emulated/0/StreetFoodBar/images'+item.urlBigImage;
                               img.onload = function(){
                                   alert('Есть');
                                   item.style = 'background-image: url(file:///storage/emulated/0/StreetFoodBar/images'+item.urlBigImage + ')';
                               }
                               img.onerror = function(){
                                    alert('Нет');
                                    getImg(self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage);
                                    item.style = 'background-image: url(' + self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage + ');';
                               };
                        }

                    else {
                            console.log('Browser');
/*                            var img = new Image();
                            img.src = 'http://lol111111.ru/ololoshka.png';
                            img.onload = function(){console.log('картинка существует')};
                            img.onerror = function(){console.log('картинка не существует')};

                            item.style = 'background-image: url(' + self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage + ')';
                        }*/
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
                        //console.log('Проверка обновлений');
                         setTimeout(function(){
                         //console.log('Новое значчение:' + self.$store.state.app.LastTimeUpdate);
                         if (lastUpdate !== self.$store.state.app.LastTimeUpdate){
                             console.log('Обновляем номенклатуру');
                             self.getData();
                         }
                          else {
                              console.log('Обновление не требуется');
                          }
                         }, 1000)};
                self.$store.dispatch('GET_LAST_UPDATE', {callback: callback});
            }, 7000);
        }
    }



</script>