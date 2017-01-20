<template>
    <div>
        <div>{{msg1}}</div>
        <mainMenu />
    </div>
</template>
<style>
    body{
        background-color:#dddddd;
    }
</style>
<script>
    import mainMenu from './components/MainMenu.vue';
    export default{
        data(){
            return{
                msg1:'Загружаем компонент списка бургеров'
            }
        },
        components:{
            mainMenu
        }
    }
</script>
