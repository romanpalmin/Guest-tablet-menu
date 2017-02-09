<template>
    <div class="rolling">
        <div clas="div-overlay">
            <div v-if="positionslist.tovar">
                <ul class="products">
                    <li class="product" v-for="item in positionsWithProps" @click="toggleDetails">
                        <div class="product-inner">
                            <div class="product-top-block" :data-Code="item.code" :style="item.style">
                                <div class="product-top-block-price" :data-Code="item.code">
                                    {{ item.price }}
                                </div>
                            </div>
                            <div class="product-inner-label" :data-Code="item.code">
                                {{ item.name }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
                <ul class="products">
                    <li v-for="item in positionslist" class="product-group product-group-level-1">
                        <div class="product-group-level-1-descr">{{item.name}}</div>
                        <div v-if="item.groups.length === 0">
                            <ul class="products">
                                <div v-show="item.type === 'icons'">
                                    <li class="product" v-for="subitem in item.items" @click="toggleDetails">
                                        <div class="product-inner">
                                            <div class="product-top-block" :style="getStyle(subitem)" :data-Code="subitem.code">
                                                <div class="product-top-block-price" :data-Code="subitem.code">{{subitem.price}}</div>
                                            </div>
                                            <div class="product-inner-label" :data-Code="subitem.code">{{subitem.name}}</div>
                                        </div>
                                    </li>
                                </div>

                                <div v-show="item.type === 'list'">
                                    <li class="product2" v-for="subitem in item.items" @click="toggleDetails">
                                        <div class="product-inner2">
                                            <div class="product-inner-label2" :data-Code="subitem.code">{{subitem.name}}</div>
                                            <div class="product-top-block-price2" :data-Code="subitem.code">{{subitem.price}}</div>
                                        </div>
                                    </li>
                                </div>

                            </ul>
                        </div>
                        <div v-else>
                            <ul>
                                <li v-for="subgroups in item.groups" class="product-group-level-2">
                                    <div class="product-group-level-2-descr">{{subgroups.name}}</div>
                                    <div v-if="subgroups.groups.length === 0">
                                        <ul class="products">

                                            <div v-show="subgroups.type === 'list'">
                                                <li class="product2" v-for="subItem in subgroups.items" @click="toggleDetails">
                                                    <div class="product-inner2">
                                                        <div class="product-inner-label2" :data-Code="subItem.code">{{subItem.name}}</div>
                                                        <div class="product-top-block-price2" :data-Code="subItem.code">{{subItem.price}}</div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div v-show="subgroups.type === 'icons'">
                                                <li class="product" v-for="subItem in subgroups.items" @click="toggleDetails">
                                                    <div class="product-inner">
                                                        <div class="product-top-block" :style="getStyle(subItem)" :data-Code="subItem.code">
                                                            <div class="product-top-block-price" :data-Code="subItem.code">{{subItem.price}}</div>
                                                        </div>
                                                        <div class="product-inner-label" :data-Code="subItem.code">{{subItem.name}}</div>
                                                    </div>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                    <div v-else></div>
                                </li>
                            </ul>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </li>
                    <position v-if="showDetails" :positionId="code"/>
                </ul>
            </div>
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

     export default{
        data(){
            return{
                    positionslist: [],
                    newList: {},
                    catName: 'burger',
                    showDetails: false,
                    code:0,
                    currentId: this.$route.params.id
                }
        },
        props: ["categoryId"],
        computed: {
            headTitle: function () {
                return this.title + ' Список товаров';
            },
            positionsWithProps: function () {
                var self = this;
                var res = this.positionslist['tovar'].map(function (item) {
                    item.style = 'background-image: url(' + state.settings.server + state.settings.urlBackImage + item.urlImage + ');';
                    return item;
                });
                return res;
            }
        },
        watch: {
            categoryId: function(){
                this.getJson(this.categoryId);
            },
            currentId: function(){
                console.log(this.currentId);
            }
        },

        methods: {
            getStyle: function(item){
                var self = this;
                var res = 'background-image: url(' + state.settings.server + state.settings.urlBackImage + item.urlImage  + ');';
                return res;
            },

            toggleDetails: function(evt){

                var el = evt.target;
                this.code = el.dataset.code;
                console.log(this.code);
                this.showDetails = true;
           },

            getJson: function (catId) {
                var self = this;
                var testSet = {};
                var url = '';
                 if (state.settings.testMode){
                    url = './assets/data/category.json'
                 } else {
                    url = state.settings.server + 'menu/hs/model?groups='+catId+'&category=' + catId;
                 }
                if (state.appState.Category[catId].currentState.length > 0){
                this.positionslist = state.appState.Category[catId].currentState;
                }
                this.axios.get(url)
                        .then(function (response) {
                            testSet = response.data[catId];
                            self.formatJson(testSet, catId);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            formatJson: function (resp, code) {
                var cur;
                var curO = [];
                if ('tovar' in resp) {
                    this.newList = resp;
                    this.positionslist = resp;
                    state.appState.Category[this.$route.params.id].currentState = this.positionslist;
                }
                else {
                    for (var item in resp) {
                        var newO = {};
                        cur = resp[item];
                        for (var subitem in cur) {
                            var curSubItem = cur[subitem];
                            if (curSubItem === 'ИКОНКАМИ' || curSubItem === 'СПИСКОМ') {
                                if (curSubItem === 'ИКОНКАМИ') {
                                    newO.type = 'icons';
                                }
                                if (curSubItem === 'СПИСКОМ') {
                                    newO.type = 'list';
                                }
                            } else {
                                newO.name = subitem;
                                if ('tovar' in curSubItem) {
                                    newO.items = curSubItem['tovar'];
                                    newO.groups = [];
                                } else {
                                    var groups = [];
                                    for (var it in curSubItem) {
                                        var newSO = {};
                                        var curSubItemIt = curSubItem[it]
                                        for (var nso in curSubItemIt) {
                                            var curSubItemItNso = curSubItemIt[nso];
                                            if (curSubItemItNso === 'ИКОНКАМИ' || curSubItemItNso === 'СПИСКОМ') {
                                                if (curSubItemItNso === 'ИКОНКАМИ') {
                                                    newSO.type = 'icons';
                                                }
                                                if (curSubItemItNso === 'СПИСКОМ') {
                                                    newSO.type = 'list';
                                                }
                                            }
                                            else {
                                                newSO.name = nso;
                                                if ('tovar' in curSubItemItNso) {
                                                    newSO.items = curSubItemItNso['tovar'];
                                                    newSO.groups = [];
                                                }
                                                else {
                                                    //todo в худшем случае
                                                }
                                            }
                                        }
                                        groups.push(newSO);
                                    }
                                    newO.groups = groups;
                                }
                            }
                        }
                        curO.push(newO);
                    }
                    this.positionslist = curO;
                    state.appState.Category[this.$route.params.id].currentState = this.positionslist;
                }
            }
        },
        mounted(){
            console.log('From Store');
            this.currentId = this.$route.params.id;
            this.getJson(this.currentId);
        },
        components:{
            'position' : Position
        }
    }

</script>
