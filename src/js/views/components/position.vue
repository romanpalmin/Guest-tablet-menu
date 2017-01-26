<template>
    <div>
        <div class="content-item-container">
            <div class="item-close"><img class="item-image" src="assets/images/close.png" @click="$parent.show=false"></div>
            <div class="inner-item-container">


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
            left:92%;
            width:5%;
            height:5%;
            position:relative;
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
            background-color: #4d2926;
            position: relative;
            overflow: auto;
            background-image: url(/dist/background.jpg);

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
