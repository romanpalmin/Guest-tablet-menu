<template>
    <div class="top rolling">
        <div class="div-overlay">
            <div>
                <ul v-for="item in currentData" class="products">
                    <div v-if="item.groups.length===0" class="product-group product-group-level-1">
                        <li>
                            <template v-if="!item.iconNameActiv">
                                <span class="product-group-title level-1"> {{item.name_RU}} </span>
                            </template>
                            <template v-else>
                                <img :src="getTitleImg(item)">
                                <!--Здесь будет размещена дополнительная к картинке текстовая информация -->
                            </template>
                            <ul class="products">

                                <div v-show="item.type === 'Иконками'">
                                    <li class="product" v-for="sub0 in item.items"
                                        @click="toggleDetailsItem(sub0, item)">
                                        <div class="product-inner">
                                            <div class="product-top-block" :style="getStyle(sub0)"
                                                 :data-Code="sub0.code">
                                                <div class="product-top-block-price" :data-Code="sub0.code">
                                                    {{sub0.price}}
                                                </div>
                                            </div>
                                            <div class="product-inner-label" :data-Code="sub0.code">
                                                <template v-if="!sub0.iconNameActiv">{{sub0.iconNameActiv}}
                                                    <div :style="getTitleStyle(sub0)">{{sub0.name | deleteQuotes}}</div>
                                                </template>
                                                <template v-else>
                                                    <img :src="getTitleImg(sub0)">
                                                    <!--Здесь будет размещена дополнительная к картинке текстовая информация -->
                                                </template>
                                            </div>
                                        </div>
                                    </li>
                                </div>

                                <div v-show="item.type === 'Списком'">
                                    <li class="product2" v-for="sub0 in item.items"
                                        @click="toggleDetailsItem(sub0, item)">
                                        <div class="product-inner2">
                                            <div class="product-inner-label2" :data-Code="sub0.code">
                                                <!-- @click="toggleDetailsItem(subitem)"-->
                                                {{sub0.name | deleteQuotes}}
                                            </div>
                                            <div class="product-top-block-price2" :data-Code="sub0.code">
                                                <!-- @click="toggleDetailsItem(subitem)"-->
                                                {{sub0.price}}
                                            </div>
                                            <div class="wrapper-for-add-btn">
                                                <div class="btn-add-to-cart" @click="add2cart(sub0.code)"
                                                     :style="addingToCartStyle">
                                                    {{addingToCartTitle}}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </li>
                    </div>
                    <div v-else="item.groups.length > 0" class="product-group product-group-level-1">
                        <li>
                            <template v-if="!item.iconNameActiv">
                                <span class="product-group-title level-1"> {{item.name_RU}} </span>
                            </template>
                            <template v-else>
                                <img :src="getTitleImg(item)">
                                <!--Здесь будет размещена дополнительная к картинке текстовая информация -->
                            </template>
                            <ul v-for="sub1 in sortArray(item.groups)" class="products">
                                <div v-if="sub1.groups.length===0">
                                    <li>
                                        <span class="product-group-title level-2">{{sub1.name_RU}}</span>
                                        <ul class="products">

                                            <div v-show="item.type === 'Иконками'">
                                                <li v-for="sub1item in sub1.items" class="product"
                                                    @click="toggleDetailsItem(sub1item, sub1)">
                                                    <div class="product-inner">
                                                        <div class="product-top-block" :style="getStyle(sub1item)"
                                                             :data-Code="sub1item.code">
                                                            <div class="product-top-block-price"
                                                                 :data-Code="sub1item.code">
                                                                {{sub1item.price}}
                                                            </div>
                                                        </div>
                                                        <div class="product-inner-label" :data-Code="sub1item.code">
                                                            <template v-if="!sub1item.iconNameActiv">
                                                                {{sub1item.iconNameActiv}}
                                                                <div :style="getTitleStyle(sub1item)">{{sub1item.name |
                                                                    deleteQuotes}}
                                                                </div>
                                                            </template>
                                                            <template v-else>
                                                                <img :src="getTitleImg(sub1item)">
                                                                <!--Здесь будет размещена дополнительная к картинке текстовая информация -->
                                                            </template>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div v-show="item.type === 'Списком'">
                                                <li class="product2" v-for="sub1item in sub1.items"
                                                    @click="toggleDetailsItem(sub1item, sub1)">
                                                    <div class="product-inner2">
                                                        <div class="product-inner-label2" :data-Code="sub1item.code">
                                                            <!-- @click="toggleDetailsItem(sub1item)"-->
                                                            {{sub1item.name | deleteQuotes}}
                                                        </div>
                                                        <div class="product-top-block-price2"
                                                             :data-Code="sub1item.code">
                                                            <!-- @click="toggleDetailsItem(sub1item)"-->
                                                            {{sub1item.price}}
                                                        </div>
                                                        <div class="wrapper-for-add-btn">
                                                            <div class="btn-add-to-cart"
                                                                 @click="add2cart(sub1item.code)"
                                                                 :style="addingToCartStyle">
                                                                {{addingToCartTitle}}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                        </ul>
                                    </li>
                                </div>
                                <!-- Раскомментировать, если появятся более вложенные уровни
                                <div v-else="sub1.groups.length > 0">
                                    <span class="product-group-title level-2">{{sub1.name_RU}}</span>
                                    <ul v-for="sub2 in item.groups">
                                        <div v-if="sub2.groups.length===0">
                                            <li>
                                                {{sub2.name_RU}}
                                                <ul v-for="sub2item in sub2.items">
                                                    <li>{{sub2item.name}}</li>
                                                </ul>
                                            </li>
                                        </div>
                                        <div v-else="sub2.groups.length > 0">
                                            {{sub2.name_RU}} + ...
                                        </div>
                                    </ul>
                                </div>-->
                            </ul>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
        <position v-if="showDetails"
                  :positionId="code"
                  :urlImageLarge="urlImageLarge"
                  :price="price"
                  :name="name"
                  :description="description"
                  :yacheika="yacheika"
                  :activeTime="activeTime"
                  :vitrina="vitrina"
                  :related="related"
                  :code="categoryId"
                  :charset="charset"
        />
    </div>
