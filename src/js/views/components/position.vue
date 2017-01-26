<template>
    <div>
        <div class="content-item-container">
            <div class="item-close"><img class="item-image" src="assets/images/close.png" @click="$parent.showDetails=false">
            </div>
            <div class="inner-item-container">
                <div class="item-column-image">
                     <img :src="positionSet.urlImage" class="item-image">
                </div>
                <div class="item-column-data">
                    <div class="h1-item">{{positionSet.name}}</div>
                    <div class="p-item">{{positionSet.description}}</div>
                    <div class="item-price">{{positionSet.price}} P</div>
                    <div class="item-button-add">
                        <button class="btn btn-add">Добавить</button>
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
            }
        }
    }

</style>
<script>
    import bus from './store/store';
    import positions from './data/position';

    export default {
            data(){
                return{
                    positionSet : positions[this.positionId]
                }
            },
            props: ["positionId"]
    }







</script>
