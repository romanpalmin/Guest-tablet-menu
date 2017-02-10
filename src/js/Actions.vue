<template>
    <div class="content">
        <div content="inner-content">Здесь будут описания акций {{msg}}</div>
    </div>
</template>
<style scoped lang="less">
    .content {
        width: 100%;
        padding-top: 100px;
        text-align: center;
        .inner-content {
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'Стрит фуд бар'
            }
        }
    }


</script>
