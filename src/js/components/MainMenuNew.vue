<template>
    <div>
        <div class="main-menu">
            <ul class="root-icons">
                <li class="root-icon" v-for="item in tabView">
                    <router-link :to="item.route">
                        <a :root-data-code="item.code">
                            <div class="root-icon-image" :style="item.style">
                                <div class="root-icon-descr intro-header">
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
            display: grid;
            vertical-align: baseline;
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
    export default{
        data(){
            return {
                name: 'this component',
                ctgs: [],
                mainPosition: {},
                currentLanguage: ''
            }
        },
        computed: {
            tabView: function () {
                const self = this;
                let cnt = 0;
                let payload = {};
                return this.$store.state.app.FullTree.map(function (item, index, arr) {
                    item.route = 'menu/' + item.code;
                    if (self.currentLanguage === 'ru') {
                        item.name = item.name_RU + '-test';
                    }
                    else {
                        item.name = item.name_EN + '-test';
                    }
                    if (!self.$store.state.settings.isBrowser) {
                        //todo сюда проверку на соответствие картинки
                        //alert(`${item.urlBigImage.slice(1)} === ${self.$store.state.app.LocalPaths.Category[item.code]} === ${item.urlBigImage.slice(1) === self.$store.state.app.LocalPaths.Category[item.code]}`);
                        if (self.$store.state.app.LocalPaths.Category[item.code] && (item.urlBigImage.slice(1) !== self.$store.state.app.LocalPaths.Category[item.code])) {
                            //alert('Обновляем картинку');
                            self.$store.state.app.LocalPaths.Category[item.code] = void 1;
                        }
                        //alert("Old: " + self.$store.state.app.LocalPaths.Category[item.code] + "\nNew: " + item.urlBigImage);
                        if (self.$store.state.app.LocalPaths.Category[item.code] === void 1) {
                            getImg(self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage, function (res, isExist) {
                                if (isExist) {
                                    cnt++;
                                    if (cnt == arr.length) {
                                        //alert('Update main menu');
                                        self.ctgs = _.map(self.ctgs, (item) => {
                                            return item;
                                        });
                                    }
                                }
                                payload = {
                                    type: 'category',
                                    name: item.code,
                                    value: res,
                                    callback: function () {
                                    }
                                };
                                self.$store.commit('SET_LOCAL_PATH', payload);
                            });
                        }
                        else {
                            item.style = 'background-image: url(file:///storage/emulated/0/StreetFoodBar/images/' + self.$store.state.app.LocalPaths.Category[item.code] + ')';
                        }

                    } else {
                        item.style = 'background-image: url(' + self.$store.state.settings.urlBase + self.$store.state.settings.server + self.$store.state.settings.urlBigImage + item.urlBigImage + ')';
                    }
                    return item;
                });
            }
        },

        methods: {
            getNewJson(){
                this.$store.dispatch('GET_FULL_TREE');
            }
        },

        mounted(){
            const self = this;
            this.currentLanguage = this.$store.state.settings.language;

            if (this.$store.state.app.FullTree && this.$store.state.app.FullTree.length === 0) {
                console.log('Формируем новые данные ');
                this.getNewJson();
            }
            else {
                console.log('Данные уже загружены');
            }
        }
    }
</script>