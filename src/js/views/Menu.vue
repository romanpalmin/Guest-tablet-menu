<template>
    <div>
        <div></div>
        <mainMenu />
    </div>
</template>
<style>
    body{
        background-color:#ffffff;
    }
</style>
<script>
    import mainMenu from './components/MainMenu.vue';
    export default{
        data(){
            return{
                msg:'Загружаем компонент списка бургеров'
            }
        },
        components:{
            mainMenu
        }
    }
</script>
