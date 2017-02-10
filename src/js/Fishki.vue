<template>
    <div class="content">
        <div class="inner-content">Здесь будут какие-то фишки ресторана {{msg}}</div>
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
                msg:'Фуд стрит бар'
            }
        }
    }


</script>
