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
                items:[]
            }
        },
        components:{
            mainMenu
        }
    }
</script>
