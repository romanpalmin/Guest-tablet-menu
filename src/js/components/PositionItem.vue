<template>
    <div>
        <div class="content-item-container">
            <div class="item-close"><img class="item-image" :src="urlClose" @click="$parent.showDetails=false">
            </div>
            <div class="inner-item-container">
                <div class="item-column-image">
                    <img :src="urlFromParents" class="item-image" :style="lighting">
                    <div class="current-vitrina" v-if="yacheikaFromParent!==''">
                        <span>Витрина: {{vitrinaFromParent}}</span>
                        <span>Ячейка: {{yacheikaFromParent*1}}</span>
                    </div>
                </div>
                <div class="item-column-data">
                    <div class="h1-item">{{nameFromParent | deleteQuotes | deleteNewLines}}</div>
                    <div class="p-item">{{descriptionFromParent | deleteQuotes | deleteNewLines}}</div>
                    <div class="item-price">{{priceFromParent | deleteQuotes | deleteNewLines}} P</div>

                    <div class="related-items" v-if="codeFromParent === '472020' && !isActive">{{infoMessageBreakfast}}</div>
                    <div class="related-items" v-if="codeFromParent === '482020' && !isActive">{{infoMessageLunch}}</div>

                    <div class="item-bottom-buttons" v-if="showButtons">
                        <div class="btn add-to-cart" @click="add2cart(positionId)" :style="addingToCartStyle">
                            {{addingToCartTitle}}
                        </div>
                        <div class="btn" v-if="yacheikaFromParent!==''" @click="showInLamp(yacheikaFromParent)">
                            Показать
                        </div>

                    <div class="related-items" v-if="relatedFromParent.length!==0">
                        <div v-for="rel in relatedFromParent" :data-Code="rel.code" @click="add2CartAdditional(rel.code)" :style="addingToCartStyleAdditional">
                            <div :style="getRelatedStyle(rel)" class="related-item">
                                <div class="related-item-price product-top-block-price" :data-Code="rel.code">
                                    {{rel.price}}
                                </div>
                                <div class="related-item-title">{{rel.name | deleteQuotes}}</div>
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
                width: 47%;
                float: left;
                padding-left: 15px;
                padding-top: 15px;
                padding-right: 30px;
                .item-image {
                    width: 90%;
                    height: auto;
                    border-radius: 30px;
                }
            }
            .item-column-data {
                .related-items {
                    float: left;
                    width: 100%;
                    .related-item {
                        min-width: 100px;
                        min-height: 100px;
                        padding: 10px;
                        float: right;
                        margin: 20px;
                        background-size: cover;
                        border-radius: 30px;
                        position: relative;
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
                        .related-item-title{
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
                    display: inline-block;
                    .btn {
                        width: 200px;
                        height: 60px;
                        border-radius: 15px;
                        background-color: #fff;
                        color: #555;
                        float: right;
                        margin: 20px;
                        line-height: 60px;
                        text-align: center;
                        font-size: x-large;
                        font-weight: 900;
                    }
                }
            }
        }
    }

</style>
<script>
    import state from './store/currentStates';
    import ajax from './helpers/ajax'

    export default {
            data(){
                return{
                    positionSet : {},
                    urlClose : '',
                    addToCartBtn: '',
                    IsAddingToCart: false,
                    IsAddingAdditonal: false
                }
            },
            filters:{
                deleteQuotes: function (value) {
                  if (!value) return '';
                  value = value.toString();
                  return value.replace(/@/g, '"');
                },
                deleteNewLines: function (value) {
                  if (!value) return '';
                  value = value.toString();
                  return value.replace(/#/g, ' ');
                }
            },

            computed:{
                codeFromParent: function() {return this.code},
                isActive: function() {return this.activeTime},
                urlFromParents : function() {return state.settings.server + state.settings.urlBigImage + this.urlImageLarge;},
                priceFromParent : function () {return this.price;},
                nameFromParent : function () {return this.name;},
                descriptionFromParent : function() {return this.description},
                yacheikaFromParent: function () { return this.yacheika },
                addingToCartTitle : function(){ return this.IsAddingToCart  ? 'Добавление' : 'Выбрать';},
                addingToCartStyle: function() { return this.IsAddingToCart  ? "background:#dbdbd7" : '';},
                addingToCartStyleAdditional: function() { return this.IsAddingAdditonal ? "opacity:0.5" : '1';},
                showButtons: function(){ return state.settings.showButtons && this.activeTime ;},
                vitrinaFromParent: function(){ return this.vitrina ;},
                relatedFromParent: function(){ return this.related ;},
                lighting: function(){
                    if (this.yacheika!==''){
                        return ';box-shadow: 0px 0px 30px #CCDDFF;';
                    }
                },
                infoMessageBreakfast: function(){
                    let msg = '';
                    let language = state.settings.language;
                    switch (language){
                        case 'ru':
                            msg = 'Завтраки подаются с 8.00 до 12.00';
                            break;
                        case 'en':
                            msg = 'Breakfast are served from 8.00 to 12.00';
                    }
                    return msg;
                },
                infoMessageLunch: function(){
                    let msg = '';
                    let language = state.settings.language;
                    switch (language){
                        case 'ru':
                            msg = 'Ланчи подаются по будним дням с 12.00 до 16.00';
                            break;
                        case 'en':
                            msg = 'Lunches are served on weekdays from 12.00 to 16.00';
                    }
                    return msg;
                }
            },

            props: ["positionId", "urlImageLarge", "name", "price", "description", 'yacheika', 'activeTime', 'vitrina', "related", "code"],

            methods:{
                add2cart: function(id){
                    if (this.IsAddingToCart) return;
                    let self = this;
                    this.IsAddingToCart = true;
                    const options = {
                        name: 'addToOrder',
                        positionId: this.positionId,
                        tableId: state.appState.TableNumberPrimary
                    };
                    ajax.exec(options, function (response) {
                            if (response.data === 1){
                                options.name = 'order';
                                ajax.exec(options, function(response){
                                    state.appState.orders.currentState = response.data;
                                    self.IsAddingToCart = false;
                                })
                            } else {
                                self.IsAddingToCart = false;
                            }
                      })
                },

                add2CartAdditional: function(id){
                    if (this.IsAddingAdditonal) return;
                    let self = this;
                    this.IsAddingAdditonal = true;
                    const options = {
                        name: 'addToOrder',
                        positionId: id,
                        tableId: state.appState.TableNumberPrimary
                    };
                    ajax.exec(options, function (response) {
                            if (response.data === 1){
                                options.name = 'order';
                                ajax.exec(options, function(response){
                                    state.appState.orders.currentState = response.data;
                                    self.IsAddingAdditonal = false;
                                })
                            } else {
                                self.IsAddingAdditonal = false;
                            }
                      })
                },

                showInLamp: function(id){
                    console.log('Подсвечиваем товар и шлем обратно');
                    const operation = {
                        name: 'showLamp',
                        id: id
                    };
                    ajax.exec(operation);
                },

                getData: function(id){
                    let url = '';
                    const self = this;
                    const operations = {};
                    url = state.settings.server + 'menu/hs/model?groups=1&category=1&tovar=' + id;
                    operation.name = ''

                    this.axios.get(url)
                        .then( (response) => {
                            this.positionSet = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                },
                getRelatedStyle: function(item){
                    return 'background-image: url(' + state.settings.server + state.settings.urlBackImage + item.urlImage + ');';
                }

            },

            mounted(){
                //this.getData(this.positionId);
                this.urlClose = state.settings.server + state.settings.urlSmallImage + state.settings.images.close;
            }
    }

</script>
