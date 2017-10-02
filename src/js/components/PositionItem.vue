<template>
    <div>
        <div class="content-item-container">
            <div class="item-close"><img class="item-image" :src="urlClose" @click="close()">
            </div>
            <div class="inner-item-container">
                <div class="item-column-image">
                    <img :src="urlFromParents" class="item-image" :style="lighting">
                    <div class="current-vitrina" v-if="yacheikaFromParent!=='' && false">
                        <span>Витрина: {{vitrinaFromParent}}</span>
                        <span>Ячейка: {{yacheikaFromParent}}</span>
                    </div>
                </div>
                <div class="item-column-data">
                    <div class="h1-item capital">
                        <template v-if="$store.state.settings.language === 'ru'">
                            {{nameFromParentRu | deleteQuotes | deleteNewLines}}
                        </template>
                        <template v-else>
                            {{nameFromParentEn | deleteQuotes | deleteNewLines}}
                        </template>
                    </div>
                    <div class="p-item">
                        <template v-if="$store.state.settings.language === 'ru'">
                            {{descriptionFromParentRu | deleteQuotes | deleteNewLines | addNewLine}}
                        </template>
                        <template v-else>
                            {{descriptionFromParentEn | deleteQuotes | deleteNewLines | addNewLine}}
                        </template>
                    </div>
                    <div class="price-row">
                        <div class="charset-wrapper" v-if="charset.length>0">
                            <template class="charset" v-for="(chr, index) in charset"><img :src="getCharset(chr)"><span
                                    class="span-plus" v-if="index+1 < charset.length">+</span>
                            </template>
                        </div>
                        <div class="price-wrapper">
                            <div class="item-price">{{priceFromParent | deleteQuotes | deleteNewLines}} P</div>
                        </div>
                    </div>

                    <!--<div class="related-items" v-if="codeFromParent === '472020' && !isActive">-->
                    <div class="related-items" v-if="codeFromParent === '713232' && !isActive">
                        {{infoMessageBreakfast}}
                    </div>
                    <!--<div class="related-items" v-if="codeFromParent === '482020' && !isActive">{{infoMessageLunch}}-->
                    <div class="related-items" v-if="codeFromParent === '723232' && !isActive">{{infoMessageLunch}}
                    </div>
                    <div class="item-bottom-buttons">
                        <div class="buttons-add btn-small">
                            <div class="add-to-cart" @click="add2cart(positionId)" :style="addingToCartStyle">
                                <template v-if="$store.state.settings.language === 'ru'">
                                    {{addingToCartTitle}}
                                </template>
                                <template v-else>
                                    {{addingToCartTitleEng}}
                                </template>
                            </div>
                            <div class=" btn-add plus" @click="plusOne()" :style="addingToCartStyle">+</div>
                            <div class=" btn-add count" :style="addingToCartStyle">{{count}}</div>
                            <div class=" btn-add minus" @click="minusOne()" :style="addingToCartStyle">-</div>
                        </div>
                    </div>

                    <div class="item-bottom-buttons" v-if="showButtons">
                        <div class="buttons-show" v-if="yacheikaFromParent!==''">
                            <div class="btn" @click="showInLamp(yacheikaFromParent)">
                                <template v-if="$store.state.settings.language === 'ru'">
                                    Показать
                                </template>
                                <template v-else>
                                    Show
                                </template>
                            </div>
                        </div>
                        <div class="related-items" v-if="relatedFromParent.length!==0 || ancorFromParent">
                            <template v-if="$store.state.settings.language === 'ru'">
                                Предложение от шеф повара
                            </template>
                            <template v-else>
                                Proposal from chef
                            </template>
                            <div class="p-item-related ">
                                <div v-for="rel in relatedFromParent" :data-Code="rel.code"
                                     @click="add2CartAdditional(rel.code2)" :style="addingToCartStyleAdditional">
                                    <div :style="getRelatedStyle(rel)" class="related-item">
                                        <div class="related-item-price product-top-block-price" :data-Code="rel.code2">
                                            <template v-if="!IsAddingAdditonal">
                                                {{rel.price}}
                                            </template>
                                            <template v-else>
                                                <img class="trash" :src="getTrash()"/>
                                            </template>

                                        </div>
                                        <div class="related-item-title">
                                            <template v-if="$store.state.settings.language === 'ru'">
                                                {{rel.name_RU | deleteQuotes}}
                                            </template>
                                            <template v-else>
                                                {{rel.name_EN | deleteQuotes}}
                                            </template>
                                        </div>
                                    </div>

                                </div>
                                <div :style="getGroupName(ancorUrlFromParent, ancorFromParent)"
                                     class="related-item ancor" @click="goToPage(ancorFromParent)">

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .content-item-container {
        width: 100%;
        height: 100%;
        top: 56px;
        left: 0;
        display: block;
        z-index: 999;
        background-color: #2e2e2e;
        opacity: 0.99;
        position: fixed;

        .current-vitrina {
            width: 90%;
            text-align: center;
        }

        .item-close {
            top: 6%;
            left: 92%;
            width: 5%;
            height: 5%;
            position: relative;
            z-index: 999;
            .item-image {
                width: 100%;
                height: auto;
                border-radius: 30px;
            }
        }
        .inner-item-container {

            width: 90%;
            height: 70%;
            top: 5%;
            left: 5%;
            background-color: #000000;
            position: relative;
            overflow: auto;
            .item-column-image {
                display: inline-block;
                width: 45%;
                max-width: 45%;
                min-width: 45%;
                float: left;
                padding-left: 15px;
                padding-top: 15px;
                padding-right: 30px;
                .item-image {
                    width: 90%;
                    height: auto;
                    border-radius: 30px;
                }
                position: fixed;
            }
            .item-column-data {
                .related-items {
                    float: left;
                    width: 100%;
                    .related-item {
                        min-width: 100px;
                        min-height: 100px;
                        padding: 10px;
                        float: left;
                        margin: 20px;
                        background-size: cover;
                        border-radius: 30px;
                        position: relative;
                        margin-top: 40px;
                        .trash {
                            padding: 5px;
                        }
                        .related-item-price {
                            display: table-cell;
                            width: 80px;
                            height: 80px;
                            background-size: cover;
                            color: #000;
                            /* background-color: #965c5c; */
                            position: absolute;
                            right: -25px;
                            top: -20px;
                            line-height: 55px;
                            text-align: center;
                            padding-left: 8px;
                            padding-top: -20px;
                            margin-bottom: 10px;

                        }
                        .related-item-title {
                            position: absolute;
                            bottom: -70px;
                            text-align: center;
                            min-height: 70px;
                        }
                    }
                }
                display: inline-block;
                padding-left: 30px;
                padding-top: 15px;
                padding-right: 15px;
                vertical-align: top;
                width: 44%;
                float: right;
                .h1-item {
                    display: block;
                    font-size: 40px;
                    padding-bottom: 15px;
                    margin-bottom: 40px;
                    border-bottom: #FFFFFF;
                    border-bottom-width: medium;
                    border-bottom-style: solid;
                }
                .capital {
                    text-transform: uppercase;
                }
                .price-wrapper {
                    /*float: right;*/
                }
                .charset-wrapper {
                    float: left;
                    line-height: 125px;
                    margin-top: -50px;
                }
                .span-plus {
                    position: relative;
                    /*bottom: 12px;*/
                    bottom: 10px;
                }
                .p-item {
                    display: block;
                    font-size: 20px;
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                    text-align: justify;
                    border-bottom: #FFFFFF;
                    border-bottom-width: thin;
                    border-bottom-style: solid;
                }
                .p-item-related {
                    padding-bottom: 15px;
                    margin-bottom: 115px;
                    text-align: justify;
                    border-bottom: #FFFFFF;
                    border-bottom-width: thin;
                    border-bottom-style: solid;
                }
                .item-price {
                    display: block;
                    font-size: 70px;
                    padding-bottom: 15px;
                    text-align: right;
                }
                .item-button-add {
                    display: block;
                    font-size: 20px;
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                    text-align: center;
                    position: relative;
                    bottom: -100px;

                }
                .item-bottom-buttons {
                    display: block;
                    .btn {

                    }
                    .buttons-show {
                        width: 200px;
                        height: 60px;
                        border-radius: 15px;
                        background-color: #fff;
                        color: #555;
                        float: right;
                        line-height: 60px;
                        text-align: center;
                        font-size: x-large;
                        font-weight: 900;
                    }
                    .buttons-add {
                        &.btn-small {
                            height: 60px;
                            border-radius: 15px;
                            background-color: #fff;
                            color: #555;
                            float: right;
                            line-height: 60px;
                            text-align: center;
                            font-size: x-large;
                            font-weight: 900;
                            margin: 20px 0px 20px 20px;
                            div {
                                float: right;
                            }
                            .btn-add {
                                width: 60px;
                                &.plus {
                                    /*background-color: #2e6da4;*/
                                    border-right: 2px solid gray;
                                }
                                &.minus {
                                    /*background-color: #ff2c42;*/
                                    border-radius: 15px;
                                }
                                &.count {
                                    /*background-color: #d01e60;*/
                                    border-left: 2px solid gray;
                                    border-right: 2px solid gray;
                                }
                            }

                            .add-to-cart {
                                width: 200px;
                                height: 60px;
                                border-radius: 15px;
                                background-color: #fff;
                                color: #555;
                                float: right;
                                line-height: 60px;
                                text-align: center;
                                font-size: x-large;
                                font-weight: 900;
                                /*margin: 20px 0px 20px 20px;*/
                            }
                        }
                        /*div {
                            float: right;
                        }
                        .plus {
                            width: 30px;
                            background-color: #2e6da4;
                        }
                        .minus {
                            width: 30px;
                            background-color: #ff2c42;
                        }
                        .count {
                            width: 30px;
                            background-color: #d01e60;
                        }
                        .add-to-cart {
                            width: 30px;
                            background-color: #43793e;
                            .btn {
                                width: 200px;
                                height: 60px;
                                border-radius: 15px;
                                background-color: #fff;
                                color: #555;
                                float: right;
                                line-height: 60px;
                                text-align: center;
                                font-size: x-large;
                                font-weight: 900;
                                margin: 20px 0px 20px 20px;
                            }
                        }*/
                    }
                    /*.btn-plus_minus {
                        float: right;
                    }
                    .btn {
                        width: 200px;
                        height: 60px;
                        border-radius: 15px;
                        background-color: #fff;
                        color: #555;
                        float: right;
                        line-height: 60px;
                        text-align: center;
                        font-size: x-large;
                        font-weight: 900;
                        margin: 20px 0px 20px 20px;
                    }*/
                }
            }
        }
    }

