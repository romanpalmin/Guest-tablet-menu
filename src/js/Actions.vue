<template>
    <div class="content" @click="gotoMenu">
        <iframe :src="anketaUrl" frameborder="0" marginwidth="0" marginheight="0"  class="myframe" allowtransparency="false" ></iframe>
    </div>

</template>
<style scoped lang="less">
    .content{

        width: 100%;
        height:100%;
        display: block;
        content: "";
        padding-top: 0px!important;
        margin-top: -65px;
        .myframe{
            width:100%;
            height:100vh;
            overflow: hidden;
            transform: scale(0.98);
            margin-top: 65px;
            margin-left: -30px;
        }
    }
</style>
<script>
import state from './components/store/currentStates';
    export default{
        data(){
            return{
                msg:'Стрит фуд бар'
            }
        },
        computed: {
            anketaUrl: function(){ return 'http://tab01:01@10.10.182.11' + '/menu/hs/ank1/display';}
        }
    }


</script>
