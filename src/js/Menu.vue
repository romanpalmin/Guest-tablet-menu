<template>
    <div>
        <mainMenuNew />
    </div>
</template>

<script>
    import mainMenu from './components/MainMenu.vue';
    import mainMenuNew from './components/MainMenuNew.vue';
    export default{
        data(){
            return{
                items:[]
            }
        },
        components:{
            mainMenuNew
        }
    }
</script>
