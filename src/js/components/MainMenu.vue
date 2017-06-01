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
        margin-top: 130px;
        text-align: center;

        .root-icon-descr {
            color: #FFFFFF;
            position: relative;
            height: 35px;
            top: 200px;
            text-align: center;
            padding-top: 5px;
            font-size: larger;
            font-weight: bold;
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
            margin-left: -25px;
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
                //LsGet("small",(data)=>{alert("Данные из локалстоража Small: " + data)});
                var self = this;
                var cnt = 0;
                var payload = {};
                var updateLocalStorage = false;
                this.ctgs = this.$store.state.app.MenuPoints.map(function (item, index, arr) {
                    item.route = 'menu/' + item.code;
                    if (!self.$store.state.settings.isBrowser){
                                   //todo сюда проверку на соответствие картинки
                                   //alert(`${item.urlBigImage.slice(1)} === ${self.$store.state.app.LocalPaths.Category[item.code]} === ${item.urlBigImage.slice(1) === self.$store.state.app.LocalPaths.Category[item.code]}`);
                                   if (self.$store.state.app.LocalPaths.Category[item.code] && (item.urlBigImage.slice(1) != self.$store.state.app.LocalPaths.Category[item.code])){
                                        //alert('Обновляем картинку');
                                        self.$store.state.app.LocalPaths.Category[item.code] = void 1;
                                   }
                                   //alert("Old: " + self.$store.state.app.LocalPaths.Category[item.code] + "\nNew: " + item.urlBigImage);
                                   if (self.$store.state.app.LocalPaths.Category[item.code] === void 1){
                                        getImg(self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage, function(res, isExist){
                                           if (isExist)
                                           {
                                                cnt++;
                                                if (cnt == arr.length){
                                                    //alert('Update main menu');
                                                    self.ctgs = _.map(self.ctgs,(item)=>{return item;});
                                                }
                                           }
                                           payload = {
                                                type: 'category',
                                                name: item.code,
                                                value: res,
                                                callback: function(){
                                                }
                                           }
                                           self.$store.commit('SET_LOCAL_PATH', payload);
                                       });
                                   }
                                   else {
                                       item.style = 'background-image: url(file:///storage/emulated/0/StreetFoodBar/images/' +  self.$store.state.app.LocalPaths.Category[item.code] + ')';
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
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null){
                if (JSON.stringify(this.$store.state.app.LocalPaths.Category) === '{}'){
                        //alert('Данные из LS1');
                        try{
                                var payload = {
                                       type: 'category',
                                       value: JSON.parse(data)
                                     }
                                self.$store.commit('SET_LOCAL_PATH_FULL', payload);
                            }
                        catch(err){
                            alert(err);
                        }
                    }
                }

            });
            const self = this;
            this.currentLanguage = this.$store.state.settings.language;

            /*if (this.$store.state.app.MenuPoints.length > 0) {
                self.ctgs = this.$store.state.app.MenuPoints;
            } else {
                this.getData();
            }*/
             if (this.$store.state.app.MenuPoints.length > 0) {
                self.ctgs = this.$store.state.app.MenuPoints;
            } else {
                LsGet("MenuPoints", (data)=>{
                    let arr = [];
                    if (data !== null){
                            try{
                                let payload = JSON.parse(data);
                                self.$store.commit('SET_CATEGORY', payload);
                                self.ctgs = payload;
                                //alert('Test');
                                let key='';
                                let innerPayload={};//[payload.currentId].currentState = payload.currentData;
                                payload.forEach(function(item){
                                    //alert(JSON.stringify(item));
                                    key = 'cat' + item.code;
                                    //alert(JSON.stringify(self.$store.state.app));
                                    LsGet(key,(data)=>{
                                        innerPayload.currentId = item.code;
                                        innerPayload.currentData = JSON.parse(data);
                                        self.$store.commit('POPULATE_CATEGORY', innerPayload);
                                            //alert('commit ' + item.code);
                                    });
                                });
                            }
                            catch(err){
                                alert(err);
                            }
                    } else{
                        this.getData();
                    }
                });
            };



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
            }, 60000);
        },
        destroyed(){
            var category = JSON.stringify(this.$store.state.app.LocalPaths.Category);
            LsPut("category", category);
        }
    }



</script>