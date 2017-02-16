<template>
    <div>
        <div class="content-item-container">
            <div class="item-close"><img class="item-image" :src = "urlClose" @click="$parent.showDetails=false">
            </div>
            <div class="inner-item-container">
                <div class="item-column-image">
                     <img :src="urlFromParents" class="item-image">
                </div>
                <div class="item-column-data">
                    <div class="h1-item">{{nameFromParent | deleteQuotes | deleteNewLines}}</div>
                    <div class="p-item">{{descriptionFromParent | deleteQuotes | deleteNewLines}}</div>
                    <div class="item-price">{{priceFromParent | deleteQuotes | deleteNewLines}} P</div>
                        <div class="item-bottom-buttons">
                            <div class="btn add-to-cart" @click="add2cart(positionId)" :style="addingToCartStyle"> {{addingToCartTitle}} </div>
                            <div class="btn" v-if="yacheikaFromParent!==''" @click="showInLamp(yacheikaFromParent)"> Показать </div>
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
        top: 58px;
        left: 0;
        display: block;
        z-index: 999;
        background-color: #2e2e2e;
        opacity: 0.99;
        position: fixed;



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
                    IsAddingToCart: false
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
                urlFromParents : function() {return state.settings.server + state.settings.urlBigImage + this.urlImageLarge;},
                priceFromParent : function () {return this.price;},
                nameFromParent : function () {return this.name;},
                descriptionFromParent : function() {return this.description},
                yacheikaFromParent: function () { return this.yacheika },
                addingToCartTitle : function(){ return this.IsAddingToCart ? 'Добавление' : 'Выбрать';},
                addingToCartStyle: function() { return this.IsAddingToCart ? "background:gray" : '';}

            },

            props: ["positionId", "urlImageLarge", "name", "price", "description", 'yacheika'],

            methods:{
                add2cart: function(id){
                    if (this.IsAddingToCart) return;
                    let self = this;
                    this.IsAddingToCart = true;
                    let cUrl = `groups=1&addcart=1&tovar=${this.positionId}`;
                    ajax.addToOrder(cUrl, function (response) {
                            if (response.data === 1){
                                url = 'groups=1&korzina=1';
                                ajax.getOrders(url, function(response){
                                    state.appState.orders.currentState = response.data;
                                    self.IsAddingToCart = false;
                                });
                            } else {
                                this.IsAddingToCart = false;
                            }
                      })
                },

                showInLamp: function(id){
                    console.log('Подсвечиваем товар и шлем обратно');
                    console.log(state.settings.server + 'menu/hs/model?groups=1&tovar=1&yacheika=' + id );
                },

                getData: function(id){
                    let url = '';
                    const self = this;
                    url = state.settings.server + 'menu/hs/model?groups=1&category=1&tovar=' + id;
                    this.axios.get(url)
                        .then( (response) => {
                            console.log(response.data);
                            this.positionSet = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                },

            },

            mounted(){
                //this.getData(this.positionId);
                this.urlClose = state.settings.server + state.settings.urlSmallImage + state.settings.images.close;
            }
    }
</script>
