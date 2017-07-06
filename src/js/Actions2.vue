<template>
    <div class="content">
        <div class="img-wrapper">
            <img class="img-action" :src="getUrl()"/>
        </div>
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
        .img-wrapper{
            width: 77%;
            height: 90%;
            overflow: hidden;
            margin: 0 auto;
            display: block;
            text-align: center;
            .img-action{
                width: 100%;
                height: 100%;
                padding-top: 135px;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'Стрит фуд бар',
                imgUrl: '/visual-action.jpg',
                settings: this.$store.state.settings
            }
        },
        methods:{
            getUrl(){
                return this.settings.urlBase + this.settings.server + this.settings.urlBackImage + this.imgUrl;
            }
        }
    }


</script>
