<template>
    <div>
        <ul class="products" >
            <li class="product" v-for="item in positionsWithProps">
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
    import positions from './data/positions';

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
                return res;
            }
        },
        mounted: function(){
            var self = this;
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
           populateData: function(id){
                //console.log('Заполняем данные по ID = ' + id);
                if (positions && id !== ''){
                    this.positionslist = positions[id];
                }
           }
        }
    }






</script>