</template>
<style scoped lang="less">
    .top {
        padding-top: 70px;
    }

    .product-group {
        display: block;
        width: 100%;
        margin: 10px;
    }

    .product-group-level-1 {
        background-color: hsla(0, 0%, 50%, .2);
    }

    .product-group-title {
        font-family: 'Intro';
        color: #FFFFFF;
        padding-top: 10px;
        padding-left: 20px;
        text-align: left;
        margin-top: 40px;
        &.level-1 {
            height: 100px;
            font-size: 50px;
        }
        &.level-2 {
            height: 50px;
            font-size: 30px;
        }
    }

    .rolling {
        overflow-y: scroll;
        height: 100vh;
    }

    .product {
        display: inline-table;
        width: 190px;
        height: 235px;
        color: #ffffff;
        background-size: cover;
        margin: 10px;
    }

    .product2 {
        display: inline-table;
        width: 100%;
        height: 70px;
        margin: 10px;
        color: #FFFFFF;
        background-color: #808080;
    }

    .products {
        margin: 0;
        padding: 1em;
        text-align: left;
        user-select: none;
        list-style-type: none;

        .product-inner {
            .product-top-block {
                width: 190px;
                height: 190px;
                background-size: cover;
                border-radius: 30px;
                position: relative;

                .product-top-block-price {
                    width: 75px;
                    height: 77px;
                    background-size: cover;
                    position: absolute;
                    left: 125px;
                    top: -10px;
                    color: rgb(0, 0, 0);
                    text-align: center;
                    padding-left: 18px;
                    padding-top: 14px;

                }
            }

            .product-inner-label {
                width: 100%;
                height: 45px;
                color: #FFFFFF;
                padding-top: 1px;
                padding-left: 3px;
                padding-right: 3px;
                overflow: hidden;
                text-align: center;
            }
        }
    }

    .btn-add-to-cart {
        border-radius: 15px;
        background-color: #fff;
        color: #555;
        line-height: 30px;
        font-weight: 900;
        text-align: center;
        width: 150px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .product-top-block-price2 {
        display: table-cell;
        width: 75px;
        height: 77px;
        background-size: cover;
        color: #000000;
        text-align: center;
        padding-left: 5px;
        padding-right: 26px;
        padding-top: 25px;
        background-position-x: -20px;
        background-position-y: 10px;
    }

    .product-inner-label2 {
        display: table-cell;
        width: calc(100% - 100px);
        height: 100%;
        color: #FFFFFF;
        vertical-align: middle;
        font-size: 16px;
        padding-left: 15px;
        padding-right: 15px;
        overflow: hidden;
        text-align: left;
        max-width: 130px;
    }

    .product-inner2 {
        display: table-row;
    }

    .wrapper-for-add-btn {
        width: 100%;
    }

    *, *:after, *:before {
        box-sizing: border-box;
    }
</style>
<script>
    import _ from 'lodash';
    import Position from './PositionItem.vue';
    export default{
        data(){
            return{
                name:'New positions list',
                settings: this.$store.state.settings,
                data: [],
                IsAddingToCart: false,
                showDetails: false,

                code:0,
                urlImageLarge:'',
                price:0,
                name:'',
                description:'',
                yacheika:'',
                currentId: this.$route.params.id,
                activeTime: '',
                vitrina: '',
                related:[],
                charset:[]
            }
        },
        computed:{
            addingToCartTitle : function(){ return this.IsAddingToCart  ? 'Добавление' : 'Выбрать';},
            addingToCartStyle: function() { return this.IsAddingToCart  ? "background:#dbdbd7" : '';},
            currentData: function(){
                return _.sortBy(this.data, ['order']);
            }
        },
        watch:{
            categoryId: function(){
                this.rebuildData();
            }
        },

        props: ["categoryId"],

        filters:{
            deleteQuotes: function (value) {
              if (!value) return '';
              value = value.toString();
              return value.replace(/@/g, '"');
            }
        },

        methods:{
            getNewJson(){
                this.$store.dispatch('GET_FULL_TREE');
            },
            sortArray(arr){
                return _.sortBy(arr, 'order');
            },
            rebuildData(){
                const self = this;
                let category = _.filter(this.$store.state.app.FullTree, function(item){
                        return item.code === self.categoryId;
                    });
                this.data = _.filter(category[0].groups, (item)=>{return !(item.items.length === 0 && item.groups.length ===0)});
            },
            getTitleStyle(item){
                let res = '';
                if (item.textColor !==''){
                   res += ';color:'+item.textColor;
                }
                return res;
            },
            getTitleImg(item){
                return this.settings.urlBase + this.settings.server + this.settings.urlBackImage + item.iconName
            },
            getStyle(item){
                var self = this;
                var res='';
                var payload = {};
                if (item.yacheika !== null) {
                    res += ';box-shadow: 0px 0px 30px #CCDDFF;'
                }

                if (!self.$store.state.settings.isBrowser){
                    // todo добавляем различные проверки и загрузки картинок для планшета
                } else {
                        res += 'background-image: url(' + self.settings.urlBase + self.settings.server + self.settings.urlBackImage + item.urlImage + ');';
                        return res;
                    }

                return res;
            },
            add2cart: function(id){
                      if (this.IsAddingToCart) return;
                      let self = this;
                      this.IsAddingToCart = true;
                      let payload = {
                        positionId: id,
                        TableNumberPrimary: this.$store.state.app.TableNumberPrimary,
                        callback: function(){
                            self.IsAddingToCart = false
                            }
                      };
                      this.$store.dispatch('ADD_TO_CART', payload);

                },
            toggleDetailsItem: function(item, group){
                if (!group.modal){
                   //return;
                }

               this.code = item.code;
               this.urlImageLarge = item.urlImageLarge;
               this.price = item.price,
               this.name = item.name,
               this.description = item.description_ru,
               this.yacheika = item.yacheika === null ? '' : item.yacheika;
               this.activeTime = group.activeTime;
               this.vitrina = 'test';//item.vitrina;
               this.related = item.related;
               this.charset = item.charset;
               this.showDetails = true;
               this.$store.commit('SET_SELECTED_POSITION', item);
           }
        },
        mounted() {
            if (this.$store.state.app.FullTree && this.$store.state.app.FullTree.length === 0){
                this.getNewJson();
            }
            else {
                console.log('Данные уже загружены');
                this.rebuildData();
            }
        },
        components:{
            'position' : Position
        }
    }




</script>