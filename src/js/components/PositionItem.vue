<template>
    <div>
        <div class="content-item-container">
            <div class="item-close"><img class="item-image" :src="urlClose" @click="close()">
            </div>
            <div class="inner-item-container">
                <div class="item-column-image">
                    <img :src="urlFromParents" class="item-image" :style="lighting">
                    <div class="current-vitrina" v-if="yacheikaFromParent!==''">
                        <span>Витрина: {{vitrinaFromParent}}</span>
                        <span>Ячейка: {{yacheikaFromParent}}</span>
                    </div>
                </div>
                <div class="item-column-data">
                    <div class="h1-item capital">{{nameFromParent | deleteQuotes | deleteNewLines}}</div>
                    <div class="p-item">{{descriptionFromParent | deleteQuotes | deleteNewLines | addNewLine}}</div>
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

                    <div class="related-items" v-if="codeFromParent === '472020' && !isActive">
                        {{infoMessageBreakfast}}
                    </div>
                    <div class="related-items" v-if="codeFromParent === '482020' && !isActive">{{infoMessageLunch}}
                    </div>

                    <div class="item-bottom-buttons" v-if="showButtons">
                        <div class="btn add-to-cart" @click="add2cart(positionId)" :style="addingToCartStyle">
                            {{addingToCartTitle}}
                        </div>
                        <div class="btn" v-if="yacheikaFromParent!==''" @click="showInLamp(yacheikaFromParent)">
                            Показать
                        </div>

                        <div class="related-items" v-if="relatedFromParent.length!==0">
                            С этим товаром часто заказывают
                            <div class="p-item-related ">
                                <div v-for="rel in relatedFromParent" :data-Code="rel.code"
                                     @click="add2CartAdditional(rel.code)" :style="addingToCartStyleAdditional">
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
                }
                .span-plus {
                    position: relative;
                    /*bottom: 12px;*/
                    bottom: 40px;
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
                }
            }
        }
    }

</style>
<script>

    export default {
            data(){
                return{
                    positionSet : {},
                    urlClose : '',
                    addToCartBtn: '',
                    IsAddingToCart: false,
                    IsAddingAdditonal: false,
                    settings: this.$store.state.settings,
                    countOfCharset: 0
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
                },
                addNewLine: function(value){
                  if (!value) return '';
                  value = value.toString();
                  return value.replace(/,/g, ',\n');
                }
            },

            computed:{
                codeFromParent: function() {return this.code},
                isActive: function() {return this.activeTime},
                urlFromParents : function() {
                    const self = this;
                    let url = '';
                        if (self.$store.state.app.LocalPaths.LargePositions[this.positionId]){
                            url = 'file:///storage/emulated/0/StreetFoodBar/images/' + self.$store.state.app.LocalPaths.LargePositions[this.positionId];
                        } else {
                            url = this.$store.state.settings.urlBase + this.settings.urlBigImage + this.urlImageLarge;
                        }
                    return url;
                },
                priceFromParent : function () {return this.price;},
                nameFromParent : function () {return this.name;},
                descriptionFromParent : function() {return this.description},
                yacheikaFromParent: function () { return this.yacheika },
                addingToCartTitle : function(){ return this.IsAddingToCart  ? 'Добавление' : 'Выбрать';},
                addingToCartStyle: function() { return this.IsAddingToCart  ? "background:#dbdbd7" : '';},
                addingToCartStyleAdditional: function() { return this.IsAddingAdditonal ? "opacity:0.5" : '1';},
                showButtons: function(){ return this.settings.showButtons && this.activeTime ;},
                vitrinaFromParent: function(){ return this.vitrina ;},
                relatedFromParent: function(){ return this.related ;},
                lighting: function(){
                    if (this.yacheika!==''){
                        return ';box-shadow: 0px 0px 30px #CCDDFF;';
                    }
                },
                infoMessageBreakfast: function(){
                    let msg = '';
                    let language = this.settings.language;
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
                    let language = this.settings.language;
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

            props: ["positionId", "urlImageLarge", "name", "price", "description", 'yacheika', 'activeTime', 'vitrina', "related", "code", "charset"],

            methods:{
                close(){
                    this.$parent.showDetails = false;
                    this.$store.commit('SET_SELECTED_POSITION', {});
                },

                getCharset(chr){
                    let ret = chr.urlImage;
                    if (chr.urlImage[0] === '/'){
                        ret = chr.urlImage.slice(1);
                    }
                    return ret;
                    //return chr.urlImage;
                },

                add2cart: function(id){
                      if (this.IsAddingToCart) return;
                      let self = this;
                      this.IsAddingToCart = true;
                      let payload = {
                        positionId: this.positionId,
                        TableNumberPrimary: this.$store.state.app.TableNumberPrimary,
                        callback: function(){
                            self.IsAddingToCart = false
                            }
                      };
                      this.$store.dispatch('ADD_TO_CART', payload);

                },

                add2CartAdditional: function(id){
                    if (this.IsAddingAdditonal) return;
                    let self = this;
                    this.IsAddingAdditonal = true;
                      let payload = {
                        positionId: id,
                        TableNumberPrimary: this.$store.state.app.TableNumberPrimary,
                        callback: function(){
                            self.IsAddingAdditonal = false;
                         }
                      };
                      this.$store.dispatch('ADD_TO_CART', payload);
                },

                showInLamp: function(id){
                    let data = {currentId: id}
                    this.$store.dispatch('TURN_ON_LAMP', data);
                },

                getRelatedStyle: function(item){
                    let res = '';
                    const self = this;
                    if (self.$store.state.app.LocalPaths.Positions[item.code]){
                            res = 'file:///storage/emulated/0/StreetFoodBar/images/' + self.$store.state.app.LocalPaths.Positions[item.code];
                        } else {
                            res = this.$store.state.settings.urlBase + this.settings.urlBackImage + item.urlImage;
                        }
                    return 'background-image: url(' + res + ');';
                }

            },

            mounted(){
                this.urlClose = this.$store.state.settings.urlBase + this.settings.urlSmallImage + this.settings.images.close;
            }
    }







</script>
