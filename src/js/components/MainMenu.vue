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
                this.ctgs = this.$store.state.app.MenuPoints.map(function (item) {
                    item.route = 'menu/' + item.code;
                    item.style = 'background-image: url(../../../../../../' + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage + ');';
                    return item;
                });
                return this.ctgs;
            },
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

            getImageSrc(item){
                return '../../../../../../' + this.$store.state.settings.server + this.$store.state.settings.urlBigImage + item.urlSmallImage;
            },

            getImageSrcBig(item){
                return '../../../../../../' + this.$store.state.settings.server + this.$store.state.settings.urlBigImage + item.urlBigImage;
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

            console.log('Текущее состояние стора:');
            console.log(this.$store.state);

            let upTimer = setInterval(function () {
                self.getData();
                console.log(self.$store.state.settings.updateMenu);
            }, 45000);
        }
    }



</script>