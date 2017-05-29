<template>
    <div class="rolling">
        <div clas="div-overlay">
            <div v-if="positionslist.tovar">
                <ul class="products">
                    <li class="product" v-for="item in positionsWithProps" @click="toggleDetailsItem(item)">
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
                        <div v-if="item.groups1 && item.groups1.length === 1">
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
                                </div>

                                <div v-show="item.type === 'СПИСКОМ'">
                                    <div v-if="item.groups1[0].tovar">
                                        <li class="product2" v-for="subitem in item.groups1[0].tovar">
                                            <div class="product-inner2">
                                                <div class="product-inner-label2" :data-Code="subitem.code">
                                                    <!-- @click="toggleDetailsItem(subitem)"-->
                                                    {{subitem.name | deleteQuotes}}
                                                </div>
                                                <div class="product-top-block-price2" :data-Code="subitem.code">
                                                    <!-- @click="toggleDetailsItem(subitem)"-->
                                                    {{subitem.price}}
                                                </div>
                                                <div class="wrapper-for-add-btn">
                                                    <div class="btn-add-to-cart" @click="add2cart(subitem.code)"
                                                         :style="addingToCartStyle">
                                                        {{addingToCartTitle}}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                </div>

                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li v-for="subgroups in item.groups1" class="product-group-level-2" v-if="subgroups">
                                    <div v-if="subgroups.groups2 && subgroups.groups2.length === 1">
                                        <div class="product-group-level-2-descr"
                                             v-show="subgroups.name!=='' || subgroups">{{subgroups.name | deleteQuotes}}
                                        </div>

                                        <ul class="products">
                                            <div v-show="subgroups.type === 'СПИСКОМ'">
                                                <li class="product2" v-for="subItem in subgroups.groups2[0].tovar">
                                                    <div class="product-inner2">
                                                        <div class="product-inner-label2" :data-Code="subItem.code">
                                                            <!--@click="toggleDetailsItem(subItem)">-->
                                                            {{subItem.name | deleteQuotes}}
                                                        </div>
                                                        <div class="product-top-block-price2" :data-Code="subItem.code">
                                                            <!-- @click="toggleDetailsItem(subItem)">-->
                                                            {{subItem.price}}
                                                        </div>
                                                        <div class="wrapper-for-add-btn">
                                                            <div class="btn-add-to-cart" @click="add2cart(subItem.code)"
                                                                 :style="addingToCartStyle">
                                                                {{addingToCartTitle}}
                                                            </div>
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
                      :activeTime="activeTime"
                      :vitrina="vitrina"
                      :related="related"
                      :code="categoryId"
                      :charset="charset"
            />
        </div>
    </div>
