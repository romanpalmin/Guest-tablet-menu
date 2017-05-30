<template>
    <div>
        <div class="white-panel"></div>
        <div class="sidebar">
            <header class="bp-header ">
            </header>
            <div class="dummy-logo">
                <img :src="urlLogo">
                <nav class="menu">
                    <div class="menu__wrap">
                        <ul class="menu__level menu__level--current" v-for="item in ctgs_with_params">
                            <li class="menu__item">
                                <router-link :to="item.route">
                                    <a class="menu__link sidebar menu__link__descr   current-link"
                                       :data-code="item.code"
                                       :class="item.newClass"
                                       :style="item.style"
                                    >
                                        {{ item.name }}
                                    </a>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .white-panel {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 100%;
        background-color: #ffffff;
        z-index: -1;
    }

    .current-link {
        letter-spacing: 1px;
        text-transform: uppercase;
        white-space: nowrap;
        text-decoration: none;
        a {
            text-decoration: none;
            color: #888888;
            outline: none;
        }
    }

    .sidebar {
        *, *:after, *:before {
            box-sizing: border-box;
        }

        .bp-header {
            display: -webkit-flex;
            display: flex;
        }

        .cf:before, .cf:after {
            content: ' ';
            display: table;
        }

        .cf:after {
            clear: both;
        }

        .dummy-logo {
            position: fixed;
            top: 59px;
            left: 0;
            width: 300px;
            height: 220px;
            text-align: left;
            color: #3b3d4a;
            background: #F7F7F7;

            img {
                width: 100%;
                padding-left: 10%;
                padding-right: 10%;
                padding-top: 20px;
            }
        }

        .menu {

            .menu__wrap {
                top: 3.5em;
                bottom: 0;
                overflow: hidden;
                width: 100%;
                background-color: white;

                .menu__level {
                    top: 0;
                    left: 0;
                    overflow: hidden;
                    overflow-y: scroll;
                    width: calc(100% + 50px);
                    height: 100%;
                    margin: -4px;
                    padding: 0;
                    list-style-type: none;
                }

                .menu__item {
                    display: block;
                    width: calc(100% - 50px);
                    color: #000000;
                    vertical-align: middle;
                    padding-top: 2px;
                }

                .menu__link {
                    font-weight: 600;
                    position: relative;
                    display: table;
                    padding: 1em 2.5em 1em 5.0em;
                    color: #000000;
                    -webkit-transition: color 0.1s;
                    transition: color 0.1s;
                    background-size: 50px 50px;
                    background-repeat: no-repeat;
                    background-position: 25px 0px;
                    &--current {
                        &::before {
                            content: '\00B7';
                            font-size: 1.5em;
                            line-height: 0;
                            position: absolute;
                            top: 50%;
                            left: 0.5em;
                            height: 10px;
                            color: #000000;
                        }
                    }
                }
            }

            top: 220px;
            left: 0;
            width: 300px;
            height: calc(100vh - 220px);
            background: #F7F7F7;

            .menu__breadcrumbs {
                font-size: 0.65em;
                line-height: 1;
                padding: 1.3em 3.75em 1.5em 2.5em;
                background-color: white;
                a {
                    font-weight: bold;
                    display: inline-block;
                    cursor: pointer;
                    vertical-align: middle;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: #000000;
                }
            }
        }
    }
</style>
<script>
    import getImg from './helpers/importImages.js';
    import LsPut from './helpers/lsPut.js';
    import LsGet from './helpers/lsGet.js';
    export default{
        data(){
            return {
                ctgs: this.$store.state.app.MenuPoints,
                settings: this.$store.state.settings
            }
        },
        props:["categoryId"],
        methods:{
            getStore(){
               /* console.log(this.$store.state.app);
                alert('Small: ' + JSON.stringify(this.$store.state.app.LocalPaths.Small));
                alert('Positions: ' + JSON.stringify(this.$store.state.app.LocalPaths.Positions));
                alert('Category: ' + JSON.stringify(this.$store.state.app.LocalPaths.Category));*/
            }
        },

        computed: {

            ctgs_with_params: function () {
                var self = this;
                var updateStorage = false;
                var cnt = 0;
                var payload = {};
                this.ctgs = this.$store.state.app.MenuPoints.map(function (item, index, arr) {
                    if (!self.$store.state.settings.isBrowser){
                                   //todo сюда проверку на соответствие картинки
                                   if (self.$store.state.app.LocalPaths.Small[item.code] === void 1){
                                        updateStorage = true;
                                        getImg(self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlSmallImage, function(res, isExist){
                                           if (isExist)
                                           {
                                                cnt++;
                                                if (cnt == arr.length){
                                                    //alert('Update sidebar');
                                                    self.ctgs = _.map(self.ctgs,(item)=>{return item;});
                                                }
                                           }
                                            payload = {
                                                type: 'small',
                                                name: item.code,
                                                value: res
                                           }
                                           self.$store.commit('SET_LOCAL_PATH', payload);
                                       });
                                   }
                                   else {
                                       item.style = 'background-image: url(file:///storage/emulated/0/StreetFoodBar/images/' +  self.$store.state.app.LocalPaths.Small[item.code] + ')';
                                   }
                    } else
                    {
                            item.style = 'background-image: url(' + self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage + ')';
                    }


                    item.route = '/' + self.settings.language + '/menu/' + item.code;

                    if (+item.code === +self.$route.params.id) {
                        item.newClass = 'menu__link--current';
                    } else {
                        item.newClass = '';
                    }
                    return item;
                });
                return this.ctgs;
            },
            urlLogo:function(){
                //let settings = this.$store.state;
                return this.$store.state.settings.urlBase + this.settings.urlSmallImage + this.settings.images.logo;
            }
        },
        mounted(){
            if ( this.$store.state.app.MenuPoints.length === 0) {
                 this.$store.dispatch('GET_CATEGORY');
                 this.ctgs = this.$store.state.app.MenuPoints;
            }
            var self = this;
        },
        destroyed(){
            var small = JSON.stringify(this.$store.state.app.LocalPaths.Small);
            LsPut("small", small);
        }

    }
</script>
