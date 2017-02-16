<template>
    <div class="rolling">
        <div clas="div-overlay">
            <div v-if="positionslist.tovar">
                <ul class="products">
                    <li class="product" v-for="item in positionsWithProps"  @click="toggleDetailsItem(item)">
                        <div class="product-inner">
                            <div class="product-top-block" :data-Code="item.code" :style="item.style">
                                <div class="product-top-block-price" :data-Code="item.code">
                                    {{ item.price }}
                                </div>
                            </div>
                            <div class="product-inner-label" :data-Code="item.code">
                                {{ item.name | deleteQuotes}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
                <ul class="products">
                    <li v-for="item in positionslist" class="product-group product-group-level-1">
                        <div class="product-group-level-1-descr">{{item.name | deleteQuotes}}</div>
                        <div v-if="item.groups1.length === 1">
                            <ul class="products">
                                <div v-show="item.type === 'ИКОНКАМИ'">
                                    <div v-if="item.groups1[0].tovar">
                                        <li class="product" v-for="subitem in item.groups1[0].tovar"
                                             @click="toggleDetailsItem(subitem)">
                                            <div class="product-inner">
                                                <div class="product-top-block" :style="getStyle(subitem)"
                                                     :data-Code="subitem.code">
                                                    <div class="product-top-block-price" :data-Code="subitem.code">
                                                        {{subitem.price}}
                                                    </div>
                                                </div>
                                                <div class="product-inner-label" :data-Code="subitem.code">
                                                    {{subitem.name | deleteQuotes}}
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    <div v-if="1">

                                    </div>
                                </div>

                                <div v-show="item.type === 'СПИСКОМ'">
                                    <li class="product2" v-for="subitem in item.groups1[0].tovar"
                                          @click="toggleDetailsItem(subitem)">
                                        <div class="product-inner2">
                                            <div class="product-inner-label2" :data-Code="subitem.code">
                                                {{subitem.name | deleteQuotes}}
                                            </div>
                                            <div class="product-top-block-price2" :data-Code="subitem.code">
                                                {{subitem.price}}
                                            </div>
                                        </div>
                                    </li>
                                </div>

                            </ul>
                        </div>
                        <div v-else>
                            <ul>
                                <li v-for="subgroups in item.groups1" class="product-group-level-2">
                                    <div class="product-group-level-2-descr">{{subgroups.name | deleteQuotes}}</div>
                                    <div v-if="subgroups.groups2.length === 1">
                                        <ul class="products">

                                            <div v-show="subgroups.type === 'СПИСКОМ'">
                                                <li class="product2" v-for="subItem in subgroups.groups2[0].tovar"
                                                     @click="toggleDetailsItem(subItem)">
                                                    <div class="product-inner2">
                                                        <div class="product-inner-label2" :data-Code="subItem.code">
                                                            {{subItem.name | deleteQuotes}}
                                                        </div>
                                                        <div class="product-top-block-price2" :data-Code="subItem.code">
                                                            {{subItem.price}}
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div v-show="subgroups.type === 'ИКОНКАМИ'">
                                                <li class="product" v-for="subItem in subgroups.groups2[0].tovar"
                                                     @click="toggleDetailsItem(subItem)">
                                                    <div class="product-inner">
                                                        <div class="product-top-block" :style="getStyle(subItem)"
                                                             :data-Code="subItem.code">
                                                            <div class="product-top-block-price"
                                                                 :data-Code="subItem.code">{{subItem.price}}
                                                            </div>
                                                        </div>
                                                        <div class="product-inner-label" :data-Code="subItem.code">
                                                            {{subItem.name | deleteQuotes}}
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                    <div v-else></div>
                                </li>
                            </ul>
                            <br/>
                        </div>
                    </li>
                </ul>
            </div>
            <position v-if="showDetails"
                      :positionId="code"
                      :urlImageLarge="urlImageLarge"
                      :price="price"
                      :name="name"
                      :description="description"
                      :yacheika="yacheika"
            />
        </div>
    </div>
</template>
<style scoped lang="less">
    .rolling {
        overflow-y: scroll;
        height: 100vh;
    }

    li {
        list-style-type: none; /* Убираем маркеры */
    }

    .product-group-level-2 {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .product-inner2 {
        display: table-row;
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
    }

    .div-overlay {
        overflow: auto;
    }

    .content {
        overflow-y: auto;
    }

    .product-group-level-1 {
        background-color: rgba(128, 128, 128, 0.2);
    }

    .product-group {
        display: block;
        width: 100%;
        margin: 10px;
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
        height: 80px;
        margin: 10px;
        color: #FFFFFF;
        background-color: #808080;
    }

    .product-group-level-1-descr {
        font-family: 'Intro';
        height: 100px;
        font-size: 50px;
        color: #FFFFFF;
        padding-top: 10px;
        padding-left: 20px;
        text-align: left;
        margin-top: 40px;
    }

    .product-group-level-2-descr {
        font-family: 'Intro';
        height: 60px;
        font-size: 54px;
        color: #EEEEEE;
        padding-left: 30px;
        text-align: left;
    }

    .product-top-block {
        width: 190px;
        height: 190px;
        background-size: cover;
        border-radius: 30px;
        position: relative;
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

    .products {
        margin: 0;
        padding: 1em;
        text-align: left;
        user-select: none;
    }

    .products {
        margin: 0;
        padding: 1em;
        text-align: left;
        user-select: none;

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

    *, *:after, *:before {
        box-sizing: border-box;
    }


</style>
<script>
    import Position from './PositionItem.vue';
    import state from './store/currentStates';
    import ajax from './helpers/ajax'

     export default{
        data(){
            return{
                    positionslist: [],
                    newList: {},
                    showDetails: false,
                    code:0,
                    urlImageLarge:'',
                    price:0,
                    name:'',
                    description:'',
                    yacheika:'',
                    currentId: this.$route.params.id
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
        computed: {
            positionsWithProps: function () {
                var self = this;
                var res = this.positionslist['tovar'].map(function (item) {
                    item.style = 'background-image: url(' + state.settings.server + state.settings.urlBackImage + item.urlImage + ');';
                    if (item.vitrina === '1') {
                        item.style += ';box-shadow: 0px 0px 30px #CCDDFF;'
                    }
                    return item;
                });
                return res;
            }
        },
        watch: {
            categoryId: function(){
                this.getJson(this.categoryId);
            }
        },

        methods: {
            getStyle: function(item){
                var self = this;
                var res = 'background-image: url(' + state.settings.server + state.settings.urlBackImage + item.urlImage  + ');';
                if (item.vitrina === '1') {
                    res += ';box-shadow: 0px 0px 30px #CCDDFF;'
                }
                return res;
            },

            toggleDetailsItem: function(item){
               this.code = item.code;
               this.urlImageLarge = item.urlImageLarge;
               this.price = item.price,
               this.name = item.name,
               this.description = item.description,
               this.yacheika = item.yacheika
               this.showDetails = true;
           },

            getJson: function (catId) {
                var self = this;
                var testSet = {};
                if (state.appState.Category[catId].currentState.length > 0){
                    this.positionslist = state.appState.Category[catId].currentState;
                } else {
                    let cUrl = `groups=${catId}&category=${catId}`;
                    ajax.getPositions(cUrl, function (response) {
                         self.formatJson(response.data);
                       });
                    }
            },
            formatJson: function (resp) {
                    if (resp.length === 1){
                        this.positionslist = resp[0];
                    } else {
                        this.positionslist = resp;
                    }
                    state.appState.Category[this.$route.params.id].currentState = this.positionslist;
                }
        },
        mounted(){
            this.currentId = this.$route.params.id;
            this.getJson(this.currentId);
        },
        components:{
            'position' : Position
        }
    }
</script>
