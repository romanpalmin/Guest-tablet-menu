<template>
    <div>
        <div clas="div-overlay">
            <div v-if="positions.tovar">
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
                    <position v-if="showDetails" :positionId="code"/>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .div-overlay {
        overflow: auto;
    }

    .products {
        margin: 0;
        padding: 1em;
        text-align: left;
        user-select: none;
        height: 720px;
        overflow-y: scroll;

        .product {
            display: inline-table;
            width: 190px;
            height: 235px;
            color: #ffffff;
            background-size: cover;
            margin: 10px;

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

    }

</style>
<script>
    import bus from './store/store';
    import Position from './Position.vue';
    import positions from './data/positions';

    export default{
        data(){
            return{
                currentCatId: this.categoryId,
                positionslist : [],
                showDetails: false,
                code:0
            }
        },
        props: ["categoryId"],

        computed: {
            catId: function(){
                return this.currentCatId;
            },
            positionsWithProps: function(){
                var self = this;
                var res = this.positionslist.map(function(item) {
                    item.style = 'background-image: url(' + item.urlImage + ');';
                    return item;
                });
                return res;
            }
        },
        mounted: function(){
            var self = this;
            //this.populateData(this.currentCatId);
            bus.$on('select-cat-id', function (id) {
                this.currentCatId = id;
                self.populateData(id);
            });
            this.getJson();
        },

        destroyed: function(){
            bus.$off();
        },

        methods: {
           populateData: function(id){
                //console.log('Заполняем данные по ID = ' + id);
                if (positions && id !== ''){
                    this.positionslist = positions[id];
                }
           },
           toggleDetails: function(evt){
                var el = evt.target;
                this.code = el.dataset.code;
                this.showDetails = true;
           },
           getJson: function () {
                var self = this;
                var testSet = {};
                var current = src.burger;
                var urlCategory = current.url;
                //var urlCategory = 'http://10.10.250.61/menu/hs/model?groups=432020&category=432020';
                this.axios.get(urlCategory)
                        .then(function (response) {
                            //self.positions = response.data[current.code];
                            testSet = response.data[current.code];
                            self.formatJson(testSet, current.code);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            formatJson: function (resp, code) {
                var cur;
                var curO = [];
                if ('tovar' in resp) {
                    console.log('Выводим товар');
                    this.newList = resp;
                    this.positions = resp;
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

                    setTimeout(function () {
                        console.log(curO);
                        var json = JSON.stringify(curO);
                        console.log(json);
                    }, 100);

                }
            }
        },
        components:{
            'position' : Position
        }
    }







</script>