</template>
<style scoped lang="less">
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
    .wrapper-for-add-btn{
        width: 100%;
    }

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
        max-width: 130px;
    }

    .product-inner-select {
        padding-left: 5px;
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
    import checkFile from './helpers/checkForExist.js';
    import getImg from './helpers/importImages.js';
    import LsPut from './helpers/lsPut.js';
    import LsGet from './helpers/lsGet.js';
     export default{
        data(){
            return{
                    positionslist: this.$store.state.app.Category[this.$route.params.id].currentState,
                    newList: {},
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
                    settings: this.$store.state.settings,
                    IsAddingToCart: false,
                    charset:[]
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
            addingToCartTitle : function(){ return this.IsAddingToCart  ? 'Добавление' : 'Выбрать';},
            addingToCartStyle: function() { return this.IsAddingToCart  ? "background:#dbdbd7" : '';},
            positionsWithProps: function () {
                var updateLocalStorage = false;
                var self = this;
                var payload = {};
                var cnt = 0;
                var len = this.positionslist['tovar'].length;
                var result = this.positionslist['tovar'].map(function (item, index, arr) {
                    if (!self.$store.state.settings.isBrowser)
                    {
                         //todo сюда проверку на соответствие картинки
                         /*if (self.$store.state.app.LocalPaths.Category[item.code] && item.urlBigImage != self.$store.state.app.LocalPaths.Category[item.code]){
                                        self.$store.state.app.LocalPaths.Category[item.code] = void 1;
                                   }*/
                         if (self.$store.state.app.LocalPaths.Positions[item.code] === void 1){
                             getImg(self.$store.state.settings.urlBase + self.settings.server + self.settings.urlBackImage + item.urlImage, function(res, isExist){
                                    if (isExist)
                                           {
                                           }
                                    payload = {
                                                type: 'positions',
                                                name: item.code,
                                                value: res,
                                                callback: function(){
                                                    cnt++;
                                                    if (len === cnt){
                                                        //alert('Update current menu:' + self.$route.params.id);
                                                        //self.positionslist = _.map(self.positionslist,(item)=>{return item;});
                                                        //self.refreshComponent();
                                                    }
                                                }
                                           };
                                    self.$store.commit('SET_LOCAL_PATH', payload);
                                   });
                         }
                         else {
                              item.style = 'background-image: url(file:///storage/emulated/0/StreetFoodBar/images/' +  self.$store.state.app.LocalPaths.Positions[item.code] + ')';
                         }
                     } else
                    {
                        item.style = 'background-image: url(' + self.$store.state.settings.urlBase + self.settings.server + self.settings.urlBackImage + item.urlImage + ');';
                    }

                    if (item.vitrina === '1') {
                        item.style += ';box-shadow: 0px 0px 30px #CCDDFF;';
                    }
                    return item;
                });
                return result;
            }
        },
        watch: {
            categoryId: function(){
                this.getJson(this.categoryId);
                /*let key = 'cat' + this.categoryId;
                LsGet(key,(data)=>{
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null){
                    try{
                        this.$store.state.app.LocalPaths.Category = JSON.parse(data);
                        alert(JSON.stringify(this.$store.state.app.LocalPaths));
                        }
                    catch(err){
                        alert(err);
                    }
                }
                alert(data);
            });*/
            }
        },
        components:{
            'position' : Position
        },

        methods: {
            getStyle: function(item){
                var updateLocalStorage = false;
                var isLoaded = false;
                var self = this;
                var res='';
                var payload = {};
                if (item.vitrina === '1') {
                    res += ';box-shadow: 0px 0px 30px #CCDDFF;'
                }
                //console.log(self.$store.state.settings.isBrowser);
                 if (!self.$store.state.settings.isBrowser)
                    {
                        //todo сюда проверку на соответствие картинки
                        /*if (self.$store.state.app.LocalPaths.Category[item.code] && item.urlBigImage != self.$store.state.app.LocalPaths.Category[item.code]){
                                        self.$store.state.app.LocalPaths.Category[item.code] = void 1;
                                   }*/
                        if (self.$store.state.app.LocalPaths.Positions[item.code] === void 1){
                             updateLocalStorage = true;
                             //res += 'background-image: url(' + self.$store.state.settings.urlBase + self.settings.server + self.settings.urlBackImage + item.urlImage + ');';
                             getImg(self.$store.state.settings.urlBase + self.settings.server + self.settings.urlBackImage + item.urlImage, function(img, isTrue){
                                   payload = {
                                                type: 'positions',
                                                name: item.code,
                                                value: img,
                                                callback: function(){
                                                    res += 'background-image: url(file:///storage/emulated/0/StreetFoodBar/images/' + img;
                                                    //alert('Картинка добавлена');
                                                    isLoaded = true;
                                                    //alert ('Загружаемые: ' + res);
                                                    return res;
                                                }
                                           }
                                    self.$store.commit('SET_LOCAL_PATH', payload);
                                   });
                         }
                         else {
                              res += 'background-image: url(file:///storage/emulated/0/StreetFoodBar/images/' +  self.$store.state.app.LocalPaths.Positions[item.code] + ')';
                              //alert ('Существующие: ' + res);
                              return res;
                         }
                    } else {
                        res += 'background-image: url(' + self.$store.state.settings.urlBase + self.settings.server + self.settings.urlBackImage + item.urlImage + ');';
                        //console.log(res);
                        return res;
                    }
            },

            toggleDetailsItem: function(item){
               this.code = item.code;
               this.urlImageLarge = item.urlImageLarge;
               this.price = item.price,
               this.name = item.name,
               this.description = item.description,
               this.yacheika = item.yacheika
               this.showDetails = true;
               this.activeTime = item.activeTime === '1';
               this.vitrina = item.vitrina;
               this.related = item.related;
               this.charset = item.charset;
               this.$store.commit('SET_SELECTED_POSITION', item);
           },
           add2cart: function(id){
           console.log(id);
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

            getJson: function (catId) {
                let self = this;
                if (this.$store.state.app.Category[catId+''].currentState.length === 0){
                        const payload = {'id':catId, 'callback': function(){
                            self.positionslist = self.$store.state.app.Category[catId].currentState;
                            }
                        };
                    //console.log('Загружаем...');
                    this.$store.dispatch('GET_POSITIONS', payload);
                } else {
                    this.positionslist = this.$store.state.app.Category[catId+''].currentState;
                    //console.log('Из кэша');
                }
            },
            refreshComponent(){
                alert('refresh');
                setTimeout(function(){
                    this.positionslist = _.map(this.positionslist);
                    alert('refresh2');
                }, 2000);
             }
        },
        mounted(){
            this.categoryId = this.$route.params.id;
            this.currentId = this.$route.params.id;
            this.getJson(this.currentId);
            //alert(JSON.stringify(this.$store.state.app.LocalPaths.Category2));
            let key = 'cat' + this.currentId;
            LsGet(key,(data)=>{
                /*if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null){
                    try{
                        this.$store.state.app.LocalPaths.Category = JSON.parse(data);
                        alert(JSON.stringify(this.$store.state.app.LocalPaths));
                        }
                    catch(err){
                        alert(err);
                    }
                }*/
                //alert(data);
            });
        },
        destroyed(){
            //var positions = JSON.stringify(this.$store.state.app.LocalPaths.Positions);
            //LsPut("positions", positions);
        }
    }



</script>
