<template>
    <div>
        <div class="white-panel"></div>
        <div class="sidebar">
            <header class="bp-header ">
            </header>
            <div class="dummy-logo">
                <img :src="urlLogo">
                <nav class="menu">
                    <nav class="menu__breadcrumbs"><a>Разделы</a></nav>
                    <div class="menu__wrap">
                        <ul class="menu__level menu__level--current" v-for="item in ctgs_with_params">
                            <li class="menu__item">
                                <router-link :to="item.route">
                                    <a class="menu__link sidebar menu__link__descr   current-link"
                                       :data-code="item.code"
                                       :class="item.newClass"
                                       :style="item.style"
                                       @click="getData">
                                        {{ item.name }}
                                    </a>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        </div>
        <div class="list">
            <positionslist :categoryId="currentCategoryId"/>
        </div>
    </div>
</template>
<style scoped lang="less">
    .list {
        padding-left: 300px;
    }

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
                padding-top: 60px;
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
                    margin: 0;
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
                padding: 6.3em 3.75em 1.5em 2.5em;
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
    import positionslist from './PositionsList.vue';
    import bus from './store/store';
    import mp from './store/currentStates';

    export default{
        data(){
            return{
                ctgs: [],
                urlLogo: '',
                currentSelectedId: this.$route.params.id
            }
        },
        computed: {
            ctgs_with_params: function() {
                var self = this;
                var res = this.ctgs.map(function(item) {
                    item.style = 'background-image: url(' + mp.settings.server + mp.settings.urlBigImage + item.urlSmallImage + ');';
                    item.route = '/ru/menu/'+ item.code;

                    if (+item.code ===+self.$route.params.id){
                        item.newClass = 'menu__link--current';
                    } else {
                        item.newClass = '';
                    }
                    return item;
                });
                return res;
            },
            currentCategoryId: function(){
                let newVal = this.$route.params.id;
                bus.$emit('select-cat-id', newVal);
                return newVal;
            }
        },
        methods: {
            getData: function(){
                //this.currentSelectedId = this.$route.params.id;
            }

        },
        components:{
            positionslist
        },
        mounted(){
            var self = this;
             var url = mp.settings.server + 'menu/hs/model?groups=';
             // http://10.10.250.61/img/beer-zha.png
             this.urlLogo = mp.settings.server +  mp.settings.urlSmallImage + mp.settings.images.logo;
             if (mp && mp.MenuPoints && mp.MenuPoints !== 0){
                self.ctgs = mp.MenuPoints;
             }
             else {
                 this.axios.get(url)
                            .then(function (response) {
                                self.ctgs = response.data;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        }
        }


    }

</script>