</style>
<script>
    import getImg from './helpers/importImages.js';

    export default {
        data() {
            return {
                positionSet: {},
                urlClose: '',
                addToCartBtn: '',
                IsAddingToCart: false,
                IsAddingAdditonal: false,
                settings: this.$store.state.settings,
                countOfCharset: 0,
                count: 1
            }
        },
        filters: {
            deleteQuotes: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.replace(/@/g, '"');
            },
            deleteNewLines: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.replace(/#/g, ' ');
            },
            addNewLine: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.replace(/,/g, ',\n');
            }
        },

        computed: {
            codeFromParent: function () {
                return this.code
            },
            isActive: function () {
                return this.activeTime
            },
            urlFromParents: function () {
                const self = this;
                let url = '';
                if (self.$store.state.app.LocalPaths.LargePositions[this.positionId]) {
                    url = 'file:///storage/emulated/0/StreetFoodBar/images/' + self.$store.state.app.LocalPaths.LargePositions[this.positionId];
                } else {
                    url = this.$store.state.settings.urlBase + this.settings.urlBigImage + this.urlImageLarge;
                }
                return url;
            },
            priceFromParent: function () {
                return this.price;
            },
            nameFromParent: function () {
                return this.name;
            },
            nameFromParentRu: function () {
                return this.name_ru;
            },
            nameFromParentEn: function () {
                return this.name_en;
            },
            descriptionFromParent: function () {
                return this.description;
            },
            descriptionFromParentRu: function () {
                return this.description_ru;
            },
            descriptionFromParentEn: function () {
                return this.description_en;
            },
            yacheikaFromParent: function () {
                return this.yacheika;
            },
            addingToCartTitle: function () {
                return this.IsAddingToCart ? 'Добавление' : 'Выбрать';
            },
            addingToCartTitleEng: function () {
                return this.IsAddingToCart ? 'Adding' : 'Add';
            },
            addingToCartStyle: function () {
                return this.IsAddingToCart ? "background:#dbdbd7" : '';
            },
            addingToCartStyleAdditional: function () {
                return this.IsAddingAdditonal ? "opacity:0.5" : '1';
            },
            showButtons: function () {
                return this.settings.showButtons && this.activeTime;
            },
            vitrinaFromParent: function () {
                return this.vitrina;
            },
            relatedFromParent: function () {
                return this.related;
            },
            ancorFromParent: function () {
                console.log(this.ancor);
                return this.ancor;
            },
            ancorUrlFromParent: function () {
                return this.ancorUrl;
            },
            lighting: function () {
                if (this.yacheika !== '') {
                    return ';box-shadow: 0px 0px 30px #CCDDFF;';
                }
            },
            infoMessageBreakfast: function () {
                let msg = '';
                let language = this.settings.language;
                switch (language) {
                    case 'ru':
                        msg = 'Завтраки подаются с 8.00 до 12.00';
                        break;
                    case 'en':
                        msg = 'Breakfast are served from 8.00 to 12.00';
                }
                return msg;
            },
            infoMessageLunch: function () {
                let msg = '';
                let language = this.settings.language;
                switch (language) {
                    case 'ru':
                        msg = 'Ланчи подаются по будним дням с 12.00 до 16.00';
                        break;
                    case 'en':
                        msg = 'Lunches are served on weekdays from 12.00 to 16.00';
                }
                return msg;
            }
        },

        props: ["positionId", "urlImageLarge", "name", "name_ru", "name_en", "price",
            "description", "description_ru", "description_en", 'yacheika',
            'activeTime', 'vitrina', "related", "code", "charset", "ancorUrl", "ancor"],

        methods: {
            plusOne() {
                this.count++;
            },
            minusOne() {
                if (this.count > 1) this.count--;
            },
            goToPage(code) {
                let prefPath = `/${this.$store.state.settings.language}/menu/`;
                let path = '';
                const groups = this.$store.state.app.SourceTree.groups;
                let el = _.find(groups, (item) => {
                    return item.code === code;
                });
                if (el) {
                    path += el.root === '' ? code : el.root + '/' + code;
                }
                if (path !== '') {
                    this.$router.replace(path);
                }
                this.close();
            },
            close() {
                this.$parent.showDetails = false;
                this.$store.commit('SET_SELECTED_POSITION', {});
            },

            getCharset(chr) {
                let ret = chr.icon_URL;
                if (chr && chr.icon_URL[0] === '/') {
                    ret = chr.icon_URL.slice(1);
                }
                let res = this.$store.state.settings.urlBase + ret;
                return res;
            },

            add2cart: function (id) {
                if (this.IsAddingToCart) return;
                let self = this;
                this.IsAddingToCart = true;
                for (let cnt = 0; cnt < this.count; cnt++){
                    let payload = {
                        positionId: this.positionId,
                        TableNumberPrimary: this.$store.state.app.TableNumberPrimary/*,
                        callback: function () {
                            self.IsAddingToCart = false
                        }*/
                    };
                    this.$store.dispatch('ADD_TO_CART', payload);
                }


            },

            add2CartAdditional: function (id) {
                if (this.IsAddingAdditonal) return;
                let self = this;
                this.IsAddingAdditonal = true;
                let payload = {
                    positionId: id,
                    TableNumberPrimary: this.$store.state.app.TableNumberPrimary,
                    callback: function () {
                        self.IsAddingAdditonal = false;
                    }
                };
                this.$store.dispatch('ADD_TO_CART', payload);
            },

            showInLamp: function (id) {
                let data = {currentId: id};
                this.$store.dispatch('TURN_ON_LAMP', data);
            },

            getTrash() {
                const res = this.$store.state.settings.urlBase + this.settings.urlBigImage + 'basket2.png';
                return res;
            },

            getRelatedStyle: function (item) {
                let res = '';
                const self = this;
                if (self.$store.state.app.LocalPaths.Positions[item.code2]) {
                    res = 'file:///storage/emulated/0/StreetFoodBar/images/' + self.$store.state.app.LocalPaths.Positions[item.code2];
                } else {
                    res = this.$store.state.settings.urlBase + this.settings.urlBackImage + item.imgURL_Sm;
                }
                return 'background-image: url(' + res + ');';
            },
            getGroupName(url, code) {
                if (!url) return;
                const res = this.$store.state.settings.urlBase + this.settings.urlBackImage + url;
                return 'background-image: url(' + res + ');';
            }

        },

        mounted() {
            if (!this.$store.state.settings.isBrowser) {
                getImg(this.$store.state.settings.urlBase + this.settings.urlSmallImage + this.settings.images.close, (res, isExist) => {
                    if (isExist) {
                        this.urlClose = 'file:///storage/emulated/0/StreetFoodBar/images/' + res;
                    }
                })
            } else {
                this.urlClose = this.$store.state.settings.urlBase + this.settings.urlSmallImage + this.settings.images.close;
            }
        }
    }


</script>
