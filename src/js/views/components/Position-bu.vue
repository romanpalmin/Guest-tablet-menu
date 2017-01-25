<template>
    <div>
        <div class="content-item-container">
            <img class="close" src="assets/images/close.png" @click="$parent.show=false">
            <div class="content-item-background">
                <div class="content-item">
                    <div class="item">
                        <div class="item-top">
                            <div class="item-column-image">
                                <img :src="positionSet.urlImage" class="item-image">
                            </div>
                            <div class="item-column-data">
                                <div class="h1-item">{{positionSet.name}}</div>
                                <div class="p-item">{{positionSet.description}}</div>
                                <div class="item-price">{{positionSet.price}}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .item-image {
        width: 100%;
        height: auto;
        border-radius: 30px;
    }

    .content-item-container {
        width: 100%;
        height: 100%;
        top: 60px;
        left: 0;
        display: block;

        /*img.close {
            display: inherit;
            position: fixed;
            left: 91%;
            width: 6%;
            z-index: 100;
        }*/

        .content-item-background {
            width: 100%;
            height: 100%;
            opacity: 0.95;
            left: 0;
            top: 60px;
            display: block;
            background-color: #313131;
            position: fixed;
            .content-item {
                width: 90%;
                height: 90%;
                top: 5%;
                left: 5%;
                background-image: url(/dist/background.jpg);
                overflow: auto;
                opacity:1;
                display:block;
                .item {
                    padding: 1em;
                    display: inline-table;
                    width: 100%;
                    vertical-align: top;
                    .item-top {

                        .item-column-image {
                            display: inline-block;
                            width: 50%;
                            padding-left: 15px;
                            padding-top: 15px;
                            padding-right: 30px;
                        }
                        .item-column-data {
                            display: inline-block;
                            padding-left: 30px;
                            padding-top: 15px;
                            padding-right: 15px;
                            vertical-align: top;
                            width: 49%;
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
                        }
                    }

                }
                .item-bottom {
                    width: 100%;
                    height: 80px;
                    display: inline-flex;
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
