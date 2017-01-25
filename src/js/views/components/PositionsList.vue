<template>
    <div>
        <ul class="products" v-for="item in positionsWithProps">
            <li class="product">
                <div class="product-inner">
                    <div class="product-top-block" :style="item.style">
                        <div class="product-top-block-price">
                            {{ item.price }}
                        </div>
                    </div>
                    <div class="product-inner-label">
                        {{ item.name }}
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>
<style scoped lang="less">
    .products {
        margin: 0;
        padding: 1em;
        text-align: left;
        user-select: none;

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

                    .product-top-block-price {
                        width: 75px;
                        height: 77px;
                        background-size: cover;
                        position: relative;
                        left: 125px;
                        top: -10px;
                        color: rgb(0, 0, 0);
                        text-align: center;
                        padding-left: 18px;
                        padding-top: 14px;
                        background-image: url("./images/price.png");
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
    import positions332020 from './data/positions-332020';
    import positions342020 from './data/positions-342020';
    import positions352020 from './data/positions-352020';
    import positions392020 from './data/positions-392020';
    import positions412020 from './data/positions-412020';
    import positions422020 from './data/positions-422020';
    import positions432020 from './data/positions-432020';
    import positions462020 from './data/positions-462020';

    export default{
        data(){
            return{
                msg:'hello vue',
                currentCatId: this.categoryId,
                positionslist : []
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
                console.log(res);
                return res;
            }
        },
        watch:{
            currentCatId: function(){
                console.log('test');
            }
        },
        mounted: function(){
            var self = this;
            self.getData();
            this.populateData(this.currentCatId);
            bus.$on('select-cat-id', function (id) {
                this.currentCatId = id;
                self.populateData(id);
            });
        },

        destroyed: function(){
            bus.$off();
        },

        methods: {
           getData: function(){
                console.log('Первичная инициализация');
           },
           populateData: function(id){
                console.log('Заполняем данные по ID = ' + id);
                console.log(id);
                switch (+id){
                    case 332020:
                        this.positionslist = positions332020;
                        break;
                    case 342020:
                        this.positionslist = positions342020;
                        break;
                    case 352020:
                        this.positionslist = positions352020;
                        break;
                    case 392020:
                        this.positionslist = positions392020;
                        break;
                    case 412020:
                        this.positionslist = positions412020;
                        break;
                    case 422020:
                        this.positionslist = positions422020;
                        break;
                    case 432020:
                        this.positionslist = positions432020;
                        break;
                    case 462020:
                        this.positionslist = positions462020;
                        break;
                    default:
                        this.positionslist = [];
                        break;
                }

           }
        }
    }






</script>
