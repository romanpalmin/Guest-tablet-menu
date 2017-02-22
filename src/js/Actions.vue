<template>
    <div class="content" @click="gotoMenu">
        <iframe src="http://10.10.182.11/ept/menu/menutitle/" frameborder="0" marginwidth="0" marginheight="0"  class="myframe" allowtransparency="false" @click="GoToMenu"></iframe>
        <div class="modal" @click="GoToMenu"></div>
    </div>

</template>
<style scoped lang="less">
    .content{
        .modal{
            width:100%;
            height:100vh;
            display: block;
            z-index: 9999;
            position: fixed;
            top:0;
            left:0;
        }

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
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'Стрит фуд бар'
            }
        },
        methods:{
            gotoMenu: function(){
                this.$router.replace('/ru/menu');
            }
        }
    }


</script>
