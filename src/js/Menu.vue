<template>
    <div>
        <mainMenu />
    </div>
</template>

<script>
    import mainMenu from './components/MainMenu.vue';
    export default{
        data(){
            return{
                msg:'Загружаем компонент списка бургеров',
                items:[]
            }
        },
        components:{
            mainMenu
        },
        mounted: function(){

        }
    }
</script>
